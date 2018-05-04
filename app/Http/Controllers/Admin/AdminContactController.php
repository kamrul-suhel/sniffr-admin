<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Contact\CreateContactRequest;
use App\Http\Requests\Contact\UpdateContactRequest;
use Auth;
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
            'videos' => Video::get(),
            'contact' => null,
        ];
        return view('admin.contacts.create_edit', $data);
    }

    /**
     * @param CreateContactRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateContactRequest $request)
    {
        $contact = new Contact();
        $contact->full_name = $request->input('full_name');
        $contact->email = $request->input('email');
        $contact->tel = $request->input('tel');
        $contact->language = $request->input('language_code');
        $contact->country_code = $request->input('country_code');
        $contact->location = $request->input('location');
        $contact->paypal = $request->input('paypal');
        $contact->facebook = $request->input('facebook');
        $contact->youtube = $request->input('youtube');
        $contact->instagram = $request->input('instagram');
        $contact->twitter = $request->input('twitter');
        $contact->reddit = $request->input('reddit');
        $contact->other = $request->input('other');
        $contact->save();

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
     * @param Contact $contact
     * @param UpdateContactRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update(Contact $contact, UpdateContactRequest $request)
    {
        $contact->full_name = $request->input('full_name');
        $contact->email = $request->input('email');
        $contact->tel = $request->input('tel');
        $contact->language = $request->input('language_code');
        $contact->country_code = $request->input('country_code');
        $contact->location = $request->input('location');
        $contact->paypal = $request->input('paypal');
        $contact->facebook = $request->input('facebook');
        $contact->youtube = $request->input('youtube');
        $contact->instagram = $request->input('instagram');
        $contact->twitter = $request->input('twitter');
        $contact->reddit = $request->input('reddit');
        $contact->other = $request->input('other');
        $contact->save();

        return redirect()->route('contacts.edit' , ['id' => $contact->id])->with([
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

    /**
     * @param Request $request
     * @param Contact $contact
     */
    public function addComment(Request $request, Contact $contact)
    {
        $comment = new Comment();
        $comment->comment = $request['comment'];
        $comment->user_id = Auth::id();

        $contact->comments()->save($comment);
    }
}
