"use strict";
import $ from "jquery";
import api from "./api";
import STORE from "./store";

const generateBookmarkHeader = function () {
  return `
        <header class="title">
            <h1>Bookmark Keeper</h1>
            <p>A place to store your favorite websites!</p>
        </header>
        <div class="container">
            <div class="item">
                <section class="controls">
                    <button class="add-button js-add-button">Add</button>
            </div>
                    <div class="filter item">
                        <label for="star-rating-filter">Filter by:</label>
                        <select name="star-rating" id="star-rating">
                          <option value="0">minimum rating</option>
                          <option value="5">5</option> 
                          <option value="4">4</option> 
                          <option value="3">3</option> 
                          <option value="2">2</option> 
                          <option value="1">see all</option>
                        </select>
                    </div>
                </section>
                <ul class="bookmark-container">

                </ul>
        </div>`;
};

const generateStarRating = function (bookmark) {
  let rating;
  let checkedRating = bookmark.rating;
  let uncheckedRating = 5 - rating;
  const checkedStarsHtml = `<span class ="fa fa-star checked"></span>`;
  const uncheckedStarsHtml = `<span class="fa fa-star"></span>`;

  rating =
    checkedStarsHtml.repeat(checkedRating) +
    uncheckedStarsHtml.repeat(uncheckedRating);

  return rating;
};

const generateBookMarkHtml = function (bookmark) {
  let bookmarkRating = generateStarRating(bookmark);
  return `
    <li class="js-bookmark-list-element" id="${bookmark.id}">
            <div class="bookmark-info">
              <p class="bookmark-name">${bookmark.title}</p>
              <div class="listing-rating-info">
                <p>Rating:</p>
                <p class="rating-total">${
                  bookmark.rating === null ? "No rating yet" : bookmarkRating
                }</p>
              </div>
              <div class="bookmark-listing-options">
                <button class="view-bookmark-details">
                  ...
                </button>
              </div>
            </div>
            <div class="bookmark-details"></div>
          </li>
    `;
};

const generateDetailedBookmarkHtml = function (bookmark) {
  let bookmarkRating = generateStarRating(bookmark);
  return `<li class="js-bookmark-list-element" id="${bookmark.id}">
        <div class="bookmark-info">
            <p class="bookmark-name">${bookmark.title}</p>
      
        <div class="bookmark-listing-options">
            <button class="view-bookmark-details">
                ...
            </button>
        </div>
        </div>
         <div class="bookmark-details">
            <div class="bookmark-details-header">
                <button class="visit-site-url"><a href="${
                  bookmark.url
                }" target="_blank">Visit Site</a></button>
            <div class="listing-rating-info">
                <p>Rating:</p>
                <p class="rating-total">${
                  bookmark.rating === null ? "No rating yet" : bookmarkRating
                }</p>
            </div>
                <button class="delete-bookmark">Delete</button>
            </div>
            <div class="bookmark-details-description">
            <p>
                ${
                  bookmark.desc === "" ? "No description listed" : bookmark.desc
                }
            </p>
            <button class="close">Close</button>
            </div>
        </div>
    </li>`;
};
//loop through bookmarks and display
const generateBookMarksHtml = function (bookmarks) {
  const bookmarkHtml = bookmarks.map((bookmark) => {
    if (bookmark.expanded === true) {
      return generateDetailedBookmarkHtml(bookmark);
    } else {
      return generateBookMarkHtml(bookmark);
    }
  });
  bookmarkHtml.join("");

  return bookmarkHtml;
};

const generateAddBookmark = function () {
  return `
    <div class="add-bookmark-container">
        <form class="add-bookmark">
            <fieldset role="group">
                <legend class="form">Bookmark Information</legend>
                <label class="form" for="title">Title:</label><br>
                <input type="text" id="title" name="title" required><br>
                <label class="form" for="url">Url:</label><br>
                <input type="text" id="url" name="url" placeholder="please include https or http" required><br>
                <div class="bookmark-hide" role="groupradio" aria-labelledby="rating">
                    <label class="form" id="rating">Rating:</label><br>
                    <label class="bookmark-hide" for="rating5"></label>
                        <input type="radio" name="rating" id="rating5" value="5" checked>5 stars
                    <label class="bookmark-hide" for="rating4"></label>
                        <input type="radio" name="rating" id="rating4" value="4" checked>4 stars
                    <label class="bookmark-hide" for="rating3"></label>
                        <input type="radio" name="rating" id="rating3" value="3" checked>3 stars
                    <label class="bookmark-hide" for="rating2"></label>
                        <input type="radio" name="rating" id="rating2" value="2" checked>2 stars
                    <label class="bookmark-hide" for="rating1"></label>
                        <input type="radio" name="rating" id="rating1" value="1" checked>1 stars<br>
                </div>
                <label class="form">Description:<br>
                    <textarea name="desc" id="bookmark-description" cols="100" rows="10" ></textarea>
                </lable><br>

                <div class="actions">
                    <input type="submit" value="Submit">
                    <input type="reset" value="Reset">
                    <input type="button" value="Cancel" class="js-cancel-button">
                </div>
            </fieldset>
        </form>
    </div>
    `;
};

