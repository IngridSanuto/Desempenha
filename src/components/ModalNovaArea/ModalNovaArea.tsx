import { useState } from "react"
import type { Area } from "../../types"
import styles from './ModalNovaArea.module.css'

export default function ModalNovaArea({ aberto, onFechar, onSalvar }: { aberto: boolean, onFechar: () => void, onSalvar: (dados: Omit<Area, 'id'>) => void }) {
    const [nome, setNome] = useState("")

    if (!aberto) return null
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>Nova Área</h2>
                <p className={styles.subtitulo}>Pode ser uma disciplina, módulo ou curso</p>
                <input
                    id="nome"
                    className={styles.input}
                    type="text"
                    placeholder="Ex: Cálculo I, Direito Civil, Python..."
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <div className={styles.botoes}>
                    <button className={styles.cancelar} onClick={onFechar}>Cancelar</button>
                    <button className={styles.salvar} onClick={() => {
                        onSalvar({ nome, cor: "#5286E6" })
                        onFechar()
                    }}>Adicionar</button>
                </div>
            </div>
        </div>
    )
}