var visibleDiv = "#monitor";
var isRunning = false;

$(".action").click(function() {
  if(!isRunning) {
    isRunning = true;
    var newDiv = $(this).data("action");
    if(newDiv === visibleDiv) {
        $(visibleDiv).effect( "shake", {direction: "up",times:2,distance: 10}, "slow" );
        setTimeout(function(){
            isRunning = false;
        }, 500);
    }
    else {
        if(newDiv === '#monitor'){
            getUsers();
        }
        else if(newDiv === '#update-user') {
            $('#ubio').val('');
            $('#uquote').val('');
            initUpdateUsers();
        }
        $(visibleDiv).hide('slide', 500);
        setTimeout(function(){
          $(newDiv).show('slide', 500);
        }, 500);
        visibleDiv = newDiv;
        setTimeout(function(){
            isRunning = false;
        }, 1000);
    }
  }
});
