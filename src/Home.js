import React from 'react';

const HomePage = () => {
  return (
    <div className="container row col-md-8" style={{ margin: 'auto', textAlign:'justify' }}>

      <section className="mb-4">
        <h3>Who is this for?</h3>
        <p> 
          This website is designed for individuals seeking to build a solid foundation in Amazon Web Services (AWS), particularly in the Cloud Practitioner exam. Whether you’re a complete beginner wanting to understand cloud concepts or a professional looking to enhance your skills for career advancement, these comprehensive study guides and practice quizzes cater to a wide range of learners, from students and IT professionals to business leaders aiming to leverage cloud technology effectively. Get ready to master the AWS Cloud and boost your confidence for the AWS Certified Cloud Practitioner exam!
        </p>
      </section>

      <section className="mb-4">
        <h3>What are the prerequisites?</h3>
        <p>
          There are no formal prerequisites for the AWS Cloud Practitioner exam! However, having a basic understanding of cloud computing concepts and some familiarity with IT terminology are surely beneficial. But don’t feel discouraged if this doesn’t sound like you! Just get started and you will get there with enough study and practice!
        </p>
      </section>

      <section className="mb-4">
        <h3>Get Started</h3>
        <p>
          Ready to dive into the world of AWS? Learn about the exam structure, explore the lessons to review key concepts, and take quizzes to assess your understanding. These resources will guide you on your cloud journey and help you build a solid foundation in AWS!
        </p>
        <a href="/get-started" className="btn btn-dark rounded-pill py-2 px-4">
          Get Started
        </a>
      </section>
    </div>
  );
};

export default HomePage;
