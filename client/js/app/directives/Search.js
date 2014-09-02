"use strict";

angular.module("playlytics")
  .directive("search", function(SpotifyService) {
    return {

      templateUrl: "templates/search.tpl.html",

      restrict: "A",

      scope: {
        addTrack: "&"
      },

      link: function(scope, element) {

        var spinnerSpan = element.find(".spinner")[0];
        var spinner = null;
        var searchTimeout = null;
        scope.selectedTrack = -1;
        scope.tracks = [];

        function searchAfterDelay() {

          if( scope.searchFilter.length > 0 ) {

            spinner = new Spinner({lines: 8, length: 4, width: 4, radius: 5, speed: 2, color: "#FFF"}).spin(spinnerSpan);

            SpotifyService.search( scope.searchFilter )
              .success(function(data) {
                scope.tracks = SpotifyService.parseTracks( data.tracks.items );
                spinner.stop();
              })
              .error(function() { spinner.stop(); });
          }
        }

        scope.search = function(e) {

          var keycode = (e.keyCode || e.which);

          if( keycode === 38 ) {
            scope.selectedTrack = Math.max( scope.selectedTrack - 1, 0 );
            e.preventDefault();
          } else if( keycode === 40 ) {
            scope.selectedTrack = Math.min( scope.selectedTrack + 1, scope.tracks.length - 1 );
            e.preventDefault();
          } else if( keycode === 13 ) {
            if( scope.selectedTrack > -1 ) {
              scope.selectTrack( scope.tracks[scope.selectedTrack] );
            }
          } else {

            scope.tracks = [];
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchAfterDelay, 600);

          }
        };

        scope.selectTrack = function(track) {
          scope.addTrack({ track : track });
          scope.searchFilter = "";
          scope.tracks = [];
        };

      }

    };
  });