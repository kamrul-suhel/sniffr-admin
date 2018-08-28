<div class="col-lg-12">
    <div class="row">
        <div class="col-lg-12">
            <h4>Logs</h4>
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
                        <a>
                            <small>{{ \App\User::find($log->user_id)->full_name }}</small>
                        </a>
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
</div>