/**
 * Created by xunj on 16-7-26.
 */
Array.prototype.remove = function(b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};

//在index前方插入元素
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

//在index后方插入元素
Array.prototype.insertB = function (index, item) {
    if(index+1==this.length){
        this.push(item);
    }else {
        this.splice(index+1, 0, item);
    }
};