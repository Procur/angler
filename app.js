var
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  busboy = require('connect-busboy'),
  debug = require('debug')('Angler'),
  routes = require('./routes'),
  errors = require('./errors'),
  app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images/favico.ico')));

app.use(cookieParser('Magical Unicorn'));
app.use(session({ resave: true, saveUninitialized: true, secret: 'Magical Unicorn' }));
app.use(csrf());

app.use(require('./helpers/csrf_helper'));
app.use(require('./helpers/apitoken_helper').get);

app.use(logger('dev'));

app.use(busboy());

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