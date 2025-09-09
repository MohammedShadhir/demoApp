// Shared type for a basic borrower entry
export interface Borrower {
  id: string;
  name: string;
  loanType: string;
  amount: number;
  status: "New" | "In Review" | "Approved" | "Renew";
}

// Types for the Borrower Pipeline
export interface BorrowerPipelineData {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}

// Types for Borrower Detail
export interface BorrowerDetailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: "New" | "In Review" | "Approved" | "Renew";
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
}

// Types for Broker Info
export interface BrokerInfoData {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

// Types for Onboarding Workflow
export interface OnboardingWorkflowData {
  steps: string[];
}
