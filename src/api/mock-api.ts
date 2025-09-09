// src/api/mock-api.ts

import type {
  BorrowerDetailData,
  BorrowerPipelineData,
  BrokerInfoData,
  OnboardingWorkflowData,
} from "./types";

const mockPipelineData: BorrowerPipelineData = {
  new: [
    {
      id: "1",
      name: "Sarah Dunn",
      loanType: "Home Loan",
      amount: 300000,
      status: "Renew",
    },
    {
      id: "3",
      name: "Lisa Carter",
      loanType: "Home Loan",
      amount: 450000,
      status: "New",
    },
  ],
  in_review: [
    {
      id: "2",
      name: "Alan Matthews",
      loanType: "Personal Loan",
      amount: 20000,
      status: "In Review",
    },
  ],
  approved: [],
};

// --- CORRECTED MOCK DATA ---
const mockBorrowerDetails: Record<string, BorrowerDetailData> = {
  "1": {
    id: "1",
    name: "Sarah Dunn",
    email: "sarah.dunn@example.com",
    phone: "(355)123-4557",
    loan_amount: 300000, // Corrected from loan_amount
    status: "In Review",
    employment: "At Tech Company",
    income: 120000,
    existing_loan: 240000, // Corrected from existing_loan
    credit_score: 720, // Corrected from credit_score
    source_of_funds: "Declared", // Corrected from source_of_funds
    risk_signal: "Missing Source of Funds declaration", // Corrected from risk_signal
    ai_flags: [
      // Corrected from ai_flags
      "Income Inconsistent with Bank statements",
      "High Debt-to-Income Ratio detected",
    ],
  },
  "2": {
    id: "2",
    name: "Alan Matthews",
    email: "alan.matthews@example.com",
    phone: "(355) 555-1234",
    loan_amount: 20000, // Corrected from loan_amount
    status: "In Review",
    employment: "Self-Employed",
    income: 45000,
    existing_loan: 0, // Corrected from existing_loan
    credit_score: 780, // Corrected from credit_score
    source_of_funds: "Verified", // Corrected from source_of_funds
    risk_signal: "", // Corrected from risk_signal
    ai_flags: [], // Corrected from ai_flags
  },
  // ADDED MISSING DATA FOR LISA CARTER
  "3": {
    id: "3",
    name: "Lisa Carter",
    email: "lisa.carter@example.com",
    phone: "(355) 987-6543",
    loan_amount: 450000,
    status: "New",
    employment: "Software Engineer",
    income: 150000,
    existing_loan: 0,
    credit_score: 850,
    source_of_funds: "Verified",
    risk_signal: "",
    ai_flags: [],
  },
};

const mockBrokerInfo: BrokerInfoData = {
  name: "Robert Turner",
  deals: 16,
  approval_rate: "75%",
  pending: 7660,
};

const mockOnboardingWorkflow: OnboardingWorkflowData = {
  steps: [
    "Deal Intake",
    "IDV & Credit Check",
    "Document Upload",
    "AI Validation",
    "Credit Committee",
    "Approval & Docs",
    "Funder Syndication",
  ],
};

// --- API Functions (no changes needed here) ---
const apiDelay = 500;

export const getBorrowerPipeline = (): Promise<BorrowerPipelineData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPipelineData);
    }, apiDelay);
  });
};

export const getBorrowerDetail = (id: string): Promise<BorrowerDetailData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const detail = mockBorrowerDetails[id];
      if (detail) {
        resolve(detail);
      } else {
        // This is the line that caused the error
        reject(new Error("Borrower not found"));
      }
    }, apiDelay);
  });
};

export const getBrokerInfo = (): Promise<BrokerInfoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBrokerInfo);
    }, apiDelay);
  });
};

export const getOnboardingWorkflow = (): Promise<OnboardingWorkflowData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOnboardingWorkflow);
    }, apiDelay);
  });
};

// Functions for POST requests (no changes needed here)
export const requestDocuments = (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[MOCK API] Requesting documents for borrower ${id}`);
      resolve({ success: true, message: "Documents requested." });
    }, apiDelay);
  });
};

export const sendToValuer = (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[MOCK API] Sending borrower ${id} to valuer`);
      resolve({ success: true, message: "Valuer notified." });
    }, apiDelay);
  });
};

export const approveLoan = (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[MOCK API] Approving loan for borrower ${id}`);
      resolve({ success: true, message: "Loan approved." });
    }, apiDelay);
  });
};

export const escalateToCreditCommittee = (
  id: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[MOCK API] Escalating borrower ${id} to credit committee`);
      resolve({ success: true, message: "Escalated to Credit Committee." });
    }, apiDelay);
  });
};
