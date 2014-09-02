"use strict";

angular.module("playlytics")
  .controller("PlaylistController", function($scope, playlist, PlaylistService) {

    $scope.playlist = playlist;
    $scope.playlist.tracks = $scope.playlist.tracks || [];
    // PlaylistService.save({});

    $scope.addTrack = function(track) {
      $scope.playlist.tracks.push(track);
    };

  });