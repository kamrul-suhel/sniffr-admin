<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Validator;
use Redirect;
use App\Comment;
use App\Contact;
use App\Video;
use App\Libraries\VideoHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Http\Controllers\Controller;

class AdminContactController extends Controller
{
    use VideoHelper;

    protected $rules = [
        'full_name' => 'required'
    ];

    /**
     * AdminContactController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        $search_value = Input::get('s');

        $contacts = new Contact;

        if (!empty($search_value)) {
            $contacts = Contact::where('full_name', 'LIKE', '%' . $search_value . '%')
                ->orWhere('email', 'LIKE', '%' . $search_value . '%');
        }

        $contacts = $contacts->orderBy('created_at', 'DESC')->paginate(10);

        $data = [
            'contacts' => $contacts,
            'user' => Auth::user()
        ];

        return view('admin.contacts.index', $data);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $data = [
            'post_route' => url('admin/contacts/store'),
            'button_text' => 'Add New Contact',
            'user' => Auth::user(),
            'videos' => Video::get()
        ];
        return view('admin.contacts.create_edit', $data);
    }

    public function store()
    {
        $validator = Validator::make($data = Input::all(), Contact::$rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        Contact::create($data);

        return Redirect::to('admin/contacts')->with([
            'note' => 'New Contact Successfully Added!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $contact = Contact::find($id);

         $data = [
             'headline' => '<i class="fa fa-edit"></i> Edit Contact',
             'contact' => $contact,
             'post_route' => url('admin/contacts/update'),
             'button_text' => 'Update Contact',
             'user' => Auth::user(),
             'videos' => $contact->videos
         ];

        return view('admin.contacts.create_edit', $data);
    }

    /**
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update()
    {
        $data = Input::all();
        $id = $data['id'];
        $contact = Contact::findOrFail($id);

        $validator = Validator::make($data, Contact::$rules);

        if ($validator->fails()) {
            return Redirect::back()->withErrors($validator)->withInput();
        }

        if ($data['comment']) {
            $comment = new Comment();
            $comment->comment = $data['comment'];
            $comment->user_id = Auth::id();

            $contact->comments()->save($comment);
        }

        $contact->update($data);

        return Redirect::to('admin/contacts/edit' . '/' . $id)->with([
            'note' => 'Successfully Updated Contact!',
            'note_type' => 'success'
        ]);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $contact = Contact::find($id);

        if(!$contact) {
            abort(404);
        }

        $contact->destroy($id);

        return Redirect::to('admin/contacts')->with([
            'note' => 'Successfully Deleted Contact',
            'note_type' => 'success'
        ]);
    }
}
