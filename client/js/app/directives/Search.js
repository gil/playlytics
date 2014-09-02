"use strict";

angular.module("playlytics")
  .directive("search", function(SpotifyService) {
    return {

      templateUrl: "templates/search.tpl.html",

      restrict: "A",

      link: function(scope, element) {

        var searchInput = element.find(".search-input");
        var spinnerSpan = element.find(".spinner")[0];
        var spinner = null;
        var searchTimeout = null;

        function searchAfterDelay() {

          var searchFilter = searchInput.val();

          if( searchFilter.length > 0 ) {

            spinner = new Spinner({lines: 8, length: 4, width: 4, radius: 5, speed: 2, color: "#FFF"}).spin(spinnerSpan);

            SpotifyService.search( searchFilter )
              .success(function(data) {
                scope.tracks = SpotifyService.parseTracks( data.tracks.items );
                spinner.stop();
              })
              .error(function() { spinner.stop(); });
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