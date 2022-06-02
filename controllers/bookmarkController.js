const mysql = require('../models/index'),
    Bookmark = mysql.Bookmark,
    User = require('./userController'),
    Mountain = mysql.Mountain;

exports.create = async (req, res) => {
    const userParams = User.getUserParams(req.body);
    
    try {
        const bookmarkParams = {
            id: userParams.id,
            mountainNum: req.params.mountainNum
        }
        const bookmark = await Bookmark.create(bookmarkParams);
        res.locals.redirect = "/mountain";
        res.locals.bookmark = bookmark;
    } catch(error) {
        console.log(`Error saving bookmark: ${error.message}`);
    };
};

exports.delete = async (req, res) => {
    const userParams = User.getUserParams(req.body);

    Bookmark.destroy({
        where : {
            id: userParams.id,
            mountainNum: req.params.mountainNum
        }
    }).then(result => {
        res.redirect("mountain");
    }).catch(error => {
        console.log(`Error deleting bookmark: ${error.message}`);
    });
};

exports.getBookMark = async (req, res) => {
    const userParams = User.getUserParams(req.body);

    Bookmark.count({
        where : {
            id: userParams.id,
            mountainNum: req.params.mountainNum
        }
    }
    ).then(c => {
        if (c == 1) {

        }
    })

    Bookmark.dataValues
}

exports.allBookmark = async (req, res) => {    
    const userParams = User.getUserParams(req.body);

    Bookmark.findAll({
        where: {
            id : userParams.id
        },
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true
            }
        ]
    }).then((bookmarkList) => {
        const bookmarks = {
            number: bookmarkList.number,
            name: bookmarkList.name,
            address: bookmarkList.address
        }
        res.render('/bookmark', { bookmarks
        });
    })
}