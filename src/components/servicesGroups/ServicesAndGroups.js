import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Services.css";

const ServicesAndGroups = () => {
  // State to store fetched data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data from the WordPress REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://salford-mycity.local/wp-json/wp/v2/services_and_groups"
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render the component
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="services-and-groups-container">
      <h1 className="services-title">Services and Groups</h1>
      {data && data.length > 0 ? (
        <div className="cards-grid">
          {data.map((item) => (
            <Link
              key={item.id}
              to={'/charity-groups/'} // Link to Charities and Groups page
              className="card"
            >
              <h2 className="card-title">{item.title.rendered}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <p>No services and groups found.</p>
      )}
    </div>
  );
};

export default ServicesAndGroups;