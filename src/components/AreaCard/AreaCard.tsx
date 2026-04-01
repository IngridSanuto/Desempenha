import type { Area } from "../../types/index"
import styles from './AreaCard.module.css'
import { useNavigate } from "react-router-dom"

export default function AreaCard({ area, pct, acertos, erros, total }: { area: Area, pct: number, acertos: number, erros: number, total: number }) {
const navigate = useNavigate()

function corPct(pct: number) {
    if (pct >= 70) return "#10b981"
    if (pct >= 50) return "#eab308"
    return "#f43f5e"
}

return (
    <div className={styles.card} onClick={() => navigate('/areas/' + area.id)}>
        <h3 className={styles.nome}>{area.nome}</h3>
        <p className={styles.pct} style={{color: corPct(pct)}}>{pct}%</p>
        <p className={styles.info}>✅ {acertos} · ❌ {erros} · {total} total</p>
        <p className={styles.link}>ver conteúdos →</p>
    </div>
)}