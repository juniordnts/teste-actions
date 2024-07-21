"use client";

import React from "react";

import { Box, Divider, TextField, Tooltip, Typography } from "@mui/material";

import CustomContentBox from "@/components/CustomContentBox";
import { ContaBonus } from "@/types";
import {
  AccountBalanceWalletRounded,
  GradeRounded,
  SavingsRounded,
  StarRounded,
} from "@mui/icons-material";
import CustomSelectAccount from "@/components/CustomSelectAccount";
import CustomButton from "@/components/CustomButton";

export default function App() {
  const [todasContas, setTodasContas] = React.useState<ContaBonus[]>([]);

  const [inputNumero, setInputNumero] = React.useState<null | string>(null);

  const [contaSelecionada, setContaSelecionada] = React.useState<null | ContaBonus>(null);

  const getContas = async () => {
    const response = await fetch("/api/conta");
    const data = await response.json();
    console.log(data);
    setTodasContas(data.message);
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

        <Box mt={2} />

        <CustomButton
          onClick={() => {
            const selected = todasContas.find(
              (item) => String(item.numero) === String(inputNumero)
            );
            setContaSelecionada(selected ? (selected as any) : null);
          }}
          selected
          icon={<AccountBalanceWalletRounded />}
          text={"Consultar"}
        />

        {contaSelecionada ? (
          <Box mt={5}>
            <Typography mb={2} fontWeight={"bold"} fontSize={22}>
              Informações da Conta:
            </Typography>

            <Typography fontSize={16}>
              Número:
              <Typography fontSize={22} display={"inline"} ml={1} fontWeight={"bold"}>
                {contaSelecionada.numero}
              </Typography>
            </Typography>

            <Typography fontSize={16}>
              Tipo:
              <Typography fontSize={22} display={"inline"} ml={1} fontWeight={"bold"}>
                {contaSelecionada.tipoConta === "bonus"
                  ? "Bônus "
                  : contaSelecionada.tipoConta === "poupanca"
                  ? "Poupança "
                  : "Simples "}

                {contaSelecionada?.tipoConta === "bonus" ? (
                  <Tooltip title="Conta Bônus">
                    <StarRounded fontSize="small" />
                  </Tooltip>
                ) : contaSelecionada?.tipoConta === "poupanca" ? (
                  <Tooltip title="Conta Poupança">
                    <SavingsRounded fontSize="small" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Conta Simples">
                    <AccountBalanceWalletRounded fontSize="small" />
                  </Tooltip>
                )}
              </Typography>
            </Typography>

            <Typography fontSize={16}>
              Saldo:
              <Typography fontSize={22} display={"inline"} ml={1} fontWeight={"bold"}>
                R$ {contaSelecionada.saldo}
              </Typography>
            </Typography>

            {contaSelecionada.tipoConta === "bonus" && (
              <Typography fontSize={16}>
                Pontos:
                <Typography fontSize={22} display={"inline"} ml={1} fontWeight={"bold"}>
                  {contaSelecionada?.pontuacao || "0"}
                </Typography>
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
    </CustomContentBox>
  );
}
