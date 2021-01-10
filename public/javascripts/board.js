$(document).ready(function () {

    //Xoa icon thung rac khi con 1 column
    var total_columns = $('.board-body').attr("total_columns");
    var max_vote = $('.board-body').attr("max_vote");
    if (total_columns == 1) {
        $('.icon-trash').hide();
    }


    var list_col_id = [];
    $(".col-retro").each(function () {
        list_col_id.push($(this).attr("column_id"));
    });

    var drake = window.dragula();
    setupDragula();
    function setupDragula() {
        drake.destroy();
        //Drag & drop bang dragula js
        let container = [];
        for (let i = 0; i < list_col_id.length; i++) {
            container[i] = document.getElementById("drag-item-" + list_col_id[i].toString());
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
           
            let column_id = $(el).parents(".drag-task").attr("id");
            column_id = column_id.replace("drag-item-", "");
            console.log(column_id);
            let list_card_id = [];
            $(el).parents(".drag-task").children(".task-retro").each(function(){
                list_card_id.push($(this).attr("card_id"));
            });
            console.log(list_card_id);

            $.ajax({
                url: window.location.href + "/update-drag-drop",
                type: 'post',
                data: { column_id,list_card_id: JSON.stringify(list_card_id) },
                success: function (data) {               
                    console.log(data);
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        });
    }



    $(".list-cmt").hide();
    $(document).on("click", ".icon-open-comment", function () {
        let parent = $(this).closest(".task-retro");
        parent.find(".list-cmt").show();
    });

    $(document).on("click", ".icon-close-cmt", function () {
        $(this).closest(".list-cmt").hide();
    });

    $(document).on("click", ".btn-add-cmt", async function () {
        let card_id = $(this).closest(".task-retro").attr("card_id");
        let comment_text = $(this).closest(".input-group").find(".current-user-comment-box").val();
        let temp = comment_text.replace(/\s/g, '');
        let comment_id;
        if (temp) {
            await $.ajax({
                url: window.location.href + "/add-cmt",
                type: 'post',
                data: { card_id, comment_text },
                success: function (data) {
                    console.log("succesfully");
                    comment_id = data.comment_id;
                    console.log(data);

                },
                error: function (e) {
                    console.log(e.message);
                }
            });
            console.log(comment_id);
            //add cmt front end
            let comment_owner = $('.board-body').attr("user_name");
            $(this).closest(".list-cmt").find('.form-box-cmt').before($("<div class=\"comment-box mt-3\"><div class=\"d-flex justify-content-between\">"
                + "<div class=\"cmt-owner\"><b>" + comment_owner + ": </b></div><i class=\"fa fa-times btn-open-modal-delete-cmt\" comment_id=" + comment_id
                + " data-toggle=\"modal\" data-target=\"#modaldeleteCMT\"></i>" + "</div>" + comment_text + "</div>"));
        }

        $(this).closest(".list-cmt").find('.current-user-comment-box').val("");
        resetTotalCmt();
    });

    $(document).on("click", ".icon-vote", async function () {

        let card_id = $(this).closest(".task-retro").attr("card_id");
        console.log(card_id);
        if ($(this).hasClass("fa-thumbs-down")) {
            $(this).removeClass("fa-thumbs-down");
            $(this).addClass("fa-thumbs-up");
            max_vote++;
            let new_total_vote = parseInt($(this).text());
            new_total_vote--;
            $(this).text(new_total_vote.toString() + " ");

            await $.ajax({
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
                await $.ajax({
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
                resetTotalCmt();
            }
        });
    });

    function resetTotalCmt() {
        $(".task-retro").each(function () {
            let new_total_comment = 0;
            let current_total_comment = 0;
            $(this).children(".list-cmt").children(".comment-box").map(function () {
                new_total_comment++;
            });
            $(this).children(".info-card").children(".icon-feedback").children(".icon-comment").text(new_total_comment.toString() + " ");
            console.log("-------");
        });
    }

    $(document).on("click", ".btn-add-new-col", function () {
        let board_id = $(".board-body").attr("board_id");
        let column_name = $("#ColName").val();

        if (total_columns < 5) {

            $.ajax({
                url: window.location.href + "/add-column",
                type: 'post',
                data: { board_id, column_name },
                success: function (data) {
                    console.log("succesfully");
                    $(".board-body").append("<div class=\"col-retro\" column_id =" + data.comment_id + "><div class=\"d-flex justify-content-between\">"
                        + "<div class=\"col-name\">" + column_name + "</div><i class=\"fas fa-trash icon-trash btn-open-modal-delete-col\""
                        + "data-toggle=\"modal\" data-target=\"#modaldeleteCol\" column_id =" + data.comment_id + "></i></div>"
                        + "<button type=\"button\" class=\"btn-add-task btn-open-modal-add-card\""
                        + "data-toggle=\"modal\" data-target=\"#AddCardModal\" column_id =" + data.comment_id + ">+</button><div class=\"drag-task\" id=\"drag-item-" +
                        data.comment_id + "\"><div class=\"no-drag\">.</div></div></div>");
                    total_columns++;
                    list_col_id.push(data.comment_id)
                    setupDragula();
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }
        else {
            $('.toast-warning-max-col').toast("show");
        }

    })

    let card_delete_id;
    $(document).on("click", ".btn-open-modal-delete-card", function () {
        card_delete_id = $(this).attr("card_id");
    })

    $(document).on("click", ".btn-delete-card", function () {
        $.ajax({
            url: window.location.href + "/delete-card",
            type: 'post',
            data: { card_id: card_delete_id },
            success: function () {
                console.log("succesfully");
            },
            error: function (e) {
                console.log(e.message);
            }
        });
        $(".task-retro").each(function () {
            if ($(this).attr("card_id") == card_delete_id) {
                $(this).remove();
            }
        })
    });

    //delete column
    let column_delete_id;
    $(document).on("click", ".btn-open-modal-delete-col", function () {
        column_delete_id = $(this).attr("column_id");
    })

    $(document).on("click", ".btn-delete-column", function () {


        $(".btn-open-modal-delete-col").each(function () {
            console.log($(this).attr("column_id"));
            console.log(column_delete_id);
            if ($(this).attr("column_id") == column_delete_id) {
                console.log("-----");
                $(this).parents(".col-retro").remove();
            }
        });
        total_columns--;
        let index = list_col_id.indexOf(column_delete_id);

        if (index > -1) {
           list_col_id.splice(index, 1);
        }
        setupDragula();
        if (total_columns == 1) {
            $('.icon-trash').hide();
        }

        $.ajax({
            url: window.location.href + "/delete-column",
            type: 'post',
            data: { column_id: column_delete_id },
            success: function () {
                console.log("succesfully");
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    });

    //add card
    let column_add_card;
    $(document).on("click", ".btn-open-modal-add-card", function () {
        column_add_card = $(this).attr("column_id");
    });

    $(document).on("click", ".btn-add-new-card", async function () {

        let card_name = $("#CardName").val();
        let card = [];
        await $.ajax({
            url: window.location.href + "/add-card",
            type: 'post',
            data: { card_name, column_id: column_add_card },
            success: function (data) {
                console.log(data);
                card = data;
            },
            error: function (e) {
                console.log(e.message);
            }
        });
        $(".btn-open-modal-add-card").each(function () {
            if ($(this).attr("column_id") == column_add_card) {
                // $(this).parents(".col-retro").find(".drag-task").append("<p>hello</p>");
                $(this).parents(".col-retro").find(".drag-task").append("<div class=\"task-retro\" card_id="
                    + card.card_id + "><div class=\"d-flex justify-content-between\"><div class=\"task-name\">"
                    + card_name + "</div><div class=\"row mr-3\"><i class=\"fas fa-pen icon-open-comment\"></i><i class=\"fa fa-times btn-open-modal-delete-card\" card_id="
                    + card.card_id + " data-toggle=\"modal\" data-target=\"#modaldeletecard\"></i></div></div>"
                    + "<div class=\"d-flex justify-content-between info-card\"><div class=\"task-owner\">"
                    + card.card_owner + "</div><div class=\"icon-feedback pr-3\"><i class=\"fas fa-thumbs-up mr-3 icon-vote\"> 0</i>"
                    + "<i class='fas fa-comment-alt icon-comment'> 0</i></div></div><div class=\"list-cmt\">"
                    + "<div class=\"input-group pt-3 form-box-cmt\" style=\"padding-left:3%;padding-right:15%\">"
                    + "<textarea class=\"current-user-comment-box form-control\" rows=\"1\" style=\"resize:none\"placeholder=\"Enter your comment...\"></textarea>"
                    + "<span class=\"input-group-addon btn btn-primary btn-add-cmt\">Send</span></div><div class=\"icon-close-cmt\">"
                    + "<i class=\"fa fa-sort-up\"></i></div></div></div>");
            }
            $(".list-cmt").hide();

        });
    });

});


