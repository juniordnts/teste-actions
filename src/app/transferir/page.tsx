"use client";

import React from "react";

import { Box, InputAdornment, TextField } from "@mui/material";
import {
  AttachMoneyRounded,
  CurrencyExchangeRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";

import CustomSelectAccount from "@/components/CustomSelectAccount";
import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";

import { ContaBancaria } from "@/types";

export default function Transferir() {
  const [todasContas, setTodasContas] = React.useState<ContaBancaria[]>([]);

  const [inputNumeroOrigem, setInputNumeroOrigem] = React.useState<null | string>(null);
  const [inputNumeroDestino, setInputNumeroDestino] = React.useState<null | string>(null);
  const [inputValor, setValor] = React.useState("");

  const getContas = async () => {
    const response = await fetch("/api/conta");
    const data = await response.json();
    setTodasContas(data.message);
  };

  const tranferir = async () => {
    const response = await fetch(
      "/api/transferencia?" +
        new URLSearchParams([
          ["numeroContaOrigem", String(inputNumeroOrigem)],
          ["numeroContaDestino", String(inputNumeroDestino)],
          ["valorTransacao", String(inputValor)],
        ]),
      {
        method: "PUT",
      }
    );

    const data = await response.json();
    console.log(response, data);

    if (response.ok) {
      alert("Valor Tranferido");
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
          label="Conta de Origem"
          options={todasContas.map((item) => String(item.numero))}
          value={inputNumeroOrigem}
          onChange={(val) => setInputNumeroOrigem(val)}
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

        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          my={5}
        >
          <KeyboardArrowDownRounded
            sx={{ position: "absolute" }}
            className="scrolldown-p2"
            fontSize={"large"}
          />
          <KeyboardArrowDownRounded
            sx={{ position: "absolute" }}
            className="scrolldown-p1"
            fontSize={"large"}
          />
        </Box>

        <CustomSelectAccount
          label="Conta de Destino"
          options={todasContas.map((item) => String(item.numero))}
          value={inputNumeroDestino}
          onChange={(val) => setInputNumeroDestino(val)}
        />
      </Box>

      <CustomButton
        onClick={() => tranferir()}
        selected
        icon={<CurrencyExchangeRounded />}
        text={"Tranferir"}
      />
    </CustomContentBox>
  );
}
