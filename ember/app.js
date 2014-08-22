
/*
To Do:
upgrade encryption for passwords
archive events
count attendance, other stats?
save composition
calculate off-role
add cookies
 */
window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://ptp-events.firebaseio.com')
});

App.ApplicationSerializer = DS.FirebaseSerializer.extend();

Ember.Handlebars.helper("datetime", function(value, options) {
  var format, time;
  format = "MMM. D, YYYY [@] h:mma";
  if (options.hash.format) {
    format = options.hash.format;
  }
  if (value) {
    time = moment(value).format(format);
    return new Handlebars.SafeString(time);
  }
});

App.ChildView = Ember.View.extend();
