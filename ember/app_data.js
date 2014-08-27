App.User = DS.Model.extend({
  username: DS.attr("string"),
  password: DS.attr("string"),
  encounters: DS.hasMany("encounter")
});

App.Encounter = DS.Model.extend({
  user: DS.belongsTo("user"),
  players: DS.hasMany("player"),
  creatures: DS.hasMany("creature"),
  experience: DS.attr("number")
});

App.Player = DS.Model.extend({
  name: DS.attr("string"),
  initiative: DS.attr("number"),
  notes: DS.attr("string"),
  effects: DS.hasMany("effect")
});

App.Creature = DS.Model.extend({
  name: DS.attr("number"),
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
  abilities: DS.hasMany("ability"),
  effects: DS.hasMany("effect"),
  encounter: DS.hasMany("encounter")
});

App.Ability = DS.Model.extend({
  name: DS.attr("string"),
  description: DS.attr("string"),
  hit_roll: DS.attr("string"),
  damage_roll: DS.attr("string"),
  recharge: DS.attr("string"),
  quantity: DS.attr("number"),
  aoe_type: DS.attr("string"),
  range: DS.attr("string"),
  creature: DS.hasMany("creature")
});

App.Effect = DS.Model.extend({
  name: DS.attr("string"),
  description: DS.attr("string"),
  is_active: DS.attr("boolean")
});
