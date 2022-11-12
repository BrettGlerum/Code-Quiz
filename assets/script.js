var timerEl = document.querySelector("#timer");
var wrapperEl = document.querySelector(".wrapper");
var startEl = document.querySelector("#startBtn");
var divContainer = document.querySelector(".containerEl");
var questionEl = document.querySelector("#titleQuestion");
var choicesEl = document.querySelector("#ansChoices");
var endEl = document.querySelector(".endSection");
var scoreEl = document.querySelector("#scoreSection");
var errorEl = document.querySelector("#errorMsg");
var initialsEl = document.querySelector("#initialInput").value;
var submitEl = document.querySelector(".btn btn-primary mb-2");
var responseDiv = document.querySelector("#responseSection");
var resultsEl = document.querySelector(".resultsPage");
var initialsScore = document.querySelector("#scoreInitials");
var startPageEl = document.querySelector(".startPage");



// Create an  array of questions
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "There are 3 different ways in which a JavaScript code can be involved in an HTML file. Selct the one that's not correct.",
        choices: ["Inline", "Import", "External", "Internal"],
        answer: "Import",
    },
    {
        title: "How to create an array in js ?",
        choices: ["var A[]=", "var A{}=", "var A=[]", "var A={}"],

        answer: "var A=[]",
    },
    {   
        title: "HTML element that can be accessed in a Javascript code: Chose the one that will return an array of elements",
        choices: ["getElementById(‘idname’)", "getElementsByClass(‘classname’)", 
        "getElementsByTagName(‘tagname’)", "querySelectorAll()"],
        answer: "querySelectorAll()",
    }
]



function newQuestions() {
    var Qtitle = questions[i].title
    questionEl.textContent = Qtitle
    var Q1C1 = questions[i].choices[0];
    var Q1C2 = questions[i].choices[1];
    var Q1C3 = questions[i].choices[2];
    var Q1C4 = questions[i].choices[3];

    choicesEl.innerHTML = '';

    var listTag1 = document.createElement("li");
    listTag1.setAttribute("class", "all_li")
    var btn = document.createElement('button');
    btn.setAttribute("class", "all_btn")
    btn.textContent = Q1C1;
    listTag1.appendChild(btn)
    choicesEl.appendChild(listTag1);
    divContainer.appendChild(choicesEl);

    var listTag2 = document.createElement("li");
    listTag2.setAttribute("class", "all_li");
    var btn2 = document.createElement('button');
    btn2.setAttribute("class", "all_btn")
    btn2.textContent = Q1C2;
    listTag2.appendChild(btn2)
    choicesEl.appendChild(listTag2)
    divContainer.appendChild(choicesEl);

    var listTag3 = document.createElement("li");
    listTag3.setAttribute("class", "all_li")
    var btn3 = document.createElement('button');
    btn3.setAttribute("class", "all_btn")
    btn3.textContent = Q1C3;
    listTag3.appendChild(btn3)
    choicesEl.appendChild(listTag3)
    divContainer.appendChild(choicesEl);

    var listTag4 = document.createElement("li");
    listTag4.setAttribute("class", "all_li")
    var btn4 = document.createElement('button');
    btn4.setAttribute("class", "all_btn");
    btn4.textContent = Q1C4;
    listTag4.appendChild(btn4);
    choicesEl.appendChild(listTag4);
    divContainer.appendChild(choicesEl);
    var allBtnEl = document.querySelectorAll(".all_btn")
    allBtnEl.forEach(function (event) {
        event.addEventListener("click", onclickHandler)
    });

}


var timer = 76;
var timeAmount;

function beginTimer() {
    timeAmount = setInterval(function () {
        timer--;
        var resetTime = timerEl.textContent = "Time:" + " " + timer;
       timer = timer;
        if (timer <= 0) {         
            clearInterval(timeAmount);
              
            timerEl.textContent = resetTime;
             
        }
    }, 1000)
}
 

document.addEventListener("click", function (event) {
    if (event.target === startEl) {
        wrapperEl.style.display = "none";
        beginTimer()
        newQuestions();
    }

})

 
/**declare the index variable for the onclickHandler function**/
var i = 0;

/**Add a function to compare the answers and 
 * display each questions as the buttons are clicked.*/
function onclickHandler(event) {
     
    if(timer<=0){
        clearInterval(timeAmount);
        divContainer.style.display="none";
        showResult();
    }
    var answerText = event.target.textContent 
    if (answerText === questions[i].answer) {
        timer = timer;
        responseDiv.setAttribute("style", "color: green")
        responseDiv.textContent = "Correct";
    } else {

        responseDiv.setAttribute("style", "color: red")
        responseDiv.textContent = "Wrong";
        timer = timer - 15;
     }
    
      
     
    if (i < questions.length-1) {

      i++;

      setTimeout(function () {
      newQuestions();
      responseDiv.textContent = "";
    }, 1000)
    }else {
        setTimeout(function () {
            responseDiv.textContent = "";
            showResult();
            clearInterval(timeAmount);
          
        }, 500)
    

        divContainer.innerHTML = '';
     }
     
    /**Function to display users final score */
    function showResult() {
        endEl.style.visibility = "visible";
        timerEl.textContent = "Time:" + " " + timer;
        var HighScores = timer;
        localStorage.getItem(HighScores)
        finalScore.textContent = "Your final score is: " + HighScores;
         localStorage.setItem("HighScores", HighScores)
 
    }
}
/**function to show the last page  */
function getLastItem() {
    var yourScore = localStorage.getItem("HighScores");
     var yourInitials = localStorage.getItem("Initial");
     if (yourScore && yourInitials === "") {
        return
    }
    endEl.textContent = "";
    var finaPageEl = document.querySelector(".resultsPage");
    finaPageEl.style.visibility = "visible";
    var initialsScore = document.querySelector("#scoreInitials");
    initialsScore.value = yourInitials + ":" + " " + yourScore;

}
 
//** This event listner submit the initial and final score to the local storage */
document.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialInput = document.querySelector("#initialInput").value;
    if (initialInput === "") {
        errorEl.setAttribute("style", "color: red")
        errorEl.textContent = "Initial input field cannot be empty"
    } else {
        errorEl.textContent = "";
        localStorage.getItem(initialInput)
        localStorage.setItem("Initial", initialInput)
         getLastItem()
    }

})

function init() {
     location.reload();
 
}

function clearScore() {
    initialsScore.value = "";
}

 