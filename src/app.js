// app.js
const table1 = document.querySelector(".table1");
const btnAll = document.querySelector(".btn-all");
const btnHelp = document.querySelector(".btn-help");
const btnGit = document.querySelector(".btn-git");
const btnRecent = document.querySelector(".btn-recent");

const quizSpinner = document.querySelector(".js-quizSpinner");
const classSpinner = document.querySelector(".js-classSpinner");

// 학습
function showClassLoading(){
    table1.style.display = "none"
    classSpinner.style.display="block"
}

function hideClassLoading(){
    classSpinner.style.display="none"
    table1.style.display = "table-row-group"
}

function fetchClass(callback){
    showClassLoading();

    fetch('class.json')
    .then((response) => response.json())
    .then((data) => {
        setTimeout("hideClassLoading()",1000);
        callback(data)
})
}


function callbackFunc(btn,data){
    const classData = data;
    let checkBtn = btn;
    console.log('classData',classData);

    if (checkBtn === "all"){
        showAll(classData);
    } else if (checkBtn === "help"){
        showHelp(classData);
    } else if (checkBtn === "git"){
        showGit(classData);
    } else {
        showRecent(classData);
    }
}

function showAll(classData){
    let str = ""
    
    for (let i=0; i<classData.length; i++){
        str += `<tr><th scope="row">${i+1}</th>
        <td>${classData[i].title}</td>
        <td><a href="${classData[i].docUrl}" class="badge bg-secondary">문서</a></td>
        <td>`
        
        if (classData[i].links.length >0){
            for (let j=0; j<classData[i].links.length; j++){
                str += `<a href="${classData[i].links[j]}" class="badge bg-secondary">${j+1}</a>`
            }
        }
        
        str += `</td>
        <td>${classData[i].date}</td>
        <td><a href=${classData[i].gitUrl}>git</a></td><tr>`

    }
    table1.innerHTML = str
}

// 주차 수정
function showHelp(classData){
    let str = ""

    console.log("showJJe")
    for (let i=0; i<classData.length; i++){
        if (classData[i].links.length > 0){
            str += `<tr><th scope="row">${i+1}</th>
            <td>${classData[i].title}</td>
            <td><a href="${classData[i].docUrl}" class="badge bg-secondary">문서</a></td>
            <td>`
            
            for (let j=0; j<classData[i].links.length; j++){
                str += `<a href="${classData[i].links[j]}" class="badge bg-secondary">${j+1}</a>`
            }
            
            str += `</td>
            <td>${classData[i].date}</td>
            <td><a href=${classData[i].gitUrl}>git</a></td><tr>`
    
        }

    }
    table1.innerHTML = str
}

// 주차 수정
function showGit(classData){
    let str = ""

    for (let i=0; i<classData.length; i++){
        if (classData[i].gitUrl && classData[i].gitUrl !== ""){
            str += `<tr><th scope="row">${i+1}</th>
            <td>${classData[i].title}</td>
            <td><a href="${classData[i].docUrl}" class="badge bg-secondary">문서</a></td>
            <td>`
            
            for (let j=0; j<classData[i].links.length; j++){
                str += `<a href="${classData[i].links[j]}" class="badge bg-secondary">${j+1}</a>`
            }
            
            str += `</td>
            <td>${classData[i].date}</td>
            <td><a href=${classData[i].gitUrl}>git</a></td><tr>`
        }

    }
    table1.innerHTML = str
}

// 날짜 최신순(내림차순) 정렬
function date_recent(a,b){
    const dateA = new Date(a['date']).getTime();
    const dateB = new Date(b['date']).getTime();

    return dateA < dateB ? 1 : -1;
}
// 주차 수정
function showRecent(classData){
    let str = ""
    let count = classData.length;

    console.log(classData.sort(date_recent));
    for (let i=0; i<classData.length; i++){
        str += `<tr><th scope="row">${count}</th>
        <td>${classData[i].title}</td>
        <td><a href="${classData[i].docUrl}" class="badge bg-secondary">문서</a></td>
        <td>`
        
        if (classData[i].links.length >0){
            for (let j=0; j<classData[i].links.length; j++){
                str += `<a href="${classData[i].links[j]}" class="badge bg-secondary">${j+1}</a>`
            }
        }
        
        str += `</td>
        <td>${classData[i].date}</td>
        <td><a href=${classData[i].gitUrl}>git</a></td><tr>`

        count--;
    }
    table1.innerHTML = str
}

