const appDao = {
    welcomeData: welcome
};

function welcome(req) {
    return new Promise((resolve,reject)=>{
        resolve('Welcome to nodejs application!!!');
        // reject('Problem with dependencies!!!');
    });
}

module.exports = appDao;                                             //exporting functions to available for other layer