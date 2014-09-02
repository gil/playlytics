"use strict";

angular.module("playlytics")
  .directive("navigation", function(PlaylistService) {
    return {

      templateUrl: "templates/navigation.tpl.html",

      restrict: "A",

      link: function(scope) {

        PlaylistService.list().success(function(playlists) {
          scope.playlists = playlists;
        });

      }

    };
  });