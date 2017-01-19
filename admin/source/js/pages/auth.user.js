$(function() {

    $(document).ready(function() {

        $('#center-and-dept').select2();

        $('#center-and-dept').on('select2:select', function (e) {
            var departmentElm = $(e.params.data.element);
            var centerId = departmentElm.parent().attr('id');
            var departmentId = departmentElm.val();
            $('input[name=Center]').val(centerId);
            $('input[name=Department]').val(departmentId);
        });

    });

    $('#user-table').DataTable({
        displayLength: 50,
    });

    $('.delete-user').on('click', function(){
        var confirmed = confirm('您確定要刪除嗎？');
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/user/' + id,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });
    });

});
