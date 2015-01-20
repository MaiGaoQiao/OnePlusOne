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

        var bgLayer = new cc.LayerColor();
        bgLayer.init(cc.color(0xFF,0xFF,0xFF,0xff),size.width,size.height);
        this.addChild(bgLayer);

        var bg = new cc.Sprite(res.homebg_png);//bg1_jpg
        bg.x = size.width/2;
        bg.y = size.height-250;
        this.addChild(bg);


        var sprite = new cc.Sprite(res.restartButton_png);
        var sprite1 = new cc.Sprite(res.restartButton_png);
        sprite1.setScale(1.1);
        var spriteSize = sprite.getContentSize();
        sprite1.setPosition(cc.p(-spriteSize.width*0.1/2,-spriteSize.height*0.1/2));

        var playItem = new cc.MenuItemSprite(sprite,sprite1,function () {
            cc.audioEngine.playEffect(res.button_press_wav, false);
            cc.director.runScene(new cc.TransitionSlideInT(1, new GameScene()));
        }, this);



        this.playMenu = new cc.Menu(playItem);
        this.playMenu.x = size.width/2;
        this.playMenu.y = 250;
        this.addChild(this.playMenu, 1);

        return true;
    }
});

var IntroScene0 = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroScene0Layer();
        this.addChild(layer);
    }
});