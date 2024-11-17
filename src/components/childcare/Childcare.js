import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Childcare.css'; // Import styling

const Childcare = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch childcare data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://salford-mycity.local/wp-json/wp/v2/childcare'); 
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
    <div className="childcare-container">
      <h1>Childcare Information</h1>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} className="childcare-section">
            <h2>{item.title.rendered}</h2>
            <p>{item.acf.childcare_summary}</p> {/* Render the summary */}

            {/* Render links as cards */}
            <div className="link-card-container">
              {item.acf.link_one && (
                <Link to="/clubs-list" className="link-card">
                  Before and After School Clubs
                </Link>
              )}
              {item.acf.link_two && (
                <a
                  href={item.acf.link_two}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  Childminder
                </a>
              )}
              {item.acf.link_three && (
                <a
                  href={item.acf.link_three}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  Day Nursery
                </a>
              )}
              {item.acf.link_4 && (
                <a
                  href={item.acf.link_4}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  Holiday Club
                </a>
              )}
              {item.acf.link_5 && (
                <a
                  href={item.acf.link_5}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  Pre-School Playgroup
                </a>
              )}
              {item.acf.link_6 && (
                <a
                  href={item.acf.link_6}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  Special Educational Needs Support
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No childcare data found.</p>
      )}
    </div>
  );
};

export default Childcare;
