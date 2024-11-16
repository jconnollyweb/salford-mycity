import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CharDets.css"

const CharityDetails = () => {
  const { id } = useParams();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);
  const [image3Url, setImage3Url] = useState(null);

  useEffect(() => {
    // Fetch charity details including featured media
    axios
      .get(`http://salford-mycity.local/wp-json/wp/v2/charities-community/${id}?_embed`)
      .then((response) => {
        setCharity(response.data);
        setLoading(false);

        // Check if image1, image2, image3 exists and fetch their URLs if they are IDs
        const { image1, image2, image3 } = response.data.acf;

        // Fetch media URLs for image1, image2, image3
        const fetchImage = (imageId, setter) => {
          if (imageId) {
            axios
              .get(`http://salford-mycity.local/wp-json/wp/v2/media/${imageId}`)
              .then((mediaResponse) => {
                setter(mediaResponse.data.source_url);
              })
              .catch((error) => console.error("Error fetching image:", error));
          }
        };

        fetchImage(image1, setImage1Url);
        fetchImage(image2, setImage2Url);
        fetchImage(image3, setImage3Url);
      })
      .catch((error) => {
        console.error("Error fetching charity details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!charity) return <div>No charity data found.</div>;

  // Extracting the featured image from the _embedded object
  const featuredImageUrl = charity._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="charity-details">
      <h1>{charity.title.rendered}</h1>

      <div className="charity-images">
        {/* Gallery images (image1, image2, image3) */}
        <div className="image-gallery">
          {image1Url && (
            <img
              src={image1Url}
              alt="Image 1"
              className="thumbnail"
            />
          )}
          {image2Url && (
            <img
              src={image2Url}
              alt="Image 2"
              className="thumbnail"
            />
          )}
          {image3Url && (
            <img
              src={image3Url}
              alt="Image 3"
              className="thumbnail"
            />
          )}
        </div>

        {/* Featured Image */}
        {featuredImageUrl && (
          <img
            src={featuredImageUrl}
            alt={charity.title.rendered || "Featured Image"}
            className="featured-image"
          />
        )}

        {/* Content */}
        <div className="content">
          {/* Render Post Paragraph */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{
              __html: charity.content.rendered,
            }}
          />

          {/* Render other ACF fields */}
          <p><strong>Address:</strong> {charity.acf.address || "Not available"}</p>
          <p><strong>Postcode:</strong> {charity.acf.postcode || "Not available"}</p>
          <p><strong>Email:</strong> {charity.acf.email || "Not available"}</p>
          <p><strong>Website:</strong> {charity.acf.website ? <a href={charity.acf.website} target="_blank" rel="noopener noreferrer">Visit Website</a> : "Not available"}</p>
          <p><strong>When is it:</strong> {charity.acf.when_is_it || "Not available"}</p>
          <p><strong>Time of Day:</strong> {charity.acf.time_of_day || "Not available"}</p>
          <p><strong>Referral Required:</strong> {charity.acf.referral_required ? "Yes" : "No"}</p>
          <p><strong>Cost Amount:</strong> {charity.acf.cost_ammount || "Not available"}</p>
          <p><strong>Cost Type:</strong> {charity.acf.cost_type || "Not available"}</p>
          <p><strong>Cost Details:</strong> {charity.acf.cost_details || "Not available"}</p>
          <p><strong>Notes:</strong> {charity.acf.notes || "Not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default CharityDetails;
