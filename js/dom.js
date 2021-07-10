const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const INPUT_FORM_BOOK = "input_section"; 
const EDIT_FORM_BOOK = "edit_section"; 
const BOOK_ITEMID = "itemId";

function addTodo() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID );
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const nameBook = document.getElementById("inputBookTitle").value;
    const authorBook = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;
    console.log("name" + nameBook);
    console.log("author" + authorBook);
    console.log("year" + yearBook);
    console.log("iscompleted?" + isCompleted);

    const book = makeBook(nameBook, authorBook, yearBook, isCompleted);

    const bookObject = composeBookObject(nameBook, authorBook, yearBook, isCompleted);
  
   book[BOOK_ITEMID] = bookObject.id;
   books.push(bookObject);
 
   if(isCompleted){
    listCompleted.append(book);
   }else{
    uncompletedBOOKList.append(book);
}

   updateDataToStorage();
}

function makeBook(nameBook, authorBook, yearBook, isCompleted) {
 
    const bookTitle = document.createElement("h3");
    bookTitle.setAttribute('id','book_title')
    bookTitle.innerText = nameBook;
 
    const bookAuthor = document.createElement("p");

    bookAuthor.innerHTML = "Penulis: "+"<span id=\"book_author\">"+authorBook+"</span>";

    const bookYear = document.createElement("p");

    bookYear.innerHTML = "hah: "+"<span id=\"book_year\">"+yearBook+"</span>";
 
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("action")
 
    const container = document.createElement("article");
    container.classList.add("book_item")
 
    if(isCompleted){
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
    container.append(bookTitle, bookAuthor, bookYear, btnContainer);

    return container;
}
function addBookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector('#book_title').innerText;
    const bookAuthor = bookElement.querySelector('#book_author').innerText;
    const bookYear = bookElement.querySelector('#book_year').innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    
    listCompleted.append(newBook);

    bookElement.remove();
    updateDataToStorage();
} 
function addBookToUncompleted(bookElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector('#book_title').innerText;
    const bookAuthor = bookElement.querySelector('#book_author').innerText;
    const bookYear = bookElement.querySelector('#book_year').innerText;
 
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
 
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
    
    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();

    updateDataToStorage();
}
function editBookData(bookElement) {
    const inputFormField = document.getElementsByClassName(INPUT_FORM_BOOK )[0];
    const editFormField = document.getElementsByClassName(EDIT_FORM_BOOK)[0];

    // const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    
    // const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    
    const book = findBook(bookElement[BOOK_ITEMID]);
    // book.isCompleted = true;
    // newBook[BOOK_ITEMID] = book.id;
    fillForm(book.nameBook, book.authorBook, book.yearBook, book.isCompleted)

    // listCompleted.append(newBook);
    inputFormField.style.display = "none";
    editFormField.style.display = "flex";

    window.scrollTo(0,0)
    // bookElement.remove();
    // updateDataToStorage();
}

function fillForm(nameBook, authorBook, yearBook, isCompleted) {
    document.getElementById("editBookTitle").value = "";
    document.getElementById("editBookAuthor").value = "";
    document.getElementById("editBookYear").value = "";
    document.getElementById("editBookIsComplete").checked = false;


    const nameBookField = document.getElementById("editBookTitle");
    const authorBookField = document.getElementById("editBookAuthor");
    const yearBookField = document.getElementById("editBookYear");
    const isCompletedField = document.getElementById("editBookIsComplete");

    nameBookField.value = nameBook;
    authorBookField.value = authorBook;
    yearBookField.value = yearBook;
    isCompletedField.checked = isCompleted;


}

function cencelEditBook() {
    const inputFormField = document.getElementsByClassName(INPUT_FORM_BOOK )[0];
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

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}
function createReadButton() {
    return createButton("read-button", function(event){
         addBookToCompleted(event.target.parentElement.parentElement);
    });
}
function createUnreadButton() {
    return createButton("unread-button", function(event){
         addBookToUncompleted(event.target.parentElement.parentElement);
    });
}
function createTrashButton() {
    return createButton("delete-button", function(event){
        removeBookFromCompleted(event.target.parentElement.parentElement);
    });
}
function createEditButton() {
    return createButton("edit-button", function(event){
        editBookData(event.target.parentElement.parentElement);
    });
}
function findBookName() {
    const bookList = document.querySelectorAll('#book_title')
    const keyword = document.querySelector('#searchBookTitle').value
    console.log("woy");
    for (const item of bookList) {
        const nameBook = item.innerHTML
        if (nameBook.includes(keyword) ) {
            item.parentNode.style.display = "block";
            console.log("yes");
        }else{
            console.log("no");
            item.parentNode.style.display = "none";
            console.log(item.parentNode);
        }
    }
    
}