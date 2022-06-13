const db = require("../models/index"),
    Comment = db.Comment,
    Post = db.post,
    getCommentParams = (req) => {
        return {
            commentNum: req.body.commentNum,
            postId: req.body.postId,
            commentDetail: req.body.commentDetail,
            userId: req.user.id
        };
    };


module.exports = {
      create: async (req, res) => {
        const postId = req.params.postId;
        let commentParams = getCommentParams(req.body);
        try {
            let comment = await Comment.create({commentParams});
            res.redirect(`/posts/${postId}`);
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
            res.locals.comments = comments;
            res.redirect(`/posts/${postId}`);
        } catch (error) {
            console.log(`Error fetching posts: ${error.messgae}`);
            next(error);
        };
    },

/*
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    update: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let comment = await Comment.update({
                commentDeatail: req.body.commentDeatil
            }, {
                where: {
                    postId: req.params.id
                }
            });
            res.json(comment);
            res.locals.redirect = `/posts/${postId}`;
            res.locals.comments = comment;
            next();

        } catch {
            console.log(`Error updating comment : ${error.messgae}`);
            next();
        }
    },

    delete: async (req, res, next) => {
        let postId = req.params.id;
        try {
            let comment = await Comment.destroy({
                where: {
                    postId: req.params.id
                }
            });
            res.json(comment);
            res.locals.redirect = "/posts";
            next();
        } catch (error) {
            console.log(`Error deleting comment: ${error.messgae}`);
            next();
        };
    },
*/
};
