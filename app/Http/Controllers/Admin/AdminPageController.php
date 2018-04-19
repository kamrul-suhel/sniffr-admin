<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use App\Page;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminPageController extends Controller {

    /**
     * AdminPageController constructor.
     */
    public function __construct()
    {
        $this->middleware(['admin:admin']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $pages = Page::orderBy('created_at', 'DESC')->paginate(10);

        $data = array(
            'pages' => $pages,
            'user' => Auth::user()
            );

        return view('admin.pages.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = array(
            'post_route' => url('admin/pages/store'),
            'button_text' => 'Add New Page',
            'user' => Auth::user()
            );
        return view('admin.pages.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $validator = Validator::make($data = Input::all(), Page::$rules);

        if ($validator->fails())
        {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        Page::create($data);

        return Redirect::to('admin/pages')->with([
            'note' => 'New Page Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $page = Page::find($id);

        $data = [
            'headline' => '<i class="fa fa-edit"></i> Edit Page',
            'page' => $page,
            'post_route' => url('admin/pages/update'),
            'button_text' => 'Update Page',
            'user' => Auth::user()
        ];

        return view('admin.pages.create_edit', $data);
    }

    /**
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $page = Page::findOrFail($id);

        $validator = Validator::make($data, Page::$rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        if (!isset($data['active']) || $data['active'] == '') {
            $data['active'] = 0;
        }

        $page->update($data);

        return Redirect::to('admin/pages/edit' . '/' . $id)->with([
            'note' => 'Successfully Updated Page!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $page = Page::find($id);

        $page->destroy($id);

        return Redirect::to('admin/pages')->with([
            'note' => 'Successfully Deleted Page',
            'note_type' => 'success'
        ]);
    }


}
