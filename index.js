const homeBt = document.getElementById("home-bt")
const coursesBt = document.getElementById("courses-bt")
const profileBt = document.getElementById("profile-bt")
const loginBt = document.getElementById("login-bt")
const contentDiv = document.querySelector('.content');
const heroDiv = document.querySelector('.hero');

let courses = {
    //course no, title, prof, creds, rating, time in weeks, status, grade, enrollment, reviews
    //    0        1     2      3      4          5           6       7        8         9
    "MTH114" : ['1', 'MTH114', 'P. Shunmugraj', '6', '4.1', '6', 'Not Complete', '-', '200', '143'],
    "LIF111" : ['2', 'LIF111', 'Big Chungus', '9', '4.6', '4', 'Not Registered', '-', '632', '458'],
    "ESC113" : ['3', 'ESC113', 'Smol Chungus', '11', '4.9', '4', 'Complete', 'A', '134', '87'],
    "PHY113" : ['4', 'PHY113', 'Zakir Hossain', '11', '5', '8', 'Not Complete', '-', '342', '327'],
    "TA111"  : ['5', 'TA111', 'Ricardo', '11', '3.2', '8', 'Not Registered', '-', '71', '6']
}

let bkphero = '';

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

function getStarted(){
    render('home.html')
}

homeBt.addEventListener("click", function(){
    loginscreen = false
    render("home.html")
})

loginBt.addEventListener("click", function(){
    render("login.html")
    loginscreen = true
})

function info(title){
    //course no, title, prof, creds, rating, time in weeks, status, grade, enrollment, reviews
    //    0        1     2      3      4          5           6       7        8         9
    template = `
    <h2 class="course-title">${courses[title][1]}</h2>
    <div class="course-details">
      <p class="label">Instructor: ${courses[title][2]}</p><br>
      <p class="label">Credits: ${courses[title][3]}</p><br>
      <p class="label">Enrollment Count: ${courses[title][8]}</p><br>
      <p class="label">Review Count: ${courses[title][9]}</p><br>
      <p class="label">Course Rating: ${courses[title][4]}/5</p><br>
    </div>
    <div class="course-description">
      <h3>Course Description</h3>
      <p>This is a sample course description. This is a sample course description. This is a sample course description.</p>
    </div>
    <div class="reviews">
      <h3>Reviews</h3>
      <div class="review">
        <p class="reviewer">Review 1:</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.</p>
      </div>
      <div class="review">
        <p class="reviewer">Review 2:</p>
        <p>Maecenas cursus venenatis enim, sed dignissim sem mattis in.</p>
      </div>
      <div class="review">
        <p class="reviewer">Review 3:</p>
        <p>Fusce eget nisi eu diam vulputate pulvinar. Vivamus facilisis mauris nec lorem feugiat, sed lobortis nisi vestibulum.</p>
      </div>
      <button class="cta-button" type="button" onclick=courseLoad()>Go Back</button>
    </div>`
    renderDirect(template)
}

function renderCourses(num, title, prof, cred, rating, duration, status){
    let template = `
    <div class="course-card">
    <button style="padding:0px 0px; border-radius: 8px; border: None; margin-bottom: 10px; 
    background-color: white;" onclick=info("${title}") class="info-button">
    <img src="./media/course${num}.jpg" alt="Course ${num}">
    </button>
    <div class="course-title">${title}</div>
    <div class="course-details">Instructor: ${prof}</div>
    <div class="course-details">Credits: ${cred}</div>
    <div class="course-details">Rating: ${rating}</div>
    <div class="course-details">Duration: ${duration} weeks</div>
    <div class="completed-indicator">${status}</div>
    </div>`
    return template
}


function review(title){
    temp = `<h2>Review for ${title} :</h2>
    <div class="input-container">
      <input type="text" id="textbox" placeholder="Write your review here..." required>
    </div>
    <button class="submit-button" onclick=loadProfile()>Submit</button>`

    renderDirect(temp)
}

function renderMiniCourses(num, title, prof, creds, grade){
    let template = `
    <div class="mini-course-card">
        <img src="./media/course${num}.jpg" alt="Course ${num}">
        <div class="info">
        <h3>${title}</h3>
        <p>Instructor: ${prof}</p>
        <p class="grade">Grade: ${grade}</p>
        <p>Credits: ${creds}</p>
        <button class="review-button" onclick=review("${title}")>Review</button>
        </div>
    </div>`
    return template
}

function loadProfile(){
    //course no, title, prof, creds, rating, time in weeks, status, grade
    //    0        1     2      3      4          5           6       7
    let comp = ''
    let incomp = ''
    
    for(let key in courses) {
        let temp = renderMiniCourses(courses[key][0], courses[key][1], courses[key][2], courses[key][3], courses[key][7])
        if(courses[key][6]=="Complete"){
            comp += temp
        }
        else if(courses[key][6]=="Not Complete"){
            incomp += temp
        }
    }

    res = '<h2>Completed Courses:</h2>'+
    '<div class="course-container">' +
    comp +
    '</div>' +
    '<h2>Ongoing Courses:</h2>'+
    '<div class="course-container">' +
    incomp +
    '</div>'
    renderDirect(res)
}

profileBt.addEventListener("click", function(){
    loginscreen = false
    loadProfile()
})

function courseLoad(){
    temp = ''
    for(let key in courses) {
        temp += renderCourses(courses[key][0], courses[key][1], courses[key][2], courses[key][3], courses[key][4], courses[key][5], courses[key][6])
    }
    res = '<div class="course-container">' + temp + '</div>'
    renderDirect(res)
}

coursesBt.addEventListener("click", function(){
    loginscreen = false
    courseLoad()    
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
