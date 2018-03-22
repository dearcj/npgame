
import {O} from "./Objects/O";
import {PIXIContainer, _} from "./main";
import {m, Vec2} from "./Math";
import {Stage} from "./Stages/Stage";
import {ObjectNames} from "./ObjectsList"
const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG   = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG   = 0x20000000;

for (let x in ObjectNames) {
    ObjectNames[x.toLowerCase()] = ObjectNames[x]
}

export type LoadContainerType = {
    container: PIXI.Container;
    list: Array<O>;
}

class Frame {
    src: string;
    hotspot: Array<number> = [0, 0];

    constructor (src) {
        this.src = src;
    }
}

class ImageTile{
    width:      number;
    height:     number;
    source:     string;
    tilesetWidth: number;
    tilesetHeight: number;
}

class BigTileset{
    columns:    number;
    tilecount:  number;
    firstgid:   number;
    tw:         number;
    th:         number;
    texname:    string;
}

export class InstanceType {
    frames: Array<Frame> = [];
    animationData: any = {};
    type: string;
    name: string;
    sid: string;
    baseType: string;

    className: string;
    frameCount: number;
    loop: number;
    pingpong: number;
    repeatcount: number;
    speed: number;
}

export class LM {

    public loading: boolean = false;
    public levels: any = {};
    public objectsList: O[];
    private tilesets: any = {};


    add(name: string, data: any) {
        this.levels[name] = data;
    }

    static extractShortSrc(src: string) {
        src = src.substring(src.lastIndexOf("\\") + 1);
        return src;
    }

    static  XMLtoJSON(x: any): Object{
        if (!x) return {};
        var o = {};
        for (let c of x.children) {
            o[c.tagName] = c.textContent;
        }
        return o;
    }

    static addGfxToWorld(stage: Stage, layerName: string): PIXI.Container {
        if (layerName == 'gui') return _.sm.gui;
        if (layerName == 'gui2') return _.sm.gui2;
        if (layerName == 'olgui') return _.sm.olgui;
        return stage.layers[layerName.toLowerCase()];
    }

    static val(obj: any, tag: string): string {
        var el = obj.getElementsByTagName(tag);
        if (!el.length) return;
        return el[0].textContent;
    }

    loadToContainer(stage: Stage, name: string, cb: Function, noCameraOffset = false, offs: Vec2 = null) : LoadContainerType {
        let c = new PIXI.Container();
        let a = this.load(stage, name, cb, noCameraOffset, offs);
        for (let x of a){
            if (x.gfx) {
                O.rp(x.gfx);
                c.addChild(x.gfx);
            }
        }
        return {list: a, container: c};
    }

    shouldAppear(c: any): boolean {
        let properties = c.getElementsByTagName('properties')[0];
        if (properties) {
            let propertyArray = properties.getElementsByTagName('property');
            for (let p of propertyArray) {
                if (p.attributes.name.value.toLowerCase() == 'appear') {
                    let prob = parseFloat(p.attributes.value.value);
                    if (Math.random()*100 > prob) return false;
                }
            }
        }
        return true;
    }


