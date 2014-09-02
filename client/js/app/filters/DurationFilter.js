"use strict";

angular.module("playlytics")
  .filter("duration", function() {
    return function(input) {

      var seconds = parseInt( parseInt(input, 10) / 1000, 10 );
      var minutes = parseInt( seconds / 60, 10 );
      var hours = parseInt( minutes / 60, 10 );
      seconds = seconds - ( minutes * 60 );
      minutes = minutes - ( hours * 60 );

      return ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2);
    };
  });