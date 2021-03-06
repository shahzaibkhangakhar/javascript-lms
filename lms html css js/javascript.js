var number = 1;
//.........................get data from local storage...............................
var arr = new Array();
function getData() {
  var str = localStorage.getItem("localData");
  console.log(str);
  if (str != null) {
    arr = JSON.parse(str);
  }
}

//......................add data into local storage..................................
function addData() {
  getData();

  //..................................................................

  if (selectedIndex === -1) {
    arr.push({
      booknameinput: document.getElementById("booknameinput").value,
      authornameinput: document.getElementById("authornameinput").value,
      publishernameinput: document.getElementById("publishernameinput").value,
      dateinput: document.getElementById("dateinput").value,
    });
  } else {
    arr.splice(selectedIndex, 1, {
      booknameinput: document.getElementById("booknameinput").value,
      authornameinput: document.getElementById("authornameinput").value,
      publishernameinput: document.getElementById("publishernameinput").value,
      dateinput: document.getElementById("dateinput").value,
    });
  }

  localStorage.setItem("localData", JSON.stringify(arr));
  init();
  clearfields();
}

//..........................delete All Data from local Storage..................................
function deleteData() {
  localStorage.clear();
}
//.................................clear add new books fields....................................

function clearfields() {
  document.getElementById("booknameinput").value = "";
  document.getElementById("authornameinput").value = "";
  document.getElementById("publishernameinput").value = "";
  document.getElementById("dateinput").value = "";
  document.getElementById("submit").innerHTML = "Add Book";
}

//...........................................................................................................................................................................................
//............................................................................................index Table....................................................................................

//.................................preparing index table....................................
function init() {
  getData();
  document.getElementById("booktable").innerHTML = "";
  let booksTable = document.getElementById("booktable");
  if (booksTable) {
    for (let i = 0; i < arr.length; i++) {
      console.log(i, arr[i]);
      prepareTableCell(
        i,
        arr[i].booknameinput,
        arr[i].authornameinput,
        arr[i].publishernameinput,
        arr[i].dateinput
      );
    }
  }
}
//.................................index Table....................................
function prepareTableCell(index, bookName, authorName, publisherName, date) {
  getData();
  var table = document.getElementById("booktable");
  var row = table.insertRow();
  let indexcell = row.insertCell(0);
  var booknamecell = row.insertCell(1);
  var authornamecell = row.insertCell(2);
  var publishernamecell = row.insertCell(3);
  var datecell = row.insertCell(4);
  var actioncell = row.insertCell(5);
  indexcell.innerHTML = index + 1;
  booknamecell.innerHTML = bookName;
  authornamecell.innerHTML = authorName;
  publishernamecell.innerHTML = publisherName;
  datecell.innerHTML = date;
  actioncell.innerHTML =
    '<button onclick="deleteIndexRow(' +
    index +
    ')">Delete</button> <br/> <a href="/update.html"><button>Update</button></a> ';
}
//........................deleting row in index table.......................................
function deleteIndexRow(index) {
  var table = document.getElementById("booktable");
  table.deleteRow(index);
  arr.splice(index, 1);
  localStorage.localData = JSON.stringify(arr);
  init();
}

//...........................................................................................................................................................................................
//............................................................................................Author Table....................................................................................
//.................................preparing author table....................................
function authorinit() {
  getData();

  x = Array.from(new Set(arr.map((A) => A.authornameinput)));
  let authors = x.map((X) => ({
    authorName: X,
    NoofBooks: arr.filter((M) => M.authornameinput === X).length,
  }));
  document.getElementById("authorbooktable").innerHTML = "";
  let authorTable = document.getElementById("authorbooktable");
  if (authorTable) {
    for (let i = 0; i < authors.length; i++) {
      console.log(i, arr[i]);
      authorprepareTableCell(i, authors[i].authorName, authors[i].NoofBooks);
    }
  }
}

//.................................author table....................................

