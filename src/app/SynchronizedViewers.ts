export class SynchronizedViewers {
    public viewers = [];
    private containers = [];
    private mainViewerIndex = 0;
    private bindedSyncMaps;

    constructor() {
        this.bindedSyncMaps = this.syncMaps.bind(this);
    }

    public addViewer(container) {
        const viewer = new Cesium.Viewer(container, {
            imageryProvider: new Cesium.OpenStreetMapImageryProvider({
                url : 'https://a.tile.openstreetmap.org/'
            })
        });
        
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(37.617518, 55.751965, 10000)
        });

        this.viewers.push(viewer);
        this.containers.push(container);
    }
    
    public setMain(mainIndex) {
        const mainViewer = this.viewers[mainIndex];
        const oldMainViewer = this.viewers[this.mainViewerIndex];

        this.setFocus(mainIndex);

        oldMainViewer.scene.preUpdate.removeEventListener(this.bindedSyncMaps);
        this.mainViewerIndex = mainIndex;
        mainViewer.scene.preUpdate.addEventListener(this.bindedSyncMaps);
    }

    private setFocus(index) {
        this.containers[index].focus();
    }

    private syncMaps() {
        const mainViewer = this.viewers[this.mainViewerIndex];
        const secondaryViewers = this.viewers.filter((element, index) => index !== this.mainViewerIndex);

        secondaryViewers.forEach(viewer => {
            Cesium.Cartesian3.clone(mainViewer.camera.position, viewer.camera.position);
            Cesium.Cartesian3.clone(mainViewer.camera.direction, viewer.camera.direction);
            Cesium.Cartesian3.clone(mainViewer.camera.up, viewer.camera.up);
            viewer.camera.lookAtTransform(mainViewer.camera.transform);
        });
    }

    
}
