<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Requests\Comment\CreateComment;
use App\Http\Requests\Comment\DeleteComment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * @param CreateComment $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateComment $request)
    {
        $comment = new Comment();
        $comment->comment = $request->get('comment') ?? null;
        $comment->contact_id = $request->get('contact_id') ?? null;
        $comment->user_id = Auth::id();

        if($request->get('asset_type')=='video') {
            $comment->video_id = $request->get('asset_id');
            $comment->story_id = 0;
        } else {
            $comment->story_id = $request->get('asset_id');
            $comment->video_id = 0;
        }

        $comment->save();

        //If comment is from contacts/{id}/edit
        if($request->has('contact_id')) {
            return redirect('admin/contacts/'.$request->get('contact_id').'/edit');
        }

        if($request->get('asset_type')=='video') {
            return redirect()->route('admin_video_edit', ['id' => $request->get('alpha_id')]);
        } else {
            return redirect()->route('admin.stories.edit', ['id' => $request->get('alpha_id')]);
        }
    }

    /**
     * @param DeleteComment $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy(DeleteComment $request, $id)
    {
        dd($request);

        $note = 'Not Authorized to delete this comment!';
        $note_type = 'error';

        $comment = Comment::find($id);

        if(($comment) && ($request->authorize())) {
            $comment->delete();

            $note = 'Comment Deleted';
            $note_type = 'success';
        }

        if($request->get('asset_type')=='video') {
            $route = '';
        } else {
            $route = '';
        }

        return redirect()->route('admin_video_edit', ['id' => $request->get('alpha_id')])->with([
            'note' => $note,
            'note_type' => $note_type
        ]);
    }
}
