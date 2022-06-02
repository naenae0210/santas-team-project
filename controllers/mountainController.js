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
    const searchWord = switchToKorean(req.params.region);
    console.log(searchWord);

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
    const searchWord = switchToKorean(req.params.region);
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
    let sW = "";
    switch (searchWord) {
        case "seoul":
            sW = "서울";
            break;
        case "gyeonggi":
            sW = "경기";
            break;
        case "incheon":
            sW = "인천";
            break;
        case "gangwon":
            sW = "강원";
            break;
        case "chungcheong":
            sW = "충청";
            break;
        case "daejeon":
            sW = "대전";
            break;
        case "jeolla":
            sW = "전라";
            break;
        case "gwangju":
            sW = "광주";
            break;
        case "gyeongsang":
            sW = "경상";
            break;
        case "daegu":
            sW = "대구";
            break;
        case "ulsan":
            sW = "울산";
            break;
        case "busan":
            sW = "부산";
            break;
        case "jeju":
            sW = "제주";
            break;
    }

    return sW;
}