import TopicItem from "../components/TopicItem/TopicItem"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTopicos } from "../services/topicosService"
import { getRegistros } from "../services/registrosService"
import type { Topico, Registro } from "../types"
import ModalNovoConteudo from "../components/ModalNovoConteudo/ModalNovoConteudo"
import { createTopico } from "../services/topicosService"
import styles from './AreaDetalhe.module.css'

export default function AreaDetalhe() {
    const { id } = useParams()
    const [topicos, setTopicos] = useState<Topico[]>([])
    const [registros, setRegistros] = useState<Registro[]>([])
    const [modalAberto, setModalAberto] = useState(false)
    
    useEffect(() => {
        async function buscarTopicos() {
            const dados = await getTopicos()
            const filtrados = dados.filter((t: Topico) => String(t.areaId) === String(id))
            setTopicos(filtrados)
        }
        buscarTopicos()
    }, [id])

    useEffect(() => {
        async function buscarRegistros() {
            const dados = await getRegistros()
            console.log("id da área:", id)
    console.log("todos registros:", dados)
            const filtrados = dados.filter((r: Registro) => String(r.areaId) === String(id))
           console.log("filtrados:", filtrados)
            setRegistros(filtrados)
        }
        buscarRegistros()
    }, [id])

    async function handleSalvar(dados: Omit<Topico, 'id'>) {
    console.log("dados enviados:", dados)
    const novoTopico = await createTopico(dados)
    setTopicos([...topicos, novoTopico])
}
    
    return (
    <div className={styles.page}>
        <div className={styles.header}>
            <div>
                <h1 className={styles.titulo}>Conteúdos da área</h1>
                <p className={styles.subtitulo}>{topicos.length} conteúdo(s) cadastrado(s)</p>
            </div>
            <button className={styles.botao} onClick={() => setModalAberto(true)}>+ Novo Conteúdo</button>
        </div>
        <ModalNovoConteudo 
            aberto={modalAberto} 
            onFechar={() => setModalAberto(false)} 
            onSalvar={handleSalvar}
            areaId={id as unknown as number}
        />
        <div className={styles.lista}>
            {topicos.length === 0 
                ? <p className={styles.empty}>Nenhum conteúdo cadastrado ainda.</p>
                : topicos.map(topico => {
                    const doTopico = registros.filter(r => String(r.topicoId) === String(topico.id))
                    const acertos = doTopico.reduce((s, r) => s + r.acertos, 0)
                    const erros = doTopico.reduce((s, r) => s + r.erros, 0)
                    return <TopicItem key={topico.id} topico={topico} acertos={acertos} erros={erros} numRegistros={doTopico.length}/>
                })}
        </div>
    </div>
)}