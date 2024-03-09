// if we click on the start/reset
//     if we are playing 
//         reload page
//     if we are not playing
//         set scrore to zero
//         show countdown box
//         reduce time by 1sec in loops
//             time left?
//                 yes->continue
//                 no->gameover
//         change button to reset
//         genterate new Q&A

// if we click on answer box
//     if we are playing
//         correct?
//             yes
//                 increase score
//                 show correct box for 1 sec
//                 genrate new Q&A
//             no
//                 show try again box for 1 sec

var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer; 
document.getElementById("startReset").onclick =  function() {
    //if we are playing
    if(playing == true) {
        location.reload(); // reload page
    } else{
        playing = true;//playing started
        score = 0;
        document.getElementById("scoreValue").innerHTML = score; //set score value to zero
        show("timeRemaining") // show countdown box
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        hide("gameOver")
        document.getElementById("startReset").innerHTML = "Reset Game"; //change button to reset

        //start countDown
        startCountdown();

        //generate Q&A
        generateQA();
    }
}

for(i = 1; i<= 4; i++) {
    document.getElementById("box" + i).onclick = function() {
        if(playing == true) {
            if(this.innerHTML == correctAnswer) {
                score += 1;
                document.getElementById("score").innerHTML = score;
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                generateQA();
            } else {
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}


function startCountdown() {
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if(timeRemaining == 0) { //game over
            stopCountDown();
            show("gameOver")
            document.getElementById('gameOver').innerHTML = "<p>GAME OVER!</p> <p>Your SCORE IS "+ score +".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountDown() {
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}
function show(id) {
    document.getElementById(id).style.display = "block";
}

function generateQA() {
    var x = 1 + Math.round(Math.random() * 9);
    var y = 1 + Math.round(Math.random() * 9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x"+y;

    var correctPosition = 1 + Math.round(Math.random() * 3);
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer.

    //fill other boxes with the wrong answers
    var answers = [correctAnswer];
    for(i = 1; i <= 4; i++) {
        if(i  != correctPosition) {
            var wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
            while(answers.indexOf(wrongAnswer) != -1) {
                wrongAnswer =  (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
            }
            answers.push(wrongAnswer);
            document.getElementById("box"+i).innerHTML = wrongAnswer; 
        }
    }

}