document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
    loadUserData();
  }

  const overlay = document.querySelector(".overlayStarting");
  if (user.name) {
    overlay.remove();
    fillUserData();
  } else {
    console.log("No User yet");
    const startForm = document.getElementById("inputNameForm");
    startForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addUser();
      fillUserData();
    });
  }

  document.getElementById("burger_btn").addEventListener("click", function () {
    console.log("nav open");
    toggleNav();
  });

  const addBtn = document.getElementById("add_btn");
  addBtn.addEventListener("click", function () {
    openInputForm();
  });

  document.querySelectorAll(".cancelForm").forEach((item) => {
    item.addEventListener("click", function (event) {
      console.log("canceled");
      closeForm();
    });
  });

  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
    closeForm();
  });

  const inputCheck = document.getElementById("inputBookIsComplete");
  inputCheck.addEventListener("click", function (event) {
    changeSubmitText();
  });

  const searchFormClick = document.getElementById("searchSubmit");
  searchFormClick.addEventListener("click", function (event) {
    event.preventDefault();
    findBookName();
  });
  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    findBookName();
  });

  const submitEdit = document.getElementById("editBook");
  submitEdit.addEventListener("submit", function (event) {
    event.preventDefault();
    updateBookData();
    closeForm();
  });

  const revoveUserBtn = document.getElementById("remove-all-data");
  revoveUserBtn.addEventListener("click", function () {
    if (confirm("Apakah anda ingin menghapus data user?")) {
      deleteUserData();
    }
  });

  const revoveAllBtn = document.getElementById("remove-all-book");
  revoveAllBtn.addEventListener("click", function () {
    if (confirm("Apakah anda ingin menghapus semua Buku?")) {
      deleteAll();
    }
  });

  const revoveAllCompleteBtn = document.getElementById("remove-all-complete");
  revoveAllCompleteBtn.addEventListener("click", function () {
    if (confirm("Apakah anda ingin menghapus semua Completed Buku?")) {
      deleteAllComplete();
    }
  });

  const revoveAllIncompleteBtn = document.getElementById(
    "remove-all-incomplete"
  );
  revoveAllIncompleteBtn.addEventListener("click", function () {
    if (confirm("Apakah anda ingin menghapus semua Incomplete Buku?")) {
      deleteAllIncomplete();
    }
  });

  const settingBtn = document.getElementById("setting_btn");
  settingBtn.addEventListener("click", function () {
    openSetting();
  });
});
document.addEventListener("ondatasaved", () => {
  fillUserData()
});
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
  fillUserData()
});
window.addEventListener("resize", function () {
  if (window.innerWidth > 980) {
    forceHideNav();
  }
});
