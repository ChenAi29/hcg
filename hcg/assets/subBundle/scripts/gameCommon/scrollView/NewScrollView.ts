import { NodePool } from "../NodePool";
import { ScrollItem } from "./ScrollItem";

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-26 15:01:49 
 * @Description: 
 */
const { ccclass, property } = cc._decorator;

@ccclass
export class NewScrollView extends cc.Component {

    @property({ displayName: "滚动组件", type: cc.ScrollView })
    private scrollViewComp: cc.ScrollView = null;

    @property({ displayName: "滚动板", type: cc.Node })
    private content: cc.Node = null;

    @property({ displayName: "显示区域", type: cc.Node })
    private displayArea: cc.Node = null;

    @property({ displayName: "预制", type: cc.Prefab })
    private itemPre: cc.Prefab = null;

    /** 边距 */
    private sideInterval: number = 20;

    private displayHeight: number = 0;

    private itemHight: number = 0;

    private itemList: ScrollItem[] = [];

    private firstIndex: number = 0;

    private lastIndex: number = 0;

    private dataList: any[] = [];

    private fixedPosList: number[] = [];

    public onEnable(): void {
        this.scrollViewComp.node.on("scrolling", this.scroll, this);

        this.displayHeight = this.displayArea.height;

        // let dataList: number[] = [];
        // for (let i = 0; i < 100; i++) {
        //     dataList.push(i);
        // }
        // this.init(dataList);
    }

    public onDisable(): void {
        this.scrollViewComp.node.targetOff(this);
    }

    /** 计算行数 */
    private calculateLine(): void {
        let itemNode = NodePool.getInstance(this.itemPre);
        this.itemHight = itemNode.height;
        let width = this.displayArea.width;
        let numPerLine = Math.floor(width / itemNode.width);
        for (let i = 0; i < numPerLine; i++) {
            let offset = Math.floor((width - numPerLine * itemNode.width) / (numPerLine));
            let fixedValue = (itemNode.width + offset) * i + offset / 2;
            this.fixedPosList.push(fixedValue);
        }

        NodePool.returnInstance(itemNode);
    }

    public init(dataList: any[]): void {
        this.dataList = dataList;
        this.calculateLine()

        this.content.height = Math.ceil(this.dataList.length / this.fixedPosList.length) * this.itemHight;
        //创建用于显示的item
        let spawnCount = (Math.ceil(this.displayHeight / this.itemHight) + 1) * this.fixedPosList.length;
        for (let i = 0; i < spawnCount; i++) {
            let item = this.createItem(dataList[i], i);
            this.itemList.push(item);
        }

        this.firstIndex = 0;
        this.lastIndex = spawnCount - 1;
    }

    private scroll(): void {
        let value = this.content.y;
        let perLineCount = this.fixedPosList.length;
        let firstDisplayIndex = Math.floor(value / this.itemHight) * perLineCount;
        let topChangeCount = firstDisplayIndex - this.firstIndex;
        //向上移动
        if (topChangeCount > 0) {
            //防止超出上限
            topChangeCount = Math.min(this.dataList.length - this.lastIndex - 1, topChangeCount);
            let topItemList = this.itemList.splice(0, topChangeCount);
            topItemList.forEach(topItem => {
                this.firstIndex++;
                this.lastIndex++;
                let data = this.dataList[this.lastIndex];
                topItem.init(data);
                topItem.node.setPosition(this.getItemPos(this.lastIndex));
                this.itemList.push(topItem);
            });
            return;
        }

        let bottomDisplayIndex = Math.floor(this.displayHeight / this.itemHight) * perLineCount + firstDisplayIndex + perLineCount - 1;
        let bottomChangeCount = bottomDisplayIndex - this.lastIndex;
        //向下移动
        if (bottomChangeCount < -perLineCount) {
            bottomChangeCount = Math.abs(bottomChangeCount) - perLineCount;
            //防止低于下限
            let finalBottomCount = Math.min(this.firstIndex, bottomChangeCount);
            let bottomItemList = this.itemList.splice(this.itemList.length - finalBottomCount, finalBottomCount);
            bottomItemList.forEach(bottomItem => {
                this.firstIndex--;
                this.lastIndex--;
                let data = this.dataList[this.firstIndex];
                bottomItem.init(data);
                bottomItem.node.setPosition(this.getItemPos(this.firstIndex));
                this.itemList.unshift(bottomItem);
            });
        }
    }

    private createItem(data: string, index: number): ScrollItem {
        let itemNode = NodePool.getInstance(this.itemPre);
        let item = itemNode.getComponent(ScrollItem);
        item.init(data);
        itemNode.setParent(this.content);
        itemNode.setPosition(this.getItemPos(index));
        return item;
    }

    private getItemPos(index: number): cc.Vec2 {
        let lineCount = this.fixedPosList.length;
        let x = this.fixedPosList[index % lineCount];
        let y = Math.floor(index / lineCount) * -this.itemHight;
        return cc.v2(x, y);
    }
}
