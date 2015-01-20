/**
 * Created by johnrunning on 14/12/16.
 */

var kGameReady = 1;
var kGaming = 2;
var kGamePaused = 3;
var kGameEnded = 4;

var state = kGameReady;

var numbersData = [1,2,3,-1,-2,-3];

//这是一个保存娃娃数量的json数据
dollNum = {Aries: 0, Taurus: 0, Gemini: 0, Cancer: 0, Leo: 0, Virgo: 0, Libra: 0, Scorpius: 0, Sagittarius: 0, Capricornus: 0, Aquarius: 0, Pisces: 0};



var GameSceneLayer = cc.Layer.extend({
    levelTipLabel:null,
    questionLabel:null,
    answerLabel:null,
    currentAnswer:1,
    totalTime:4,
    level:0,
    gameLayer:null,
    tileArray:null,
    numbersNum:2,
    answerSpriteWidth:298,
    answerSpriteHeight:78,
    answerSprites:null,
    rightSprite:null,
    lastQuestionStr:null,
    pastTime:null,
    playerAnswerValue:-1,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;

        this.answerSprites = new Array();

        var bgLayer = new cc.LayerColor();
        bgLayer.init(cc.color(0xFF,0xFF,0xFF,0xff),size.width,size.height);
        this.addChild(bgLayer);

        var bg = new cc.Sprite(res.levelTipBg_png);//bg1_jpg
        bg.x = 85;
        bg.y = size.height-118/2;
        this.addChild(bg);


        this.levelTipLabel = new cc.LabelTTF("0", "Arial", 60);
        // position the label on the center of the screen
        this.levelTipLabel.x = 85;
        this.levelTipLabel.y = bg.y;
        this.levelTipLabel.color = cc.color(0x4d,0x4d,0x4d);
        // add the label as a child to this layer
        this.addChild(this.levelTipLabel, 5);

        this.questionLabel = new cc.LabelTTF("1 + 2 = ", "Arial", 60);
        // position the label on the center of the screen
        this.questionLabel.x = size.width / 2-20;
        this.questionLabel.y = size.height / 2+40;
        this.questionLabel.color = cc.color(0x00,0xa9,0xef);
        // add the label as a child to this layer
        this.addChild(this.questionLabel, 5);


        this.answerLabel = new cc.LabelTTF("?", "Arial", 60);
        // position the label on the center of the screen
        this.answerLabel.x = this.questionLabel.x + this.questionLabel.getContentSize().width/2+20;
        this.answerLabel.y = this.questionLabel.y;
        this.answerLabel.color = cc.color(0x00,0xa9,0xef);
        // add the label as a child to this layer
        this.addChild(this.answerLabel, 5);

        this.rightSprite = new cc.Sprite(res.right_png);
        this.rightSprite.x = this.questionLabel.x + this.questionLabel.getContentSize().width/2+20;
        this.rightSprite.y = this.questionLabel.y;
        this.addChild(this.rightSprite, 5);
        this.rightSprite.setVisible(false);

        var answerSprite1 = new AnswerSprite(1);
        answerSprite1.x = size.width/2;
        answerSprite1.y = 300;

        var answerSprite2 = new AnswerSprite(2);
        answerSprite2.x = size.width/2;
        answerSprite2.y = 190;

        var answerSprite3 = new AnswerSprite(3);
        answerSprite3.x = size.width/2;
        answerSprite3.y = 80;

        this.addChild(answerSprite1, 5);
        this.addChild(answerSprite2, 5);
        this.addChild(answerSprite3, 5);
        this.answerSprites.push(answerSprite1,answerSprite2,answerSprite3);


        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.setLevel(0);
        this.schedule(this.step,1/25);
        return true;
    },

    onTouchBegan:function (touch, event) {
        if(state != kGaming) return;
        var target = event.getCurrentTarget();
        var position = touch.getLocation();
        for(var i = 0; i < target.answerSprites.length; i++){
            var sprite = target.answerSprites[i];

            var p = sprite.getParent().convertToWorldSpace(sprite.getPosition());

            var rect = cc.rect(p.x - target.answerSpriteWidth/2,p.y - target.answerSpriteHeight/2,target.answerSpriteWidth,target.answerSpriteHeight);

            if(cc.rectContainsPoint(rect,position)){
                target.checkAnswer(sprite.value);
            }
        }
        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    },
    touchDelegateRetain:function () {
    },
    touchDelegateRelease:function () {
    },

    /**
     * 保存Doll数量，要保存json数据的时候，需要使用JSON.stringify();方法将JSON转化为字符串
     */
    saveDollNum:function(){
        var tempDollNum = JSON.stringify(dollNum);
        cc.sys.localStorage.setItem("dollNum", tempDollNum);
    },


    /**
    * 加载Doll数量 和 keys；然后再读取过后，需要用JSON.parse();方法将字符串转化为JSON
    */
    loadDollNum:function() {
    var tempDollNum = cc.sys.localStorage.getItem("dollNum");


    if(tempDollNum == null || tempDollNum == ""){
        this.saveDollNum();
        cc.log("default dollNum " + dollNum);
    }else{
        tempDollNum = sys.localStorage.getItem("dollNum");
        cc.log("get dollNum " + tempDollNum);
    }
        //将字符串转化为json
        tempDollNum = JSON.parse(tempDollNum);
    },

    generateRandomQuestion:function(){
        //this.numbersNum
        var randomIndiceArray = this.getRandomOptions(this.numbersNum,-1,numbersData.length,true);

        var str = "";
        var res = 0;
        for(var i = 0; i < randomIndiceArray.length; i++){
            res += numbersData[randomIndiceArray[i]];
            str += res;
        }

        if(res < 1 || res > 3){
            return this.generateRandomQuestion();
        }
        return randomIndiceArray;
    },

    getRandomOptions:function(optionNums,mustHaveIndex,randomLength,canRepeat){
        //this.optionsIndice = new Array();
        var a = 0;
        var result = new Array();
        for (var i = 0; i < optionNums; i++) {//this.movePairsNum
            var integer = this.getRandomIndex(randomLength,result,canRepeat);//this.cardsArray.length
            //this.optionsIndice.push(integer);
            result.push(integer);
        }

        if(mustHaveIndex >-1){
            var Aindex = this.containsIndex(mustHaveIndex,result);//this.currentCardSprite.index

            //check if has mustHaveAIndex
            if (Aindex==-1) {
                //get random one, and set that value to mustHaveAIndex
                Aindex = Math.floor(Math.random()*optionNums);//this.movePairsNum
                //this.optionsIndice[Aindex] = mustHaveIndex;//this.currentCardSprite.index
                result[Aindex] = mustHaveIndex;
            }
        }
        return result;
    },

    containsIndex:function(index,array){
        for (var i = 0; i < array.length; i++) {//this.optionsIndice
            if (array[i] == index) {
                return i;
            }
        }
        return -1;
    },

    getRandomIndex:function(randomLength,array,canRepeat){
        var index = Math.floor(Math.random()*randomLength);//this.cardsArray.length
        if (!canRepeat && this.containsIndex(index,array)!=-1) {
            return this.getRandomIndex(randomLength,array);
        }
        var integer = index;
        return integer;
    },

    getRandomIndexNotEquasValue:function(value){
        var index = Math.floor(Math.random()*this.movePairsNum);
        if (index == value) {
            return this.getRandomIndexNotEquasValue(value);
        }
        return index;
    },

    checkAnswer:function(value){
        this.playerAnswerValue = value;
        cc.log("check answer = " + value +" right = "+this.currentAnswer);
        if(this.currentAnswer == value)
        {
            state = kGameReady;
            //show right_png
            this.rightSprite.setVisible(true);
            this.answerLabel.setVisible(false);
            //win go to next level
            this.scheduleOnce(this.nextLevel, 0.5);
        }else{
            //wrong, game over
            state = kGameEnded;
            this.answerLabel.setString(value);
            this.answerLabel.setColor(cc.color(255,0,0));
            this.scheduleOnce(this.gameEnd, 2);
        }
    },

    setLevel:function(value){
        this.level = value;
        this.levelTipLabel.setString((this.level+1));
        this.totalTime = 2.5;
        if(this.level < 5) {
            this.numbersNum = 2;
            if (this.level >= 3) {
                var random = Math.floor(Math.random() * 10);
                if (random < 3)
                {
                    this.numbersNum = 3;
                }else if (random >8)
                {
                    this.numbersNum = 4;
                }
            }

            this.totalTime = 2.5;
        }else if(this.level < 10){
            this.numbersNum = 3;
            var random = Math.floor(Math.random() * 10);
            if (random < 3)
            {
                this.numbersNum = 2;
            }else if (random >8)
            {
                this.numbersNum = 4;
            }
            this.totalTime = 2;
        }else if(this.level < 20){
            this.numbersNum = 4;
            var random = Math.floor(Math.random() * 10);
            if (random >7)
            {
                this.numbersNum = 3;
            }
            this.totalTime = 1.5;
        }else{
            var random = Math.floor(Math.random() * 10);
            if (random >7)
            {
                this.numbersNum = 4;
            }
            this.numbersNum = 5;
            this.totalTime = 1;
        }
        this.createNewGame();
        this.currentTime = this.totalTime;
        this.pastTime = 0;
        for(var i = 0; i < this.answerSprites.length; i++){
            var sprite = this.answerSprites[i];
            sprite.setPercentage(100);
        }
        state = kGaming;

        //this.itemLayer.runAction(cc.repeatForever(cc.blink(1,2)));
    },

    nextLevel:function(){
        this.setLevel(this.level+1);
        //if (showRoundLabelEffect) {
        //    //TODO::showRoundLabelEffect
        //}
        this.setRound(this.round+1);

    },

    step:function(dt){
        if(this.level > 0 && state == kGaming){
            this.currentTime -= dt;
            if(this.currentTime <0)
                this.currentTime = 0;
            for(var i = 0; i < this.answerSprites.length; i++){
                var sprite = this.answerSprites[i];
                sprite.setPercentage(100*(this.currentTime/this.totalTime));
            }
            if(this.currentTime == 0)
                this.timeUp();
        }
    },

    setTime:function(value){
        this.currentTime = value;
        if (this.currentTime < 0) {
            this.currentTime = 0;
            return;
        }

        if (this.currentTime <= 0 && state == kGaming) {
            this.timeUp();
        }
    },

    setTargets:function(value){

    },

    timeUp:function(sender,s){
        this.gameEnd();
    },


    setRound:function(value){
        this.round = value;
        //gameDelegate.setRound(round);
        //TODO::set ui round
    },

    reset:function() {
        state = kGameReady;
        this.setRound(0);
        this.currentTime = this.totalTime;
        this.setTime(this.currentTime);
    },

    createNewGame:function(){
        var arr = this.generateRandomQuestion();

        var zhengshuIndex = 0;
        for(var i = 0; i < arr.length;i++){
            var number = numbersData[arr[i]];
            if(number > 0)
            {
                zhengshuIndex = i;
                break;
            }
        }
        this.currentAnswer = 0;
        var res = numbersData[arr[zhengshuIndex]]+"";
        for(var i = 0; i < arr.length; i++){
            var number = numbersData[arr[i]];
            cc.log("this.currentAnswer:"+this.currentAnswer +" number:"+number);
            this.currentAnswer+=number;

            if(zhengshuIndex == i) continue;
            if(number < 0){
                res += " - "+(-number)+" ";
            }else{
                res += " + " + number+" ";
            }
        }
        if(this.lastQuestionStr == res){
            this.createNewGame();
            return;
        }else
            this.lastQuestionStr = res;
        //cc.log("this.currentAnswer:"+this.currentAnswer);
        this.questionLabel.setString(res+"= ");

        this.rightSprite.x = this.answerLabel.x = this.questionLabel.x + this.questionLabel.getContentSize().width/2+20;
        this.answerLabel.setVisible(true);
        this.rightSprite.setVisible(false);
    },

    gameEnd:function(){
        state = kGameEnded;
        playerScore = this.level+1;
        playerAnswer = this.lastQuestionStr + "= " + this.playerAnswerValue;
        this.unschedule(this.step);
        cc.director.runScene(new cc.TransitionSlideInT(1, new GameEndScene()));
    }
});



var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameSceneLayer();
        this.addChild(layer);
    }
});