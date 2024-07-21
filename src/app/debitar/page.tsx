"use client";

import React from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import { AttachMoneyRounded, RemoveCircleRounded } from "@mui/icons-material";

import CustomSelectAccount from "@/components/CustomSelectAccount";
import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";
import { ContaBancaria } from "@/types";

export default function Debitar() {
  const [todasContas, setTodasContas] = React.useState<ContaBancaria[]>([]);

  const [inputNumero, setInputNumero] = React.useState<null | string>(null);
  const [inputValor, setValor] = React.useState("");

  const getContas = async () => {
    const response = await fetch("/api/conta");
    const data = await response.json();
    setTodasContas(data.message);
  };

  const addDebito = async () => {
    const response = await fetch(
      "/api/debito?" +
        new URLSearchParams([
          ["numeroConta", String(inputNumero)],
          ["valorDebito", String(inputValor)],
        ]),
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log(response, data);

    if (response.ok) {
      alert("Valor Debitado");
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
        color="error"
        onClick={() => addDebito()}
        selected
        icon={<RemoveCircleRounded />}
        text={"Debitar"}
      />
    </CustomContentBox>
  );
}
