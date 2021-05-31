/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-26 16:27:16 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class ScrollItem extends cc.Component {

    private data: any = null;

    public getData(): any {
        return this.data;
    }

    public init(...args): void {
    }
}