const generateError = function (errorMessage) {
  return `
    <!-- ERROR DISPLAY -->
    <div class="error-container js-error-container">
      <button id="cancel-error">X</button>
      <h2>ERROR!</h2>
      <p>${errorMessage}</p>
    </div>
    `;
};

const renderButtonClose = function () {
  $(".js-error-container").remove();
};

// if there is an error, render error container
const renderError = function () {
  if (STORE.error) {
    if (STORE.adding) {
      const errorMessage = generateError(STORE.error);
      $(".container").after(errorMessage);
    } else if (!STORE.adding) {
      const errorMessage = generateError(STORE.error);
      $(".controls").after(errorMessage);
    }
  } else {
    $(".js-error-container").empty();
  }
};

const handleBookmarkDelete = function () {
  $(".delete-bookmark").on("click", (e) => {
    let id = $(e.target).closest("li").attr("id");
    // console.log(id);
    api
      .deleteBookmark(id)
      .then(() => {
        STORE.deleteBookmark(id);
        render();
      })
      .catch((e) => {
        STORE.setError(e.message);
        renderError();
      });
  });
};

const handleAddButton = function () {
  $(".main").on("click", ".js-add-button", (e) => {
    if (!STORE.adding) {
      STORE.adding = true;
    }
    render();
  });
};

const serializeJson = function (form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => (o[name] = val));
  return JSON.stringify(o);
};

const handleBookmarkSubmit = function () {
  $(".add-bookmark").submit((event) => {
    event.preventDefault();
    console.log("submit button clicked;");

    let formElement = $(".add-bookmark")[0];
    let jsonObj = serializeJson(formElement);
    console.log(jsonObj);

    api
      .createBookmark(jsonObj)
      .then((newBookMark) => {
        STORE.addBookmark(newBookMark);
        render();
      })
      .catch((e) => {
        STORE.setError(e.message);
        renderError();
      });
    render();
  });
};

const handleCancelClick = function () {
  $(".js-cancel-button").on("click", function () {
    STORE.setAdding(false);
    render();
  });
};

const handleExpandBookmark = function () {
  $("main").on("click", ".view-bookmark-details", function (event) {
    let targetId = $(event.target).closest("li").attr("id");
    STORE.findAndUpdate(targetId, { expanded: true });
    render();
  });
};

const handleBookmarkDetailsClose = () => {
  $("main").on("click", ".close", function (event) {
    let targetId = $(event.target).closest("li").attr("id");
    STORE.findAndUpdate(targetId, { expanded: false });
    render();
  });
};

const handleErrorClose = function(){
    $('.flex-container').on('click', '#cancel-error', () => {
        renderButtonClose();
        STORE.setError(null);
      });
}

const handleBookmarkFilter = function () {
  $("#star-rating").change(() => {
    let filterParam = $("#star-rating").val();
    STORE.filterBookmarks(filterParam);
    render();
  });
};

const render = function () {
  $("main").html(generateBookmarkHeader());
  let html = "";
  if (STORE.adding) {
    html = generateAddBookmark;
  } else if (STORE.filter) {
    let filteredBookmarks = [...STORE.filteredBookmarks];
    html = generateBookMarksHtml(filteredBookmarks);    
  } else {
    html = generateBookMarksHtml(STORE.bookmarks);
  }

  $(".bookmark-container").html(html);
  renderError();
  bindEventListeners();
};

const bindEventListeners = function () {
  handleAddButton();
  handleBookmarkFilter();
  handleExpandBookmark();
  handleCancelClick();
  handleBookmarkSubmit();
  handleBookmarkDetailsClose();
  handleBookmarkDelete();
  handleErrorClose();
};

export default {
  bindEventListeners,
  render,
};
