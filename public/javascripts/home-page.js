$(document).ready(function () {

  //init
  let width;
  let max_card;
  let head = 1;
  init_card();


  $('.btn-prev').click(function () {
    if (head > 1) {

      $('.quote-' + (head + max_card - 1).toString()).hide();
      head--;
      $('.quote-' + head.toString()).show();
    }
  });

  $('.btn-next').click(function () {
    if (head < 5 - max_card) {
      $('.quote-' + head.toString()).hide();
      head++;
      $('.quote-' + (head + max_card - 1).toString()).show();
    }
  });

  $(window).resize(function(){
    init_card();
  });

  function init_card() {

<<<<<<< HEAD
    console.log("checked");
    width = $(window).width();
=======
    width = window.innerWidth;
    console.log(width);
>>>>>>> dev
    max_card = (width > 995) ? 3 : 1;
    $('.quote').hide();

    if (max_card == 3) {
      for (let i = head; i < head + max_card; i++) {
        $('.quote-' + i.toString()).show();
      }
    } else $('.quote-' + head.toString()).show();
  }
});