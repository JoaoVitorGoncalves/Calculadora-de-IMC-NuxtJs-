/**
 * Contrato TypeScript do registro de IMC.
 * Interfaces descrevem a forma dos dados — útil com localStorage (JSON sem tipos).
 */
export default interface IPessoa {
  id: string
  nome: string
  peso: number
  altura: number
  imc: number
  classificacao?: string
}
