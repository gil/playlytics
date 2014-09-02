"use strict";

angular.module("playlytics", ["appTemplates", "ui.router"])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/playlist/new");

    $stateProvider
      .state("playlist", {
        url: "/playlist/:id",
        templateUrl: "templates/playlist.tpl.html",
        controller: "PlaylistController"
      });

    $httpProvider.defaults.headers.common = {
      "Content-Type": "application/json"
    };

  });