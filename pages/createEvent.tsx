import Link from "next/link";
import { FormEvent } from "react";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Layout from "../components/Layout";
import Footer from "../components/Footer";

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
    console.log(result);
  };

  return (
    <>
      <Header title="création d'événement" datas="" />
      <Layout>
        <div className={`${styles.card_bg} col-6 p-4`}>
          <h2 className={`${styles.h2} text-center`}>Créer un événement</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Nom (*)
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="nom"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                className="form-control"
                name="description"
              ></textarea>
            </div>
            <div className="mt-3">
              <label htmlFor="startDate" className="form-label">
                Date et heure de début (*)
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="startDate"
                name="startDate"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="endDate" className="form-label">
                Date et heure de fin
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="endDate"
                name="endDate"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="image" className="form-label">
                Image (url)
              </label>
              <input
                type="text"
                id="image"
                className="form-control"
                name="image"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="organizer" className="form-label">
                Organisateur
              </label>
              <input
                type="text"
                id="organizer"
                className="form-control"
                name="organizer"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="url" className="form-label">
                Lien de l&apos;événement (url)
              </label>
              <input type="text" id="url" name="url" className="form-control" />
            </div>
            <div className="mt-4">
              <h3 >Lieu de l&apos;événement</h3>
            </div>
            <div>
              <label htmlFor="locationName" className="form-label">
                Nom
              </label>
              <input
                type="text"
                id="locationName"
                className="form-control"
                name="locationName"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="locationStreetAddress" className="form-label">
                Adresse
              </label>
              <input
                type="text"
                id="locationStreetAddress"
                name="locationStreetAddress"
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="locationAddressLocality" className="form-label">
                Ville
              </label>
              <input
                type="text"
                id="locationAddressLocality"
                name="locationAddressLocality"
                className="form-control"
              />
            </div>
            <div className="d-flex justify-content-center mt-4">
              <input
                type="submit"
                className="btn btn-danger me-2"
                value="Enregistrer"
              />
            </div>
          </form>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
