import {NextApiRequest, NextApiResponse} from "next";
import {encontrarContaComNumero, numeroContaTemQuantidadeCertaNumeros} from "@/pages/api/[operacao]";


export function saldoHandler(req: NextApiRequest,
                             res: NextApiResponse) {

    if (req.method === 'GET') {

        let {numeroConta} = req.query;

        if (typeof numeroConta === "string") {
            const numeroContaValor = parseInt(numeroConta);

            if (!numeroContaTemQuantidadeCertaNumeros(numeroContaValor)) {
                res.status(400).json({message: `O número da conta não tem a quantidade correta de dígitos!`});
            }

            const contaRequisitada = encontrarContaComNumero(numeroContaValor, res);

            res.status(200).json({message: contaRequisitada.saldo});
        }
    } else {
        res.status(501).json({message: "Método não implementado!"});
    }
}
