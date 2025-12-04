import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";

const lightTheme = {
  bg1: "#d8e9f4",
  bg2: "#D4C9BE",
  dark: "#123458",
  darkest: "#030303",
  accentDark: "#153b4a",
  mid: "#547792",
  light: "#94B4C1",
  coral: "#F88379",
};

const darkTheme = {
  bg1: "#101820",
  bg2: "#1C1C1C",
  dark: "#f1f1f1",
  darkest: "#ffffff",
  accentDark: "#3A506B",
  mid: "#5C677D",
  light: "#AAB8C2",
  coral: "#FF6B6B",
};

const quotes = [
  "Take a deep breath and begin again.",
  "Your feelings are valid.",
  "Healing is not linear.",
  "Small steps every day.",
  "Just keep swimming.",
  "You’ve got a friend in me.",
];

const PageContainer = styled(Box)(({ themeMode }) => ({
  fontFamily: "'Poppins', sans-serif",
  overflowY: "auto",
  scrollBehavior: "smooth",  // 👈 Add this line
  backgroundColor: themeMode.bg1,
  minHeight: "100vh",
  transition: "background-color 0.3s ease",
}));

const NavBar = styled(AppBar)(({ themeMode }) => ({
  backgroundColor: themeMode.accentDark,
  padding: "0.5rem 2rem",
  position: "sticky",
  top: 0,
  zIndex: 10,
}));
const [hideNav, setHideNav] = useState(false);
const firstSectionRef = useRef();


const Section = styled(Box)(({ bgcolor, bgimage }) => ({
  minHeight: "80vh",
  backgroundColor: bgcolor,
  backgroundImage: bgimage ? `url(${bgimage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "3rem",
  paddingBottom: "2rem",
  textAlign: "center",
  transition: "background-color 1s ease, transform 0.6s ease",
}));


const FadeInOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ${delay}ms, transform 0.5s ${delay}ms`,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

const Thera = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("Welcome to Thera");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const cards = [
    {
      src: "/images/breathingmain.png",
      title: "Catch a Breath",
      desc: "Can’t catch your breath? Having a panic attack? Feeling nervous or overwhelmed?Try this simple breathing exercise — it’s here to help you feel calmer, more focused, and a little more in control.",
      link: "/thera/breathe",
    },
    {
      src: "/images/journalmain.png",
      title: "Journal",
      desc: "A safe space to untangle your thoughts, track emotional patterns, and reflect on your inner world. Whether you’re venting, celebrating, or simply processing your day, your words matter here and they’re always welcome.",
      link: "/thera/journal",
    },
    {
      src: "/images/therabotmain.png",
      title: "Therapy Talk",
      desc: "Feeling low or overwhelmed? Chat with our friendly THERABOT it's always here to listen and help you sort through your thoughts.",
      link: "/thera/therapychat",
    },
    {
      src: "/images/moodboardmain.png",
      title: "Mood Tracking",
      desc: "Color your days, one pixel at a time. Track how you feel daily and watch your rollercoaster year come to life ",
      link: "/thera/moodboard",
    },
  ];

  return (
    <PageContainer themeMode={theme}>
      <NavBar themeMode={theme} position="static" elevation={10}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.light }}>
            <FadeInOnScroll>It's OKAY to not feel OKAY</FadeInOnScroll>
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControlLabel
              control={<Switch checked={isDarkMode} onChange={toggleDarkMode} color="default" />}
              label="Dark Mode"
              sx={{ color: theme.light }}
            />
            {["About Us", "Contact", "FAQ"].map((label) => (
              <Button key={label} color="inherit" sx={{ mx: 1 }}>{label}</Button>
            ))}
            {localStorage.getItem("token") ? (
              <Button sx={{ color: "#fff" }} onClick={() => { localStorage.removeItem("token"); navigate("/auth"); }}>
                Logout
              </Button>
            ) : (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "#fff" }}>Login / Sign Up</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </NavBar>

      <Section bgcolor={theme.bg1}>
        <FadeInOnScroll delay={100}>
          <Typography
            variant="h1"
            onMouseEnter={() => setDisplayText(quotes[Math.floor(Math.random() * quotes.length)])}
            onMouseLeave={() => setDisplayText("Welcome to Thera")}
            sx={{
              fontWeight: 700,
              fontFamily: "'Playwrite Danmark Loopet', cursive",
              color: theme.accentDark,
              mb: 4,
              mt: -6,
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              fontSize: displayText === "Welcome to Thera" ? { xs: "2.8rem", md: "4.2rem" } : { xs: "1.8rem", md: "2.2rem" },
              cursor: "pointer",
              minHeight: "5rem",
              transition: "color 0.3s ease",
            }}
          >
            {displayText}
          </Typography>
        </FadeInOnScroll>
        <Grid container spacing={3} sx={{ px: { xs: 1, sm: 3 }, justifyContent: "center" }}>
          {cards.map((card, i) => (
            <Grid item xs={12} sm={6} md={3} key={i} display="flex" justifyContent="center">
              <FadeInOnScroll delay={200 + i * 150}>
                <Box
                  onClick={() => navigate(localStorage.getItem("token") ? card.link : "/auth")}
                  sx={{
                    width: "100%",
                    maxWidth: 280,
                    height: 350,
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    boxShadow: "0 6px 20px rgba(0, 15, 82, 0.2)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    cursor: "pointer",
                    position: "relative",
                    '&:hover': {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 30px rgba(0, 15, 82, 0.3)",
                    },
                  }}
                >
                  <Box component="img" src={card.src} alt={card.title} sx={{ width: "100%", height: "140%", objectFit: "cover", transform: "translateY(-80px)" }} />
                  <Box sx={{ position: "absolute", bottom: 0, width: "100%", background: isDarkMode ? theme.mid : "#fff", color: theme.darkest, textAlign: "center", py: 1, fontSize: "1.3rem", fontWeight: 600, fontFamily: "'Dancing Script', cursive" }}>{card.title}</Box>
                  <Box className="overlay" sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.85)", color: "#fff", opacity: 0, transition: "opacity 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", p: 2, '&:hover': { opacity: 1 } }}>
                    <Typography variant="body1" sx={{ fontSize: "1rem", lineHeight: 1.7 }}>{card.desc}</Typography>
                  </Box>
                </Box>
              </FadeInOnScroll>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section bgimage={isDarkMode ? "/images/bg_main3.png" : "/images/bg_main2.png"}>
        <FadeInOnScroll>
          <Typography variant="h3" sx={{ color: "#fff", mb: 2, fontFamily: "'Playwrite Danmark Loopet', cursive" }}>About Thera</Typography>
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" justifyContent="center" gap={4}>
            
            <Typography sx={{ maxWidth: 500, color: "#fff", fontSize: "1.1rem", textAlign: "left" }}>
              Thera is your gentle companion for mental wellness — offering tools to help you breathe, express, track, and talk through your feelings. Our mission is to normalize emotional health and support you in every step of your journey.
            </Typography>
          </Box>
        </FadeInOnScroll>
      </Section>

      <Section bgcolor={theme.mid}>
        <FadeInOnScroll>
          <Typography variant="body1" sx={{ mb: 2, fontSize: "1.5rem", color: "#fff" }}>© 2025 Thera. All rights reserved</Typography>
        </FadeInOnScroll>
        <FadeInOnScroll delay={200}>
          <Typography variant="body2" sx={{ fontSize: "1.1rem", color: theme.light }}>Designed to support your path to wellness</Typography>
        </FadeInOnScroll>
      </Section>
    </PageContainer>
  );
};

export default Thera;
