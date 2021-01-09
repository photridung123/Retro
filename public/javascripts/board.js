$(document).ready(function () {

    //Xoa icon thung rac khi con 1 column
    var total_columns = $('.board-body').attr("total_columns");
    var max_vote = $('.board-body').attr("max_vote");
    if (total_columns == 1) {
        $('.icon-trash').hide();
    }


    //Drag & drop bang dragula js
    let container = [];
    for (let i = 0; i < total_columns; i++) {
        container[i] = document.getElementById("drag-item-" + i.toString());
    }
    dragula(container, {
        revertOnSpill: false,
        accepts: function (el, target) {
            return !el.classList.contains('no-drag')
        },
        moves: function (el, container, handle) {
            return !el.classList.contains('no-drag')
        }
    }).on('drop', function (el) {
        console.log(el.closest(".drag-task"));
    });

    $(".list-cmt").hide();
    $(document).on("click", ".icon-open-comment", function () {
        let parent = $(this).closest(".task-retro");
        parent.find(".list-cmt").show();
    });

    $(document).on("click", ".icon-close-cmt", function () {
        $(this).closest(".list-cmt").hide();
    });

    $(document).on("click", ".btn-add-cmt", function () {
        let card_id = $(this).closest(".task-retro").attr("card_id");
        let comment_text = $(this).closest(".input-group").find(".current-user-comment-box").val();
        let temp = comment_text.replace(/\s/g, '');
        if (temp) {
            $.ajax({
                url: window.location.href + "/add-cmt",
                type: 'post',
                data: { card_id, comment_text },
                success: function () {
                    console.log("succesfully");
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }

    });
    $(document).on("click", ".icon-vote", function () {

        let card_id = $(this).closest(".task-retro").attr("card_id");
        console.log(card_id);
        if ($(this).hasClass("fa-thumbs-down")) {
            $(this).removeClass("fa-thumbs-down");
            $(this).addClass("fa-thumbs-up");
            max_vote++;
            let new_total_vote = parseInt($(this).text());
            new_total_vote--;
            $(this).text(new_total_vote.toString()+" ");

            $.ajax({
                url: window.location.href + "/vote",
                type: 'post',
                data: { isLiked:false,card_id },
                success: function () {
                    console.log("succesfully");
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        } else {
            if (max_vote > 0) {
                max_vote--;
                $(this).addClass("fa-thumbs-down");
                $(this).removeClass("fa-thumbs-up");
                let new_total_vote = parseInt($(this).text());
                new_total_vote++;
                $(this).text(new_total_vote.toString()+" ");
                $.ajax({
                    url: window.location.href + "/vote",
                    type: 'post',
                    data: { isLiked:true,card_id },
                    success: function () {
                        console.log("succesfully");
                    },
                    error: function (e) {
                        console.log(e.message);
                    }
                });
            }
            else{
                $('.toast-warning-out-of-vote').toast("show");
            }
            
        }
        
    });

});

