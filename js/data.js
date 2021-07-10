const STORAGE_KEY = "BOOK_SHELF_APPS";
 
let books = [];
 
function isStorageExist(){
   if(typeof(Storage) === undefined){
       alert("Browser kao tak mendukung local storage");
       return false
   }
   return true;
}
 
function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }
  
 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }
  
 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
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
    for(book of books){
        if(book.id === bookId)
            return book;
    }
    return null;
 }

 function findBookIndex(todoId) {
    let index = 0
    for (book of books) {
        if(book.id === todoId)
            return index;
  
        index++;
    }
    return -1;
 }
 function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
  
  
    for(book of books){
        const newBook = makeBook(book.nameBook, book.authorBook, book.yearBook, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;
  
  
        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
 }
 function clearAllData() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const UncompletedItems = listUncompleted.querySelectorAll(".book_item");

    if (UncompletedItems) {
        for (const item of UncompletedItems) {
            item.remove()
        }
    }

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const CompletedItems = listCompleted.querySelectorAll(".book_item");
    if (CompletedItems) {
    for (const item of CompletedItems) {
        item.remove()
    }
}
 }

 function deleteAllComplete() {
    for(let i=books.length-1; i >= 0 ; i--){
        if(books[i].isCompleted === true){
            console.log("yo");
            books.splice(i, 1);
        }
    }
    updateDataToStorage()
    clearAllData()

    refreshDataFromBooks()
 }
 function deleteAllIncomplete() {
    for(let i=books.length-1; i >= 0 ; i--){
        if(books[i].isCompleted === false){
            console.log("yo");
            books.splice(i, 1);
        }
    }
    updateDataToStorage()
    clearAllData()

    refreshDataFromBooks()
 }
 function deleteAll() {
     clearAllData()
    localStorage.removeItem(STORAGE_KEY);
 }