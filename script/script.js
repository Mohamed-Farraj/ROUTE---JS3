 var sites = JSON.parse(localStorage.getItem("bookmarks"));
 if(sites === null){sites=[];}
 var sitename;
 var siteurl;
 display();
function add()
{
    if(sites === null){sites=[];}
    sitename = document.getElementById("bookmark").value;
    siteurl = document.getElementById("url").value;
    sites.push({name:sitename,url:siteurl});
    console.log("array is ",sites);
    localStorage.setItem("bookmarks",JSON.stringify(sites));
    display();
    document.getElementById("bookmark").value="";
    document.getElementById("url").value="";
}

function display()
{
    var rows = "";
    if(sites !== null){
    for(var i=0; i<sites.length;i++)
        {
            rows+=`
            <tr>
            <td>${i+1}</td>
            <td>${sites[i].name}</td>
            <td>
              <a href="${sites[i].url}" target="_blank"><button type="button" class="btn btn-outline-primary">
                <i class="fa fa-eye" aria-hidden="true"></i> visit
              </button></a>
            </td>
            <td>
              <button onclick="deletebookmark(${i})" type="button" class="btn btn-outline-danger">
                <i class="fa fa-trash" aria-hidden="true"></i> delete
              </button>
            </td>
          </tr>
            `
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

function deletebookmark(index){
    sites.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(sites));
    display();
}