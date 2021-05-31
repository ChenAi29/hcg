import { PetData } from "../data/PetData";
import { BaseUI } from "./BaseUI";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-31 15:19:40 
 * @Description: 战斗界面
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class BattleDialog extends BaseUI {

    @property({ displayName: "回合数", type: cc.Label })
    private roundsLabel: cc.Label = null;

    @property({ displayName: "我方容器", type: cc.Node })
    private selfContainer: cc.Node = null;

    @property({ displayName: "敌人容器", type: cc.Node })
    private enemyContainer: cc.Node = null;

    private curRounds: number = 0;

    private readonly maxRounds: number = 30;

    public onShow(): void {
        let selfDataList: PetData[] = [];
        let enemyDataList: PetData[] = [];
    }

    /* #region  战斗角色生成 */
    private createSelfRole(): void {

    }

    private createEnemyRole(): void {

    }
    /* #endregion */

    private refreshRounds(): void {
        this.roundsLabel.string = "回合" + this.curRounds + "/" + this.maxRounds;
    }

    /* #region  按钮交互 */
    /** 点击攻击按钮 */
    private clickAtkBtn(): void {

    }

    /** 点击技能按钮 */
    private clickSkillBtn(): void {

    }

    /** 点击道具按钮 */
    private clickPropBtn(): void {

    }

    /** 点击自动战斗按钮 */
    private clickAutoBtn(): void {

    }

    /** 点击查看信息按钮 */
    private clickInfoBtn(): void {

    }

    /** 点击逃跑按钮 */
    private clickEscapeBtn(): void {

    }
    /* #endregion */
}
