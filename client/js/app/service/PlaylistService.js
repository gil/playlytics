"use strict";

angular.module("playlytics")
  .service("PlaylistService", function($rootScope) {
    return {

      list: function() {
        return ( amplify.store("playlists") || [] );
      },

      read: function(id) {

        var playlist = { name : "New Playlist" };

        if( id !== "new" ) {
          playlist = ( _.findWhere( this.list(), { id : parseInt(id, 10) } ) || playlist );
        }

        return playlist;
      },

      save: function(playlist) {

        var playlists = this.list();
        var oldIndex = _.findIndex(playlists, { id : playlist.id });

        if( oldIndex > -1 ) {
          playlists[oldIndex] = playlist;
        } else {
          playlist.id = playlists.length + 1;
          playlists.push(playlist);
        }

        amplify.store("playlists", playlists);
        $rootScope.$emit("playlistSaved");
      }

    };
  });