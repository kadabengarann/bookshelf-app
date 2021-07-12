const STORAGE_KEY = "BOOK_SHELF_APPS";
const USER_STORAGE_KEY = "USER_BOOK_SHELF_APPS";

let books = [];
let user = {
  name: "",
  completedBooks: 0,
  incompletedBooks: 0
};

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kao tak mendukung local storage");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));

  saveUserData()
}
function loadUserData() {
  const serializedData = localStorage.getItem(USER_STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) user = data;
}
function saveUserData() {
  if (user.completedBooks < 0) {
    user.completedBooks = 0
  }
  if (user.incompletedBooks < 0) {
    user.incompletedBooks = 0
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));

}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(nameBook, authorBook, yearBook, isCompleted) {
  return {
    id: +new Date(),
    nameBook,
    authorBook,
    yearBook,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(todoId) {
  let index = 0;
  for (book of books) {
    if (book.id === todoId) return index;

    index++;
  }
  return -1;
}
function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(
      book.nameBook,
      book.authorBook,
      book.yearBook,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listUncompleted.append(newBook);
    }
  }
  emptyCheck()
  fillUserData()

}
function clearAllData() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const UncompletedItems = listUncompleted.querySelectorAll(".book_item");

  if (UncompletedItems) {
    for (const item of UncompletedItems) {
      item.remove();
    }
  }

  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const CompletedItems = listCompleted.querySelectorAll(".book_item");
  if (CompletedItems) {
    for (const item of CompletedItems) {
      item.remove();
    }
  }
}

function deleteAllComplete() {
  let listLength = 0;

  for (let i = books.length - 1; i >= 0; i--) {
    if (books[i].isCompleted === true) {
      books.splice(i, 1);
      listLength++
    }
  }

  if (listLength > 0) {
    user.completedBooks = 0
    updateDataToStorage();
    clearAllData();

    refreshDataFromBooks();
    makeMessage("Deleted All Completed Book", "alert-danger");
  }
}
function deleteAllIncomplete() {
  let listLength = 0;
  for (let i = books.length - 1; i >= 0; i--) {
    if (books[i].isCompleted === false) {
      books.splice(i, 1);
      listLength++;
    }
  }
  if (listLength > 0) {
    user.incompletedBooks = 0
    updateDataToStorage();
    clearAllData();

    refreshDataFromBooks();
    makeMessage("Deleted All Incompleted Book", "alert-danger");
  }
}
function deleteAll() {
  if (!(localStorage.getItem(STORAGE_KEY) == null ||localStorage.getItem(STORAGE_KEY) == "[]")) {
    clearAllData();
    localStorage.removeItem(STORAGE_KEY);

    user.completedBooks = 0
    user.incompletedBooks = 0
    
    saveUserData()
    fillUserData()
    makeMessage("Deleted All Book", "alert-danger");
  }
}
function deleteUserData() {
  if (!(localStorage.getItem(USER_STORAGE_KEY) == null)) {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
}

function emptyCheck() {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  emptyText(listUncompleted)
  emptyText(listCompleted)

}
function emptyText(element) {
  const emptyText = document.createElement("div");
  emptyText.classList.add("empty-text");
  emptyText.innerHTML = "<p>Empty Shelf</p>";

  if (element.querySelector('.book_item')) {
    if (element.querySelector('.empty-text')) {
      element.querySelector('.empty-text').remove()
    }
  } else {
    if (element.querySelector('.empty-text')) {
    }
    else {
      element.append(emptyText)
    }
  }
}
function countBook() {
  let count = [0, 0]
  for (let i = books.length - 1; i >= 0; i--) {
    if (books[i].isCompleted === true) {
      count[1]++
    } else {
      count[0]++
    }
  }
  return count;
}