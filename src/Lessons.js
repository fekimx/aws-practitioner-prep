import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Lessons = () => {
  const [content, setContent] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchDocumentContent = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/doc');
        console.log(response.data); 
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching document content:', error);
      }
    }; 

    fetchDocumentContent();
  }, []);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const renderContent = (content) => {
    return content.map((item, index) => {
      if (item.paragraph) {
        return (
          <div key={index}>
            <h4 onClick={() => toggleExpand(index)} style={{ cursor: 'pointer' }}>
              {item.paragraph.elements[0]?.textRun?.content.trim()}
            </h4>
            {expanded[index] && (
              <p>{item.paragraph.elements.slice(1).map(el => el.textRun?.content).join(' ')}</p>
            )}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <h1>Google Doc Viewer</h1>
      {renderContent(content)}
    </div>
  );
};

export default Lessons;