import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [membership, setMembership] = useState("semester")
  const name = "Ola Nordmann"

  const handePayment = () => {
    fetch('api/vippsCheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({membership}),
      }).then((response) => response.json())
      .then((data) => {
        router.push('checkout/'+data.token)
      })
      .catch((error) => {
        console.log(error)
      });
  }

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
        Logged in as: {name}

        <select
        onChange={(e) => {setMembership(e.target.value)}}>
        <option value="semester">One semester</option>
        <option value="year">Two semesters</option>
      </select>
      <button className={styles.button} onClick={() => handePayment()}>Submit</button>
      </main>
      

      <footer className={styles.footer}>
        <span>Testing vipps</span>
      </footer>
    </div>
    </>
  )
}
