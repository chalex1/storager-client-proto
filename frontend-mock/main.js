$(function () {

	$(".dropdown-button").dropdown();
	$('select').material_select();
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});
  
    $('input.autocomplete').autocomplete({
    data: {
		  "СПб ГУП СПб ИАЦ": null,
		  "Какая-то другая организация": null,
		  "Организация 1": null,
		  "Организация 27": null
		}
	});
});
