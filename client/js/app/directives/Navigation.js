"use strict";

angular.module("playlytics")
  .directive("navigation", function() {
    return {

      templateUrl: "templates/navigation.tpl.html",

      restrict: "A",

      scope: {
        photos: "="
      },

      link: function(scope, element, attrs) {
        // console.log( scope, element, attrs );
      }

    };
  });