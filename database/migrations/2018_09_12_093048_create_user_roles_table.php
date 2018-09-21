<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('code')->nullable();
            $table->enum('type', ['story', 'video'])->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $userRole = new \App\UserRole();
        $videoJobRoles = $userRole::$videoJobRoles;
        $storyJobRoles = $userRole::$storyJobRoles;

        foreach($videoJobRoles as $key => $value) {
	        \DB::table('user_roles')->insert([
		        'name' => $value,
		        'code' => $key,
		        'type' => 'video',
	        ]);
        }

	    foreach($storyJobRoles as $key => $value) {
		    \DB::table('user_roles')->insert([
			    'name' => $value,
			    'code' => $key,
			    'type' => 'story',
		    ]);
	    }

	    $staff = [
	    	'george.pavlou@unilad.co.uk' => 'hoe',
		    'patrick.hill@unilad.co.uk' => 'sem',
		    'neelam@unilad.co.uk' => 'sw',
		    'emily.murray@unilad.co.uk' => 'sw',
		    'lucy.connolly@unilad.co.uk' => 'er',
		    'jake.caveney@unilad.co.uk' => 'er',

		    'owen.jones@unilad.co.uk' => 'csa',
		    'andy.porter@unilad.co.uk' => 'caa',
		    'callum.burke@unilad.co.uk' => 'vvr',
		    'koray@unilad.co.uk' => 'caa',
		    'emma.templeton@unilad.co.uk' => 'lm',
		    'adam.bourne@unilad.co.uk' => 'lm',
		    'samantha@unilad.co.uk' => 'aa',
		    'adam.mitchell@unilad.co.uk' => 'cae',
	    ];

	    foreach($staff as $key => $value) {
	    	\App\User::where('email', $key)->update([
	    		'job_role' => $value,
			    'job_title' => \App\UserRole::$videoJobRoles[$value] ?? \App\UserRole::$storyJobRoles[$value]]);
	    }


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_roles');
    }
}
