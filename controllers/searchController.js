const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.searchMountain = async (req, res) => {
    const searchWord = req.body.searchWord;
    console.log(searchWord);
    
    Mountain.findAll({
        where: {
            [Op.or] : {
            name: {
                [Op.like]: "%" + searchWord + "%",
            },
            address: {
                [Op.like]: "%" + swtichWord(searchWord) + "%",
            }
        }
        }

    }).then((mountainList) => {
        res.render('search', {mountains: mountainList});
        /*
        const userId = req.session.id;
    
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
            res.render('search', {
                mountains: mountainList,
                bookmarks: bookmarkList
            })
        }).catch(err => {
        res.status(500).send({
            message: err.message
        })
        */
    })
}

exports.searchMountainByName = async (req, res) => {
    const searchWord = req.body.searchWord;
    console.log(searchWord);
    
    Mountain.findAll({
        where: {
            name: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    }).then((mountainList) => {
        res.render('search', {mountains: mountainList});
        /*
        const userId = req.session.id;
    
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
            res.render('search', {
                mountains: mountainList,
                bookmarks: bookmarkList
            })
        }).catch(err => {
        res.status(500).send({
            message: err.message
        })
        */
    })
}

exports.searchMountainByAdd = async (req, res) => {
    const searchWord = switchWord(req.body.searchWord);
    console.log(searchWord);
    
    Mountain.findAll({
        where: {
            address: {
                [Op.like]: "%" + searchWord + "%"
            }
        }

    }).then((mountainList) => {
        res.render('search', {mountains: mountainList});
        /*
        const userId = req.session.id;
    
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
            res.render('search', {
                mountains: mountainList,
                bookmarks: bookmarkList
            })
        }).catch(err => {
        res.status(500).send({
            message: err.message
        })
        */
    })
}

function switchWord(searchWord) {
    let sW = "";
    switch (searchWord) {
        case '서울특별시':
            sW = "서울";
            break;
        case "인천광역시":
            sW = "인천";
            break;
        case "대전광역시":
            sW = "대전";
            break;
        case "광주광역시":
            sW = "광주";
            break;
        case "대구광역시":
            sW = "대구";
            break;
        case "울산광역시":
            sW = "울산";
            break;
        case "부산광역시":
            sW = "부산";
            break;
        case "제주특별자치도":
            sW = "제주";
            break;
        case "전라도":
            sW = "전라";
            break;
        case "충청도":
            sW = "충청";
            break;
        case "경상도":
            sW = "경상";
            break;
    }

    return sW;
}