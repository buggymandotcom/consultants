<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::get('test-ed', 'TestjlController@getProperties');
Route::get('test-jl', 'TestjlController@testjl');

Route::post('auth/register', 'Auth\AuthV2Controller@register');
Route::post('auth/client/{client}/activate', 'Auth\AuthV2Controller@activate');
Route::get('auth/client/{client}/activate', 'Auth\AuthV2Controller@getIsActivated');
Route::post('auth/client/{client}/resend-token', 'Auth\AuthV2Controller@resendToken');

Route::group(['middleware' => ['api','multiauth:clients,employees']],function(){

    Route::get('ine/geo/sync', 'Foundations\GeoSpainController@sync');

    Route::get('auth-v2/request-user','Auth\AuthV2Controller@requestUser');
    Route::get('auth-v2/user','Auth\AuthV2Controller@user');

    Route::get('auth/client-profile','Auth\AuthV2Controller@clientProfile');
    Route::put('auth/client-profile','Auth\AuthV2Controller@updateClientProfile');

    Route::group(['namespace' => 'Declaration'], function () {
        Route::group(['prefix' => 'declaration210', ], function () {
            Route::get('{client}/getDeclaration','Declaration210Controller@getDeclaration');
            Route::post('{declaration}/saveDeclaration','Declaration210Controller@saveDeclaration');
            Route::post('changeState','Declaration210Controller@changeState');
        });
    });


    Route::group(['namespace' => 'Client'], function () {
        Route::group(['namespace' => 'Services\TaxModels', ], function () {
            Route::group(['prefix' => 'declaration720', ], function () {
                Route::get('{property}/property','TaxModelsController@property720');
                Route::post('{property}/updateProperty','TaxModelsController@updateProperty720');
                Route::post('{declaration}/addProperty','TaxModelsController@addProperty720');
                Route::post('{property}/removeProperty','TaxModelsController@removeProperty720');
                Route::get('getCountries','TaxModelsController@getCountries');
            });
            Route::post('{draft}/update','TaxModelsController@updateDraft');
        });
    });

    Route::group(['namespace' => 'Communications'], function () {
        Route::group(['namespace' => 'ClientCompany', 'prefix' => 'cli-com-help'], function () {
            Route::get('issue', 'CommClientCompanyController@issues');
            Route::get('issue/{issue}', 'CommClientCompanyController@show');
            Route::post('issue/{issue}', 'CommClientCompanyController@postMessage');
        });
    });

    Route::group(['namespace' => 'Client'], function () {
        Route::get('client/pagination','ClientController@pagination');
        Route::get('client/list','ClientController@list');
        Route::group(['prefix' => 'client', ], function () {
            Route::group(['namespace' => 'Services\TaxModels'], function () {
                Route::get('draft','TaxModelsController@drafts');
                Route::get('draft/{draft}','TaxModelsController@getDraft');
                Route::get('draft/{draft}/export','TaxModelsController@exportDraft');
                Route::get('{client}/declaration720','TaxModelsController@declaration720');
            });
            Route::get('services','ClientController@services');
            Route::get('services-hired','ClientController@servicesHired');
            Route::get('services-available','ClientController@servicesNotHired');
            Route::group(['prefix' => 'services'], function () {
                Route::post('hire/{service}', 'ClientController@hireService');
            });


            Route::get('{client}/services','ClientController@services');
            Route::get('{client}/services-hired','ClientController@servicesHired');
            Route::get('{client}/services-available','ClientController@servicesNotHired');
            Route::put('{client}/save-password','ClientController@savePassword');
            Route::post('{client}/service','ClientController@addService');
            Route::group(['namespace' => 'Services\TaxModels'], function () {
                Route::get('{client}/models-available','TaxModelsController@modelsAvailable');
                Route::get('{client}/models-hired','TaxModelsController@modelsHired');
                Route::get('{client}/models-availables','TaxModelsController@modelsAvailables');
                Route::post('{client}/addDraft','TaxModelsController@addDraft');
                Route::post('{client}/delDraft','TaxModelsController@delDraft');
                Route::post('{client}/delete-model','TaxModelsController@delModel');
                Route::post('{client}/add-model','TaxModelsController@addModel');
                Route::post('{client}/saveDeclaration720','TaxModelsController@saveDeclaration720');
            });

            Route::group(['prefix' => 'services', 'namespace' => 'Services'], function () {
                Route::group(['prefix' => 'accounting', 'namespace' => 'Accounting'], function () {
                    Route::post('client/{client}/invoices','AccountingUploadController@byClient');
                    Route::get('client/{client}/config','AccountingUploadController@getConfig');
                    Route::put('client/{client}/save-config','AccountingUploadController@saveConfig');
                    Route::delete('invoices/{invoice}','AccountingUploadController@destroy');
                    Route::post('invoices/{invoice}/save-c-comment','AccountingUploadController@saveCComment');
                });
            });
        });
        Route::resource('client','ClientController')->only(['show','store','update']);
        Route::get('services','ServiceController@index');
    });

    Route::group(['namespace' => 'Foundations'], function () {
        Route::get('download/{upload}/request-download','DownloadController@requestDownload');
        Route::get('download/{upload}/request-url','DownloadController@requestUrl');
        Route::delete('download/{upload}','DownloadController@destroy');

        //Traducciones
        Route::get('translation/{loc}/pending','TranslationController@getUntranslated');
        Route::get('translation/manager/{loc}','TranslationController@allTransForManager');
        Route::get('translation/{loc}/front','TranslationController@getFrontTranslations');
        Route::put('translation/manager','TranslationController@updateTranslation');
        Route::delete('translation/manager/{translation}','TranslationController@deleteTranslation');
        Route::post('translation','TranslationController@createTranslation');
        Route::post('translation/many','TranslationController@createManyTranslations');
        Route::get('language','TranslationController@getLanguages');
        Route::post('language','TranslationController@createLanguages');
        Route::delete('language/{id}','TranslationController@deleteLanguage');

        Route::get('translation/get/excel','TranslationController@getTranslationsExcel');
        Route::post('translation/upload-translations','TranslationController@uploadTranslations');

        Route::post('profile/lang/{lang}','TranslationController@changeLang');

        Route::group(['prefix' => 'geo-spain'], function () {
            Route::get('provinces', 'GeoSpainController@indexProvinces');
            Route::get('provinces/{province}/municipalities', 'GeoSpainController@indexMunicipalities');
        });
    });
});

//Route::group(['middleware'=>['jwt.auth']],function (){
    Route::group(['namespace' => 'Foundations'], function () {
        Route::get('download/{upload}/download','DownloadController@download');
    });
//});
Route::post('auth-v2/','Auth\AuthV2Controller@auth');

Route::resource('upload','UploadController',['only'=> ['store','destroy']]);
Route::get('translation/{loc}','Foundations\TranslationController@getTranslations');



Route::get('appinfo',function(){
    return response()->json([
        'version' => appVersionFromFile()
    ],200);
});
