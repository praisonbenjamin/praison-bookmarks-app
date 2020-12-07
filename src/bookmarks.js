import $ from "jquery";
import api from "./api";
import STORE from "./store";
import html from "./html";

$.fn.extend({
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const output = {};
    formData.forEach((val, name) => (output[name] = val));
    return JSON.stringify(output);
  },
});

const generateError = function (message) {
  return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

const renderError = function () {
  if (STORE.store.error) {
    const el = generateError(STORE.store.error);
    $(".error-area").html(el);
  } else {
    $(".error-area").empty();
  }
  handleCloseError();
};

const handleCloseError = function () {
  $(".error-area").on("click", "#cancel-error", () => {
    STORE.setError(null);
    renderError();
  });
};



const handleAddNew = function () {
  $(".new-button").click((event) => {
    STORE.store.adding = true;
    render();
  });
};

const handleSubmitNew = function () {
  $(".form-add").on("click", ".submit-form", (event) => {
    event.preventDefault();
    const newBookmark = $(".form-add").serializeJson();
    api
      .createBookmark(newBookmark)
      .then((newData) => {
        STORE.addBookmark(newData);
        STORE.store.adding = false;
        render();
      })
      .catch((error) => {
        STORE.setError(error.message);
        renderError();
      });
  });
};

const handleSubmitCancel = function () {
  $(".cancel-button").click((event) => {
    STORE.store.adding = false;
    render();
  });
};

const getIdFromElement = function (item) {
  return $(item).closest(".collapsible").data("bookmark-id");
};

const getIdToDelete = function (item) {
  return $(item).closest(".delete-button").data("bookmark-id");
};

const handlePanelExpand = function () {
  $(".collapsible").click((event) => {
    const id = getIdFromElement(event.currentTarget);
    STORE.expandThis(id);
    render();
  });
};

const handleFilter = function () {
  $(".filter").change((event) => {
    let filter = $(".filter").val();
    STORE.store.filter = filter;
    render();
  });
};

const handleDeleteBookmark = function () {
  $(".delete-button").click((event) => {
    const id = getIdToDelete(event.currentTarget);
    api
      .deleteBookmark(id)
      .then(() => {
        STORE.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        STORE.setError(error.message);
        renderError();
      });
  });
};

const render = function () {
  const renderBookmark = [...STORE.store.bookmarks];
  if (STORE.store.adding === false) {
    $("main").html(html.generateHtml(renderBookmark));
    renderError();
    handleAddNew();
    handlePanelExpand();
    handleFilter();
    handleDeleteBookmark();
  } else {
    $("main").html(html.addBookmark());
    handleSubmitNew();
    handleSubmitCancel();
    renderError();
  }
};

export default {
  render
};
