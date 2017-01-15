import React from 'react';

const About = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <p>
              A sample project built by
              <a href="https://github.com/joshuahenson"> Joshua Henson </a>
              for improving development skills using React while implementing the following user stories.
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <ul>
              <li>User Story: As an unauthenticated user, I can login with Twitter.</li>
              <li>User Story: As an authenticated user, I can link to images.</li>
              <li>User Story: As an authenticated user, I can delete images that I&apos;ve linked to.</li>
              <li>User Story: As an authenticated user, I can see a Pinterest-style wall of all the images I&apos;ve linked to.</li>
              <li>User Story: As an unauthenticated user, I can browse other users&apos; walls of images.</li>
              <li>User Story: As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
