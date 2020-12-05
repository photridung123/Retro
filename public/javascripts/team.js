$("document").ready(function () {
    // teamname = {}; // lưu team name khi tạo team mới
    // $("#okBtn").click(function () {
    //     teamname = $("#teamname").val();
    //     $('#createTeamModal').modal('hide');
    //     $("#teamname").val('');
    // })
    let current = 4;
    $(".memberIncresement").click(function(){
        let my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" placeholder=\"Member's email\"></div>";
        $(".input-boxes").append(my);
        ++current;
    })

    $(".inviteBtn").click(function(){
        $(".input-boxes").html("");
        current = 1;
        while(current<4)
        {
            my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" placeholder=\"Member's email\"></div>";
            $(".input-boxes").append(my);
            ++current;
        }
    })
    $("#addMoreMemberModal").on("hidden.bs.modal", function () {
        $(".input-boxes").html("");
        current = 1;
        while(current<4)
        {
            my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" placeholder=\"Member's email\"></div>";
            $(".input-boxes").append(my);
            ++current;
        }
    })
})

