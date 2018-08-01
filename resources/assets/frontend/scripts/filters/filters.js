import Vue from 'vue';

Vue.filter('checkimage', function (value) {
    let image = new Image();
    image.src = value;
    image.onload = function () {
        return value;
    }
    image.onerror = function () {
        var newImage = '/assets/frontend/images/placeholder.png';
        return newImage;
    }
});


Vue.filter('readmore', function (text, length, suffix) {
    if (text) {
        if (text.length > length) {
            return text.substring(0, length) + suffix;
        }
        return text.substring(0, length);
    }
});

Vue.filter('convertHyphenToSpace', function (text) {
    if(text != null){
        let value = text.replace('-', ' ');
        value = value.replace('_', ' ');
        return value;
    }

    return text;
});

Vue.filter('convertTime', function (duration) {
    duration = duration * 1000;
    var seconds = parseInt((duration / 1000) % 60)
        , minutes = parseInt((duration / (1000 * 60)) % 60)
        , hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
});


Vue.filter('convertDate', function (date) {
    if(date === undefined){
        return date;
    }
    var current_date = new Date(date.replace(/-/g, "/"));
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December"];
    var daysOfMonth = ["NaN", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
        "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
        "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"];


    var returnDate = daysOfWeek[current_date.getDay()] + ", "
        + monthsOfYear[current_date.getMonth()] + " "
        + daysOfMonth[current_date.getDate()]
        + ", " + current_date.getFullYear();
    return returnDate;
})
