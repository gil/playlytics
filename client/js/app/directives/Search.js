"use strict";

angular.module("playlytics")
  .directive("search", function($stateParams, SpotifyService) {
    return {

      templateUrl: "templates/search.tpl.html",

      restrict: "A",

      scope: {
        addTrack: "&",
        savePlaylist: "&"
      },

      link: function(scope, element) {

        var spinnerSpan = element.find(".spinner")[0];
        var spinner = null;
        var searchTimeout = null;
        scope.selectedTrack = -1;
        scope.tracks = [];

        scope.playlistId = $stateParams.id;

        function showSpinner() {
          spinner = new Spinner({lines: 8, length: 4, width: 4, radius: 5, speed: 2, color: "#FFF"}).spin(spinnerSpan);
        }

        function hideSpinner() {
          spinner.stop();
        }

        function searchAfterDelay() {

          if( scope.searchFilter && scope.searchFilter.length > 0 ) {

            showSpinner();

            SpotifyService.search( scope.searchFilter )
              .success(function(data) {
                scope.tracks = SpotifyService.parseTracks( data.tracks.items );
                hideSpinner();
              })
              .error(function() { hideSpinner(); });
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
          } else if( keycode === 13 && scope.selectedTrack > -1 ) {
            scope.selectTrack( scope.tracks[scope.selectedTrack] );
          } else {

            scope.tracks = [];
            scope.selectedTrack = -1;
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchAfterDelay, 600);

          }
        };

        scope.selectTrack = function(track) {
          scope.addTrack({ track : track });
          scope.searchFilter = "";
          scope.tracks = [];
        };

        scope.saveWithFeedback = function() {
          showSpinner();
          scope.savePlaylist();
          setTimeout(hideSpinner, 200); // TODO : Just to make it look like we have a server
        };

      }

    };
  });