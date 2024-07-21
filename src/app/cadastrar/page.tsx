"use client";

import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AttachMoneyRounded, PersonAddRounded } from "@mui/icons-material";

import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";
import React from "react";

import { TipoConta } from "@/types";

export default function Cadastrar() {
  const [number, setNumber] = React.useState("");

  const [type, setType] = React.useState<TipoConta>("simples");
  const [inputValor, setValor] = React.useState("");

  const addContas = async () => {
    console.log("object", number);
    const response = await fetch(
      "/api/conta?" +
        new URLSearchParams([
          ["numeroConta", number],
          ["tipoConta", type],
          ["saldoInicial", inputValor],
        ]),
      {
        method: "POST",
      }
    );

    const data = await response.json();
    console.log(data);
    alert("Conta Cadastrada");
    window.location.replace("/");
  };

  React.useEffect(() => {}, []);

  return (
    <CustomContentBox>
      <Box>
        <FormControl fullWidth>
          <InputLabel>Tipo da Conta</InputLabel>
          <Select
            sx={{ borderRadius: "10px", height: "80px" }}
            value={type}
            label="Tipo da Conta"
            onChange={(value) => setType(value.target.value as any)}
          >
            <MenuItem sx={{ height: "80px" }} value={"simples"}>
              Conta Padrão
            </MenuItem>
            <MenuItem sx={{ height: "80px" }} value={"bonus"}>
              Conta Bônus
            </MenuItem>
            <MenuItem sx={{ height: "80px" }} value={"poupanca"}>
              Conta Poupança
            </MenuItem>
          </Select>
        </FormControl>

        <Box mb={2} />

        <TextField
          InputLabelProps={{ shrink: true }}
          InputProps={{ sx: { borderRadius: "10px", height: "80px" }, notched: true }}
          id="outlined-basic"
          label="Número da Conta"
          variant="outlined"
          type="number"
          fullWidth
          autoComplete="off"
          value={number}
          onChange={(event) => setNumber(event.currentTarget.value)}
        />

        {type === "poupanca" && (
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
            label="Saldo Inicial"
            variant="outlined"
            type="number"
            fullWidth
            autoComplete="off"
          />
        )}
      </Box>
      <Box>
        <CustomButton onClick={addContas} selected icon={<PersonAddRounded />} text={"Cadastrar"} />
      </Box>
    </CustomContentBox>
  );
}
