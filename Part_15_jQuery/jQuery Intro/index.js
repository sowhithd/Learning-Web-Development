// $('document').ready(function() {

   //to add css for element using jQuery:
   // $("h1").css('color','red')

    //to add multiple css for element using jQuery:
    // $('h1').css({
    //     'color': 'red', // Change color to red
    //     'font-size': '24px', // Set font size to 24px
    //     'text-align': 'center' // Center align text
    // });

    //to add css class for element using jQuery:
    //$("h1").addClass("big-title");

    //to add multiple css class for element using jQuery:
   // $("h1").addClass("big-title margin-50");

   //to check it has css class for that element or not using jQuery:
   // $("h1").hasClass("big-title"); //returns boolean

    //to remove css class for element using jQuery:
   // $("h1").removeClass("big-title");
    
   
   //to get text from element:
   //console.log($("h1").text());

   //to change text from element:
  //$("h1").text("Hello Sowhith");

  //to access all button elements and add html to that:
  //$("button").html("<em>Hello</em>");


  //to get attribute value from element:
  //console.log($("img").attr("src"));

  //to set attribute value from element:
  //$("img").attr("src","./images/snare.png");
  //$("a").attr("href","https://www.youtube.com/").text("Go to Youtube");


  //add "eventlisteners" to element:
//   $("h1").click(function(){
//     $("h1").css("color","Orange");
//   });

//add "eventlisteners" to all similar element:
//   $("button").click(function() {
//     alert("Button clicked");
//  });

// });

//add  keypress "eventlisteners" to element of type text:
// $('input[type="text"]').keypress(function(event){
//     console.log(event);
// });


//Challenge: Add keyPress event to document. On keyboard Press, the key value should be shown under h1 tag:
// $(document).keypress(function(event) {
//     $("h1").text(event.key);
// });


//add evenlistenere using on method:

// $('button[id ="myButton"]').on("click", function(){
//     alert("Event Triggered");
// });

// $(document).on("click",'button[id ="myButton"]',{param1: 'value1', param2: 'value2'} ,function(event){
//      // Accessing event data
//      console.log('Event Data:', event.data); // output: {param1: 'value1', param2: 'value2'}
        
//      // Accessing other properties of the event object
//      console.log('Target:', event.target); //output: <button id="myButton">Click Me</button>
//      console.log('Type:', event.type); //output: click
//     alert("Event Triggered");
// });

// $(document).on("click", "button", function(){
//     // Check if the clicked button has an id attribute
//     if ($(this).attr("id")) {
//         // If the button has an id attribute, show "Parent button clicked" alert
//         alert("First is Parent button clicked");
//     } else {
//         // If the button does not have an id attribute, show "Child button clicked" alert
//         alert("Child button clicked");
//     }
// });


/*Attach a custom event on an element by passing input dynamically
HTML: 
<button>Trigger custom event</button>
<p>Click the button to attach a customized event on this p element.</p>

JS:
<script>
$(document).ready(function(){
  $("p").on("myOwnEvent", function(event, showName){
    $(this).text(showName + "! What a beautiful name!").show();
  });
  $("button").click(function(){
    $("p").trigger("myOwnEvent", ["Anja"]);
  });
});
</script> 
*/



/* Adding and Removing Elements: 

$("h1").before("<button>New</button>"); //Output in terms of HTML: <button>New</button> <h1>Hello</h1>

$("h1").after("<button>New</button>"); //Output in terms of HTML: <h1>Hello</h1> <button>New</button>

$("h1").prepend("<button>New</button>"); //Output in terms of HTML: <h1><button>New</button> Hello</h1>

$("h1").append("<button>New</button>"); //Output in terms of HTML: <h1>Hello <button>New</button></h1>

$("button").remove(); //removes all button elements

*/


$("button").on("click", function(){
    $("h1").toggle();
});