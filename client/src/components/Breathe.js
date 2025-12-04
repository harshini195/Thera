import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Fade-in animation container
const FadeInBox = styled(Box)(({ visible, delay }) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
}));

// Background container
const Container = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('/images/breath-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

// Button style with hover scaling
const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "black",
  padding: "0.75rem 2.5rem",
  borderRadius: "1.5rem",
  fontWeight: 700,
  fontStyle: "italic",
  fontSize: "1.75rem",
  textTransform: "none",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    transform: "scale(1.15)",
  },
});

// Header style
const Header = styled(Typography)({
  fontFamily: "'Westonia', cursive",
  fontSize: "6rem",
  fontWeight: "normal",
  textAlign: "center",
  color: "black",
  marginTop: "-8rem",
});

const Breathe = () => {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLearnClick = () => {
    navigate("/thera/breathe/learn");
  };

  const handleStartClick = () => {
    navigate("/thera/breathe/start");
  };

  return (
    <Container>
      <FadeInBox visible={fadeIn} delay={0}>
        <Header>Catch a breath</Header>
      </FadeInBox>
      <FadeInBox visible={fadeIn} delay={300}>
        <StyledButton onClick={handleStartClick}>START</StyledButton>
      </FadeInBox>
      <FadeInBox visible={fadeIn} delay={600}>
        <StyledButton onClick={handleLearnClick}>LEARN ABOUT BOX BREATHING</StyledButton>
      </FadeInBox>
    </Container>
  );
};

export default Breathe;
