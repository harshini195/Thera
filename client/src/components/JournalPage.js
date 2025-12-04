import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  TextField,
  Modal,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const themeColors = [
  { name: "Ocean Daydream", value: "#ccdeed" },
  { name: "Peachy Breeze", value: "#ffd6cc" },
  { name: "Lavender Haze", value: "#e6ccff" },
  { name: "Mint Whisper", value: "#ccffe5" },
  { name: "Sunbeam Lemonade", value: "#fff6cc" },
  { name: "Blush Petals", value: "#ffd1dc" },
  { name: "Mossy Morning", value: "#d4f8e8" },
  { name: "Strawberry Cream", value: "#ffb3ba" },
  { name: "Cloudy Skies", value: "#d6f0ff" },
  { name: "Classic Vanilla", value: "#ffffff" },
  { name: "Midnight Scribbles", value: "#000000" },
];

const CornerImage = styled("img")({
  position: "fixed",
  width: "240px",
  zIndex: 10,
});
const TopLeftImage = styled(CornerImage)({ top: 0, left: 0 });
const BottomRightImage = styled(CornerImage)({ bottom: 0, right: 0 });

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return (
    <Box sx={{ position: "fixed", top: 20, right: 30, fontSize: "1.5rem", zIndex: 10, textAlign: "right", fontFamily: "'Quotes Caps', cursive", color: "#333" }}>
      <div>{now.toLocaleDateString(undefined, options)}</div>
      <div>{now.toLocaleTimeString()}</div>
    </Box>
  );
};
const getLocalKey = (token) => `journal_entries_${token}`;

// Save entry with title and color
const saveToLocal = (token, date, entry, title, color) => {
  const key = getLocalKey(token);
  const allEntries = JSON.parse(localStorage.getItem(key) || "{}");
  allEntries[date] = { entry, title, color };
  localStorage.setItem(key, JSON.stringify(allEntries));
};

// Load all entries (now objects with entry, title, color)
const loadAllFromLocal = (token) => {
  const key = getLocalKey(token);
  return JSON.parse(localStorage.getItem(key) || "{}");
};

// Load a single entry object
const loadEntryFromLocal = (token, date) => {
  const entries = loadAllFromLocal(token);
  return entries[date] || { entry: "", title: "", color: "#ccdeed" };
};

const token = localStorage.getItem("token"); // Must be stored on login
console.log("User token:", token);

