/**
 * Cálculo de IMC (Índice de Massa Corporal).
 *
 * Fórmula da OMS: IMC = peso (kg) / altura (m)²
 *
 * Princípio: funções puras em arquivos separados facilitam teste e reuso
 * (Form, edit e futuros composables podem importar a mesma lógica).
 */

/** Altura acima de 3 m é improvável — assumimos que o usuário digitou centímetros. */
export function alturaEmMetros (altura: number): number {
  if (!altura || altura <= 0) {
    return 0
  }
  return altura > 3 ? altura / 100 : altura
}

/**
 * @param peso  Peso em quilogramas
 * @param altura Altura em metros (ex.: 1,75) ou centímetros (ex.: 175)
 * @returns IMC com uma casa decimal, ou 0 se dados inválidos
 */
export function calcularImc (peso: number, altura: number): number {
  const alturaMetros = alturaEmMetros(altura)
  if (!peso || !alturaMetros) {
    return 0
  }
  const imc = peso / (alturaMetros * alturaMetros)
  return Math.round(imc * 10) / 10
}

/** Classificação simplificada para exibição na tabela (aprendizado / UX). */
export function classificarImc (imc: number): string {
  if (imc <= 0) { return '—' }
  if (imc < 18.5) { return 'Abaixo do peso' }
  if (imc < 25) { return 'Peso normal' }
  if (imc < 30) { return 'Sobrepeso' }
  if (imc < 35) { return 'Obesidade I' }
  if (imc < 40) { return 'Obesidade II' }
  return 'Obesidade III'
}
