const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0,
};

const findById = function (id) {
  return store.bookmarks.find((currentItem) => currentItem.id === id);
};

const expandThis = function (id) {
  let selectedItem = findById(id);
  selectedItem.expanded = !selectedItem.expanded;
};

const addBookmark = function (item) {
  this.store.bookmarks.push(item);
};

const findAndDelete = function (id) {
  store.bookmarks = store.bookmarks.filter(
    (currentItem) => currentItem.id !== id
  );
};

const setError = function (error) {
  this.store.error = error;
};

export default {
  store,
  findById,
  expandThis,
  addBookmark,
  findAndDelete,
  setError,
};
