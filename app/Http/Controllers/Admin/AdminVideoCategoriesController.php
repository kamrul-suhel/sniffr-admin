<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Redirect;
use App\VideoCategory;
use App\Traits\Slug;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;


class AdminVideoCategoriesController extends Controller
{
    use Slug;

    /**
     * AdminVideoCategoriesController constructor.
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
            'user' => Auth::user(),
            'video_categories' => json_decode(VideoCategory::orderBy('order', 'ASC')->get()->toJson()),
        ];

        return view('admin.videos.categories.index', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $input = Input::all();
        $last_category = VideoCategory::orderBy('order', 'DESC')->first();

        if(isset($last_category->order)){
            $new_category_order = intval($last_category->order) + 1;
        } else {
            $new_category_order = 1;
        }
        $input['order'] = $new_category_order;
        $input['slug'] = $this->slugify($input['name']);
        $video_category = VideoCategory::create($input);

        if (!$video_category->id) {
            abort(404);
        }

        return Redirect::to('admin/videos/categories')->with([
            'note' => 'Successfully Added Your New Video Category',
            'note_type' => 'success'
        ]);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $input = Input::all();
        $input['slug'] = $this->slugify($input['name']);
        $category = VideoCategory::find($input['id'])->update($input);
        if (!$category) {
            abort(404);
        }
        return Redirect::to('admin/videos/categories')->with([
            'note' => 'Successfully Updated Category',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        VideoCategory::destroy($id);
        $child_cats = VideoCategory::where('parent_id', '=', $id)->get();

        foreach ($child_cats as $cats) {
            $cats->parent_id = NULL;
            $cats->save();
        }

        return Redirect::to('admin/videos/categories')->with([
            'note' => 'Successfully Deleted Category',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        return view('admin.videos.categories.edit', ['category' => VideoCategory::find($id)]);
    }

    /**
     * @return int
     */
    public function order()
    {
        $category_order = json_decode(Input::get('order'));
        $order = 1;

        foreach ($category_order as $category_level_1) {
            $level1 = VideoCategory::find($category_level_1->id);
            if ($level1->id) {
                $level1->order = $order;
                $level1->parent_id = NULL;
                $level1->save();
                $order += 1;
            }

            if (isset($category_level_1->children)) {
                $children_level_1 = $category_level_1->children;
                foreach ($children_level_1 as $category_level_2) {
                    $level2 = VideoCategory::find($category_level_2->id);
                    if ($level2->id) {
                        $level2->order = $order;
                        $level2->parent_id = $level1->id;
                        $level2->save();
                        $order += 1;
                    }

                    if (isset($category_level_2->children)) {
                        $children_level_2 = $category_level_2->children;

                        foreach ($children_level_2 as $category_level_3) {
                            $level3 = VideoCategory::find($category_level_3->id);
                            if ($level3->id) {
                                $level3->order = $order;
                                $level3->parent_id = $level2->id;
                                $level3->save();
                                $order += 1;
                            }
                        }
                    }
                }
            }
        }
        return 1;
    }
}
