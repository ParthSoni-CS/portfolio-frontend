// filepath: /mnt/e/Protfolio-website/pedrotech-portfolio/src/components/CaseStudy.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const CaseStudy = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/case-studies/${id}.html`)
      .then((response) => response.text())
      .then((data) => setContent(data));
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};