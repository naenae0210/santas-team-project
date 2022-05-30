const mysql = require("../models/index"),
    User = mysql.User;

exports.getUserParams = body => {
    return {
        id: body.id
    }
}