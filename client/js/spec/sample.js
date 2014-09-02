'use strict';

describe('something', function() {

  var PlaylistController = null;
  beforeEach(module('playlytics'));

  beforeEach(inject(function( $injector, _$rootScope_ ) {

    var $controller = $injector.get('$controller'),
        $rootScope = _$rootScope_,
        $scope = $rootScope.$new();

    PlaylistController = $controller('PlaylistController', {
      '$rootScope': $rootScope,
      '$scope': $scope
    });

  }));

  it('should do something', function() {
    expect(PlaylistController).not.toBe(null);
  });

});