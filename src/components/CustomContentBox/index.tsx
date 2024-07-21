"use client";
import { Box } from "@mui/material";

export default function CustomContentBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        border: "1px solid #FFFFFF30",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "600px",
        minWidth: "400px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: "#FFFFFF10",
        overflow: "auto",
      }}
      p={3}
    >
      {children}
    </Box>
  );
}
