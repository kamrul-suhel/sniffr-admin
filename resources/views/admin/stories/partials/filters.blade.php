<div class="col-md-2">
    <div class="form-group">
        <select id="state" name="state" class="form-control" title="Steps">
            @foreach(config('stories.decisions') as $decision_state_key => $decision_state)
                <optgroup label="{{ ucwords(str_replace('-', ' ', $decision_state_key)) }}">
                    @foreach(config('stories.decisions.'.$decision_state_key) as $current_state => $state_values)
                        <option value="{{ $decision_state_key.'--'.$state_values['value'] }}" @if($decision.'--'.$chosenState==$decision_state_key.'--'.$state_values['value']) selected @endif>
                            {{ $state_values['dropdown'] }}
                        </option>
                    @endforeach
                </optgroup>
            @endforeach
        </select>
    </div>
</div>

<div class="col-md-2">
    <div class="form-group">
        <select id="assignee" name="assignee" class="form-control" title="Assign To">
            <option value="">Assignee</option>
            @foreach($users as $user)
                <option value="{{ $user->id }}" @if($assignee==$user->id) selected @endif>@if($user->full_name) {{ $user->full_name }} @else {{ $user->username }} @endif</option>
            @endforeach
        </select>
    </div>
</div>