function handleBtnAll(event){
    btnAll.classList.add("active");
    btnHelp.classList.remove("active");
    btnGit.classList.remove("active");
    btnRecent.classList.remove("active");

    fetchClass((data) => callbackFunc("all",data))
}

function handleBtnHelp(){
    btnHelp.classList.add("active");
    btnAll.classList.remove("active");
    btnGit.classList.remove("active");
    btnRecent.classList.remove("active");

    fetchClass((data) => callbackFunc("help",data))
}

function handleBtnGit(){
    btnGit.classList.add("active");
    btnAll.classList.remove("active");
    btnHelp.classList.remove("active");
    btnRecent.classList.remove("active");

    fetchClass((data) => callbackFunc("git",data))
}

function handleBtnRecent(){
    btnRecent.classList.add("active");
    btnAll.classList.remove("active");
    btnHelp.classList.remove("active");
    btnGit.classList.remove("active");

    fetchClass((data) => callbackFunc("recent",data))
}

//퀴즈
const table2 = document.querySelector(".table2");
const btnQuizAll = document.querySelector(".quiz-all");
const btnQuizgit = document.querySelector(".quiz-git");

function showQuizLoading(){
    table2.style.display = "none"
    quizSpinner.style.display="block"
}

function hideQuizLoading(){
    quizSpinner.style.display="none"
    table2.style.display = "table-row-group"
}

function fetchQuiz(callback){
    showQuizLoading();
    
    fetch('quiz.json')
    .then((response) => response.json())
    .then((data) => {
        setTimeout("hideQuizLoading()", 1000)
        callback(data)
})
}

function callbackFunc2(btn,data){
    const quizData = data;
    let checkBtn = btn;
    console.log("quizData", quizData)

    if (checkBtn === "allQuiz"){
        showQuizAll(quizData);
    }else if(checkBtn === "gitQuiz"){
        showQuizGit(quizData);
    }
}

function showQuizAll(quizData){
    let str = ""
    
    for (let i=0; i<quizData.length; i++){
        str += `<tr><td>${quizData[i].title}</td>
        <td><a href="${quizData[i].docUrl}" class="badge bg-secondary">문서</a></td>
        <td><a href="${quizData[i].previewUrl}">보기</a></td>
        <td><a href="${quizData[i].gitUrl}">git</a></td><tr>`
    }

    table2.innerHTML = str
}

function showQuizGit(quizData){
    let str = ""

    for (let i=0; i<quizData.length; i++){
        if (quizData[i].gitUrl && quizData[i].gitUrl !== ""){
            str += `<tr><td>${quizData[i].title}</td>
            <td><a href="${quizData[i].docUrl}" class="badge bg-secondary">문서</a></td>
            <td><a href="${quizData[i].previewUrl}">보기</a></td>
            <td><a href="${quizData[i].gitUrl}">git</a></td><tr>`
        }
    }
    table2.innerHTML = str
}

function handleQuizAll(){
    btnQuizAll.classList.add("active");
    btnQuizgit.classList.remove("active");

    fetchQuiz((data) => callbackFunc2("allQuiz",data));
}

function handleQuizGit(){
    btnQuizAll.classList.remove("active");
    btnQuizgit.classList.add("active");

    fetchQuiz((data) => callbackFunc2("gitQuiz",data));
}

function init(){
    fetchClass((data) => callbackFunc("all",data));
    fetchQuiz((data) => callbackFunc2("allQuiz",data));

    btnAll.addEventListener("click",handleBtnAll);
    btnHelp.addEventListener("click",handleBtnHelp);
    btnGit.addEventListener("click",handleBtnGit);
    btnRecent.addEventListener("click",handleBtnRecent);

    btnQuizAll.addEventListener("click", handleQuizAll);
    btnQuizgit.addEventListener("click", handleQuizGit);
}


init();
