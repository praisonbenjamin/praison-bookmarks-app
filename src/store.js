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
  console.log("are we expanding?");
  let selectedItem = findById(id);
  console.log("was the id found?", findById(id));
  selectedItem.expanded = !selectedItem.expanded;
  console.log("are we expanded", selectedItem.expanded);
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
