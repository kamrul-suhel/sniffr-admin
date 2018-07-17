@include('emails.new.partials.header')

<body width="100%" height="100%" bgcolor="#F1F1F1" style="margin: 0; mso-line-height-rule: exactly;">

<center style="width: 100%; background: #F1F1F1; text-align: left; height:100%;">

    <div style="max-width: 680px; margin: auto; height:100%;" class="email-container">
        <!--[if mso]>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
            <tr>
                <td>
        <![endif]-->

        <!-- Email Body : BEGIN -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%"
               style="max-width: 680px;" class="email-container">

            <!-- HEADER : BEGIN -->
            <tr>
                <td bgcolor="#333333">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            <td style="padding: 30px 40px 30px 40px; text-align: center;" align="center">
                                <a href="{{ url('/') }}"><img src="https://sniffrmedia.co.uk/assets/frontend/images/logo-sniffr-white.png"
                                     width="120" alt="Sniffr" border="0"
                                     style="height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- HEADER : END -->

            <!-- HERO : BEGIN -->
            <tr>
                <!-- Bulletproof Background Images c/o https://backgrounds.cm -->
                <td background="background.png" bgcolor="#222222" align="center" valign="top" style="text-align: center; background-position: center center !important; background-size: cover !important;">
                    <!--[if gte mso 9]>
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"
                            style="width:680px; height:380px; background-position: center center !important;">
                        <v:fill type="tile" src="background.png" color="#222222"/>
                        <v:textbox inset="0,0,0,0">
                    <![endif]-->
                    <div>
                        <!--[if mso]>
                        <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center"
                               width="500">
                            <tr>
                                <td align="center" valign="middle" width="500">
                        <![endif]-->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" width="100%" style="max-width:100%; margin: auto;">
                            <tr>
                                <td align="center" valign="middle">

                                    <table>
                                        <tr>
                                            <td valign="top" style="text-align: center; padding: 60px 0 10px 20px;">

                                                <h1 style="margin: 0; font-family: 'Montserrat', sans-serif; font-size: 30px; line-height: 36px; color: #ffffff; font-weight: bold;">
                                                    We have received your request!
                                                </h1>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td valign="top"
                                                style="text-align: center; padding: 10px 20px 15px 20px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #c5c5c5;">
                                                <p style="margin: 0;">We are looking into your request, and will get back to you as soon as possible</p>
                                                <br>
                                                <p>The Sniffr Team</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td height="20" style="font-size:20px; line-height:20px;">&nbsp;</td>
                            </tr>
                        </table>
                        <!--[if mso]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                    <!--[if gte mso 9]>
                    </v:textbox>
                    </v:rect>
                    <![endif]-->
                </td>
            </tr>
            <!-- HERO : END -->

            <!-- BLOGROLL : BEGIN -->
            <tr>
                <td bgcolor="#f7fafc">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                            @include('emails.new.partials.asset')
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- BLOGROLL : END -->

            @include('emails.new.partials.cta')

            @include('emails.new.partials.footer')
        </table>
        <!-- Email Body : END -->

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
    </div>

</center>

</body>
</html>
