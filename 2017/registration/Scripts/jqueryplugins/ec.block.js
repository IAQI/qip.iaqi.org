window.admin = {
    activeRequests: 0,
    errorSelector: "#growl-container",
    blockEnabled: true
}

$.ecblockUI = function () {
    $.blockUI({
        message: '<div style="font-size: 28px;line-height:1;color: #454545;font-weight: normal;">&nbsp;Please wait...</div><img src="//cdn.eventcore.com/img/preloader.gif" style="margin-bottom: 5px;margin-top: 5px;" />',
        fadeIn: 700,
        fadeOut: 700,
        css: {
            padding: '5px 15px',
            width: '300px',
            left: '50%',
            marginLeft: '-150px',
            border: '2px solid #AAAAAA',
            backgroundColor: '#fff',  
            color: '#454545',
        }
    });
}

$(document).ajaxStart(function () {
    if (window.admin.blockEnabled) {
        $.ecblockUI();
    }
    window.activeRequests = $.active;
    $("#requestcount").text(activeRequests);
    $("#requeststatus").fadeIn("fast");
});

$(document).ajaxStop(function () {
    window.activeRequests = $.active;
    $("#requestcount").text(activeRequests);
    if (window.activeRequests === 0) {
        $("#requestcount").text('');
        $("#requeststatus").fadeOut("slow");
        $.unblockUI();
    }
});