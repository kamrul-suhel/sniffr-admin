<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	<h4 class="modal-title">Update Collection</h4>
</div>

<div class="modal-body">
	<form id="update-cat-form" accept-charset="UTF-8" action="{{ url('admin/videos/collections/update') }}" method="post">
        <label for="name">Collection Name</label>
        <input name="name" id="name" placeholder="Collection Name" class="form-control" value="{{ $collection->name }}" /><br />
        <label for="slug">URL slug (ex. videos/collections/slug-name)</label>
        <input name="slug" id="slug" placeholder="URL Slug" class="form-control" value="{{ $collection->slug }}" />
        <input type="hidden" name="id" id="id" value="{{ $collection->id }}" />
        <input type="hidden" name="_token" value="<?= csrf_token() ?>" />
    </form>
</div>

<div class="modal-footer">
	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	<button type="button" class="btn btn-info" id="submit-update-cat">Update</button>
</div>

<script>
	$(document).ready(function(){
		$('#submit-update-cat').click(function(){
			$('#update-cat-form').submit();
		});
	});
</script>