    load(stage: Stage, name: string, cb: Function, noCameraOffset = false, offs: Vec2 = null, restrictGroup: string = null, addObjects = true, doInit: boolean = true): Array<O> {
        this.loading = true;

        let data = this.levels[name];
        if (!data) {
            console.log('No such level as '+name);
            return;
        }

        let bigtilesets: Array<BigTileset> = [];
        let images = {};
        let map = this.levels[name].getElementsByTagName("map")[0];
        let tw = parseFloat(map.attributes['tilewidth'].value);
        let th = parseFloat(map.attributes['tileheight'].value);
        let objectsList: Array<O> = [];

        let globalProperties = this.getProps(map);

        let tilesets = map.getElementsByTagName("tileset");
        for (let t of tilesets) {
            let firstgid = t.attributes['firstgid'] ? t.attributes['firstgid'].value : 0;
            if (t.attributes['source']) {
                let source = t.attributes['source'].value;
                let sourceNoExt = source.substring(0, source.length - 4);
                t = this.tilesets[sourceNoExt].children[0]
            }
            let tilecount =  t.attributes['tilecount'].value;
            let columns = t.attributes['columns'].value;
            let tiles = t.getElementsByTagName('tile');

            if (!tiles[0]) {
                let img = t.getElementsByTagName('image')[0];
                if (img)
                bigtilesets.push({
                    firstgid: firstgid,
                    tilecount: tilecount,
                    tw: tw,
                    th: th,
                    columns: columns,
                    texname: img.attributes.source.value,
                });

            } else {
                for (let t of tiles) {
                    let img = t.getElementsByTagName('image')[0];
                    if (!img) continue;

                    images[parseInt(t.attributes.id.value) + parseInt(firstgid)]  = {
                        tilesetWidth: tw,
                        tilesetHeight: th,
                        width: img.attributes.width ? img.attributes.width.value : 0,
                        height: img.attributes.height ? img.attributes.height.value : 0,
                        source: img.attributes.source.value.replace(/^.*[\\\/]/, ''),
                    };
                }
            }
        }
        let addObjectsFunc = (c: any, ox: number, oy: number) => {
            if (c.nodeName == 'layer') {
                let name = c.attributes.name.value.toLowerCase();

                let offset: Vec2 = [c.attributes.offsetx ? parseFloat(c.attributes.offsetx.value) : 0, c.attributes.offsety ? parseFloat(c.attributes.offsety.value) : 0];

                offset[0] += ox;
                offset[1] += oy;

                if (!stage.layers[name]) {
                    stage.addLayer(name, null)
                }

                if (!this.shouldAppear(c)) {
                    return
                }

                if (addObjects)
                objectsList = objectsList.concat(this.addLayer(stage, c, bigtilesets, images, offset));
            }

            if (c.nodeName == 'objectgroup') {
                let name = c.attributes.name.value.toLowerCase();
                if (!stage.layers[name]) {
                    stage.addLayer(name, null)
                }

                if (!this.shouldAppear(c)) {
                    return
                }

                if (addObjects)
                objectsList = objectsList.concat(this.addObjectGroup(stage, c, images));
            }
        };

        for (let c of map.childNodes) {
            if (c.nodeName == 'group' && (!restrictGroup || c.attributes.name.value.toLowerCase() == restrictGroup.toLowerCase())) {
                let ox: number= c.attributes.offsetx ? parseFloat(c.attributes.offsetx.value) : 0;
                let oy: number = c.attributes.offsety ? parseFloat(c.attributes.offsety.value) : 0;
                for (let x of c.childNodes) {
                    addObjectsFunc(x, ox, oy)
                }
            } else {
                addObjectsFunc(c,0 ,0)
            }
        }

        if (offs != null) {
            for (let x of objectsList) {
                x.pos[0] += offs[0];
                x.pos[1] += offs[1];
            }
        }
        this.objectsList = objectsList;
        let startLoad = (new Date()).getTime();
        if (doInit)
        this.init(objectsList, noCameraOffset);
        let total = ((new Date()).getTime() - startLoad) / 1000.;
        console.log(objectsList.length, " objects. Load level ", total);

        this.objectsList = null;
        this.loading = false;
        if (cb) cb(objectsList);


        return objectsList
    }

    getProps(node: any): Object {
        let globalProperties = [];
        let props;
        for (let pchildren of node.children) {
            if (pchildren.tagName == 'properties') {
                props = pchildren;
                break;
            }
        }

        if (props) {
            let propertyArray = props.getElementsByTagName('property');
            for (let p of propertyArray) {
                if (p.attributes.value)
                    globalProperties[p.attributes.name.value] = p.attributes.value.value;
            }
        }

        return globalProperties
    }

    addObjectGroup(stage: Stage, objectGroup, images: any): Array<O> {
        let objectsList: Array<O> = [];
        let name = objectGroup.attributes.name.value;
        let offsetx = objectGroup.attributes.offsetx ? parseFloat(objectGroup.attributes.offsetx.value) : 0;
        let offsety = objectGroup.attributes.offsety ? parseFloat(objectGroup.attributes.offsety.value) : 0;
        let objects = objectGroup.getElementsByTagName('object');
        let globalProperties = this.getProps(objectGroup);

        for (let o of objects) {
            let gid = o.attributes.gid ?  parseInt(o.attributes.gid.value ): -1;
            let flipped_horizontally = false;
            let flipped_vertically = false;
                let textureName;
            let image;
            if (gid > 0) {
                flipped_horizontally = (gid & FLIPPED_HORIZONTALLY_FLAG) == -FLIPPED_HORIZONTALLY_FLAG;
                flipped_vertically = (gid & FLIPPED_VERTICALLY_FLAG) == FLIPPED_VERTICALLY_FLAG;

                if (flipped_horizontally) gid &= ~FLIPPED_HORIZONTALLY_FLAG;
                if (flipped_vertically) gid &= ~FLIPPED_VERTICALLY_FLAG;

                image = images[gid];

                if (!image) {
                    console.log("Can't load texture with Tile Id: ", gid);
                } else {
                    textureName = image.source;
                }
            }

            let oo = this.createObject(stage, o, textureName, offsetx, offsety, image ? image.source: null, name, globalProperties, flipped_horizontally, flipped_vertically);
            if (oo) objectsList.push(oo);
        }

        if (globalProperties["color"])
            this.setLayerColor(objectsList, parseInt(globalProperties["color"].replace('#', '0x')));

        if (globalProperties["light"])
            this.setLayerLightColor(objectsList, parseInt(globalProperties["light"].replace('#', '0x')));

        return objectsList;
    }

