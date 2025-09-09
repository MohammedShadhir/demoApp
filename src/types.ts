export type Borrower = {
  id: string;
  name: string;
  loanType: string;
  amount: number;
  status: "New" | "In Review" | "Approved" | "Renew";
  email?: string;
  phone?: string;
  employment?: string;
  existingLoan?: string;
  creditScore?: number;
  sourceOfFunds?: string;
};
