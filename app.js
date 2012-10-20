/*********************************************************************
 *  == Stormbird ==
 *   @description:
 *
 *
 *  @author: Anthony Erlinger
 *  @date: {10/20/12}
 **********************************************************************/


/** ****************************************************************
 *  Dependencies
 ** ****************************************************************/
require('coffee-script');

var express = require('express'),
    routes = require('./routes'),
    stylus = require('stylus'),
    user = require('./routes/user'),
    path = require('path'),
    spawn = require('child_process').spawn,
    RedisStore = require('connect-redis')(express),
    fs = require('fs');

require('express-namespace');
var app = module.exports = express.createServer();

require('./sockets/socket-io')(app)


/** ****************************************************************
 *  Configuration
 ** ****************************************************************/
app.configure(function () {

  app.use(stylus.middleware({
    src:__dirname + "/views",
    // It will add /stylesheets to this path.
    dest:__dirname + "/public"
  }));

  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret:"KioxIqpvdyfMXOHjVkUQmGLwEAtB0SZ9cTuNgaWFJYsbzerCDn",
    store:new RedisStore
  }));
  app.use(require('connect-assets')());
  app.use(app.router);
  app.use(express.static('/public'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions:true,
    showStack:true
  }));
});

app.configure('test', function () {
  app.set('port', 3133);
});

app.configure('production', function () {
  app.use(express.errorHandler());
});


/** ****************************************************************
 *  Routes and Helpers
 ** ****************************************************************/
require('./app/static_pages/routes')(app);
require('./app/helpers/application_helper.js')(app)


/** ****************************************************************
 *  Start listening for requests on the server
 ** ****************************************************************/
app.listen(app.settings.port || 3000);