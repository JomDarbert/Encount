App.Router.map(function() {
  return this.resource("user", function() {
    return this.resource("encounter", function() {
      this.resource("player");
      return this.resource("creature", function() {
        return this.resource("ability");
      });
    });
  });
});
