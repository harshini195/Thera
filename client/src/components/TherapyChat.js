import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

const ChatContainer = styled(Box)({
  minHeight: "100vh",
  backgroundImage: "url('/images/talk.png')",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ChatBox = styled(Box)({
  width: "90%",
  maxWidth: "450px",
  minHeight: "520px",
  backgroundColor: "#fff8f1dd",
  borderRadius: "20px",
  padding: "1.2rem",
  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  border: "3px solid #000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px);}
  to { opacity: 1; transform: translateY(0);}
`;

const Message = styled(Box)(({ fromUser }) => ({
  backgroundColor: fromUser ? "#0a4772" : "#9abbd6",
  color: "#fff",
  padding: "0.85rem 1rem",
  borderRadius: "20px",
  maxWidth: "80%",
  alignSelf: fromUser ? "flex-end" : "flex-start",
  marginBottom: "0.8rem",
  animation: `${fadeIn} 0.3s ease-in-out`,
  fontSize: "1.05rem",
  lineHeight: "1.45",
}));

const Avatar = styled("img")({
  width: 28,
  height: 28,
  borderRadius: "50%",
  marginRight: "8px",
});

const suggestions = [
  "I'm anxious",
  "I'm stressed",
  "I'm lonely",
  "I'm happy!",
  "I'm sad",
];

// ✨ Multiple possible responses per feeling
const botReplies = {
  anxious: [
    "Try a deep breath 💛 Inhale… exhale… You're doing amazing.",
    "Anxiety can be loud, but you're louder 💪",
    "Let’s ground ourselves 🧘 — What are 3 things you can see right now?"
  ],
  stressed: [
    "You’ve handled so much already 💙 It’s okay to pause.",
    "Let’s take it one tiny step at a time 🧩",
    "Try relaxing your shoulders — it helps more than you expect!"
  ],
  lonely: [
    "You’re not alone — I’m right here with you 🤝",
    "Sometimes loneliness just means your heart needs company 💛",
    "Maybe try texting someone you care about? They’d love to hear from you 💬"
  ],
  happy: [
    "Yay!! That makes me smile too 🥰",
    "I love hearing that 🌟 keep that energy alive!",
    "Celebrate even the tiny wins ✨ They matter!"
  ],
  sad: [
    "It’s okay to feel sad 💙 Emotions are valid.",
    "Cry if you need to — tears are strength in liquid form 💧",
    "I'm right here with you… Want to talk about it?"
  ],
  default: [
    "Thank you for sharing 💛 I'm listening.",
    "I care about what you're feeling 💕",
    "That sounds important — tell me more?"
  ],
};

const getRandomReply = (arr) => arr[Math.floor(Math.random() * arr.length)];

const interpretMessage = (msg) => {
  const text = msg.toLowerCase();
  if (text.includes("anxious")) return getRandomReply(botReplies.anxious);
  if (text.includes("stress")) return getRandomReply(botReplies.stressed);
  if (text.includes("lonely")) return getRandomReply(botReplies.lonely);
  if (text.includes("happy")) return getRandomReply(botReplies.happy);
  if (text.includes("sad")) return getRandomReply(botReplies.sad);
  return getRandomReply(botReplies.default);
};

const TherapyChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm here for you 💛 How are you feeling today?", fromUser: false },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = (text) => {
    setMessages((prev) => [...prev, { text, fromUser: true }]);
    setIsBotTyping(true);

    setTimeout(() => {
      const reply = interpretMessage(text);
      setMessages((prev) => [...prev, { text: reply, fromUser: false }]);
      setIsBotTyping(false);
    }, 500); // More realistic typing delay
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  return (
    <ChatContainer>
      <ChatBox>
        <Typography align="center" sx={{ fontFamily: "'Dancing Script', cursive", fontSize: "2rem" }}>
          Therapy Bot 🤖💬
        </Typography>

        <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
          {messages.map((msg, i) => (
            <Box key={i} sx={{ display: "flex" }}>
              {!msg.fromUser && <Avatar src="/images/bot.png" />}
              <Message fromUser={msg.fromUser}>{msg.text}</Message>
            </Box>
          ))}

          {isBotTyping && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src="/images/bot.png" />
              <Message fromUser={false} sx={{ opacity: 0.7 }}>
                Therabot is typing…
              </Message>
            </Box>
          )}

          <div ref={bottomRef}></div>
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {suggestions.map((text, i) => (
            <Button
              key={i}
              onClick={() => sendMessage(text)}
              size="small"
              sx={{
                background: "#ffe4ec",
                textTransform: "none",
                borderRadius: "8px",
                fontSize: "0.9rem",
              }}
            >
              {text}
            </Button>
          ))}
        </Box>
      </ChatBox>
    </ChatContainer>
  );
};

export default TherapyChat;
