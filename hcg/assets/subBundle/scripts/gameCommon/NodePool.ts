/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-25 10:20:55 
 * @Description: 
 */
export class NodePool {

    public static nodeMap: Map<cc.Prefab, cc.Node[]> = new Map();

    public static instanceToPre: Map<cc.Node, cc.Prefab> = new Map();

    public static getInstance(prefab: cc.Prefab): cc.Node {
        let nodeList = this.nodeMap.get(prefab);
        if (nodeList && nodeList.length) {
            let targetNode = nodeList.pop();
            targetNode.active = true;
            return targetNode;
        }
        nodeList = [];
        this.nodeMap.set(prefab, nodeList);

        let node = cc.instantiate(prefab);
        this.instanceToPre.set(node, prefab);
        return node;
    }

    public static returnInstance(node: cc.Node): void {
        let prefab = this.instanceToPre.get(node);
        if (!prefab) {
            node.destroy();
            return;
        }
        node.active = false;
        node.removeFromParent();
        let nodeList = this.nodeMap.get(prefab);
        nodeList.push(node);
    }
}