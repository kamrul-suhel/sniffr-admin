<?php

namespace App\Http\Controllers\Admin;

use App\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\CreateComment;
use App\Http\Requests\Comment\DeleteComment;
use Illuminate\Support\Facades\Auth;

class AdminCommentController extends Controller
{

	/**
	 * @param getComments $request
	 * @return JSON
	 */
	public function getComments($type = 'video', $asset_id)
	{
		$isJson = request()->ajax();

		$comments = Comment::where($type.'_id', $asset_id)->with('user')->get();

		if ($isJson) {
			return response()->json([
				'status' => 'success',
				'comments' => $comments
			]);
		}

		return $comments;
	}


    /**
     * @param CreateComment $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CreateComment $request)
    {
		$isJson = $request->ajax();

        $note = 'Comment Added';
        $note_type = 'success';

        $assetId = $request->get('asset_id');
        $assetType = $request->get('asset_type');

        $comment = new Comment();
        $comment->comment = $request->get('comment') ?? null;
        $comment->contact_id = $request->get('contact_id') ?? null;
        $comment->state = $request->get('state') ?? null;
        $comment->user_id = Auth::id();

        if($assetType =='video') {
            $comment->video_id = $assetId;
            $comment->story_id = 0;
        } else {
            $comment->story_id = $assetId;
            $comment->video_id = 0;
        }

        $comment->save();

        //If comment is from contacts/{id}/edit
        if($request->has('contact_id')) {
            return redirect('admin/contacts/'.$request->get('contact_id').'/edit');
        }

        if($request->get('asset_type')=='video') {
            $route = 'admin_video_edit';
        } else {
            $route = 'admin.stories.edit';
        }

		if ($isJson) {
        	$comment = Comment::where('id', $comment->id)->with('user')->first();

			return response()->json([
				'status' => 'success',
				'comment' =>  $comment
			]);
		}

        return redirect()->route($route, ['id' => $request->get('alpha_id')])->with([
            'note' => $note,
            'note_type' => $note_type
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
		$isJson = $request->ajax();

        $note = 'Not Authorized to delete this comment!';
        $note_type = 'error';

        $comment = Comment::find($id);

        if(($comment) && ($request->authorize())) {
            $comment->delete();

            $note = 'Comment Deleted';
            $note_type = 'success';
        }

        if($request->get('asset_type')=='video') {
            $route = 'admin_video_edit';
        } else {
            $route = 'admin.stories.edit';
        }

		if ($isJson) {
			return response()->json([
				'status' => 'success'
			]);
		}

        return redirect()->route($route, ['id' => $request->get('alpha_id')])->with([
            'note' => $note,
            'note_type' => $note_type
        ]);
    }
}
