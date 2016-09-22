(function () {

  'use strict';

  // NOTE: time period repository
  module.exports = {

    getAll: getAll
  };

  var _mockPeriods;

  // NOTE: gets all available time periods
  function getAll() {
    return _mockPeriods;
  }

  // NOTE: available time periods
  _mockPeriods = [
    {
      code: "DAY",
      title: "День"
    },
    {
      code: "WEEK",
      title: "Неделя"
    },
    {
      code: "MONTH",
      title: "Месяц"
    },
    {
      code: "QUARTER",
      title: "Квартал"
    },
    {
      code: "HALF_YEAR",
      title: "Полугодие"
    },
    {
      code: "YEAR",
      title: "Год"
    }
  ];
})();
