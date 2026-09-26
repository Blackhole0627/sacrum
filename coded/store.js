// SACRUM — client-side product catalog and cart.
// Same approach as the MUBB store: no backend yet, cart persists in
// localStorage, checkout hands off to WhatsApp. Products here also carry
// size/finish options and a "customizable" flag, since a SACRUM piece can be
// bought in-stock as-is or requested made-to-order.

const PRODUCTS = [
  { id:"padre-pio", name:"San Padre Pío", cat:"Santos", price:180, stock:4, customizable:true, img:"img/p1.jpg",
    desc:"Escultura de San Padre Pío, tallada y pintada a mano por artesanos ecuatorianos.",
    sizes:["30 cm","45 cm","60 cm"], finishes:["Policromado","Oro"] },
  { id:"guadalupe", name:"Virgen de Guadalupe", cat:"Vírgenes", price:220, stock:3, customizable:true, img:"img/p2.jpg",
    desc:"Virgen de Guadalupe con aureola dorada, pieza de devoción tradicional mexicana muy solicitada.",
    sizes:["30 cm","45 cm","60 cm","1 m"], finishes:["Policromado","Oro"] },
  { id:"crucifijo", name:"Crucifijo", cat:"Cristos", price:140, stock:5, customizable:true, img:"img/p3.jpg",
    desc:"Crucifijo en madera con Cristo tallado a mano, acabado en tonos cálidos.",
    sizes:["30 cm","50 cm","80 cm"], finishes:["Madera natural","Oscuro"] },
  { id:"sagrado-corazon", name:"Sagrado Corazón", cat:"Vírgenes", price:195, stock:2, customizable:true, img:"img/p4.jpg",
    desc:"Sagrado Corazón de María, con manto en tonos verde y ocre, pieza devocional de gran detalle.",
    sizes:["30 cm","45 cm"], finishes:["Policromado","Oro"] },
  { id:"virgen-nino", name:"Virgen con el Niño", cat:"Vírgenes", price:240, stock:2, customizable:true, img:"img/p5.jpg",
    desc:"Virgen coronada con el Niño en brazos, ambos con corona dorada, pieza de altar.",
    sizes:["45 cm","60 cm","1 m"], finishes:["Policromado","Oro"] },
  { id:"virgen-reina", name:"Virgen Reina", cat:"Vírgenes", price:260, stock:1, customizable:true, img:"img/p6.jpg",
    desc:"Virgen Reina con cetro, manto azul y detalles en oro, para altar o colección privada.",
    sizes:["45 cm","60 cm"], finishes:["Policromado","Oro"] },
  { id:"martin-porres", name:"San Martín de Porres", cat:"Santos", price:170, stock:3, customizable:true, img:"img/p7.jpg",
    desc:"San Martín de Porres con sus atributos tradicionales: escoba, perro, gato y ratón.",
    sizes:["30 cm","45 cm"], finishes:["Policromado"] },
  { id:"santo-domingo", name:"Santo Domingo", cat:"Santos", price:190, stock:2, customizable:true, img:"img/p8.jpg",
    desc:"Santo Domingo con libro y el perro con antorcha, hábito dominico tallado en detalle.",
    sizes:["30 cm","45 cm"], finishes:["Policromado"] },
  { id:"san-miguel", name:"San Miguel Arcángel", cat:"Ángeles", price:280, stock:2, customizable:true, img:"img/p9.jpg",
    desc:"San Miguel Arcángel venciendo al mal, alas doradas y armadura con gran nivel de detalle.",
    sizes:["30 cm","45 cm","60 cm"], finishes:["Policromado", "Oro"] },
];

function fmt(n){ return "$ " + n.toLocaleString("es-EC"); }
function getProduct(id){ return PRODUCTS.find(p => p.id === id); }

function getCart(){
  try { return JSON.parse(localStorage.getItem("sacrum_cart") || "[]"); } catch { return []; }
}
function setCart(cart){
  localStorage.setItem("sacrum_cart", JSON.stringify(cart));
  updateCartCount();
}
function lineKey(id, size, finish){ return `${id}__${size}__${finish}`; }
function addToCart(id, qty, size, finish){
  qty = qty || 1;
  const cart = getCart();
  const key = lineKey(id, size, finish);
  const line = cart.find(l => lineKey(l.id, l.size, l.finish) === key);
  if (line) line.qty += qty; else cart.push({ id, qty, size, finish });
  setCart(cart);
}
function removeFromCart(key){
  setCart(getCart().filter(l => lineKey(l.id, l.size, l.finish) !== key));
}
function setQty(key, qty){
  const cart = getCart();
  const line = cart.find(l => lineKey(l.id, l.size, l.finish) === key);
  if (line) { line.qty = Math.max(1, qty); setCart(cart); }
}
function cartLines(){
  return getCart().map(l => ({ ...l, key: lineKey(l.id, l.size, l.finish), product: getProduct(l.id) })).filter(l => l.product);
}
function cartTotal(){
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}
function cartCount(){
  return getCart().reduce((n, l) => n + l.qty, 0);
}
function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartCount());
}
document.addEventListener("DOMContentLoaded", updateCartCount);
