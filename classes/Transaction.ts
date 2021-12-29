class Transaction {
  constructor(
    public amount: number,
    public payer: string | null,
    public payee: string
  ) {}

  toString() {
    return JSON.stringify(this);
  }
}

export default Transaction;
