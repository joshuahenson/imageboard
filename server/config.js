module.exports = {
  session: {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  },
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: '/auth/twitter/callback'
  }
};
