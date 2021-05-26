import { PetData } from "../../data/PetData";
import { PrefabPath } from "../../enum/PrefabPath";
import { UIPath } from "../../enum/UIPath";
import { BaseUI } from "../BaseUI";
import { PetDetail } from "./PetDetail";
import { PetItem } from "./PetItem";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:07:57 
 * @Description: 宠物列表
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetListDialog extends BaseUI {

    @property({ displayName: "宠物容器", type: cc.Node })
    private petContainer: cc.Node = null;

    @property({ displayName: "信息界面", type: PetDetail })
    private petDetail: PetDetail = null;

    public onShow(): void {
        this.refreshPetList();
    }

    private refreshPetList(): void {
        let dataList = appContext.playerData.petDataList;
        if (!dataList.length) {
            return;
        }
        let offsetX = 30;
        let offsetY = 30;
        let petPre = appContext.resManager.getPrefab(PrefabPath.PET_ITEM);
        for (let i = 0; i < dataList.length; i++) {
            let petData = dataList[i];
            if (!petData) {
                continue;
            }
            let petItemNode = cc.instantiate(petPre);
            petItemNode.setParent(this.petContainer);
            let x = offsetX / 2 + (i % 3) * (offsetX + petItemNode.width);
            let y = -(offsetY / 2 + Math.floor(i / 3) * (offsetY + petItemNode.height));
            petItemNode.setPosition(x, y);
            let petItem = petItemNode.getComponent(PetItem);
            petItem.init(petData, this.refreshDetail.bind(this));
        }
    }

    private clickCloseBtn(): void {
        appContext.uiManager.closeDialog(UIPath.PET_DIALOG);
    }

    private clickMixBtn(): void {
        appContext.uiManager.showDialog(UIPath.PET_MIX_DIALOG);
    }

    /** 刷新详情界面 */
    private refreshDetail(petData: PetData): void {
        this.petDetail.refresh(petData);
    }
}
