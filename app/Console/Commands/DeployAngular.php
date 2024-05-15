<?php

namespace App\Console\Commands;

use App\Models\Foundations\Settings\Option;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

class DeployAngular extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deploy:angular {--skip-angular}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Despliega el proyecto angular en una carpeta de public';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){

         $timeStart=microtime(true) ;

         if($this->option('skip-angular')){
             $this->info('Has elegido NO compilar angular');
         }else{
             $this->compileAngular();
             $this->copyHtaccess();
         }



         $this->info('La version actual es : '.appVersionFromFile());
         $versionChanged=$this->choice('¿Ha cambiado la versión?',['Si', 'No'],1);
         if($versionChanged=='Si'){
            $newVersion=$this->ask('Introduce nueva version');
            //Option::changeOrNew('app.version',$newVersion);
            File::put(storage_path('appinfo.json'), '{"version":"'.$newVersion.'"}');
            $this->info('Versión cambiada, la nueva version es '.appVersionFromFile());
         }

         $makeCommit=$this->choice('¿Hacemos commit?',['Si', 'No'],1);
         if($makeCommit=='Si'){
             $msgCommit=$this->ask('Mensaje para commit');
             if(trim($msgCommit)!==''){

                 $gAdd=new Process("git add .");
                 $gAdd->run(function($type,$buffer){
                     $this->line($buffer);
                 });
                 $gAddU=new Process("git add -u");
                 $gAddU->run(function($type,$buffer){
                     $this->line($buffer);
                 });

                 $gCommit=new Process("git commit -m '$msgCommit'");
                 $gCommit->run(function($type,$buffer){
                     $this->line($buffer);
                 });
                 $gPush=new Process("git push");
                 $gPush->run(function($type,$buffer){
                     $this->line($buffer);
                 });
                 $this->info('Commit realizado');
             }else{
                 $this->error('No se completó el commit');
             }
         }else{
             $this->info('No hacemos commit');
         }
         $diff = microtime(true) - $timeStart;
         $this->info('Terminado , ha tardado :'.$diff);


    }

    private function compileAngular(){
        $command = "cd back && ng build --prod  --base-href=/ --output-path /var/www/html/ciberconsultores/angular/";
       // $command = "cd back && ng build --prod --base-href=/test_/ --output-path /var/www/html/test_/";

//        $command = "cd back && ng build --prod --base-href=/test1_/ --output-path /var/www/html/test1_/";
        $this->info('Comando: '.$command);
        $process = new Process($command);
        $process->setTimeout(300);
        $process->run(function ($type,$buffer){
               $this->line($buffer);
//             if (Process::ERR === $type) {
//                    $this->error($buffer);
//             } else {
//                    $this->line($buffer);
//             }
        });
    }

    private function copyHtaccess(){
        $copyHtaccess=new Process("cp ".storage_path('utils/.htaccess')." /var/www/html/ciberconsultores/angular/.htaccess");
      //  $copyHtaccess=new Process("cp ".storage_path('utils/.htaccess')." /var/www/html/test_/.htaccess");
        $copyHtaccess->run(function ($type,$buffer){
             if (Process::ERR === $type) {
                    $this->error($buffer);
             } else {
                    $this->line($buffer);
             }
        });
    }
}
