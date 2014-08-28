App.User = DS.Model.extend({
  username: DS.attr("string"),
  password: DS.attr("string"),
  encounters: DS.hasMany("encounter", {
    async: true
  }),
  players: DS.hasMany("player", {
    async: true
  }),
  creatures: DS.hasMany("creature", {
    async: true
  }),
  abilities: DS.hasMany("ability", {
    async: true
  })
});

App.Encounter = DS.Model.extend({
  name: DS.attr("string"),
  user: DS.belongsTo("user", {
    async: true
  }),
  players: DS.hasMany("player", {
    async: true
  }),
  creatures: DS.hasMany("creature", {
    async: true
  }),
  experience: DS.attr("number")
});

App.Player = DS.Model.extend({
  name: DS.attr("string"),
  initiative: DS.attr("number"),
  notes: DS.attr("string"),
  encounters: DS.hasMany("encounter", {
    async: true
  }),
  user: DS.belongsTo("user", {
    async: true
  })
});

App.Creature = DS.Model.extend({
  name: DS.attr("string"),
  hp: DS.attr("number"),
  ac: DS.attr("number"),
  str: DS.attr("number"),
  con: DS.attr("number"),
  dex: DS.attr("number"),
  int: DS.attr("number"),
  wis: DS.attr("number"),
  cha: DS.attr("number"),
  speed: DS.attr("number"),
  initiative: DS.attr("number"),
  loot: DS.attr("string"),
  experience: DS.attr("number"),
  notes: DS.attr("string"),
  abilities: DS.hasMany("ability", {
    async: true
  }),
  encounters: DS.hasMany("encounter", {
    async: true
  }),
  user: DS.belongsTo("user", {
    async: true
  })
});

App.Ability = DS.Model.extend({
  name: DS.attr("string"),
  creatures: DS.hasMany("creature", {
    async: true
  }),
  user: DS.belongsTo("user", {
    async: true
  })
});

App.User.FIXTURES = [
  {
    id: 1,
    username: "user_one",
    encounters: [1],
    players: [1],
    creatures: [1],
    abilities: [1]
  }
];

App.Encounter.FIXTURES = [
  {
    id: 1,
    name: "encounter_one",
    user: 1,
    players: [1],
    creatures: [1]
  }
];

App.Creature.FIXTURES = [
  {
    id: 1,
    name: "creature_one",
    user: 1,
    encounters: [1],
    abilities: [1]
  }
];

App.Player.FIXTURES = [
  {
    id: 1,
    name: "player_one",
    user: 1,
    encounters: [1]
  }
];

App.Ability.FIXTURES = [
  {
    id: 1,
    name: "ability_one",
    user: 1,
    creatures: [1]
  }
];