    createGfx(o: any, textureName: string, x: number, y: number, frameName: string, properties: Array<string>): any {
        let w = o.attributes.width.value;
        let h = o.attributes.height.value;
        let gfx: any;

        if (properties['movieclip'] == 'true') {
            let noExtensionFrameName = frameName.replace(/\.[^/.]+$/, "");
            let noDigitsFrameName = noExtensionFrameName.replace(/[0-9]/g, '');

            gfx = _.cm(noDigitsFrameName);
            if (properties['randomstart'] == 'true') {
                gfx.gotoAndPlay(m.rint(0, gfx.totalFrames- 1));
            } else {
                gfx.gotoAndPlay(0);
            }
            gfx.loop = true;
            gfx.animationSpeed = 0.35;
        } else {
            //TODO: camera
            gfx = _.cs(textureName)
        }

        gfx.anchor.x = .5;
        gfx.anchor.y = .5;
        gfx.width = w;
        gfx.height = h;

        gfx.position.x = 0;
        gfx.position.y = 0;
        gfx.alpha = properties['alpha'] ? properties['alpha'] : 1;
        let blendMode = properties['blendMode'] ? properties['blendMode'].toLowerCase() : '';
        if (blendMode || blendMode == 'normal') gfx.blendMode = PIXI.BLEND_MODES.NORMAL;
        if (blendMode == 'add') gfx.blendMode = PIXI.BLEND_MODES.ADD;
        if (blendMode == 'multiply') gfx.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        if (blendMode == 'screen') gfx.blendMode = PIXI.BLEND_MODES.SCREEN;
        if (blendMode == 'overlay') gfx.blendMode = PIXI.BLEND_MODES.OVERLAY;
        if (blendMode == 'darken') gfx.blendMode = PIXI.BLEND_MODES.DARKEN;
        if (blendMode == 'lighten') gfx.blendMode = PIXI.BLEND_MODES.LIGHTEN;
        if (blendMode == 'dodge') gfx.blendMode = PIXI.BLEND_MODES.COLOR_DODGE;
        if (blendMode == 'burn') gfx.blendMode = PIXI.BLEND_MODES.COLOR_BURN;
        if (blendMode == 'hardLight') gfx.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;
        if (blendMode == 'softLight') gfx.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
        if (blendMode == 'difference') gfx.blendMode = PIXI.BLEND_MODES.DIFFERENCE;
        if (blendMode == 'exclusion') gfx.blendMode = PIXI.BLEND_MODES.EXCLUSION;
        if (blendMode == 'hue') gfx.blendMode = PIXI.BLEND_MODES.HUE;
        if (blendMode == 'saturation') gfx.blendMode = PIXI.BLEND_MODES.SATURATION;
        if (blendMode == 'color') gfx.blendMode = PIXI.BLEND_MODES.COLOR;
        if (blendMode == 'luminosity') gfx.blendMode = PIXI.BLEND_MODES.LUMINOSITY;

        return gfx
    }

