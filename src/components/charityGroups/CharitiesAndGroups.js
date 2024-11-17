import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Charity.css";

const CharitiesAndGroups = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postcodes, setPostcodes] = useState([]);
  const [selectedPostcodes, setSelectedPostcodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://salford-mycity.local/wp-json/wp/v2/charities-community?_embed"
        );
        const result = await response.json();

        const uniquePostcodes = [
          ...new Set(result.map((item) => item.acf.postcode)),
        ].filter(Boolean);

        setData(result);
        setFilteredData(result);
        setPostcodes(uniquePostcodes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;

    const updatedSelectedPostcodes = checked
      ? [...selectedPostcodes, value]
      : selectedPostcodes.filter((postcode) => postcode !== value);

    setSelectedPostcodes(updatedSelectedPostcodes);

    setFilteredData(
      updatedSelectedPostcodes.length > 0
        ? data.filter((item) =>
            updatedSelectedPostcodes.includes(item.acf.postcode)
          )
        : data
    );
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="charities-container">
      <aside className="filter-sidebar">
        <div className="filter-card">
          <h2>Filter by Postcode</h2>
          {postcodes.map((postcode) => (
            <label key={postcode} className="filter-checkbox">
              <input
                type="checkbox"
                value={postcode}
                onChange={handleFilterChange}
                checked={selectedPostcodes.includes(postcode)}
              />
              {postcode}
            </label>
          ))}
        </div>
      </aside>

      <main className="charities-list">
        {filteredData.length > 0 ? (
          <div className="cards-grid">
            {filteredData.map((item) => (
              <Link
                to={`/charities/${item.id}`}
                key={item.id}
                className="card"
              >
                <img
                  src={
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={item.title.rendered}
                  className="card-thumbnail"
                />
                <div className="card-content">
                  <h3 className="card-title">{item.title.rendered}</h3>
                  <p>{item.acf.address}</p>
                  <p>{item.acf.postcode}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>No charities or community groups found.</p>
        )}
      </main>
    </div>
  );
};

export default CharitiesAndGroups;
