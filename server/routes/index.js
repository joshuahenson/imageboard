const passportTwitter = require('../auth/twitter');

module.exports = (app) => {
  app.get('/api/user', (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ userId: '' });
    }
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', {
      // successRedirect: '/',
      successRedirect: 'http://127.0.0.1:3000', // TODO: PROD - fix url
      failureRedirect: '/login' // TODO: FIX
    })
  );
};
