
function callAPI() {
    //fetch('/api/logon')
    //    .then(res => res.text())
    //    .then(d => alert("Submitted Successfully"));
    try {
        window.location.href = "/public/Longon.html";
    }
    catch (err) {
        console.error(err);
    }
}

window.loadPage = function (page) {
    fetch(`/public/${page}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Not found");
            return res.text();
        })
        .then(html => {
            document.getElementById("content").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("content").innerHTML =
                "<p>Page not found</p>";
        });
};

function loadTempleInfo() {
    try {

        //const response = await fetch('/api/UserText');
        //const books = await response.json();
        console.log("Entering Template Infor");


        fetch("/api/UserText")
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    const container = document.getElementById(item.class_Type);

                    if (!container) {
                        if (item.class_Type != "banner") {

                            console.error("Container not found:");
                            return;
                        }

                        console.error("Container else:", item.class_Type);
                        const container = document.getElementById("hero");
                        const newdiv = document.createElement("div");
                        newdiv.className = item.class_Name;
                        newdiv.id = item.class_Type;
                        
                        newdiv.innerHTML = `
                        <h2>${item.long_Text}</h2>
                        <p>${item.short_Text}</p>
        `               ;
                        container.appendChild(newdiv);

                        return;
                    }
                    container.innerHTML = `
                      <h2>${item.short_Text}</h2>
                      <a href="#about"><img src="images/pic1.jpg" alt="" class="right" width="200" height="200" /></a>
                      <p>${item.long_Text}</p>
        `           ;
                });
            });

        console.log("Leaving Template Infor");
    }
    catch (err) {
        console.error(err);
    }
}


async function loadPoojaSchedules() {
    try {
        //const response = await fetch('/api/PoojaSchedule');
        const response = await fetch("https://serverlesshtmsconsapp.azurewebsites.net/api/pooja");
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const books = await response.json();

        const container = document.getElementById('poojaDiv');
        container.innerHTML = '';

        books.forEach(p => {
            container.innerHTML += `
                <div class="pooja-card ${p.Pooja_card}">
                    <h3> ${p.Pooja_name}</h3>
                    <p> ${p.Time} - ${p.Description} <p>
                </div>`;
        });
    } catch (err) {
        console.error(err);
    }
}

loadPoojaSchedules();
//loadTempleInfo();