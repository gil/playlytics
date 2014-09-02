/* jshint camelcase: false */
'use strict';

describe('SpotifyService', function() {

  var SpotifyService = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( _SpotifyService_ ) {
    SpotifyService = _SpotifyService_;
  }));

  it('should parse tarcks to a easier to work object', function() {

    var spotifyTrack = {
      'album' : {
        'album_type' : 'compilation',
        'available_markets' : [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
        'external_urls' : {
          'spotify' : 'https://open.spotify.com/album/5l3zEmMrOhOzG8d8s83GOL'
        },
        'href' : 'https://api.spotify.com/v1/albums/5l3zEmMrOhOzG8d8s83GOL',
        'id' : '5l3zEmMrOhOzG8d8s83GOL',
        'images' : [ {
          'height' : 640,
          'url' : 'https://i.scdn.co/image/cb7905340c132365bbaee3f17498f062858382e8',
          'width' : 640
        }, {
          'height' : 300,
          'url' : 'https://i.scdn.co/image/af369120f0b20099d6784ab31c88256113f10ffb',
          'width' : 300
        }, {
          'height' : 64,
          'url' : 'https://i.scdn.co/image/9dad385ddf2e7db0bef20cec1fcbdb08689d9ae8',
          'width' : 64
        } ],
        'name' : 'Despicable Me 2 (Original Motion Picture Soundtrack)',
        'type' : 'album',
        'uri' : 'spotify:album:5l3zEmMrOhOzG8d8s83GOL'
      },
      'artists' : [ {
        'external_urls' : {
          'spotify' : 'https://open.spotify.com/artist/2RdwBSPQiwcmiDo9kixcl8'
        },
        'href' : 'https://api.spotify.com/v1/artists/2RdwBSPQiwcmiDo9kixcl8',
        'id' : '2RdwBSPQiwcmiDo9kixcl8',
        'name' : 'Pharrell Williams',
        'type' : 'artist',
        'uri' : 'spotify:artist:2RdwBSPQiwcmiDo9kixcl8'
      } ],
      'available_markets' : [ 'AD', 'AR', 'AT', 'AU', 'BE', 'BG', 'BO', 'BR', 'CA', 'CH', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DE', 'DK', 'DO', 'EC', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO', 'NZ', 'PA', 'PE', 'PH', 'PL', 'PT', 'PY', 'RO', 'SE', 'SG', 'SI', 'SK', 'SV', 'TR', 'TW', 'US', 'UY' ],
      'disc_number' : 1,
      'duration_ms' : 233305,
      'explicit' : false,
      'external_ids' : {
        'isrc' : 'USQ4E1300686'
      },
      'external_urls' : {
        'spotify' : 'https://open.spotify.com/track/6NPVjNh8Jhru9xOmyQigds'
      },
      'href' : 'https://api.spotify.com/v1/tracks/6NPVjNh8Jhru9xOmyQigds',
      'id' : '6NPVjNh8Jhru9xOmyQigds',
      'name' : 'Happy',
      'popularity' : 88,
      'preview_url' : 'https://p.scdn.co/mp3-preview/6b00000be293e6b25f61c33e206a0c522b5cbc87',
      'track_number' : 4,
      'type' : 'track',
      'uri' : 'spotify:track:6NPVjNh8Jhru9xOmyQigds'
    };

    var tracks = SpotifyService.parseTracks([ spotifyTrack ]);
    expect( tracks[0].id ).toEqual( '6NPVjNh8Jhru9xOmyQigds' );
    expect( tracks[0].name ).toEqual( 'Happy' );
    expect( tracks[0].artist ).toEqual( 'Pharrell Williams' );
    expect( tracks[0].albumName ).toEqual( 'Despicable Me 2 (Original Motion Picture Soundtrack)' );
    expect( tracks[0].albumCover ).toEqual( 'https://i.scdn.co/image/cb7905340c132365bbaee3f17498f062858382e8' );
    expect( tracks[0].duration ).toEqual( 233305 );
    expect( tracks[0].popularity ).toEqual( 88 );
  });

});