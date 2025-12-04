import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

const lightTheme = {
  bg1: "#E6F0FA",
  bg2: "#D0E2F2",
  dark: "#153B4A",
  darkest: "#0D1B2A",
  accentDark: "#1E3A5F",
  mid: "#547792",
  light: "#A3C7E2",
  coral: "#4682A9",
};

const darkTheme = {
  bg1: "#0D1B2A",
  bg2: "#1B263B",
  dark: "#E6F0FA",
  darkest: "#ffffff",
  accentDark: "#3A506B",
  mid: "#5C7CA2",
  light: "#A3C7E2",
  coral: "#749BC2",
};

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

  // One Direction
  "Don't forget where you belong.", // One Direction
  "You light up my world like nobody else.", // What Makes You Beautiful
  "We danced all night to the best song ever.", // Best Song Ever

  // Harry Styles
  "Just stop your crying, it's a sign of the times.", // Sign of the Times
  "Golden, you're so golden.", // Golden
  "We’ll be alright.", // Keep Driving

  // Gracie Abrams
  "I know it’s hard, but you’re doing just fine.", // Feels Like
  "I miss the person I was before I knew you.", // 21
  "You are not broken, you're just growing.", // fan paraphrase of her themes

  // Lana Del Rey
  "Doing it all for love.", // Love
  "I got a war in my mind, but I’m holding on.", // Ride
  "I will love you till the end of time.", // Blue Jeans
  "You are doing the best you can.",
  "You did not wake up today to be mediocre.",
  "Believe you can and you're halfway there.",
  "Your only limit is you.",
  "Dream big. Work hard. Stay focused.",
  "Life is short, smile while you still have teeth.",
  "Don’t stop until you’re proud.",
  "Stay positive, work hard, make it happen.",
  "When nothing goes right, go left.",
  "Be a voice, not an echo.",
  "The best is yet to come.",
  "Be the reason someone smiles today.",
  "You’re stronger than you think.",
  "It always seems impossible until it’s done.",
  "You miss 100% of the shots you don’t take.",
  "Don’t be afraid to be amazing.",
  "Good things come to those who hustle.",
  "Strive for progress, not perfection.",
  "Happiness is an inside job.",
  "Do it with passion or not at all.",
  "The comeback is always stronger than the setback.",
  "Everything you need is already inside you.",
  "Believe in yourself and all that you are.",
  "The only way to do great work is to love what you do.",
  "Positive mind. Positive vibes. Positive life.",
  "Little by little, day by day.",
  "Don’t wait for opportunity. Create it.",
  "The road to success is always under construction.",
  "Life is tough, but so are you.",
  "You are capable of amazing things.",
  "Great things never come from comfort zones.",
  "Everything you can imagine is real.",
  "Chase your dreams, not people.",
  "You’re braver than you believe, stronger than you seem.",
  "Start where you are. Use what you have.",
  "The best way to predict the future is to create it.",
  "Keep going. Keep growing.",
  "Start today, not tomorrow.",
  "A little progress each day adds up to big results.",
  "Fall down seven times, stand up eight.",
  "Do it for the people who want to see you fail.",
  "You’re a diamond, dear. They can’t break you.",
  "Life is short. Make it sweet.",
  "To be a star, you must shine your own light.",
  "Don’t just exist, live.",
  "Don’t wish for it, work for it.",

  "The best time for new beginnings is now.",
  
  "Do one thing every day that scares you.",
,
  "Don’t count the days, make the days count.",

  "Don’t stop when you’re tired. Stop when you’re done.",
  "You miss 100% of the shots you don’t take.",
  "Opportunities don’t happen, you create them.",
  "If you can dream it, you can do it.",
  
  "Everything you need is already inside you.",
  "Great things never come from comfort zones.",
  "Dream big. Pray bigger.",
  "Strive for progress, not perfection.",
  "Be yourself; everyone else is already taken.",
  "The journey of a thousand miles begins with one step.",
  "Everything you can imagine is real.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Don’t be afraid to give up the good to go for the great.",
  "No matter how hard life gets, never give up on yourself.",
  "When one door closes, another opens.",
  "No one is you, and that is your power.",
  "Life is a journey, not a destination.",
  "The harder you work, the luckier you get.",
  "Be the change that you wish to see in the world.",
  "Whatever you are, be a good one.",
  "Believe in yourself and all that you are.",
  "The best revenge is massive success.",
  "Be yourself; everyone else is already taken.",
  "If you want to lift yourself up, lift up someone else.",
  "Act as if what you do makes a difference. It does.",
  "Do what you can, with what you have, where you are.",
  "If you're going through hell, keep going.",
  "The secret of getting ahead is getting started.",
  "The only way to do great work is to love what you do.",
  "Don’t let yesterday take up too much of today.",
  "It’s hard to beat a person who never gives up.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Everything you can imagine is real.",
  "Good things come to those who hustle.",
  "The only way to do great work is to love what you do.",
  "Start where you are. Use what you have. Do what you can.",
  "Don’t wait for opportunity. Create it.",
  "To be great is to be misunderstood.",
  "The secret to getting ahead is getting started.",
  "Success is not in what you have, but who you are.",
  "You are enough.",
  "You are not the opinion of someone who doesn't know you.",
  "I'll show you every version of myself tonight.",
  "We’re all broken, but we’re all beautiful too.",
  "It's time to go, but I’ll be alright. I’ll be alright.",
  "If you never leave, you'll never know how far you can go.",
  "The best people in life are free.",
  "You can’t spell 'awesome' without 'me.'"
];

