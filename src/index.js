import $ from 'jquery';
import 'normalize.css';
import './style.css';
import STORE from './store.js';
import bookmarks from './bookmarks.js';
import api from './api';


const main = function () {
    api.getBookmarks()
      .then(res => res.json())
      .then(res => {
        res.forEach(bookmark => STORE.addBookmark(bookmark));
        bookmarks.render();
      });
    bookmarks.bindEventListeners();
  };
  
  $(main);