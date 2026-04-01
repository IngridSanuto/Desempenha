export interface Area {
    id: number | string
    nome: string
    cor: string
}

export interface Topico {
    id: number
    nome: string
    areaId: number | string
}

export interface Registro {
    id: number
    nome: string
    data: string
    acertos: number
    erros: number
    areaId: number | string
    topicoId: number | string
}