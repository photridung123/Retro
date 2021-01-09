$(document).ready(function () {

    //Xoa icon thung rac khi con 1 column
    var total_columns = $('.board-body').attr("total_columns");
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

    $(".list-cmt").hide();
    $(document).on("click",".icon-open-comment",function(){
        let parent = $(this).closest(".task-retro");
        parent.find(".list-cmt").show();
    });

    $(document).on("click",".icon-close-cmt",function(){
        $(this).closest(".list-cmt").hide();
    });

    $(document).on("click",".btn-add-cmt",function(){
        let card_id = $(this).closest(".task-retro").attr("card_id");
        let comment_text = $(this).closest(".input-group").find(".current-user-comment-box").val();
        let temp = comment_text.replace(/\s/g, '');
        if(temp) {
            $.ajax({
                url: window.location.href + "/add-cmt",
                type: 'post',
                data: { card_id,comment_text },
                success: function () {
                    console.log("succesfully");
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }
     
    });

});

