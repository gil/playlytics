"use strict";

angular.module("playlytics")
  .directive("navigation", function($rootScope, PlaylistService) {
    return {

      templateUrl: "templates/navigation.tpl.html",

      restrict: "A",

      link: function(scope) {

        function updateList() {
          scope.playlists = PlaylistService.list();
        }

        $rootScope.$on("playlistSaved", updateList);
        updateList();
      }

    };
  });