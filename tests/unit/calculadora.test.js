// ESPERA = EXPECT
// Expect valor gerado de forma dinamica
// to be pode se escrito hardcoded direto na mão, mais aconselhavel

test("Espero que 1 seja 1", () => {
  expect(1).toBe(1);
});

const calculadora = require("../../models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  console.log(resultado);
  expect(resultado).toBe(4);
});
test("somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  console.log(resultado);
  expect(resultado).toBe(105);
});
test("somar 'banana' + 100 deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  console.log(resultado);
  expect(resultado).toBe("Error");
});
