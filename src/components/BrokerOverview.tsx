import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import type { BrokerInfoData, OnboardingWorkflowData } from "@/api/types";
import { getBrokerInfo, getOnboardingWorkflow } from "@/api/mock-api";

export default function BrokerOverview() {
    const [broker, setBroker] = useState<BrokerInfoData | null>(null);
    const [workflow, setWorkflow] = useState<OnboardingWorkflowData | null>(null);
    const [loading, setLoading] = useState(true);

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
    }, []);

    if (loading) {
        return (
            <Card className="shadow-md rounded-2xl h-full flex justify-center items-center bg-white dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </Card>
        );
    }

    return (
        <Card className="shadow-md rounded-2xl h-full flex flex-col bg-white dark:bg-gray-900">
            <CardHeader className="border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-gray-800 dark:text-gray-100">Broker Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {broker && (
                    <>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{broker.name}</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{broker.deals}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Deals</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{broker.approval_rate}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Approval</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">${broker.pending.toLocaleString()}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
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
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-800 dark:text-gray-100">
                        {workflow.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                )}

                {/* AI Assistant Toggle */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-100">AI Assistant</span>
                    <Switch />
                </div>
            </CardContent>
        </Card>
    );
}