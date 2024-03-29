const user = require("../models/user"); 
const randomstring = require("randomstring");

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

    authenticate: passport.authenticate("local", {
      failureRedirect: "/users/login",
      failureFlash: "Failed to Sign In.",
      successRedirect: "/",
      successFlash: ""
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
                next(); //next(err);
                }
       });
     } catch(error) {
       console.log(`Error saving user: ${error.message}`);
       res.locals.redirect = "/users/new";
       req.flash("error", `Failed to create user account because: ${error.message}.`);
       next(); //next(error);
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
            res.locals.redirect = "/";
            req.flash("error","페이지를 불러올 수 없습니다.");
            next(); // next(error);
        };
    },

    update: async (req, res, next) => {
        let userId = req.params.id;
        let userParams = getUserParams(req.body);
        let user = await User.findByPk(userId); 
        console.log(userParams.password); //test
        
        try{
            if(userParams.password != ''){
                let newParams = userParams;
                let randomStr = randomstring.generate(5);
                newParams.id =`${userId}randomStr`;
                let newUser = new User(newParams);    
            User.register(newUser,newUser.password,async(err,newUser)=>{
                if(newUser){
                    try{
                        user.mysalt = newUser.mysalt;
                        user.save({fields: ['mysalt']});
                        userParams.password = newUser.password;
                        const update = await user.update(userParams,{where: {id : userId}}); 
                        await User.destroy({
                        where: {
                          id: newUser.id
                        }
                        });
                      req.flash("success", `${user.name}'s account updated successfully!`);
                      res.locals.redirect = `/users/${user.id}/edit`;
                      res.locals.user = user;
                      next();
                    }catch(error){
                        console.log(`Error updating user: ${error.message} : 1`);
                        res.locals.redirect = `/users/${userId}/edit`;
                        req.flash("error", `Failed to update user account because: ${error.message}.`);
                        next(); //next(error); 
                    }
                }
                else{
                     console.log(`Error updating user: ${error.message} : 2`);
                     res.locals.redirect = `/users/${userId}/edit`;
                    req.flash("error", `Failed to update user account because: ${error.message}.`);
                    next(); //next(error);
                    }
            
            });}
            else{
                userParams.password = user.password;
                const update = await user.update(userParams,{where: {id : userId}});
                req.flash("success", `${user.name}'s account updated successfully!`);
                res.locals.redirect = `/users/${user.id}/edit`;
                res.locals.user = user;
                next();
            }
        }catch(error){
            console.log(`Error updating user: ${error.message} : 3`);
            res.locals.redirect = `/users/${userId}/edit`;
            req.flash("error", `Failed to update user account because: ${error.message}.`);
            next(); //next(error);
        }; 
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
            res.locals.redirect = `/users/${userId}/edit`;
            req.flash("error", `Failed to delete user account because: ${error.message}.`);
            next();
        };
    }
};
