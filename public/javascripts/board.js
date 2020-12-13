$(document).ready(function () {

    if ($('.board-body').attr("total_columns") === 1) {
        $('.icon-trash').hide();
    }

    dragula([document.getElementById("Todo"), document.getElementById("Doing"), document.getElementById("Done")], {
        revertOnSpill: false,
        accepts: function(el, target) {
            return  !el.classList.contains('no-drap')
          },
        moves: function(el, container, handle) {
            return  !el.classList.contains('no-drag')
          }
    });


    

});

