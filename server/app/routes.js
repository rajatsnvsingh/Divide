// app/routes.js

//The whole app and router thing is a workaround.
//Will update to separate routes files
module.exports = function(app, router, passport) {
  // Authentication Routes =======================================================
  //user currently types in localhost:3001/auth/google to log in
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:8080/login", successRedirect: "http://localhost:8080/" })
  );

  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get(
    "/",
    function(req, res) {
      res.send('Hello World!');
    }
  );

  // Database Routes =============================================================
  // this method fetches all available data in our database
  router.get("/getData", ensureAuthenticated, (req, res) => {
    data = {
      info: "jeez"
    };
    return res.json({ success: true, data: data });
    //   Data.find((err, data) => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true, data: data });
    //   });
  });

  // Simple route middleware to ensure user is authenticated.
  //   Use this route middleware on any resource that needs to be protected.  If
  //   the request is authenticated (typically via a persistent login session),
  //   the request will proceed.  Otherwise, the user will be redirected to the
  //   login page.
  function ensureAuthenticated(req, res, next) {
    let val = req.isAuthenticated();
    console.log(val);
    if (req.isAuthenticated()) { return next(); }
    res.redirect('http://localhost:8080/login');
  }

  // this is our update method
  // this method overwrites existing data in our database
  router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  // this is our delete method
  // this method removes existing data in our database
  router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });

  // this is our create methid
  // this method adds new data in our database
  router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

};
