import { useEffect, useState } from "react";
import {
    getBorrowerPipeline,
    getBorrowerDetail,
} from "@/api/mock-api";
import type { BorrowerDetailData, BorrowerPipelineData } from "@/api/types";
import Layout from "@/components/Layout";
import BorrowerPipeline from "@/components/BorrowerPipeline";
import BorrowerDetails from "@/components/BorrowerDetails";
import BrokerOverview from "@/components/BrokerOverview";


function Dashboard() {
    // Use the correct types from your centralized types file
    const [pipeline, setPipeline] = useState<BorrowerPipelineData | null>(null);
    const [activeBorrower, setActiveBorrower] = useState<BorrowerDetailData | null>(null);

    const [loading, setLoading] = useState(true);

    // Use the mock API function to fetch pipeline data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pipelineData = await getBorrowerPipeline();
                setPipeline(pipelineData);
                // Set the first borrower from the 'new' pipeline as active by default
                if (pipelineData.new.length > 0) {
                    const firstBorrowerId = pipelineData.new[0].id;
                    const detailData = await getBorrowerDetail(firstBorrowerId);
                    setActiveBorrower(detailData);
                }
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Use the mock API function to fetch borrower details
    const handleBorrowerClick = async (id: string) => {
        try {
            const detailData = await getBorrowerDetail(id);
            setActiveBorrower(detailData);
        } catch (error) {
            console.error("Failed to fetch borrower detail:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading application data...</p>
            </div>
        );
    }

    return (
        <Layout>
            {/* Left: Pipeline */}
            <BorrowerPipeline pipeline={pipeline} onSelect={handleBorrowerClick} />

            {/* Middle: Borrower Detail */}
            <BorrowerDetails borrower={activeBorrower} />

            {/* Right: Broker Info */}
            <BrokerOverview />
        </Layout>
    );
}

export default Dashboard;