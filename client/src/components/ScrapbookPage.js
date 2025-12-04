import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Draggable from "react-draggable";
import { Rnd } from "react-rnd";

// Styled component for scrapbook background
const Background = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#fff8e1",
  padding: "2rem",
  fontFamily: "'Dancing Script', cursive",
  overflow: "hidden",
  position: "relative",
});

// Component for draggable and resizable images/text
const ScrapItem = ({ children, defaultSize }) => (
  <Rnd
    default={{
      x: 100,
      y: 100,
      width: defaultSize?.width || 200,
      height: defaultSize?.height || 200,
    }}
    bounds="parent"
    style={{ border: "1px dashed #aaa", padding: "0.5rem" }}
  >
    {children}
  </Rnd>
);

const ScrapbookPage = () => {
  const [items, setItems] = useState([]);

  const handleAddImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setItems([...items, { type: "image", content: url }]);
    }
  };

  const handleAddText = () => {
    const text = prompt("Enter your text:");
    if (text) {
      setItems([...items, { type: "text", content: text }]);
    }
  };

  return (
    <Background>
      <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>
        My Scrapbook
      </Typography>

      <Box sx={{ mb: 2, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={handleAddImage}>
          Add Image
        </Button>
        <Button variant="contained" onClick={handleAddText}>
          Add Text
        </Button>
      </Box>

      {/* Render items */}
      {items.map((item, index) => (
        <ScrapItem key={index}>
          {item.type === "image" ? (
            <img src={item.content} alt="scrap" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          ) : (
            <Typography variant="h5">{item.content}</Typography>
          )}
        </ScrapItem>
      ))}
    </Background>
  );
};

export default ScrapbookPage;
