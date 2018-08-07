// import Plyr from 'plyr'
var PlyrVideo = { render: function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('video', { ref: "video", staticClass: "video", attrs: { "id": ("js-player-video-" + (_vm.idNumber)), "poster": _vm.poster, "crossorigin": _vm.crossorigin } }, [_vm._l(_vm.videos, function (vid, index) {
            return _c('source', { key: index, attrs: { "src": vid.src, "type": ("video/" + (vid.format)) } });
        }), _vm._v(" "), _vm._l(_vm.subtitles, function (subtitle) {
            return _c('track', { key: subtitle.src, attrs: { "kind": "captions", "label": subtitle.label, "src": subtitle.src, "srclang": subtitle.srclang, "default": subtitle.default } });
        })], 2);
    }, staticRenderFns: [],
    name: 'PlyrVideo',
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
        /** Link to poster to show when video hasn't played yet. */
        poster: {
            type: String,
            required: true
        },
        /** Array of videos to include in the video source. */
        videos: {
            type: Array,
            required: true,
            validator: function (value) {
                var valid = true;
                value.forEach(function (vid) {
                    var hasProps = vid.hasOwnProperty('src') && vid.hasOwnProperty('format');
                    if (!hasProps) {
                        valid = false;
                    }
                });
                return valid;
            }
        },
        /** Object for subtitles track. */
        subtitles: {
            type: Array,
            required: false,
            default: function () { return []; },
            validator: function (value) {
                var valid = true;
                value.forEach(function (track) {
                    var hasProps = track.hasOwnProperty('label') && track.hasOwnProperty('src') && track.hasOwnProperty('srclang');
                    if (!hasProps) {
                        valid = false;
                    }
                });
                return valid;
            }
        },
        /** Boolean for whether to put crossorigin attribute on the video element. */
        crossorigin: {
            type: Boolean,
            default: false
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
        this.player = new Plyr(document.getElementById(("js-player-video-" + (this.idNumber))), this.options);
        this.emit.forEach(function (element) {
            this$1.player.on(element, this$1.emitPlayerEvent);
        });
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

var Components = [PlyrVideo];

var index = (function (Vue) {
    Components.forEach(function (Component) {
        Vue.component(Component.name, Component);
    });
});


export { PlyrVideo };
export {index};