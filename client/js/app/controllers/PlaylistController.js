"use strict";

angular.module("playlytics")
  .controller("PlaylistController", function($scope, playlist, PlaylistService, TagService) {

    $scope.playlist = playlist;
    $scope.playlist.tracks = $scope.playlist.tracks || [];
    $scope.playlist.tags = $scope.playlist.tags || [];

    $scope.addTrack = function(track) {
      if( !_.findWhere($scope.playlist.tracks, { id : track.id }) ) {
        $scope.playlist.tracks.push(track);
      }
    };

    $scope.removeTrack = function(track) {
      $scope.playlist.tracks = _.without($scope.playlist.tracks, track);
    };

    $scope.playlistDuration = function() {

      var duration = 0;

      _.each($scope.playlist.tracks, function(track) {
        duration += track.duration;
      });

      return duration;
    };

    $scope.coolnessFactor = function() {

      var playlistDuration = $scope.playlistDuration();
      var coolness = 0;

      _.each($scope.playlist.tracks, function(track) {
        coolness += track.duration * ( track.popularity || 0 ) / playlistDuration;
      });

      return parseInt(coolness, 10);
    };

    $scope.savePlaylist = function() {

      if( $scope.playlist.name === "New Playlist" ) {

        $scope.playlist.name = "Hey, you can change me!";
        $(".playlist-name-input").focus();

      } else {
        PlaylistService.save( $scope.playlist );
      }
    };

    $scope.loadTags = function(query) {
      return TagService.search(query);
    };

  });