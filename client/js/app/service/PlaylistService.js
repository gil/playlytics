/* jshint camelcase: false */
"use strict";

angular.module("playlytics")
  .service("PlaylistService", function() {
    return {

      list: function() {
        return {
          success: function(callback) {
            callback([
              { id : 0, name : "Mood Booster" },
              { id : 1, name : "Weekend Chill-Out" },
              { id : 2, name : "Re-Energize" }
            ]);
          }
        };
      }

    };
  });