/* jshint camelcase: false */
'use strict';

describe('AnalyticsController', function() {

  var AnalyticsController = null,
      $controller = null,
      $rootScope = null,
      $scope = null,
      PlaylistService = null,
      playlist = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( $injector, _$rootScope_, _PlaylistService_ ) {

    $controller = $injector.get('$controller');
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    PlaylistService = _PlaylistService_;
    playlist = {};

    AnalyticsController = $controller('AnalyticsController', {
      '$rootScope': $rootScope,
      '$scope': $scope,
      'playlist': playlist
    });

  }));

  it('should receive playlist', function() {

    expect( $scope.playlist ).toBeDefined();
  });

});