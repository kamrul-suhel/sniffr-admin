<?php $settings = config('settings.site'); ?>
<style type="text/css">
body {
    font-family: Arial;
    font-size: 14px;
}
table {
    width:100%;
}
td {
    padding:5px;
}
td.grey {
    font-weight: bold;
    width:25%;
    background: #eee !important;
}
td.small {
    font-size: 12px;
}
</style>
<div class="container">

    <h3>UNILAD Website Video Submission</h3>

	<table>

		<tr>
			<td class="grey">Submission ID:</td>
			<td>{{ $video->alpha_id }}</td>
		</tr>

        <tr>
            <td class="grey">Submission Date:</td>
			<td>{{ Carbon\Carbon::parse($video->created_at)->format('jS \o\f F, Y g:i:s a') }}</td>
		</tr>

        <tr>
            <td class="grey">Full Name:</td>
			<td>{{ $video->contact->full_name }}</td>
		</tr>

        <tr>
            <td class="grey">Email:</td>
			<td>{{ $video->contact->email }}</td>
		</tr>

        @if(!empty($video->contact->tel))
        <tr>
            <td class="grey">Phone:</td>
			<td>{{ $video->contact->tel }}</td>
		</tr>
        @endif

        <tr>
            <td class="grey">Video Title:</td>
			<td>{{ $video->title }}</td>
		</tr>

        <tr>
            <td class="grey">Video URL:</td>
			<td>{!! (!empty($video->url) ? '<a href="'.$video->url.'">'.$video->url.'</a>' : 'Not provided') !!}</td>
		</tr>

        <tr>
            <td class="grey">Video File:</td>
			<td>{!! (!empty($video->file) ? '<a href="'.$video->file.'">'.$video->file.'</a>' : 'Not provided') !!}</td>
		</tr>

        <!-- More details -->
        @if(!empty($video->more_details))
        <tr>
            <td class="grey">Date Filmed:</td>
			<td>{{ (!empty($video->date_filmed) ? Carbon\Carbon::parse($video->date_filmed)->format('jS \o\f F, Y g:i:s a') : 'Not provided') }}</td>
		</tr>
        <tr>
            <td class="grey">Where Filmed:</td>
			<td>{{ (!empty($video->location) ? $video->location : 'Not provided') }}</td>
		</tr>
        <tr>
            <td class="grey">More Information:</td>
			<td>{{ (!empty($video->more_details) ? $video->description : 'Not provided') }}</td>
		</tr>
        <tr>
            <td class="grey">Submitted Elsewhere:</td>
			<td>{{ (!empty($video->submitted_elsewhere) ? $video->submitted_where : 'No') }}</td>
		</tr>
        @elseif($video->rights=='nonex')
        <tr>
            <td class="grey">Notes:</td>
			<td>{{ (!empty($video->notes) ? $video->notes : 'Not provided') }}</td>
		</tr>
        <tr>
            <td class="grey">Credit Link:</td>
			<td>{{ (!empty($video->credit) ? $video->credit : 'Not provided') }}</td>
		</tr>
        <tr>
            <td class="grey">UNILAD Referrer:</td>
			<td>{{ (!empty($video->referrer) ? $video->referrer : 'Not provided') }}</td>
		</tr>
        @endif
        <!-- More details end -->

        <!-- Terms -->
        @if(!empty($video->more_details))
        <tr>
            <td class="grey">I confirm:</td>
			<td>
                <p>{{ $settings->terms_ex_contact_is_owner }}</p>
                <p>{{ $settings->terms_ex_allow_publish }}</p>
                <p>{{ $settings->terms_ex_is_exclusive }}</p>
            </td>
		</tr>
        @endif
        <tr>
            <td class="grey">Terms and Conditions Accepted:</td>
			<td class="small">
                {!! ($video->rights=='ex' ? $settings->terms_ex : $settings->terms_non_ex) !!}
            </td>
		</tr>
        <!-- Terms end -->

	</table>
</div>
