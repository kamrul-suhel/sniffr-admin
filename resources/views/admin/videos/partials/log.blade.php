<div class="row">
    <div class="col-md-12">
        <div class="panel panel-primary" data-collapsed="0">
            <div class="panel-heading">
                <div class="panel-title">Logs</div>
                <div class="panel-options">
                    <a href="#" data-rel="collapse"><i class="fa fa-angle-down"></i></a>
                </div>
            </div>

            <div class="panel-body" style="display: block;">
                <table class="table table-condensed table-bordered table-striped">
                    <thead>
                    <th><i class="fa fa-user"></i></th>
                    <th><i class="fa fa-history"></i></th>
                    <th><i class="fa fa-recycle"></i></th>
                    </thead>
                    <tbody>
                    @foreach($logs as $log)
                        <tr style="font-size: 10px;">
                            <td>
                                {{ \App\User::find($log->user_id)->full_name }} <br>
                                ({{ date('d m y @ h:i', strtotime($log->created_at)) }})
                            </td>
							<?php $decodedOld = json_decode($log->old_values); ?>
                            @if($decodedOld !== null)
                                <td>
                                    @foreach($decodedOld as $key => $value)
                                        - {{$key}}: <b>{{$value}}</b>
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
                    @endforeach
                    </tbody>
                </table>
                <div class="col-lg-12 text-center small">
                    {{ $logs->links() }}
                </div>
            </div>
        </div>
    </div>
</div>
