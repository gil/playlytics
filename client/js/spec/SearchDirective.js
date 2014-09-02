/* jshint camelcase: false */
'use strict';

describe('SearchDirective', function() {

  var elm,
      $rootScope = null,
      $scope = null,
      $isolateScope = null,
      SpotifyService = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( _$rootScope_, _SpotifyService_ ) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    SpotifyService = _SpotifyService_;

    jasmine.Clock.useMock();
    compileDirective();
  }));

  function compileDirective(tpl) {

    if (!tpl) {
      tpl = '<div search></div>';
    }

    inject(function($compile) {
      elm = $compile( tpl )( $scope );
    });

    $scope.$digest();
    $isolateScope = $( elm.children()[0] ).scope();
  }

  it('should show feedback when searching', function() {

    spyOn( Spinner.prototype, 'spin' );

    $isolateScope.searchFilter = 'Happy';
    $isolateScope.search({});
    jasmine.Clock.tick(700);

    expect( Spinner.prototype.spin ).toHaveBeenCalled();
  });

  it('should hide feedback when searching returns a error', function() {

    spyOn( Spinner.prototype, 'stop' );

    SpotifyService.search = function() {
      return {
        success: function() {},
        error: function(callback) { callback(); }
      };
    };

    $isolateScope.searchFilter = 'Something';
    $isolateScope.search({});
    jasmine.Clock.tick(700);

    expect( Spinner.prototype.stop ).toHaveBeenCalled();
  });

  it('should clear tracks after selecting one', function() {
    $isolateScope.tracks = [{}];
    $isolateScope.selectTrack({});
    expect( $isolateScope.tracks.length ).toBe(0);
  });

  it('should show feedback when saving playlist', function() {
    spyOn( Spinner.prototype, 'spin' );
    $isolateScope.saveWithFeedback({});
    expect( Spinner.prototype.spin ).toHaveBeenCalled();
  });

});