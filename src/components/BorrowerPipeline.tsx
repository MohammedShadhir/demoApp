// src/components/BorrowerPipeline.tsx

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { Borrower } from '@/types';
import type { BorrowerPipelineData } from '@/api/types';


interface BorrowerCardProps {
    borrower: Borrower;
    isActive: boolean;
    onClick: () => void;
}

// A dedicated component for each borrower card for clarity and reusability
const BorrowerCard: React.FC<BorrowerCardProps> = ({ borrower, isActive, onClick }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // Helper function to get status badge style
    const getStatusVariant = (status: Borrower['status']) => {
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

    return (
        <div
            onClick={onClick}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors
        ${isActive ? 'bg-blue-100 dark:bg-blue-900 border border-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
        >
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{borrower.name}</h3>
                <p className="text-sm text-gray-500 truncate">{borrower.loanType}</p>
            </div>
            <div className="flex-shrink-0 text-right ml-4">
                <p className="font-semibold">{formatter.format(borrower.amount)}</p>
                <Badge variant={getStatusVariant(borrower.status)} className="mt-1 text-xs">
                    {borrower.status}
                </Badge>
            </div>
        </div>
    );
};

// Main BorrowerPipeline component
export default function BorrowerPipeline({
    pipeline,
    onSelect,
}: {
    pipeline: BorrowerPipelineData | null;
    onSelect: (id: string) => void;
}) {
    const [activeTab, setActiveTab] = useState<'new' | 'in_review' | 'approved'>('new');
    const [activeBorrowerId, setActiveBorrowerId] = useState<string | null>(null);

    // Function to handle borrower selection and update state
    const handleSelect = (id: string) => {
        setActiveBorrowerId(id);
        onSelect(id);
    };

    return (
        <Card className="shadow-md rounded-2xl h-full flex flex-col">
            <CardHeader>
                <CardTitle>Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'new' | 'in_review' | 'approved')}>
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="new">New</TabsTrigger>
                        <TabsTrigger value="in_review">In Review</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                    </TabsList>

                    {pipeline && ["new", "in_review", "approved"].map(status => (
                        <TabsContent key={status} value={status}>
                            <div className="space-y-2 p-4">
                                {pipeline[status as keyof BorrowerPipelineData].length > 0 ? (
                                    pipeline[status as keyof BorrowerPipelineData].map(b => (
                                        <BorrowerCard
                                            key={b.id}
                                            borrower={b}
                                            isActive={b.id === activeBorrowerId}
                                            onClick={() => handleSelect(b.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center text-gray-500 py-8">
                                        No borrowers in this pipeline.
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}