var siteName = document.getElementById("siteNameId");
var siteUrl = document.getElementById("siteUrlId");
var overlay = document.querySelector(".overlay");
var closewindow = document.getElementById("close");
var sites = [];
var oneSite;
var cartona;


// get data from local storage if found
if(localStorage.getItem("site")!=null)
{
    sites = JSON.parse(localStorage.getItem("site"));
    displaySite();
}

// =========================== Functions ===========================

// add new site
function addsite()
{
    oneSite = {
        name:siteName.value,
        url:siteUrl.value,
    }
    
    sites.push(oneSite);
    localStorage.setItem("site",JSON.stringify(sites));
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
    displaySite();
    clearInput();
}

// display sites in table
function displaySite()
{
    cartona=""
    for(var i=0;i<sites.length;i++)
    {
        cartona +=`<tr>
        <td>${i+1}</td>
        <td>${sites[i].name}</td>
        <td><a href="${sites[i].url}" target="_blank" class="btn btn-visit px-3"><i class="fa-solid fa-eye px-1"></i> Visit</a></td>
        <td><button id="deleteSite" onclick="deleteSite(${i})" class="btn btn-delete px-3"><i class="fa-solid fa-trash-can px-1"></i> Delete</button></td>
        </tr>`
    }
    document.querySelector("tbody").innerHTML=cartona;
}

// clear inputs
function clearInput()
{
    siteName.value="";
    siteUrl.value="";
}

// delete site
function deleteSite(index)
{
    sites.splice(index,1);
    localStorage.setItem("site",JSON.stringify(sites));
    displaySite();
}

// url validation function
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if(!!pattern.test(str)===true)
    {
        siteUrl.classList.replace("is-invalid","is-valid");
    }
    else
    {
        siteUrl.classList.add("is-invalid");
    }
}

// close window function
function closeOverlay()
{
    overlay.classList.replace("d-flex","d-none");
}

// =========================== Actions ===========================

// click button to add new site
document.querySelector("#addSite").addEventListener("click",function(){
    // document.querySelector("#addSite").classList.add("btn-click");
    if(siteName.classList.contains("is-valid")&&siteUrl.classList.contains("is-valid"))
    {
        addsite();
    }
    else if(siteName.value==""||siteUrl=="")
    {
        overlay.classList.replace("d-none","d-flex");
    }
    else
    {
        overlay.classList.replace("d-none","d-flex");
    }
});

// check site name validation
siteName.addEventListener("keyup",function(){
    if(siteName.value.length>=3)
    {
        siteName.classList.replace("is-invalid","is-valid")    
    }
    else
    {
        siteName.classList.add("is-invalid");
    }
})

// check url validation
siteUrl.addEventListener("keyup",function(){   
    validURL(siteUrl.value);
})

// close using icon x
closewindow.addEventListener("click",closeOverlay);

// close using escape button from keyboard
document.addEventListener("keydown",function(eInfo){
    if(eInfo.key=="Escape")
    {
        closeOverlay();
    }
})

//close anywhere in overlay except box message 
document.addEventListener("click",function(eInfo){
   if( eInfo.target == overlay)
   {
    closeOverlay();
   }
})