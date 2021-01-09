
$(document).ready(function () {

    $('#get-id-alert').hide();

    $(document).on('click','.copy-url', function () {
        var $temp = $("<input>");
        var $url = $(this).attr('value');
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();

        $('#get-id-alert').show();
        setTimeout(function () { $('#get-id-alert').hide(); }, 3000);
    });

    var $max_columns = 3;
    $('#btn-add-col-form').on('click', function () {
        if ($max_columns < 5) {
            $max_columns++;
            $("#Columns").append('<div class="control">\
                                <i class="fas fa-times-circle d-block icon_remove" aria-hidden="true"></i>\
                                <input type="text" class="form-control mb-3" id="col'+ $max_columns.toString() + '" placeholder="Enter name column">\
                                 </div>');
        }
    })


    jQuery(document).on('click', '.icon_remove', function () {
        if ($max_columns > 1) {
            $max_columns--;
            jQuery(this).parent().remove();
            return false;
        }
    });

    var owner_id;
    $('.btn-open-form-add-board').on("click", function () {
        owner_id = $(this).attr("owner_id");
    });

    function format_date(date) {

        let current_datetime = new Date(date);
        const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return current_datetime.getDate()  + " " + months[current_datetime.getMonth()];
    };

    $('.btn-add-board').on("click", function () {

        let list_col = [];
        for (let i = 1; i <= 5; i++) {
            list_col.push($("#col" + i.toString()).val());
        }
        let board_name = $("#BoardName").val();
        let max_vote = $("#MaxVote").val();
        $.ajax({
            url: window.location.href + "/create-board",
            type: 'post',
            data: { board_name, max_vote, list_col: JSON.stringify(list_col), owner_id },
            success: function (data) {
                let board = data.new_board;
                $('.btn-open-form-add-board').each(function () {
                    if ($(this).attr("owner_id") == owner_id) {
                        let new_board = '<a href={{this.board_URL}}><div class="board-cards"><div class="card"><div class="card-body"><h5 class="card-title">'
                            + board.board_name + '</h5><div class="pt-4"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'
                            + '<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />'
                            + '<path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" /></svg> '
                            + format_date(board.date_created) + '<div class="d-inline pl-5">' + board.total_card + ' cards</div></div></div><div class="card-footer">';

                        if ($('.container-board').attr("user_id") == owner_id) {
                            new_board += '<a href="#" class="pl-5 pr-4 card-link copy-url" value="' + board.board_URL +
                                '">Clone</a><a href="#" class="card-link btn-open-modal-delete-board" board_id ='+board._id+' data-toggle="modal" data-target="#ModalDelete">Delete</a></div></div></div></a>';
                        }else{
                            new_board += '<a href="#" class="card-link row justify-content-center btn-open-modal-delete-board" board_id=' +board._id +'data-toggle="modal" data-target="#ModalDelete">Delete</a></div></div></div></a>';
                        }
                        $(this).closest("div").append(new_board);
                    }
                });
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    });

    var board_id;
    $(document).on("click",'.btn-open-modal-delete-board',function(){
        board_id = $(this).attr("board_id");
    })

    $(".btn-delete-board").on("click",function(){

        $.ajax({
            url: window.location.href + "/delete-board",
            type: 'post',
            data: { board_id },
            success: function (data) {
                console.log(data);
                if(data.LackOfPermissions){
                    $('.toast-warning-delete-board').toast('show')
                }else
                $(".btn-open-modal-delete-board").each(function(){
                    if(board_id == $(this).attr("board_id")){
                        $(this).closest(".board-cards").remove();
                    }
                })
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    });
});


