'use strict';

describe('Controller: CompletedCtrl', function () {

  // load the controller's module
  beforeEach(module('todosApp'));

  var CompletedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompletedCtrl = $controller('CompletedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CompletedCtrl.awesomeThings.length).toBe(3);
  });
});
