import AreaCard from "../components/AreaCard/AreaCard"
import styles from './Areas.module.css'
import type { Area, Registro } from "../types"
import { useEffect, useState, useMemo} from "react"
import { getAreas } from "../services/areasService"
import { getRegistros } from "../services/registrosService"
import ModalNovaArea from "../components/ModalNovaArea/ModalNovaArea"
import { createArea } from "../services/areasService"

export default function Areas() {
    const [areas, setAreas] = useState<Area[]>([])
    useEffect(() => {
    async function buscarAreas() {
        const dados = await getAreas()
        setAreas(dados)
    }
    buscarAreas()
}, [])

const [registros, setRegistros] = useState<Registro[]>([])
        useEffect(() => {
        async function buscarRegistros() {
            const dados = await getRegistros()
            setRegistros(dados)
        }
        buscarRegistros() }, [])

        const areasComAproveitamento = useMemo(() => {
    return areas.map(area => {
        const daArea = registros.filter(r => String(r.areaId) === String(area.id))
        const acertos = daArea.reduce((s, r) => s + r.acertos, 0)
        const erros = daArea.reduce((s, r) => s + r.erros, 0)
        const total = acertos + erros
        const pct = total > 0 ? Math.round((acertos / total) * 100) : 0
        return { ...area, pct, acertos, erros, total }
    })
}, [areas, registros])

const [modalAberto, setModalAberto] = useState(false)

async function handleSalvar(dados: Omit<Area, 'id'>) {
    const novaArea = await createArea(dados)
    setAreas([...areas, novaArea])
}

    return (
    <main className={styles.container}>
        <div className={styles.header}>
            <div>
                <h1 className={styles.titulo}>Áreas</h1>
                <p className={styles.subtitulo}>Clique em uma área para gerenciar os conteúdos</p>
            </div>
            <button className={styles.botao} onClick={() => setModalAberto(true)}>+ Nova Área</button>
        </div>
        <ModalNovaArea 
            aberto={modalAberto} 
            onFechar={() => setModalAberto(false)} 
            onSalvar={handleSalvar} 
        />
        <div className={styles.grid}>
            {areasComAproveitamento.length === 0 
                ? <p className={styles.empty}>Nenhuma área cadastrada ainda.</p>
                : areasComAproveitamento.map(area => (
                    <AreaCard 
                        key={area.id} 
                        area={area} 
                        pct={area.pct} 
                        acertos={area.acertos} 
                        erros={area.erros} 
                        total={area.total} 
                    />
                ))
            }
        </div>
    </main>
)}