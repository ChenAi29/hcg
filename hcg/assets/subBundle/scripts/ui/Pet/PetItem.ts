import { PetData } from "../../data/PetData";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-21 13:14:00 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetItem extends cc.Component {

    @property({ displayName: "姓名", type: cc.Label })
    private petNameLabel: cc.Label = null;

    public petData: PetData = null;

    private selectCall: (petData: PetData) => void = null;

    public onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_END, this.selectItem, this);
    }

    public onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_END, this.selectItem, this);
    }

    public init(petData: PetData, selectCall: (petData: PetData) => void): void {
        this.petData = petData;
        this.selectCall = selectCall;

        this.petNameLabel.string = this.petData.name;
    }

    private selectItem(): void {
        this.selectCall && this.selectCall(this.petData);
    }
}
