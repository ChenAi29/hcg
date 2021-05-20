/*
 * @Author: Xiong ZhiCheng 
 * @Date: 2021-05-20 18:44:38 
 * @Description: 
 */
export class AssetBundleManager {

    private static bundleMap: Map<string, cc.AssetManager.Bundle> = new Map();

    private static getBundle(bundleName: string): Promise<cc.AssetManager.Bundle> {
        let targetBundle = this.bundleMap.get(bundleName);
        if (targetBundle) {
            return Promise.resolve(targetBundle);
        }
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, null, (err, asset: cc.AssetManager.Bundle) => {
                if (asset) {
                    this.bundleMap.set(bundleName, asset);
                    resolve(asset);;
                }
                resolve(null);
            })
        })
    }

    public static async loadBundleRes(bundleName: string, url: string, assType: typeof cc.Asset): Promise<any> {
        let bundle = await this.getBundle(bundleName);
        if (!bundle) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            bundle.load(url, assType, (err, ass) => {
                if (err) {
                    resolve(null);
                    return;
                }
                resolve(ass);
            });
        });
    }

    public static async loadBundleDir(bundleName: string, url: string, assType: typeof cc.Asset): Promise<any> {
        let bundle = await this.getBundle(bundleName);
        if (!bundle) {
            return Promise.resolve(null);
        }
        return new Promise((resolve, reject) => {
            bundle.loadDir(url, assType, (err, assetList: cc.Asset[]) => {
                if (err || !assetList) {
                    resolve(null);
                }
                let assetMap: Map<string, cc.Asset> = new Map();
                assetList.forEach(asset => {
                    if (!asset) {
                        return;
                    }
                    let info = bundle.getAssetInfo(asset._uuid);
                    if (!info) {
                        return;
                    }
                    assetMap.set(info.path, asset);
                });
                resolve(assetMap);
            })
        });

    }
}