const appService = {
    welcomeData: welcome
};

const appDao = require('../appDao/appDao');                          //requiring functions in dao layer

function welcome(req) {
    return new Promise((resolve, reject)=>{
        appDao.welcomeData(req)
        .then((data) => {
            resolve(data)
        })
        .catch((err) => {
            reject(err);
        })
    });
}

module.exports = appService;                                         //exporting functions to available for other layer