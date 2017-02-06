$(function() {

    $(document).ready(function() {
        $('#user-table').DataTable({
            "paging": false,
            "searching": false,
        });

        $('#center-and-dept').select2();

        $('#center-and-dept').on('select2:select', function (e) {
            var departmentElm = $(e.params.data.element);
            var centerId = departmentElm.parent().attr('id');
            var departmentId = departmentElm.val();
            $('input[name=Center]').val(centerId);
            $('input[name=Department]').val(departmentId);
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
    var myImage = $('#my-image');
    var inputImage = $('#input-image');
    var uploadFileBtn = $('#upload-file');
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
        inputImage.change(function () {
            var files = this.files;
            var file;

            // 判斷是否有啟用 Cropper 套件
            if (!myImage.data('cropper')) {
                myImage.cropper({
                    aspectRatio: 1 / 1,
                    viewMode: 3
                });
            }

            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {

                    blobURL = URL.createObjectURL(file);
                    myImage.one('built.cropper', function () {

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

    uploadFileBtn.on('click', function(){

        // 判斷是否有啟用 Cropper 套件
        if (!myImage.data('cropper')) {
            return;
        }

        myImage.cropper('getCroppedCanvas').toBlob(function (blob) {
            var formData = new FormData();
            var username = $('#username').val();
            formData.append('title', username);
            formData.append('desc', username + '的AVATAR');
            formData.append('type', 'AVATAR');
            formData.append('CreatedBy', $('#userId').val());
            formData.append('image', blob);

            $.ajax('http://61.67.121.56:10000/images/upload', {
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (file) {
                    $('#avatar').val(file._id);
                    $('.cropper-container').addClass('cropper-hidden');
                    myImage.attr('src', file.url);
                    myImage.removeClass('cropper-hidden');
                },
                error: function () {
                    alert('Upload error');
                }
            });
        });
    });


});

