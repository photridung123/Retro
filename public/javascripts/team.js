$("document").ready(function () {
    let member;
    let current = 4;
    let team;
    let type;

    $.ajax({
        type: "POST",
        url: '/account/user/type',
        dataType: "json",
        data: {
            data: "get"
        },
        success: function (data){
            type = data.type;
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

    $("#delTeamBtn").on("click", function() {
        let mydata = team.attr("name");
        $.ajax({
            type: "POST",
            url: '/team/delTeam',
            dataType : "json",
            data: {
                id: mydata
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

    $("#addNewTeamButton").on("mouseenter",function(){
        if($("#delTeaBtn").length || type=="basic") {
            $("#addNewTeamButton").prop("disabled", true);   
        }
    })
    $("#delTeamBtn").on("click",function(){
        $("#addNewTeamButton").prop("disabled", false);   
    })
})

