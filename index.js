const homeBt = document.getElementById("home-bt")
const coursesBt = document.getElementById("courses-bt")
const profileBt = document.getElementById("profile-bt")
const loginBt = document.getElementById("login-bt")
const submitCrBt = document.getElementById("submitC-bt")
const contentDiv = document.querySelector('.content');
const heroDiv = document.querySelector('.hero');

let courses = {
    //course no, title, prof, creds, rating, time in weeks, status, grade, enrollment, reviews, language, dep, mode
    //    0        1     2      3      4          5           6       7        8         9         10     11    12
    "MTH114" : ['1', 'MTH114', 'P. Shunmugraj', '6', '4.1', '6', 'Not Complete', '-', '200', '143', 'English', 'MTH', 'Offline'],
    "LIF111" : ['2', 'LIF111', 'Big Chungus', '9', '4.6', '4', 'Not Registered', '-', '632', '458', 'English', 'BSBE', 'Online'],
    "ESC113" : ['3', 'ESC113', 'Smol Chungus', '11', '4.9', '4', 'Complete', 'A', '134', '87', 'English', 'CSE', 'Online'],
    "PHY113" : ['4', 'PHY113', 'Zakir Hossain', '11', '5', '8', 'Not Complete', '-', '342', '327', 'English', 'PHY', 'Offline'],
    "TA111"  : ['5', 'TA111', 'Ricardo', '11', '3.2', '8', 'Not Registered', '-', '71', '6', 'English', 'CE', 'Offline']
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
    //course no, title, prof, creds, rating, time in weeks, status, grade, enrollment, reviews, language, dep, mode
    //    0        1     2      3      4          5           6       7        8         9         10     11    12
    template = `
    <br>
    <div style="background-color: rgba(255, 255, 255, 0.7); border-radius:6px; color:black;">
    <br>
      <h2>Course Information</h2>
      <table>
        <tr>
          <th>Course Title:</th>
          <td>${courses[title][1]}</td>
        </tr>
        <tr>
          <th>Instructor Name:</th>
          <td>${courses[title][2]}</td>
        </tr>
        <tr>
          <th>Credits:</th>
          <td>${courses[title][3]}</td>
        </tr>
        <tr>
          <th>Weeks:</th>
          <td>${courses[title][5]} Weeks</td>
        </tr>
        <tr>
          <th>Enrollment Count:</th>
          <td>${courses[title][8]}</td>
        </tr>
        <tr>
          <th>Review Count:</th>
          <td>${courses[title][9]}</td>
        </tr>
        <tr>
          <th>Course Rating:</th>
          <td>${courses[title][4]}/5</td>
        </tr>
        <tr>
          <th>Course Description:</th>
          <td>Sample Description</td>
        </tr>
        <tr>
          <th>Reviews:</th>
          <td>
            <ul>
              <li>4/5 Sample review 1</li>
              <li>3/5 Another sample review 2</li>
              <li>5/5 Last sample review 3</li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
    <div style="background-color: rgba(255, 255, 255, 0.7); border-radius:6px; color:black;">
    <br>
      <h2>Additional Information</h2>
      <table>
        <tr>
          <th>Course Language:</th>
          <td>${courses[title][10]}</td>
        </tr>
        <tr>
          <th>Course Mode:</th>
          <td>${courses[title][12]}</td>
        </tr>
        <tr>
          <th>Department:</th>
          <td>${courses[title][11]}</td>
        </tr>
        <tr>
          <th>Structure:</th>
          <td>
            <ul>
              <li>Introduction (2 videos) </li>
              <li>Getting in depth (7 videos) </li>
              <li>Applications (6 videos)</li>
              <li>Summary (2 videos)</li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
    <br>
    <button type="button" class="cta-button" onclick = loadCourses()>Go Back</button>
    <br><br>`
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
    //course no, title, prof, creds, rating, time in weeks, status, grade, enrollment, reviews, language, dep, mode
    //    0        1     2      3      4          5           6       7        8         9         10     11    12
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

function loadCourses(){
    temp = ''
    for(let key in courses) {
        temp += renderCourses(courses[key][0], courses[key][1], courses[key][2], courses[key][3], courses[key][4], courses[key][5], courses[key][6])
    }
    res = '<div class="course-container">' + temp + '</div>'
    renderDirect(res)
}

coursesBt.addEventListener("click", function(){
    loginscreen = false
    loadCourses()    
})

submitCrBt.addEventListener("click", function(){
    render("submit.html")
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
