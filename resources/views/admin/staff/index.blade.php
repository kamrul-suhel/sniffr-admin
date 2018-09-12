@extends('admin.master')

@section('content')
    <div class="admin-section-title bottom-padding">
        <div class="row">
            <div class="col-xs-12">
                <h3>
                    <i class="fa fa-users"></i>
                    {{ ucwords($type) }} Staff Management ({{$users->count()}} employees)
                </h3>
            </div>
        </div> 
    </div>
    <div class="clear"></div>
    <form class="col-lg-12">
        <div class="input-group">
            <input class="form-control input-lg" style="resize: none;" type="text" name="rangepicker"
                   autocomplete="off">
            <a href="{{ url('admin/staff?type='.$type) }}" class="btn btn-lg btn-success input-group-addon"
               style="background-color: #00a65a; color: white;">Reset</a>
        </div>
        <hr>
    </form>

    @if($type === 'video')
        <form action="{{ route('staff.index', ['from' => $from, 'to' => $to]) }}" method="get">
            <select id="rights" name="rights" class="form-control input-lg" onchange="this.form.submit()">
                <option value="ex"{{ ($rights == 'ex') ? ' selected="selected"' : '' }}><a>Ex Submission</option>
                <option value="exc"{{ ($rights == 'exc') ? ' selected="selected"' : '' }}><a>Ex Chaser</option>
                {{--<option value="excc"{{ (request()->get('rights') == 'excc') ? ' selected="selected"' : '' }}><a>Ex Chaser Channel</option>--}}
                {{--<option value="nonex"{{ (request()->get('rights') == 'nonex') ? ' selected="selected"' : '' }}><a>Non Ex</option>--}}
                {{--<option value="nonexc"{{ (request()->get('rights') == 'nonexc') ? ' selected="selected"' : '' }}><a>Non Ex Chaser</option>--}}
            </select>
        </form>
    @endif

    <div class="clear"></div>

    <div id="tab_staff" class="tab-pane">
        <div class="row">
            <div class="col-lg-12">
                @include('admin.staff.partials.'.$type)
            </div>
        </div>
    </div>
@stop

@section('javascript')
    <script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css"/>

    <script>
        (function ($) {
            $('input[name="rangepicker"]').daterangepicker({
                alwaysShowCalendars: true,
                startDate: '{{ $from->format('d/m/Y') }}',
                endDate: '{{ $to->format('d/m/Y') }}',
                locale: {
                    format: 'DD/MM/YYYY',
                    firstDay: 1,
                },
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last Week': [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            });

            $('input[name="rangepicker"]').on('apply.daterangepicker', function (ev, picker) {
                window.location.search += '&from=' + picker.startDate.format('YYYY-MM-DD') + '&to=' + picker.endDate.format('YYYY-MM-DD');
            });

        })(jQuery);
    </script>
@stop

