$("document").ready(function(){

    $("#changeEmailModal").on("hidden.bs.modal", function () {
        $("#alertWrongPassword").removeClass('passwordAlert').html('');
        $("#newEmail").val('');
        $("#password").val('');
    })

    $("#changeEmailButton").click(function(e){
        e.preventDefault(e);

        if($("#newEmail").val()==$("#user_email").attr("name")){
            $("#alertWrongPassword").addClass('passwordAlert').html('This is your current email. Please choose a different one.');
            return false;
        }

        if($("#newEmail").val()==''){
            $("#alertWrongPassword").addClass('passwordAlert').html('Please enter your new email');
            return false;
        }

        if($("#password").val()==''){
            $("#alertWrongPassword").addClass('passwordAlert').html('Please enter your password');
            return false;
        }

        data = $("#changeEmailForm").serialize();
        $.ajax({
            type: "POST",
            url: "/account/change/email",
            dataType: "json",
            data: data,
            success: function(data) {
                if(data.change == 1){
                    window.location = "/account"
                }
                else{
                    $("#alertWrongPassword").addClass('passwordAlert').html('Password is wrong. Please retype your password.');
                }
            }
        })
    })

    $("#updateUserInfoButton").click(function(e){
        e.preventDefault(e);
        let name;
        if($("#name").val()=='')
        {
            name = $("#name").attr("placeholder");
        }
        else
        {
            name = $("#name").val();
        }

        data = {
            newUserName: name,
        }
        
        $.ajax({
            type: "POST",
            url: "/account/change/username",
            dataType: "json",
            data: data,
            success: function(data) {
                if(data.respond){
                    $("#navbarDropdownMenuLink-4").get(0).firstChild.nodeValue = name+" ";
                    $("#name").attr("placeholder",name);
                }
            }
        })

        let file = $("#newImage")[0].files[0];
        let formdata = new FormData();
        formdata.append("newImage", file);

        $.ajax({
            type: "POST",
            url: "/account/change/avatar",
            dataType: "json",
            data: formdata,
            processData: false,
            contentType: false,
            success: function(data) {
                if(data.imageUrl != "undefined") {
                    url = data.imageUrl;
                    string = "?" + new Date().getTime();
                    $("#userAvatar").attr("src",url + string);
                }
            }
        })
    })

    $("#payment-history").children().eq(0).addClass("table-primary").removeClass("table-danger");
})