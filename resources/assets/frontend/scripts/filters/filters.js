import Vue from 'vue';

export const checkImage = Vue.filter('checkimage', function(value){
	let image = new Image();
	image.src = value;
	image.onload = function(){
		return value;
	}
	image.onerror = function(){
		var newImage = './image/default.png';
		return newImage;
	}
});


export const readmore = Vue.filter('readmore', function(text, length, suffix){
	if(text){
		return text.substring(0, length) + suffix;
	}
})


export const convertTime = Vue.filter('convertTime',function(duration){
    duration = duration * 1000;
    var milliseconds = parseInt((duration%1000)/100)
    , seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
});