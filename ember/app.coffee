###
To Do:
upgrade encryption for passwords
archive events
count attendance, other stats?
save composition
calculate off-role
add cookies
###

window.App = Ember.Application.create(
)

App.ApplicationAdapter = DS.FirebaseAdapter.extend(
  firebase: new Firebase('https://ptp-events.firebaseio.com')
)

App.ApplicationSerializer = DS.FirebaseSerializer.extend()

# HELPERS
Ember.Handlebars.helper "datetime", (value, options) ->
  format = "MMM. D, YYYY [@] h:mma"
  format = options.hash.format  if options.hash.format
  if value
    time = moment(value).format(format)
    new Handlebars.SafeString(time)



App.ChildView = Ember.View.extend()