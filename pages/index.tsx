import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

export default function Home() {
  const [membership, setMembership] = useState("semester")

  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Shoppen</title>
        <meta name="description" content="Vipps test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
         <a>This is a vipps shop!</a>
        </h1>

        <select
        onChange={(e) => {setMembership(e.target.value)}}>
        <option value="semester">One semester</option>
        <option value="year">Two semesters</option>
      </select>
      <button className={styles.button} onClick={() => console.log(membership)}>Submit</button>
      </main>
      

      <footer className={styles.footer}>
        <span>Testing vipps</span>
      </footer>
    </div>
    </>
  )
}
