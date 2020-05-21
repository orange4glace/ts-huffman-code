import { HuffmanCode } from '../src/huffman-code';

describe('huffman', () => {
  let values: string[] = [];
  const huffman = new HuffmanCode();
  for (let i = 0; i < 100; i ++) {
    for (let j = 0; j < Math.round(Math.random() * 200) + 10; j ++) {
      huffman.add(i.toString());
      values.push(i.toString());
    }
  }
  huffman.build();
  for (let i = 0; i < 100; i ++) {
    it(`should decode ${i}`, () => {
      const encoded = huffman.encode(i.toString());
      const decoded = huffman.decode(encoded)[0];
      expect(decoded).toEqual(i.toString());
    })
  }
  it('should decode array', () => {
    const raw: string[] = [];
    for (let i = 0; i < 100; i ++) {
      raw.push(Math.min(99, Math.floor(Math.random() * 100)).toString());
    }
    let encoded = "";
    raw.forEach(r => {
      const e = huffman.encode(r);
      encoded += e;
    })
    const decoded = huffman.decode(encoded);
    expect(decoded).toEqual(raw);
  })
  it('should get bit size', () => {
    let expected = 0;
    values.forEach(value => {
      expected += huffman.encode(value).length;
    })
    expect(huffman.bitSize()).toEqual(expected);
  })
});