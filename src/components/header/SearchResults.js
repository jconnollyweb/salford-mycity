import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  const fetchData = async (searchQuery) => {
    try {
      setLoading(true);
      const [charitiesResponse, childcareResponse, childcareClubsResponse, localOfferResponse] = await Promise.all([
        fetch("http://salford-mycity.local/wp-json/wp/v2/charities-community?_embed"),
        fetch("http://salford-mycity.local/wp-json/wp/v2/childcare"),
        fetch("http://salford-mycity.local/wp-json/wp/v2/childcare_clubs"),
        fetch("http://salford-mycity.local/wp-json/wp/v2/local_offer")
      ]);

      const charities = await charitiesResponse.json();
      const childcare = await childcareResponse.json();
      const childcareClubs = await childcareClubsResponse.json();
      const localOffer = await localOfferResponse.json();

      const combinedResults = [
        ...charities.filter((item) => item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())),
        ...childcare.filter((item) => item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())),
        ...childcareClubs.filter((item) => item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase())),
        ...localOffer.filter((item) => item.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()))
      ];

      setResults(combinedResults);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-container">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {results.length === 0 && !loading && <div>No results found.</div>}

      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <a href={`/${result.slug}`}>{result.title.rendered}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
