
import { PlayerData } from "./data/PlayerData";
import { UIPath } from "./enum/UIPath";
import { PetManager } from "./managers/PetManager";
import { ResManager } from "./managers/ResManager";
import { UIManager } from "./managers/UIManager";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:16:59 
 * @Description: 
 */

declare global {

    interface Window {
        appContext: AppContext;
    }
    let appContext: AppContext;
}

const { ccclass, property } = cc._decorator;

@ccclass

export class AppContext extends cc.Component {

    public resManager: ResManager = new ResManager();

    public uiManager: UIManager = new UIManager();

    public playerData: PlayerData = new PlayerData();

    public petManager: PetManager = new PetManager();

    private uiRoot: cc.Node = null;

    public gameObjectRoot: cc.Node = null;

    public onLoad(): void {
        window.appContext = this;

        let canvas = cc.Canvas.instance.node;
        this.gameObjectRoot = new cc.Node();
        this.gameObjectRoot.setParent(canvas);

        this.uiRoot = new cc.Node();
        this.uiRoot.setParent(canvas);

        this.init();
    }

    public async init(): Promise<any> {
        await this.resManager.init();
        this.uiManager.init(this.uiRoot);
        this.initCompleted();
    }

    private initCompleted(): void {
        // appContext.uiManager.showBoard(UIPath.GAME_BOARD);
    }
}