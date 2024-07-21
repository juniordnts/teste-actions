"use client";
import { Box, ThemeProvider, Typography, createTheme } from "@mui/material";
import Image from "next/image";
import {
  AccountBalanceWalletRounded,
  Brightness1Rounded,
  Brightness2Rounded,
  Brightness3Rounded,
  CurrencyExchangeRounded,
  HomeRounded,
  PaidRounded,
  PersonAddRounded,
  PriceCheckRounded,
  RemoveCircleRounded,
  SavingsRounded,
} from "@mui/icons-material";

import CustomButton from "../CustomButton";
import { usePathname, useRouter } from "next/navigation";

export default function MainMenu({ children }: { children: React.ReactNode }) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const pathname = usePathname();
  const router = useRouter();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxWidth: 900,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: 2,
            padding: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              width: "100%",
              minWidth: "300px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                width: "100%",
                border: "1px solid #ffffff60",
                py: 1.5,
              }}
            >
              <Brightness2Rounded
                sx={{ transform: "rotate(-180deg)", fontSize: 60, marginRight: -2.5 }}
                color="primary"
              />
              <Brightness1Rounded
                sx={{ transform: "rotate(-180deg);", fontSize: 60 }}
                color="primary"
              />
              <Typography sx={{ fontFamily: "sans-serif", fontSize: 60, lineHeight: 1 }}>
                BTJ
              </Typography>
              <Box ml={1}>
                <Typography sx={{ fontFamily: "sans-serif", fontSize: 16, lineHeight: 1 }}>
                  Banco
                </Typography>
                <Typography sx={{ fontFamily: "sans-serif", fontSize: 16, lineHeight: 1 }}>
                  Tales
                </Typography>
                <Typography sx={{ fontFamily: "sans-serif", fontSize: 16, lineHeight: 1 }}>
                  Jackson
                </Typography>
              </Box>
            </Box>

            <CustomButton
              onClick={() => router.replace("/")}
              selected={pathname === "/"}
              icon={<HomeRounded />}
              text={"Início"}
            />

            <CustomButton
              onClick={() => router.replace("/cadastrar")}
              selected={pathname === "/cadastrar"}
              icon={<PersonAddRounded />}
              text={"Cadastrar Conta"}
            />

            <CustomButton
              onClick={() => router.replace("/saldo")}
              selected={pathname === "/saldo"}
              icon={<AccountBalanceWalletRounded />}
              text={"Consulta Saldo"}
            />

            <CustomButton
              onClick={() => router.replace("/creditar")}
              selected={pathname === "/creditar"}
              icon={<PaidRounded />}
              text={"Crédito em Conta"}
            />

            <CustomButton
              onClick={() => router.replace("/debitar")}
              selected={pathname === "/debitar"}
              icon={<RemoveCircleRounded />}
              text={"Débito em Conta"}
            />

            <CustomButton
              onClick={() => router.replace("/transferir")}
              selected={pathname === "/transferir"}
              icon={<CurrencyExchangeRounded />}
              text={"Transferência"}
            />

            <CustomButton
              onClick={() => router.replace("/render")}
              selected={pathname === "/render"}
              icon={<SavingsRounded />}
              text={"Render Juros"}
            />
          </Box>

          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
