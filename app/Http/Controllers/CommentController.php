<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Requests\CreateComment;
use App\Http\Requests\DeleteComment;
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
     */
    public function destroy(DeleteComment $request, $id)
    {
        $comment = Comment::where('id', $id)->first();

        if($comment) {
            $comment->delete();
        }

        return redirect()->route('admin.video.edit', [
            'id' => $request->get('alpha_id')
        ]);
    }
}
