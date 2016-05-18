/**
 * Created by yoavganbar on 31/01/2016.
 */

window.yogi = (function () {

    function ajaxPromise(type, url, headers, content) {
        var DEFAULT_HEADERS = {
            'Content-Type': 'application/json',
        };
        headers = headers || DEFAULT_HEADERS;
        content = content || null;
        var p = new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url);

            Object.keys(headers).forEach(function (key) {
                xhr.setRequestHeader(key, headers[key])
            });

            xhr.onreadystatechange = function () {

                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        resolve(xhr.responseText);
                    } else {
                        // An error occurred during the request.
                        reject(xhr.status);
                    }
                }
            };
            xhr.send(content);
        });

        return p;
    }

    function containsTerm(obj, searchTerm) {
        for (var key in obj) {
            if (obj[key].toLowerCase().indexOf(searchTerm) > -1) {
                return true;
            }
        }
    }

    function searchArray(arr, searchTerm) {
        return arr.filter(function (row) {
            return containsTerm(row, searchTerm)
        });
    }

    function searchObject(obj, searchTerm) {
        return Object.keys(obj).reduce(function (resultObj, key) {
            var arr = obj[key];
            if (containsTerm(arr, searchTerm)) {
                resultObj[key] = obj[key];
            }
            return resultObj;
        }, {});
    }

    function searchData(sourceData, searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        if (Array.isArray(sourceData)) {
            return searchArray(sourceData, searchTerm);
        } else {
            return searchObject(sourceData, searchTerm);
        }
    }

    function shuffle (arr) {
        // Your code here
        var dups = [];
        var numLen=arr.length;
        for (var i=0;i<numLen;i++){
            var pos = Math.floor(Math.random()*numLen);
            dups.splice(pos,0,arr[i]);
        }
        return dups;
    }

    return {
        ajaxPromise: ajaxPromise,
        searchData: searchData,
        shuffle: shuffle
    };
})();
