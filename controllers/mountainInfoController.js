const mysql = require("../models/index"),
    Mountain = mysql.Mountain,
    Around = mysql.Around;

	exports.showMountainInfo = async(req, res, next) => {
		const mountainNum = req.params.number;
		console.log(mountainNum);
	
		Mountain.findOne({
			where: {
				number: mountainNum
			}
		}).then(findMountain => {
			res.send('mountainInfo', {mountain : findMountain});
			next();
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
	}


exports.showAround = async(req, res) => {
	const mountainNum = req.params.number;

	Around.findAll({
		where: {
			mountainNum: mountainNum
		}
	}).then((aroundList) => {
		res.render('mountainInfo', {arounds: aroundList});
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	})
}