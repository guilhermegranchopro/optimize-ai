// pages/index.js
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.hero}>
        <h1>Optimize Your AI Workflow</h1>
        <p className={styles.quote}>
          Find the best GPU and optimize training time for cost, carbon and energy efficiency.
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/gpu" className={styles.button}>GPU Optimization</Link>
          <Link href="/forecast" className={styles.button}>Ecological Impact Forecast</Link>
        </div>
      </div>
    </div>
  )
}

