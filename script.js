
var question_data = [
  {
    question: "What color are cats NOT?",
    answers: [ "calico", "tabby", "black with white spots", "blue with green stripes" ],
    correct_choice: 3,
    point_value: 10
  },
  {
    question: "How big are adult cats?",
    answers: [ "approximately as big as a toaster oven", "as big as an actual oven", "big enough to wear your sweater",
     "small enough to fit in your laptop sleeve" ],
    correct_choice: 0,
    point_value: 10
  },
  {
    question: "What do cats like to eat the most?",
    answers: [ "kibble", "canned tuna", "bell peppers", "bananas" ],
    correct_choice: 1,
    point_value: 10
  },
];

// keep track of which question is current
var turn = 0;

// keep track of score
var total_points = 0;

// show progress bar
var progress_val = 0; 
$('#progressbar').progressbar(
  {
    value: 0,
    max: 100
  }
)

// show first question after the page has fully loaded
showQuestion();

// function that can show the current question and its possible answers
function showQuestion() {
  // set the counter
  $('#counter').text( turn + 1 );

  //show point value
  $('#point_value').text("Points Possible: " + question_data[turn].point_value);

  // show question text
  $('#question').text( question_data[turn].question );

  // render buttons for answers
  $('#answers').empty();

  for ( let index in question_data[turn].answers ) {
    // 1. Create the button and set text to answer text
    var button = $("<span>");
    button.text( question_data[turn].answers[index] );

    // 2. store user choice as html atttribute value
    button.data('choice', index)

    // 3. Append button element into html document model
    $('#answers').append( button ); 
    $('#answers').append("<br>");
    $('#answers').append("<br>");

    //4. Drag Event Handler
    button.draggable();
  }

// make question droppable + recieve draggable answer
  $('#question').droppable(
    {
      drop: function(event, ui) {
        console.log( ui.draggable.data('choice') );
        var userchoice = ui.draggable.data('choice');
        // did the user pick the correct choice?
        checkAnswer(userchoice);
      }
    }
  );
}

function checkAnswer(choice) {
    // handle event when user clicks an answer: right or wrong?
    // decide which answer is correct and attach a click event to that answer
    if ( choice == question_data[turn].correct_choice ) {
      $('#wrong').empty(); 
      //$('#right').text("Correct answer!");

      //Add to Score
      total_points += question_data[turn].point_value;

      // JQUERY UI - DIALOG

      $( function() { $( "#dialog" ).dialog({
        buttons: [
          {
            text: "Next Question",
            icon: "ui-icon-seek-next",
            iconPosition: "end",
            click: function() {
              $( this ).dialog( "close" );
              nextQuestion();
              return false;
            }
          }
        ]
      })
      });

      // Dialog Text
      $('#dialog').html("<p>Correct Answer!</p>");

      //Add   a "Next Question" button (Replaced by Dialog Box Above)

      /*var button2 = $("<button>");
      button2.text("Next Question");
      $('#right').append( button2 );

      button2.click(
        function() {
          nextQuestion();
        }
      );*/


    } else {
      // set another click - a different one for clicking a wrong button
      $('#wrong').text("Wrong answer!");
      question_data[turn].point_value -= 2;
      showQuestion();

      $('#right').empty();
    }
}

// show another if one is available
function nextQuestion() {
  turn++;
  if ( turn < question_data.length ) {
    showQuestion();
    $('#right').empty();
    // Increment Progress Bar
    progress_val += (100 / 3);
    $( function() {
      $('#progressbar').progressbar('value', progress_val);
    });

  } else {
    //keep showing Progress Bar
    progress_val += (100 / 3);
    $( function() {
      $('#progressbar').progressbar('value', progress_val);
    });
    console.log(progress_val);
    // "Game Over" Message
      // Empty Current Content
    $('#counter').remove();
    $('#point_value').remove();
    //$('#question').empty();
    $('#answers').remove();
    $('#right').remove();
    $('#wrong').remove();
    $('#instructions').remove();
      // New Content
    $('h1').html("Woo-Hoo!<br> You Finished the Quiz!")
    $('h2').html( "Your Score " + total_points + "/30" );
      //Play Again
    $('#question').html("Play Again");
    //$('#question').addclass("text-center"); || WHY WONT THIS WORK?
    $(document).ready(function(){  // ||WHY?????
      $("#question").addClass("text-center");
    });
    

    $("#question").click(function(){
      location.reload(); 
    }); 
  }
}

