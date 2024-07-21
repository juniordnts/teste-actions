"use client";

import React from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import { AccountBalanceWalletRounded, AttachMoneyRounded, PaidRounded } from "@mui/icons-material";

import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";
import CustomSelectAccount from "@/components/CustomSelectAccount";
import { ContaBancaria } from "@/types";

export default function Creditar() {
  const [todasContas, setTodasContas] = React.useState<ContaBancaria[]>([]);

  const [inputNumero, setInputNumero] = React.useState<null | string>(null);
  const [inputValor, setValor] = React.useState("");

  const getContas = async () => {
    const response = await fetch("/api/conta");
    const data = await response.json();
    setTodasContas(data.message);
  };

  const addCredito = async () => {
    const response = await fetch(
      "/api/credito?" +
        new URLSearchParams([
          ["numeroConta", String(inputNumero)],
          ["valorCredito", String(inputValor)],
        ]),
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log(response, data);

    if (response.ok) {
      alert("Valor Creditado");
    } else {
      alert((data as any).message);
    }
  };

  React.useEffect(() => {
    getContas();
  }, []);

  return (
    <CustomContentBox>
      <Box>
        <CustomSelectAccount
          options={todasContas.map((item) => String(item.numero))}
          value={inputNumero}
          onChange={(val) => setInputNumero(val)}
        />
        <TextField
          sx={{ mt: 2 }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            sx: { borderRadius: "10px", height: "80px" },
            notched: true,
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoneyRounded />
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
        text={"Creditar"}
      />
    </CustomContentBox>
  );
}
