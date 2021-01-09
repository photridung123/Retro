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

            //add cmt front end
            let comment_owner = $('.board-body').attr("user_name");
            $(this).closest(".list-cmt").find('.form-box-cmt').before($("<div class=\"comment-box mt-3\"><div class=\"d-flex justify-content-between\">"
                + "<div class=\"cmt-owner\"><b>" + comment_owner + ": </b></div><i class=\"fa fa-times\"></i>"
                + "</div>" + comment_text + "</div>"));
        }

        $(this).closest(".list-cmt").find('.current-user-comment-box').val("");

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
            $(this).text(new_total_vote.toString() + " ");

            $.ajax({
                url: window.location.href + "/vote",
                type: 'post',
                data: { isLiked: false, card_id },
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
                $(this).text(new_total_vote.toString() + " ");
                $.ajax({
                    url: window.location.href + "/vote",
                    type: 'post',
                    data: { isLiked: true, card_id },
                    success: function () {
                        console.log("succesfully");
                    },
                    error: function (e) {
                        console.log(e.message);
                    }
                });
            }
            else {
                $('.toast-warning-out-of-vote').toast("show");
            }

        }

    });

    var comment_delete_id;
    $(document).on("click", ".btn-open-modal-delete-cmt", function () {
        comment_delete_id = $(this).attr("comment_id");
    });

    $(document).on("click", ".btn-delete-cmt", function () {

        $.ajax({
            url: window.location.href + "/delete-cmt",
            type: 'post',
            data: { comment_id: comment_delete_id },
            success: function () {
                console.log("succesfully");
            },
            error: function (e) {
                console.log(e.message);
            }
        });

        $(".btn-open-modal-delete-cmt").each(function () {
            if (comment_delete_id == $(this).attr("comment_id")) {
                $(this).closest(".comment-box").remove();
                // let card_id = $(this).closest(".list-cmt").closest(".task-retro").attr("card_id");
                // $('.icon-comment').each(function () {
                //     console.log(card_id);
                //     console.log("-----");
                //     console.log($(this).closest(".task-retro").attr("card_id"));
                //     if ($(this).closest(".task-retro").attr("card_id") == card_id) {
                //         let new_total_cmt = parseInt($(this).text());
                //         new_total_cmt--;
                //         $(this).text(new_total_cmt.toString() + " ");
                //     }
                // });
            }
        });
    });

});

