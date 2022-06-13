const db = require("../models/index"),
    Comment = db.comment,
    comment = db.comment,
    Post = db.post,
    post = db.post,

    getCommentParams = body => {
        return {
            commentNum: body.commentNum,
            postId: body.postId,
            commentDetail: body.commentDetail,
        };
    };


module.exports = {
    create: async (req, res, next) => {
        const postId = req.params.postId;
        let commentParams = getCommentParams(req.body);
        try {
            let comment = await Comment.create({
                postId: postId,
                commentDetail: req.body.commentDetail,
                commentNum: req.body.commentNum
            });
                 res.locals.redirect = `/posts/${postId}`;
            res.locals.comment = comment;
            next();
        } catch (error) {
            console.log(`Error saving comment: ${error.messgae}`);
            next(error);
        };
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
/*
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
