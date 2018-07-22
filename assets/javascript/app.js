$(document).ready(function() {
    var triviaQuestions = [
        {question: "Who was the last queen of France prior to the French revolution?", answerList: ["Marie Antoinette", "Elizabeth II", "Victoria", "Isabella II"], answer: 0}, 
        {question: "According to ancient Roman religion, who was the god of the sea?", answerList: ["Jupiter", "Uranus", "Neptune", "Pluto"], answer: 2}, 
        {question: "Which US state has the highest number of colleges and universities?", answerList: ["New York", "Pennsylvania", "Texas", "California"], answer: 3}, 
        {question: "According to legend, Romulus and Remus founded what city?", answerList: ["Vienna", "Rome", "London", "Athens"], answer: 1}, 
        {question: "What is the only mammal that can truly fly?", answerList: ["Birds", "Bees", "Humans", "Bats"], answer: 3}, 
        {question: "When referring to a type of music, what does R&B stand for?", answerList: ["Rhythm and Blue", "Rap", "Pop", "Hip Hop"], answer: 0}, 
        {question: "The headquarters of the United Nations is located in what city?", answerList: ["Beijing", "London", "New York", "Paris"], answer: 2}, 
        {question: "In the game of chess, how many pawns does each player start with?", answerList: ["8", "6", "10", "12"], answer: 0}, 
        {question: "In cooking, margarine is used as a substitute for what ingredient?", answerList: ["Oil", "Butter", "Vinegar", "Cream Cheese"], answer: 1}, 
        {question: "The Bill of Rights contains how many of the first amendments to the United States Constitution?", answerList: ["8", "9", "10", "11"], answer: 2}
    ]
    var messages = {
        correct: "Correct!",
        incorrect: "WRONG!",
        timerEnd: "Whoops! You're out of time!",
        finishGame: "This is the end. Let's see your scores."
    }

    var currentQuestion; 
    var correctAnswer; 
    var incorrectAnswer; 
    var unanswered; 
    var seconds; 
    var time; 
    var answered; 
    var userSelect;

    $('#startBtn').on('click', function(){
        $(this).hide();
        newGame();
    });
    
    $('#startOverBtn').on('click', function(){
        $(this).hide();
        newGame();
    });
    
    function newGame(){
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#incorrectAnswers').empty();
        $('#unanswered').empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }
    
    function newQuestion(){
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;
        
        //sets up new questions & answerList
        $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
        $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
        for(var i = 0; i < 4; i++){
            var choices = $('<div>');
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }
        countdown();
        //clicking an answer will pause the time and setup answerPage
        $('.thisChoice').on('click',function(){
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    }
    
    function countdown(){
        seconds = 15;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        answered = true;
        //sets timer to go down
        time = setInterval(showCountdown, 1000);
    }
    
    function showCountdown(){
        seconds--;
        $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }
    
    function answerPage(){
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();
    
        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        //checks to see correct, incorrect, or unanswered
        if((userSelect == rightAnswerIndex) && (answered == true)){
            correctAnswer++;
            $('#message').html(messages.correct);
            $("#message").css("background-color", "lightgreen")
        } else if((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            $('#message').html(messages.incorrect);
            $("#message").css("background-color", "red")
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
        } else{
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
            answered = true;
        }
        
        if(currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 5000)
        } else{
            currentQuestion++;
            setTimeout(newQuestion, 5000);
        }	
    }
    
    function scoreboard(){
        $('#timeLeft').empty();
        $('#message').empty();
        $('#correctedAnswer').empty();
    
        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html("Correct Answers: " + correctAnswer);
        $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
        $('#unanswered').html("Unanswered: " + unanswered);
        $('#startOverBtn').addClass('reset');
        $('#startOverBtn').show();
        $('#startOverBtn').html('Start Over?');
    }
    /* var questionObject, question, answers, correct, counter, answered
    var correctCount, incorrectCount, unansweredCount
    $(".start").on("click", function() {
        $(this).hide()
        newGame()
    })
    $(".start-over").on("click", function() {
        $(this).hide()
        newGame()
    })

    function newGame() {
        $('#final-message').empty()
	    $('#correctAnswers').empty()
	    $('#incorrectAnswers').empty()
	    $('#unanswered').empty()
        counter = 0;
        correctCount = 0
        incorrectCount = 0
        unansweredCount = 0
        newQuestion()
    }

    function newQuestion() {
        $(".message").empty()
        $(".correct").empty()
        answered = true
        questionObject = questions[counter]
        question = questionObject.question
        answers = questionObject.answerList
        correct = questionObject.answer
        $(".question").html(question)
        for (i=0; i<answers.length; i++) {
            var choice = $("<div>")
            choice.attr("value", i)
            choice.attr("id", "answer-choice")
            choice.html(answers[i])
            $(".answer").append(choice)
        }
        timer()
        $("#answer-choice").on('click', function() {
            answerChoice = $(this).attr("value")
            clearInterval(time)
            answer()
        })

    }

    function answer() {
        $(".current-question").empty()
        $(".question").empty()
        $(".answer").empty()
    }

    function score() {
        $(".timer").empty()
        $(".message").empty()
        $(".final-message").html(messages.finishGame)
        $(".correct").html("Your correct answers count: " + correctCount)
        $(".incorrect").html("Your incorrect answers count: " + incorrectCount)
        $(".unanswered").html("You did not answer " + unansweredCount + " questions.")
        $(".start-over").html("Start Over?")

    }

    function timer() {
        seconds = 20;
        $(".timer").html(seconds + " seconds remaining.")
        answered = true;
        time = setInterval(countDown, 1000)
    }

    function countDown() {
        seconds--;
        $(".timer").html(seconds + " seconds remaining.")
        if (seconds < 1) {
            clearInterval(time)
            answered = false
            answerPage()
        }
    }

}) */
})