const PageContainer = styled(Box)(({ themeMode }) => ({
  fontFamily: "'Poppins', sans-serif",
  overflowY: "auto",
  scrollBehavior: "smooth",
  backgroundColor: themeMode.bg1,
  minHeight: "100vh",
  transition: "background-color 0.3s ease",
}));

const NavBar = styled(AppBar)({
  backgroundColor: "rgba(34, 80, 129, 0.8)", // translucent
  backdropFilter: "blur(8px)", // glass effect
  color: "#fff",
  boxShadow: "0 4px 12px rgba(0.2, 0, 0, 0.2)",
});


const Section = styled(Box)(({ bgcolor, bgimage, short }) => ({
  minHeight: short ? "30vh" : "80vh",  // shorter height when `short` is passed
  backgroundColor: bgcolor,
  backgroundImage: bgimage ? `url(${bgimage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "5rem",
  paddingBottom: "4.5rem",
  textAlign: "center",
  transition: "background-color 1s ease, transform 0.6s ease",
}));


const FadeInOnScroll = ({ children, delay = 0 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
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

const FadeContainer = styled(Box)`
  animation: fadeIn 1.2s ease-in;
  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }
`;

const Thera = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("Welcome to Thera");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setDisplayText(randomQuote);
    }, 100); // slight delay to prevent spammy updates
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setDisplayText("Welcome to Thera");
  };

  // 👇 Move this here
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const firstSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const footerSectionRef = useRef(null); // NEW ref for footer section

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogout = () => {
    localStorage.removeItem("token"); // Or sessionStorage if you're using that
    window.location.href = "/login"; // Or use `navigate("/login")` if using react-router
  };
  useEffect(() => {
  const savedMode = localStorage.getItem("isDarkMode");
  if (savedMode !== null) {
    setIsDarkMode(JSON.parse(savedMode));
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
  }
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' }); // reset form
      } else {
        setFormStatus(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("An error occurred. Please try again.");
    }
  };



  const cards = [
    {
      src: "/images/breathingmain.png",
      title: "Catch a Breath",
      desc: "Try this simple breathing exercise — it’s here to help you feel calmer, more focused, and a little more in control.",
      link: "/thera/breathe",
    },
    {
      src: "/images/journalmain.png",
      title: "Journal",
      desc: "A safe space to untangle your thoughts, track emotional patterns, and reflect on your inner world.",
      link: "/thera/journal",
    },
    {
      src: "/images/therabotmain.png",
      title: "Therapy Talk",
      desc: "Feeling low or overwhelmed? Chat with our friendly THERABOT — it's always here to listen and help.",
      link: "/thera/therapychat",
    },
    {
      src: "/images/moodboardmain.png",
      title: "Mood Tracking",
      desc: "Track how you feel daily and color your days — one pixel at a time.",
      link: "/thera/moodboard",
    },
  ];

  return (
    <PageContainer themeMode={theme}>
      <FadeContainer>
        <NavBar themeMode={theme} elevation={10}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <FadeInOnScroll>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.1rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                }}
              >
                THERA
              </Typography>

            </FadeInOnScroll>
            <Box display="flex" alignItems="center" gap={2}>
              <Box display="flex" alignItems="center" gap={3}>
                <Box display="flex" alignItems="center" gap={1.2}>
                  <LightModeIcon sx={{ color: "#fff", fontSize: 20 }} />
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    size="small"
                    sx={{
                      '& .MuiSwitch-thumb': {
                        backgroundColor: isDarkMode ? "#90caf9" : "#fff",
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: isDarkMode ? "#495057" : "#bbb",
                      },
                    }}
                  />
                  <DarkModeIcon sx={{ color: "#ccc", fontSize: 20 }} />
                </Box>

                {/* 🏷️ Optional Label */}
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: theme.light,
                    fontSize: "0.9rem",
                  }}
                >

                </Typography>
              </Box>



              <FadeInOnScroll>
                <Button onClick={() => aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" })} sx={{ color: theme.light }}>
                  About Us
                </Button>
              </FadeInOnScroll>
              <FadeInOnScroll>
                <Button onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: "smooth" })} sx={{ color: theme.light }}>
                  Contact Us
                </Button>
              </FadeInOnScroll>
              <FadeInOnScroll>
                {localStorage.getItem("token") ? (
                  <Button
                    variant="outlined"
                    onClick={() => setShowLogoutConfirm(true)}
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      '&:hover': {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    Logout
                  </Button>

                ) : (
                  <Button sx={{ color: "#fff" }}>
                    <Link to="/auth" style={{ color: "#fff", textDecoration: "none" }}>
                      Login / Sign Up
                    </Link>
                  </Button>
                )}

              </FadeInOnScroll>
              <Dialog
                open={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                PaperProps={{
                  sx: {
                    borderRadius: 5,
                    px: 4,
                    py: 3,
                    backgroundColor: "hsl(210, 50.00%, 97.60%)",
                    boxShadow: "0 12px 35px rgba(0, 20, 60, 0.25)",
                    fontFamily: "'Poppins', sans-serif",
                    textAlign: "center",
                  },
                }}
              >
                <DialogTitle
                  disableTypography
                  sx={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: theme.accentDark,
                    fontFamily: "'Poppins', sans-serif",
                    mb: 1,
                  }}
                >
                  Sure you want to Log out?
                </DialogTitle>

                <Typography
                  sx={{
                    color: theme.mid,
                    fontSize: "1rem",
                    mb: 3,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                </Typography>

                <DialogActions
                  sx={{
                    justifyContent: "center",
                    gap: 2,
                    mt: -3,
                  }}
                >
                  <Button
                    onClick={() => setShowLogoutConfirm(false)}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: theme.coral,
                      color: theme.coral,
                      fontWeight: 500,
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      px: 3,
                      '&:hover': {
                        backgroundColor: theme.light,
                        borderColor: theme.coral,
                      },
                    }}
                  >
                    Stay
                  </Button>

                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    sx={{
                      borderRadius: 3,
                      backgroundColor: "#e53935",
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      textTransform: "none",
                      px: 3,
                      '&:hover': {
                        backgroundColor: theme.accentDark,
                      },
                    }}
                  >
                    Logout
                  </Button>
                </DialogActions>
              </Dialog>


            </Box>
          </Toolbar>
        </NavBar>


        <Section
          ref={firstSectionRef}
          bgimage={isDarkMode ? "/images/bg_1.png" : "/images/bg_therapg.png"}
          sx={{ minHeight: "90vh" }}  // full screen height
        >

          <FadeInOnScroll delay={100}>
            <Typography


              variant="h1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              sx={{
                fontWeight: 700,
                fontFamily: "'Playwrite Danmark Loopet', cursive",
                color: theme.accentDark,
                mb: 2,
                mt: -8,
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                fontSize:
                  displayText === "Welcome to Thera"
                    ? { xs: "2.8rem", md: "4.2rem" }
                    : { xs: "1.8rem", md: "2.2rem" },
                cursor: "pointer",
                minHeight: "5rem",
                transition: "all 0.3s ease",
              }}
            >
              {displayText}
            </Typography>

          </FadeInOnScroll>
          <Button
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            sx={{ mt: 2, backgroundColor: theme.coral, color: "#fff", px: 4, py: 1.5, borderRadius: "20px" }}
          >
            Explore Features ↓
          </Button>
        </Section>
        <Section
          id="features"
          sx={{
            scrollMarginTop: "60px", // offset height of fixed NavBar or desired space
            backgroundImage: `url(${isDarkMode ? "#0D1B2A" : "images/bg_2.png"})`,
            minHeight: "95vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            py: 6,
          }}
        >

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
                    <Box
                      component="img"
                      src={card.src}
                      alt={card.title}
                      sx={{
                        width: "100%",
                        height: "140%",
                        objectFit: "cover",
                        transform: "translateY(-80px)"
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        background: isDarkMode ? theme.mid : "#fff",
                        color: theme.darkest,
                        textAlign: "center",
                        py: 1,
                        fontSize: "1.3rem",
                        fontWeight: 600,
                        fontFamily: "'Dancing Script', cursive"
                      }}
                    >
                      {card.title}
                    </Box>
                    <Box
                      className="overlay"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(6, 19, 46, 0.85)",
                        color: "#fff",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        p: 2,
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontSize: "1rem", lineHeight: 1.7 }}>
                        {card.desc}
                      </Typography>
                    </Box>
                  </Box>
                </FadeInOnScroll>
              </Grid>
            ))}
          </Grid>
        </Section>


        <Section
          ref={aboutSectionRef}
          bgimage={isDarkMode ? "/images/bg_main3.png" : "/images/bg_main8.png"}
          sx={{
            minHeight: "90vh", // makes it at least full screen
            py: 10, // increase vertical padding
          }}
        >
          <FadeInOnScroll>
            <Typography
              variant="h3"
              sx={{
                color: "#fff",
                mb: 2,
                fontFamily: "'Playwrite Danmark Loopet', cursive",
              }}
            >
              About Thera
            </Typography>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <Typography
              sx={{
                maxWidth: 900,
                color: "#fff",
                fontSize: "1.3rem",
                textAlign: "center",
                lineHeight: 2,
                px: 2,
                mx: "auto", // center it
              }}
            >
              <b>Thera</b> is your gentle companion on the path to emotional well-being.
              Whether you're pausing for a mindful breath, journaling your thoughts, checking in with your mood, or chatting with our TheraBot — you’re never alone.
              <br /><br />
              We believe in embracing every emotion without judgment, honoring your unique journey, and offering simple tools to help you breathe, express, and process at your own pace.
              Here, your mental health is supported with compassion and intention.
            </Typography>
          </FadeInOnScroll>
        </Section>

        <Section
          ref={contactSectionRef}
          bgimage={isDarkMode ? "images/bg_6.png" : "images/bg_4.png"}
          sx={{ minHeight: "90vh" }}
        >
          <FadeInOnScroll>
            <Typography
              variant="h4"
              sx={{
                color: theme.darkest,
                mb: 3,
                fontWeight: 700,
                fontFamily: "'Playwrite Danmark Loopet', cursive",
              }}
            >
              Let’s Connect
            </Typography>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <Box
              sx={{
                backgroundColor: isDarkMode ? theme.accentDark : "#fff",
                p: 4,
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                maxWidth: 550,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  fontSize: "1.1rem",
                  color: isDarkMode ? theme.light : theme.dark,
                  textAlign: "center",
                }}
              >
                We'd love to hear from you! Send us a message and we’ll get back to you soon.
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  width: "100%",
                }}
              >
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: {
                      color: isDarkMode ? "#fff" : "#000",
                      backgroundColor: isDarkMode ? "#1B263B" : "#f9f9f9",
                      borderRadius: 8,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: isDarkMode ? "#ccc" : "#555",
                    },
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: {
                      color: isDarkMode ? "#fff" : "#000",
                      backgroundColor: isDarkMode ? "#1B263B" : "#f9f9f9",
                      borderRadius: 8,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: isDarkMode ? "#ccc" : "#555",
                    },
                  }}
                />

                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    style: {
                      color: isDarkMode ? "#fff" : "#000",
                      backgroundColor: isDarkMode ? "#1B263B" : "#f9f9f9",
                      borderRadius: 8,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: isDarkMode ? "#ccc" : "#555",
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.coral,
                    color: "#fff",
                    py: 1.2,
                    borderRadius: "25px",
                    fontWeight: "bold",
                    '&:hover': {
                      backgroundColor: theme.accentDark,
                    },
                  }}
                >
                  Send Message
                </Button>
                {formStatus && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: formStatus.includes("success") ? "#4CAF50" : "#D32F2F",
                      mt: 1,
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {formStatus}
                  </Typography>
                )}
              </Box>
            </Box>
          </FadeInOnScroll>
        </Section>
        <Section
          ref={footerSectionRef}  // ← CHANGED
          bgimage={isDarkMode ? "images/bg_7.png" : "images/bg_5.png"}
          sx={{ minHeight: "90vh" }}
        >

          <FadeInOnScroll>
            <Typography variant="body1" sx={{ mb: 2, fontSize: "1.5rem", color: "#fff" }}>
              © 2025 Thera. All rights reserved
            </Typography>
          </FadeInOnScroll>
          <FadeInOnScroll delay={200}>
            <Typography variant="body2" sx={{ fontSize: "1.1rem", color: theme.light }}>
              Designed to support your path to wellness
            </Typography>
          </FadeInOnScroll>
        </Section>

      </FadeContainer>
    </PageContainer>
  );
};

export default Thera;
