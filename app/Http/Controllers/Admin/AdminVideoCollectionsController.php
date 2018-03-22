<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use App\Page;
use App\Menu;
use App\VideoCollection;

use App\Libraries\ThemeHelper;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class AdminVideoCollectionsController extends Controller {

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
            'video_collections' => json_decode(VideoCollection::orderBy('order', 'ASC')->get()->toJson()),
        );

        return view('admin.videos.collections.index', $data);
    }

    public function store(){
        $input = Input::all();
        $last_collection = VideoCollection::orderBy('order', 'DESC')->first();

        if(isset($last_collectiony->order)){
            $new_collection_order = intval($last_collection->order) + 1;
        } else {
            $new_collection_order = 1;
        }
        $input['order'] = $new_collection_order;
        $video_collection = VideoCollection::create($input);
        if(isset($video_collection->id)){
            return Redirect::to('admin/videos/collections')->with(array('note' => 'Successfully Added Your New Video Collectio', 'note_type' => 'success') );
        }
    }

    public function update(){
        $input = Input::all();
        $collection = VideoCollection::find($input['id'])->update($input);
        if(isset($collection)){
            return Redirect::to('admin/videos/collections')->with(array('note' => 'Successfully Updated Collection', 'note_type' => 'success') );
        }
    }

    public function destroy($id){
        VideoCollection::destroy($id);
        $child_collections = VideoCollection::where('parent_id', '=', $id)->get();
        foreach($child_collections as $collection){
            $collection->parent_id = NULL;
            $collection->save();
        }
        return Redirect::to('admin/videos/collections')->with(array('note' => 'Successfully Deleted Collection', 'note_type' => 'success') );
    }

    public function edit($id){
        return view('admin.videos.collections.edit', array('collections' => VideoCollection::find($id)));
    }

    public function order(){
        $collection_order = json_decode(Input::get('order'));
        $video_collections = VideoCollection::all();
        $order = 1;

        foreach($collection_order as $collection_level_1):

            $level1 = VideoCollection::find($collection_level_1->id);
            if($level1->id){
                $level1->order = $order;
                $level1->parent_id = NULL;
                $level1->save();
                $order += 1;
            }

            if(isset($collection_level_1->children)):

                $children_level_1 = $collection_level_1->children;

                foreach($children_level_1 as $collection_level_2):

                    $level2 = VideoCollection::find($collection_level_2->id);
                    if($level2->id){
                        $level2->order = $order;
                        $level2->parent_id = $level1->id;
                        $level2->save();
                        $order += 1;
                    }

                    if(isset($collection_level_2->children)):

                        $children_level_2 = $collection_level_2->children;


                        foreach($children_level_2 as $collection_level_3):

                            $level3 = VideoCollection::find($collection_level_3->id);
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
