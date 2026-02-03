// src/components/dashboard/DashboardLayout.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import PaymentHistoryContent from "./PaymentHistoryContent";

const DashboardLayout = () => {
  const [searchParams] = useSearchParams();
  const [activeView, setActiveView] = useState("dashboard");
  const userId = searchParams.get("user_id") || "xxxx";

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111122] dark:text-white font-display overflow-x-hidden">
      <div className="relative flex h-full min-h-screen w-full flex-col">
        <DashboardHeader userId={userId} />

        <div className="flex flex-1 h-full">
          <DashboardSidebar
            activeView={activeView}
            setActiveView={setActiveView}
            userId={userId}
          />

          <div className="flex flex-1 flex-col">
            {/* Keep the main background consistent with target */}
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
              {activeView === "dashboard" ? (
                <DashboardContent userId={userId} />
              ) : (
                <PaymentHistoryContent userId={userId} />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
