<?php
namespace App\Uploads;
use Illuminate\Http\UploadedFile;
interface UploadInterface
{
    public function __construct(UploadedFile $file , Array $params);

    public function upload();
    public function getModel();
    public function setRules();

}
