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

    private displayHeight: number = 0;

    private itemHight: number = 0;

    private itemList: ScrollItem[] = [];

    private firstIndex: number = 0;

    private lastIndex: number = 0;

    private dataList: any[] = [];

    public onEnable(): void {
        this.scrollViewComp.node.on("scrolling", this.scroll, this);

        this.displayHeight = this.displayArea.height;

        let dataList: number[] = [];
        for (let i = 0; i < 10; i++) {
            dataList.push(i);
        }
        this.init(dataList);
    }

    public onDisable(): void {
        this.scrollViewComp.node.targetOff(this);
    }

    public init(dataList: any[]): void {
        this.dataList = dataList;
        let firstItem = this.createItem(dataList[0], 0);
        this.itemHight = firstItem.node.height;
        this.itemList.push(firstItem);

        this.content.height = this.dataList.length * this.itemHight;
        console.error("高度为", this.content.height);


        //创建用于显示的item
        let spawnCount = Math.ceil(this.displayHeight / this.itemHight) + 1;
        for (let i = 1; i < spawnCount + 1; i++) {
            let item = this.createItem(dataList[i], i);
            this.itemList.push(item);
        }

        this.firstIndex = 0;
        this.lastIndex = spawnCount;
    }

    private lastY: number = 0;

    private scroll(): void {
        //+向上
        let curY = this.content.y;
        let displayItemIndex = Math.ceil(curY / this.itemHight);
        let changeCount = displayItemIndex - this.firstIndex;
        if (Math.abs(changeCount) <= 1) {
            return;
        }

        if (changeCount > 0) {
            let topItemList = this.itemList.splice(0, changeCount - 1);
            topItemList.forEach(topItem => {
                let data = this.dataList[this.lastIndex + 1];
                if (!data) {
                    return;
                }
                this.lastIndex++;
                this.firstIndex++;
                topItem.init(data);
                let lastItem = this.itemList[this.itemList.length - 1];
                let y = lastItem.node.y - lastItem.node.height;
                topItem.node.y = y;
                this.lastY += this.itemHight;
                this.itemList.push(topItem);
            });
        } else if (changeCount < 0) {
            let bottomItemList = this.itemList.splice(this.itemList.length - changeCount, changeCount);
            bottomItemList.forEach(bottomItem => {
                let data = this.dataList[this.firstIndex - 1];
                if (!data) {
                    return;
                }
                this.firstIndex--;
                this.lastIndex--;
                bottomItem.init(data);
                let firstItem = this.itemList[0];
                let y = firstItem.node.y + bottomItem.node.height;
                bottomItem.node.y = y;
                this.itemList.unshift(bottomItem);
            });
            // if (Math.abs(offsetY) <= this.itemHight) {
            //         return;
            //     }
            // let dir = 0;
            // if (offsetY > 0) {
            //     dir = Math.floor(offsetY / this.itemHight);
            //     let changeCount = Math.abs(dir);
            //     changeCount--
            //     changeCount = Math.min(this.dataList.length - this.lastIndex - 1, changeCount);
            //     let topItemList = this.itemList.splice(0, changeCount);
            //     topItemList.forEach(topItem => {
            //         let data = this.dataList[this.lastIndex + 1];
            //         if (!data) {
            //             return;
            //         }
            //         this.lastIndex++;
            //         this.firstIndex++;
            //         topItem.init(data);
            //         let lastItem = this.itemList[this.itemList.length - 1];
            //         let y = lastItem.node.y - lastItem.node.height;
            //         topItem.node.y = y;
            //         this.lastY += this.itemHight;
            //         this.itemList.push(topItem);
            //     });
            //} else if (offsetY < 0) {
            // dir = Math.ceil(offsetY / this.itemHight);
            //     let changeCount = Math.abs(dir);
            //     changeCount--
            //     changeCount = Math.min(this.firstIndex, changeCount);
            //     let bottomItemList = this.itemList.splice(this.itemList.length - changeCount - 1, changeCount);
            //     bottomItemList.forEach(bottomItem => {
            //         let data = this.dataList[this.firstIndex - 1];
            //         if (!data) {
            //             return;
            //         }
            //         this.firstIndex--;
            //         this.lastIndex--;
            //         bottomItem.init(data);
            //         let firstItem = this.itemList[0];
            //         let y = firstItem.node.y + bottomItem.node.height;
            //         bottomItem.node.y = y;
            //         this.itemList.unshift(bottomItem);
            //         this.lastY -= this.itemHight;
            //     });
            // }
            // console.error("容器位置", this.content.y, "上次位置:", this.lastY);
        }
    }

    private createItem(data: string, index: number): ScrollItem {
        let itemNode = NodePool.getInstance(this.itemPre);
        let item = itemNode.getComponent(ScrollItem);
        item.init(data);
        itemNode.setParent(this.content);
        itemNode.setPosition(100, index * -100);
        return item;
    }
}
