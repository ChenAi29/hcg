/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-25 09:30:49 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class PetMixItem extends cc.Component {

    @property({ displayName: "名字", type: cc.Label })
    private petName: cc.Label = null;

    public init(petName: string): void {
        this.petName.string = petName;
    }

    public mixItem(endPos: cc.Vec2): void {
        cc.tween(this.node)
            .to(0.8, { x: endPos.x, y: endPos.y })
            .to(0.2, { scale: 1.1 })
            .to(0.2, { scale: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
}