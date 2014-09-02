/* jshint camelcase: false */
'use strict';

describe('PlaylistService', function() {

  var PlaylistService = null,
      playlistLocalStorage = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( _PlaylistService_ ) {

    PlaylistService = _PlaylistService_;

    // Mock local storage
    playlistLocalStorage = {};

    amplify.store = function(key, val) {

      if( val !== undefined ) {
        playlistLocalStorage[key] = val;
      }

      return playlistLocalStorage[key];
    };
  }));

  it('should save playlists on local storage', function() {

    var playlist = {};
    PlaylistService.save(playlist);
    expect( playlistLocalStorage.playlists.length ).toBe( 1 );
  });

  it('should list all stored playlists', function() {

    var playlist = {};
    PlaylistService.save(playlist);
    expect( PlaylistService.list().length ).toBe( 1 );
  });

  it('should give new playlists a sequential ID', function() {

    PlaylistService.save({});
    PlaylistService.save({});
    expect( playlistLocalStorage.playlists[0].id ).toBe( 1 );
    expect( playlistLocalStorage.playlists[1].id ).toBe( 2 );
  });

  it('should read playlists', function() {

    var playlist = { name : 'Test 1' };
    PlaylistService.save(playlist);

    playlist = PlaylistService.read(1);
    expect( playlist.name ).toEqual( 'Test 1' );
  });

  it('should update playlists', function() {

    var playlist = { name : 'Test 1' };
    PlaylistService.save(playlist);

    playlist = PlaylistService.read(1);
    playlist.name = 'Test 2';
    PlaylistService.save(playlist);

    expect( playlistLocalStorage.playlists[0].name ).toEqual( 'Test 2' );
  });

});