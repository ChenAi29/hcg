import { PetData } from "../data/PetData";
import { UIPath } from "../enum/UIPath";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-31 15:54:02 
 * @Description: 战斗管理
 */

export class BattleManager {

    private battleRoleList: PetData[] = [];

    public startBattle(): void {
        appContext.uiManager.showDialog(UIPath.BATTLE_DIALOG);
    }
}