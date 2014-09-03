window.App = Ember.Application.create({
  LOG_TRANSITIONS_INTERNAL: true
});

App.ApplicationAdapter = DS.FixtureAdapter;


/*
App.ApplicationAdapter = DS.FirebaseAdapter.extend(
  firebase: new Firebase('https://ptp-events.firebaseio.com')
)

App.ApplicationSerializer = DS.FirebaseSerializer.extend()
 */

App.showHide = Ember.View.extend();
