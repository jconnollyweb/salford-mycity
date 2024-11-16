import React, { useState, useEffect } from "react";
import axios from "axios";

const AdultCareSupport = () => {
  const [posts, setPosts] = useState([]);

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
    <div>
      <h1>Adult Care and Support</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title.rendered}</h2>
            {post.acf &&
              Object.entries(post.acf).map(([field, link]) => (
                <p key={field}>
                  <a href={link.url} target={link.target || "_self"}>
                    {link.title || field.replace(/_/g, " ")}
                  </a>
                </p>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdultCareSupport;
