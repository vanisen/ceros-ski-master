export class AssetManager {
    loadedAssets = [];

    constructor() {
    }

    async loadAssets(assets) {
        const assetPromises = [];

        for (const [assetName, assetUrl] of Object.entries(assets)) {
            if(assetUrl.constructor === Array) {
                assetUrl.map((a,i) => {
                    const assetPromise = this.loadSingleAsset(a, assetName+'_'+i);
                    assetPromises.push(assetPromise);
                });
            } else {
                const assetPromise = this.loadSingleAsset(assetUrl, assetName);
                assetPromises.push(assetPromise);
            }            
        }

        await Promise.all(assetPromises);
    }

    loadSingleAsset(assetUrl, assetName, index) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.onload = () => {
                assetImage.width /= 2;
                assetImage.height /= 2;
                this.loadedAssets[assetName] = assetImage;
                resolve();
            };
            assetImage.src = assetUrl;
        });
    }

    getAsset(assetName) {
        return this.loadedAssets[assetName];
    }
}