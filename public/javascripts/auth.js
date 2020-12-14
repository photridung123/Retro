$("document").ready(function () {

    // $('#username').tooltip({ trigger: 'manual' });
    // $('#password').tooltip({ trigger: 'manual' });
    // $('#email').tooltip({ trigger: 'manual' });
    // $('#term').tooltip({ trigger: 'manual' });

    $("#forgotAlert").hide();
    
    $('#email').on('input', function() {
        $('#email')[0].setCustomValidity("");
        $("#email")[0].reportValidity();
      });

    $('#password').on('input', function() {
        $('#password')[0].setCustomValidity("");
        $("#password")[0].reportValidity();
      });

    // on submit checking
    $("#registerForm").on("submit", function (e) {

        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            e.preventDefault(e);
            $("#email")[0].setCustomValidity("Invalid email syntax ( example: abc@xyz.com ).");
            $("#email")[0].reportValidity();
            return false;
        }

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

    // on submit checking
    $("#loginForm").on("submit", function (e) {
        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            console.log("invalid")
            e.preventDefault(e);
            $("#email")[0].setCustomValidity("Invalid email syntax ( example: abc@xyz.com ).");
            $("#email")[0].reportValidity();
            return false;
        }
        if ($("#password").val() === "" || $("#password").val().length < 8 || $("#password").val().length > 25) {
            e.preventDefault(e);
            $("#password")[0].setCustomValidity("Please enter your password ( within length limit: 8-25 ).");
            $("#password")[0].reportValidity();
            return false;
        }
    });

    //on submit checking
    $("#forgotForm").on("submit", function (e) {
        let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!testEmail.test($("#email").val())) {
            e.preventDefault(e);
            $("#email")[0].setCustomValidity("Invalid email syntax ( example: abc@xyz.com ).");
            $("#email")[0].reportValidity();
            return false;
        }
        else {
            e.preventDefault(e);
            $(".inputBoxForgot").css("height", "400px");
            $("#forgotAlert").show();
            let postdata = $("#forgotForm").serialize();
            $.post("forgot", postdata);
        }
    });
})
