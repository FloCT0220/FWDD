$(document).ready( function() {
  $( "#tabs" ).tabs();

  $(document).tooltip({
    position: {
      my: "bottom",
      at: "top"
    }
  });

  $(document).tooltip({
    show: {effect:'slideDown', delay: 500, ducation:250}
  });
});