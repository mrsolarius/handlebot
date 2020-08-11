var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var get = function (url) {
    return new Promise(function (resolve,reject) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if(xhr.readyState ===4){
                if(xhr.status === 200){
                    resolve(xhr.responseText);
                } else{
                    reject(xhr);
                }
            }
        }

        xhr.open('GET',url,true);
        xhr.send();
    });
};

module.exports = get;