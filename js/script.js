document.addEventListener("DOMContentLoaded", function () {
 
    const submitForm = document.getElementById("inputBook");
 
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });
    if(isStorageExist()){
        loadDataFromStorage();
    }

    const searchForm = document.getElementById("searchBook");
    searchForm.addEventListener("submit", function (event) {
        console.log("hai");
        event.preventDefault();
        findBookName();
    });

    const revoveAllBtn = document.getElementById("remove-all");
    revoveAllBtn.addEventListener("click", function () {
        deleteAll();
        alert("Removed All Data!")
    });
    const revoveAllCompleteBtn = document.getElementById("remove-all-complete");
    revoveAllCompleteBtn.addEventListener("click", function () {
        deleteAllComplete();
    });
    const revoveAllIncompleteBtn = document.getElementById("remove-all-incomplete");
    revoveAllIncompleteBtn.addEventListener("click", function () {
        deleteAllIncomplete();
    });

    const cancelEditBtn = document.getElementById("cancelEdit");
    cancelEditBtn.addEventListener("click", function () {
        cencelEditBook();
    });
});
document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
 });
 document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
 });