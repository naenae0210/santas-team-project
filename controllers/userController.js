const db = require("../models/index"),
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
        let userParams = getUserParams(req.body);
        try {
            let user = await User.create(userParams);
            res.locals.redirect = "/users";
            res.locals.user = user;
            next();
        } catch (error) {
            console.log(`Error saving users: ${error.messgae}`);
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
            userParams = getUserParams(req.body);
        try {
            let user = await User.findByPkAndUpdate(userId, userParams);
            res.locals.redirect = `/users/${userId}`;
            res.locals.user = user;
            next();
        } catch (error) {
            console.log(`Error updating user by ID: ${error.messgae}`);
            next(error);
        };
    },

    delete: async (req, res, next) => {
        let userId = req.params.id;
        try {
            let user = await User.findByPkAndRemove(userId);
            res.locals.redirect = "/users";
            next();
        } catch (error) {
            console.log(`Error deleting user by ID: ${error.messgae}`);
            next();
        };
    }
};
