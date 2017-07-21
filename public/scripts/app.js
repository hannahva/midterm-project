$(() => {

$("#submit-button-registration").submit(function( event) {
   event.preventDefault();
  console.log("its not working");
    if(!$(this).val() && $(this).val() !== "") {
      console.log("its working");
      $.flash('OOps! Invalid information. Try Again');
    } else if (!$(this).val() && $(this).val() !== "") {
      $.flash('OOps! Invalid information. Try Again');
    }
});

});

