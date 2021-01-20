$("document").ready(function () {

    if ($("#registerFailed").length) {
        $(".inputBoxRegister").css("height", "600px");
    }
    else {
        $("#registerOnLoad").hide();
    }

    if ($("#loginFailed").length) {
        $(".inputBoxLogin").css("height", "500px");
    }
    else {
        $("#loginOnLoad").hide();
    }

    $("#forgotAlert").hide();
    
    $('#password').on('input', function () {
        $('#password')[0].setCustomValidity("");
        $("#password")[0].reportValidity();
    });

    $('#username').on('input', function () {
        $('#username')[0].setCustomValidity("");
        $("#username")[0].reportValidity();
    });

    // on submit checking
    $("#registerForm").on("submit", function (e) {
        if ($("#password").val() === "" || $("#password").val().length < 8 || $("#password").val().length > 25) {
            e.preventDefault(e);
            $("#password")[0].setCustomValidity("Please enter your password ( within length limit: 8-25 ).");
            $("#password")[0].reportValidity();
            return false;
        }

        if (!$("#term").is(':checked')) {
            e.preventDefault(e);
            $("#term")[0].setCustomValidity("Please check this box if you want to proceed.");
            $("#term")[0].reportValidity();
            return false;
        }
    });

    //on submit checking
    $("#loginForm").on("submit", function (e) {
        if ($("#password").val() === "" || $("#password").val().length < 8 || $("#password").val().length > 25) {
            e.preventDefault(e);
            $("#password")[0].setCustomValidity("Please enter your password ( within length limit: 8-25 ).");
            $("#password")[0].reportValidity();
            return false;
        }
    });

    //on submit checking
    $("#forgotForm").on("submit", function (e) {
        e.preventDefault(e);
        $(".inputBoxForgot").css("height", "400px");
        $("#forgotAlert").show();
    });
})
