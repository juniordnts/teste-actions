import {NextApiRequest, NextApiResponse} from "next";
import {debitaConta, encontrarContaComNumero, numeroContaTemQuantidadeCertaNumeros} from "@/pages/api/[operacao]";

type Parametros = {
    numeroConta: number,
    valorDebito: number,
}

export function debitoHandler(req: NextApiRequest,
                              res: NextApiResponse) {

    switch (req.method) {
        case "PUT":

            let {numeroConta, valorDebito} =
                pegarParametrosQuery(req.query, res);

            if (!numeroContaTemQuantidadeCertaNumeros(numeroConta)) {
                res.status(400).json({message: `O número da conta não tem a quantidade correta de dígitos!`});
            }

            const conta = encontrarContaComNumero(numeroConta, res);

            debitaConta(conta, valorDebito, res);

            res.status(200).json({message: conta.saldo});

            break;
        default:
            res.status(501).json({message: "Método não implementado!"});
            break;
    }
}

function pegarParametrosQuery(query: Partial<{ [p: string]: string | string[] }>, res: NextApiResponse): Parametros {
    let {numeroConta, valorDebito} = query;

    if (typeof numeroConta === "string"
        && typeof valorDebito === "string") {
        return {
            numeroConta: parseInt(numeroConta),
            valorDebito: parseFloat(valorDebito),
        };
    }

    res.status(400).json({message: `Tem algo de errado com os parametros!`});

    return {
        numeroConta: 0,
        valorDebito: 0,
    };
}
