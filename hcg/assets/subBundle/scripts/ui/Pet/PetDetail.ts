import { PetData } from "../../data/PetData";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-21 13:55:30 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetDetail extends cc.Component {

    @property({ displayName: "名字", type: cc.Label })
    private petName: cc.Label = null;

    @property({ displayName: "等级", type: cc.Label })
    private petLevel: cc.Label = null;

    @property({ displayName: "经验条", type: cc.Sprite })
    private expBar: cc.Sprite = null;

    @property({ displayName: "经验数值", type: cc.Label })
    private expLabel: cc.Label = null;

    public refresh(petData: PetData): void {
        if (!petData) {
            return;
        }
        this.petName.string = "姓名：" + petData.name;
        this.petLevel.string = "等级：" + petData.level;
        let nextLevelExp = (petData.level + 1) * 50;
        this.expBar.fillRange = petData.exp / nextLevelExp;
        this.expLabel.string = Math.floor(petData.exp) + "/" + nextLevelExp;
    }
}