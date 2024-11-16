import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
  const microservices = [
    { name: "Services and Groups", path: "/services-and-groups" },
    { name: "Childcare", path: "/childcare" },
    { name: "Local Offer", path: "/local-offer" },
    { name: "Adult Care and Support", path: "/adult-care" },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to MyCity Directory</h1>
      <p>My City Directory is your go-to resource for discovering a wide range of services, activities and events on offer across Salford and Greater Manchester.
        My City Directory provides information on a wealth of local services aimed at enhancing your daily life, enriching your leisure time, and keeping you informed about everything happening in your city.
        Stay connected, informed, and engaged.
        For more information about the directory and how we source our information, visit our webpage What is My City Directory?
        For information on mental health and wellbeing, visit Partners In Salford site.
        What is the Local Offer? The Local Offer is an online hub of information, all about special educational needs and disabilities. There is a directory of services offering information and advice, leisure activities and support to children and young people with special educational needs and/or disabilities (SEND), and their families. The Local Offer is also a website of information to help families navigate their journey through the world of SEND.


        </p>
      <div className="card-container">
        {microservices.map((service, index) => (
          <Link to={service.path} key={index} className="service-card">
            <h2>{service.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
