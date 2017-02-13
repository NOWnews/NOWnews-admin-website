/* global $, window */

$(function () {
    'use strict';

    // 預設日期
    var today = moment().format('YYYY-MM-DD');
    var prev2Month = moment().subtract(2, 'months').format('YYYY-MM-DD');
    var imageLibQueryForm = $('#image-library-query-form');
    imageLibQueryForm.find('input[name=startedAt]').val(prev2Month);
    imageLibQueryForm.find('input[name=startedAt]').attr('max', today);
    imageLibQueryForm.find('input[name=endedAt]').val(today);
    imageLibQueryForm.find('input[name=endedAt]').attr('max', today);


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

    imageLibQueryForm.submit(function(e) {
        $('.image-blocks').html("");

        $.get('/image?' + $(this).serialize(), function(result) {
            $.each(result.images, function(index, image) {
                var block = $($('#template-image-block').html());
                block.find('img').attr('src', image.url);
                block.find('.desc').text(image.desc);
                block.find('.fa-trash').attr('data-id', image._id);
                $('.image-blocks').append(block);
            });
        });
        return false;
    });

    $('.image-blocks').on('click', '.fa-trash', function(e,c) {
        var confirmed = confirm('您確定要刪除嗎？');
        if (!confirmed) { return; }
        var deleteBtn = $(this);
        $.ajax({
            url: '/image/' + deleteBtn.attr('data-id'),
            type: 'DELETE',
        }).done(function(result) {
            deleteBtn.parent().remove();
        });
    });
});
