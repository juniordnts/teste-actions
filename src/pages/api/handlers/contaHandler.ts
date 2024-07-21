import {NextApiRequest, NextApiResponse} from "next";
import {adicionarConta, jaExisteContaComNumero, numeroContaTemQuantidadeCertaNumeros} from "@/pages/api/[operacao]";
import {ContaBancaria, contaNula} from "@/types";

export function contaHandler(req: NextApiRequest, res: NextApiResponse, contasBancarias: ContaBancaria[]) {
    if (req.method === 'POST') {
        let {numeroConta, tipoConta, saldoInicial} = req.query;

        console.log("NC", numeroConta, "TC", tipoConta, "SI", saldoInicial)

        if (typeof numeroConta === "string" 
            && typeof tipoConta === "string" 
            && typeof saldoInicial === "string") {
            const numeroContaValor = parseFloat(numeroConta);
            const saldoInicialValor = parseFloat(saldoInicial);

            if (jaExisteContaComNumero(numeroContaValor)) {
                res.status(409).json({message: `Já existe uma conta com o número ${numeroContaValor}!`})
            } else if (!numeroContaTemQuantidadeCertaNumeros(numeroContaValor)) {
                res.status(400).json({message: `O número da conta não tem a quantidade correta de dígitos!`})
            } else {
                let novaConta: ContaBancaria = contaNula;

                switch (tipoConta) {
                    case "bonus":
                        novaConta = {tipoConta: "bonus", numero: numeroContaValor, saldo: 0, pontuacao: 10};
                        break;
                    case "poupanca":
                        if (!saldoInicial) {
                          res.status(400).json({message: `Indique um saldo inicial para a conta poupança!`})
                          break;
                        }
                        else if (saldoInicialValor < 0) {
                          res.status(400).json({message: `Indique um saldo inicial positivo para a conta!`})
                          break;
                        }
                        novaConta = {tipoConta: "poupanca", numero: numeroContaValor, saldo: saldoInicialValor};
                        break;
                    case "simples":
                        if (!saldoInicial) {
                          res.status(400).json({message: `Indique um saldo inicial para a conta poupança!`})
                          break;
                        }
                        else if (saldoInicialValor < 0) {
                          res.status(400).json({message: `Indique um saldo inicial positivo para a conta!`})
                          break;
                        }

                        novaConta = {tipoConta: "simples", numero: numeroContaValor, saldo: 0};
                        break;
                    default:
                        res.status(400).json({message: `O tipo de conta: ${tipoConta} não existe!`})
                        break;
                }

                if (novaConta != contaNula) {
                  adicionarConta(novaConta);
                }

                res.status(201).json({message: novaConta})
            }

        }
    } else if (req.method === 'GET') {
        res.status(200).json({message: contasBancarias})
    } else {
        res.status(501).json({message: "Método não implementado!"})
    }

}
