const db = require("../models/index"),
    passport = require("passport"),	
    crypto = require("crypto"),
    User = db.User,
    getUserParams = body => {
        return {
            id: body.id,
            password: body.password,
            name: body.name,
            birth: body.birth,
            nickname: body.nickname
        };
    };
module.exports = {
    login: (req, res) => {
      res.render("users/login");
    },

    logout: (req, res, next) => {
      req.logout((err) => {
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
      });
    },
    
    authenticate: passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: "Failed to Sign In.",
      successRedirect: "/",
      successFlash: "Logged In!"
    }),


    index: async (req, res, next) => {
        try {
            let users = await User.findAll();
            res.locals.users = users;
            next();
        } catch (error) {
            console.log(`Error fetching users: ${error.messgae}`);
            next(error);
        };
    },

    indexView: (req, res) => {
        res.render("users/index");
    },

    new: (req, res) => {
        res.render("users/new");
    },

    create: async (req, res, next) => {
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        try{
            let user = new User(userParams);
            User.register(user, req.body.password, (error, user) => {
                if(user) {
                req.flash("success", `${user.name}'s account created successfully!`);
                res.locals.redirect = "/users/login";
                res.locals.user = user;
                next();
                }else{
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/users/new";
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                next(error);
                }
       });
     } catch(error) {
       console.log(`Error saving user: ${error.message}`);
       res.locals.redirect = "/users/new";
       req.flash("error", `Failed to create user account because: ${error.message}.`);
       next(error);
     };
   },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    show: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let userId = req.params.id;
            let user = await User.findByPk(userId);
            res.locals.user = user;
            next();
        } catch (error) {
            console.log(`Error fetching user by ID: ${error.messgae}`);
            next(error);
        };
    },

    showView: (req, res) => {
        res.render("users/show");
    },

    edit: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let userId = req.params.id;
            let user = await User.findByPk(userId);
            res.render("users/edit", {
                user: user
            });
        } catch (error) {
            console.log(`Error fetching user by ID: ${error.messgae}`);
            next(error);
        };
    },

    update: async (req, res, next) => {
        let userId = req.params.id,
            userParams = getUserParams(req.body),
            user = await User.findByPk(userId);
            try{
                User.findByPk(userId)
                .then(foundUser => {
                    foundUser.changePassword(user.password, req.body.password)
                        .then(() => {
                            console.log('password changed');
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                });
                  req.logout((err) => {
                    req.flash("success", "You have been logged out!");
                  }); 
                  res.locals.redirect = "/";
                  next();
                }catch(error){
                    console.log(`Error saving user: ${error.message}`);
                    res.locals.redirect = "/";
                    req.flash("error", `Failed to update user account because: ${error.message}.`);
                    next(error);
                }
                /*
            bcrypt.genSalt(10, function(err, salt) {
                if (err) return next(err);
                bcrypt.hash(userParams.password, salt, async function (err, hash) {
                  if (err) return next(err);
                  //userParams.password = hash; 
                  await User.update({mysalt:salt}, {
                    where: {
                      id: userId
                    }
                  });
                  await User.update({password:hash}, {
                    where: {
                      id: userId
                    }
                  });
                });
              });
              //user = await User.findByPkAndUpdate(userId, userParams); 
              req.logout((err) => {
                req.flash("success", "You have been logged out!");
              }); 
              res.locals.redirect = "/";
              next();
            } catch(error){
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/";
                req.flash("error", `Failed to update user account because: ${error.message}.`);
                next(error);
            }*/
            
        },

    delete: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let user = await User.findByPkAndRemove(userId);
            res.locals.redirect = "/";
            next();
        } catch (error) {
            console.log(`Error deleting user by ID: ${error.messgae}`);
            next();
        };
    }
};
