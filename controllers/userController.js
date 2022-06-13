const db = require("../models/index"),
    passport = require("passport"),	
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
    /*
    authenticate: passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: "Failed to Sign In.",
      successRedirect: "/",
      successFlash: "Logged In!"
    }),*/

    authenticate: async(req, res, next) => {
    try{
        let user = await User.findOne({
            where: { id: req.body.id}
        })
        if (user) {
            let passwordMatch = await user.passwordComparison(req.body.password);
            if (passwordMatch) {
                res.locals.redirect ="/";
                req.flash("success",`${user.name}'s logged in successfully!`);
                res.locals.user = user;
                next(); 
            }else{
             req.flash("error","Failed to log in : incorrect password");
             res.locals.redirect = "/users/login";
             next();
            }
        }else{
             req.flash("error","Failed to log in!: Useraccount is not found");
             res.locals.redirect = "/users/login";
             next();
        }
    } catch(err) {
        console.log(`Error logging in user: ${err.message}`);
        next(err);
    }
}, 

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
     if (req.skip) next();
     let userParams = getUserParams(req.body);
     try{
       let user = await User.create(userParams);
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
     } catch(error) {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash("error", `Failed to create user account because: ${error.message}.`);
        next(error);
      };

       /*
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
     };*/
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
        try {
            const mysalt = await bcrypt.genSalt(10);
            const myhash = await bcrypt.hash(req.body.password, mysalt);
            //console.log(hashPassword);
            //userParams.password = await bcrypt.hash(userParams.password, salt);
            await User.update({mysalt:mysalt}, {
                where: {
                  id: userId
                }
              });
            await User.update({password:myhash}, {
                where: {
                  id: userId
                }
              });
            req.logout((err) => {
                req.flash("success", "You have been logged out!");
                res.locals.redirect = "/user/login";
                res.locals.user = user;
                next();
            });      

        } catch(error) {
            console.log(`Error saving user: ${error.message}`);
            res.locals.redirect = "/";
            req.flash("error", `Failed to update user account because: ${error.message}.`);
            next(error);
          };
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
