// import Plyr from 'plyr'
import {Plyr, PlyrAudio, PlyrVideo, PlyrVimeo} from "vue-plyr";

var PlyrYoutube = { render: function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _vm.pe ? _c('div', { staticClass: "plyr__youtube-embed", attrs: { "id": ("js-player-yt-" + (_vm.idNumber)) } }, [_c('iframe', { attrs: { "src": ("http://www.youtube.com/embed/" + (_vm.id)), "allowfullscreen": "", "allowtransparency": "", "allow": "autoplay" } })]) : _c('div', { attrs: { "id": ("js-player-yt-" + (_vm.idNumber)), "data-plyr-provider": "youtube", "data-plyr-embed-id": _vm.id } });
    }, staticRenderFns: [],
    name: 'PlyrYoutube',
    props: {
        /** Options object for plyr config. */
        options: {
            type: Object,
            required: false,
            default: function default$1() {
                return {};
            }
        },
        /** Array of events to emit from the plyr object */
        emit: {
            type: Array,
            required: false,
            default: function default$2() {
                return [];
            }
        },
        /** Link or ID of youtube video. */
        id: {
            type: String,
            required: true
        },
        /** Bool of whether to use progressive enhancement or not */
        pe: {
            type: Boolean,
            required: false,
            default: function default$3() {
                return true;
            }
        }
    },
    data: function data() {
        return {
            player: {}
        };
    },
    computed: {
        idNumber: function idNumber() {
            return Math.floor(Math.random() * (100000 - 1)) + 1;
        }
    },

    mounted: function mounted() {
        var this$1 = this;

        var Plyr = require('plyr');
        this.player = new Plyr(document.getElementById(("js-player-yt-" + (this.idNumber))), this.options);
        this.emit.forEach(function (element) {
            this$1.player.on(element, this$1.emitPlayerEvent);
        });
    },

    created(){
    },

    beforeDestroy: function beforeDestroy() {
        // this.player.destroy();
    },

    methods: {
        emitPlayerEvent: function emitPlayerEvent(event) {
            this.$emit(event.type, event);
        }
    }
};

var Components = [PlyrYoutube];

var index = (function (Vue) {
    Components.forEach(function (Component) {
        Vue.component(Component.name, Component);
    });
});


export { PlyrYoutube };
export { index };