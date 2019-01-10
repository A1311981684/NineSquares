/**
 * Created by xunj on 16-7-5.
 */
var chartExp = {
    chart: {},
    startPoint: {x: 0, y: 0},
    width: 700,
    height: 500
}
function Tape(name, X, Y, Chart, Sharp) {
    this.name = name
    this.X = X
    this.Y = Y
    this.c = Chart
    this.isStagger = false
    this.tapeSharp = Sharp
    this._circleArea = {}
    this._wellSeatWidth = new Number
    this._wellSeatHeight = new Number
    this._r = new Number
    this._ctx = {}
}
Tape.prototype.darw = function () {
    var c = this.c.chart
    var ctx = c.getContext("2d");
    this._ctx = ctx
    this._backgroundCtx=this.c.background.getContext("2d")
    var xwell = this.X
    var ywell = this.Y
    var scale = (this.c.width / this.c.height) > (this.tapeSharp.width / this.tapeSharp.height) ? (this.tapeSharp.height / this.c.height) : (this.tapeSharp.width / this.c.width)
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.lineCap = "butt";
    //ctx.strokeRect(this.c.startPoint.x + 0.5, this.c.startPoint.y + 0.5, this.c.width - 0.5, this.c.height - 0.5);//使用0.5使得直线在非高分屏中显示更锐利
    var stagger = this.isStagger
    var tapeWidth = (this.c.width / this.c.height) > (this.tapeSharp.width / this.tapeSharp.height) ? this.c.height * (this.tapeSharp.width / this.tapeSharp.height) : this.c.width
    var tapeHeight = (this.c.width / this.c.height) > (this.tapeSharp.width / this.tapeSharp.height) ? this.c.height : this.c.width * (this.tapeSharp.height / this.tapeSharp.width)
    var circleArea = {
        s: {
            x: this.c.startPoint.x + this.tapeSharp.paddingLeft / scale,
            y: this.c.startPoint.y + this.tapeSharp.paddingTop / scale
        },
        e: {
            x: this.c.startPoint.x + tapeWidth - this.tapeSharp.paddingRight / scale,
            y: this.c.startPoint.y + tapeHeight - this.tapeSharp.paddingBottom / scale
        }
    }
    this._circleArea = circleArea
    if (stagger) {
        this._wellSeatWidth = (circleArea.e.x - circleArea.s.x) / (xwell + 0.5)
    } else {
        this._wellSeatWidth = (circleArea.e.x - circleArea.s.x) / xwell
    }
    this._wellSeatHeight = (circleArea.e.y - circleArea.s.y) / ywell

    var r = this.tapeSharp.d / scale / 2
    this._r = r

    ctx.beginPath()
    for (var i = 0; i < this.tapeSharp.contour.length; i++) {
        ctx.moveTo(this.c.startPoint.x + this.tapeSharp.contour[i][0][0] / scale, this.c.startPoint.y + this.tapeSharp.contour[i][0][1] / scale)
        for (var j = 0; j < this.tapeSharp.contour[i].length; j++) {
            ctx.lineTo(this.c.startPoint.x + this.tapeSharp.contour[i][j][0] / scale, this.c.startPoint.y + this.tapeSharp.contour[i][j][1] / scale)
        }
    }

    var xc = circleArea.s.x + this._wellSeatWidth / 2
    var yc = circleArea.s.y + this._wellSeatHeight / 2
    for (var x = 0; x < xwell; x++) {
        for (var y = 0; y < ywell; y++) {
            var center = {
                x: xc + x * this._wellSeatWidth,
                y: yc + y * this._wellSeatHeight
            }
            if ((y % 2 != 0) && stagger) {
                center.x = center.x + (this._wellSeatWidth / 2)
            }
            ctx.moveTo(center.x + r, center.y)
            ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
        }
    }
    ctx.stroke();
    ctx.closePath();
}
Tape.prototype.select = function (ids) {
    var rc = {row: 0, col: 0}
    for (var i = 0; i < ids.length; i++) {
        rc = this.getRowCol(ids[i])
        if (rc != null) {
            this.selectCircle(rc.col, rc.row)
        }
    }
}
Tape.prototype.selectCircle = function (x, y) {
    var center = this.getCenter(x, y)
    this._ctx.fillStyle = '#000000'
    this._ctx.beginPath()
    this._ctx.arc(center.x, center.y, this._r, 0, 2 * Math.PI);
    this._ctx.closePath()
    this._ctx.fill()
}
Tape.prototype.unselect = function (ids) {
    var rc = {row: 0, col: 0}
    for (var i = 0; i < ids.length; i++) {
        rc = this.getRowCol(ids[i])
        if (rc != null) {
            this.clearCircle(rc.col, rc.row)
        }
    }
}
Tape.prototype.drawCircle = function (x, y) {
    var center = this.getCenter(x, y)
    this._ctx.beginPath()
    this._ctx.arc(center.x, center.y, this._r, 0, 2 * Math.PI);
    this._ctx.stroke()
    this._ctx.closePath()
}
Tape.prototype.clearCircle = function (x, y) {
    this.earesCircle(x, y)
    this.drawCircle(x, y)
}
Tape.prototype.earesCircle = function (x, y) {
    var center = this.getCenter(x, y)
    this._ctx.clearRect(center.x - this._wellSeatWidth / 2, center.y - this._wellSeatHeight / 2, this._wellSeatWidth, this._wellSeatHeight);
}
Tape.prototype.getCenter = function (x, y) {
    var xc = this._circleArea.s.x + this._wellSeatWidth / 2
    var yc = this._circleArea.s.y + this._wellSeatHeight / 2
    return {
        x: ((y % 2 != 0) && this.isStagger) ? xc + x * this._wellSeatWidth + (this._wellSeatWidth / 2) : xc + x * this._wellSeatWidth,
        y: yc + y * this._wellSeatHeight
    }
}
Tape.prototype.getRowCol = function (p) {
    var result;
    switch (typeof p){
        case "number":
            var id = p
            if (id < 0 || id > this.X * this.Y) {
                return null
            }
            return {col: (id % this.X), row: (id - id % this.X) / this.X}
        case "object":
            if(p==null){
                return null
            }
            var yc = this._circleArea.s.y
            var row = Math.floor((p.y - yc)/this._wellSeatHeight)
            var xc = ((row % 2 != 0) && this.isStagger) ? this._circleArea.s.x+this._wellSeatWidth/2:this._circleArea.s.x

            var col = Math.floor((p.x - xc)/this._wellSeatWidth)
            result = {row:row , col: col}
            if(result.col<0||result.row<0||result.col>=this.X||result.row>=this.Y){
                return null
            }
            return result
        default:
            return null
    }
    return null
}
Tape.prototype.highLight = function (x, y) {
    var center = this.getCenter(x, y)
    this._backgroundCtx.fillStyle = "#8c8c8c"
    this._backgroundCtx.fillRect(0.5+center.x - this._wellSeatWidth / 2, 0.5+center.y - this._wellSeatHeight / 2, this._wellSeatWidth-1, this._wellSeatHeight-1)
    //this.drawCircle(x, y)
}
Tape.prototype.downPlay = function (x,y) {
    var center = this.getCenter(x, y)
    this._backgroundCtx.clearRect(center.x - this._wellSeatWidth / 2, center.y - this._wellSeatHeight / 2, this._wellSeatWidth, this._wellSeatHeight);}
Tape.prototype.getId = function (x,y) {
    return y*this.X+x
}