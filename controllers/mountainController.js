const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.allMountain = async (req, res) => {
    Mountain.findAll().then(mountainList => {
        res.render('mountain', {mountains : mountainList});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

exports.getMountainParams = body => {
    return {
        number: body.number,
        name: body.name,
        address: body.address,
        difficulty: body.difficulty
    }
}

exports.searchMountainByAdd = async(req, res) => {
    const searchWord = req.params.region;
    console.log(searchWord);

    searchWord = switchToKorean(searchWord);

    Mountain.findAll({
        where: {
            address: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    }).then(mountainList => {
        res.render('mountain', {mountains : mountainList});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.searchMountainByDifficulty = async (req, res) => {
    const searchWord = req.body.difficulty;
    console.log(searchWord);

    searchWord = switchToKorean(searchWord);

    Mountain.findAll({
        where: {
            difficulty: searchWord
        }
    }).then(mountainList => {
        res.render('mountain', {mountains : mountainList});
        res.redirect("/mountain");
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

function switchToKorean(searchWord) {
    switch (searchWord) {
        case "seoul":
            searchWord = "서울";
            break;
        case "gyeonggi":
            searchWord = "경기";
            break;
        case "incheon":
            searchWord = "인천";
            break;
        case "gangwon":
            searchWord = "강원";
            break;
        case "chungcheong":
            searchWord = "충청";
            break;
        case "daejeon":
            searchWord = "대전";
            break;
        case "jeolla":
            searchWord = "전라";
            break;
        case "gwangju":
            searchWord = "광주";
            break;
        case "gyeongsang":
            searchWord = "경상";
            break;
        case "daegu":
            searchWord = "대구";
            break;
        case "ulsan":
            searchWord = "울산";
            break;
        case "busan":
            searchWord = "부산";
            break;
        case "jeju":
            searchWord = "제주";
            break;
    }

    return searchWord;
}