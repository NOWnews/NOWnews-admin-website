$(function() {

    $(document).ready(function() {
        $('#user-table').DataTable({
            "paging": false,
            "searching": false,
        });

        $('#center-and-dept').select2();

        $('#center-and-dept').on('select2:select', function (e) {
            var departmentOptionElm = $(e.params.data.element);
            var departmentId = departmentOptionElm.val();
            var departmentInput = $('input[name=Department]');
            var centerInput = $('input[name=Center]');
            departmentInput.val(departmentId);

            if (departmentId === '') {
                centerInput.val('');
                return;
            }
            var centerId = departmentOptionElm.parent().attr('id');
            centerInput.val(centerId);
        });

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

    // Import image
    var previewImage = $('#preview-image');
    var inputImage = $('#input-image');
    var cropAndUploadFileBtn = $('#crop-and-upload-file');
    var URL = window.URL || window.webkitURL;
    var blobURL, previewBlob;

    if (URL) {
        inputImage.change(function () {
            var files = this.files;
            var file;

            // 判斷是否有啟用 Cropper 套件
            if (!previewImage.data('cropper')) {
                previewImage.cropper({
                    aspectRatio: 1 / 1,
                    viewMode: 1,
                    zoomable: false,
                    minCropBoxHeight: 100,
                    minCropBoxWidth: 100,
                });
            }

            cropAndUploadFileBtn.removeClass('hidden');

            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {

                    blobURL = URL.createObjectURL(file);
                    previewImage.one('built.cropper', function () {

                        // Revoke when load complete
                        URL.revokeObjectURL(blobURL);

                    }).cropper('reset').cropper('replace', blobURL);

                    inputImage.val('');

                } else {
                  window.alert('請選擇一張圖片');
                }
          }
        });
    } else {
        inputImage.prop('disabled', true).parent().addClass('disabled');
    }

    cropAndUploadFileBtn.on('click', function(){

        // 判斷是否有啟用 Cropper 套件
        if (!previewImage.data('cropper')) {
            return;
        }

        previewImage.cropper('getCroppedCanvas').toBlob(function (blob) {
            previewBlob = blob;
            blobURL = URL.createObjectURL(blob);
            $('.cropper-container').addClass('cropper-hidden');
            previewImage.removeClass('cropper-hidden');
            previewImage.attr('src', blobURL);
            cropAndUploadFileBtn.addClass('hidden');
            return;

        });
    });

    function checkPassword () {
        var confirmPwd= $('input[name=password]').val().trim();
        var pwd = $('input[name=confirmPassword]').val().trim();

        if (confirmPwd === pwd) {
            return true;
        }

        alert('密碼不一致請再確認。');
        return flase;
    }

    $('.user-form').submit(function(e){
        return checkPassword();
    });

    $('#me-form').submit(function() {

        var isSamePassword = checkPassword();

        if (!isSamePassword) {
            return false;
        }

        // 送出前確認有沒有上傳的圖片在做上傳，舊圖由後端做清除
        if (!previewBlob) {
            return true;
        }

        var formData = new FormData();
        var username = $('#username').val();
        formData.append('title', username);
        formData.append('desc', username + '的AVATAR');
        formData.append('type', 'AVATAR');
        formData.append('isDeliver', false);
        formData.append('CreatedBy', $('#userId').val());
        formData.append('image', previewBlob);
        var api = $('input[name=apiServer]').val();
        $.ajax( api + '/images/upload', {
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (file) {
                previewBlob = null;
                $('input[name=Avatar]').val(file._id);
                $('input[name=avatarUrl]').val(file.url);
                $('#me-form').submit();
            },
            error: function (e) {
                alert('Upload error');
            }
        });

        return false;

    });


});

