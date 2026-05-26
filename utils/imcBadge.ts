/** Classe CSS do badge conforme faixa de IMC (apenas visual). */
export function badgeClass (imc: number): string {
  if (imc <= 0) { return 'badge' }
  if (imc < 18.5) { return 'badge badge--low' }
  if (imc < 25) { return 'badge badge--normal' }
  if (imc < 30) { return 'badge badge--high' }
  return 'badge badge--obese'
}
