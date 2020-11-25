const BASE_URL = 'https://thinkful-list-api.herokuapp.com/praisonbenjamin';


const listApiFetch = function(...args) {
    let error;
    return fetch(..args)
        .then(res => {
            if (!res.ok) {
                //valid http response but not a 2xx error
                // create error
                error = {
                    code: res.status
                };
            }
            // either way parse json

            return res.json();
        })
        .then(data=> {
            // if error flagged, reject promise with error object
            if (error){
                error.message = data.message;
                return Promise.reject(error);
            }
            // otherwise return data as promise
            return data;
        });
}

const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`)
};


const createBookmarks = function(object) {
    const newBookmark = object;
    
    return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
};

const deleteBookmarks = function (objId) {
    retun listApiFetch(`${BASE_URL}/bookmarks/${objId}`, {
        method: 'DELETE'
 });
}

export default {
    getBookmarks,
    createBookmarks,
    deleteBookmarks
}