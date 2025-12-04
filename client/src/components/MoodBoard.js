import React, { useState, useEffect } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";

const moods = [
  { label: "Happy :)", color: "#FFEB1B" },
  { label: "Sad :(", color: "#64B5F6" },
  { label: "Angry >:(", color: "#EF5350" },
  { label: "Calm ^_^", color: "#AED581" },
  { label: "Anxious :S", color: "#F8BBD0" },
  { label: "Tired -_-", color: "#BDBDBD" },
  { label: "Exciting :D", color: "#FFA726" },
  { label: "Depressed T_T", color: "#212121" },
  { label: "Fearful D:", color: "#9575CD" },
  { label: "Stressed >_<", color: "#C62828" },
  { label: "Bored :|", color: "#A58F7C" },
  { label: "Blahhh ...", color: "#8B0000" },
  { label: "BEST DAY <3", color: "#D4AF37" },
  { label: "Whoops forgot o_O", color: "#ffffff", textColor: "#000000" }
];

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysInMonth = (monthIndex) => new Date(2025, monthIndex + 1, 0).getDate();
const isFutureDate = (monthIndex, day) =>
  new Date(2025, monthIndex, day) > new Date();

const MoodLegendContainer = styled(Box)({
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  marginTop: "160px",
  width: "210px",
});

const MoodLegend = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "12px",
});

const LegendItem = styled(Box)(({ color }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "Arial",
  cursor: "pointer",
}));

export default function MoodBoard() {
  const [moodGrid, setMoodGrid] = useState(
    Array.from({ length: 12 }, (_, i) => Array(daysInMonth(i)).fill(null))
  );
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    
    fetch(`${process.env.REACT_APP_API_URL}/api/moods/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        const updatedGrid = Array.from({ length: 12 }, (_, month) =>
          Array(daysInMonth(month)).fill(null)
        );

        data.forEach(item => {
          const { month, day, mood } = item;
          if (!isNaN(month) && !isNaN(day)) {
            updatedGrid[month][day - 1] = mood;
          }
        });

        setMoodGrid(updatedGrid);
      })
      .catch(err => console.error("Failed to fetch moods:", err));
  }, [token]);

  const handleCellClick = (monthIndex, dayIndex) => {
    if (isFutureDate(monthIndex, dayIndex + 1)) return;
    setSelectedDate({ monthIndex, dayIndex });
    setOpenColorPicker(true);
  };

  const handleSaveColor = async (mood) => {
  if (!selectedDate || !mood) return;

  const { monthIndex, dayIndex } = selectedDate;
  const newGrid = [...moodGrid];
  newGrid[monthIndex][dayIndex] = mood;
  setMoodGrid(newGrid);
  setOpenColorPicker(false);

  console.log("📌 Sending to backend:");
  console.log("URL:", `${process.env.REACT_APP_API_URL}/api/moods/add`);
  console.log("Token:", localStorage.getItem("token"));
  console.log("Payload:", {
    month: monthIndex,
    day: dayIndex + 1,
    mood,
  });

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/moods/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        month: monthIndex,
        day: dayIndex + 1,
        mood,
      }),
    });

    const data = await res.json();
    console.log("📌 Backend response:", data);

  } catch (error) {
    console.error("🔥 SAVE ERROR:", error);
  }
};


  return (
    <Box
      sx={{
        backgroundImage: "url('/images/moodboard.png')",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingTop: 8,
        paddingX: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",

            gap: "40px",   // 👈 ADD THIS

      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 2, pl: 30 }}>
          <img
            src="/images/moodboardtitle.png"
            alt="Mood Tracker"
            style={{ width: "100%", maxWidth: "600px" }}
          />
        </Box>

        <Box
          sx={{
            border: "3px solid white",
            borderRadius: "16px",
            padding: 2,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          <Box display="grid" gridTemplateColumns="150px repeat(31, 30px)">
            <Box />
            {[...Array(31)].map((_, i) => (
              <Box key={i} sx={{ textAlign: "center", fontWeight: "bold" }}>
                {i + 1}
              </Box>
            ))}

            {months.map((month, monthIdx) => (
              <React.Fragment key={month}>
                <Box sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                  border: "1px solid #ccc",
                  height: "30px",
                  pl: 1,
                  backgroundColor: "#f9f9f9",
                }}>
                  {month}
                </Box>

                {Array.from({ length: 31 }).map((_, dayIdx) => {
                  const isFuture = isFutureDate(monthIdx, dayIdx + 1);
                  const isInvalid = dayIdx + 1 > daysInMonth(monthIdx);
                  const mood = moodGrid[monthIdx][dayIdx];

                  return (
                    <Box
                      key={dayIdx}
                      onClick={() =>
                        !isFuture &&
                        !isInvalid &&
                        handleCellClick(monthIdx, dayIdx)
                      }
                      sx={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid #ccc",
                        cursor: !isFuture && !isInvalid ? "pointer" : "not-allowed",
                        backgroundColor:
                          isInvalid
                            ? "#e3ebf2"
                            : mood?.color || (isFuture ? "#e3ebf2" : "transparent"),
                      }}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>

      <MoodLegendContainer>
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
          Mood Legend
        </Typography>
        <MoodLegend>
          {moods.map((mood) => (
            <LegendItem key={mood.label}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: mood.color,
                  border: "1px solid #000",
                }}
              />
              <Typography sx={{ color: mood.textColor || "#000" }}>
                {mood.label}
              </Typography>
            </LegendItem>
          ))}
        </MoodLegend>
      </MoodLegendContainer>

      <Modal open={openColorPicker} onClose={() => setOpenColorPicker(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Your Mood On
            {" "}{selectedDate?.dayIndex + 1}
            {getOrdinalSuffix(selectedDate?.dayIndex + 1)}
            {" "}{months[selectedDate?.monthIndex]}
          </Typography>

          <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {moods.map((mood) => (
              <Box
                key={mood.label}
                onClick={() => handleSaveColor(mood)}
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: mood.color,
                  border: "1px solid #000",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
