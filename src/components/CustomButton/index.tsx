import { ArrowForwardRounded, ArrowRightRounded, PersonAddRounded } from "@mui/icons-material";
import { Box, Button, ButtonBase, Container, Typography } from "@mui/material";
import Image from "next/image";

export default function CustomButton({
  icon,
  text,
  selected,
  onClick,
  color,
}: {
  icon: JSX.Element;
  text: string;
  selected: boolean;
  onClick: () => void;
  color?: "error" | "success";
}) {
  return (
    // <ButtonBase
    //   sx={{
    //     width: "100%",
    //     borderRadius: "10px",
    //     backgroundColor: "blue",
    //     backgroundColor: "#2a2a2b",
    //     height: "80px",
    //     minHeight: "80px",
    //     padding: 2,
    //     color: "white",
    //   }}
    // >
    <Button
      color={color ? color : undefined}
      onClick={onClick}
      variant={selected ? "contained" : "outlined"}
      sx={{ width: "100%", borderRadius: "10px", height: "80px" }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display={"flex"} gap={1} sx={{}}>
          {icon}
          <Typography>{text}</Typography>
        </Box>
        <ArrowForwardRounded />
      </Box>
    </Button>
    // </ButtonBase>
  );
}