    createObject(stage: Stage, o: any, textureName: any, offsetx: number, offsety: number, frameName: string, layerName: string, groupProps: Object, flipX: boolean, flipY: boolean): O{
        let id = o.attributes.id.value;
        let x = parseFloat(o.attributes.x.value);
        let y = parseFloat(o.attributes.y.value);
        let w = o.attributes.width ? parseFloat(o.attributes.width.value) : 0;
        let h = o.attributes.height ? parseFloat(o.attributes.height.value) : 0;
        let name: string = o.attributes.name ? o.attributes.name.value : '';
        let type: string = o.attributes.type ? o.attributes.type.value : '';
        let rot = o.attributes.rotation ? o.attributes.rotation.value : 0;
        rot = Math.PI * (rot / 180);

        //DO THIS ONLY FOR GFX SPRITES
        let offsetVec: Vec2;
        if (textureName) {
            offsetVec = [w / 2, -h/2]
        } else {
            offsetVec = [w / 2, h/2]
        }

        offsetVec = m.rv2(offsetVec, rot);
        x += offsetVec[0];
        y += offsetVec[1];
        let polygons = o.getElementsByTagName('polygon');
        let polygon;
        if (polygons.length > 0) polygon = polygons[0];

        let props = o.getElementsByTagName('property');
        let properties: any = {};
        for (let x of props) {
            properties[x.attributes.name.value] = x.attributes.value ? x.attributes.value.value : x.textContent;
        }

        for (let x in groupProps) {
            properties[x] = groupProps[x]
        }

        if (properties.server) return;

        let className = '';

        if (properties["type"]) className = properties["type"];

        if (type != '') {
            className = type;
        }

        if (properties["singleton"] == 'true') {
            //UniqueCheck
            if (ObjectNames[className] && _.sm.findByType(ObjectNames[className]).length > 0) {
                return null
            }
        }

        let obj: O;
        let startPos: Vec2 = [x + offsetx, y + offsety];

        if (className != '') {
            if (!ObjectNames[className]) {
                console.log('[LevelManager] Cant find class: ', className);
            }

            obj = new (ObjectNames[className])(startPos);
        } else {
            obj = new O(startPos)
        }
        obj.stringID = name;

        if (polygon) { //has gfx
            obj.gfx = this.createPolygon(o, polygon, properties);
        }

        if (textureName) { //has gfx
            obj.gfx = this.createGfx(o, textureName, 0, 0, frameName, properties);
        }

        let visibility: boolean = properties['visible'] == 'false' ? false : true;
        if (obj.gfx) obj.gfx.visible = visibility;


        let layer = LM.addGfxToWorld(stage, layerName);
        obj.layer = layer;

        if (obj.gfx) layer.addChild(obj.gfx);

        if (obj.gfx) {
            if (flipX) obj.gfx.scale.x =- obj.gfx.scale.x;
            if (flipY) {
                obj.gfx.scale.y =- obj.gfx.scale.y;
            }
            obj.gfx.rotation = rot;
        }


        obj.a = rot;
        obj.width = w;
        obj.height = h;

        obj.properties = properties;

        return obj
    }

    addLayer(stage: Stage, layer: any, bigtilesets: Array<BigTileset>, images: any, offset: Vec2) : Array<O> {
        let objectsList = [];
        let data = layer.getElementsByTagName('data')[0];
        let str = data.textContent;
        str = str.replace(/\r?\n|\r/g, '');
        let name = layer.attributes.name.value;
        let arr = str.split(',');
        let len = arr.length;
        let layerWidth = layer.attributes.width.value;
        let layerHeight = layer.attributes.height.value;

        let globalProperties = this.getProps(layer);

        for (let i = 0 ; i < len; i++) {
            if (arr[i] > 0) {
                let textureName;
                let tileID = arr[i];
                if (images[tileID]) {
                    textureName = images[tileID].source
                } else {
                    for (var bt of bigtilesets) {
                        if (bt.firstgid >= tileID && tileID < bt.firstgid + bt.tilecount) {
                            break
                        }
                    }
                    if (!bt) continue;
                    textureName = bt.texname;
                }

                let col = Math.floor(i % layerWidth);
                let row = Math.floor(i / layerWidth);
                let posX = col * images[tileID].tilesetWidth;
                let posY = row * images[tileID].tilesetHeight - (parseFloat(images[tileID].height) - images[tileID].tilesetHeight);

                let type: string = globalProperties['type'];
                let layername: string = globalProperties['name'];

                let o = this.spawnTile(stage, textureName, posX + offset[0], posY + offset[1], name, type, layername);
                o.properties = globalProperties;
                objectsList.push(o);
            }
        }

        if (globalProperties["color"])
            this.setLayerColor(objectsList, parseInt(globalProperties["color"].replace('#', '0x')));

        if (globalProperties["light"])
            this.setLayerLightColor(objectsList, parseInt(globalProperties["light"].replace('#', '0x')));

        return objectsList;
    }

