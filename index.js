const int = require('big-integer')

const alphabet = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const symbols = "_-"

const alpha_num = [
  ...numbers.split(''),
  ...alphabet.split(''),
  ...alphabet.toUpperCase().split('')
]

const map = [
  ...alpha_num,
  ...symbols.split('')
];

// Credits: Ryan Smith -- https://stackoverflow.com/a/32480941/1251031
function convert(value = "", from, to, domain, range) {
  if (!domain || domain === null) domain = map.slice(0, from);
  if (!range || range === null) range = map.slice(0, to);
  let number = value.split('').reverse().reduce((carry, digit, index) => {
    if (domain.indexOf(digit) < 0) {
      throw Error(`'${digit}' was not found in your domain`)
    }
    return int(carry).add(int(domain.indexOf(digit)).multiply(int(from).pow(index)))
  }, 0);

  let n = '';
  while (number.greater(0)) {
    n = range[int(number).mod(to)] + n;
    number = int(int(number).subtract(int(number).mod(to))).divide(to)
  }

  return n || '0';
}

/**
 * Encodes integer strings of base n to base 64
 */
function encode(value = "", base = 16) {
  return convert(value, base, map.length, map, map)
}

/**
 * Decodes integer string of base 64 to base n
 */
function decode(value = "", base = 16) {
  return convert(value, map.length, base, map, map);
}

module.exports = module.exports.default = { encode, decode, convert, map: [...map] }