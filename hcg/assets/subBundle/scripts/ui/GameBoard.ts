import { PetData } from "../data/PetData";
import { UIPath } from "../enum/UIPath";
import { BaseUI } from "./BaseUI";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-21 10:08:32 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class GameBoard extends BaseUI {


    private nameList: string[] = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪", "鱼", "鹰", "蜃", "驼", "鹿"];

    private addPet(): void {
        let roleDataList = appContext.playerData.petDataList;
        let roleData = new PetData();
        roleData.level = 1;
        roleDataList.push(roleData);
        roleData.id = roleDataList.length;
        roleData.exp = Math.floor(Math.random() * 50);
        let nameIndex = Math.floor(Math.random() * this.nameList.length);
        roleData.name = this.nameList[nameIndex];
    }

    private clickPetListBtn(): void {
        appContext.uiManager.showDialog(UIPath.PET_DIALOG);
    }
}
