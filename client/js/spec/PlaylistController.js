/* jshint camelcase: false */
'use strict';

describe('PlaylistController', function() {

  var PlaylistController = null,
      $controller = null,
      $rootScope = null,
      $scope = null,
      PlaylistService = null,
      TagService = null,
      playlist = null,
      playlistLocalStorage = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( $injector, _$rootScope_, _PlaylistService_, _TagService_ ) {

    $controller = $injector.get('$controller');
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    PlaylistService = _PlaylistService_;
    TagService = _TagService_;
    playlist = {};

    // Mock local storage
    playlistLocalStorage = {};

    amplify.store = function(key, val) {

      if( val !== undefined ) {
        playlistLocalStorage[key] = val;
      }

      return playlistLocalStorage[key];
    };

    // $stateParams.id = '1'

    PlaylistController = $controller('PlaylistController', {
      '$rootScope': $rootScope,
      '$scope': $scope,
      'playlist': playlist
    });

  }));

  it('should store tracks from search', function() {

    $scope.addTrack({ id : 3 });
    expect( $scope.playlist.tracks.length ).toBe(1);
    expect( $scope.playlist.tracks[0].id ).toBe(3);
  });

  it('should prevent track duplication', function() {

    $scope.addTrack({ id : 3 });
    $scope.addTrack({ id : 3 });
    expect( $scope.playlist.tracks.length ).toBe(1);
  });

  it('should allow removing existing track', function() {

    var track = { id : 3 };
    $scope.addTrack(track);
    expect( $scope.playlist.tracks.length ).toBe(1);

    $scope.removeTrack(track);
    expect( $scope.playlist.tracks.length ).toBe(0);
  });

  it('should calculate total playlist duration', function() {

    $scope.addTrack({ id : 1, duration: 10 });
    $scope.addTrack({ id : 2, duration: 10 });
    $scope.addTrack({ id : 3, duration: 10 });
    expect( $scope.playlistDuration() ).toBe(30);
  });

  it('should calculate coolness factor', function() {

    $scope.addTrack({ id : 1, duration: 180000, popularity: 100 });
    $scope.addTrack({ id : 2, duration: 360000, popularity: 62 });
    $scope.addTrack({ id : 3, duration: 150000, popularity: 30 });
    expect( $scope.coolnessFactor() ).toBe(64);
  });

  it('should calculate coolness factor, even with tracks without popularity', function() {

    $scope.addTrack({ id : 1, duration: 1000 });
    expect( $scope.coolnessFactor() ).toBe(0);
  });

  it('should persist current playlist on local storage', function() {

    $scope.playlist = { name : 'New Playlist' };
    $scope.savePlaylist();

    expect( playlistLocalStorage.playlists ).not.toBeDefined();
    expect( $scope.playlist.name ).toEqual( 'Hey, you can change me!' );
  });

  it('should suggest changing the name when its default', function() {

    $scope.playlist = { name : 'Mood Booster' };
    $scope.savePlaylist();

    expect( playlistLocalStorage.playlists.length ).toBe(1);
    expect( playlistLocalStorage.playlists[0].name ).toEqual('Mood Booster');
  });

  it('should search for tags, based on query, from sample data', function() {

    var resultTags = null;

    $scope.loadTags('Rock').then(function(tags) {
      resultTags = tags;
    });

    $rootScope.$apply();
    expect( resultTags.length ).toBe(25);
  });

});