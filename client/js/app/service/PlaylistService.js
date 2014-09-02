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
      },

      read: function(id) {
        if( id !== "new" ) {
          return { id: 0, name : "Mood Booster" };
        }

        return { name : "New Playlist" };
      },

      save: function(playlist) {
        console.log( playlist );
        console.log( amplify.store() );
      }

    };
  });