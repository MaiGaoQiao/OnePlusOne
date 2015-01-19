/**
 * Created by johnrunning on 14/12/16.
 */

var GameEndSceneLayer = cc.Layer.extend({
    sprite:null,
    gameLayer:null,
    tileArray:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        //var bgLayer = new cc.LayerColor();
        //bgLayer.init(cc.color(0x7b,0x27,0xa1,0xff),size.width,size.height);
        //this.addChild(bgLayer);

        var bg = new cc.Sprite(res.home_jpg);//bg1_jpg
        bg.x = size.width/2;
        bg.y = size.height/2;
        bg.width = size.width;
        bg.height = size.height;
        this.addChild(bg);

        var sprite = new cc.Sprite(res.shareButton_png);
        var sprite1 = new cc.Sprite(res.shareButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        var shareItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            this.shareGame();
        }, this);

        var sprite = new cc.Sprite(res.restartButton_png);
        var sprite1 = new cc.Sprite(res.restartButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        var restartItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            //cc.audioEngine.playEffect(res.button_press_wav, false);
            cc.director.runScene(new cc.TransitionSlideInT(1, new GameScene()));
        }, this);
        var menu = new cc.Menu(restartItem,shareItem);
        menu.alignItemsHorizontallyWithPadding(60);
        menu.x = size.width/2;
        menu.y = 100;
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