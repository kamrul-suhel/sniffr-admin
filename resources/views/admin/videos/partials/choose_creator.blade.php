<div class="row">
    <div class="col-md-4">
        <div class="input-group" id="selectpicker-creator">
            <span class="input-group-addon">Creator</span>
            {{ Form::text('q', '', ['id' =>  'q', 'placeholder' =>  'Enter name', 'class' => 'form-control'])}}
        </div>
        <input type="hidden" id="creator_id" name="creator_id"/>
    </div>
    @if(!$video)
        <div class="col-md-4">
            <div class="input-group">OR &nbsp;
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#add_creator_modal">
                    Add a New Creator
                </button>
            </div>
        </div>
    @endif
</div>