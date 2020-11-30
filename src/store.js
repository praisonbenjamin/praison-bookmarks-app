let bookmarks = [];
let adding = false;
let error = null;
let filter = false;
let filteredBookmarks = [];

const addBookmark = function (bookmark) {
  // adds expand locally
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i]) {
      bookmarks[i].expand = false;
    }
  }
  // adds bookmark to store
  bookmarks.push(bookmark);
  // toggles adding state
  this.adding = false;
};

const expandBookmark = function (id) {
  //find id to expand
  let expandedBookmark = bookmarks.find(bookmark => bookmark.id === id);
  //toggle expand value
  if (expandedBookmark.expand) {
    expandedBookmark.expand = false;
  } else {
    expandedBookmark.expand = true;
  }
};

const deleteBookmark = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  }


//toggle adding state in store
const setAdding = function (param) {
  this.adding = param;
}

const findById = (id) => {
    //   console.log(`id is ${id}`);
    //   console.log(items);
    let targetBookmark = bookmarks.find((item) => item.id === id);
    // console.log(targetBookmark);
    return targetBookmark;
  };
  
  const findAndUpdate = function (id, object) {
    // console.log('finding');
  
    let target = findById(id);
  
    Object.assign(target, object);
  };
  
  const findAndDelete = (id) => {
    let itemToDelete = findById(id);
    let index = bookmarks.indexOf(itemToDelete);
  
    bookmarks.splice(index, 1);
  };
  

//filters bookmarks in store
const filterBookmarks = function (filterNumber) {
  this.filter = true;
  this.filteredBookmarks = [];
  this.bookmarks.forEach(bookmark => {
    if (bookmark.rating >= filterNumber) {
      this.filteredBookmarks.push(bookmark);
    }

  })
}

//toggle filter state in store
const setFiltering = function (param) {
  this.filter = param;
}

//sets error
const setError = function(errorMessage){
  this.error = errorMessage;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  expandBookmark,
  setAdding,
  setFiltering,
  setError,
  filterBookmarks,
  filteredBookmarks,
  findById,
  findAndUpdate,
  deleteBookmark,
}