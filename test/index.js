const assert = require('chai').assert;
const { encode, decode, convert } = require('../index');

describe("puchi", () => {
  it("should encode 'a' (base 16) to 'a' (base 64)", () => {
    assert.equal(encode('a'), 'a');
  })

  it("should decode 'a' (base 64) to 'a' (base 16)", () => {
    assert.equal(decode(encode('a')), 'a')
  })

  it("it should encode large hexadecimals", () => {
    assert.notEqual(encode("5c2bd2c156ddf30c73b39953"), "5c2bd2c156ddf30c73b39953")
  })

  it("it should decode large hexadecimals", () => {
    assert.equal(decode(encode("5c2bd2c156ddf30c73b39953")), "5c2bd2c156ddf30c73b39953")
  })

  it("should convert a string to binary (with modified domain)", () => {
    const domain = "abcdefghijklmnopqrstuvwxyz !".split('');
    const expected = "11010010111000111010110000111100010001011010100111011111";
    assert.equal(convert("hello world!", domain.length, 2, domain), expected);
  })

  it("should convert a binary string to string (with modified domain)", () => {
    const range = "abcdefghijklmnopqrstuvwxyz !".split('');
    const expected = "hello world!";
    assert.equal(convert(
      "11010010111000111010110000111100010001011010100111011111",
      2, range.length, null, range), expected);
  })

})