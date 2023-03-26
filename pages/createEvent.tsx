import Link from "next/link";
import { FormEvent } from "react";
// import styles from '../styles/Home.module.css'

import Header from "../components/header";
import Layout from "../components/layout";

export default function eventCreate() {
  // Handle the submit event on form submit.
  const handleSubmit = async (event: FormEvent) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Cast the event target to an html form
    const form = event.target as HTMLFormElement;

    // Get data from the form.
    const data = {
      name: form.nom.value as string,
      description: form.description.value as string,
      startDate: form.startDate.value as string,
      endDate: form.endDate.value as string,
      image: form.image.value as string,
      organizer: form.organizer.value as string,
      url: form.url.value as string,
      locationName: form.locationName.value as string,
      locationStreetAddress: form.locationStreetAddress.value as string,
      locationAddressLocality: form.locationAddressLocality.value as string,
    };

    // Send the form data to our API and get a response.
    const response = await fetch("/api/form", {
      // Body of the request is the JSON d&apos;ata we created above.
      body: JSON.stringify(data),
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // The method is POST because we are sending data.
      method: "POST",
    });

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    //  alert(`Is this your full name: ${result.data}`)
    console.log(result)
  };

  return (
    <>
      <Header title="création d&apos;événement" datas="" />
      <Layout>
        <h2>Créer un événement</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="nom" />
          <br />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" />
          <br />
          <label htmlFor="startDate">Date et heure de début</label>
          <input type="datetime-local" id="startDate" name="startDate" />
          <br />
          <label htmlFor="endDate">Date et heure de fin</label>
          <input type="datetime-local" id="endDate" name="endDate" />
          <br />
          <label htmlFor="image">Image (url)</label>
          <input type="text" id="image" name="image" />
          <br />
          <label htmlFor="organizer">Organisateur</label>
          <input type="text" id="organizer" name="organizer" />
          <br />
          <label htmlFor="url">url</label>
          <input type="text" id="url" name="url" />
          <br />
          <b>Lieu de l&apos;événement</b>
          <br />
          <label htmlFor="locationName">Nom</label>
          <input type="text" id="locationName" name="locationName" />
          <br />

          <label htmlFor="locationStreetAddress">Adresse</label>
          <input
            type="text"
            id="locationStreetAddress"
            name="locationStreetAddress"
          />
          <br />

          <label htmlFor="locationAddressLocality">Ville</label>
          <input
            type="text"
            id="locationAddressLocality"
            name="locationAddressLocality"
          />
          <br />

          <input type="submit" value="Enregistrer" />
        </form>
      </Layout>
    </>
  );
}