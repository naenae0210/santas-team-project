const db = require("../models/index"),
    Comment = db.Comment,
    Post = db.post,
    getCommentParams = (req) => {
        return {
            commentNum: req.body.commentNum,
            postId: req.params.postId,
            commentDetail: req.body.commentDetail,
            userId: req.user.id
        };
    };


module.exports = {
      create: async (req, res, next) => {
        const postId = req.params.postId;
        let commentParams = getCommentParams(req);
        console.log(commentParams);
        console.log(req.body);
        try {
            let comment = await Comment.create(commentParams);
            console.log("created");
            res.locals.redirect = `/posts/${postId}`;
            next();
        } catch (error) {
            console.log(`Error saving comment: ${error.messgae}`);
	        next();
        };
    },

    showComment: async (req, res, next) => {
        try {
            const postId = req.params.id;
            let comments = await Comment.findAll({
                where: {
                    postId: postId
                }
            });
            console.log(comments);
            res.render("posts/show", {comments: comments});
        } catch (error) {
            console.log(`Error fetching posts: ${error.messgae}`);
            next(error);
        };
    },


    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },

edit: async (req, res, next) => {
    let commentNum = req.params.commentNum;
    try {

        let comment = await Comment.findByPk(commentNum);
        res.render("comments/edit", {
            comment: comment
        });
    } catch (error) {
        console.log(`Error fetching by ID: ${error.messgae}`);
        next(error);
    };
},

update: async (req, res, next) => {
    try {
        let commentNum = req.params.commentNum;
        let postId = req.params.id;
        commentParams = getCommentParams(req);
        let comment = await Comment.findByPkAndUpdate(commentNum, commentParams);
        res.locals.redirect = `/posts/${postId}`;
        res.locals.comment = comment;
        next();
    } catch (error) {
        console.log(`Error updating comment by ID: ${error.messgae}`);
        next(error);
    };
},

delete: async (req, res, next) => {
    let commentNum = req.params.commentNum;
    let postId = req.params.id;
    try {
        let comment = await Comment.destroy({
		where: {commentNum: req.params.commentNum},
	});
        res.locals.redirect = "/posts"
        next();
    } catch (error) {
        console.log(`Error deleting comment by ID: ${error.messgae}`);
        next();
    };
},
};
