const around = require("../models/around");

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
			Around.findAll({
				where: {
					mountainNum: mountainNum
				}
			}).then((aroundList) => {
				res.render('mountainInfo', {
					mountains: findMountain,
					arounds: aroundList
				})
			})	
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		})
	}

/*
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
*/