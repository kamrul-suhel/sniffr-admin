<?php

namespace App\Http\Controllers\Contact;

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

class ContactController extends Controller
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

        $new_contact = Contact::where('email', $request->input('email'))->first();

        $redirect_url = $request->input('referral', 'contacts.index');

        return redirect()->route($redirect_url)->with([
            'note' => 'New Creator Successfully Added!',
            'note_type' => 'success',
            'contact_id' => $new_contact->id
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
             'user' => Auth::user(),
             'videos' => $contact->videos,
             'comments' => $contact->comments()->orderBy('created_at', 'desc')->paginate(6)
         ];

        return view('admin.contacts.create_edit', $data);
    }

    /**
     * @param Contact $contact
     * @param UpdateContactRequest $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function update(UpdateContactRequest $request, Contact $contact)
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

	/**
	 * Contact autocomplete
	 */
	public function autocomplete(){
		$term = Input::get('term');

		$results = array();

		$queries = Contact::where('full_name', 'LIKE', '%'.$term.'%')
			->orWhere('email', 'LIKE', '%'.$term.'%')
			->take(10)->get();

		if(!count($queries)) {
			$results[] = [ 'id' => '', 'value' => 'No results found' ];
		}else{
			foreach ($queries as $query)
			{
				$results[] = [ 'id' => $query->id, 'value' => $query->full_name.': '.$query->email ];
			}
		}

		return response()->json($results);
	}
}
