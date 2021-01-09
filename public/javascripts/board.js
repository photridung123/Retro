$(document).ready(function () {

    //Xoa icon thung rac khi con 1 column
    const total_columns = $('.board-body').attr("total_columns");
    if ( total_columns == 1) {
        $('.icon-trash').hide();
    }
   

    //Drag & drop bang dragula js
    let container = [];
    for(let i=0;i<total_columns;i++){
        container[i]=document.getElementById("drag-item-"+i.toString());
    }
    dragula(container, {
        revertOnSpill: false,
        accepts: function(el, target) {
            return  !el.classList.contains('no-drag')
          },
        moves: function(el, container, handle) {
            return  !el.classList.contains('no-drag')
          }
    }).on('drop', function(el) {
        console.log(el.closest(".drag-task"));
    });

});

