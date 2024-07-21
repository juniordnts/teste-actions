import {NextApiRequest, NextApiResponse} from "next";
import {
    adicionarPontos,
    creditaConta,
    encontrarContaComNumero,
    numeroContaTemQuantidadeCertaNumeros
} from "@/pages/api/[operacao]";

type Parametros = {
    numeroConta: number,
    valorCredito: number,
}

export function creditoHandler(req: NextApiRequest,
                               res: NextApiResponse) {
    switch (req.method) {
        case "PUT":

            let {numeroConta, valorCredito} = pegarParametrosQuery(req.query, res);

            if (!numeroContaTemQuantidadeCertaNumeros(numeroConta)) {
                res.status(400).json({message: `O número da conta não tem a quantidade correta de dígitos!`});
            }

            const conta = encontrarContaComNumero(numeroConta, res);

            if(creditaConta(conta, valorCredito, res)) {
                adicionarPontos(conta, valorCredito, "credito");
            }

            res.status(200).json({message: conta.saldo});

            break;
        default:

            res.status(501).json({message: "Método não implementado!"});
            break;
    }
}

function pegarParametrosQuery(query: Partial<{ [p: string]: string | string[] }>, res: NextApiResponse): Parametros {
    let {numeroConta, valorCredito} = query;

    if (typeof numeroConta === "string"
        && typeof valorCredito === "string") {
        return {
            numeroConta: parseInt(numeroConta),
            valorCredito: parseFloat(valorCredito),
        };
    }

    res.status(400).json({message: `Tem algo de errado com os parametros!`});

    return {
        numeroConta: 0,
        valorCredito: 0,
    };
}
