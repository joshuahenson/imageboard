const passportTwitter = require('../auth/twitter');
const imageController = require('../controllers/imageController');

module.exports = (app) => {
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).end();
  }

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

  app.get('/api/images', imageController.getImages);

  app.route('/api/image')
    .put(checkAuth, imageController.addImage)
    .post(checkAuth, imageController.likeImage);

  app.get('/auth/twitter', passportTwitter.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', {
      // successRedirect: '/',
      successRedirect: 'http://127.0.0.1:3000', // TODO: PROD - fix url
      failureRedirect: '/login' // TODO: FIX
    })
  );
};
