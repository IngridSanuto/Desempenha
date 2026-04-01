import type { Registro } from "../types";

export async function getRegistros() {
    const resposta = await fetch("http://localhost:3001/registros")
    const dados = await resposta.json()
    return dados
}

export async function createRegistro(novoRegistro: Omit<Registro, 'id'>) {
    const resposta = await fetch("http://localhost:3001/registros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoRegistro)
    })
    return await resposta.json()
}

export async function deleteRegistro(id: number) {
    await fetch(`http://localhost:3001/registros/${id}`, {
        method: "DELETE"
    })
}