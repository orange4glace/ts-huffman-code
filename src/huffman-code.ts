interface Node {
  code: string;
  value: any;
  frequency: number;
  left: Node | undefined;
  right: Node | undefined;
}

export class HuffmanCode {

  private root_: Node;
  private values_: string[] = [];
  private valueMap_: Map<string, string>;

  add(value: string): void {
    this.values_.push(value);
  }

  build(): void {
    const valueMap = {};
    this.values_.forEach(value => {
      if (valueMap[value] == undefined) {
        valueMap[value] = {
          value: value,
          frequency: 1
        };
      }
      else {
        valueMap[value].frequency ++;
      }
    })
    const sortFunc = (lhs, rhs) => {
      const l = lhs.frequency;
      const r = rhs.frequency;
      return (l == r ? 0 : l > r ? -1 : 1);
    };
    const heap: Node[] = [];
    for (let value in valueMap) {
      heap.push(valueMap[value]);
    }
    while (heap.length >= 2) {
      heap.sort(sortFunc);
      const left = heap[heap.length - 1];
      const right = heap[heap.length - 2];
      heap.pop();
      heap.pop();
      const node = {
        code: '',
        value: undefined,
        frequency: left.frequency + right.frequency,
        left: left,
        right: right
      }
      heap.push(node);
    }
    const root = heap[0];
    function assignCode(node: Node, code: string, map: Map<string, string>) {
      node.code = code;
      if (node.value) {
        map.set(node.value, code);
      }
      if (node.left) {
        assignCode(node.left, code + '0', map);
      }
      if (node.right) {
        assignCode(node.right, code + '1', map);
      }
    }

    this.valueMap_ = new Map();
    assignCode(root, '', this.valueMap_);

    this.root_ = root;
  }

  encode(value: string): string {
    return this.valueMap_.get(value);
  }

  decode(binary: string): string[] {
    const ret: string[] = [];
    let cur = this.root_;
    for (let i = 0; i < binary.length; i ++) {
      const bit = binary[i];
      if (bit == '0') {
        cur = cur.left;
      }
      else {
        cur = cur.right;
      }
      if (cur.value) {
        ret.push(cur.value);
        cur = this.root_;
      }
    }
    return ret;
  }

  bitSize(): number {
    let ret = 0;
    this.values_.forEach(value => {
      ret += this.valueMap_.get(value).length;
    })
    return ret;
  }

}