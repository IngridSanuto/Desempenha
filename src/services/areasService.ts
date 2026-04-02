import type { Area } from "../types"

export async function getAreas() {
    const resposta = await fetch("https://desempenha-api.onrender.com/areas")
    const dados = await resposta.json()
    return dados
}

export async function createArea(novaArea: Omit<Area, 'id'>) {
    const resposta = await fetch("https://desempenha-api.onrender.com/areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaArea)
    })
    return await resposta.json()
}

export async function deleteArea(id: number) {
    await fetch(`https://desempenha-api.onrender.com/areas/${id}`, {
        method: "DELETE"
    })
}