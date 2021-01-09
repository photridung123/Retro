$.noConflict();
$("document").ready(function(){

    setInterval(function () {
        url = $("#userAvatar").attr("src");
        if(url){
            string = "?" + new Date().getTime();
            $("#userAvatar").attr("src",url + string);
        }
    }, 5000);
})