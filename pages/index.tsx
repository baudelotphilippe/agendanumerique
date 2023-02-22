import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Agenda du numérique poitevin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Nabla&family=Roboto&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
       <h1 className={styles.h1}>Agenda du numérique</h1>
       <h2 className={styles.h2}>Evénements à venir</h2>
       <table className={styles.events}>
        <thead className={styles.thead}>
          <tr>
            <th>Date</th>
            <th>Organisé par</th>
            <th>Nom de l&apos;événement</th>
            <th>Lieu</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
            <tr>
              <td>6 avril 2023 à 18h30</td>
              <td>PWN</td>
              <td>Gamechanging CSS </td>
              <td>Taverne du geek - Poitiers</td>
            </tr>
            <tr>
              <td>6 avril 2023 à 18h30</td>
              <td>PWN</td>
              <td>Gamechanging CSS </td>
              <td>Taverne du geek - Poitiers</td>
            </tr>
        </tbody>
       </table>
      </main>
    </>
  )
}
