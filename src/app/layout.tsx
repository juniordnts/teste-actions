import MainMenu from "@/components/MainMenu/page";
import { Box } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BTJ - Banco Tales Jackson",
  description: "Projeto GCM",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <body
        className={inter.className}
        style={{
          backgroundColor: "#202020",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
              {
                "-webkit-appearance": "none",
                margin: 0,
              },
          }}
        >
          <MainMenu>{children}</MainMenu>
        </Box>
      </body>
    </html>
  );
}
