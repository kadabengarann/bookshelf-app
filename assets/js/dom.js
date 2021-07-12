const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const INPUT_FORM_BOOK = "input_section";
const EDIT_FORM_BOOK = "edit_section";
const BOOK_ITEMID = "itemId";

function fillUserData() {
  const user_name = document.getElementById("user_name");
  const incompleted_books = document.getElementById("incompleted_books");
  const completed_books = document.getElementById("completed_books");
  

  user_name.innerText = user.name
  incompleted_books.innerText = user.incompletedBooks
  completed_books.innerText = user.completedBooks

}

function addTodo() {
  const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  const nameBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(nameBook, authorBook, yearBook, isCompleted);

  const bookObject = composeBookObject(
    nameBook,
    authorBook,
    yearBook,
    isCompleted
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (isCompleted) {
    listCompleted.append(book);
    user.completedBooks++
  } else {
    uncompletedBOOKList.append(book);
    user.incompletedBooks++
  }

  updateDataToStorage();
  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;

  emptyCheck()
}

function makeBook(nameBook, authorBook, yearBook, isCompleted) {
  const bookPhoto = document.createElement("div");
  bookPhoto.classList.add("poto");
  bookPhoto.innerHTML = "<img src=\"./assets/img/book.jpg\">";

  const bookDetail = document.createElement("div");
  bookDetail.classList.add("book_detail");
  bookDetail.innerHTML =
  "<h3 id=\"book_title\">"+nameBook+"</h3><hr>"+
  "<p>By: <span id=\"book_author\">"+authorBook+"</span></p>"+
  "<p id=\"book_year\">"+yearBook+"</p>";

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("action");

  const container = document.createElement("article");
  container.classList.add("book_item");

  if (isCompleted) {
    btnContainer.append(
      createUnreadButton(),
      createEditButton(),
      createTrashButton()
    );
  } else {
    btnContainer.append(
      createReadButton(),
      createEditButton(),
      createTrashButton()
    );
  }
  bookDetail.append(btnContainer)
  container.append(bookPhoto, bookDetail);

  return container;
}
function addBookToCompleted(bookElement) {
  const bookTitle = bookElement.querySelector("#book_title").innerText;
  const bookAuthor = bookElement.querySelector("#book_author").innerText;
  const bookYear = bookElement.querySelector("#book_year").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);

  const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  listCompleted.append(newBook);

  bookElement.remove();
  user.completedBooks++
  user.incompletedBooks--

  updateDataToStorage();
  emptyCheck()
}
function addBookToUncompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
  const bookTitle = bookElement.querySelector("#book_title").innerText;
  const bookAuthor = bookElement.querySelector("#book_author").innerText;
  const bookYear = bookElement.querySelector("#book_year").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();

  user.completedBooks--
  user.incompletedBooks++

  updateDataToStorage();
  emptyCheck()

}

function removeBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  const book = findBook(bookElement[BOOK_ITEMID]);

  books.splice(bookPosition, 1);

  bookElement.remove();

  if (book.isCompleted==true) {
    user.completedBooks--

  } else {
    user.incompletedBooks--

  }

  updateDataToStorage();
  emptyCheck()

  makeMessage("Deleted a Book", "alert-danger");
}
function editBookData(bookElement) {
  const book = findBook(bookElement[BOOK_ITEMID]);
  fillForm(
    book.id,
    book.nameBook,
    book.authorBook,
    book.yearBook,
    book.isCompleted
  );
  openEditForm()
}

function fillForm(id, nameBook, authorBook, yearBook, isCompleted) {
  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;

  const idBookField = document.getElementById("editBookId");
  const nameBookField = document.getElementById("editBookTitle");
  const authorBookField = document.getElementById("editBookAuthor");
  const yearBookField = document.getElementById("editBookYear");
  const isCompletedField = document.getElementById("editBookIsComplete");

  idBookField.value = id;
  nameBookField.value = nameBook;
  authorBookField.value = authorBook;
  yearBookField.value = yearBook;
  isCompletedField.checked = isCompleted;
}

function updateBookData() {
  const idBookField = document.getElementById("editBookId").value;
  const nameBookField = document.getElementById("editBookTitle").value;
  const authorBookField = document.getElementById("editBookAuthor").value;
  const yearBookField = document.getElementById("editBookYear").value;
  const isCompletedField =document.getElementById("editBookIsComplete").checked;

  const book = findBook(parseInt(idBookField));

  book.nameBook = nameBookField;
  book.authorBook = authorBookField;
  book.yearBook = yearBookField;
  book.isCompleted = isCompletedField;

  let bookCount = countBook()
  user.completedBooks = bookCount[1]
  user.incompletedBooks = bookCount[0]

  updateDataToStorage();
  clearAllData();

  refreshDataFromBooks();
  cencelEditBook();
  emptyCheck()
  makeMessage("Edited a Book Data!", "alert-success");
}

