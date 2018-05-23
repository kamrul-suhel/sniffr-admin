@extends('emails.template')

@section('content')
<div>
    <span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;">
        <b>Hey client!</b>
    </span>
</div>

<div style="border:#999 dotted 1px;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%;" align="center">
        <tr>
            <td role="modules-container" style="padding: 30px 30px 30px 30px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                <table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td height="100%" valign="top">
                            <img src="{{ env('APP_URL', 'https://sniffrmedia.co.uk') }}/assets/frontend/images/logo-unilad-black.png" style="width:25%;height:auto;" border="0">
                            <div><span style="margin-top:20px;font-style:italic;color:#999;">powered by Sniffr</span></div>
                            <div id="show_note" style="padding-top:20px;padding-bottom:10px;">{{ $mailer->note }}</div>
                        </td>
                    </tr>
                </table>

                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;" height="100%" valign="top" bgcolor="">

                            @if(!empty($mailer->stories))
                            <table class="table table-striped pages-table">
                                @foreach($mailer->stories as $story)
                                <tr>
                                    <td>
                                        <h4>{{ TextHelper::shorten($story['title'], 250) }}</h4>
                                        by {{ $story['author'] }}
                                        <br />
                                        <img src="@if($story['thumb']){{ $story['thumb'] }}@else /assets/frontend/images/placeholder.png @endif" border="0" style="display: flex; height: 200px; width: auto; margin-top: 15px;" />
                                    </td>
                                    <td>
                                        <br />{{ $story['excerpt'] }}..
                                        <br /><br /><a href="#" style="background:#000;color:#fff;padding:10px 6px;border-radius:5px;display:inherit;margin-top:20px;">Request License</a>
                                    </td>
                                </tr>
                                @endforeach
                            </table>
                            @else
                                <strong>No Stories have been selected</strong>
                            @endif

                        </td>
                    </tr>
                </table>

                <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                    <tr>
                        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                            <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                                <tr>
                                    <td style="padding: 0px 0px 10px 0px;" bgcolor="#000000"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <table class="module" role="module" data-type="social" align="left" border="0" cellpadding="0" cellspacing="0" style="table-layout: fixed;">
                    <tbody>
                        <tr>
                            <td style="padding: 20px 10px 30px 0;">
                                <a role="social-icon-link"  href="https://www.facebook.com/uniladmag/" target="_blank" alt="Facebook" data-nolink="false" title="Facebook" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#3B579D;">
                                    <img role="social-icon" alt="Facebook" title="Facebook" height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/facebook.png" />
                                </a>
                            </td>

                            <td style="padding: 20px 10px 30px 0;">
                                <a role="social-icon-link"  href="https://twitter.com/UNILAD" target="_blank" alt="Twitter" data-nolink="false" title="Twitter" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#7AC4F7;">
                                    <img role="social-icon" alt="Twitter" title="Twitter " height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/twitter.png" />
                                </a>
                            </td>

                            <td style="padding: 20px 10px 30px 0;">
                                <a role="social-icon-link"  href="https://www.instagram.com/unilad" target="_blank" alt="Instagram" data-nolink="false" title="Instagram" style="-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;display:inline-block;background-color:#7F4B30;">
                                    <img role="social-icon" alt="Instagram" title="Instagram" height="30" width="30" style="height: 30px, width: 30px" src="https://marketing-image-production.s3.amazonaws.com/social/white/instagram.png" />
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3"></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</div>

<div>Regards,</div>

<div>&nbsp;</div>

<div>The UNILAD Team.</div>
@stop
