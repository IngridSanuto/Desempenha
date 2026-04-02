import type { Topico } from "../types";

export async function getTopicos() {
    const resposta = await fetch("https://desempenha-api.onrender.com/topicos")
    const dados = await resposta.json()
    return dados
}

export async function createTopico(novoTopico:  Omit<Topico, 'id'>) {
    const resposta = await fetch("https://desempenha-api.onrender.com/topicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoTopico)
    })
    return await resposta.json()
}

export async function deleteTopico(id: number) {
    await fetch(`https://desempenha-api.onrender.com/topicos/${id}`, {
        method: "DELETE"
    })
}