module.exports = function(app) {
  app.dynamicHelpers({
    flash: function(req, res) {
      return req.flash();
    },
    currentPath: function(req, res) {
      return req.path;
    }
  });
}