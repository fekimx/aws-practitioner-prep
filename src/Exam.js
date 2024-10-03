import React from 'react';

const Exam = () => {
  return (
    <div className="container">
      <header className="mb-4">
        <h3>Why this site?</h3>
        <p>
          Even people with a strong CS background and use AWS in their daily job may struggle in the exam because it covers a broad range of topics, you may . When I came back to update my knowledge and get certified, I noticed how much even the Cloud Practitioner exam covers and immediately felt it was too much to take in. It is not a difficult exam, but the material that's covered is really broad, and you need to know well over 130 services and tools, pricing, and more.
        </p>
      </header>

      <section className="mb-4">
        <h3>Key concepts:</h3>
        <ul>
            <li>Explain the advantages of the AWS Cloud.</li>
            <li>Understand and explain the AWS shared responsibility model.</li>
            <li>Understand security best practices.</li>
            <li>Understand AWS Cloud costs, economics, and billing practices.</li>
            <li>Describe and position the core AWS services, including compute, network, database, and storage services.</li>
            <li>Identify AWS services for common use cases.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h3>Quick Facts:</h3>
        <p> </p>
        <ul>
            <li>The exam is a mixture of 65 multiple choice and multiple response questions. 50/65 affect your score while 15/65 are unscored. But you won't know which ones are scored or unscored.</li>
            <li>The exam is 90 minutes. In my opinion, it is a plenty of time.</li>
            <li>You need to get 700/1000 at minimum in order to pass the exam. However, it is pass/fail meaning you won't see your score after completing the exam.</li>
            <li>There are 4 domains in the current version (CLF-C02) of the exam.</li>
                <ol>
                    <li>Cloud Concepts (24% of scored content)</li>
                    <li>Security and Compliance (30% of scored content)</li>
                    <li>Cloud Technology and Services (34% of scored content)</li>
                    <li>Billing, Pricing, and Support (12% of scored content)</li>
                </ol>
        </ul>
      </section>

    </div>
  );
};

export default Exam;
