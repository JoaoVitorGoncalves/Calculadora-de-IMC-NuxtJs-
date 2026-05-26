import type IPessoa from '~/interface/IPessoa'

/**
 * Camada simples de persistência no localStorage.
 *
 * Princípio Nuxt/Vue: localStorage só existe no navegador.
 * Com `ssr: false` no nuxt.config, as páginas rodam só no client,
 * então é seguro usar localStorage nos hooks created/mounted.
 *
 * Centralizar leitura/escrita evita bugs como parse de '{}' em vez de '[]'.
 */

const STORAGE_KEY = 'pessoa'

export function lerPessoas (): IPessoa[] {
  if (typeof localStorage === 'undefined') {
    return []
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed as IPessoa[] : []
  } catch {
    return []
  }
}

export function salvarPessoas (pessoas: IPessoa[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pessoas))
}

export function adicionarPessoa (pessoa: IPessoa): IPessoa[] {
  const pessoas = lerPessoas()
  pessoas.push(pessoa)
  salvarPessoas(pessoas)
  return pessoas
}

export function atualizarPessoa (id: string, dados: Partial<IPessoa>): IPessoa[] {
  const pessoas = lerPessoas()
  const index = pessoas.findIndex(p => p.id === id)
  if (index === -1) {
    return pessoas
  }
  pessoas[index] = { ...pessoas[index], ...dados }
  salvarPessoas(pessoas)
  return pessoas
}

export function removerPessoa (id: string): IPessoa[] {
  const pessoas = lerPessoas().filter(p => p.id !== id)
  salvarPessoas(pessoas)
  return pessoas
}

export function buscarPessoa (id: string): IPessoa | undefined {
  return lerPessoas().find(p => p.id === id)
}

/** ID único para cada registro (evita colisão do substr de hora). */
export function gerarId (): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
