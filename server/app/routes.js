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
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    function(req, res) {
      var token = req.user.token;
      res.redirect("/?token=" + token);
    }
  );

  app.get(
    "/",
    function(req, res) {
      res.send('Hello World!');
    }
  );

  // Database Routes =============================================================
  // this method fetches all available data in our database
  router.get("/getData", (req, res) => {
    data = {
      info: "jeez"
    };
    return res.json({ success: true, data: data });
    //   Data.find((err, data) => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true, data: data });
    //   });
  });

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
