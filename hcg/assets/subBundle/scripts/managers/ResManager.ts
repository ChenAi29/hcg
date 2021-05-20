import { AssetBundleManager } from "./AssetBundleManager"

/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 17:21:29 
 * @Description: 资源管理
 */
export class ResManager {

    private preMap: Map<string, cc.Prefab> = new Map();

    public async init(): Promise<any> {
        await this.preLoadDir("resBundle", "prefab", cc.Prefab, this.preMap);
    }

    private async preLoadDir<T extends cc.Asset>(
        bundleName: string,
        url: string,
        assType: typeof cc.Asset,
        targetMap: Map<string, T>
    ) {
        let assetMap = await AssetBundleManager.loadBundleDir(bundleName, url, assType);
        assetMap.forEach((path, asset) => {
            targetMap.set(path, asset);
        });
    }
}