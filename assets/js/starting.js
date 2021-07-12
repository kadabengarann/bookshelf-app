document.querySelectorAll(".form-control").forEach((item) => {
  item.addEventListener("input", function (event) {
    let field = this.parentElement;
    if (this.value) {
      field.classList.add("field--not-empty");
    } else {
      field.classList.remove("field--not-empty");
    }
  });
});

function addUser() {
  const overlay = document.querySelector(".overlayStarting");
  const nameUser = document.getElementById("username").value;
  console.log("name is " + nameUser);

  user.name = nameUser;
  let bookCount = countBook()
  user.completedBooks = bookCount[1]
  user.incompletedBooks = bookCount[0]

  saveUserData();

  overlay.classList.add("move-up");
  setTimeout(function () {
    overlay.remove();
  }, 1501);
  
}
