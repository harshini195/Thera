import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

// Background container
const BackgroundContainer = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('/images/blue.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Quotes Caps', cursive",
});

// Auth card with fade-in animation
const AnimatedAuthCard = styled(Paper)(({ theme, visible }) => ({
  width: 400,
  padding: theme.spacing(4),
  borderRadius: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 6px 16px rgba(89, 100, 221, 0.25)",
  backgroundColor: "white",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.8s ease, transform 0.8s ease",
}));

const StyledTextField = styled(TextField)({
  marginBottom: "1rem",
  width: "100%",
  backgroundColor: "#f8f8f8",
  borderRadius: 8,
});

const ToggleText = styled(Typography)({
  marginTop: "1rem",
  fontSize: "0.95rem",
  cursor: "pointer",
  color: "#3f51b5",
  textDecoration: "underline",
});

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setCardVisible(true);
  }, 100); // small delay to trigger fade-in animation

  return () => {
    clearTimeout(timer);
  };
}, []);



  const handleToggle = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const url = isSignup
    ? `${process.env.REACT_APP_API_URL}/auth/register`
    : `${process.env.REACT_APP_API_URL}/api/auth/login`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      // 🔹 Store token for authenticated requests
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name || formData.name);

      // 🔹 Redirect to Journal / Dashboard / Thera Home
      window.location.href = "/thera";
    } else {
      alert(data.msg || "Something went wrong");
    }
  } catch (err) {
    alert("Network error");
    console.error(err);
  }
};


  return (
    <BackgroundContainer>
      <AnimatedAuthCard elevation={6} visible={cardVisible}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          {isSignup && (
            <StyledTextField
              variant="outlined"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <StyledTextField
            variant="outlined"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
          />
          <StyledTextField
            variant="outlined"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              borderRadius: 2,
              fontWeight: "bold",
              backgroundColor: "#3f51b5",
              ":hover": { backgroundColor: "#303f9f" },
            }}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </Button>
        </form>
        <ToggleText onClick={handleToggle}>
          {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </ToggleText>
      </AnimatedAuthCard>
    </BackgroundContainer>
  );
};

export default AuthPage;
