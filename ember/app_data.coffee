App.Event = DS.Model.extend
  title:                DS.attr("string")
  date:                 DS.attr("date",    {defaultValue: new Date()})
  type:                 DS.attr("string")
  leader:               DS.attr("string")
  combatLog:            DS.attr("string")
  maxParticipants:      DS.attr("number",  {defaultValue: 5})
  maxTanks:             DS.attr("number",  {defaultValue: 1})
  maxT_stalker:         DS.attr("number",  {defaultValue: null})
  maxT_engineer:        DS.attr("number",  {defaultValue: null})
  maxT_warrior:         DS.attr("number",  {defaultValue: null})
  maxHealers:           DS.attr("number",  {defaultValue: 1})
  maxH_spellslinger:    DS.attr("number",  {defaultValue: null})
  maxH_medic:           DS.attr("number",  {defaultValue: null})
  maxH_esper:           DS.attr("number",  {defaultValue: null})
  maxDPS:               DS.attr("number",  {defaultValue: 3})
  maxD_spellslinger:    DS.attr("number",  {defaultValue: null})
  maxD_medic:           DS.attr("number",  {defaultValue: null})
  maxD_esper:           DS.attr("number",  {defaultValue: null})
  maxD_stalker:         DS.attr("number",  {defaultValue: null})
  maxD_engineer:        DS.attr("number",  {defaultValue: null})
  maxD_warrior:         DS.attr("number",  {defaultValue: null})
  requiresProgression:  DS.attr("boolean", {defaultValue: true})
  requiresBuffFood:     DS.attr("boolean", {defaultValue: false})
  requiresRegFood:      DS.attr("boolean", {defaultValue: false})
  requiresMedkits:      DS.attr("boolean", {defaultValue: false})
  requiresBoosts:       DS.attr("boolean", {defaultValue: false})
  requiredDPS:          DS.attr("number",  {defaultValue: null})
  signupError:          DS.attr("string",  {defaultValue: null})
  participants:         DS.hasMany("user")
  success:              DS.attr("boolean")
  bossesKilled:         DS.attr("number")
  archived:             DS.attr("boolean")
  notes:                DS.attr("string")

  # COUNT TANKS
  numTanks: (->
    @get("participants").filterProperty('mainRole','Tank').length
  ).property("participants.@each.mainRole")

  numT_warrior: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Tank") isnt -1 and user.get("charclass").indexOf("Warrior") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numT_stalker: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Tank") isnt -1 and user.get("charclass").indexOf("Stalker") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numT_engineer: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Tank") isnt -1 and user.get("charclass").indexOf("Engineer") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")


  # COUNT HEALERS
  numHealers: (->
    @get("participants").filterProperty('mainRole','Healer').length
  ).property("participants.@each.mainRole")

  numH_esper: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Healer") isnt -1 and user.get("charclass").indexOf("Esper") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numH_medic: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Healer") isnt -1 and user.get("charclass").indexOf("Medic") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numH_spellslinger: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("Healer") isnt -1 and user.get("charclass").indexOf("Spellslinger") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")


  # COUNT DPS
  numDPS: (->
    @get("participants").filterProperty('mainRole','DPS').length
  ).property("participants.@each.mainRole")

  numD_warrior: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Warrior") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numD_stalker: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Stalker") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numD_engineer: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Engineer") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numD_esper: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Esper") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numD_spellslinger: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Spellslinger") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")

  numD_medic: (->
    count = @get("participants").filter (user) ->
      user.get("mainRole").indexOf("DPS") isnt -1 and user.get("charclass").indexOf("Medic") isnt -1
    count.length
  ).property("participants.@each.mainRole,participants.@each.charclass")


  isUpcoming: (->
    eventDate = @get "date"
    now = new Date()
    eventDate > now
  ).property("event.@each.date")

  isCompleted: (->
    eventDate = @get "date"
    now = new Date()
    eventDate < now
  ).property("event.@each.date")

App.User = DS.Model.extend
  username: DS.attr("string")
  password: DS.attr("string")
  canCreateEvents: DS.attr("boolean", {defaultValue: false})
  charclass: DS.attr("string")
  mainRole: DS.attr("string")
  offRole: DS.attr("string")
  isProgression: DS.attr("boolean",  {defaultValue: false})
  dummyDPS: DS.attr("number", {defaultValue: 0})

  isTank: (->
    mr = @get "mainRole"
    true if mr is "Tank"
  ).property("mainRole")

  isHealer: (->
    mr = @get "mainRole"
    true if mr is "Healer"
  ).property("mainRole")

  isDPS: (->
    mr = @get "mainRole"  
    true if mr is "DPS"
  ).property("mainRole")