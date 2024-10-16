import React, { useEffect, useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <h2 onClick={toggle} style={{ cursor: 'pointer' }}>
        {title} {isOpen ? '▲' : '▼'}
      </h2>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const Lessons = () => {
  const [htmlContent, setHtmlContent] = useState([]);

  useEffect(() => {
    fetch('/AWS_CloudPractitioner.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        const sections = Array.from(doc.querySelectorAll('h2')).map(heading => {
          const content = [];
          let next = heading.nextElementSibling;

          while (next && next.tagName !== 'H2') {
            content.push(next.outerHTML);
            next = next.nextElementSibling;
          }

          return {
            title: heading.textContent,
            content: content.join(''),
          };
        });

        setHtmlContent(sections);
      })
      .catch(error => console.error('Error fetching HTML file:', error));
  }, []);

  return (
    <div>
      {htmlContent.map((section, index) => (
        <CollapsibleSection key={index} title={section.title}>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </CollapsibleSection>
      ))}
    </div>
  );
};

export default Lessons;
