import type { Area } from "../types"

export async function getAreas() {
    const resposta = await fetch("http://localhost:3001/areas")
    const dados = await resposta.json()
    return dados
}

export async function createArea(novaArea: Omit<Area, 'id'>) {
    const resposta = await fetch("http://localhost:3001/areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaArea)
    })
    return await resposta.json()
}

export async function deleteArea(id: number) {
    await fetch(`http://localhost:3001/areas/${id}`, {
        method: "DELETE"
    })
}