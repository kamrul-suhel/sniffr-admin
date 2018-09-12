<div class="col-md-2">
    <div class="form-group">
        <select id="state" name="state" class="form-control" title="Steps">
            @foreach(config('stories.decisions') as $decision_state_key => $decision_state)
                <optgroup label="{{ ucwords(str_replace('-', ' ', $decision_state_key)) }}">
                    @foreach(config('stories.decisions.'.$decision_state_key) as $current_state => $state_values)
                        <option value="{{ $decision_state_key.'--'.$state_values['value'] }}"{{ $chosenDecision.'--'.$chosenState == $decision_state_key.'--'.$state_values['value'] ? ' selected' : '' }}>
                            {{ $state_values['dropdown'] }}
                        </option>
                    @endforeach
                </optgroup>
            @endforeach
        </select>
    </div>
</div>