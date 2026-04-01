import { useState } from "react"
import type { Topico } from "../../types"
import styles from './ModalNovoConteudo.module.css'

export default function ModalNovoConteudo({ aberto, onFechar, onSalvar, areaId }: { aberto: boolean, onFechar: () => void, onSalvar: (dados: Omit<Topico, 'id'>) => void, areaId: number }) {
    const [nome, setNome] = useState("")

    if (!aberto) return null
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.titulo}>Novo Conteúdo</h2>
                <p className={styles.subtitulo}>Adicione um conteúdo para esta área</p>
                <input
                    id="nome"
                    className={styles.input}
                    type="text"
                    placeholder="Ex: Equação do 2º grau, Funções..."
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <div className={styles.botoes}>
                    <button className={styles.cancelar} onClick={onFechar}>Cancelar</button>
                    <button className={styles.salvar} onClick={() => {
                        onSalvar({ nome, areaId })
                        onFechar()
                    }}>Adicionar</button>
                </div>
            </div>
        </div>
    )
}