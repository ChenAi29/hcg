import { PetData } from "../../data/PetData";
import { PrefabPath } from "../../enum/PrefabPath";
import { UIPath } from "../../enum/UIPath";
import { BaseUI } from "../BaseUI";
import { PetDetail } from "./PetDetail";
import { PetItem } from "./PetItem";
import { PetListContainer } from "./PetListContainer";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:07:57 
 * @Description: 宠物列表
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetListDialog extends BaseUI {

    @property({ displayName: "宠物容器", type: PetListContainer })
    private petContainer: PetListContainer = null;

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
        this.petContainer.init(dataList);
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
