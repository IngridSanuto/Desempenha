import type { Registro } from "../types";

export async function getRegistros() {
    const resposta = await fetch("https://desempenha-api.onrender.com/registros")
    const dados = await resposta.json()
    return dados
}

export async function createRegistro(novoRegistro: Omit<Registro, 'id'>) {
    const resposta = await fetch("https://desempenha-api.onrender.com/registros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoRegistro)
    })
    return await resposta.json()
}

export async function deleteRegistro(id: number) {
    await fetch(`https://desempenha-api.onrender.com/registros/${id}`, {
        method: "DELETE"
    })
}