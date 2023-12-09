import React from "react";

import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import styles from "@/styles/Home.module.css";

export default function Projet() {
  return (
    <>
      <Header title="Agenda du numérique poitevin" datas="" />
      <Layout>
        <div className={`${styles.projet_container} p-3`}>
          <h2>Pourquoi ?</h2>
          <p>
            Ce site est un terrain de jeu pour moi et il fait partie de ce qu'on
            appelle un "side project". Il me permet donc d'expérimenter des
            envies et des technos.
          </p>
          <h2>Principe</h2>
          <p>
            L'envie derrière ce projet est de recenser les différents événements
            autour du numérique qui se passent sur Poitiers (tout lien avec un
            quelconque projet numérique existant ou mort depuis quelques années
            et complètement fortuit).
          </p>
          <p>
            Tous les jours, ce projet va automatiquement consulter les sites qui
            ont été définis (à ce jour : Cobalt, l'Espace Mendès France et Pwn)
            et va vérifier s'il y a de nouveaux événements à intégrer. Si oui,
            il créé les fichiers correspondant et il se mets à jour tout seul.
          </p>
          <h2>Technique</h2>
          J'utilise ici le framework Next.js. Le site est hébergé chez Vercel et
          le code source est dans un repo Github public (vous pouvez donc
          regarder le code et aussi y participer). <br />
          Une Github Action permet la mise à jour automatique du site quand le
          code source est modifié. Une autre Github Action va vérifier
          quotidiennement s'il y a des changements sur les sites référencés et,
          si nécessaire, mettre à jour les fichiers existants ou créer des
          fichiers JSON correspondant à chaque événement repéré. <br />
          Chaque page événement est donc un gabarit de page vide qui se remplit
          des informations récupérées sur les sites. Pour la structure des
          données d'évenement je me suis appuyé sur <a href="https://schema.org/Event" target="_blank" rel="noreferrer">
            Schema.org
          </a>.<br/> La page d'accueil est une compilation de tous ces fichiers. <br />
          C'est simple, efficace et performant.
          <h2>Design</h2>
          <p>
            Il parait que le graphisme du site "pique". Pour ma part je
            considère qu'il a une identité visuelle forte (c'est joliment dit)
            et surtout, il s'inspire des tendances graphiques comme le
            Néo-brutalisme. Je peux donc affirmer que si vous n'aimez pas c'est
            que vous n'avez rien compris à l'art moderne ;)
          </p>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
