/* jshint camelcase: false */
"use strict";

angular.module("playlytics")
  .service("SpotifyService", function($http) {
    return {

      parseTracks: function(tracks) {
        return _.map(tracks, function(track) {

          // console.log( track );

          return {
            name : track.name,
            artist : ( track.artists && track.artists.length > 0 ? track.artists[0].name : "N/A" ),
            albumCover : ( track.album && track.album.images && track.album.images.length > 0 ? track.album.images[0].url : null ),
            duration : track.duration_ms,
            popularity : track.popularity
          };

        });
      },

      search: function(filter) {
        return $http.get("https://api.spotify.com/v1/search", {
          params: {
            q : filter,
            type  : "track"
          }
        });
      }

    };
  });