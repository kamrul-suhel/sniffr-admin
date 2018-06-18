// import Plyr from 'plyr'
import {PlyrVimeo} from "./vimeoVideoPlayer";

// import plyr from 'plyr'
var Plyr = { render: function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { attrs: { "id": ("plyr-container-" + (_vm.idNumber)) } }, [_vm._t("default")], 2);
    }, staticRenderFns: [],
    name: 'Plyr',
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

        var plyr = require('plyr');
        // noinspection JSPotentiallyInvalidConstructorUsage
        this.player = new plyr(document.getElementById(("plyr-container-" + (this.idNumber))).firstChild, this.options);
        this.emit.forEach(function (element) {
            this$1.player.on(element, this$1.emitPlayerEvent);
        });
    },
    beforeDestroy: function beforeDestroy() {
        this.player.destroy();
    },
    methods: {
        emitPlayerEvent: function emitPlayerEvent(event) {
            this.$emit(event.type, event);
        }
    }
};

var Components = [Plyr];

var index = (function (Vue) {
    Components.forEach(function (Component) {
        Vue.component(Component.name, Component);
    });
});


export { Plyr };
export {index};