const JournalPage = () => {
  const [bgColor, setBgColor] = useState("#ccdeed");
  const [showWelcome, setShowWelcome] = useState(true);
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState(""); // NEW: title state
  const [modalOpen, setModalOpen] = useState(false);
  const [savedEntries, setSavedEntries] = useState([]);
  const [entryMap, setEntryMap] = useState({}); // NEW: for title/color lookup

  const today = new Date();
  const dateKey = today.toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(dateKey);

  const isDarkMode = bgColor === "#000000";

  // Fetch all entries and store their metadata
  const fetchAllEntries = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/journal`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setSavedEntries(data);
    } catch (err) {
      console.error(err);
    }
  };


  // Fetch entry for a date, including title and color
  const fetchEntryForDate = async (date) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/journal/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setEntry(data.entry || "");
      setTitle(data.title || "");
      setBgColor(data.color || "#ccdeed");

    } catch (err) {
      console.error(err);
    }
  };


  // Save entry with title and color
  const saveEntryToBackend = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/journal/${selectedDate}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ entry, title, color: bgColor })
      });

      const data = await res.json();
      alert(data.message);
      fetchAllEntries();

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    fetchEntryForDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    fetchAllEntries();
  }, []);

  const handleEntrySelect = (key) => {
    setSelectedDate(key);
    setModalOpen(false);
  };

  const dateString = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <TopLeftImage src="/images/border_up.png" alt="Top Left" />
      <BottomRightImage src="/images/border_down.png" alt="Bottom Right" />
      <Clock />

      {showWelcome ? (
        <Box sx={{ minHeight: "100vh", backgroundColor: bgColor, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Dancing Script', cursive", fontSize: "3rem", fontWeight: "bold", textAlign: "center", padding: "1rem", color: isDarkMode ? "white" : "black" }}>
          Welcome to Journal, today is {dateString}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              minHeight: "100vh",
              backgroundColor: bgColor,
              transition: "background-color 1s ease-in-out",
              padding: "3rem",
              position: "relative",
              fontFamily: "'Dancing Script', cursive",
              color: isDarkMode ? "white" : "black",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2, fontFamily: "'Westonia', cursive", fontSize: "3rem" }}>
                My Safe Space Journal
              </Typography>
              <Select
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                displayEmpty
                sx={{ borderRadius: 2, background: "white", boxShadow: 1 }}
              >
                <MenuItem value="" disabled>
                  Choose your mood
                </MenuItem>
                {themeColors.map((color) => (
                  <MenuItem key={color.value} value={color.value}>
                    {color.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            {/* Simpler, smaller, more classy title input */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontSize: "1.2rem",
                  color: isDarkMode ? "white" : "#333",
                  background: isDarkMode ? "#181818" : "#fafafa",
                  border: "none",
                  borderBottom: `2px solid ${isDarkMode ? "#fff" : "#bdbdbd"}`,
                  outline: "none",
                  padding: "0.3rem 0.5rem",
                  width: "220px",
                  textAlign: "center",
                  borderRadius: 0,
                  boxShadow: "none",
                  transition: "border-color 0.2s",
                  marginBottom: "0.5rem",
                  letterSpacing: "0.03em"
                }}
                maxLength={40}
              />
            </Box>

            <Box sx={{ background: isDarkMode ? "#111" : "rgba(255, 255, 255, 0.7)", borderRadius: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", padding: "2rem", maxWidth: "800px", margin: "0 auto", fontSize: "1.3rem", lineHeight: "2rem", color: isDarkMode ? "white" : "black" }}>
              <TextField
                multiline
                rows={14}
                placeholder="Start journaling here..."
                variant="outlined"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                fullWidth
                InputProps={{ style: { fontFamily: "'Dancing Script', cursive", fontSize: "1.8rem", color: isDarkMode ? "white" : "black" } }}
              />
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Box
                  component="button"
                  onClick={saveEntryToBackend}
                  sx={{ px: 4, py: 1.5, fontSize: "1.2rem", background: "#fce4ec", borderRadius: "12px", border: "none", fontFamily: "'Dancing Script', cursive", cursor: "pointer", boxShadow: "0 6px 12px rgba(0,0,0,0.1)", "&:hover": { background: "#f8bbd0" } }}
                >
                  💾 Save Journal
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              position: "fixed",
              top: "38%",
              left: 120,
              zIndex: 5,
              cursor: "pointer",
              opacity: showWelcome ? 0 : 1,
              transition: "opacity 1s ease",
            }}
            onClick={() => setModalOpen(true)}
          >
            <Box
              sx={{
                position: "relative",
                width: 140,
              }}
            >
              <img
                src="/images/box1.png"
                alt="Previous Entries"
                style={{ width: "100%" }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  top: "22%",
                  left: "8%",
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.5rem",
                  color: isDarkMode ? "white" : "black",
                  textAlign: "center",
                  width: "84%",
                }}
              >
                Previous <br /> Entries
              </Typography>
            </Box>
          </Box>

          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              borderRadius: "12px",
              boxShadow: 24,
              p: 2,
              width: "260px", // smaller width
              maxHeight: "50vh", // smaller height
              overflowY: "auto"
            }}>
              <Typography variant="h6" sx={{ mb: 1, fontFamily: "'Inter', 'Roboto', sans-serif", textAlign: "center" }}>
                Journal History
              </Typography>
              <List>
                {savedEntries.map((item) => (
                  <ListItem key={item._id} disablePadding>
                    <ListItemButton onClick={() => handleEntrySelect(item.date)}>
                      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        {/* Color circle */}
                        <Box
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: item.color || "#ccdeed",
                            border: "1px solid #ccc",
                            mr: 1,
                          }}
                        />
                        {/* Title + Date */}
                        <ListItemText
                          primary={
                            <span>
                              <b style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
                                {item.title || "(No Title)"}
                              </b>
                              <br />
                              <span style={{ fontSize: "0.95em", color: "#888" }}>
                                {item.date}
                              </span>
                            </span>
                          }
                        />
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))}

              </List>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default JournalPage;
