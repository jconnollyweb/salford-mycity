import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdultCare.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faSchool,
  faHeartbeat,
  faWheelchair,
  faMapMarkerAlt,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";

const AdultCareSupport = () => {
  const [posts, setPosts] = useState([]);

  // Map ACF fields to their corresponding icons
  const iconMap = {
    advice_and_advocacy: faBullhorn,
    care_and_support_at_home: faHandsHelping,
    support_for_carers: faHeartbeat,
    disability: faWheelchair,
    education: faSchool,
    health_services: faHeartbeat,
    housing_and_accommodation_options: faMapMarkerAlt,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://salford-mycity.local/wp-json/wp/v2/adult_care_support/"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="adult-care-container">
      <h1>Adult Care and Support</h1>
      <div className="card-container">
        {posts.map((post) =>
          post.acf
            ? Object.entries(post.acf).map(([field, link]) => (
                <div key={field} className="adult-card">
                  <FontAwesomeIcon
                    icon={iconMap[field] || faBullhorn} // Default icon if none found
                    className="card-icon"
                  />
                  <h3 className="card-title">
                    {link.title || field.replace(/_/g, " ")}
                  </h3>
                  <a
                    href={link.url}
                    target={link.target || "_self"}
                    className="card-link"
                  >
                    Learn More
                  </a>
                </div>
              ))
            : null
        )}
      </div>
    </div>
  );
};

export default AdultCareSupport;
