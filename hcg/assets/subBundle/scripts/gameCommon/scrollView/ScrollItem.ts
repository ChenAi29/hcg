/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-26 16:27:16 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class ScrollItem extends cc.Component {

    @property({ displayName: "文字", type: cc.Label })
    private label: cc.Label = null;

    private data: any = null;

    public getData(): any {
        return this.data;
    }

    public init(...args): void {
    }
}
