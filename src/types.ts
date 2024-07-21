export const contaNula : ContaSimples = {tipoConta: "", numero: 0, saldo: 0}
export type TipoConta = "simples" | "bonus" | "poupanca" | "";

export type ContaBancaria = ContaSimples | ContaBonus

export type ContaSimples = {
    tipoConta: TipoConta,
    numero: number,
    saldo: number,
}

export type ContaBonus = ContaSimples & {pontuacao?: number}

export type ContaPoupanca = ContaSimples
