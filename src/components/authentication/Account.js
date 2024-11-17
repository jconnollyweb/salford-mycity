import React, { useEffect, useState } from "react";
import "./Account.css"

const Account = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        
        const validationResponse = await fetch(
          "http://salford-mycity.local/wp-json/jwt-auth/v1/token/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!validationResponse.ok) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);

       
        const favoritesResponse = await fetch(
          "http://salford-mycity.local/wp-json/custom/v1/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!favoritesResponse.ok) {
          throw new Error("Failed to fetch favorites.");
        }

        const favoritesData = await favoritesResponse.json();
        console.log("Fetched favorites IDs:", favoritesData);

        
        const fullFavoriteData = await Promise.all(
          favoritesData.map(async (favoriteId) => {
            const response = await fetch(
              `http://salford-mycity.local/wp-json/wp/v2/charities-community/${favoriteId}?_embed`
            );
            return response.json();
          })
        );

        console.log("Full favorite data:", fullFavoriteData);

        setFavorites(fullFavoriteData); 
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading your account...</p>;
  }

  if (!isAuthenticated) {
    return <p>Please log in to access your account.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="account-container">
      <h2>Welcome to your account!</h2>
      <h3>Your Favorites</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>
              <strong>{item.title.rendered || `Favorite #${item.id}`}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no favorites yet.</p>
      )}
    </div>
  );
};

export default Account;
