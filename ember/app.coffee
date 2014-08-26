window.App = Ember.Application.create()
App.ApplicationAdapter = DS.FixtureAdapter
###
App.ApplicationAdapter = DS.FirebaseAdapter.extend(
  firebase: new Firebase('https://ptp-events.firebaseio.com')
)

App.ApplicationSerializer = DS.FirebaseSerializer.extend()
###