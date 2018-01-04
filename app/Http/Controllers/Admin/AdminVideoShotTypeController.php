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
            'video_collections' => json_decode(VideoShotType::orderBy('order', 'ASC')->get()->toJson()),
        );

        return view('admin.videos.categories.index', $data);
    }

    public function store(){
        $input = Input::all();
        $last_category = VideoShotType::orderBy('order', 'DESC')->first();

        if(isset($last_category->order)){
            $new_category_order = intval($last_category->order) + 1;
        } else {
            $new_category_order = 1;
        }
        $input['order'] = $new_category_order;
        $video_category = VideoShotType::create($input);
        if(isset($video_category->id)){
            return Redirect::to('admin/videos/categories')->with(array('note' => 'Successfully Added Your New Video Category', 'note_type' => 'success') );
        }
    }

    public function update(){
        $input = Input::all();
        $category = VideoShotType::find($input['id'])->update($input);
        if(isset($category)){
            return Redirect::to('admin/videos/categories')->with(array('note' => 'Successfully Updated Category', 'note_type' => 'success') );
        }
    }

    public function destroy($id){
        VideoShotType::destroy($id);
        $child_cats = VideoShotType::where('parent_id', '=', $id)->get();
        foreach($child_cats as $cats){
            $cats->parent_id = NULL;
            $cats->save();
        }
        return Redirect::to('admin/videos/categories')->with(array('note' => 'Successfully Deleted Category', 'note_type' => 'success') );
    }

    public function edit($id){
        return view('admin.videos.categories.edit', array('category' => VideoShotType::find($id)));
    }

    public function order(){
        $category_order = json_decode(Input::get('order'));
        $video_categories = VideoShotType::all();
        $order = 1;

        foreach($category_order as $category_level_1):

            $level1 = VideoShotType::find($category_level_1->id);
            if($level1->id){
                $level1->order = $order;
                $level1->parent_id = NULL;
                $level1->save();
                $order += 1;
            }

            if(isset($category_level_1->children)):

                $children_level_1 = $category_level_1->children;

                foreach($children_level_1 as $category_level_2):

                    $level2 = VideoShotType::find($category_level_2->id);
                    if($level2->id){
                        $level2->order = $order;
                        $level2->parent_id = $level1->id;
                        $level2->save();
                        $order += 1;
                    }

                    if(isset($category_level_2->children)):

                        $children_level_2 = $category_level_2->children;


                        foreach($children_level_2 as $category_level_3):

                            $level3 = VideoShotType::find($category_level_3->id);
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
