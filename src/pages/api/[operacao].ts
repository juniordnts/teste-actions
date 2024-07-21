import type {NextApiRequest, NextApiResponse} from 'next'
import {ContaBancaria, contaNula} from "@/types";
import {contaHandler} from "@/pages/api/handlers/contaHandler";
import {saldoHandler} from "@/pages/api/handlers/saldoHandler";
import {creditoHandler} from "@/pages/api/handlers/creditoHandler";
import {debitoHandler} from "@/pages/api/handlers/debitoHandler";
import {transferenciaHandler} from "@/pages/api/handlers/transferenciaHandler";
import {jurosHandler} from "@/pages/api/handlers/jurosHandler";

let contasBancarias: ContaBancaria[] = [
  {numero: 1000, saldo: 0, tipoConta: "simples"},
  {numero: 1001, saldo: 10, tipoConta: "bonus", pontuacao: 0},
  {numero: 1002, saldo: 20, tipoConta: "poupanca"},
  {numero: 1003, saldo: 50, tipoConta: "simples"},
  {numero: 1004, saldo: 100, tipoConta: "simples"},
];

export type TipoOperacao = "transferencia" | "debito" | "credito" | "saldo" | "conta" | "juros";

export default function handler(req: NextApiRequest,
                                res: NextApiResponse) {

    const {operacao} = req.query;

    switch (operacao) {
        case "conta":
            contaHandler(req, res, contasBancarias);
            break;
        case "saldo":
            saldoHandler(req, res);
            break;
        case "credito":
            creditoHandler(req, res);
            break;
        case "debito":
            debitoHandler(req, res);
            break;
        case "transferencia":
            transferenciaHandler(req, res);
            break;
        case "juros":
            jurosHandler(req, res);
            break;
        default:
            res.status(501).json({message: "Operação não implementada!"})
    }

}

export function jaExisteContaComNumero(numeroConta: number): boolean {
    return contasBancarias
        .map((contaBancaria: ContaBancaria) => contaBancaria.numero)
        .includes(numeroConta);
}

export function numeroContaTemQuantidadeCertaNumeros(numeroConta: number): boolean {
    return numeroConta > 999 && numeroConta <= 99999999;
}

export function encontrarContaComNumero(numeroConta: number, res: NextApiResponse): ContaBancaria {

    if (!numeroContaTemQuantidadeCertaNumeros(numeroConta)) {
        res.status(400).json({message: `O número de conta: ${numeroConta} não tem a quantidade correta de dígitos!`});
        return contaNula;
    }

    const contaBancaria = contasBancarias.find(contaBancaria => contaBancaria.numero === numeroConta);

    if (!contaBancaria) {
        res.status(404).json({message: `Conta com número: ${numeroConta} não encontrada!`});
        return contaNula;
    }

    return contaBancaria;
}

export function creditaConta(contaBancaria: ContaBancaria, valorCredito: number, res: NextApiResponse): boolean {
    if (valorCredito < 0) {
        res.status(400).json({message: `O valor do débito é menor do que 0!`});
        return false
    }

    contaBancaria.saldo = ajustarPrecisao(contaBancaria.saldo + valorCredito);

    return true;
}

export function debitaConta(contaBancaria: ContaBancaria, valorDebito: number, res: NextApiResponse): boolean {
    if (valorDebito < 0) {
        res.status(400).json({message: `O valor do débito é menor do que 0!`});
        return false;
    }

    if (contaBancaria.tipoConta === "simples" || contaBancaria.tipoConta === "bonus") {
      if ((contaBancaria.saldo - valorDebito) < -1000) {
          res.status(400).json({message: `A conta: ${contaBancaria.numero} não pode ter menos que -1000 de saldo!`});
          return false;
      }
    } else {
      if (contaBancaria.saldo < valorDebito) {
          res.status(400).json({message: `A conta: ${contaBancaria.numero} não tem saldo o suficiente!`});
          return false;
      }
    }

    contaBancaria.saldo = ajustarPrecisao(contaBancaria.saldo - valorDebito);

    return true;
}

export function adicionarConta(contaBancaria: ContaBancaria) {
    contasBancarias = [...contasBancarias, contaBancaria]
}

export function adicionarPontos(contaBancaria: any, valor: number, tipoOperacao: TipoOperacao) {
    const pegarPontos = (divisor: number) => Math.floor(valor / divisor);

    if (contaBancaria.tipoConta === "bonus") {
        switch (tipoOperacao) {
            case "transferencia" :
                contaBancaria.pontuacao += pegarPontos(200);
                break;
            case "credito":
                contaBancaria.pontuacao += pegarPontos(100);
                break;
            default:
                break;
        }
    }
}

export function renderJuros(contaBancaria: ContaBancaria, taxaPercentual: number) {
    const valorJuros = () => contaBancaria.saldo * (taxaPercentual / 100)

    if (contaBancaria.tipoConta === "poupanca") {
       contaBancaria.saldo = ajustarPrecisao(contaBancaria.saldo + valorJuros());
    }
}

export function renderJurosTodasContas(taxaPercentual: number, res: NextApiResponse) {
    if (taxaPercentual < 0) {
        res.status(400).json({message: `Taxa percentual: ${taxaPercentual} é negativa!`});
    } else {
        for (let contaBancaria of contasBancarias) {
            renderJuros(contaBancaria, taxaPercentual);
        }
    }
}

// Ver https://stackoverflow.com/questions/9993266/javascript-multiply-not-precise
function ajustarPrecisao(valor: number, precisao: number = 2) {
    const potencia = Math.pow(10, precisao || 0);

    return Math.round(valor * potencia) / potencia;
}
