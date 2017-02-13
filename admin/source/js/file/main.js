/* global $, window */

$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
        url: 'http://61.67.121.56:10000/images/upload',
        paramName: 'image',
        uploadTemplateId: null,
        downloadTemplateId: null,
        uploadTemplate: function (o) {
            var rows = $();

            $.each(o.files, function (index, file) {
                var row = $($('#template-upload').html());
                row.find('.name').text(file.name);
                if (file.error) {
                    row.find('.error').text(file.error);
                }
                rows = rows.add(row);
            });
            return rows;
        },
        downloadTemplate: function (o) {
            var rows = $();
            $.each(o.files, function (index, file) {
                var row = $($('#template-download').html());
                row.find('.delete').attr('data-id', file._id);
                row.find('.desc').text(file.desc);
                row.find('img').attr('src', file.url);

                if (file.error) {
                    row.find('.error').text(file.error);
                }
                rows = rows.add(row);
            });
            return rows;
        },
        destroy: function (e, data) {
            var that = this;
            $.ajax({
                url: '/image/' + data.id + '/realRemove',
                type: 'DELETE',
                success: function(result) {
                    $.blueimp.fileupload.prototype.options.destroy.call(that, e, data);
                }
            });
        },
        submit: function (e, data) {
            var file = data.files[0];
            var elmName = $('p.name:contains("' + file.name + '")');
            var desc = elmName.parent().find('input[name=desc]').val();
            data.formData = {
                desc: desc,
                type: 'NEWS',
                CreatedBy: $('#userId').val(),
            };
        },
        getFilesFromResponse: function (data) {
            return [data.result];
        },
    });
});
