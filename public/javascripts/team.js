$("document").ready(function () {
    let member;
    let current = 4;
    let team;
    let userId;
    let teamNumber;
    let type;

    $.ajax({
        type: "GET",
        url: '/account/user/type',
        dataType: "json",
        success: function (data){
            type = data.type;
        }
    })

    $.ajax({
        type: "GET",
        url: '/account/user/team-number',
        dataType: "json",
        success: function (data){
            teamNumber = data.teamNumber;
        }
    })

    $.ajax({
        type: "GET",
        url: '/account/user/id',
        dataType: "json",
        success: function (data){
            userId = data.id;
        }
    })

    $(".memberIncresement").click(function(){
        let my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" name=\"member"+ current.toString()+"\" placeholder=\"Member's email\" +  autocomplete=\"new-email\"></div>";
        $(".input-boxes").append(my);
        ++current;
    })

    $(".inviteBtn").click(function(e){
        e.preventDefault();

        number = 1;
        $("input", $(".input-boxes")).each(function () {
            if($(this).val()!=0)
            {
                $(this).attr("name","member"+number);
                ++number;
            }
            else
            {
                $(this).remove();
            }
        });
        --number;

        let mydata = $("#inviteForm").serialize()+"&numOfBox=" + number;


        $.ajax({
            type: "POST",
            url: '/team/addMem',
            dataType : "json",
            data: mydata,
            success: function (data){
                if( typeof(data.redirect) == "string" )
                    window.location = data.redirect
            }
          });
        
        $(".input-boxes").html("");
        current = 1;
        while(current<4)
        {
            let my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" name=\"member"+ current.toString()+"\" placeholder=\"Member's email\" +  autocomplete=\"new-email\"></div>";
            $(".input-boxes").append(my);
            ++current;
        }
    })

    $("#addMoreMemberModal").on("hidden.bs.modal", function () {
        $(".input-boxes").html("");
        current = 1;
        while(current<4)
        {
            let my = "<div class=\"pt-2\"><input type=\"text\" class=\"myteam-input\" id=\"member"+ current.toString() +"\" name=\"member"+ current.toString()+"\" placeholder=\"Member's email\" +  autocomplete=\"new-email\"></div>";
            $(".input-boxes").append(my);
            ++current;
        }
    })

    $(".delete-member").on("click", function () {
        member = $(this).parent();
    })

    $("#delTeaBtn").on("click", function () {
        team = $(this).parent().parent().parent().parent().parent();
    })

    $("#leaTeaBtn").on("click", function () {
        team = $(this).parent().parent().parent().parent().parent();
    })

    $("#delTeamBtn").on("click", function() {
        let mydata = team.attr("name");
        teamNumber = 1;
        $.ajax({
            type: "POST",
            url: '/team/delTeamBoard'
          });
        $.ajax({
            type: "POST",
            url: '/team/delTeam',
            dataType : "json",
            data: {
                id: mydata
            }
          });
        $.ajax({
            type: "POST",
            url: '/account/change/team-number',
            dataType : "json",
            data: {
                teamNumber: parseInt(1)
            }
            });
        team.remove();
    })

    $("#leaveTeamBtn").on("click", function() {
        let mydata = team.attr("name");
        let userid = userId;
        $.ajax({
            type: "POST",
            url: '/team/leaTeam',
            dataType : "json",
            data: {
                teamid: mydata,
                userid: userid
            }
          });
        team.remove();
    })

    $("#delMemberBtn").on("click", function() {
        let mydata = member.children(".member-info").attr("name");
        $.ajax({
            type: "POST",
            url: '/team/delMem',
            dataType : "json",
            data: {
                id: mydata
            }
          });
        member.remove();
    })

    // $("#addNewTeamButton").on("mouseenter",function(){
    //     if(teamNumber === 0) {
    //         $("#addNewTeamButton").prop("disabled", true);   
    //     } else {
    //         $("#addNewTeamButton").prop("disabled", false);   
    //     }
    // });

    $("#addNewTeamButton").on("click",function(){
        if(teamNumber === 0 && type=="basic") {
            $('#warningCantCreateTeamBasic').modal('show'); 
        }
        if(teamNumber === 0 && type=="premium") {
            $('#warningCantCreateTeamPremimum').modal('show'); 
        }

        if(teamNumber === 1) {
            $('#createTeamModal').modal('show');
        }
    });
})

