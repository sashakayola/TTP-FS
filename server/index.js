const path = require('path');
const express = require('express');
const morgan = require('morgan'); // logging middleware
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({
  db,
});
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const { findById } = require('./domain/users');
module.exports = app;

passport.serializeUser((user, done) => done(null, String(user.id)));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(morgan('dev'));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'very secret password',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      proxy: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

const syncDb = () => db.sync();

async function startApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  startApp();
} else {
  createApp();
}
