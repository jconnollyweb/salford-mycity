import React, { useState, useEffect } from 'react';

const LocalOffer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch local_offer data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://salford-mycity.local/wp-json/wp/v2/local_offer'); // Adjust the URL if needed
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
    <div>
      <h1>Local Offer Information</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <h2>{item.title.rendered}</h2>

              {/* Render the custom fields as links */}
              <p>
                <strong>Support and Advice:</strong>
                {item.acf.support_and_advice && item.acf.support_and_advice.url ? (
                  <a
                    href={item.acf.support_and_advice.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.support_and_advice.title || 'Support and Advice'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Early Years, Schools and Education:</strong>
                {item.acf.early_years_schools_and_education && item.acf.early_years_schools_and_education.url ? (
                  <a
                    href={item.acf.early_years_schools_and_education.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.early_years_schools_and_education.title || 'Early Years, Schools and Education'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Health:</strong>
                {item.acf.health && item.acf.health.url ? (
                  <a
                    href={item.acf.health.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.health.title || 'Health'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Special Educational Needs and Disabilities:</strong>
                {item.acf.special_educational_needs_and_disabilities && item.acf.special_educational_needs_and_disabilities.url ? (
                  <a
                    href={item.acf.special_educational_needs_and_disabilities.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.special_educational_needs_and_disabilities.title || 'Special Educational Needs and Disabilities'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Things to Do:</strong>
                {item.acf.things_to_do && item.acf.things_to_do.url ? (
                  <a
                    href={item.acf.things_to_do.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.things_to_do.title || 'Things to Do'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Getting Involved and Having Your Say:</strong>
                {item.acf.getting_involved_and_having_your_say && item.acf.getting_involved_and_having_your_say.url ? (
                  <a
                    href={item.acf.getting_involved_and_having_your_say.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.getting_involved_and_having_your_say.title || 'Getting Involved and Having Your Say'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Preparing for Adult Life:</strong>
                {item.acf.preparing_for_adult_life && item.acf.preparing_for_adult_life.url ? (
                  <a
                    href={item.acf.preparing_for_adult_life.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.preparing_for_adult_life.title || 'Preparing for Adult Life'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
              <p>
                <strong>Travel and Transport:</strong>
                {item.acf.travel_and_transport && item.acf.travel_and_transport.url ? (
                  <a
                    href={item.acf.travel_and_transport.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.acf.travel_and_transport.title || 'Travel and Transport'}
                  </a>
                ) : (
                  'No link available'
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No local offer data found.</p>
      )}
    </div>
  );
};

export default LocalOffer;
