"use strict";

angular.module("playlytics")
  .directive("search", function(SpotifyService) {
    return {

      templateUrl: "templates/search.tpl.html",

      restrict: "A",

      link: function(scope, element) {

        var searchInput = element.find(".search-input");
        var searchTimeout = null;

        function searchAfterDelay() {

          var searchFilter = searchInput.val();

          if( searchFilter.length > 0 ) {
            SpotifyService.search( searchFilter ).success(function(data) {
              scope.tracks = SpotifyService.parseTracks( data.tracks.items );
            });
          }
        }

        scope.search = function() {
          scope.tracks = [];
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(searchAfterDelay, 600);
        };

      }

    };
  });