/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-27 10:43:45 
 * @Description: 
 */
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export class NewLayout extends cc.Component {

    @property({ displayName: "排列模式", type: cc.Enum(cc.Layout.Type) })
    private layoutType: cc.Layout.Type = cc.Layout.Type.NONE;

    @property({
        tooltip: "固定垂直于布局方向的坐标",
        visible: function (this) {
            return this.isVOrH();
        }
    } || cc.Boolean)
    private isNeedFixed: boolean = false;

    @property({
        type: cc.Float,
        tooltip: "固定值",
        visible: function (this) {
            return this.isVOrH()
                && this.isNeedFixed;
        }
    })
    private fixedValue: number = 0;

    @property({
        displayName: "上下间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.VERTICAL;
        }
    })
    private spacingY: number = 0;

    @property({
        displayName: "上边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.VERTICAL;
        }
    })
    private top: number = 0;

    @property({
        displayName: "下边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.VERTICAL;
        }
    })
    private bottom: number = 0;

    @property({
        displayName: "左右间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL;
        }
    })
    private spacingX: number = 0;

    @property({
        displayName: "左边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL;
        }
    })
    private left: number = 0;

    @property({
        displayName: "右边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL;
        }
    })
    private right: number = 0;

    /** 水平 */
    private tempSpacingY: number = 0;
    private tempTop: number = 0;
    private tempBottom: number = 0;

    private tempSpacingX: number = 0;

    private isVOrH(): boolean {
        return this.layoutType === cc.Layout.Type.VERTICAL ||
            this.layoutType === cc.Layout.Type.HORIZONTAL;
    }

    public onEnable(): void {
        this.node.on("size-changed", this.refreshLayout, this);
        this.node.on("anchor-changed", this.refreshLayout, this);
        this.node.on("child-added", this.refreshLayout, this);
        this.node.on("child-removed", this.refreshLayout, this);
        this.node.on("child-reorder", this.refreshLayout, this);

        this.tempSpacingY = this.spacingY;
        this.tempTop = this.top;
        this.tempBottom = this.bottom;

        this.tempSpacingX = this.spacingX;
    }

    public onDisable(): void {
        this.node.off("size-changed", this.refreshLayout, this);
        this.node.off("anchor-changed", this.refreshLayout, this);
        this.node.off("child-added", this.refreshLayout, this);
        this.node.off("child-removed", this.refreshLayout, this);
        this.node.off("child-reorder", this.refreshLayout, this);
    }

    public update(dt: number): void {
        //只在编辑器刷新
        if (!CC_EDITOR) {
            return;
        }
        switch (this.layoutType) {
            case cc.Layout.Type.NONE:
                break;

            case cc.Layout.Type.HORIZONTAL:
                if (this.tempSpacingX != this.spacingX
                    || this.tempTop != this.top
                    || this.tempBottom != this.bottom
                ) {
                    this.tempSpacingX = this.spacingX;
                    this.tempTop = this.top;
                    this.tempBottom = this.bottom;

                    this.refreshLayout();
                }
                break;

            case cc.Layout.Type.VERTICAL:
                if (this.tempSpacingY != this.spacingY) {
                    this.tempSpacingY = this.spacingY;
                    this.refreshLayout();
                }
                break;

            case cc.Layout.Type.GRID:
                break;
        }
    }

    public refreshLayout(): void {
        let children = this.node.children;
        let y = 0;
        let x = 0;
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (!child) {
                return;
            }
            switch (this.layoutType) {
                case cc.Layout.Type.NONE:
                    break;

                case cc.Layout.Type.HORIZONTAL:
                    child.y = y;
                    if (this.isNeedFixed) {
                        child.x = this.fixedValue;
                    }
                    y -= child.height + this.spacingY;
                    break;

                case cc.Layout.Type.VERTICAL:
                    child.x = x;
                    if (this.isNeedFixed) {
                        child.y = this.fixedValue;
                    }
                    x += child.width + this.spacingX;
                    break;

                case cc.Layout.Type.GRID:
                    break;
            }
        }
    }

}