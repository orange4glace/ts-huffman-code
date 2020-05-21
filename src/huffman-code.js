"use strict";
exports.__esModule = true;
var HuffmanCode = /** @class */ (function () {
    function HuffmanCode() {
        this.values_ = [];
    }
    HuffmanCode.prototype.add = function (value) {
        this.values_.push(value);
    };
    HuffmanCode.prototype.build = function () {
        var valueMap = {};
        this.values_.forEach(function (value) {
            if (valueMap[value] == undefined) {
                valueMap[value] = {
                    value: value,
                    frequency: 1
                };
            }
            else {
                valueMap[value].frequency++;
            }
        });
        var sortFunc = function (lhs, rhs) {
            var l = lhs.freqeuncy;
            var r = rhs.freqeuncy;
            return (l == r ? 0 : l > r ? 1 : -1);
        };
        var heap = [];
        for (var value in valueMap) {
            heap.push(valueMap[value]);
        }
        while (heap.length >= 2) {
            heap.sort(sortFunc);
            var left = heap[heap.length - 1];
            var right = heap[heap.length - 2];
            heap.pop();
            heap.pop();
            var node = {
                code: '',
                value: undefined,
                frequency: left.frequency + right.frequency,
                left: left,
                right: right
            };
            heap.push(node);
        }
        var root = heap[0];
        function assignCode(node, code, map) {
            node.code = code;
            if (node.left) {
                assignCode(node.left, node.code + '0', map);
            }
            if (node.right) {
                assignCode(node.right, node.code + '1', map);
            }
            if (node.value) {
                map.set(node.value, node.code);
            }
        }
        this.valueMap_ = new Map();
        assignCode(root, '', this.valueMap_);
        this.root_ = root;
    };
    HuffmanCode.prototype.encode = function (value) {
        return this.valueMap_.get(value);
    };
    HuffmanCode.prototype.decode = function (binary) {
        var ret = [];
        var cur = this.root_;
        for (var i = 0; i < binary.length; i++) {
            var bit = binary[i];
            if (bit == '0') {
                cur = cur.left;
            }
            else {
                cur = cur.right;
            }
            if (cur.value) {
                cur = this.root_;
                ret.push(cur.value);
            }
        }
        return ret;
    };
    return HuffmanCode;
}());
exports.HuffmanCode = HuffmanCode;
