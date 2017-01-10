$(function() {
    $("#role-table").DataTable({
        displayLength: 50,
    });

    $('.delete-role').on('click', function(){
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/rule/' + id,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });
    });});
