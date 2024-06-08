var sites = JSON.parse(localStorage.getItem("bookmarks"));
if (sites === null) {
  sites = [];
}
var sitename;
var siteurl;
var validationflag = false;
display();
function add() {
  if (sites === null) {
    sites = [];
  }
  if (validationflag) {
    sitename = document.getElementById("bookmark").value;
    siteurl = document.getElementById("url").value;
    var reg = /^https{0,1}:\/\//gmi;
    if(reg.test(siteurl) == false)
        {
            siteurl="http://"+siteurl;
        }
    sites.push({ name: sitename, url: siteurl });
    console.log("array is ", sites);
    localStorage.setItem("bookmarks", JSON.stringify(sites));
    display();
    document.getElementById("bookmark").value = "";
    document.getElementById("url").value = "";
    document.getElementById("bookmark").classList.remove("is-valid");
    document.getElementById("url").classList.remove("is-valid");
    validationflag = false;
  }
  else{
    console.log("error error error");
  }
}

function display() {
  var rows = "";
  if (sites !== null) {
    for (var i = 0; i < sites.length; i++) {
      rows += `
            <tr>
            <td class="px-1">${i + 1}</td>
            <td class="px-1">${sites[i].name}</td>
            <td class="px-1">
              <a href="${
                sites[i].url
              }" target="_blank"><button type="button" class="btn btn-outline-primary">
                <i class="fa fa-eye" aria-hidden="true"></i> <span class="d-none d-md-inline">Visit</span>
              </button></a>
            </td>
            <td class="px-1">
              <button onclick="updatebookmark(${i})" type="button" class="btn btn-outline-warning">
                <i class="fa fa-pen-to-square" aria-hidden="true"></i> <span class="d-none d-md-inline">Update</span>
              </button>
            </td>
            <td class="px-1">
              <button onclick="deletebookmark(${i})" type="button" class="btn btn-outline-danger">
                <i class="fa fa-trash" aria-hidden="true"></i> <span class="d-none d-md-inline">Delete</span>
              </button>
            </td>
          </tr>
            `;
    }
  }
  document.getElementById("res").innerHTML = rows;
}

function clearbookmarks() {
  localStorage.removeItem("bookmarks");
  sites = null;
  console.log("we are in clear function");
  display();
}

function deletebookmark(index) {
  sites.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(sites));
  display();
}

function checknamevalidation(n, type) {
  if (type === "name") {
    if (n === null) {
      n = "";
    }
    if (n.length < 3 || n.length > 30) {
      document.getElementById("bookmark").classList.remove("is-valid");
      document.getElementById("bookmark").classList.add("is-invalid");
      validationflag = false;
    } else {
      document.getElementById("bookmark").classList.remove("is-invalid");
      document.getElementById("bookmark").classList.add("is-valid");
      validationflag = true;
    }
  } else if (type === "url") {
    if (n === null) {
      n = "";
    }
    var regex = /^\S+\.[a-zA-Z]{2,}/gi;

    if (regex.test(n) && n.length < 70) {
      document.getElementById("url").classList.remove("is-invalid");
      document.getElementById("url").classList.add("is-valid");
      validationflag = true;
    } else {
      document.getElementById("url").classList.remove("is-valid");
      document.getElementById("url").classList.add("is-invalid");
      validationflag = false;
    }
  }
}
