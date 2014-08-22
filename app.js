var
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  debug = require('debug')('Angler'),
  routes = require('./routes'),
  errors = require('./errors'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images/favico.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// config routes
app.locals.title = 'Procur';

routes(app);

// catch errors
errors(app);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.get('port'));
});
