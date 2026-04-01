import { useState } from "react"
import type { Area } from "../../types"
import type { Topico } from "../../types"
import type { Registro } from "../../types"
import styles from './ModalNovoRegistro.module.css'

export default function ModalNovoRegistro({ aberto, onFechar, areas, topicos, onSalvar }
    :{ aberto: boolean, onFechar: () => void, areas: Area[], topicos: Topico[], onSalvar: (dados: Omit<Registro, 'id'>) => void }) {
    const [nome, setNome] = useState("")
    const [data, setData] = useState("")
    const [areaId, setAreaId] = useState("")
    const [topicoId, setTopicoId] = useState("")
    const [acertos, setAcertos] = useState("")
    const [erros, setErros] = useState("")

    function handleSalvar() {
    onSalvar({
        nome,
        data,
        areaId: areaId,
        topicoId: topicoId,
        acertos: Number(acertos),
        erros: Number(erros)
    })
    onFechar()
}
    if (!aberto) return null
    return (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <h1 className={styles.titulo}>Novo Registro</h1>

            <div className={styles.campo}>
                <label className={styles.label} htmlFor="nome">Nome do registro</label>
                <input className={styles.input} id="nome" type="text" placeholder="Ex: Lista 3, Prova bimestral..." value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className={styles.campo}>
                <label className={styles.label} htmlFor="data">Data</label>
                <input className={styles.input} id="data" type="date" value={data} onChange={e => setData(e.target.value)} />
            </div>

            <div className={styles.campo}>
                <label className={styles.label} htmlFor="area">Área</label>
                <select className={styles.select} id="area" value={areaId} onChange={e => setAreaId(e.target.value)}>
                    <option value="">Selecione...</option>
                    {areas.map(area => (
                        <option key={area.id} value={area.id}>{area.nome}</option>
                    ))}
                </select>
            </div>

            <div className={styles.campo}>
                <label className={styles.label} htmlFor="conteudo">Conteúdo</label>
                <select className={styles.select} id="conteudo" value={topicoId} onChange={e => setTopicoId(e.target.value)}>
                    <option value="">Selecione...</option>
                    {topicos.map(topico => (
                        <option key={topico.id} value={topico.id}>{topico.nome}</option>
                    ))}
                </select>
            </div>

            <div className={styles.acertosErros}>
                <div className={styles.campo}>
                    <label className={styles.labelVerde} htmlFor="acertos">✅ Acertos</label>
                    <input className={styles.input} id="acertos" type="number" value={acertos} onChange={e => setAcertos(e.target.value)} />
                </div>
                <div className={styles.campo}>
                    <label className={styles.labelVermelho} htmlFor="erros">❌ Erros</label>
                    <input className={styles.input} id="erros" type="number" value={erros} onChange={e => setErros(e.target.value)} />
                </div>
            </div>

            <div className={styles.botoes}>
                <button className={styles.cancelar} onClick={onFechar}>Cancelar</button>
                <button className={styles.salvar} onClick={handleSalvar}>Salvar</button>
            </div>
        </div>
    </div>
)}