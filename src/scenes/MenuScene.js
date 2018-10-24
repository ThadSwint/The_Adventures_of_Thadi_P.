import { CST } from "../CST";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
    }
    preload(){

    }
    create(){
        // Music to be played on load
        this.sound.pauseOnBlur = false;
        this.sound.play("titleMusic",{
            loop: true,
            volume: .03
        })
        // Play button and logic 
        this.add.image(0,0, "titleMenu").setOrigin(0);
        let playbutton = this.add.image(this.game.renderer.width /2, this.game.renderer.height / 2, "buttonBar").setScale(.5);
        playbutton.setInteractive();
        playbutton.on("pointerup", ()=>{
            this.sound.stopAll();
            this.scene.start(CST.SCENES.PLAINS);
        })

    }
}