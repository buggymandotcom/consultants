<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\Client\ClientAlreadyRegisteredException;
use App\Http\Requests\Client\RegisterClientRequest;
use App\Mail\Client\ActivateAccountMail;
use App\Models\User\Company;
use App\Models\User\User;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Auth\ClientProfileTransformer;
use App\Transformers\Auth\GenericAuthUserTransformer;
use App\Transformers\Client\BasicUserTransformer;
use App\Transformers\TicketTransformer;
use Carbon\Carbon;
use Doctrine\DBAL\Exception\DriverException;
use Doctrine\DBAL\Exception\NonUniqueFieldNameException;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\Exception\UniqueTokenIdentifierConstraintViolationException;
use PhpOffice\PhpWord\Exception\Exception;

class AuthV2Controller extends Controller
{
    use ApiHelperTrait, UsesTransformerTrait;

    protected $http;

    public function __construct(Client $http)
    {
        $this->http=$http;
    }

    public function auth(Request $request){

        $credentials=$request->only(['email','password']);
        if($emptyCreds=(trim($request->email)=='') || (trim($request->email)=='')){
            return $this->respond(['error' => 'Empty credentials'],400);
        }
        //comprobamos que venga el guard valido

        if(!$this->guardExist(guardFromHead())){
            return $this->respond(['error' => 'Guard not found'],400);
        }
        //Comprobamos que no hay mas de un correo como resultado
        if(guardFromHead()=='clients'){
            $emailsFound = ($this->getProviderModelGuard(guardFromHead()))::whereEmail($credentials['email'])->where('parent_id',null)->count();
            if($emailsFound>1){
                return $this->respond(['error' => 'There is more than one email in the database'],400);
            }
        }

        //Comprobamos que la cuenta esta activa


        try {
            $response = $this->http->post(config('foundations.APP_URL').'oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => config('foundations.OAUTH_PASSWORD_ID'),
                    'client_secret' => config('foundations.OAUTH_PASSWORD_SECRET'),
                    'username' => $credentials['email'],
                    'password' => $credentials['password'],
                    'scope' => '*',
                    'provider' => $this->getProviderGuard(guardFromHead()),
                ],
            ]);

            $r=json_decode((string)$response->getBody(),true);
            $token=$r['access_token'];
            $refresh=$r['refresh_token'];
            $user = $this->getUserFromToken($token);
            return $this->respond(array_merge(['token'=>$token,'refresh_token'=>$refresh],GenericAuthUserTransformer::transformS($user)));

        }catch (\Exception $exception){
            return $this->jsonResponse()->forbidden();
        }





    }

    public function user (){
        return $this->respond(GenericAuthUserTransformer::transformS(Auth::user()));
    }

    public function requestUser(Request $request){
        return $this->respond(GenericAuthUserTransformer::transformS(Auth::user()));
    }



    private function getUserFromToken($token){


        $response = $this->http->request('GET', config('foundations.APP_URL').'api/auth-v2/request-user', [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$token,
                'App-Guard' => guardFromHead(),
            ],
        ]);

        $res=json_decode((string)$response->getBody());
        $userModel = ($this->getProviderModelGuard($res->guard))::findOrFail($res->id);
        return $userModel;
    }

    private function guardExist($guard){
        try {
            if(config('auth.guards.'.$guard)){
                return true;
            }return false;
        } catch (\Exception $e){
            return false;
        }
    }

    private function getProviderGuard($guard){
        return  config('auth.guards.'.$guard.'.provider');
    }

    private function getProviderModelGuard($guard){
        $provider = $this->getProviderGuard($guard);
        $model = config('auth.providers.'.$provider.'.model');
        if(!$model){
            throw new \Exception('Guard provider not found');
        }return $model;
    }

    public function register(RegisterClientRequest $request) {
        try {
            $result = DB::transaction(function () use ($request) {
                $data = $request->validated();
                if(\App\Models\User\Client::where('email', $data['email'])->count() > 0) {
                    throw new ClientAlreadyRegisteredException('Email already exists in database.');
                }
                $data['source_app'] = 'ciberconsult';
//            TODO Esto habrá que cambiarlo. Habrá una tabla de resellers con un slug que se pasará por request
                $data['company_id'] = 1;
                $data['activate_token'] = mt_rand(10000, 99999);
                $data['activation_sent_at'] = now();
                $client = \App\Models\User\Client::create($data);
                Mail::send(new ActivateAccountMail($client));
                return $client;
            });
        } catch (ClientAlreadyRegisteredException $e) {
            return $this->respond(['created' => false, 'reason' => 'error.client.already_registered'], 409);
        }
        if($result && $result instanceof \App\Models\User\Client) {
            return $this->respond(['created' => $result->id]);
        }
        return $this->jsonResponse()->badRequest();
    }

    public function activate(Request $request, \App\Models\User\Client $client) {
        if(!$client->activated_at && $client->activate_token === $request->get('code')) {
            $result = DB::transaction(function () use ($client) {
                $client->update(['activated_at' => now()]);
                return $client;
            });
            if($result) {
                return $this->jsonResponse()->updated();
            }
        }
        return $this->jsonResponse()->badRequest(null, 409);
    }

    public function getIsActivated(\App\Models\User\Client $client) {
        return $this->respond(['activated' => !!$client->activated_at]);
    }

    public function resendToken(\App\Models\User\Client $client) {
        if(!$client->activation_sent_at || now()->diffInRealMinutes($client->activation_sent_at) > 5) {
            if(!$client->activate_token) {
                $client->update(['activate_token' => mt_rand(10000, 99999)]);
                $client->refresh();
            }
            Mail::send(new ActivateAccountMail($client));
            $client->update(['activation_sent_at' => now()]);
            return $this->respond(['sent' => true]);
        }
        return $this->respond(['sent' => false, 'reason' => 'error.client.activate_token_sent_recently'], 409);
    }

    public function clientProfile(Request $request) {
        $user = Auth::guard('clients')->user();
        if($user) {
            $trans = $this->getTransformer(ClientProfileTransformer::class, $request->get('with', null));
            return $this->respond($trans->transform($user));
        }
        return $this->jsonResponse()->notFound();
    }

    public function updateClientProfile(Request $request) {
        $user = Auth::guard('clients')->user();
        if ($user) {
            $result = DB::transaction(function () use ($request, $user) {
                $clientData = $request->only(['firstname', 'lastname', 'phone']);
                $clientInfoData = $request->only(['birth_date', 'civil_status', 'regime', 'ocupation', 'bank', 'iban', 'identification']);
                if(isset($clientInfoData['birth_date'])) {
                    $clientInfoData['birth_date'] = Carbon::create($clientInfoData['birth_date']);
                }
                $user->update($clientData);
                if($user->additionalInfo) {
                    $user->additionalInfo->update($clientInfoData);
                } else {
                    $user->additionalInfo()->create($clientInfoData);
                }
                return true;
            });
            if ($result) {
                return $this->jsonResponse()->updated();
            }
            return $this->jsonResponse()->badRequest();
        }
        return $this->jsonResponse()->notFound();
    }
}
