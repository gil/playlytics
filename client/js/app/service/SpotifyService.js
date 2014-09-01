"use strict";

angular.module("playlytics")
  .service("SpotifyService", function($http) {
    return {

      search: function(filter) {
        return $http.get("https://api.spotify.com/v1/search",{
          params: {
            q : filter,
            type  : "track"
          }
        });
      }

    };
  });