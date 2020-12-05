$(document).ready(function () {

    $('#get-id-alert').hide();
 
    $('.copy-url').on('click', function () {
        var $temp = $("<input>");
        console.log("checked");
        var $url = $('.copy-url').attr('value');
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();

        $('#get-id-alert').show();
        setTimeout( function(){$('#get-id-alert').hide(); }, 3000);
    })

});