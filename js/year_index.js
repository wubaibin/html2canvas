//点击出现模态框
$(".wish_content").click(function (e) {
    e.preventDefault();
    $(".modal_container").fadeIn();
});
//点击关闭模态框
$(".close").click(function (e) {
    e.preventDefault();
    $(".modal_container").fadeOut();
    //把提示手机的文字去掉
    $(".phoneNumber_err").css("display","none");
    //把提示愿望的文字去掉
    $(".wish_err").css("display","none");
});
//判断手机号是否符合正则
$(".phoneNumber_container>input").blur(function (e) {
    var regular=/^1[34578]\d{9}$/;
    var number=$(".phoneNumber_container>input").val();
    //手机号的正则
    if(!regular.test(number)){
        $(".phoneNumber_err").fadeIn();
    }else{
        $(".phoneNumber_err").fadeOut();
    }
});
//判断新年愿望不能为空
$(".newYearWish_container>input").blur(function (e) {
    var wishLength=$(".newYearWish_container>input").val().length;
    if(wishLength===0){
        $(".wish_err").fadeIn();
    }else{
        $(".wish_err").fadeOut();
    }
});
//点击确认提交
$(".buttonSubmit").click(function (e) {
    e.preventDefault();
    var regular=/^1[34578]\d{9}$/;
    var number=$(".phoneNumber_container>input").val();
    //获取愿望
    var wish=$(".newYearWish_container>input").val();
    if($(".uploadingPic_bg").attr("src")!=="../img/bg.png"){
        //如果没有写愿望和没有填对手机号就不能提交
        if(wish.length!==0&&regular.test(number)){
            //把愿望放到下面
            $(".wish_content>span").html(wish);
            $(".modal_container").fadeOut();
            $("#file").css("display","none");
            $(".upload_container").css("display","none");
            //截屏
            var str = $('#html2canvas');
            html2canvas([str.get(0)], {
                onrendered: function (canvas) {
                    var image = canvas.toDataURL("image/png");
                    var pHtml = "<img src="+image+" />";
                    $('#html2canvas').html(pHtml);
                },useCORS:true
            });
        }
    }else{
        alert("图片未上传，请上传图片")
    }
});
//上传图片
$("#file").change(function () {
    var file = document.getElementById("file");
    //获取的图片文件
    var fileList = file.files;
    // var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(fileList[i]);
        // imgArr.push(imgUrl);
        $(".uploadingPic_bg").attr("src",imgUrl);
    }
});