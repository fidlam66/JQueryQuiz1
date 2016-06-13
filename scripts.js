var questions = [{
    question: "What is the supreme authority from which all other authorities are derived?",
    choices: ["Money", "Love", "Violence", "Strength"],
    correctAnswer: 3
}, {
    question: "Aim for the ______ to sucessfully take down an Arachnid.",
    choices: ["Head", "Nerve Stem", "Hive Gland", "Thorax"],
    correctAnswer: 2
}, {
    question: "Located in the Klendathu System, Planet ______ is homeworld to the Arachnids.",
    choices: ["Tango Urilla", "P", "Hivemind", "Klendathu"],
    correctAnswer: 4
}, {
    question: "The first Bug War was a direct result of an Arachnid attack on the city of ______",
    choices: ["Buenos Aires", "Constantine", "New York", "London"],
    correctAnswer: 1
}, {
    question: "The Bug Wars became a brutal and violent campaign between the Arachnid Species and the ______",
    choices: ["World Conglomerate", "United Citizen Federation", "Earth Defense Force", "Terran Collaborative"],
    correctAnswer: 2
}, {
    question: "The only good bug, is a ______ bug.",
    choices: ["Smashed", "Crushed", "Dead", "Bed"],
    correctAnswer: 3
}, {
    question: "Citizens that test positive for psychic abilities are usually offered positions in ______",
    choices: ["Fleet", "Mobile Infantry", "Federation Marines", "Military Intelligence"],
    correctAnswer: 4
}, {
    question: "In order to obtain citizenship through service, civilians must serve no less than ______ in the Federal Armed Services.",
    choices: ["1 Year", "2 Years", "3 Years", "4 Years"],
    correctAnswer: 2
}, {
    question: "Which of these is NOT a right granted by citizenship?",
    choices: ["A seat on the World Council", "The right to vote", "Permission to have more than two children.", "Reduced/removed college tuition"],
    correctAnswer: 1
}, {
    question: "A(n) ______ accepts personal responsibility for the safety of the body politic, defending it with his life, a civilian does not.",
    choices: ["Officer", "Leader", "Citizen", "Soldier"],
    correctAnswer: 3

}];

var currentQuestion = 0;
var playerName = prompt("What is your name, civilian?");
var playerScore = 0;
var computerScore = 0;
var quizOver = false;
var resetTimer = false;
$(document).ready(function () {
    // Ask for player name
   $(document).find(".playerScore").html(playerName + "'s Score: <b>" + playerScore + "</b>");

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            processAnswer()
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});
function processAnswer() {
    resetTimer = true;
    value = $("input[type='radio']:checked").val();
        // TODO: Remove any message -> not sure if this is efficient to call this each time....
        $(document).find(".quizMessage").hide();

        if (value == ( questions[currentQuestion].correctAnswer -1)) {
            updatePlayerScore()
            $(".quizMessage").text("YOU WERE CORRECT").show();
            $(".quizMessage").delay(1500).fadeOut(500);
        } else {
            $(".quizMessage").text("YOU WERE WRONG").show();
            $(".quizMessage").delay(1500).fadeOut(500);
        }

        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) {
            displayCurrentQuestion();
        } else {
            displayScore();
            //                    $(document).find(".nextButton").toggle();
            //                    $(document).find(".playAgainButton").toggle();
            // Change the text in the next button to ask if user wants to play again
            $(document).find(".nextButton").text("Play Again?");
            quizOver = true;
        }
}
// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    playerScore = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + playerScore + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}
function updatePlayerScore(increase=true) {
    if(increase) {
        playerScore++
    } else {
        playerScore--
    }
    $(document).find(".playerScore").html(playerName + "'s Score: <b>" + playerScore + "</b>");
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (resetTimer){
            seconds = 10;
            timer = duration;
            resetTimer = false;
        }
        display.text("TIME LEFT: " + minutes + ":" + seconds);
        if (--timer < 0) {
            timer = 0
                processAnswer()
        }
    }, 1000);
}
jQuery(function($) {
    startTimer(10, $('.timer'));
});

//tinker with math.random//
//use line below for name generator assigning random name (50% chance default)//
//if (Math.random() < .5) {console.log("ok")} else {console.log("no k")}//
