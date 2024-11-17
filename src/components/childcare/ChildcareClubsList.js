import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChildcareClubsList.css"; 

const ClubsList = () => {
  const [clubs, setClubs] = useState([]);
  const [filters, setFilters] = useState({
    post_code: [],
    school_pickup_details: [],
    latest_ofsted_outcome: [],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    post_code: [],
    school_pickup_details: [],
    latest_ofsted_outcome: [],
  });
  const [filteredClubs, setFilteredClubs] = useState([]);

  useEffect(() => {
    axios
      .get("http://salford-mycity.local/wp-json/wp/v2/childcare_clubs")
      .then((response) => {
        const data = response.data;

        const uniquePostcodes = [
          ...new Set(data.map((club) => club.acf?.post_code).filter(Boolean)),
        ];
        const uniquePickupDetails = [
          ...new Set(
            data.map((club) => club.acf?.school_pickup_details).filter(Boolean)
          ),
        ];
        const uniqueOfstedOutcomes = [
          ...new Set(
            data
              .map((club) => club.acf?.latest_ofsted_outcome)
              .filter((outcome) => outcome && outcome.trim() !== "")
          ),
        ];

        setClubs(data);
        setFilteredClubs(data);
        setFilters({
          post_code: uniquePostcodes,
          school_pickup_details: uniquePickupDetails,
          latest_ofsted_outcome: uniqueOfstedOutcomes,
        });
      })
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[filterType].includes(value);
      return {
        ...prev,
        [filterType]: isSelected
          ? prev[filterType].filter((item) => item !== value)
          : [...prev[filterType], value],
      };
    });
  };

  useEffect(() => {
    const applyFilters = () => {
      let updatedClubs = clubs;

      if (selectedFilters.post_code.length) {
        updatedClubs = updatedClubs.filter((club) =>
          selectedFilters.post_code.includes(club.acf?.post_code)
        );
      }
      if (selectedFilters.school_pickup_details.length) {
        updatedClubs = updatedClubs.filter((club) =>
          selectedFilters.school_pickup_details.includes(
            club.acf?.school_pickup_details
          )
        );
      }
      if (selectedFilters.latest_ofsted_outcome.length) {
        updatedClubs = updatedClubs.filter((club) =>
          selectedFilters.latest_ofsted_outcome.includes(
            club.acf?.latest_ofsted_outcome
          )
        );
      }

      setFilteredClubs(updatedClubs);
    };

    applyFilters();
  }, [selectedFilters, clubs]);

  if (!clubs.length) return <p>Loading clubs...</p>;

  return (
    <div className="clubs-container">
      <h1 className="clubs-title">Before and After School Clubs</h1>

      <div className="layout">
        <div className="filters">
          <h3>Filters</h3>
          <div>
            <h4>Postcode</h4>
            {filters.post_code.map((post_code) => (
              <label key={post_code}>
                <input
                  type="checkbox"
                  value={post_code}
                  checked={selectedFilters.post_code.includes(post_code)}
                  onChange={() => handleCheckboxChange("post_code", post_code)}
                />
                {post_code}
              </label>
            ))}
          </div>
          <div>
            <h4>School Pickup Details</h4>
            {filters.school_pickup_details.map((detail) => (
              <label key={detail}>
                <input
                  type="checkbox"
                  value={detail}
                  checked={selectedFilters.school_pickup_details.includes(
                    detail
                  )}
                  onChange={() =>
                    handleCheckboxChange("school_pickup_details", detail)
                  }
                />
                {detail}
              </label>
            ))}
          </div>
          <div>
            <h4>Ofsted Outcome</h4>
            {filters.latest_ofsted_outcome.map((outcome) => (
              <label key={outcome}>
                <input
                  type="checkbox"
                  value={outcome}
                  checked={selectedFilters.latest_ofsted_outcome.includes(
                    outcome
                  )}
                  onChange={() =>
                    handleCheckboxChange("latest_ofsted_outcome", outcome)
                  }
                />
                {outcome}
              </label>
            ))}
          </div>
        </div>

        <div className="clubs-list">
          {filteredClubs.map((club) => (
            <div key={club.id} className="club-card">
              <h2>
                <Link to={`/club/${club.id}`}>{club.title.rendered}</Link>
              </h2>
              <p>{club.acf?.address || "Address not available"}</p>
              <p>{club.acf?.post_code || "Postcode not available"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsList;
