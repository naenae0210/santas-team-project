const mysql = require('../models/index'),
    Around = mysql.Around,
    Mountain = mysql.Mountain,
    sequelize = require("sequelize"),
    Op = sequelize.Op;

exports.searchAroundByAdd = async(req, res) => {
    const searchWord = switchToKorean(req.params.region);
    console.log(searchWord);
    
    Around.findAll({
        where: {
            address: {
                [Op.like]: "%" + searchWord + "%"
            }
        },
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true
            }
        ]
    }).then(aroundList => {
        res.render('around', {arounds: aroundList})
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.searchAroundByName = async (req, res) => {
    const searchWord = req.body.searchWord;
    console.log(searchWord);
    
    Around.findAll({
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true,
                where: {
                    name: {
                        [Op.like]: "%" + searchWord + "%"
                    }
                }
            }
        ]
    }).then((aroundList) => {
        res.render('around', {arounds: aroundList});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.allAround = async (req, res) => {
    Around.findAll({
        include: [
            {
                model: Mountain,
                as: 'mountain',
                required: true
            }
        ]
    }).then(aroundList => {
        console.log(aroundList);
        res.render('around', {arounds: aroundList});
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
};

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