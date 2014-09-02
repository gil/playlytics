"use strict";

angular.module("playlytics")
  .controller("PlaylistController", function($scope, playlist, PlaylistService) {

    $scope.playlist = playlist;
    $scope.playlist.tracks = $scope.playlist.tracks || [];
    // PlaylistService.save({});

    $scope.addTrack = function(track) {
      $scope.playlist.tracks.push(track);
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

  });