import $ from "jquery";
import bookmarks from "./bookmarks";
import STORE from "./store";

const generateHtml = function (htmlList) {
  let listHtml = htmlList.map((array) => generateUi(array));
  return `<div class='title'>
    <h1>Bookmarks keeper</h1>
    </div>
    <div id="buttons" class="buttons">
    <div class="for-new-button">
        <button id="new-button" class="new-button">Add New</button>
    </div>
    <label for="filter">Filter by:</label>
    <select name="filter" id="filter" class="filter">
    <option value="0" ${
        STORE.store.filter === "0" ? "selected" : ""
    }>Filter By Rating</option> 
    <option value="0" ${
        STORE.store.filter === "0" ? "selected" : ""
    }>Show All</option>
    <option value="2" ${
        STORE.store.filter === "2" ? "selected" : ""
    }>2+</option>
    <option value="3" ${
        STORE.store.filter === "3" ? "selected" : ""
    }>3+</option>
    <option value="4" ${
        STORE.store.filter === "4" ? "selected" : ""
    }>4+</option>
    <option value="5" ${
        STORE.store.filter === "5" ? "selected" : ""
    }>5</option>
    </select>
</div>
<div class="main-display" id="main-display">
${listHtml.join("")}
</div>`;
};

function addBookmark() {
    return `<div class="add-bookmark">
    <div class='title'>
      <h1>Bookmarks keeper</h1>
      </div>
      <form class="form-add">
       <fieldset name='add-bookmark'>
          <legend>Add new bookmark</legend>
          <div class="url-input">
          <label for="enter-link">Entel url:</label><br>
              <input type="text" name="url" id="enter-link" placeholder="use https or http"required>
          </div> <div class="inner-box">
                  <div class="name-input">
                  <label for="enter-title">Entel title:</label><br>
                  <input type="text" name="title" id="enter-title" placeholder="Enter title here" required>
                  </div>
                  <div class="stars">
                      <input class="star star-5" id="star-5" type="radio" name="rating" value="5" required />
                      <label class="star star-5" for="star-5">5 stars</label>
                      <input class="star star-4" id="star-4" type="radio" name="rating" value="4" required />
                      <label class="star star-4" for="star-4">4 stars</label>
                      <input class="star star-3" id="star-3" type="radio" name="rating" value="3" required />
                      <label class="star star-3" for="star-3">3 stars</label>
                      <input class="star star-2" id="star-2" type="radio" name="rating" value="2" required />
                      <label class="star star-2" for="star-2">2 stars</label>
                      <input class="star star-1" id="star-1" type="radio" name="rating" value="1" required />
                      <label class="star star-1" for="star-1">1 star</label>
                  </div>
                  <div class="description-area">
                  <label for="input-description">Enter description:</label><br>
                      <textarea name="desc" id="input-description" placeholder="Description (optional)"></textarea>
                  </div>
              </div>
              <div class="form-buttons">
              <button class="cancel-button" value="Cancel" default>Cancel</button>
              <button type="submit" class="submit-form" value="Submit">Submit</button>
              <button type="reset" class="reset-form" value="Reset">Reset</button>
              </div>
          </label>
       </fieldset>
      </form>
  </div>`;
  }

const generateUi = function (array) {
  if (array.rating >= STORE.store.filter) {
    if (array.expanded === true) {
      return panelView(array);
    } else {
      return defaultView(array);
    }
  }
};

const defaultView = function (array) {
  let displayRating;
  let starClicked = array.rating;
  const starHTML = `<span class="fa fa-star checked"></span>`;
  displayRating = starHTML.repeat(starClicked);
  return `<li>
            <div class="content">
                <div class="button-text" id="button-text">${array.title}</div>
                <div class="etoiles">
                    ${displayRating}
                </div>
                <button type="button" class="collapsible" id="bookmark-content" data-bookmark-id="${array.id}">...
                </button> 
            </div>
            `;
};

const panelView = function (array) {
  let displayRating;
  let starClicked = array.rating;
  const starHTML = `<span class="fa fa-star checked"></span>`;
  displayRating = starHTML.repeat(starClicked);
  return `<li class='bookmark-details'>
    <div class="content">
        <div class="button-text" id="button-text">
        ${array.title}</div>
        <div class="rating">
            ${displayRating}
        </div>
    <button type="button" class="collapsible" id="bookmark-content" data-bookmark-id="${array.id}">...
    </button> 
    </div>
    <div class="panel">
    <div class="drop-down-button">
    <a href='${array.url}' alt = 'open bookmark link' target='_blank'>Visit Site</a>
    <button class="delete-button" id="delete-button" data-bookmark-id=${array.id}> Delete</button>
    </div>
    <p id='drop-down-text'>
        ${array.desc}           
    </p>
    </li>
</div>`;
};



export default {
  generateHtml,
  addBookmark,
};
