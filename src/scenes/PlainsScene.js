import { CST } from "../CST";
var player; 
export class PlainsScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PLAINS
        })
    }
    init(data){
    }
    create(){
        var mics;
        var platforms;
        var score = 0;

  //camera & world boundary
  this.cameras.main.setBounds(0, 0, 1000, 568);
  this.physics.world.setBounds(0, 0, 1000, 600);
  // add a sky
  this.add.image(600, 568, 'sky');

  // create some platforms 
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(1).refreshBody();        

  // Add my main man & logic
  //position of start
  player = this.physics.add.sprite(100, 450, 'thad').setScale(1.3);
  player.setBounce(.001);
  player.setCollideWorldBounds(true);
  this.cameras.main.startFollow(player, true, 0.01, 0.08);
  
  // Add some animations
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('thad', { start: 0, end: 6 }),
      frameRate: 8,
      repeat: -1
  });
  this.anims.create({
  key: 'turn',
  frames: [ { key: 'thad', frame: 7 } ],
  frameRate: 0
});
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('thad', { start: 8, end: 14 }),
      frameRate: 8,
      repeat: -1
  });
  this.anims.create({
      key: 'jump',
      frames: [ { key: 'thad', frame: 15 } ],
      frameRate: 0
  });
  this.anims.create({
      key: 'crouch',
      frames: [ { key: 'thad', frame: 16 } ],
      frameRate: 0
  });

  
  // Mics to pick up and logic
  mics = this.physics.add.group({
      key: 'mic',
      repeat: 5,
      setXY: { x: 100, y: 0, stepX: 160 }
  });
  mics.children.iterate(function (child) {
  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
});

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(mics, platforms);
  this.physics.add.overlap(player, mics, collectMics, null, this);
}
update(){
    // Move logic 
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown )
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn', true);
    }
    if (!player.body.touching.down)
    {
        player.anims.play('jump', true);
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    if (cursors.down.isDown && player.body.touching.down) {
        player.anims.play('crouch', true);
    }
}
  
}
    function collectMics (player, mic, score){
        mic.disableBody(true, true);
    }

// To-do: Add a score and health meter