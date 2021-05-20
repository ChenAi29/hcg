/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:16:59 
 * @Description: 
 */

declare global {

    interface Window {
        appContext: AppContext;
    }
    let appContext: AppContext;
}

const { ccclass, property } = cc._decorator;

@ccclass

export class AppContext extends cc.Component {

    public onLoad(): void {
        window.appContext = this;
    }
}