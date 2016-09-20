(function () {

	var periodList = angular.module('app.periodList');

	periodList.component ('periodList', {
		controller: 'periodListController',
		controllerAs: 'it',
		templateUrl: 'period-list/period-list.component.html'
	});
}) ();
