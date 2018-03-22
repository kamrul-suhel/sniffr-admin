/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 234);
/******/ })
/************************************************************************/
/******/ ({

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(235);


/***/ }),

/***/ 235:
/***/ (function(module, exports) {

$(document).ready(function () {
    var browserheight = window.innerHeight;
    $('#video').css('height', browserheight + 'px');

    var first_nav_pos = $('#nav').position();
    var second_nav_pos = $('.second-navigation').position();
    var second_nav_height = $('.second-navigation').outerHeight();
    var hide_nav_position = browserheight - second_nav_height;

    $(window).scroll(function (e) {
        if (window.pageYOffset > hide_nav_position) {
            $('#nav').hide();
        } else {
            $('#nav').show();
        }
    });
});

new Vue({
    el: '#sniffr',
    data: function data() {
        return {
            valid: false,
            full_name: '',
            nameRules: [function (v) {
                return !!v || 'Name is required';
            }],
            email: '',
            emailRules: [function (v) {
                return !!v || 'E-mail is required';
            }, function (v) {
                return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                );
            }],
            phone: '',
            phoneRules: [function (v) {
                return !!v || 'Phone number is required';
            }],
            terms_condition: false,
            file_name: '',
            progressbar: 20
        };
    },

    methods: {
        onScroll: function onScroll(e) {
            this.offsetTop = e.target.scrollTop;
        },
        onPickFile: function onPickFile() {
            this.progressbar = 0;
            this.$refs.inputfile.click();
        },
        onFilechange: function onFilechange(event) {
            // check is file choose or not
            if (!event.target.files[0]) {
                console.log('file not upload');
                return;
            }

            var file = event.target.files[0];

            var filename = file.name;
            var size = file.size;
            this.file_name = filename;

            if (filename.lastIndexOf('.') <= 0) {
                console.log('File not upload');
                return;
            } else {
                var reader = new FileReader();
                reader.onload = function () {
                    var media = new Audio(reader.result);
                    media.onloadedmetadata = function () {
                        //                        media.duration; // this would give duration of the video/audio file
                    };
                };
                reader.readAsDataURL(file);
            }

            // uploading via ajax request
            var form = new FormData();
            form.append('file', file);
            form.append('upload', true);
            //set request

            axios.post('http://localhost/fileupload/form.php', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function (progressEvent) {
                    this.progressbar = parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total));
                }.bind(this)
            }).then(function (resopnse) {
                console.log(resopnse);
            }).catch(function () {
                console.log('FAILURE!!');
            });
        },


        // get email if it is valid or not
        emailVerify: function emailVerify() {
            var data = {
                verify_email: true,
                user_email: this.email
            };
            var form = new FormData();
            form.append('verify_email', true);
            form.append('user_email', this.email);
            var headers = {
                headers: {
                    "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
                }
            };
            axios.post('http://localhost/vuetify/vuetify-1/email_verify.php', form, headers).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWZiZjI2ZTQzNTA3NmZjM2FhOTYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9mcm9udGVuZC9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJicm93c2VyaGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJjc3MiLCJmaXJzdF9uYXZfcG9zIiwicG9zaXRpb24iLCJzZWNvbmRfbmF2X3BvcyIsInNlY29uZF9uYXZfaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJoaWRlX25hdl9wb3NpdGlvbiIsInNjcm9sbCIsImUiLCJwYWdlWU9mZnNldCIsImhpZGUiLCJzaG93IiwiVnVlIiwiZWwiLCJkYXRhIiwidmFsaWQiLCJmdWxsX25hbWUiLCJuYW1lUnVsZXMiLCJ2IiwiZW1haWwiLCJlbWFpbFJ1bGVzIiwidGVzdCIsInBob25lIiwicGhvbmVSdWxlcyIsInRlcm1zX2NvbmRpdGlvbiIsImZpbGVfbmFtZSIsInByb2dyZXNzYmFyIiwibWV0aG9kcyIsIm9uU2Nyb2xsIiwib2Zmc2V0VG9wIiwidGFyZ2V0Iiwic2Nyb2xsVG9wIiwib25QaWNrRmlsZSIsIiRyZWZzIiwiaW5wdXRmaWxlIiwiY2xpY2siLCJvbkZpbGVjaGFuZ2UiLCJldmVudCIsImZpbGVzIiwiY29uc29sZSIsImxvZyIsImZpbGUiLCJmaWxlbmFtZSIsIm5hbWUiLCJzaXplIiwibGFzdEluZGV4T2YiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwibWVkaWEiLCJBdWRpbyIsInJlc3VsdCIsIm9ubG9hZGVkbWV0YWRhdGEiLCJyZWFkQXNEYXRhVVJMIiwiZm9ybSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYXhpb3MiLCJwb3N0IiwiaGVhZGVycyIsIm9uVXBsb2FkUHJvZ3Jlc3MiLCJwcm9ncmVzc0V2ZW50IiwicGFyc2VJbnQiLCJNYXRoIiwicm91bmQiLCJsb2FkZWQiLCJ0b3RhbCIsImJpbmQiLCJ0aGVuIiwicmVzb3Buc2UiLCJjYXRjaCIsImVtYWlsVmVyaWZ5IiwidmVyaWZ5X2VtYWlsIiwidXNlcl9lbWFpbCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwicmVzcG9uc2UiLCJlcnJvciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUN4QixRQUFJQyxnQkFBZ0JDLE9BQU9DLFdBQTNCO0FBQ0FMLE1BQUUsUUFBRixFQUFZTSxHQUFaLENBQWdCLFFBQWhCLEVBQTBCSCxnQkFBYyxJQUF4Qzs7QUFFQSxRQUFJSSxnQkFBZ0JQLEVBQUUsTUFBRixFQUFVUSxRQUFWLEVBQXBCO0FBQ0EsUUFBSUMsaUJBQWlCVCxFQUFFLG9CQUFGLEVBQXdCUSxRQUF4QixFQUFyQjtBQUNBLFFBQUlFLG9CQUFvQlYsRUFBRSxvQkFBRixFQUF3QlcsV0FBeEIsRUFBeEI7QUFDQSxRQUFJQyxvQkFBb0JULGdCQUFnQk8saUJBQXhDOztBQUVBVixNQUFFSSxNQUFGLEVBQVVTLE1BQVYsQ0FBaUIsVUFBU0MsQ0FBVCxFQUFXO0FBQ3hCLFlBQUdWLE9BQU9XLFdBQVAsR0FBcUJILGlCQUF4QixFQUEwQztBQUN0Q1osY0FBRSxNQUFGLEVBQVVnQixJQUFW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QUFaO0FBQ0gsYUFYTCxFQVlLQyxLQVpMLENBWVcsWUFBVTtBQUNiL0Isd0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0gsYUFkTDtBQWVILFNBMURJOzs7QUE0REw7QUFDQStCLG1CQTdESyx5QkE2RFM7QUFDVixnQkFBSXpELE9BQU87QUFDUDBELDhCQUFhLElBRE47QUFFUEMsNEJBQWEsS0FBS3REO0FBRlgsYUFBWDtBQUlBLGdCQUFJbUMsT0FBTyxJQUFJQyxRQUFKLEVBQVg7QUFDQUQsaUJBQUtFLE1BQUwsQ0FBWSxjQUFaLEVBQTRCLElBQTVCO0FBQ0FGLGlCQUFLRSxNQUFMLENBQVksWUFBWixFQUEwQixLQUFLckMsS0FBL0I7QUFDQSxnQkFBSXdDLFVBQVU7QUFDVkEseUJBQVU7QUFDTixvQ0FBZSxrREFBa0RJLEtBQUtXLE1BQUwsR0FBY0MsUUFBZCxHQUF5QkMsTUFBekIsQ0FBZ0MsQ0FBaEM7QUFEM0Q7QUFEQSxhQUFkO0FBS0FuQixrQkFBTUMsSUFBTixDQUFXLHFEQUFYLEVBQ0lKLElBREosRUFDVUssT0FEVixFQUVLUyxJQUZMLENBRVUsVUFBVVMsUUFBVixFQUFvQjtBQUN0QnRDLHdCQUFRQyxHQUFSLENBQVlxQyxTQUFTL0QsSUFBckI7QUFDSCxhQUpMLEVBS0t3RCxLQUxMLENBS1csVUFBVVEsS0FBVixFQUFpQjtBQUNwQnZDLHdCQUFRQyxHQUFSLENBQVlzQyxLQUFaO0FBQ0gsYUFQTDtBQVFIO0FBbEZJO0FBdkJMLENBQVIsRSIsImZpbGUiOiIvYXNzZXRzL2Zyb250ZW5kL3NjcmlwdHMvc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWZiZjI2ZTQzNTA3NmZjM2FhOTYiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgIHZhciBicm93c2VyaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICQoJyN2aWRlbycpLmNzcygnaGVpZ2h0JywgYnJvd3NlcmhlaWdodCsncHgnKTtcblxuICAgIHZhciBmaXJzdF9uYXZfcG9zID0gJCgnI25hdicpLnBvc2l0aW9uKCk7XG4gICAgdmFyIHNlY29uZF9uYXZfcG9zID0gJCgnLnNlY29uZC1uYXZpZ2F0aW9uJykucG9zaXRpb24oKTtcbiAgICB2YXIgc2Vjb25kX25hdl9oZWlnaHQgPSAkKCcuc2Vjb25kLW5hdmlnYXRpb24nKS5vdXRlckhlaWdodCgpO1xuICAgIHZhciBoaWRlX25hdl9wb3NpdGlvbiA9IGJyb3dzZXJoZWlnaHQgLSBzZWNvbmRfbmF2X2hlaWdodDtcblxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKHdpbmRvdy5wYWdlWU9mZnNldCA+IGhpZGVfbmF2X3Bvc2l0aW9uKXtcbiAgICAgICAgICAgICQoJyNuYXYnKS5oaWRlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJCgnI25hdicpLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG5cblxubmV3IFZ1ZSh7XG4gICAgZWw6JyNzbmlmZnInLFxuICAgIGRhdGE6ICgpID0+ICh7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgZnVsbF9uYW1lOiAnJyxcbiAgICAgICAgbmFtZVJ1bGVzOiBbXG4gICAgICAgICAgICB2ID0+ICEhdiB8fCAnTmFtZSBpcyByZXF1aXJlZCdcbiAgICAgICAgXSxcbiAgICAgICAgZW1haWw6ICcnLFxuICAgICAgICAgICAgZW1haWxSdWxlczogW1xuICAgICAgICAgICAgdiA9PiAhIXYgfHwgJ0UtbWFpbCBpcyByZXF1aXJlZCcsXG4gICAgICAgICAgICB2ID0+IC9eXFx3KyhbLi1dP1xcdyspKkBcXHcrKFsuLV0/XFx3KykqKFxcLlxcd3syLDN9KSskLy50ZXN0KHYpIHx8ICdFLW1haWwgbXVzdCBiZSB2YWxpZCdcbiAgICAgICAgXSxcbiAgICAgICAgcGhvbmU6JycsXG4gICAgICAgICAgICBwaG9uZVJ1bGVzOiBbXG4gICAgICAgICAgICB2ID0+ICEhdiB8fCAnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkJ1xuICAgICAgICBdLFxuICAgIHRlcm1zX2NvbmRpdGlvbjogZmFsc2UsXG4gICAgICAgIGZpbGVfbmFtZTogJycsXG4gICAgICAgIHByb2dyZXNzYmFyOiAyMCxcbiAgICB9KSxcblxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBvblNjcm9sbCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vZmZzZXRUb3AgPSBlLnRhcmdldC5zY3JvbGxUb3BcbiAgICAgICAgfSxcblxuICAgICAgICBvblBpY2tGaWxlKCkge1xuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc2JhciA9IDA7XG4gICAgICAgICAgICB0aGlzLiRyZWZzLmlucHV0ZmlsZS5jbGljaygpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uRmlsZWNoYW5nZShldmVudCkge1xuICAgICAgICAgICAgLy8gY2hlY2sgaXMgZmlsZSBjaG9vc2Ugb3Igbm90XG4gICAgICAgICAgICBpZighZXZlbnQudGFyZ2V0LmZpbGVzWzBdKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmlsZSBub3QgdXBsb2FkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdO1xuXG4gICAgICAgICAgICBsZXQgZmlsZW5hbWUgPSBmaWxlLm5hbWU7XG4gICAgICAgICAgICBsZXQgc2l6ZSA9IGZpbGUuc2l6ZTtcbiAgICAgICAgICAgIHRoaXMuZmlsZV9uYW1lID0gZmlsZW5hbWU7XG5cbiAgICAgICAgICAgIGlmKGZpbGVuYW1lLmxhc3RJbmRleE9mKCcuJykgPD0gMCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZpbGUgbm90IHVwbG9hZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhID0gbmV3IEF1ZGlvKHJlYWRlci5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBtZWRpYS5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWEuZHVyYXRpb247IC8vIHRoaXMgd291bGQgZ2l2ZSBkdXJhdGlvbiBvZiB0aGUgdmlkZW8vYXVkaW8gZmlsZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwbG9hZGluZyB2aWEgYWpheCByZXF1ZXN0XG4gICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgZm9ybS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKCd1cGxvYWQnLCB0cnVlKTtcbiAgICAgICAgICAgIC8vc2V0IHJlcXVlc3RcblxuICAgICAgICAgICAgYXhpb3MucG9zdCgnaHR0cDovL2xvY2FsaG9zdC9maWxldXBsb2FkL2Zvcm0ucGhwJywgZm9ybSwge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG9uVXBsb2FkUHJvZ3Jlc3M6IGZ1bmN0aW9uKCBwcm9ncmVzc0V2ZW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc2JhciA9IHBhcnNlSW50KCBNYXRoLnJvdW5kKCAoIHByb2dyZXNzRXZlbnQubG9hZGVkICogMTAwICkgLyBwcm9ncmVzc0V2ZW50LnRvdGFsICkgKTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc29wbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb3Buc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGQUlMVVJFISEnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBnZXQgZW1haWwgaWYgaXQgaXMgdmFsaWQgb3Igbm90XG4gICAgICAgIGVtYWlsVmVyaWZ5KCkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgdmVyaWZ5X2VtYWlsOnRydWUsXG4gICAgICAgICAgICAgICAgdXNlcl9lbWFpbCA6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKCd2ZXJpZnlfZW1haWwnLCB0cnVlKTtcbiAgICAgICAgICAgIGZvcm0uYXBwZW5kKCd1c2VyX2VtYWlsJywgdGhpcy5lbWFpbCk7XG4gICAgICAgICAgICBsZXQgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzIDoge1xuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtdHlwZVwiOlwibXVsdGlwYXJ0L2Zvcm0tZGF0YTsgY2hhcnNldD11dGYtODsgYm91bmRhcnk9XCIgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGF4aW9zLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3QvdnVldGlmeS92dWV0aWZ5LTEvZW1haWxfdmVyaWZ5LnBocCcsXG4gICAgICAgICAgICAgICAgZm9ybSwgaGVhZGVycylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvZnJvbnRlbmQvc2NyaXB0cy9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==