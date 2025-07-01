import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-background">
      <div className="about-container">
        <section className="hero">
          <h1>WanderList</h1>
          <p>Your journey begins here. Discover, plan, and share the places that move you.</p>
        </section>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            Wanderlist was created to inspire explorers, dreamers, and adventurers alike. It's more than
            a travel tracker — it's a place to collect your dreams, visualize your goals, and share your
            story with a community of like-minded travelers. Whether you're planning your next escape or
            reminiscing about past adventures, Wanderlist gives you the tools to map out meaningful experiences.
          </p>
        </section>

        <section className="features">
          <h2>What You Can Do</h2>
          <ul>
            <li>Add and manage your travel destinations</li>
            <li>Organize trips by tags, categories, and priority</li>
            <li>Explore journeys shared by other users</li>
            <li>Watch your adventures unfold on a world map</li>
          </ul>
        </section>

        <section className="creator">
          <h2>Meet the Creator</h2>
          <p>
            I’m Roger Shyaka, a Full Stack Developer passionate about building intuitive, user-focused applications that solve real-world problems. As part of my ongoing training at General Assembly, I’m actively developing Wanderlist — a full-stack travel app built from the ground up using agile workflows and collaborative development practices. This project highlights my current proficiency with modern web technologies, along with my ability to think critically, design with intention, and deliver polished, user-centered applications that are ready for real-world use.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
