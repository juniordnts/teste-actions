import {NextApiRequest, NextApiResponse} from "next";
import {
    creditaConta,
    encontrarContaComNumero,
    numeroContaTemQuantidadeCertaNumeros,
    debitaConta, adicionarPontos
} from "@/pages/api/[operacao]";

type Parametros = {
    numeroContaOrigem: number,
    numeroContaDestino: number,
    valorTransacao: number,
}

export function transferenciaHandler(req: NextApiRequest,
                                     res: NextApiResponse) {

    switch (req.method) {
        case 'PUT':

            let {numeroContaOrigem, numeroContaDestino, valorTransacao}
                = pegarParametrosQuery(req.query, res);

            const contaOrigem = encontrarContaComNumero(numeroContaOrigem, res);
            const contaDestino = encontrarContaComNumero(numeroContaDestino, res);


            // WARNING: pode ser debitado da conta de origem e não ser creditado na de destino, ou vice-versa!
            if (valorTransacao >= 0 && debitaConta(contaOrigem, valorTransacao, res)) {
                creditaConta(contaDestino, valorTransacao, res);
                adicionarPontos(contaDestino, valorTransacao, "transferencia");
            }


            res.status(200).json({message: [contaOrigem, contaDestino]});

            break;
        default:
            res.status(501).json({message: "Método não implementado!"});
            break;
    }
}


function pegarParametrosQuery(query: Partial<{ [p: string]: string | string[] }>, res: NextApiResponse): Parametros {
    let {numeroContaOrigem, numeroContaDestino, valorTransacao} = query;

    if (typeof numeroContaOrigem === "string"
        && typeof numeroContaDestino === "string"
        && typeof valorTransacao === "string") {
        return {
            numeroContaOrigem: parseInt(numeroContaOrigem),
            numeroContaDestino: parseInt(numeroContaDestino),
            valorTransacao: parseFloat(valorTransacao),
        };
    }

    res.status(400).json({message: `Tem algo de errado com os parametros!`});

    return {
        numeroContaOrigem: 0,
        numeroContaDestino: 0,
        valorTransacao: 0,
    };
}