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
        let data;
        if($("#name").val()=='')
        {
            data = $("#name").attr("placeholder");
        }
        else
        {
            data = $("#name").val();
        }

        mydata = {
            newUserName: data
        }
        
        $.ajax({
            type: "POST",
            url: "/account/change/username",
            dataType: "json",
            data: mydata,
            success: function(data) {
                if( typeof(data.redirect) == "string" )
                window.location = data.redirect
            }
        })
    })
})