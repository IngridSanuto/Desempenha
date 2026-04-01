import type { Topico } from "../../types";
import styles from './TopicItem.module.css'

export default function TopicItem({ topico, acertos, erros, numRegistros }: { topico: Topico, acertos: number, erros: number, numRegistros: number }) {
  const total = acertos + erros
  const pct = total > 0 ? Math.round((acertos / total) * 100) : 0
  
  function corPct(pct: number) {
    if (pct >= 70) return "#10b981"
    if (pct >= 50) return "#eab308"
    return "#f43f5e"
}

  return (
    <div className={styles.card}>
        <div className={styles.info}>
            <h3 className={styles.nome}>{topico.nome}</h3>
            <div className={styles.barra}>
                <div className={styles.barraPreenchida} style={{width: `${pct}%`}}></div>
            </div>
            <p className={styles.detalhes}>✅ {acertos} · ❌ {erros} · {total} questões · {numRegistros} registro(s)</p>
        </div>
        <span className={styles.pct} style={{color: corPct(pct)}}>{pct}%</span>
    </div>
)}