function authorprepareTableCell(index, authorName, bookno) {
  getData();

  var table = document.getElementById("authorbooktable");
  var row = table.insertRow();
  var indexcell = row.insertCell(0);
  var authornamecell = row.insertCell(1);

  var booknocell = row.insertCell(2);
  var actioncell = row.insertCell(3);
  authornamecell.innerHTML = authorName;
  indexcell.innerHTML = index + 1;
  booknocell.innerHTML = bookno;
  actioncell.innerHTML =
    "<button onclick=\"deleteAuthorRow('" +
    authorName +
    "')\" >Delete</button>";
}
//........................deleting row in author table.......................................
function deleteAuthorRow(authorName) {
  getData();
  let deleteauthor = arr.filter((M) => M.authornameinput !== authorName);
  var A_table = document.getElementById("authorbooktable");
  // P_table.deleteRow(index) ;
  // arr.splice(index,1);
  localStorage.localData = JSON.stringify(deleteauthor);
  authorinit();
  
}

//...........................................................................................................................................................................................
//............................................................................................Publisher Table...................................................................................
//.................................preparing publisher table....................................
function publisherinit() {
  getData();
  x = Array.from(new Set(arr.map((A) => A.publishernameinput)));
  let publishers = x.map((X) => ({
    publisherName: X,
    NoofBooks: arr.filter((M) => M.publishernameinput === X).length,
  }));
  document.getElementById("publisherbooktable").innerHTML = "";
  let publisherTable = document.getElementById("publisherbooktable");
  if (publisherTable) {
    for (let i = 0; i < publishers.length; i++) {
      console.log(i, arr[i]);
      publisherprepareTableCell(
        i,
        publishers[i].publisherName,
        publishers[i].NoofBooks
      );
    }
  }
}

//.................................publisher Table....................................

function publisherprepareTableCell(index, publisherName, bookno) {
  getData();
  var table = document.getElementById("publisherbooktable");
  var row = table.insertRow();
  let indexcell = row.insertCell(0);
  var publishernamecell = row.insertCell(1);

  var booknocell = row.insertCell(2);
  let actioncell = row.insertCell(3);
  publishernamecell.innerHTML = publisherName;
  indexcell.innerHTML = index + 1;
  booknocell.innerHTML = bookno;
  actioncell.innerHTML =
    "<button onclick=\"deletePublisherRow('" +
    publisherName +
    "')\" >Delete</button>";
}
//........................deleting row in publisher table.......................................
function deletePublisherRow(publisherName) {
  getData();
  let deletepublisher = arr.filter(
    (M) => M.publishernameinput !== publisherName
  );
  var P_table = document.getElementById("publisherbooktable");
  // P_table.deleteRow(index) ;
  // arr.splice(index,1);
  localStorage.localData = JSON.stringify(deletepublisher);
  publisherinit();
}

//...........................................................................................................................................................................................
//..............................................................................................update.........................................................................................
//.................................preparing update table....................................
function updateinit() {
  getData();
  document.getElementById("updatebooktable").innerHTML = "";
  let booksTable = document.getElementById("updatebooktable");
  if (booksTable) {
    for (let i = 0; i < arr.length; i++) {
      console.log(i, arr[i]);
      updateprepareTableCell(
        i,
        arr[i].booknameinput,
        arr[i].authornameinput,
        arr[i].publishernameinput,
        arr[i].dateinput
      );
    }
  }
}
//.................................index Table....................................
function updateprepareTableCell(
  index,
  bookName,
  authorName,
  publisherName,
  date
) {
  getData();
  var table = document.getElementById("updatebooktable");
  var row = table.insertRow();
  let indexcell = row.insertCell(0);
  var booknamecell = row.insertCell(1);
  var authornamecell = row.insertCell(2);
  var publishernamecell = row.insertCell(3);
  var datecell = row.insertCell(4);
  var actioncell = row.insertCell(5);
  indexcell.innerHTML = index + 1;
  booknamecell.innerHTML = bookName;
  authornamecell.innerHTML = authorName;
  publishernamecell.innerHTML = publisherName;
  datecell.innerHTML = date;
  actioncell.innerHTML =
    '<button onclick="onupdatepress(' + index + ')" >Update</button> ';
}

//.................................Update press.................................................
var selectedIndex = -1;
function onupdatepress(index) {
  selectedIndex = index;
  var bookobj = arr[index];
  document.getElementById("booknameinput").value = bookobj.booknameinput;
  document.getElementById("authornameinput").value = bookobj.authornameinput;
  document.getElementById("publishernameinput").value =
    bookobj.publishernameinput;
  document.getElementById("dateinput").value = bookobj.dateinput;
  document.getElementById("submit").innerHTML = "Update";
}
