import { UIPath } from "../enum/UIPath";
import { BaseUI } from "../ui/BaseUI";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:01:29 
 * @Description: 
 */
export class UIManager {

    private uiRoot: cc.Node = null;

    private uiDialogContent: cc.Node = null;

    private uiBoardContent: cc.Node = null;

    private dialogMap: Map<UIPath, BaseUI> = new Map();

    public init(uiRoot: cc.Node): void {
        this.uiRoot = uiRoot;
        this.uiBoardContent = new cc.Node();
        this.uiBoardContent.setParent(this.uiRoot);

        this.uiDialogContent = new cc.Node();
        this.uiDialogContent.setParent(this.uiRoot);
    }

    public showDialog(path: UIPath): void {
        let dialogPre = appContext.resManager.getPrefab(path);
        let dialogNode = cc.instantiate(dialogPre);
        dialogNode.setParent(this.uiDialogContent);

        let ui = dialogNode.getComponent(BaseUI);
        ui.onShow();
        this.dialogMap.set(path, ui);
    }

    public closeDialog(path: UIPath): void {
        let ui = this.dialogMap.get(path);
        if (!ui) {
            return;
        }
        ui.node.destroy();
        this.dialogMap.delete(path);
    }

    public showBoard(path: string): void {
        let boardPre = appContext.resManager.getPrefab(path);
        let boardNode = cc.instantiate(boardPre);
        boardNode.setParent(this.uiBoardContent);

        let ui = boardNode.getComponent(BaseUI);
        ui.onShow();
    }
}