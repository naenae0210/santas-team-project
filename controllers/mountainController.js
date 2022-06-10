
const mysql = require('../models/index'),
    Mountain = mysql.Mountain,
    Bookmark = mysql.Bookmark,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.allMountain = async (req, res, next) => {
    Mountain.findAll().then(mountainList => {
        res.locals.mountains = mountainList;
        next();
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

exports.searchMountainByAdd = async(req, res, next) => {
    const searchWord = switchToKorean(req.params.region);

    Mountain.findAll({
        where: {
            address: {
                [Op.like]: "%" + searchWord + "%"
            }
        }
    }).then(mountainList => {
        res.locals.mountains = mountainList;
        next();
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.searchMountainByDifficulty = async (req, res, next) => {
    let searchWord = req.params.difficulty;

    switch (searchWord) {
        case "high":
            searchWord = "상";
            break;
        case "mid":
            searchWord = "중";
            break;
        case "low":
            searchWord = "하";
            break;
    }

    Mountain.findAll({
        where: {
            difficulty: searchWord
        }
    }).then(mountainList => {
        res.locals.mountains = mountainList;
        next();
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