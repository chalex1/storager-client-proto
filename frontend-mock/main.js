$(function () {
	$('.dropdown-button').dropdown({
		belowOrigin: false, // Displays dropdown below the button
		constrain_width: false
	});
	$('select').material_select();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});
	$('.collapsible').collapsible({
		accordion: true
	});
	// $('.modal-trigger').leanModal();

	if ($('#provider1').length > 0)
		$('#provider1').openModal();// and open them all

	if ($('#patch1').length > 0)
		$('#patch1').openModal();// and open them all

	$('input.autocomplete').autocomplete({
		data: {
			"СПб ГУП СПб ИАЦ": null,
			"Какая-то другая организация": null,
			"Организация 1": null,
			"Организация 27": null
		}
	});
});
