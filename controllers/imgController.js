const request = require("request"),
    fetch = require("node-fetch");


const key = 'HalmOJvtllDf2LtbeFjdxEyAM5e6okRMDLyG9YLH2OQzltWsOAkTxoKyA%2BMOZ0WZ5glQOzqEK8SB0CX3s0zbMQ%3D%3D';

const add1 = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoImgOpenAPI?mntiListNo='
    add2 = '&ServiceKey=',
    add3 = '&_type=json';

exports.getImage = async (req, res) => {

    const address = add1 + req.params.number + add2 + key + add3;

    fetch(address).then(result => {

        request.get(result.url, (error, resp, body) => {

            if (!isJson(body)) {
                return res.redirect("../../images/cantload.png");
            }
            const js = JSON.parse(body);

            let image = js.response.body.items.item;

            if (!Array.isArray(image)) {
                image = new Array(image);
            }

            if (image[0] != undefined) {
                return res.redirect("https://www.forest.go.kr/images/data/down/mountain/" + image[0].imgfilename);
            }
            else {
                return res.redirect("../../images/noimage.png");
            }
        }
        )}
        
    )
};

exports.getImages = async (req, res) => {

    const imgNum = req.params.imgNum;
    const address = add1 + req.params.number + add2 + key + add3;

    fetch(address).then(result => {

        request.get(result.url, (error, resp, body) => {

            if (!isJson(body)) {
                return res.redirect("../../images/cantload.png");
            }
            const js = JSON.parse(body);

            let image = js.response.body.items.item;

            if (!Array.isArray(image)) {
                image = new Array(image);
            }

            if (image[0] != undefined) {
                return res.redirect("https://www.forest.go.kr/images/data/down/mountain/" + image[imgNum].imgfilename);
            }
            else {
                return res.redirect("../../images/noimage.png");
            }
        }
        )}
        
    )
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
