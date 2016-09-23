(function (imports) {

  'use strict';

  module.exports = {

    findAll: findAll,

    findByLogin: findByLogin
  };

  var users;

  function findAll() {
    return users;
  }

  function findByLogin(login) {
    return users
                .find(function (user) {
                  return user.login === login;
                });
  }

  users = [
    {
      login: "guest",
      email: "guest@sample.email.com",
      fullname: "Гостевой доступ",
      registeredAt: Date.now(),
      special: true,
      guest: true,
      roles: ["GUEST"]
    },
    {
      login: "user",
      email: "user@sample.email.com",
      fullname: "Юзеров Ю. Ю.",
      registeredAt: Date.now(),
      roles: ["USER"]
    },
    {
      login: "admin",
      email: "admin@sample.email.com",
      fullname: "Админов А. А.",
      registeredAt: Date.now(),
      roles: ["ADMIN", "USER"]
    },
    {
      login: "root",
      email: "root@sample.email.com",
      fullname: "Доступ корневого уровня",
      registeredAt: Date.now(),
      special: true,
      root: true,
      roles: ["ROOT", "ADMIN", "USER"]
    }
  ];
})({});
