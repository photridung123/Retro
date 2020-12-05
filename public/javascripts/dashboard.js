$(document).ready(function () {

    $('#get-id-alert').hide();

    $('.copy-url').on('click', function () {
        var $temp = $("<input>");
        var $url = $('.copy-url').attr('value');
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();

        $('#get-id-alert').show();
        setTimeout(function () { $('#get-id-alert').hide(); }, 3000);
    })
    let $max_columns = 3;
    $('#btn-add-col').on('click', function () {
        $max_columns++;
        if ($max_columns <= 10) {
            // var $test = "<input type=\"text\" class=\"form-control mb-3\" id=\"column-" + $max_columns.toString()+ "\ placeholder=\"Enter name column\">";
            var $temp = $("<input type=\"text\" class=\"form-control mb-3\" id=\"column-" + $max_columns.toString() + "\" placeholder=\"Enter name column\">");
            // console.log($test);
            $("#Columns").append($temp);
        }
    })
    $('.reset-btn').on('click', function () {
        $max_columns = 3;
        var $temp = $("<label for=\"Columns\"><strong>Columns</strong></label>");
        $("#Columns").html($temp);

        for (let i = 1; i <= 3; i++) {
            $temp = $("<input type=\"text\" class=\"form-control mb-3\" id=\"column-" + i.toString() + "\" placeholder=\"Enter name column\">");
            $("#Columns").append($temp);
        }
    });
});