import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const totalImages = 330;
  const [currentImage, setCurrentImage] = useState(1);
  const contentRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScroll;
    const imageIndex = Math.floor(scrollFraction * totalImages) + 1;

    setCurrentImage(Math.min(Math.max(imageIndex, 1), totalImages));

    if (scrollPosition >= maxScroll) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div style={{ height: "1000vh", position: "relative" }}>
        <img
          src={require(`../src/assets/images/${String(currentImage).padStart(
            5,
            "0"
          )}.jpg`)}
          alt={`Image ${currentImage}`}
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </div>
      <div
        ref={contentRef}
        style={{ padding: "20px", backgroundColor: "#f0f0f0" }}
      >
        <h2>Additional Content</h2>
        <p>
          Here you can add any content you like. This section will be displayed
          after scrolling through the images. You can include text, images, or
          any other elements.
        </p>
      </div>
    </div>
  );
};

export default App;
