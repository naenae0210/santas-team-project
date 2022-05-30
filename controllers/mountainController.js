const mysql = require('../models/index'),
    Mountain = mysql.Mountain;

exports.cntMountains = async (req, res) => {
    try {
        data = await Mountain.findAll();
        console.log(data);
        res.render("mountain", {mountains: data});
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

exports.getMountainParams = body => {
    return {
        number: body.number,
        name: body.name,
        address: body.address,
        difficulty: body.difficulty
    }
}