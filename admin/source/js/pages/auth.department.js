$(function() {
    // Group 列表、排序處理
    // https://datatables.net/examples/advanced_init/row_grouping.html
    var table = $('#department-table').DataTable({
        columnDefs: [{ visible: false, targets: 0 }],
        order: [[0, 'asc']],
        displayLength: 50,
        drawCallback: function(settings) {
            var api = this.api();
            var rows = api.rows({ page: 'current' }).nodes();
            var last = null;

            api.column(0, { page: 'current' })
                .data()
                .each(function(group, i) {
                    if (last === group) { return; }
                    var trDom = '<tr class="group"><td colspan="2">' + group + '</td></tr>';
                    $(rows).eq(i).before(trDom);
                    last = group;
                });
        }
    });

    $('#delete-department').on('click', function() {
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $('input[name=id]').val();
        $.ajax({
            url: '/auth/department/' + id,
            type: 'DELETE',
            success: function(result) {
                window.location.href = '/auth/department';
            }
        });
    });

    // Center
    $('#creaet-center-form').on('submit', function(e) {
        var url = $(this).attr('action');
        var data = $(this).serialize();
        $.post(url, data, function() {
            window.location.reload();
        });
        return false;
    });

    $('.save-center').on('click', function(e){
        var name = $(this).prev().val().trim();
        if (name.length === 0) return false;
        var centerId = $(this).next().val();
        $.ajax({
            url: '/auth/center/' + centerId,
            type: 'PUT',
            data: 'name=' + name,
            success: function(data){
                window.location.reload();
            }
        });
    });

    $('.delete-center').on('click', function(){
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/center/' + id,
            type: 'DELETE',
            success: function(result) {
                window.location.reload();
            }
        });
    });
});
