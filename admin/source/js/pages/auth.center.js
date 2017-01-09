$(function () {
    // Group 列表、排序處理
    // https://datatables.net/examples/advanced_init/row_grouping.html
    var table = $('#center-table').DataTable({
        "columnDefs": [
            { "visible": false, "targets": 0 }
        ],
        "order": [[ 0, 'asc' ]],
        "displayLength": 50,
        "drawCallback": function (settings) {
            var api = this.api();
            var rows = api.rows( {page:'current'}).nodes();
            var last = null;

            api.column(0, { page: 'current' })
            .data()
            .each( function(group, i) {
                if (last !== group) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="2">'+group+'</td></tr>'
                    );
                    last = group;
                }
            });
        }
    });

    $('#center-table tbody').on('click', 'tr.group', function(){
        var currentOrder = table.order()[0];
        if ( currentOrder[0] === 0 && currentOrder[1] === 'asc') {
            table.order([ 0, 'desc']).draw();
        } else {
            table.order([ 0, 'asc']).draw();
        }
    });

});
