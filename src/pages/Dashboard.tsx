import { useState, useEffect, useMemo } from "react"
import type { Area, Registro } from "../types"
import { getAreas } from "../services/areasService"
import { getRegistros } from "../services/registrosService"
import styles from './Dashboard.module.css'

export default function Dashboard() {
    
    const [areas, setAreas] = useState<Area[]>([])
    useEffect(() => {
    async function buscarAreas() {
        const dados = await getAreas()
        setAreas(dados)
    }
    buscarAreas() }, [])

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
        return { ...area, pct, acertos, erros, total, numRegistros: daArea.length }
    })
    }, [areas, registros])    

    const stats = useMemo(() => {
    const totalAcertos = registros.reduce((s, r) => s + r.acertos, 0)
    const totalErros = registros.reduce((s, r) => s + r.erros, 0)
    const total = totalAcertos + totalErros
    const pct = total > 0 ? Math.round((totalAcertos / total) * 100) : 0
    const forte = areasComAproveitamento.length > 0 ? areasComAproveitamento.reduce((a, b) => a.pct > b.pct ? a : b) : null
    const fraca = areasComAproveitamento.length > 0 ? areasComAproveitamento.reduce((a, b) => a.pct < b.pct ? a : b) : null
    return { pct, total, totalAcertos, forte, fraca }
}, [registros, areasComAproveitamento])

  function corPct(pct: number) {
    if (pct >= 70) return "#10b981"  
    if (pct >= 50) return "#eab308"  
    return "#f43f5e"                  
} 

return (
    <div className={styles.page}>
        <div className={styles.header}>
            <h1 className={styles.titulo}>Seu desempenho</h1>
            <p className={styles.subtitulo}>{registros.length} registro(s) · {areas.length} área(s)</p>
        </div>

        <div className={styles.cards}>
            <div className={`${styles.card} ${styles.cardVerde}`}>
                <p className={styles.icons}>🎯</p>
                <p className={styles.cardValor}>{stats.pct}%</p>
                <p className={styles.cardLabel}>Aproveitamento Geral</p>
                <p className={styles.cardSub}>{stats.totalAcertos} acertos</p>
            </div>
            <div className={`${styles.card} ${styles.cardAzul}`}>
                <p className={styles.icons}>📋</p>
                <p className={styles.cardValor}>{stats.total}</p>
                <p className={styles.cardLabel}>Total de Questões</p>
                <p className={styles.cardSub}>respondidas</p>
            </div>
            <div className={`${styles.card} ${styles.cardVerde}`}>
                <p className={styles.icons}>💪</p>
                <p className={styles.cardValor}>{stats.forte?.nome ?? "—"}</p>
                <p className={styles.cardLabel}>Área Forte</p>
                <p className={styles.cardSub} style={{color: corPct(stats.forte?.pct ?? 0)}} >{stats.forte?.pct ?? 0}%</p>
            </div>
            <div className={`${styles.card} ${styles.cardVermelho}`}>
                <p className={styles.icons}>⚠️</p>
                <p className={styles.cardValor}>{stats.fraca?.nome ?? "—"}</p>
                <p className={styles.cardLabel}>Área Fraca</p>
                <p className={styles.cardSub} style={{color: corPct(stats.fraca?.pct ?? 0)}}>{stats.fraca?.pct ?? 0}%</p>
            </div>
        </div>

        <div className={styles.ranking}>
            <h2 className={styles.rankingTitulo}>Ranking de Áreas</h2>
            {areasComAproveitamento
                .sort((a, b) => b.pct - a.pct)
                .map((area, i) => (
                <div key={area.id} className={styles.rankingItem}>
                    <span className={styles.rankingPos}>#{i + 1}</span>
                    <div className={styles.rankingInfo}>
                        <div className={styles.rankingNome}>
                            <span>{area.nome}</span>
                            <span className={styles.rankingPct} style={{color: corPct(area.pct)}}>{area.pct}%</span>
                        </div>
                        <div className={styles.barra}>
                            <div className={styles.barraPreenchida} style={{width: `${area.pct}%`}}></div>
                        </div>
                        <p className={styles.rankingSub}>{area.total} questões · {area.numRegistros} registro(s)</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}