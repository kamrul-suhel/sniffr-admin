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
        $comment->comment = $request->get('comment');
        $comment->video_id = $request->get('video_id');
        $comment->user_id = Auth::id();
        $comment->save();

        return redirect()->route('admin.video.edit', [
            'id' => $request->get('alpha_id')
        ]);
    }

    /**
     * @param DeleteComment $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy(DeleteComment $request, $id)
    {
        $note = 'Not Authorized to delete this comment!';
        $note_type = 'error';

        $comment = Comment::find($id);

        if(($comment) && ($request->authorize())) {
            $comment->delete();

            $note = 'Comment Deleted';
            $note_type = 'success';
        }

        return redirect()->route('admin.video.edit', ['id' => $request->get('alpha_id')])->with([
            'note' => $note,
            'note_type' => $note_type
        ]);
    }
}
