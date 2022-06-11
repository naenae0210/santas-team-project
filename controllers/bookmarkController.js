const mysql = require('../models/index'),
    Bookmark = mysql.Bookmark,
    Mountain = mysql.Mountain;

exports.create = async (req, res) => {
    const userId = req.user.id;

    await Bookmark.create({
        id: userId,
        mountainNum: req.params.mountainNum
    })
    .then(result => {
        console.log("create!!");
        res.locals.bookmarks.push(result);
        res.redirect("/mountain");
    }).catch(err => {
        console.log(`Error saving bookmark: ${err.message}`);
    });
};

exports.delete = async (req, res) => {
    const userId = req.user.id;

    await Bookmark.destroy({
        where : {
            id: userId,
            mountainNum: req.params.mountainNum
        }
    }).then(result => {
        res.redirect("/mountain");
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.allBookmark = async (req, res) => {
    let userId = req.user.id;


    Bookmark.findAll({
        where: {
            id : userId
        },
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true
            }
        ]
    }).then((bookmarkList) => {
        res.render('bookmark', { bookmarks : bookmarkList
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.isBookmark = async (req, res) => {
    let userId;
    if (req.isAuthenticated()) {
        userId = req.user.id;

        Bookmark.findAll({
            where: {
                id : userId
            },
            include: [
                {
                    model: Mountain,
                    as: 'mountain',
                    required: true
                }
            ]
        }).then((bookmarkList) => {
            return res.render('mountain', { bookmarks : bookmarkList
            });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })

    }
    else {
        return res.render('mountain', { bookmarks: []});
    }
};