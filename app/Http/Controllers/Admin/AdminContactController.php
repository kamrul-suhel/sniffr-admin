<?php

namespace App\Http\Controllers\Admin;

use View;
use Auth;
use Validator;
use Redirect;

use App\Comment;
use App\Contact;
use App\Video;

use App\Libraries\ThemeHelper;
use App\Libraries\VideoHelper;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;

use App\Http\Controllers\Controller;

class AdminContactController extends Controller
{
    use VideoHelper;
    
    protected $rules = [
        'full_name' => 'required'
    ];

    /**
     * constructor.
     */
    public function __construct(Request $request)
    {
        $this->middleware('admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search_value = Input::get('s');

        $contacts = new Contact;

        if(!empty($search_value)){
            $contacts = Contact::where('full_name', 'LIKE', '%'.$search_value.'%')->orWhere('email', 'LIKE', '%'.$search_value.'%');
        }

        $contacts = $contacts->orderBy('created_at', 'DESC')->paginate(10);
        $user = Auth::user();

        $data = array(
            'contacts' => $contacts,
            'user' => $user,
            'admin_user' => Auth::user()
        );

        return view('admin.contacts.index', $data);
  }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
     $data = array(
         'post_route' => url('admin/contacts/store'),
         'button_text' => 'Add New Contact',
         'admin_user' => Auth::user(),
         'videos' => Video::get()
     );
     return view('admin.contacts.create_edit', $data);
 }

 public function store()
 {
     $validator = Validator::make($data = Input::all(), Contact::$rules);

     if ($validator->fails())
     {
         return Redirect::back()->withErrors($validator)->withInput();
     }

     $contact = Contact::create($data);

     return Redirect::to('admin/contacts')->with(array('note' => 'New Contact Successfully Added!', 'note_type' => 'success') );
 }

     /**
      * Display the specified resource.
      *
      * @param  \App\Contact  $contact
      * @return \Illuminate\Http\Response
      */
     public function show(Contact $contact)
     {
         //
     }

     /**
      * Show the form for editing the specified resource.
      *
      * @param  \App\Contact  $contact
      * @return \Illuminate\Http\Response
      */

     public function edit($id)
     {
         $contact = Contact::find($id);

         $data = array(
             'headline' => '<i class="fa fa-edit"></i> Edit Contact',
             'contact' => $contact,
             'post_route' => url('admin/contacts/update'),
             'button_text' => 'Update Contact',
             'admin_user' => Auth::user(),
             'videos' => $contact->videos
             //'videos' => Video::where('contact_id', '=', $contact->id)->firstOrFail()
         );

         return view('admin.contacts.create_edit', $data);
     }

     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  \App\Contact  $contact
      * @return \Illuminate\Http\Response
      */

     public function update()
     {
         $data = Input::all();
         $id = $data['id'];
         $contact = Contact::findOrFail($id);

         $validator = Validator::make($data, Contact::$rules);

         if ($validator->fails())
         {
             return Redirect::back()->withErrors($validator)->withInput();
         }

         if($data['comment']){
          $comment = new Comment();
          $comment->comment = $data['comment'];
          $comment->user_id = Auth::id();

          $contact->comments()->save($comment);
      }

      $contact->update($data);

      return Redirect::to('admin/contacts/edit' . '/' . $id)->with(array('note' => 'Successfully Updated Contact!', 'note_type' => 'success') );
  }

     /**
      * Remove the specified resource from storage.
      *
      * @param  \App\Contact  $contact
      * @return \Illuminate\Http\Response
      */

     public function destroy($id)
     {
         $contact = Contact::find($id);

         Contact::destroy($id);

         return Redirect::to('admin/contacts')->with(array('note' => 'Successfully Deleted Contact', 'note_type' => 'success') );
     }
 }
