import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faSchool, faHeartbeat, faWheelchair, faMapMarkerAlt, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import "./LocalOffer.css"
const LocalOffer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch local_offer data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://salford-mycity.local/wp-json/wp/v2/local_offer'); 
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="local-offer-container">
      <h1>Local Offer Information</h1>
      {data && data.length > 0 ? (
        <div className="card-container">
          {data.map((item) => (
            <div key={item.id} className="offer-card">
             

              {/* Render each link as a card with an icon above the text */}
              {item.acf.support_and_advice && item.acf.support_and_advice.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faBullhorn} className="card-icon" />
                  <a
                    href={item.acf.support_and_advice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.support_and_advice.title || 'Support and Advice'}
                  </a>
                </div>
              )}

              {item.acf.early_years_schools_and_education && item.acf.early_years_schools_and_education.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faSchool} className="card-icon" />
                  <a
                    href={item.acf.early_years_schools_and_education.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.early_years_schools_and_education.title || 'Early Years, Schools and Education'}
                  </a>
                </div>
              )}

              {item.acf.health && item.acf.health.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faHeartbeat} className="card-icon" />
                  <a
                    href={item.acf.health.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.health.title || 'Health'}
                  </a>
                </div>
              )}

              {item.acf.special_educational_needs_and_disabilities && item.acf.special_educational_needs_and_disabilities.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faWheelchair} className="card-icon" />
                  <a
                    href={item.acf.special_educational_needs_and_disabilities.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.special_educational_needs_and_disabilities.title || 'Special Educational Needs and Disabilities'}
                  </a>
                </div>
              )}

              {item.acf.things_to_do && item.acf.things_to_do.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="card-icon" />
                  <a
                    href={item.acf.things_to_do.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.things_to_do.title || 'Things to Do'}
                  </a>
                </div>
              )}

              {item.acf.getting_involved_and_having_your_say && item.acf.getting_involved_and_having_your_say.url && (
                <div className="off-card">
                  <FontAwesomeIcon icon={faHandsHelping} className="card-icon" />
                  <a
                    href={item.acf.getting_involved_and_having_your_say.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    {item.acf.getting_involved_and_having_your_say.title || 'Getting Involved and Having Your Say'}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No local offer data found.</p>
      )}
    </div>
  );
};

export default LocalOffer;
