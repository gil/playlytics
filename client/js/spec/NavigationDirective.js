/* jshint camelcase: false */
'use strict';

describe('NavigationDirective', function() {

  var elm,
      $rootScope = null,
      $scope = null,
      PlaylistService,
      playlistLocalStorage = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( _$rootScope_, _PlaylistService_ ) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    PlaylistService = _PlaylistService_;

    // Mock local storage
    playlistLocalStorage = {
      playlists : [{
        id : 1,
        name : 'Mood Booster'
      }]
    };

    amplify.store = function(key, val) {

      if( val !== undefined ) {
        playlistLocalStorage[key] = val;
      }

      return playlistLocalStorage[key];
    };

    compileDirective();
  }));

  function compileDirective(tpl) {

    if (!tpl) {
      tpl = '<nav navigation></nav>';
    }

    inject(function($compile) {
      elm = $compile( tpl )( $scope );
    });

    $scope.$digest();
  }

  it('should render playlists', function() {
    expect( elm.find('li').length ).toBe(2);
    expect( elm.find('li:first').text().indexOf('Mood Booster') ).not.toBe(-1);
  });

});