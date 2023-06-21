const homeBt = document.getElementById("home-bt")
const coursesBt = document.getElementById("courses-bt")
const profileBt = document.getElementById("profile-bt")
const loginBt = document.getElementById("login-bt")
const contentDiv = document.querySelector('.content');

let email = ''
let user = ''

let loginscreen = false

function render(url){
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.responseType = 'text'
    xhr.onload = function () {
    if (xhr.status === 200) {
        const htmlContent = xhr.responseText;

        contentDiv.innerHTML = htmlContent;

        console.error('Error loading HTML file:', xhr.statusText);
    }
    }
    xhr.onerror = function (){
        console.error('Network error while loading HTML file:', xhr.statusText)
    }
    xhr.send();
}

function renderDirect(str, add=false){
    if(!add){
        contentDiv.innerHTML = str;
    }
    else{
        contentDiv.innerHTML += str;
    }
}

render("home.html")

homeBt.addEventListener("click", function(){
    loginscreen = false
    render("home.html")
})

loginBt.addEventListener("click", function(){
    render("login.html")
    loginscreen = true
})

function renderCourses(num, title, prof, cred, rating, duration, status){
    let template = `
    <div class="course-card">
    <img src="./media/course${num}.jpg" alt="Course ${num}">
    <div class="course-title">${title}</div>
    <div class="course-details">Instructor: ${prof}</div>
    <div class="course-details">Credits: ${cred}</div>
    <div class="course-details">Rating: ${rating}</div>
    <div class="course-details">Duration: ${duration} weeks</div>
    <div class="completed-indicator">${status}</div>
    </div>`
    return template
}

coursesBt.addEventListener("click", function(){
    loginscreen = false
    res = '<div class="course-container">' +
    renderCourses('1', 'MTH114', 'P. Shunmugraj', '6', '4.1', '6', 'Not Complete') +
    renderCourses('2', 'LIF111', 'Big Chungus', '9', '4.6', '4', 'Not Registered') + 
    renderCourses('3', 'ESC113', 'Smol Chungus', '11', '4.9', '4', 'Complete') + 
    renderCourses('4', 'PHY113', 'Zakir Hossain', '11', '5', '8', 'Not Complete') + 
    renderCourses('5', 'TA111', 'Ricardo', '11', '3.2', '8', 'Not Registered') + 
    '</div>'
    renderDirect(res)
})

profileBt.addEventListener("click", function(){
    render('profile.html')
})

function alterPswd(){
    let pswd = document.getElementById("password")
    if (pswd.type === "password") {
        pswd.type = "text"
    } else {
        pswd.type = "password"
    }
}

function login(){
    console.log("ALERT0")
    email = document.getElementById("email").value
    pswd = document.getElementById("password").value

    document.getElementById("email").value = ''
    document.getElementById("password").value = ''

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex) && pswd!=''){
        user = email.split('@')[0]
        loginscreen = false
        renderDirect(`<h1>Welcome ${user}!!</h1>`)
    }
    else{
        document.getElementById("errorlogin").innerText = "Enter a valid EMail or Password"
    }

}