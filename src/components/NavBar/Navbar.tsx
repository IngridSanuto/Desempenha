import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📊</span>
        <div className={styles.logoTexto}>
          <span className={styles.logoNome}>Desempenha</span>
          <span className={styles.slogan}>Dados que melhoram sua performance.</span>
        </div>
      </div>  

      <div className={styles.links}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/areas">Áreas</NavLink>
        <NavLink to="/registros">Registros</NavLink>
      </div>
    </nav>
  )
}