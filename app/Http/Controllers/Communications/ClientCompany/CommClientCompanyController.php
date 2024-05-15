<?php

namespace App\Http\Controllers\Communications\ClientCompany;

use App\Http\Requests\Communications\ClientCompany\PostClientCompMsgRequest;
use App\Models\Communications\ClientCompany\CommClientCompanyIssue;
use App\Models\User\Company;
use App\Traits\ApiHelperTrait;
use App\Traits\UsesTransformerTrait;
use App\Transformers\Communications\ClientCompany\ClientCompanyIssueTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CommClientCompanyController extends Controller
{
    use ApiHelperTrait, UsesTransformerTrait;

    public function issues(Request $request) {
        if($user = Auth::guard('clients')->user()) {
            $issues = $user->helpIssues();
//            Apaño mientras no hay login de empresas
//        } elseif($user = Auth::guard('companies')->user()) {
        } elseif(Auth::guard('employees')->user()) {
            $user = Company::find(1);
            $issues = $user->clientIssues();
        } else {
            return $this->jsonResponse()->unAuthenticated();
        }
        $trans = $this->getTransformer(ClientCompanyIssueTransformer::class, $request->get('with', null));
        return $this->respond($trans->transformPagination($issues->paginate($request->get('per_page', 20)))->toArray());
    }

    public function show(CommClientCompanyIssue $issue) {
        $client = Auth::guard('clients')->user();
//        $company = Auth::guard('companies')->user();
//        if($client->id === $issue->client_id || $company->id === $issue->company_id ) {
        if($client->id === $issue->client_id || Auth::guard('employees')->user()) {
            $trans = $this->getTransformer(ClientCompanyIssueTransformer::class, ['messages']);
            return $this->respond($trans->transform($issue));
        }
        return $this->jsonResponse()->notFound();
    }

    public function createIssue(Request $request) {

    }

    public function postMessage(PostClientCompMsgRequest $request, CommClientCompanyIssue $issue) {
        if($client = Auth::guard('clients')->user()) {
            $company = false;
            $sender = 'client';
//            De momento no hay login de empresas, todas son Lexforis, que tiene ID 1
//        } elseif($company = Auth::guard('companies')->user()) {
        } else {
            $company = Company::find(1);
            $sender = 'company';
        }

        if(!$client && !$company) {
            return $this->jsonResponse()->unAuthenticated();
        }

        $result = DB::transaction(function () use ($issue, $client, $company, $sender, $request) {
            $data = [
                'message' => $request->get('message'),
                'sender' => $sender
            ];
            if($client) {
                $data['client_id'] = $client->id;
            } else {
                $data['company_id'] = $company->id;
            }
            $msg = $issue->messages()->create($data);
//            TODO Evento
//            event(new );
            return $msg;
        });
        if($result) {
            return $this->respond(['created_at' => $result->created_at], 200);
        }
        return $this->jsonResponse()->badRequest();
    }
}
