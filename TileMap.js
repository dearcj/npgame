define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TileObject = /** @class */ (function () {
        function TileObject() {
        }
        return TileObject;
    }());
    exports.TileObject = TileObject;
    var TileMap = /** @class */ (function () {
        function TileMap(columns, rows, tw, th, offset) {
            this.columns = 0;
            this.rows = 0;
            this.objects = [];
            this.offset = offset;
            this.tileWidth = tw;
            this.tileHeigth = th;
            this.columns = columns;
            this.rows = rows;
            for (var i = 0; i < rows * columns; ++i) {
                var o = new TileObject();
                o.x = Math.floor(i % this.columns);
                o.y = Math.floor(i / this.columns);
                o.rectPos = [o.x * tw + offset[0], o.y * th + offset[1]];
                o.rectSize = [tw, th];
                this.objects[i] = o;
            }
        }
        TileMap.prototype.changeOccupy = function (x, y, obj) {
            this.objects[x * this.columns + y].occupiedBy = obj;
        };
        TileMap.prototype.get = function (x, y) {
            return this.objects[y * this.columns + x];
        };
        return TileMap;
    }());
    exports.TileMap = TileMap;
});
