import type { Registro } from "../../types";
import styles from './RegistroItem.module.css'

export default function RegistroItem({ registro, nomeArea, nomeTopico, onDeletar }: { registro: Registro, nomeArea: string , nomeTopico:string, onDeletar: () => void}) {
 
  const total = registro.acertos + registro.erros
  const pct = total > 0 ? Math.round((registro.acertos / total) * 100) : 0

  function corPct(pct: number) {
    if (pct >= 70) return "#10b981"  
    if (pct >= 50) return "#eab308"  
    return "#f43f5e"                  
} 

  return (
    <div className={styles.card}>
        <div className={styles.barra}></div>
        <div className={styles.info}>
            <h3 className={styles.nome}>{registro.nome}</h3>
            <p className={styles.area}>{nomeArea} · {nomeTopico}</p>
            <p className={styles.data}>{registro.data}</p>
        </div>
        <div className={styles.direita}>
            <p className={styles.pct} style={{color: corPct(pct)}}>{pct}%</p>
            <p className={styles.detalhes}>✅ {registro.acertos} · ❌ {registro.erros}</p>
        </div>
        <button aria-label="Deletar registro" className={styles.deletar} onClick={onDeletar}>✕</button>
    </div>
)}