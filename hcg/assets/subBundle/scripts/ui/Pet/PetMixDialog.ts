import { PrefabPath } from "../../enum/PrefabPath";
import { BaseUI } from "../BaseUI";
import { PetMixItem } from "./PetMixItem";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-21 15:06:55 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetMixDialog extends BaseUI {

    @property({ displayName: "最终怪", type: cc.Node })
    private targetPet: cc.Node = null;

    @property({ displayName: "item容器", type: cc.Node })
    private itemContainer: cc.Node = null;

    private petMixItemList: PetMixItem[] = [];

    public onShow(): void {
        let petMixPre = appContext.resManager.getPrefab(PrefabPath.PET_MIX_ITEM);
        let mixturePets = appContext.petManager.getMixturePets("龙");
        for (let i = 0; i < mixturePets.length; i++) {
            let petName = mixturePets[i];
            let node = cc.instantiate(petMixPre);
            node.setParent(this.itemContainer);
            let petMixItem = node.getComponent(PetMixItem);
            petMixItem.init(petName)
            this.petMixItemList.push(petMixItem);
        }
    }

    private clickMixBtn(): void {
        let layoutCom = this.itemContainer.getComponent(cc.Layout);
        layoutCom.enabled = false;
        this.petMixItemList.forEach(petMixItem => {
            petMixItem.mixItem(this.targetPet.getPosition());
        });
        this.petMixItemList.length = 0;
    }
}