    spawnTile(stage, textureName: string, posX: number, posY: number, layerName: string, type: string, layerStringID : string): O {
        let sprite = _.cs(textureName);

        sprite.anchor.x = 0.;
        sprite.anchor.y = 0.;

        let o: O;
        if (type && type != '' ) {
            o = new ObjectNames[type.toLowerCase()]([posX, posY])
        } else {
            o = new O([posX, posY]);
        }
        o.stringID = layerStringID;
        o.gfx  = sprite;
        let layer = LM.addGfxToWorld(stage, layerName);
        o.layer = layer;
        layer.addChild(sprite);

        return o;
    }

    init(list:  Array<O>, noCameraOffset) {
        for (let o of list) {
            o.noCameraOffset = noCameraOffset;
            let start = (new Date()).getTime();
            o.init(o.properties);
            let end = (new Date()).getTime();
            if ((end - start) / 1000 > 0.05) {
                console.log("ANUS");
            }
        }
    }

    getGroups(level: string, filter: string = null): Array<string> {
        let map = this.levels[level].getElementsByTagName("map")[0];
        let arr = [];
        for (let c of map.childNodes) {
            if (c.nodeName == 'group') {
                let name = c.attributes.name.value.toLowerCase();
                if (!filter) {
                    arr.push(name);
                } else {
                    if (~name.indexOf(filter)) {
                        arr.push(name);
                    }
                }
            }
        }

        return arr;
    }
    private setLayerLightColor(objectsList: O[], color: number) {
        for (let x of objectsList) {
            if (x.gfx && x.gfx.color) {
                let col = m.numhexToRgb(color);

                x.gfx.color.setDark(col[1] / 255, col[2] / 255, col[3] / 255)
            }
        }
    }

    private setLayerColor(objectsList: O[], color: number) {
        for (let x of objectsList) {
            if (x.gfx && x.gfx.color) {
                let col = m.numhexToRgb(color);

                x.gfx.color.setLight(col[1] / 255, col[2] / 255, col[3] / 255)
            }
        }
    }

    loadLayersFromLevelGroup(stage: Stage, level: string, group: string) {
        this.load(stage, level, null, false, null, group, false)
    }

    loadGFXonly(stage: Stage, level: string, offs: Vec2, container: PIXI.Container): PIXI.DisplayObject[] {
        let list = this.load(stage, level, null, false, offs, null, true, false);
        let retList = [];
        for (let x of list) {
            if (x.gfx) {
                O.rp(x.gfx);
                x.gfx.x = x.x;
                x.gfx.y = x.y;
                container.addChild(x.gfx);
                retList.push(x.gfx);
                x.gfx = null;
            }
        }

        _.sm.removeList(list);

        return retList;
    }

    addTileset(result: string, data) {
       /* let tileset = data.children[0];
        for (let tile of tileset.getElementsByTagName('tile')) {
            let id = parseInt(tile.attributes.id.value);
            tile.attributes.id.value = id + 1
        }*/

        this.tilesets[result] = data
    }

    private createPolygon(o: any, polygon: any, properties: any) {
        let g = new PIXI.Graphics();
        let points = polygon.attributes.points.value;
        let pointsArr = points.split(' ');
        g.clear();
        g.beginFill(properties.color ? parseInt(properties.color.replace('#', '0x')) : 0xffffff, properties.alpha ? properties.alpha : 1);
        let arr: number[] = [];
        let minx: number = Infinity;
        let miny: number = Infinity;
        for (let x of pointsArr) {
            let p = x.split(',');
            let xx = parseFloat(p[0]);
            let yy = parseFloat(p[1]);
            minx = minx > xx ? xx : minx;
            miny = miny > yy ? yy : miny;
            arr.push(xx, yy);
        }
        g.drawPolygon(arr);
        let b = g.getBounds();

        let dx = g.width*0.4;
        let dy = g.height*0.4;
        g.x = -minx + dx / 2;
        g.y = -miny + dy / 2;
        g.endFill();

        let bf = new PIXI.filters.BlurFilter(1, 3);
        bf.blurX = properties.blurx ? parseFloat(properties.blurx) : 1;
        bf.blurY = properties.blury ? parseFloat(properties.blury) : 1;
        g.filters = [bf];
        let renderTexture = PIXI.RenderTexture.create(b.width + dx, b.height + dy);
        _.app.renderer.render(g, renderTexture);

        let container = new PIXI.Container();
        let spr = new PIXI.Sprite(renderTexture);
       // spr.anchor.x = 0.5;
       // spr.anchor.y = 0.5;
        spr.x = minx - dx / 2;
        spr.y = miny - dy / 2 ;
        container.addChild(spr);
        return container;
    }
}