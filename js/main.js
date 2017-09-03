enchant();

window.onload = function()
{
    // 定数
    const img_chr = "img/char.png";
    const img_map = "img/map.png";
    const img_add = "img/add.png";
    const img_clr = "img/clr.png";

    // フレームワーク
    var game = new Game(320, 568);
    game.preload(img_chr, img_map, img_add, img_clr);
    
    // リスタート制御
    var restart = true;
    
    // ADDボタンクラス
    var Add = Class.create(Sprite,
    {
        initialize: function(scene)
        {
            Sprite.call(this, 64, 48);
            this.image = game.assets[img_add];
            this.frame = 0;
            this.x = 32;
            this.y = 48;
            this.addEventListener('touchstart', function(e)
            {
                this.frame = 1;
                var char = new Char(scene, game.width/2, -16);
            });
            this.addEventListener('touchend', function(e)
            {
                this.frame = 0;
            });
            scene.addChild(this);
        }
    });
    
    // CLRボタンクラス
    var Clr = Class.create(Sprite,
    {
        initialize: function(scene)
        {
            Sprite.call(this, 64, 48);
            this.image = game.assets[img_clr];
            this.frame = 0;
            this.x = 224;
            this.y = 48;
            this.addEventListener('touchstart', function(e)
            {
                this.frame = 1;
            });
            this.addEventListener('touchend', function(e)
            {
                this.frame = 0;
                restart = true;
            });
            scene.addChild(this);
        }
    });
    
    // 床クラス
    var Floor = Class.create(PhyBoxSprite,
    {
        initialize: function(scene, x, y)
        {
            PhyBoxSprite.call(this, 16, 16, enchant.box2d.STATIC_SPRITE, 0, 1.0, 0, false);
            this.image = game.assets[img_map];
            this.frame = 6;
            this.x = x;
            this.y = y;
            scene.addChild(this);
        }
    });
    
    // キャラクタークラス
    var Char = Class.create(PhyBoxSprite,
    {
        initialize: function(scene, x, y)
        {
            PhyBoxSprite.call(this, 16, 16, enchant.box2d.DYNAMIC_SPRITE, 1.5, 1.0, 0.3, true);
            this.image = game.assets[img_chr];
            this.frame = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
            this.x = x;
            this.y = y;
            this.addEventListener('touchmove', function(e)
            {
                this.x = e.x - this.width / 2;
                this.y = e.y - this.height / 2;
            });
            this.addEventListener('touchend', function(e)
            {
                this.applyImpulse(new b2Vec2(0, 0));
            });
            scene.addChild(this);
        }
    });
    
    // 背景クラス
    var Background = Class.create(Map, {
        initialize: function(scene)
        {
            Map.call(this, 16, 16);
            this.image = game.assets[img_map];
            this.loadData(getBackground());
            scene.addChild(this);
        }
    });
    
    game.onload = function()
    {
        // シーン生成
        var createScene = function()
        {
            var scene = new Scene();
            var world = new PhysicsWorld(0, 9.8);
            var background = new Background(scene);
            var add = new Add(scene);
            var clr = new Clr(scene);
            for(var i=0; i<game.width; i+=16)
            {
                var floor = new Floor(scene, i, game.height-24);
                var floor = new Floor(scene, i, game.height-8);
            }
            scene.addEventListener('enterframe', function()
            {
                world.step(game.fps);
                
                if(restart)
                {
                    game.replaceScene(createScene());
                    restart = false;
                }
            });
            return scene;
        };
        game.replaceScene(createScene());
    }
    // ゲーム開始
    game.start();
}

// 背景の取得
function getBackground()
{
    var background =
    [
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0,15,16,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0,21,22,23, 0, 0, 0, 0, 0, 0, 0, 0,15,17, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,21,23, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0,15,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0,21,23, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16,17, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,21,22,23, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0,12,13,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,19,20, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return background;
}
