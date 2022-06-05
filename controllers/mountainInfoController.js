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
			res.render('mountainInfo', {mountains: findMountain}, this.showAround(mountainNum));
			next();
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
	}


exports.showAround = async(number) => {

	Around.findAll({
		where: {
			mountainNum: number
		}
	}).then((aroundList) => {
		res.render('mountainInfo', {arounds: aroundList});
	}).catch(err => {
		res.status(500).send({
			message: err.message
		});
	})
}