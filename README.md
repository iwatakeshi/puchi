# puchi
A small JavaScript library to encode and decode large integer strings of base `n <= 64` to base 64.


## About

Puchi is a small and simple library that allows you to convert large integer strings of base `n` to base 64. One use case would be to convert MongoDB's ObjectID (12-byte, base 16) to base 64 for a url-shortener.

It also allows you to convert non-integer strings of base `n` to base `n` using the `convert` function.
I'm not sure if that's all useful but it's there anyways :satisfied:. See below for an example.

> Note: This library depends on [big-integer](https://github.com/peterolson/BigInteger.js) to perform large integer calculations.

### `encode(value: string, base?: number = 16)`

* `value` - The integer string to encode.
* `base`  - The base or radix of the integer string.

```js
const { encode } = require('puchi');

console.log(encode("5c2bd2c156ddf30c73b39953")) // → n2LiMlrtYMNPIVBj
```

### `decode(value: string, base?: number = 16)`

* `value` - The integer string to decode.
* `base`  - The base or radix of the integer string.


```js
const { decode } = require('puchi');

console.log(decode("n2LiMlrtYMNPIVBj")) // → 5c2bd2c156ddf30c73b39953
```

### `convert(value: string, from!: number, to!: number, domain?: string[], range?: string[])`

* `value`  - The integer string to convert.
* `from`   - The base or radix of the integer string. (required)
* `to`     - The base or radix to convert to. (required)
* `domain` - The domain or character map. Defaults to an array of 64 characters: `[0-9, a-z, A-Z, '_', '-']`
* `range`  - The range or character map. Defaults to an array of 64 characters: `[0-9, a-z, A-Z, '_', '-']`

```js
const { convert } = require('puchi')

console.log(convert('12345', 10, 2)) // → 11000000111001

console.log(convert('11000000111001', 2, 10)) // → 12345


// Note: The following example does not output in the ASCII sense of binary
// but more of a theoretical mapping.

const domain = "abcdefghijklmnopqrstuvwxyz !".split('');
console.log(convert("hello world!", domain.length, 2, domain)) 
// → 11010010111000111010110000111100010001011010100111011111

const range = domain;
console.log(convert(
  "11010010111000111010110000111100010001011010100111011111",
  2, range.length, null, range))
  hello world!
```