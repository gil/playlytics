'use strict';

describe('something', function() {

  var HomeController = null;
  beforeEach(module('playlytics'));

  beforeEach(inject(function( $injector, _$rootScope_ ) {

    var $controller = $injector.get('$controller'),
        $rootScope = _$rootScope_,
        $scope = $rootScope.$new();

    HomeController = $controller('HomeController', {
      '$rootScope': $rootScope,
      '$scope': $scope
    });

  }));

  it('should do something', function() {
    expect(HomeController).not.toBe(null);
  });

});