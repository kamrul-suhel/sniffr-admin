<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use App\VideoShotType;
use App\Traits\Slug;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class AdminVideoShotTypeController extends Controller
{
    use Slug;

    /**
     * AdminVideoShotTypeController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $data = [
            'admin_user' => Auth::user(),
            'video_shottypes' => json_decode(VideoShotType::orderBy('order', 'ASC')->get()->toJson()),
        ];

        return view('admin.videos.shottypes.index', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $input = Input::all();
        $last_shottype = VideoShotType::orderBy('order', 'DESC')->first();

        if (isset($last_shottype->order)) {
            $new_shottype_order = intval($last_shottype->order) + 1;
        } else {
            $new_shottype_order = 1;
        }
        $input['order'] = $new_shottype_order;
        $input['slug'] = $this->slugify($input['name']);
        $video_shottype = VideoShotType::create($input);
        if (!$video_shottype) {
            abort(404);
        }
        return Redirect::to('admin/videos/shottypes')->with([
            'note' => 'Successfully Added Your New Video Shot Type',
            'note_type' => 'success'
        ]);
    }

    public function update()
    {
        $input = Input::all();
        $input['slug'] = $this->slugify($input['name']);
        $shottype = VideoShotType::find($input['id'])->update($input);
        if (isset($shottype)) {
            return Redirect::to('admin/videos/shottypes')->with([
                'note' => 'Successfully Updated Shot Type',
                'note_type' => 'success'
            ]);
        }
    }

    public function destroy($id)
    {
        VideoShotType::destroy($id);
        $child_shottypes = VideoShotType::where('parent_id', '=', $id)->get();
        foreach ($child_shottypes as $shottype) {
            $shottype->parent_id = NULL;
            $shottype->save();
        }
        return Redirect::to('admin/videos/shottypes')->with([
            'note' => 'Successfully Deleted Shot Type',
            'note_type' => 'success'
        ]);
    }

    public function edit($id)
    {
        return view('admin.videos.shottypes.edit', ['shottype' => VideoShotType::find($id)]);
    }

    public function order()
    {
        $shottype_order = json_decode(Input::get('order'));
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
