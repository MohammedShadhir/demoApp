import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

import {
    requestDocuments,
    sendToValuer,
    approveLoan,
    escalateToCreditCommittee,
} from "@/api/mock-api";
import type { BorrowerDetailData } from "@/api/types";

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

// Helper function to get status badge style
const getStatusVariant = (status: BorrowerDetailData['status']) => {
    switch (status) {
        case 'New':
            return 'secondary';
        case 'In Review':
            return 'default';
        case 'Approved':
            return 'default';
        case 'Renew':
            return 'default';
        default:
            return 'default';
    }
};

export default function BorrowerDetails({
    borrower,
}: {
    borrower: BorrowerDetailData | null;
}) {
    const handleAction = async (action: string) => {
        if (!borrower) return;
        try {
            let response;
            switch (action) {
                case "request-documents":
                    response = await requestDocuments(borrower.id);
                    break;
                case "send-valuer":
                    response = await sendToValuer(borrower.id);
                    break;
                case "approve":
                    response = await approveLoan(borrower.id);
                    break;
                case "escalate":
                    response = await escalateToCreditCommittee(borrower.id);
                    break;
            }
            console.log(`Action '${action}' successful:`, response);
            alert(`Success: ${response?.message}`);
        } catch (error) {
            console.error(`Action '${action}' failed:`, error);
            alert("Action failed. Check console for details.");
        }
    };

    if (!borrower) {
        return (
            <Card className="shadow-md rounded-2xl h-full flex justify-center items-center bg-white dark:bg-gray-900">
                <CardContent className="p-6 text-gray-500 dark:text-gray-400">
                    Select a borrower to view details
                </CardContent>
            </Card>
        );
    }

    // Determine if the escalate button should be enabled
    const isEscalateEnabled = borrower.status === 'New' || borrower.status === 'In Review';

    return (
        <Card className="shadow-md rounded-2xl h-full flex flex-col bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-start justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="flex flex-col space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">{borrower.name}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {borrower.email} | {borrower.phone}
                    </p>
                    <p className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-100">
                        {formatCurrency(borrower.loan_amount)}
                    </p>
                </div>
                <Badge variant={getStatusVariant(borrower.status)}>{borrower.status}</Badge>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto space-y-4 pt-0">
                {/* AI Explainability Section */}
                {borrower.ai_flags.length > 0 && (
                    <Accordion type="single" collapsible>
                        <AccordionItem value="ai">
                            <AccordionTrigger className="font-semibold text-gray-800 dark:text-gray-100">
                                AI Explainability
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2 pt-2">
                                    {borrower.ai_flags.map((flag, i) => (
                                        <div key={i} className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                                            <span>{flag}</span>
                                        </div>
                                    ))}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <Button variant="outline" onClick={() => handleAction("request-documents")}>
                                            Request Documents
                                        </Button>
                                        <Button variant="outline" onClick={() => handleAction("send-valuer")}>
                                            Send to Valuer
                                        </Button>
                                        <Button onClick={() => handleAction("approve")}>Approve</Button>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}

                {/* Loan Summary */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Employment</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{borrower.employment}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Existing Loan</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{formatCurrency(borrower.existing_loan)}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Credit Score</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{borrower.credit_score}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 dark:text-gray-400">Funds</p>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{borrower.source_of_funds}</p>
                    </div>
                </div>

                {/* Risk Signal */}
                {borrower.risk_signal && (
                    <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <span className="text-gray-800 dark:text-gray-100">{borrower.risk_signal}</span>
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={() => handleAction("escalate")}
                    disabled={!isEscalateEnabled}
                >
                    Escalate to Credit Committee
                </Button>
            </CardContent>
        </Card>
    );
}