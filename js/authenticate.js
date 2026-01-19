

async function Authenticate(userName, password) {
    const errorDiv = document.getElementById("error");
    const url = "https://serverlesshtmsconsapp.azurewebsites.net/api/AuthenticateUser";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            UserName: userName,
            Password: password
        })
    });

    if (!response.ok) {
        errorDiv.textContent = "Invalid username or password";

        throw new Error("Login failed");
    }

    const data = await response.json();
    //alert("Login successful!!");
    if (data.Role=="admin")
        window.location.href = "/public/dashboard.html";
    else
        errorDiv.textContent = "Invalid User Role";

    return data;
}


async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    const response = await fetch("https://localhost:7182/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
        error.textContent = "Invalid username or password";
        return;
    }

    localStorage.setItem("token", data.token);
    alert("Login successful");
    window.location.href = "/public/dashboard.html";
}

async function GetOrders() {

    const token = localStorage.getItem("access_token");

    fetch("https://api.example.com/orders", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(data => console.log(data))
        .catch(err => console.error(err));
}

window.CheckRole = async function () {
    //alert("Checking Role");
    console.log("Entering CheckUserRole");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    //// usage
    Authenticate(username, password)
        .then(result => console.log(result))
        .catch(err => console.error(err));
    console.log("Entering CheckUserRole");
}

