  
import $ from 'jquery';

import './style.css';
import bookmarks from './bookmarks';
import api from './api';
import STORE from './store';




function main () {
    api.getBookmarks()
    .then((store) => {
      store.forEach((item) => STORE.addBookmark(item));
      bookmarks.render();
    });
bookmarks.render();
}

$(main);