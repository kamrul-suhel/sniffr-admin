<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\VideoShotType;

use App\Libraries\ThemeHelper;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class AdminVideoShotTypeController extends Controller {

    /**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    public function index(){
        $data = array(
            'admin_user' => Auth::user(),
            'video_shottypes' => json_decode(VideoShotType::orderBy('order', 'ASC')->get()->toJson()),
        );

        return view('admin.videos.shottypes.index', $data);
    }

    public function store(){
        $input = Input::all();
        $last_shottype = VideoShotType::orderBy('order', 'DESC')->first();

        if(isset($last_shottype->order)){
            $new_shottype_order = intval($last_shottype->order) + 1;
        } else {
            $new_shottype_order = 1;
        }
        $input['order'] = $new_shottype_order;
        $video_shottype = VideoShotType::create($input);
        if(isset($video_shottype->id)){
            return Redirect::to('admin/videos/shottypes')->with(array('note' => 'Successfully Added Your New Video Shot Type', 'note_type' => 'success') );
        }
    }

    public function update(){
        $input = Input::all();
        $shottype = VideoShotType::find($input['id'])->update($input);
        if(isset($shottype)){
            return Redirect::to('admin/videos/shottypes')->with(array('note' => 'Successfully Updated Shot Type', 'note_type' => 'success') );
        }
    }

    public function destroy($id){
        VideoShotType::destroy($id);
        $child_shottypes = VideoShotType::where('parent_id', '=', $id)->get();
        foreach($child_shottypes as $shottype){
            $shottype->parent_id = NULL;
            $shottype->save();
        }
        return Redirect::to('admin/videos/shottypes')->with(array('note' => 'Successfully Deleted Shot Type', 'note_type' => 'success') );
    }

    public function edit($id){
        return view('admin.videos.shottypes.edit', array('shottype' => VideoShotType::find($id)));
    }

    public function order(){
        $shottype_order = json_decode(Input::get('order'));
        $video_shottypes = VideoShotType::all();
        $order = 1;

        foreach($shottype_order as $shottype_level_1):

            $level1 = VideoShotType::find($shottype_level_1->id);
            if($level1->id){
                $level1->order = $order;
                $level1->parent_id = NULL;
                $level1->save();
                $order += 1;
            }

            if(isset($shottype_level_1->children)):

                $children_level_1 = $shottype_level_1->children;

                foreach($children_level_1 as $shottype_level_2):

                    $level2 = VideoShotType::find($shottype_level_2->id);
                    if($level2->id){
                        $level2->order = $order;
                        $level2->parent_id = $level1->id;
                        $level2->save();
                        $order += 1;
                    }

                    if(isset($shottype_level_2->children)):

                        $children_level_2 = $shottype_level_2->children;


                        foreach($children_level_2 as $shottype_level_3):

                            $level3 = VideoShotType::find($shottype_level_3->id);
                            if($level3->id){
                                $level3->order = $order;
                                $level3->parent_id = $level2->id;
                                $level3->save();
                                $order += 1;
                            }

                        endforeach;

                    endif;

                endforeach;

            endif;


        endforeach;

        return 1;
    }

}
