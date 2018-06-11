<template>
    <div class="admin-mailer-section" id="admin-mailer">
        <ul class="nav nav-tabs">
            <li class="active">
                <a href="#stories" role="tab" data-toggle="tab">Stories</a>
            </li>

            <li class="">
                <a href="#videos" role="tab" data-toggle="tab">Videos</a>
            </li>
        </ul>

        <div class="panel-body tab-content">
            <div class="tab-pane active" id="stories">
                <mailer-stories-component></mailer-stories-component>
            </div>
            <div class="tab-pane" id="videos">
                <mailer-videos-component></mailer-videos-component>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import MailerVideosComponent from './modules/VideosComponents';
    import MailerStoriesComponent from './modules/StoriesComponents';

    export default {
        components: {
            mailerVideosComponent: MailerVideosComponent,
            mailerStoriesComponent: MailerStoriesComponent
        },

        deta() {
            return {

            }
        },

        created(){
        },

        methods: {

        },
    }
</script>