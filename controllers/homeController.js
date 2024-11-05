export function productos(req, res, next) {
  res.send(([
    { name: 'cafetera', price: 29.99 },
    { name: 'tostadora', price: 42.50 },
    { name: 'microondas', price: 23.70 }
  ]))
}
