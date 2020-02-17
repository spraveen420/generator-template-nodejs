const  appController = {
    welcomeData: welcome
};

const appService = require('../appService/appService');              //requiring functions in service layer

function welcome(req,res) {
    appService.welcomeData(req)
    .then((data) => {
        res.send(data);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}

module.exports = appController;                                      //exporting functions to available for other layer