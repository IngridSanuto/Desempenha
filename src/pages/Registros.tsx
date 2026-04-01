import type { Registro } from "../types"
import RegistroItem from "../components/RegistroItem/RegistroItem"
import ModalNovoRegistro from "../components/ModalNovoRegistro/ModalNovoRegistro"
import { useEffect, useState } from "react"
import { getRegistros, createRegistro, deleteRegistro } from "../services/registrosService"
import { getAreas } from "../services/areasService"
import { getTopicos } from "../services/topicosService"
import type { Area, Topico } from "../types"
import styles from './Registros.module.css'

export default function Registros() {
    const [registros, setRegistros] = useState<Registro[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [topicos, setTopicos] = useState<Topico[]>([])
    const [filtro, setFiltro] = useState<number | string | "todas">("todas")
    const [modalAberto, setModalAberto] = useState(false)

    useEffect(() => {
        async function buscarRegistros() {
            const dados = await getRegistros()
            setRegistros(dados)
        }
        buscarRegistros()
    }, [])

    useEffect(() => {
        async function buscarAreas() {
            const dados = await getAreas()
            setAreas(dados)
        }
        buscarAreas()
    }, [])

    useEffect(() => {
        async function buscarTopicos() {
            const dados = await getTopicos()
            setTopicos(dados)
        }
        buscarTopicos()
    }, [])

    const registrosFiltrados = filtro === "todas" ? registros : registros.filter(r => String(r.areaId) === String(filtro))

    async function handleSalvar(dados: Omit<Registro, 'id'>) {
        const novoRegistro = await createRegistro(dados)
        setRegistros([...registros, novoRegistro])
    }

    async function handleDeletar(id: string | number) {
        await deleteRegistro(id as number)
        setRegistros(registros.filter (r => String(r.id) !== String(id)))
    }

    return (
    <div className={styles.page}>
        <div className={styles.header}>
            <div>
                <h1 className={styles.titulo}>Registros</h1>
                <p className={styles.subtitulo}>{registros.length} registro(s) no total</p>
            </div>
            <button className={styles.botao} onClick={() => setModalAberto(true)}>+ Novo Registro</button>
        </div>

        <div className={styles.filtros}>
            <button 
                className={`${styles.filtroBotao} ${filtro === "todas" ? styles.filtroAtivo : ""}`}
                onClick={() => setFiltro("todas")}>
                Todas
            </button>
            {areas.map(area => (
                <button 
                    key={area.id} 
                    className={`${styles.filtroBotao} ${String(filtro) === String(area.id) ? styles.filtroAtivo : ""}`}
                    onClick={() => setFiltro(area.id)}>
                    {area.nome}
                </button>
            ))}
        </div>

        <ModalNovoRegistro aberto={modalAberto} onFechar={() => setModalAberto(false)} areas={areas} topicos={topicos} onSalvar={handleSalvar}/>

        <div className={styles.lista}>
            {registrosFiltrados.length === 0
                ? <p className={styles.empty}>Nenhum registro encontrado.</p>
                : registrosFiltrados.map(registro => {
                    const area = areas.find(a => String(a.id) === String(registro.areaId))
                    const topico = topicos.find(t => String(t.id) === String(registro.topicoId))
                    return (
                        <RegistroItem 
                            key={registro.id} 
                            registro={registro} 
                            nomeArea={area?.nome ?? "—"} 
                            nomeTopico={topico?.nome ?? "—"}
                            onDeletar={() => handleDeletar(registro.id)}
                        />
                    )
                })
            }
        </div>
    </div>
)}