$(document).on('click', '#modal-close, #modal-overlay', function () {
    $("#modal-close, #modal-overlay").off("click");
    $("#modal-overlay").remove();
    $("#modal-content").css("display", "none");
    $("#alert-modal-content").css("display", "none");
});

function check_can_use_coupon(check_url) {
    return true
}


$(document).on('click', '.coupon_button', function () {

    $(this).blur();
    //現在のモーダルウィンドウを削除して新しく起動する
    if ($("#modal-overlay")[0]) $("#modal-overlay").remove();

    $("body").append('<div id="modal-overlay"></div>');
    $("#modal-overlay").fadeIn("slow");
    $("#modal-content").fadeIn("slow");

    // couponを使用するurl設定
    $('#coupon_form').attr("action", next_url);

    centeringModalSyncer($("#modal-content"));
    return;
    var next_url = $(this).attr("next_url");
    var check_url = $(this).attr("check_url");
    check_can_use_coupon(check_url).done(function (result) {
        if (result == true) {
            console.log("coupon is not used");

        } else {
            console.log("coupon is used");
            $(this).blur();
            //現在のモーダルウィンドウを削除して新しく起動する
            if ($("#modal-overlay")[0]) $("#modal-overlay").remove();

            $("body").append('<div id="modal-overlay"></div>');
            $("#modal-overlay").fadeIn("slow");
            $("#alert-modal-content").fadeIn("slow");

            centeringModalSyncer($("#alert-modal-content"));
        }
    }).fail(function (result) {
    });
});

function centeringModalSyncer(content) {
    var w = $(window).width();
    var h = $(window).height();
    var cw = content.outerWidth({margin: true});
    var ch = content.outerHeight({margin: true});
    var pxleft = ((w - cw) / 2);
    var pxtop = ((h - ch) / 2);
    content.css({"left": pxleft + "px"});
    content.css({"top": pxtop + "px"});
}

function confirmAgain() {
    $("#modal-close, #modal-overlay").off("click");
    $("#modal-overlay").remove();
    $("#modal-content").css("display", "none");
    $("#alert-modal-content").css("display", "none");

    //获取当前时间
    var time = new Date();
    var formateTime = formatTime(time);
    //存 番号、时间戳
    window.localStorage.setItem('japanCode', $("#japanCode").html());
    window.localStorage.setItem('japanTime', formateTime);
    $("#ticket-time").html(formateTime);
    //隐藏按钮，设置时间戳
    $(".checked").show();
    $(".noChecked").hide();
}

//格式化时间
function formatTime(date) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? '0' + h : h;
    var min = date.getMinutes();
    min = min < 10 ? '0' + min : min;
    var s = date.getSeconds();
    s = s < 10 ? '0' + s : s;
    return y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
}
