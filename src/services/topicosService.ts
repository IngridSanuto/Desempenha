import type { Topico } from "../types";

export async function getTopicos() {
    const resposta = await fetch("http://localhost:3001/topicos")
    const dados = await resposta.json()
    return dados
}

export async function createTopico(novoTopico:  Omit<Topico, 'id'>) {
    const resposta = await fetch("http://localhost:3001/topicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoTopico)
    })
    return await resposta.json()
}

export async function deleteTopico(id: number) {
    await fetch(`http://localhost:3001/topicos/${id}`, {
        method: "DELETE"
    })
}