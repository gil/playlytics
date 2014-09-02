"use strict";

angular.module("playlytics", ["appTemplates", "ui.router", "ui.sortable"])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/playlist/new");

    $stateProvider
      .state("playlist", {
        url: "/playlist/:id",
        templateUrl: "templates/playlist.tpl.html",
        controller: "PlaylistController",
        resolve: {
          playlist : ["PlaylistService", "$stateParams", function(PlaylistService, $stateParams) {
            return PlaylistService.read( $stateParams.id );
          }]
        }
      });

    $httpProvider.defaults.headers.common = {
      "Content-Type": "application/json"
    };

  });