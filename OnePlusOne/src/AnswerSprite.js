var AnswerSprite = cc.Sprite.extend({
    value:1,
    percentage:100,
    progressBar:null,
    valueLabel:null,
    ctor:function (value) {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.value = value;
        var barPng = new cc.Sprite(res.barFrame_png);
        barPng.setPosition(0,0);
        this.addChild(barPng);

        this.progressBar = new cc.ProgressTimer(new cc.Sprite(res.urineBar_jpg));
        this.progressBar.setType(cc.ProgressTimer.TYPE_BAR);
        this.progressBar.setMidpoint(cc.p(0,1));
        this.progressBar.setBarChangeRate(cc.p(1, 0));
        this.progressBar.setPercentage(this.percentage);
        this.progressBar.setPosition(0,0);
        this.addChild(this.progressBar);


        this.valueLabel = new cc.LabelTTF(value+"", "Arial", 60);
        // position the label on the center of the screen
        this.valueLabel.x = 0;
        this.valueLabel.y = 0;
        this.valueLabel.setColor(cc.color(255,255,255));
        // add the label as a child to this layer
        this.addChild(this.valueLabel, 5);
        return true;
    },

    setPercentage:function(value){
        this.percentage = value;
        this.progressBar.setPercentage(this.percentage);
    }
});