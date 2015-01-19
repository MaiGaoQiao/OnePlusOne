/**
 * Created by johnrunning on 14/12/16.
 */

var IntroScene0Layer = cc.Layer.extend({
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


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },
    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        var position = touch.getLocation();

        //cc.audioEngine.playEffect(res.button_press_wav, false);

        cc.director.runScene(new cc.TransitionSlideInT(1, new GameScene()));
        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    }
});

var IntroScene0 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroScene0Layer();
        this.addChild(layer);
    }
});