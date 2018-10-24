import { CST } from "../CST";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init(){
        //plugins recieve data from other scenes
    }
    preload(){
        //assets, sprites, audio
        this.load.audio('titleMusic', './assets/Funk.mp3')
        this.load.image('titleMenu', './assets/TitleMenu.png');
        this.load.image('buttonBar', './assets/buttonBack.png');
        this.load.image('ground', './assets/platform.png');
        this.load.image('mic', './assets/mic.png');
        this.load.image('sky', './assets/Sky4.png');
        this.load.spritesheet('thad', './assets/Thad_Final.png', { frameWidth: 86, frameHeight: 56 });
        
        // Just for fun 
        let loadingBar = this.add.graphics({
            fillStyle:{
                color: 0xffffff
            }
        })
        this.add.text(100, 400, 'Loading').setFontFamily('Arial').setFontSize(64).setColor('#FFFFFF');
        for (let index = 0; index < 10000; index++) {
            this.load.audio('titleMusic', './assets/Funk.mp3')
            this.load.image('titleMenu', './assets/TitleMenu.png');
            this.load.image('buttonBar', './assets/buttonBack.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('mic', './assets/mic.png');
            this.load.image('sky', './assets/Sky4.png');
            this.load.spritesheet('thad', './assets/Thad_Final.png', { frameWidth: 86, frameHeight: 56 });         
        }
        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
        })
    }
    create(){
        // game objs & data
        this.scene.start(CST.SCENES.MENU, "yo");
    }
}