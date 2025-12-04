import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Main container with background image
const Container = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('/images/new-bg.png')", // New background image
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "3rem",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
});

// Title
const Title = styled(Typography)({
  fontFamily: "'Westonia', cursive",
  fontSize: "6rem", // Increased font size
  color: "#111",
  marginTop: "-4rem", // Reduced space between header and top
  marginBottom: "1rem",
});

// Paragraph text
const Paragraph = styled(Typography)({
  fontSize: "1.75rem", // Increased font size
  maxWidth: "800px",
  lineHeight: 1.7,
  color: "#333",
  fontStyle: "italic",
  marginBottom: "0.15rem", // Reduced marginBottom to reduce space
});

// Emphasis
const Bold = styled("span")({
  fontWeight: 700,
  fontStyle: "italic",
});

// Steps list
const StepsList = styled("ol")({
  textAlign: "left",
  maxWidth: "700px",
  fontSize: "1.5rem", // Increased font size
  fontStyle: "italic",
  color: "#333",
  marginTop: "1rem", // Reduced top margin
  paddingLeft: "1.5rem",
});

// Button style for "Ready to Start"
const StyledButton = styled(Button)({
  backgroundColor: "#28547E", // Blue background color
  color: "white",
  padding: "1rem 3rem",
  borderRadius: "1.5rem",
  fontWeight: 700,
  fontSize: "2rem",
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginTop: "0.25rem", // Add space before button
  transition: "transform 0.3s ease", // Smooth transition for scaling
  "&:hover": {
    transform: "scale(1.1)", // Scale the button to 110% of its size when hovered
  },
});

const Learn = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = () => {
    navigate("/thera/breathe/start"); // Navigate to the Start page when button is clicked
  };

  return (
    <Container>
      <Title>What is Box Breathing?</Title>

      <Paragraph>
        <Bold>Box breathing</Bold> is a simple method to relax. You breathe in,
        hold, breathe out, and relax—each for 4 seconds. It helps calm your mind
        and reduce stress.
      </Paragraph>

      <Paragraph>
        <Bold>Each step lasts 4 seconds:</Bold>
      </Paragraph>

      <StepsList>
        <li>Sit or lie down in a comfy spot.</li>
        <li>Breathe in through your nose.</li>
        <li>Hold your breath.</li>
        <li>Breathe out through your mouth.</li>
        <li>Relax.</li>
        <li>Repeat the steps 5 times or more.</li>
      </StepsList>

      <StyledButton onClick={handleButtonClick}>Ready to Start</StyledButton> {/* "Ready to Start" button */}
    </Container>
  );
};

export default Learn;
