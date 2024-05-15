<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUploadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upload', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('repository',['s3','local']);
            $table->string('mime');
            $table->string('extension');
            $table->mediumText('original_name');
            $table->integer('size');
            $table->mediumText('path');
//            $table->integer('uploaded_by')->index()->unsigned()->nullable();
//            $table->foreign('uploaded_by')->references('id')->on('users')->onDelete('set null');
            $table->string('adapter');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('upload');
    }
}
