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
  "Sometimes love is not enough and the road gets tough, I don't know why.",
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
  "Do something today that your future self will thank you for.",
  "You’re stronger than you think.",
  "It always seems impossible until it’s done.",
  "You miss 100% of the shots you don’t take.",
  "Don’t be afraid to be amazing.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Good things come to those who hustle.",
  "Strive for progress, not perfection.",
  "Happiness is an inside job.",
  "Success is not the key to happiness. Happiness is the key to success.",
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
  "Don’t quit. Suffer now and live the rest of your life as a champion.",
  "The best way to predict the future is to create it.",
  "Keep going. Keep growing.",
  "Start today, not tomorrow.",
  "A little progress each day adds up to big results.",
  "Success is not for the chosen few, it’s for the ones who choose it.",
  "Fall down seven times, stand up eight.",
  "If you want to fly, give up everything that weighs you down.",
  "You can, you should, and if you’re brave enough to start, you will.",
  "There’s no elevator to success, you have to take the stairs.",
  "Do it for the people who want to see you fail.",
  "You’re a diamond, dear. They can’t break you.",
  "Life is short. Make it sweet.",
  "To be a star, you must shine your own light.",
  "Don’t just exist, live.",
  "You are the artist of your own life. Don’t hand the paintbrush to anyone else.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t wish for it, work for it.",
  "Success is what happens after you have survived all your mistakes.",
  "Laugh as much as you breathe, love as long as you live.",
  "Start where you are. Use what you have. Do what you can.",
  "Your future is created by what you do today, not tomorrow.",
  "The best time for new beginnings is now.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only person you are destined to become is the person you decide to be.",
  "Do one thing every day that scares you.",
  "It’s not about being the best, it’s about being better than you were yesterday.",
  "You can’t go back and change the beginning, but you can start where you are and change the ending.",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  "Don’t count the days, make the days count.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "You don’t have to be great to start, but you have to start to be great.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "You miss 100% of the shots you don’t take.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "Opportunities don’t happen, you create them.",
  "If you can dream it, you can do it.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Every day may not be good, but there’s something good in every day.",
  "Everything you need is already inside you.",
  "Wake up with determination. Go to bed with satisfaction.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do what you can with all you have, wherever you are.",
  "If you want to achieve greatness, stop asking for permission.",
  "Great things never come from comfort zones.",
  "Dream big. Pray bigger.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "Strive for progress, not perfection.",
  "Be yourself; everyone else is already taken.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "The journey of a thousand miles begins with one step.",
  "Everything you can imagine is real.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "Don’t be afraid to give up the good to go for the great.",
  "No matter how hard life gets, never give up on yourself.",
  "When one door closes, another opens.",
  "No one is you, and that is your power.",
  "Life is a journey, not a destination.",
  "Do what you love and you’ll never work another day in your life.",
  "The harder you work, the luckier you get.",
  "Be the change that you wish to see in the world.",
  "Life is not about finding yourself. It’s about creating yourself.",
  "Whatever you are, be a good one.",
  "Believe in yourself and all that you are.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Great things are not done by impulse, but by a series of small things brought together.",
  "The best revenge is massive success.",
  "Be yourself; everyone else is already taken.",
  "If you want to lift yourself up, lift up someone else.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Act as if what you do makes a difference. It does.",
  "Do what you can, with what you have, where you are.",
  "If you're going through hell, keep going.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends.",
  "Success is not measured by what you accomplish, but by the obstacles you overcome.",
  "The secret of getting ahead is getting started.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The only way to do great work is to love what you do.",
  "You don’t have to be great to start, but you have to start to be great.",
  "If you can’t explain it simply, you don’t understand it well enough.",
  "Do what you love, and you'll never work another day in your life.",
  "Push yourself, because no one else is going to do it for you.",
  "Don’t let yesterday take up too much of today.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "To live a creative life, we must lose our fear of being wrong.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "I find that the harder I work, the more luck I seem to have.",
  "It’s hard to beat a person who never gives up.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Everything you can imagine is real.",
  "In the end, it's not the years in your life that count. It's the life in your years.",
  "You can never cross the ocean until you have the courage to lose sight of the shore.",
  "Good things come to those who hustle.",
  "The only way to do great work is to love what you do.",
  "Life is not about waiting for the storm to pass, it's about learning to dance in the rain.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Our lives begin to end the day we become silent about things that matter.",
  "Start where you are. Use what you have. Do what you can.",
  "Don’t wait for opportunity. Create it.",
  "To be great is to be misunderstood.",
  "Don’t judge each day by the harvest you reap but by the seeds that you plant.",
  "The secret to getting ahead is getting started.",
  "Success is not in what you have, but who you are.",
  "You can’t go back and change the beginning, but you can start where you are and change the ending.",
  "You are enough.",
  "You are not the opinion of someone who doesn't know you.",
  "I'll show you every version of myself tonight.",
  "No matter what happens in life, be good to people. Being good to people is a wonderful legacy to leave behind.",
  "We’re all broken, but we’re all beautiful too.",
  "It's time to go, but I’ll be alright. I’ll be alright.",
  "If you never leave, you'll never know how far you can go.",
  "The best people in life are free.",
  "You can’t spell 'awesome' without 'me.'"
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
