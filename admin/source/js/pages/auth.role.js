$(function() {
    $('#role-table').DataTable({
        displayLength: 50,
    });

    $('form.role-form').on('submit', function(){
        isEmptyForPolicies = $('input[name=Policies]:checked').length === 0;
        if (isEmptyForPolicies) {
            return false;
        }
    });

    $('.delete-role').on('click', function(){
        var confirmed = confirm('您確定要刪除嗎？');
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/role/' + id,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });
    });});
