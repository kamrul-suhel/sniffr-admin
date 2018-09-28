@extends('emails.template_sniffr')

@section('content')

    <p>Hi {{ $company->owner->full_name }}</p>
    <br>

    <div class="col-lg-12">
        <div class="container">
            <h2>Your company has been approved!</h2>

            <br>

            <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg"
                 xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"
                 xmlns:svg="http://www.w3.org/2000/svg" id="svg2" viewBox="-200 0 600 200" version="1.0">
                <g id="layer1" transform="translate(-73.248 -53.178)">
                    <g id="g2414" transform="translate(-123.39 12.728)">
                        <text id="text3228" font-size="40px" xml:space="preserve" y="137.75861" x="163.32207"font-family="Kochi Gothic" fill="#000000">
                        <tspan id="tspan3230" y="137.75861" x="163.32207"/>
                    </text>
                        <path id="path2418"
                              d="m289.67 57.934c-45.77 0-83.03 37.263-83.03 83.026 0 45.77 37.26 83.03 83.03 83.03s83.03-37.26 83.03-83.03c0-19.78-6.7-37.48-18.07-51.972l-7.81 9.266c9.91 12.206 13.79 25.756 13.79 42.706 0 39.22-31.72 70.92-70.94 70.92s-70.94-31.7-70.94-70.92 31.72-70.934 70.94-70.934c12.43 0 21.72 1.786 31.87 7.391l7.43-9.754c-11.88-6.562-24.8-9.729-39.3-9.729z"
                              fill-rule="evenodd"/>
                        <path id="path2510"
                              d="m258.94 130.04c3.35 0 5.88 2.75 7.6 8.25 3.43 10.3 5.88 15.45 7.34 15.45 1.11 0 2.27-0.86 3.47-2.58 24.13-38.63 46.45-69.879 66.97-93.745 5.32-6.181 13.78-9.272 25.37-9.272 2.74 0 4.59 0.258 5.53 0.773 0.95 0.515 1.42 1.159 1.42 1.931 0 1.202-1.42 3.563-4.25 7.083-33.14 39.835-63.87 81.9-92.2 126.2-1.98 3.09-6.01 4.64-12.11 4.64-6.18 0-9.83-0.26-10.94-0.78-2.92-1.28-6.36-7.85-10.31-19.7-4.46-13.13-6.69-21.38-6.69-24.72 0-3.61 3-7.09 9.01-10.44 3.69-2.06 6.96-3.09 9.79-3.09"/>
                    </g>
                </g>
                <metadata>
                    <rdf:RDF>
                        <cc:Work>
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                            <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/"/>
                            <dc:publisher>
                                <cc:Agent rdf:about="http://openclipart.org/">
                                    <dc:title>Openclipart</dc:title>
                                </cc:Agent>
                            </dc:publisher>
                            <dc:title>checkmark_on_circle</dc:title>
                            <dc:date>2008-10-26T10:10:59</dc:date>
                            <dc:description>Checkmarks/ticks on circles&#xD;\nLeft version comes with an intersected
                                circle (as a path). Right version has a full circle. There the tick is a overlay
                                (with a
                                "shadow"; made gray only for visibility)
                            </dc:description>
                            <dc:source>http://openclipart.org/detail/19803/checkmark_on_circle-by-andrea_s
                            </dc:source>
                            <dc:creator>
                                <cc:Agent>
                                    <dc:title>andrea_S</dc:title>
                                </cc:Agent>
                            </dc:creator>
                            <dc:subject>
                                <rdf:Bag>
                                    <rdf:li>check</rdf:li>
                                    <rdf:li>checkmark</rdf:li>
                                    <rdf:li>circle</rdf:li>
                                    <rdf:li>clip art</rdf:li>
                                    <rdf:li>clipart</rdf:li>
                                    <rdf:li>image</rdf:li>
                                    <rdf:li>media</rdf:li>
                                    <rdf:li>png</rdf:li>
                                    <rdf:li>public domain</rdf:li>
                                    <rdf:li>round</rdf:li>
                                    <rdf:li>sign</rdf:li>
                                    <rdf:li>svg</rdf:li>
                                    <rdf:li>symbol</rdf:li>
                                    <rdf:li>tick</rdf:li>
                                </rdf:Bag>
                            </dc:subject>
                        </cc:Work>
                        <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/">
                            <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"/>
                            <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"/>
                            <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"/>
                        </cc:License>
                    </rdf:RDF>
                </metadata>
            </svg>
            <p>You can now access exclusive content, buy, and license our stories and videos.</p>

            <br>

            <p>We recommend updating your company profile as soon as possible. You can also add new users from your
                company too!</p>
            <br>
            <hr>
            <br>

            <p>
                <a class="pull-right" href="{{ url(env('FRONTEND_URL').'/client/profile') }}"
                   style="background:#000;color:#fff;padding:10px 8px;border-radius:5px;font-weight:bold;">
                    Account Settings
                </a>
            </p>
        </div>
    </div>
@endsection