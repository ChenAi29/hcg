/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-27 10:43:45 
 * @Description: 
 */
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export class NewLayout extends cc.Component {

    @property({ displayName: "排列模式", type: cc.Enum(cc.Layout.Type), tooltip: "HORIZONTAL：水平的\n VERTICAL：垂直的" })
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
            return this.layoutType === cc.Layout.Type.VERTICAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private spacingY: number = 0;

    @property({
        displayName: "上边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.VERTICAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private top: number = 0;

    @property({
        displayName: "下边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.VERTICAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private bottom: number = 0;

    @property({
        displayName: "左右间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private spacingX: number = 0;

    @property({
        displayName: "左边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private left: number = 0;

    @property({
        displayName: "右边界间隔",
        type: cc.Float,
        visible: function (this) {
            return this.layoutType === cc.Layout.Type.HORIZONTAL || this.layoutType === cc.Layout.Type.GRID;
        }
    })
    private right: number = 0;

    /** 垂直 */
    private tempSpacingY: number = 0;
    private tempTop: number = 0;
    private tempBottom: number = 0;

    private tempSpacingX: number = 0;
    private tempLeft: number = 0;
    private tempRight: number = 0;

    private tempLayoutType: cc.Layout.Type = cc.Layout.Type.NONE;

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
        if (this.layoutType != this.tempLayoutType) {
            this.tempLayoutType = this.layoutType;
            this.refreshLayout();
            return;
        }
        switch (this.layoutType) {
            case cc.Layout.Type.NONE:
                break;

            case cc.Layout.Type.HORIZONTAL:
                if (this.tempSpacingX != this.spacingX
                    || this.tempLeft != this.left
                    || this.tempRight != this.right
                ) {
                    this.tempSpacingX = this.spacingX;
                    this.tempLeft = this.left;
                    this.tempRight = this.right;

                    this.refreshLayout();
                }
                break;

            case cc.Layout.Type.VERTICAL:
                if (this.tempSpacingY != this.spacingY
                    || this.tempTop != this.top
                    || this.tempBottom != this.bottom
                ) {
                    this.tempSpacingY = this.spacingY;
                    this.tempTop = this.top;
                    this.tempBottom = this.bottom;

                    this.refreshLayout();
                }
                break;

            case cc.Layout.Type.GRID:
                if (this.tempSpacingY != this.spacingY
                    || this.tempTop != this.top
                    || this.tempBottom != this.bottom
                    || this.tempSpacingX != this.spacingX
                    || this.tempLeft != this.left
                    || this.tempRight != this.right
                ) {
                    this.tempSpacingY = this.spacingY;
                    this.tempTop = this.top;
                    this.tempBottom = this.bottom;

                    this.tempSpacingX = this.spacingX;
                    this.tempLeft = this.left;
                    this.tempRight = this.right;

                    this.refreshLayout();
                }
                break;
        }
    }

    public refreshLayout(): void {
        let children = this.node.children;
        let y = 0;
        let x = 0;
        let childrenCount = children.length;
        for (let i = 0; i < childrenCount; i++) {
            let child = children[i];
            if (!child) {
                return;
            }
            switch (this.layoutType) {
                case cc.Layout.Type.NONE:
                    break;

                case cc.Layout.Type.HORIZONTAL:
                    if (x == 0) {
                        x = this.left;
                    }
                    x += child.width / 2;
                    child.x = x;
                    if (this.isNeedFixed) {
                        child.y = this.fixedValue;
                    }

                    if (i == childrenCount - 1) {
                        this.node.width = x + child.width / 2;
                        break;
                    }
                    x += child.width / 2 + this.spacingX;
                    break;

                case cc.Layout.Type.VERTICAL:
                    if (y == 0) {
                        y = this.top;
                    }
                    y -= child.height / 2;
                    child.y = y;
                    if (this.isNeedFixed) {
                        child.x = this.fixedValue;
                    }
                    if (i == childrenCount - 1) {
                        this.node.height = y + child.height / 2;
                        break;
                    }
                    y -= child.height / 2 + this.spacingY;
                    break;

                case cc.Layout.Type.GRID:
                    this.refreshGirdLayout();
                    break;
            }
        }

    }

    /** 刷新网格视图 */
    private refreshGirdLayout(): void {
        let children = this.node.children;
        let firstX = -this.node.width * this.node.anchorX;
        let firstY = this.node.height * (1 - this.node.anchorY);
        let x = firstX + this.left;
        let y = firstY - this.top;
        let isInitY = false;
        let lastHeight = 0;
        let lastWidth = 0;
        for (let i = 0; i < children.length; i++) {
            let childNode = children[i];
            if (!childNode) {
                continue;
            }
            if (x + childNode.width + lastWidth + this.spacingX + this.right > this.node.width) {
                //大于边界，水平方向换行
                x = this.left;
                isInitY = false;
                lastWidth = 0;
            }
            if (!isInitY) {
                isInitY = true;
                y -= childNode.height * (1 - childNode.anchorY) + lastHeight + this.spacingY;
            }
            x += childNode.width * childNode.anchorX + this.spacingX + lastWidth;
            childNode.x = x;
            childNode.y = y;
            lastWidth = childNode.width * (1 - childNode.anchorX);
            lastHeight = childNode.height * childNode.anchorY;
        }
    }
}