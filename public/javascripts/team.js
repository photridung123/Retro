$("document").ready(function () {
    data = {};
    $("#okBtn").click(function () {
        data = $("#teamname").val();
        console.log(data);
        $('#createTeamModal').modal('hide');
        $("#teamname").val('');
    })
})