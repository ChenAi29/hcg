import { PetData } from "../../data/PetData";
import { NewScrollView } from "../../gameCommon/scrollView/NewScrollView";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-29 10:14:01 
 * @Description: 
 */

const { ccclass, property } = cc._decorator;

@ccclass
export class PetListContainer extends NewScrollView {

    public init(dataList: PetData[]): void {
        super.init(dataList);
    }
}