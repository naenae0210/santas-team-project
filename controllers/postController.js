const db = require("../models/index"),
    Post = db.post,
    User = db.User,
    getPostParams = body => {
        return {
            id: body.id,
            title: body.title,
            detail: body.detail,
        };
    };

module.exports = {
    index: async (req, res, next) => {
        try {
            let posts = await Post.findAll();
            res.locals.posts = posts;
            next();
        } catch (error) {
            console.log(`Error fetching posts: ${error.messgae}`);
            next(error);
        };
    },

    indexView: (req, res) => {
        res.render("posts/index");
    },

    new: (req, res) => {
        res.render("posts/new");
    },

    create: async (req, res, next) => {
        let postParams = getPostParams(req.body);
        try {
	    let postParams = getPostParams(req.body);
            let post = await Post.create(postParams);
            res.locals.redirect = "/posts";
            res.locals.post = post;
            next();
        } catch (error) {
            console.log(`Error saving posts: ${error.messgae}`);
            next(error);
        };
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

    show: async (req, res, next) => {
        let postId = req.params.id;
        try {
            const post = await Post.findByPk(postId);
            const comments = await Post.findAll({
                include: [{
                    model: Comment,
                    where: {
                        postId: req.params.id,
                    },
                }]
            });

            res.locals.post = post;
            res.locals.comments = comments;
            next();
        } catch (error) {
            console.log(`Error fetching post by ID: ${error.messgae}`);
            next(error);
        };
    },

    showView: async (req, res) => {
        res.render("posts/show");
    },

    edit: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let postId = req.params.id;
            let post = await Post.findByPk(postId);
            res.render("posts/edit", {
                post: post
            });
        } catch (error) {
            console.log(`Error fetching post by ID: ${error.messgae}`);
            next(error);
        };
    },

    update: async (req, res, next) => {
        let postId = req.params.id,
            postParams = getPostParams(req.body);
        try {
            let postId = req.params.id,
            postParams = getPostParams(req.body);
            let post = await Post.findByPkAndUpdate(postId, postParams);
            res.locals.redirect = `/posts/${postId}`;
            res.locals.post = post;
            next();
        } catch (error) {
            console.log(`Error updating post by ID: ${error.messgae}`);
            next(error);
        };
    },

    delete: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let post = await Post.findByPkAndRemove(postId);
            res.locals.redirect = "/posts";
            next();
        } catch (error) {
            console.log(`Error deleting post by ID: ${error.messgae}`);
            next();
        };
    },

    postById : async (req, res) => {
        const userId = req.user.id;

        Post.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    required: true,
                    where: {
                        id: userId
                    }
                }
            ]
        }).then(postList => {
            res.render('delPost', {posts: postList});
        }).catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
    }
};
