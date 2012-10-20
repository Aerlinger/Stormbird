/*********************************************************************
 *  == Routes for static pages ==
 *   @description:
 *
 *   @requires:
 *    - {foo.js}
 *
 *   @exports:
 *    - {bar.js}
 *
 *  @author: Anthony Erlinger
 *    @date: {10/10/12}
**********************************************************************/

console.log("Loaded static pages routes...");

routes = function(app) {
  app.get('/', function(req, res){
    console.log("Submitting request for '/'");
    res.render("" + __dirname + "/views/index", {title: "Stormbird", stylesheet: 'sidewalk'});
  });
}

module.exports = routes;