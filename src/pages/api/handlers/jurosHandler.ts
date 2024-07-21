import {NextApiRequest, NextApiResponse} from "next";
import {renderJurosTodasContas} from "@/pages/api/[operacao]";

type Parametros = {
    taxaPercentual: number,
}

export function jurosHandler(req: NextApiRequest,
                             res: NextApiResponse) {

    switch (req.method) {
        case 'PUT':

            let {taxaPercentual} = pegarParametrosQuery(req.query, res);

            renderJurosTodasContas(taxaPercentual, res);

            res.status(200).json({message: `Juros rendido com sucesso!`});

            break;
        default:
            res.status(501).json({message: "Método não implementado!"});
            break;
    }
}


function pegarParametrosQuery(query: Partial<{ [p: string]: string | string[] }>, res: NextApiResponse): Parametros {
    let {taxaPercentual} = query;

    if (typeof taxaPercentual === "string") {
        return {
            taxaPercentual: parseFloat(taxaPercentual),
        };
    }

    res.status(400).json({message: `Tem algo de errado com os parametros!`});

    return {
        taxaPercentual: 0,
    };
}