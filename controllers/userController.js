const user = require("../models/user");

const db = require("../models/index"),
    passport = require("passport"),	
    bcrypt = require("bcrypt"),
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
/*
    logout: (req, res, next) => {
      req.logout((err) => {
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
      });
    },
    */
    logout: (req,res) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    },
    /*
    authenticate: passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: "Failed to Sign In.",
      successRedirect: "/",
      successFlash: "Logged In!"
    }),*/

    authenticate: (req,res,next) => {
        passport.authenticate('local', (authError,user,info)=>{
            if(authError{
                console.error(authError);
                return next(authError);
            }
            if(!user){
                return res.redirect('/users/login');
            }
            return req.login(user,(loginError)=>{
                if(loginError){
                    console.error(loginError);
                    return next(loginError);
                }
                return res.redirect('/');
            })
        })(req,res,next);
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
        if(req.skip) next();
        let userParams = getUserParams(req.body);
        try{
            const exUser = await User.findOne({where:{id}});
            if(exUser){
                res.locals.redirectView = "/users/new";
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                next(error);
            }else{
                const hash = await bcrypt.hash(password,10);
                await User.create(userParams);
                req.flash("success", `${user.name}'s account created successfully!`);
                res.locals.redirectView = "/users/login";
                res.locals.user = user;
                next();
            }
        }catch(err){
            console.error(err);
            next(err);
        }
        /*
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
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        try{
            if(userParams.password = "undifined"){
                let user = await User.findByPkAndUpdate(userId, userParams);
                req.logout();
                res.locals.redirect = 'users/login';
                res.locals.user = user;
                next();
            }else{
                userParams.password = await bcrypt.hash(userParams.password,10);
                let user = await User.findByPkAndUpdate(userId, userParams);
                req.flash("success", `${user.name}'s account updated successfully!`);
                res.locals.redirectView = "/users/login";
                res.locals.user = user;
                next();
            }
            /*
            let oldPassword = user.password;
            await user.changePassword(oldPassword, userParams.password );
            res.locals.redirectView = '/';
            next();*/

        }catch(error){
            console.log(`Error fetching user by ID: ${error.messgae}`);
            next(error);
        }
      }
        
,

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
