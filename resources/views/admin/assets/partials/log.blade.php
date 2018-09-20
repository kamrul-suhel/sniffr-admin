<div class="panel panel-primary" data-collapsed="0">
    <div class="panel-heading">
        <div class="panel-title">Logs</div>
        <div class="panel-options">
            <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
        </div>
    </div>

    <div class="panel-body" style="display: none; background: #fcfcfc;">
        <ul class="timeline">
            <li>
                <table class="table table-condensed">
                    <tbody>
                    <tr>
                        <td>
                            <small>From</small>
                        </td>
                        <td>
                            <small>To</small>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </li>
            @foreach($logs as $log)
                <li>
                    @if($log->user_id)
                        <td><small>{{ \App\User::find($log->user_id)->full_name }}</small></td>
                    @else
                        <td><small>System</small></td>
                    @endif
                    <small><a href="#"
                              class="pull-right badge">{{ date('dS F Y @ h:i', strtotime($log->created_at)) }}</a>
                    </small>
                    <table class="table table-condensed">
                        <tbody>

                        <tr style="font-size: 10px;">
                            <?php $decodedOld = json_decode($log->old_values); ?>
                            @if($decodedOld !== null)
                                <td>
                                    @foreach($decodedOld as $key => $value)
                                        {{$key}}: <b>{{$value}}</b>
                                    @endforeach
                                </td>
                            @else
                                <td>{{ $log->old_values }}</td>
                            @endif

                            <?php $decodedNew = json_decode($log->new_values); ?>
                            @if($decodedNew !== null)

                                <td>
                                    @foreach($decodedNew as $key2 => $value2)
                                        @if(!is_object($value2))
                                            @if($key2 !== 'sourced_at')
                                                - {{$key2}}: <b>{{$value2}}</b>
                                            @endif
                                        @endif
                                    @endforeach
                                </td>
                            @else
                                <td>{{ $log->new_values }}</td>
                            @endif
                        </tr>
                        </tbody>
                    </table>
                </li>
            @endforeach
        </ul>
        {{ $logs->links() }}
    </div>
</div>
