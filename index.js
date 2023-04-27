// even listenres 
let form = document.querySelector("#zipForm");
let getOutput = document.querySelector("#output");
let getBody = document.body
form.addEventListener("submit", getInfo);
getBody.addEventListener("click",deleteLocation)

function getInfo(e) {
    e.preventDefault();

    fetchApi()
}

async function fetchApi() {

    const userInupt = document.querySelector(".zip");
    const userValue = userInupt.value;
    const getApi = await fetch(`https://api.zippopotam.us/us/${userValue}`);
    if (getApi.status !== 200) {
        showIcon("remove");
        getOutput.innerHTML = `
              <article class="message is-danger">
              <div class="message-body">Invalid Zipcode, please try again</div></article>
            `;
        throw new Error(getApi.statusText);
    } else {
        showIcon("check")
        const gotData = await getApi.json();
        let places = gotData.places;
        let output = '';
        places.forEach(singleItem => {
            output += `
                <article class="message is-primary">
                    <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                    </div>
                    <div class="message-body">
                    <ul>
                        <li><strong>City: </strong>${singleItem["place name"]}</li>
                        <li><strong>State: </strong>${singleItem["state"]}</li>
                        <li><strong>Longitude: </strong>${singleItem["longitude"]}</li>
                        <li><strong>Latitude: </strong>${singleItem["latitude"]}</li>
                    </ul>
                    </div>
               </article>
        
        `
        })
        getOutput.innerHTML = output;
    }
}
let icon_check = document.querySelector(".icon-check")
let icon_remove = document.querySelector(".icon-remove")
function showIcon(icon) {
    icon_check.style.display = "none";
    icon_remove.style.display = "none";
    // Show correct icon
    document.querySelector(`.icon-${icon}`).style.display = "inline-flex";

}
// Delete location box
function deleteLocation(e) {
    if (e.target.className == "delete") {
      document.querySelector(".message").remove();
      document.querySelector(".zip").value = "";
      icon_check.remove();
    }
  }