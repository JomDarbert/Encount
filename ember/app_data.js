App.User = DS.Model.extend({
  user_name: DS.attr("string"),
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
  encounter_name: DS.attr("string"),
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
  player_name: DS.attr("string"),
  initiative: DS.attr("number"),
  strength: DS.attr("number"),
  constitution: DS.attr("number"),
  dexterity: DS.attr("number"),
  intelligence: DS.attr("number"),
  wisdom: DS.attr("number"),
  charisma: DS.attr("number"),
  armor: DS.attr("number"),
  speed: DS.attr("number"),
  notes: DS.attr("string"),
  encounters: DS.hasMany("encounter", {
    async: true
  }),
  user: DS.belongsTo("user", {
    async: true
  })
});

App.Creature = DS.Model.extend({
  creature_name: DS.attr("string"),
  hp_min: DS.attr("number"),
  hp_max: DS.attr("number"),
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
  ability_name: DS.attr("string"),
  description: DS.attr("string"),
  hit_roll: DS.attr("string"),
  damage_roll: DS.attr("string"),
  recharge: DS.attr("string"),
  quantity: DS.attr("number"),
  aoe_type: DS.attr("string"),
  range: DS.attr("string"),
  creatures: DS.hasMany("creature", {
    async: true
  })
});

App.User.FIXTURES = [
  {
    id: 1,
    user_name: "user_one",
    encounters: [1, 2],
    players: [1, 2],
    creatures: [1],
    abilities: [1]
  }
];

App.Encounter.FIXTURES = [
  {
    id: 1,
    encounter_name: "encounter_one",
    user: 1,
    players: [],
    creatures: [1]
  }, {
    id: 2,
    encounter_name: "encounter_two",
    user: 1,
    players: [],
    creatures: []
  }
];

App.Creature.FIXTURES = [
  {
    id: 1,
    creature_name: "creature_one",
    user: 1,
    encounters: [1],
    abilities: [1]
  }
];

App.Player.FIXTURES = [
  {
    id: 1,
    player_name: "player_one",
    user: 1,
    encounters: [1]
  }, {
    id: 2,
    player_name: "player_two",
    user: 1,
    encounters: [2]
  }
];

App.Ability.FIXTURES = [
  {
    id: 1,
    ability_name: "ability_one",
    user: 1,
    creatures: [1]
  }
];