function cencelEditBook() {
  const inputFormField = document.getElementsByClassName(INPUT_FORM_BOOK)[0];
  const editFormField = document.getElementsByClassName(EDIT_FORM_BOOK)[0];

  const nameBookField = document.getElementById("editBookTitle");
  const authorBookField = document.getElementById("editBookAuthor");
  const yearBookField = document.getElementById("editBookYear");
  const isCompletedField = document.getElementById("editBookIsComplete");

  nameBookField.value = "";
  authorBookField.value = "";
  yearBookField.value = "";
  isCompletedField.checked = false;

  inputFormField.style.display = "flex";
  editFormField.style.display = "none";
}

function createButton(clas, class1, class2, eventListener) {
  const button = document.createElement("div");
  button.classList.add(clas);
  button.className += class1+class2
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}
function createReadButton() {
  return createButton("read-button"," btn"," btn-success", function (event) {
    addBookToCompleted(event.target.parentNode.parentNode.parentNode);
  });
}
function createUnreadButton() {
  return createButton("unread-button"," btn"," btn-primary", function (event) {
    addBookToUncompleted(event.target.parentNode.parentNode.parentNode);
  });
}
function createTrashButton() {
  return createButton("delete-button"," btn"," btn-danger", function (event) {
    if (confirm("Delete this book?")) {
    removeBookFromCompleted(event.target.parentNode.parentNode.parentNode);
    }
  });
}
function createEditButton() {
  return createButton("edit-button"," btn"," btn-info", function (event) {
    editBookData(event.target.parentNode.parentNode.parentNode);
  });
}
function findBookName() {
  const bookList = document.querySelectorAll("#book_title");
  const keyword = document.querySelector("#searchBookTitle").value.toLowerCase();
  for (const item of bookList) {
    const nameBook = item.innerText.toLowerCase();
    if (nameBook.includes(keyword)) {
      item.parentNode.parentNode.style.display = "flex";
    } else {
      item.parentNode.parentNode.style.display = "none";
    }
  }
  emptyCheck()
}

function makeMessage(message, type) {
  const check = document.querySelector(".message");
  if (check) {
    check.remove();
  }
  const msg = document.createElement("div");
  msg.classList.add("alert", type);
  msg.innerHTML = message;

  const messageContainer = document.querySelector(".message_container");

  messageContainer.append(msg);

  messageContainer.style.display = "block"

  setTimeout(function () {
    messageContainer.style.display = "none"
    msg.remove()
  }, 2001);
}


function openInputForm() {
  const overlay = document.querySelector('.form_container');
  const inputForm = document.querySelector('.input_section');

  overlay.style.display = "flex";
  inputForm.style.display = "flex";
  
}

function changeSubmitText() {
  let checkBox = document.getElementById("inputBookIsComplete");
  let text = document.getElementById('chng')
  if (checkBox.checked == true){
    text.innerText ="Completed Books"
  } else {
    text.innerText ="Incompleted Books"
  }
}

function openEditForm() {
  const overlay = document.querySelector('.form_container');
  const editForm = document.querySelector('.edit_section');

  overlay.style.display = "flex";
  editForm.style.display = "flex";
  
}
function openSetting() {
  const overlay = document.querySelector('.form_container');
  const settingSec = document.querySelector('.setting_section');

  overlay.style.display = "flex";
  settingSec.style.display = "flex";
  
}
function closeForm() {
  const overlay = document.querySelector('.form_container');
  const inputForm = document.querySelector('.input_section');
  const editForm = document.querySelector('.edit_section');
  const settingSec = document.querySelector('.setting_section');


  overlay.style.display = "none";
  inputForm.style.display = "none";
  editForm.style.display = "none";
  settingSec.style.display = "none";

  document.querySelector('#chng').innerHTML = "Incomplete Books"
}

function toggleNav() {
  const sideNav = document.querySelector('.sidebar');
  const burgerBtn = document.querySelector('.burger-btn');

  sideNav.classList.toggle('active');
  burgerBtn.classList.toggle('active');
}
function forceHideNav() {
  const sideNav = document.querySelector('.sidebar');
  const burgerBtn = document.querySelector('.burger-btn');

  sideNav.classList.remove('active');
  burgerBtn.classList.remove('active');

}