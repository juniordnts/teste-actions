"use client";

import React from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import {
  AccountBalanceWalletRounded,
  AttachMoneyRounded,
  PaidRounded,
  PercentRounded,
} from "@mui/icons-material";

import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";

export default function Render() {
  const [inputValor, setValor] = React.useState("");

  const addCredito = async () => {
    const response = await fetch(
      "/api/juros?" + new URLSearchParams([["taxaPercentual", String(inputValor)]]),
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log(response, data);

    if (response.ok) {
      alert("Juros Creditado");
    } else {
      alert((data as any).message);
    }
  };

  return (
    <CustomContentBox>
      <Box>
        <TextField
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: { borderRadius: "10px", height: "80px" },
            notched: true,
            startAdornment: (
              <InputAdornment position="start">
                <PercentRounded />
              </InputAdornment>
            ),
          }}
          value={inputValor}
          onChange={(event) => setValor(event.target.value)}
          id="outlined-basic"
          label="Valor"
          variant="outlined"
          type="number"
          fullWidth
          autoComplete="off"
        />
      </Box>

      <CustomButton
        color="success"
        onClick={() => {
          addCredito();
        }}
        selected
        icon={<PaidRounded />}
        text={"Render"}
      />
    </CustomContentBox>
  );
}
