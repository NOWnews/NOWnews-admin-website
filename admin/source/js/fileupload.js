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
    var fileuploadElm = $('#image-file');
    var fileRows = $('tbody.files');
    var imageBlocks = $('.image-blocks');
    var URL = window.URL || window.webkitURL;
    var startElm = $('input[name=imgStartedAt]');
    var endElm = $('input[name=imgEndedAt]');


    /* 初始化 */
    initQueryFrom();
    function initQueryFrom() {
        var today = moment().format('YYYY-MM-DD');
        var prev2Month = moment().subtract(2, 'months').format('YYYY-MM-DD');
        startElm.val(prev2Month);
        startElm.attr('max', today);
        endElm.val(today);
        endElm.attr('max', today);
    }


    /* 共用 */
    function copyIntoClipboard(targetBtn) {
        var doc = $('iframe#clipboard-source').contents()[0];

        var parentBlock = targetBtn.parent().parent();
        var img = parentBlock.find('img.image')[0].outerHTML;
        var desc = parentBlock.find('span.desc')[0].outerHTML;

        // 加上縮圖 api
        var imgUrl = $(img).attr('src');
        var imgWidth = $(img).attr('img-width');
        // 確認是否為 nownews.com 的網域
        if (/http(?:s?):\/\/(.+?\.)?nownews\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/.test(imgUrl)) {
            if (imgWidth && imgWidth > 640) {
                imgWidth = 640;
            }
            var imgSrc = 'https://imgapiv2.nownews.com/?w=' + imgWidth + '&q=85&src=' + imgUrl;
            img = $(img).attr('src', imgSrc)[0].outerHTML;
        }
        var htmlString = "<p>" + img + "<br/>" + desc + "</p>";
        doc.write(htmlString);
        doc.close('');
        doc.execCommand("SelectAll", true);
        doc.execCommand("Copy", true);
    }


    // Setting Image To MainPhoto
    function setMainPhoto (setBtn) {
        var parentElm = setBtn.parent().parent();
        $('input[name=MainPhoto]').val(parentElm.find('input[name=imageId]').val()).trigger('change');
        $('img[name=MainPhoto]').attr('src', setBtn.attr('data-url'));
        $('.preview-desc').text(parentElm.find('.desc').text());
        if(parentElm.find('small.canNotDeliver').length>0){
            $('small.mainPhoto.canNotDeliver').text('不可外送')
        }
        else{
            $('small.mainPhoto.canNotDeliver').text('可外送');
        }
        $('.image-setting-area .btn-collapse').click();
    }

    // Setting Image To ManyPhoto
    function setManyPhoto (setBtn) {
        var parentElm = setBtn.parent().parent();
        var text = parentElm.find('.desc').text();
        var src = setBtn.attr('data-url');
        var imageId = parentElm.find('input[name=imageId]').val();
        var photoGroup = $($('#photo-group-template').html());
        var isIdRepeat = false;

        $('input[name="Photos[]"]').each(function(){
            if ( $(this).val() == imageId ){
                isIdRepeat = true;
                return false;
            }
        });

        if (isIdRepeat) { return false; }

        photoGroup.css('background-image', 'url(' + src + ')');
        photoGroup.find('.previewImg').attr('href', src);
        photoGroup.find('input[name="Photos[]"]').val(imageId).addClass(imageId);
        photoGroup.find('p.manyPhotoEleTitle').text(text);
        $('.image-preview').append(photoGroup);
        $('.'+ imageId +'[name="Photos[]"]').trigger('change');
    }


    /* 上傳 */
    // Initialize the jQuery File Upload widget:
    fileuploadElm.fileupload({
        filesContainer: $('tbody.files'),
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        downloadTemplateId: null,
        maxFileSize: 999000,
        paramName: 'image',
        url: '/image/upload',
        uploadTemplateId: null,
        destroy: function (e, data) {
            var that = this;
            // 自己上傳的當下可以真刪除
            var imageId = data.context.find('input[name=imageId]').val();
            $.ajax({
                url: '/image/' + imageId + '/realRemove',
                type: 'DELETE',
                success: function(result) {
                    // 再去呼叫原生 library destroy 該做的事情
                    $.blueimp.fileupload.prototype.options.destroy.call(that, e, data);
                }
            });
        },
        downloadTemplate: function (o) {
            var rows = $();
            var isPhotosNews = $('select[name=type]').val() === 'PHOTO' ? true : false;
            $.each(o.files, function (index, file) {
                var row = $($('#template-download').html());
                var img = row.find('img');
                row.find('input[name=imageId]').val(file._id);
                row.find('.setMainPhoto').attr('data-url', file.url);
                row.find('.setManyPhoto').attr('data-url', file.url);
                row.find('span.desc').text(file.desc);
                row.find('img').attr('src', file.url);
                row.find('img').attr('img-width', file.width);
                row.find('img').attr('data-isdeliver', file.isDeliver);

                if (file.isDeliver) {
                    row.find('.canNotDeliver').remove();
                }

                if (isPhotosNews) {
                    row.find('.setMainPhoto').addClass('hide');
                    row.find('.setManyPhoto').removeClass('hide');
                }

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
            var submitRow = $(data.context);
            var isWatermark = submitRow.find('input[name=isWatermark]:checked').length === 1;
            var isDeliver = submitRow.find('input[name=isDeliver]:checked').length === 1;
            var desc = submitRow.find('textarea[name=desc]').val();

            data.formData = {
                title: desc,
                desc: desc,
                type: 'NEWS',
                isDeliver: isDeliver,
                isWatermark: isWatermark
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
                row.find('span.preview2').append('<img width="80" height="40" src="' + URL.createObjectURL(o.files[index]) + '"/>');
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

    // 設為圖輯
    fileRows.on('click', 'button.setManyPhoto', function(){
        setManyPhoto($(this));
    });

    // 複製
    fileRows.on('click', 'button.copy', function(){
        copyIntoClipboard($(this));
    });

    // 上傳前的圖片切割
    fileRows.on('click', 'button.crop', function(){
        var cropButton = $(this);
        var cropRow = $($('#template-crop').html());
        var cropImgElm = cropRow.find('img');
        var imageRow = cropButton.parent().parent();
        cropRow.insertAfter(imageRow);
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
        var cropRow = confirmButton.closest('#crop-row');
        var imageRow = cropRow.prev();
        var cropImgElm = cropRow.find('#crop-img');
        cropImgElm.cropper('getCroppedCanvas').toBlob(function (blob) {
            var blobURL = URL.createObjectURL(blob);
            $('.template-upload').data('data').files[0] = blob;
            imageRow.find('.upload-img').attr('src', blobURL);
            imageRow.find('.upload-img').removeClass('hidden');
            imageRow.find('.cancel').removeClass('hidden');
            imageRow.find('canvas').remove();
            cropRow.remove();
            return;
        });
    });

    // 圖片切割取消
    fileRows.on('click', 'button.cancel-crop', function(){
        var cropRow = $(this).closest('#crop-row');
        var imageRow = cropRow.prev();
        imageRow.find('.crop').removeClass('hidden');
        imageRow.find('.cancel').removeClass('hidden');
        cropRow.remove();
        return;
    });

    /* 圖庫 */

    function queryImageLibrary (val) {
        var page = (typeof val === 'number') ? val : 1;
        var currentTarget = val.currentTarget;
        var imageFrom = (currentTarget && currentTarget.className === 'library') ? $(currentTarget.firstElementChild).attr('data-from') : $('.image-nav li.active a').attr('data-from');
        imageBlocks.html('');
        var queryString = 'startedAt=' + startElm.val();
        queryString += '&endedAt=' + endElm.val();
        queryString += '&keywords=' + $('input[name=imgKeywords]').val();
        queryString += '&page=' + page;
        queryString += '&imageFrom=' + imageFrom;
        var desc = $('#library input[name=desc]').val();
        var isPhotosNews = $('select[name=type]').val() === 'PHOTO' ? true : false;
        $('#img-loading').show();

        $.ajax({
            type:'GET',
            url:'/image?' + queryString,
            success:function(result){
                $('.zoom').trigger('zoom.destroy');
                $.each(result.images, function(index, image) {
                    var block = $($('#template-image-block').html());
                    block.find('img').attr('src', image.url);
                    block.find('img').attr('img-width', image.width);
                    block.find('img').attr('data-isdeliver', image.isDeliver);

                    if (image.isDeliver) {
                        block.find('.canNotDeliver').remove();
                    }

                    if (isPhotosNews) {
                        block.find('.setMainPhoto').addClass('hide');
                        block.find('.setManyPhoto').removeClass('hide');
                    }

                    block.find('input[name=imageId]').val(image._id);
                    block.find('span.desc').text(image.desc);
                    block.find('textarea[name=desc]').val(image.desc);
                    block.find('.fa-check').attr('data-url', image.url);
                    imageBlocks.append(block);
                });
                $('.zoom').zoom();

                // Process Pagination
                var pageData = result.pageData;
                $('#imgPageIndex').val(page);
                $('.imgPage').html(page);
                $('.totalPage').html(pageData.totalPage);
                if (pageData.hasPrev) {
                    $('button.imgPrev').removeClass('hidden');
                } else {
                    $('button.imgPrev').addClass('hidden');
                }

                if (pageData.hasNext) {
                    $('button.imgNext').removeClass('hidden');
                } else {
                    $('button.imgNext').addClass('hidden');
                }
            },
            complete:function(data){
                $('#img-loading').hide();
            },
            error:function(xhr, ajaxOptions, thrownError){
            console.error('error');
            console.error(xhr.responseText);
            }
        });
    }

    // 點擊 Tab 與 QueryForm 送出時都會觸發
    $('.image-nav li.library').on('click', queryImageLibrary);
    $('.imageLibQueryForm').on('click', queryImageLibrary);


    // 點擊收合按鈕（關閉圖庫這個 Collapse）
    $('button.imgCollapse').on('click', function() {
        $('.image-setting-area .btn-collapse').click();
    });

    $('button.imgPrev').on('click', function() {
        var page = parseInt($('#imgPageIndex').val(), 10);
        queryImageLibrary(page - 1);
    });

    $('button.imgNext').on('click', function() {
        var page = parseInt($('#imgPageIndex').val(), 10);
        queryImageLibrary(page + 1);
    });

    imageBlocks.on('click', 'button.fa-trash', function() {

        // 從 library 取得是假刪除
        var confirmed = confirm('您確定要刪除嗎？');
        if (!confirmed) {
            return;
        }
        var parentBlock = $(this).parent().parent();
        $.ajax({
            url: '/image/' + parentBlock.find('input[name=imageId]').val(),
            type: 'DELETE',
        }).done(function(result) {
            parentBlock.remove();
        });
    });

    imageBlocks.on('click', 'button.setMainPhoto', function() {
        setMainPhoto($(this));
    });

    // 加入圖集
    imageBlocks.on('click', 'button.setManyPhoto', function() {
        setManyPhoto($(this));
    });

    imageBlocks.on('click', 'button.fa-clipboard', function() {
        swal({
            title: "複製成功",
            timer: 500,
            showConfirmButton: false,
            type: "success"
            });
        copyIntoClipboard($(this));
    });

    // 開新視窗看圖片
    imageBlocks.on('click', 'button.fa-eye', function() {
        var imgSrc = $(this).parent().parent().find('img.image').attr('src');
        return window.open(imgSrc);
    });

    imageBlocks.on('click', 'button.fa-undo', function() {
        var parentBlock = $(this).parent();
        var newsDescElm = parentBlock.find('textarea[name=desc]');
        var originDesc = parentBlock.find('span.desc').text();

        newsDescElm.val(originDesc);
        $(this).addClass('hidden');
    });

    imageBlocks.on('click', 'button.fa-save', function() {
        var parentBlock = $(this).parent().parent();
        var newsDesc = parentBlock.find('textarea[name=desc]').val().trim();
        var originDescElm = parentBlock.find('span.desc');

        if (newsDesc === originDescElm.text()) {
            alert('圖說沒有更新！');
            return;
        }

        var imageIdInput = parentBlock.find('input[name=imageId]');
        var imageFrom = $('.image-nav li.active a').attr('data-from');
        var imageId = imageIdInput.val();
        var undoBtn = parentBlock.find('button.fa-undo');
        var url, method;

        if (imageFrom === 'INTERNAL') {
            method = 'POST';
            url = '/image/' + imageId + '/clone';
        } else {
            method = 'PUT';
            url = '/image/' + imageId;
        }

        $.ajax({
            url: url,
            data: { desc: newsDesc },
            method: method
        }).done(function(result) {
            originDescElm.text(newsDesc);
            imageIdInput.val(result._id);
            undoBtn.addClass('hidden');
        }).fail(function() {
            alert('圖說更新失敗！');
        });

    });

    imageBlocks.on('change', 'textarea[name=desc]', function(e, c) {
        var parentBlock = $(this).parent();
        var newsDesc = $(this).val().trim();
        var originDesc = parentBlock.find('span.desc').text();
        var undoBtn =  parentBlock.find('button.fa-undo');

        if (originDesc === newsDesc) {
            $(this).val(originDesc);
            undoBtn.addClass('hidden');
            return;
        }
        undoBtn.removeClass('hidden');
    });

    //圖片新聞 加入已上傳圖片
    $('#addAllImages').on('click', function(){
        $('tr.template-download button.manyPhotoEle').click();
    });
});
