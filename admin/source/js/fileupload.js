/* global $, window */
/*
程式碼結構：
- 公用變數
- 初始化
- 共用
- 上傳
- 圖庫
*/
$(function () {
    'use strict';

    /* 公用變數 */
    var apiServ = 'http://61.67.121.56:10000/';
    var fileuploadElm = $('#fileupload');
    var fileRows = $('tbody.files');
    var imageBlocks = $('.image-blocks');
    var URL = window.URL || window.webkitURL;


    /* 初始化 */
    initQueryFrom();
    function initQueryFrom() {
        var today = moment().format('YYYY-MM-DD');
        var prev2Month = moment().subtract(2, 'months').format('YYYY-MM-DD');
        var startElm = $('input[name=startedAt]');
        var endElm = $('input[name=endedAt]');
        startElm.val(prev2Month);
        startElm.attr('max', today);
        endElm.val(today);
        endElm.attr('max', today);
    }


    /* 共用 */
    
    // Setting Image To Content
    $('button.copy').on('click', function() {
        var doc = $('iframe#clipboard-source').contents()[0];
        var downloadForClipboard = $('input:checkbox[name=downloadForClipboard]:checked');
        var libForClipboard = $('input:checkbox[name=libForClipboard]:checked');
        var htmlString = '';

        function generateString (index, input) {
            var parentBlock = $(input).parent().parent();
            var url = parentBlock.find('img.image').attr('src');
            var desc = parentBlock.find('.desc').html();           
            var layout = "<p><img src='@URL@'/><br/><span>@DESC@</span></p>";
            layout = layout.replace('@URL@', url);
            htmlString += layout.replace('@DESC@', desc);
        }


        $.each(libForClipboard, generateString);
        $.each(downloadForClipboard, generateString);

        doc.write(htmlString);
        doc.execCommand("SelectAll", true);
        doc.execCommand("Copy", true);
        doc.execCommand("Delete", true);
        doc.close('')
        doc.write('');
    });
    
    // Setting Image To MainPhoto
    function setMainPhoto (setBtn) {
        $('input[name=MainPhoto]').val(setBtn.attr('data-id'));
        $('img[name=MainPhoto]').attr('src', setBtn.attr('data-url'));
    }


    /* 上傳 */
    // Initialize the jQuery File Upload widget:
    fileuploadElm.fileupload({
        downloadTemplateId: null,
        paramName: 'image',
        url: apiServ + 'images/upload',
        uploadTemplateId: null,
        destroy: function (e, data) {
            var that = this;
            // 自己上傳的當下可以真刪除
            $.ajax({
                url: '/image/' + data.id + '/realRemove',
                type: 'DELETE',
                success: function(result) {
                    // 再去呼叫原生 library destroy 該做的事情
                    $.blueimp.fileupload.prototype.options.destroy.call(that, e, data);
                }
            });
        },
        downloadTemplate: function (o) {
            var rows = $();
            $.each(o.files, function (index, file) {
                var row = $($('#template-download').html());
                row.find('.delete').attr('data-id', file._id);
                row.find('.setMainPhoto').attr('data-id', file._id);
                row.find('.setMainPhoto').attr('data-url', file.url);
                row.find('.desc').text(file.desc);
                row.find('img').attr('src', file.url);

                if (file.error) {
                    row.find('.setMainPhoto').addClass('hidden');
                    row.find('.delete').addClass('hidden');
                    row.find('.cancel').removeClass('hidden');
                    row.find('.error').text(file.error);
                }
                rows = rows.add(row);
            });
            return rows;
        },
        getFilesFromResponse: function (data) {
            return [data.result];
        },
        submit: function (e, data) {
            var nextRow = $(data.context).next();
            var desc = $(data.context).find('input[name=desc]').val();
            data.formData = {
                desc: desc,
                type: 'NEWS',
                CreatedBy: $('#userId').val(),
            };

            if (nextRow.attr('id') === 'crop-row') {
                nextRow.remove();
            }
        },
        uploadTemplate: function (o) {
            var rows = $();
            $.each(o.files, function (index, file) {
                var blobURL = URL.createObjectURL(file);
                var row = $($('#template-upload').html());
                row.find('button.crop').attr('data-blobURL', blobURL);
                if (file.error) {
                    row.find('.crop').addClass('hidden');
                    row.find('.start').addClass('hidden');
                    row.find('.error').text(file.error);
                }
                rows = rows.add(row);
            });
            return rows;
        },

    });

    fileuploadElm.bind('fileuploadcompleted', function (e, data) {
        $('.zoom').trigger('zoom.destroy');
        $('.zoom').zoom();
    });

    // 設為主圖
    fileRows.on('click', 'button.setMainPhoto', function(){
        setMainPhoto($(this));
    });

    // 上傳前的圖片切割
    fileRows.on('click', 'button.crop', function(){
        var cropButton = $(this);
        var cropRow = $($('#template-crop').html());
        var cropImgElm = cropRow.find('img');
        var imageRow = cropButton.parent().parent();
        cropRow.insertAfter(imageRow);
        cropButton.addClass('hidden');
        imageRow.find('.cancel').addClass('hidden');

        cropImgElm.attr('src', cropButton.attr('data-blobURL'));
        cropImgElm.cropper({
            aspectRatio: 16 / 9,
            viewMode: 1,
            zoomable: false,
        });
    });

    // 圖片切割確認
    fileRows.on('click', 'button.confirm', function(){
        var confirmButton = $(this);
        var imageRow = confirmButton.closest('#crop-row').prev();
        var cropImgElm = confirmButton.parent().parent().find('#crop-img');
        cropImgElm.cropper('getCroppedCanvas').toBlob(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            $('.template-upload').data('data').files[0] = blob;
            imageRow.find('.upload-img').attr('src', blobURL);
            imageRow.find('.upload-img').removeClass('hidden');
            imageRow.find('.cancel').removeClass('hidden');
            imageRow.find('canvas').remove();
            $('#crop-row').remove();
            return;
        });
    });


    /* 圖庫 */
    $('.imageLibQueryForm').on('click', function(e) {
        imageBlocks.html('');
        var queryString = 'startedAt=' + $('input[name=startedAt]').val();
        queryString += '&endedAt=' + $('input[name=endedAt]').val();
        queryString += '&desc=' + $('input[name=desc]').val();
        var desc = $('input[name=desc]').val();
        $.get('/image?' + queryString, function(result) {
            $('.zoom').trigger('zoom.destroy');
            $.each(result.images, function(index, image) {
                var block = $($('#template-image-block').html());
                block.find('img').attr('src', image.url);
                block.find('.desc').text(image.desc);
                block.find('.fa-trash').attr('data-id', image._id);
                block.find('.fa-check').attr('data-id', image._id);
                block.find('.fa-check').attr('data-url', image.url);
                imageBlocks.append(block);
            });
            $('.zoom').zoom();
        });
    });

    imageBlocks.on('click', 'button.fa-trash', function(e, c) {
        // 從 library 取得是假刪除
        var confirmed = confirm('您確定要刪除嗎？');
        if (!confirmed) {
            return;
        }
        var deleteBtn = $(this);
        $.ajax({
            url: '/image/' + deleteBtn.attr('data-id'),
            type: 'DELETE',
        }).done(function(result) {
            deleteBtn.parent().parent().remove();
        });
    });

    imageBlocks.on('click', 'button.fa-check', function(e, c) {
        setMainPhoto($(this));
    });
});
