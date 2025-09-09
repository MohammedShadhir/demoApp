import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// 1. Import types from your centralized types file
import type { BrokerInfoData, OnboardingWorkflowData } from "@/api/types";

// 2. Import the mock API functions
import { getBrokerInfo, getOnboardingWorkflow } from "@/api/mock-api";

// This component no longer needs a 'brokerId' prop
export default function BrokerOverview() {
    // Use the correct types from the api/types file
    const [broker, setBroker] = useState<BrokerInfoData | null>(null);
    const [workflow, setWorkflow] = useState<OnboardingWorkflowData | null>(null);
    const [loading, setLoading] = useState(true);

    // Use the mock API functions to fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const brokerData = await getBrokerInfo();
                const workflowData = await getOnboardingWorkflow();
                setBroker(brokerData);
                setWorkflow(workflowData);
            } catch (error) {
                console.error("Failed to fetch broker data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array means it runs only once

    if (loading) {
        return (
            <Card className="shadow-md rounded-2xl h-full flex justify-center items-center">
                <p>Loading...</p>
            </Card>
        );
    }

    return (
        <Card className="shadow-md rounded-2xl h-full flex flex-col">
            <CardHeader>
                <CardTitle>Broker Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {broker && (
                    <>
                        <h3 className="font-semibold">{broker.name}</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-lg font-bold">{broker.deals}</p>
                                <p className="text-xs">Deals</p>
                            </div>
                            <div>
                                {/* Corrected to camelCase: broker.approvalRate */}
                                <p className="text-lg font-bold">{broker.approval_rate}</p>
                                <p className="text-xs">Approval</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold">${broker.pending.toLocaleString()}</p>
                                <p className="text-xs">Pending</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm">Call</Button>
                            <Button size="sm" variant="outline">Email</Button>
                            <Button size="sm" variant="secondary">Chat</Button>
                        </div>
                    </>
                )}

                {workflow && (
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                        {workflow.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                )}

                {/* AI Assistant Toggle */}
                <div className="flex items-center justify-between">
                    <span>E Ardsassist</span>
                    <Switch />
                </div>
            </CardContent>
        </Card>
    );
}