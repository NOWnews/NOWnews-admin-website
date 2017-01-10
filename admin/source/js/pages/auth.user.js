$(function() {
    $("#user-table").DataTable({
        displayLength: 50,
    });

    $('.delete-user').on('click', function(){
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/user/' + id,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });
    });});
