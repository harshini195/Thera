import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate

// Quotes list
const quotes = [
  "Take a deep breath and begin again.",
  "Your feelings are valid.",
  "Healing is not linear.",
  "Small steps every day.",
  "Just keep swimming.", // Finding Nemo
  "You’ve got a friend in me.", // Toy Story
  "Let it go, let it go.", // Frozen
  "It’s a beautiful day, don’t let it get away.", // U2
  "You are braver than you believe.", // Winnie the Pooh
  "After the rain, comes the rainbow.",
  "To infinity and beyond!", // Toy Story
  "I will survive!", // Gloria Gaynor
  "You can't stop the beat!", // Hairspray
  "Even the darkest night will end and the sun will rise.", // Les Misérables
  "The sun’ll come out tomorrow.", // Annie
  "You’re stronger than you think.",
  "Don’t stop believin’", // Journey

  
];


const Container = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('/images/bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "0.1rem",
  paddingBottom: "2rem",
  fontFamily: "'Quotes Caps', cursive",
});

// Option cards
const OptionCard = styled(Box)({
  width: 290,
  height: 255,
  backgroundColor: "white",
  borderRadius: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "2rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.15)",
  },
});

// Icon image styling
const IconImage = styled("img")({
  width: "190px",
  height: "190px",
  marginBottom: "1rem",
});

// Animated logo
const Logo = styled("img")({
  width: "350px", // Adjust width as desired
  height: "150px", // Adjust height as desired
  objectFit: "cover", // Fills the rectangle shape
  borderRadius: "12px", // Optional: small rounding on corners
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "scale(1.1)", // Slight zoom on hover
  },
});

const Thera = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleMouseEnter = () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(random);
    setShowQuote(true);
  };

  const handleMouseLeave = () => {
    setShowQuote(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/auth"); // Use navigate instead of history.push
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Container>
      {/* First row */}
      <Grid container spacing={8} alignItems="center" justifyContent="space-between" sx={{ mt: 1, px: 12 }}>
        <Grid item sx={{ ml: -70 }}>
          <Link to="/thera/journal" style={{ textDecoration: "none" }}>
            <OptionCard>
              <IconImage src="/images/journal.png" alt="Journal" />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.75rem", fontWeight: 600, color: "black" }}>
                Journal
              </Typography>
            </OptionCard>
          </Link>
        </Grid>

        <Grid item sx={{ mr: -70 }}>
          <Link to="/thera/moodboard" style={{ textDecoration: "none" }}>
            <OptionCard>
              <IconImage src="/images/mood.png" alt="Mood Tracker" />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.75rem", fontWeight: 600, color: "black" }}>
                Mood Tracker
              </Typography>
            </OptionCard>
          </Link>
        </Grid>
      </Grid>

      {/* Center Logo / Quote */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: "0.4rem",
          minHeight: "250px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showQuote ? (
          <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.15rem", fontWeight: 600, color: "black" }}>
            {currentQuote}
          </Typography>
        ) : (
          <Logo src="/images/logo.png" alt="Center Logo" />
        )}
      </Box>

      {/* Login / Logout Button */}
      <Box sx={{ position: "absolute", top: 20, right: 30 }}>
        {isLoggedIn ? (
          <Box
            sx={{
              backgroundColor: "#ffffffcc",
              px: 3,
              py: 1,
              borderRadius: 10,
              boxShadow: "0 4px 10px rgba(34, 39, 63, 0.2)",
              fontFamily: "'Dancing Script', cursive",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "black",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.2)",
              },
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </Box>
        ) : (
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                backgroundColor: "#ffffffcc",
                px: 3,
                py: 1,
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(34, 39, 63, 0.2)",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "black",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
                cursor: "pointer",
              }}
            >
              Login / Sign Up
            </Box>
          </Link>
        )}
      </Box>

      {/* Second row */}
      <Grid container spacing={8} alignItems="center" justifyContent="space-between" sx={{ mt: 0, px: 12 }}>
        <Grid item sx={{ ml: -70 }}>
          <Link to="/thera/breathe" style={{ textDecoration: "none" }}>
            <OptionCard>
              <IconImage src="/images/breath.png" alt="Catch a Breath" />
              <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.75rem", fontWeight: 600, color: "black" }}>
                Catch a breath
              </Typography>
            </OptionCard>
          </Link>
        </Grid>

        <Grid item sx={{ mr: -70 }}>
  <Link to="/thera/therapychat" style={{ textDecoration: "none" }}>
    <OptionCard>
      <IconImage src="/images/therapy.png" alt="Therapy Talk" />
      <Typography sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.75rem", fontWeight: 600,color: "black" }}>
        Therapy Talk
      </Typography>
    </OptionCard>
  </Link>
</Grid>

      </Grid>
    </Container>
  );
};

export default Thera;
