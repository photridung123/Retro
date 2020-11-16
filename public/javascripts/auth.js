$("document").ready(function () {

    $('#username').tooltip({ trigger: 'manual' });
    $('#password').tooltip({ trigger: 'manual' });
    $('#email').tooltip({ trigger: 'manual' });
    $('#term').tooltip({ trigger: 'manual' });

    $("#forgotAlert").hide();

    // on submit checking
    $("#registerForm").on("submit", function (e) {

        if ($("#username").val() === "") {
            e.preventDefault(e);
            $("#username").tooltip("show");
            return false;
        }

        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            e.preventDefault(e);
            $("#email").tooltip("show");
            return false;
        }

        if ($("#password").val() === "" || $("#password").val().length < 8 || $("#password").val().length > 25) {
            e.preventDefault(e);
            $("#password").tooltip("show");
            return false;
        }

        if (!$("#term").is(':checked')) {
            e.preventDefault(e);
            $("#term").tooltip("show");
            return false;
        }
    });

    // on submit checking
    $("#loginForm").on("submit", function (e) {
        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            e.preventDefault(e);
            $("#email").tooltip("show");
            return false;
        }

        if ($("#password").val() === "" || $("#password").val().length < 8 || $("#password").val().length > 25) {
            e.preventDefault(e);
            $("#password").tooltip("show");
            return false;
        }
    });

    //on submit checking
    $("#forgotForm").on("submit", function (e) {
        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            e.preventDefault(e);
            $("#email").tooltip("show");
            return false;
        }
        else {
            e.preventDefault(e);
            $(".inputBoxForgot").css("height", "400px");
            $("#forgotAlert").show();
            let postdata = $("#forgotForm").serialize();
            $.post("forgot", postdata)
        }
    });


    // on hover to show tooltip or not
    $("#username").mousemove(function () {
        if ($("#username").val() != "") {
            $("#username").tooltip("hide");
            $("#username").removeAttr("title");
        }
        else {
            $("#username").attr("title", "Please enter your username");
        }
    })

    $("#password").mousemove(function () {
        if ($("#password").val().length >= 8 && $("#password").val().length <= 25) {
            $("#password").tooltip("hide");
            $("#password").removeAttr("title");
        }
        else {
            $("#password").attr("title", "Please enter your password ( within length limit )");
        }
    })

    $("#email").mousemove(function () {
        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test($("#email").val())) {
            $("#email").tooltip("hide");
            $("#email").removeAttr("title");
        }
        else {
            $("#email").attr("title", "Invalid email syntax ( example: abc@xyz.com )");
        }
    })

    $("#term").mousemove(function () {
        if ($("#term").is(':checked')) {
            $("#term").tooltip("hide");
            $("#term").removeAttr("title");
        }
        else {
            $("#term").attr("title", "Please check this box if you want to proceed")
        }
    })
})
