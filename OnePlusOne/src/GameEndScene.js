/**
 * Created by johnrunning on 14/12/16.
 */


var GameEndSceneLayer = cc.Layer.extend({
    scoreLabel:null,
    highScoreLabel:null,
    playerAnswerLabel:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        var bgLayer = new cc.LayerColor();
        bgLayer.init(cc.color(0xFF,0xFF,0xFF,0xff),size.width,size.height);
        this.addChild(bgLayer);

        var helloLabel = new cc.LabelTTF("你的记录", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.setColor(cc.color(0x8c,0x8c,0x8c));
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height-60;
        // add the label as a child to this layer
        this.addChild(helloLabel);

        this.scoreLabel = new cc.LabelTTF(playerScore+"", "Arial", 100);
        // position the label on the center of the screen
        this.scoreLabel.x = size.width / 2;
        this.scoreLabel.y = helloLabel.y-70;
        this.scoreLabel.color = cc.color(0x8e,0x8e,0x8c);
        // add the label as a child to this layer
        this.addChild(this.scoreLabel, 5);

        this.highScoreLabel = new cc.LabelTTF("最高记录：0", "Arial", 50);
        // position the label on the center of the screen
        this.highScoreLabel.x = size.width / 2;
        this.highScoreLabel.y = helloLabel.y-150;
        this.highScoreLabel.color = cc.color(0x8c,0x8c,0x8c);
        // add the label as a child to this layer
        this.addChild(this.highScoreLabel, 5);


        var headSprite = new cc.Sprite(res.man_png);
        this.addChild(headSprite,10);
        headSprite.x = size.width / 2;
        headSprite.y = this.highScoreLabel.y-210;
        var move1 = cc.moveBy(0.3,cc.p(0,10));
        var move2 = cc.moveBy(0.3,cc.p(0,-10))
        headSprite.runAction(cc.repeatForever(cc.sequence(move1,move2)));

        var roundBg = new cc.Sprite(res.endframe_png);

        roundBg.x = size.width / 2;
        roundBg.y = headSprite.y-200;
        this.addChild(roundBg,1);


        var helloLabel = new cc.LabelTTF("Oh my God!", "Arial", 24);
        // position the label on the center of the screen
        helloLabel.setColor(cc.color(0xFF,0xFF,0xFF));
        helloLabel.x = 334/2;
        helloLabel.y = 171/2+36;
        // add the label as a child to this layer
        roundBg.addChild(helloLabel,1);


        this.playerAnswerLabel = new cc.LabelTTF(playerAnswer, "Arial", 38);
        // position the label on the center of the screen
        this.playerAnswerLabel.setColor(cc.color(0xFF,0xFF,0xFF));
        this.playerAnswerLabel.x = 334/2;
        this.playerAnswerLabel.y = helloLabel.y-40;
        // add the label as a child to this layer
        roundBg.addChild(this.playerAnswerLabel,1);

        //var bg = new cc.Sprite(res.home_jpg);//bg1_jpg
        //bg.x = size.width/2;
        //bg.y = size.height/2;
        //bg.width = size.width;
        //bg.height = size.height;
        //this.addChild(bg);

        var sprite = new cc.Sprite(res.shareButton_png);
        var sprite1 = new cc.Sprite(res.shareButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        var shareItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            this.shareGame();
        }, this);
        shareItem.x = 100;
        shareItem.y = 100;




        var sprite = new cc.Sprite(res.restartButton_png);
        var sprite1 = new cc.Sprite(res.restartButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        var restartItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            cc.director.runScene(new cc.TransitionSlideInT(1, new GameScene()));
        }, this);
        restartItem.x = size.width/2;
        restartItem.y = 150;

        var menu = new cc.Menu(restartItem,shareItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);




        this.shareUI = new ShareUI();
        this.addChild(this.shareUI, 1);
        this.shareUI.visible =false;
        return true;
    },

    shareGame:function(){
        //if(this.level < 5){
        //    wxData["desc"]= descrition = "我未能帮最强大脑主持人找到厕所，你来试试吧。";
        //}else if(this.level < 10){
        //    wxData["desc"]= descrition = "帮最强大脑主持人找厕所，怎么这么难！";
        //}else if(this.level < 15){
        //    wxData["desc"]= descrition = "你能帮最强大脑蒋昌建找到厕所吗？";
        //}else if(this.level < 20){
        //    wxData["desc"]= descrition = "好难啊，找厕所也需要最强大脑吗？";
        //}
        this.shareUI.visible =true;
    }
});

var ShareUI = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

        var bg = new cc.Sprite(res.bg_jpg);
        this.addChild(bg);
        bg.setPosition(cc.winSize.width/2,cc.winSize.height/2);


    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();
                //this.removeFromParent();
                target.visible =false;
            }
        }, this);
    }
});

var GameEndScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameEndSceneLayer();
        this.addChild(layer);
    }
});