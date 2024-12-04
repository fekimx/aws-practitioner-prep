import React from 'react';
import './App.css';

const HomePage = () => {
  return (
    <div className="container row col-md-8" style={{ margin: 'auto', textAlign:'justify' }}>
      <div>
        <img src={`${process.env.PUBLIC_URL}/AWSCPCloud.png`} alt="Cloud image" style={{ width: '50%', maxWidth: '300px' }}></img>
      </div>
     <section className="mb-4">
        <h3>Why this site?</h3>
          <p>
            Even those with a solid computer science background and daily experience using AWS can find the certification exam challenging due to its extensive breadth. While it’s not an inherently difficult exam, the sheer volume of content—covering over 130 services and tools, along with pricing models, and various concepts—can feel overwhelming. This site aims to simplify your study process, breaking down complex topics into manageable lessons so you can confidently tackle the exam and succeed. 
          </p>
      </section>

      <section className="mb-4">
        <h3>Who is this for?</h3>
        <p> 
          This website is designed for individuals seeking to build a solid foundation in Amazon Web Services (AWS), particularly in the Cloud Practitioner exam. Whether you’re a complete beginner wanting to understand cloud concepts or a professional looking to enhance your skills for career advancement, these comprehensive study guides and practice quizzes cater to a wide range of learners, from students and IT professionals to business leaders aiming to leverage cloud technology effectively. Get ready to master the AWS Cloud and boost your confidence for the AWS Certified Cloud Practitioner exam!
        </p>
      </section>

      <section className="mb-4">
        <h3>Get Started</h3>
        <p>
          Ready to dive into the world of AWS? Learn about the exam structure, explore the lessons to review key concepts, and take quizzes to assess your understanding. These resources will guide you on your cloud journey and help you build a solid foundation in AWS!
        </p>
        <a href="/exam" className="btn btn-dark rounded-pill py-2 px-4">
          Get Started
        </a>
      </section>
    </div>
  );
};

export default HomePage;
