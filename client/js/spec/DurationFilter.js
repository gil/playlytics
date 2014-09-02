/* jshint camelcase: false */
'use strict';

describe('DurationFilter', function() {

  var elm,
      $rootScope = null,
      $scope = null;

  beforeEach(module('playlytics'));

  beforeEach(inject(function( _$rootScope_ ) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  function compileDirective(tpl) {

    if (!tpl) {
      tpl = '<div>{{ durationTime | duration }}</div>';
    }

    inject(function($compile) {
      elm = $compile( tpl )( $scope );
    });

    $scope.$digest();
  }

  it('should format duration from milliseconds to minutes and seconds', function() {

    $scope.durationTime = 1000 * 60 * 3.5;
    compileDirective();
    expect( elm.text() ).toEqual('00:03:30');
  });

  it('should format duration from milliseconds to hours', function() {

    $scope.durationTime = ( 1000 * 60 * 60 * 7 ) + ( 1000 * 60 * 5.5 );
    compileDirective();
    expect( elm.text() ).toEqual('07:05:30');
  });

});