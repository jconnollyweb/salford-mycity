import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ClubDetails.css"

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    axios
      .get(`http://salford-mycity.local/wp-json/wp/v2/childcare_clubs/${id}`)
      .then((response) => {
        setClub(response.data);
      })
      .catch((error) => console.error("Error fetching club details:", error));
  }, [id]);

  if (!club) return <p className="loading">Loading club details...</p>;

  const { acf } = club;

  return (
    <div className="club-details-container">
      <header>
        <h1 className="club-title">{club.title.rendered}</h1>
      </header>

      {acf ? (
        <div className="club-details-card">
          <p>
            <strong>Address:</strong> {acf.address || "Not available"}
          </p>
          <p>
            <strong>Postcode:</strong> {acf.post_code || "Not available"}
          </p>
          <p>
            <strong>Telephone:</strong> {acf.telephone || "Not available"}
          </p>
          <p>
            <strong>Opening Times:</strong>{" "}
            {acf.opening_times || "Not available"}
          </p>
          <p>
            <strong>Ofsted Outcome:</strong>{" "}
            {acf.latest_ofsted_outcome || "Not available"}
          </p>
          <p>
            <strong>Inspection Date:</strong>{" "}
            {acf.inspection_date || "Not available"}
          </p>
          <p>
            <strong>3 & 4-Year-Old Funding:</strong>{" "}
            {acf["3_and_4_year_old_funding"] ? "Yes" : "No"}
          </p>
          <p>
            <strong>2-Year-Old Funding:</strong>{" "}
            {acf["2_year_old_funding"] ? "Yes" : "No"}
          </p>
          <p>
            <strong>Tax-Free Childcare:</strong>{" "}
            {acf.signed_up_for_tax_free_childcare ? "Yes" : "No"}
          </p>
          <p>
            <strong>School Pickup Details:</strong>{" "}
            {acf.school_pickup_details || "Not available"}
          </p>
          <p>
            <strong>Immediate Vacancies:</strong>{" "}
            {acf.immediate_vacancies || "Not available"}
          </p>
          <p>
            <strong>Other Details:</strong> {acf.other_details || "Not available"}
          </p>
          <p>
            <strong>Costs:</strong> {acf.costs || "Not available"}
          </p>
        </div>
      ) : (
        <p className="no-details">No additional details available for this club.</p>
      )}
    </div>
  );
};

export default ClubDetails;
