var playerScore = 0;
var playerAnswer = "";
var currentHighScore = 0;


var res = {
    //home_jpg : "res/home.jpg",
    share_jpg : "res/shareBg.png",
    barFrame_png :"res/barFrame.png",
    urineBar_jpg : "res/urineBar.png",
    man_png : "res/man.png",
    homebg_png : "res/homebg.png",
    hongbao_png : "res/hongbao.png",
    pauseBt_png : "res/pauseBt.png",
    pausebg_png : "res/pausebg.png",
    levelTipBg_png:"res/levelTipBg.png",
    //star0_png : "res/star0.png",
    //star1_png : "res/star1.png",
    endframe_png : "res/endframe.png",
    button_press_wav : "res/button_press.wav",
    win_wav : "res/level_win.wav",
    failed_wav : "res/level_failed.wav",
    restartButton_png : "res/restartButton.png",
    shareButton_png : "res/shareButton.png",
    right_png : "res/right.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}