$(function() {
    // Group 列表、排序處理
    // https://datatables.net/examples/advanced_init/row_grouping.html
    var table = $('#center-table').DataTable({
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

    $('#center-table tbody').on('click', 'tr.group', function() {
        var currentOrder = table.order()[0];
        if (currentOrder[0] === 0 && currentOrder[1] === 'asc') {
            table.order([0, 'desc']).draw();
        } else {
            table.order([0, 'asc']).draw();
        }
    });

    $('#delete-center').on('click', function() {
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $('input[name=id]').val();
        console.log(id);
        $.ajax({
            url: '/auth/center/' + id,
            type: 'DELETE',
            success: function(result) {
                location.href = '/auth/center';
            }
        });
    });

    // Department
    $('.delete-department').on('click', function(){
        var confirmed = confirm("您確定要刪除嗎？");
        if (!confirmed) { return; }
        var id = $(this).prev().val();
        $.ajax({
            url: '/auth/department/' + id,
            type: 'DELETE',
            success: function(result) {
                location.reload();
            }
        });
    });
});
