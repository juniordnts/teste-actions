"use client";

import React from "react";

import { Box, Typography } from "@mui/material";
import { AccountBalanceWalletRounded, GradeRounded } from "@mui/icons-material";

import CustomSelectAccount from "@/components/CustomSelectAccount";
import CustomContentBox from "@/components/CustomContentBox";
import CustomButton from "@/components/CustomButton";
import { ContaBonus } from "@/types";

export default function Saldo() {
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
      </Box>

      {contaSelecionada ? (
        <Box>
          <Typography textAlign={"right"}>
            Saldo da Conta{" "}
            {contaSelecionada.tipoConta === "bonus"
              ? "Bônus "
              : contaSelecionada.tipoConta === "poupanca"
              ? "Poupança "
              : "Simples "}
            ({contaSelecionada.numero})
          </Typography>
          <Typography
            fontSize={40}
            textAlign={"right"}
            color={contaSelecionada.saldo < 0 ? "error" : undefined}
          >
            R$ {contaSelecionada.saldo}
          </Typography>

          {contaSelecionada.tipoConta === "bonus" && (
            <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
              <GradeRounded fontSize="small" sx={{ mb: "2px", mr: "5px" }} />
              <Typography textAlign={"right"}>
                {contaSelecionada?.pontuacao
                  ? `${contaSelecionada?.pontuacao} Pontos`
                  : "Nenhum ponto acumulado"}
              </Typography>
            </Box>
          )}
        </Box>
      ) : null}
    </CustomContentBox>
  );
}
