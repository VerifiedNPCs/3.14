// src/components/dashboard/DashboardSidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({ activeView, setActiveView, userId }) => {
  const navigate = useNavigate();

  const handleNavigation = (view) => {
    setActiveView(view);
    navigate(`/dashboard?user_id=${userId}`);
  };

  return (
    <aside className="hidden lg:flex w-[280px] flex-col border-r border-solid border-r-[#e5e5f0] dark:border-r-[#232348] bg-white dark:bg-[#111122] p-4">
      <div className="flex flex-col gap-4">
        {/* Account/Profile Section */}
        <div className="flex gap-3 items-center p-2 rounded-xl bg-background-light dark:bg-[#1a1a35]">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12" 
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrczJma80q6itmQfCUZ9P3a5tIYFkcT-ITN5DF7ye7e8nE433yV9yCGCP5aE0VVlfxVhd_H1MvybYGCyB9PuvZxMAHMuOCrU3dw3P07gkpp_1YMBqQlZ4V3ALg-ZmO-25G-MbmsPsLliA1FIImp5U1-9NoYdxwquxZBWh5UjxTlFpjL8n-ftUWF72wrBtcIjeavPsiEVmdz1QGv1S3WU1i2drsT_USTP5cR1YGo8q7jgxvDbCON1ebd3OXL-K_m7e11Gna4h-rrXyj")'
            }}
          ></div>
          <div className="flex flex-col overflow-hidden">
            <h1 className="text-[#111122] dark:text-white text-base font-bold leading-normal truncate">
              Alex Trader
            </h1>
            <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-normal leading-normal">
              Premium User
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1 mt-4">
          <a
            onClick={() => handleNavigation("dashboard")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              activeView === "dashboard"
                ? "bg-primary/10 dark:bg-[#232348] text-primary dark:text-white"
                : "text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[24px] fill-current">
              dashboard
            </span>
            <p className="text-sm font-medium leading-normal">Dashboard</p>
          </a>

          <a
            onClick={() => handleNavigation("payment-history")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
              activeView === "payment-history"
                ? "bg-primary/10 dark:bg-[#232348] text-primary dark:text-white"
                : "text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              receipt_long
            </span>
            <p className="text-sm font-medium leading-normal">Payment History</p>
          </a>
        </div>

        {/* Support at Bottom */}
        <div className="mt-auto pt-6 border-t border-[#e5e5f0] dark:border-[#232348]">
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white transition-all cursor-pointer"
            href="https://t.me/drele_gram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[24px]">support_agent</span>
            <p className="text-sm font-medium leading-normal">Support</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
