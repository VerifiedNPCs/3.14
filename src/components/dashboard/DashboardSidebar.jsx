// src/components/dashboard/DashboardSidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = ({ 
  activeView, 
  setActiveView, 
  userId, 
  userData, 
  subscription 
}) => {
  const navigate = useNavigate();

  const handleNavigation = (view) => {
    setActiveView(view);
    navigate(`/dashboard?user_id=${userId}`);
  };

  // --- Dynamic Data Logic ---
  
  // Get plan name for badge
  const planName = subscription?.plan 
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) 
    : "Free";

  // Get status color
  const getStatusColor = () => {
    if (!subscription || subscription.status !== 'active') return "text-gray-500 bg-gray-500/10";
    switch(subscription.plan) {
      case 'pro': return "text-blue-500 bg-blue-500/10";
      case 'business+': return "text-purple-500 bg-purple-500/10";
      case 'enterprise+': return "text-orange-500 bg-orange-500/10";
      default: return "text-emerald-500 bg-emerald-500/10";
    }
  };

  // Profile Avatar Fallback
  const getInitials = (name) => {
    if (!name) return "U";
    return name.slice(0, 2).toUpperCase();
  };

  // Generate deterministic color
  const stringToColor = (str) => {
    if (!str) return '#111122';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const displayName = userData?.username || `User ${userId}`;
  const avatarBg = stringToColor(displayName);

  return (
    // FIX: Removed 'h-full' to allow sidebar to stretch with page content (like old code)
    <aside className="hidden lg:flex w-[280px] flex-col border-r border-solid border-r-[#e5e5f0] dark:border-r-[#232348] bg-white dark:bg-[#111122] p-4">
      
      {/* FIX: Removed 'h-full' from inner div as well */}
      <div className="flex flex-col gap-4">
        
        {/* Account/Profile Section */}
        <div className="flex gap-3 items-center p-3 rounded-xl bg-[#f8f9fa] dark:bg-[#1a1a35] border border-transparent dark:border-[#232348]">
          <div 
            className="rounded-full size-12 flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0"
            style={{
              backgroundColor: avatarBg,
              backgroundImage: userData?.photo_url ? `url(${userData.photo_url})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!userData?.photo_url && getInitials(displayName)}
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <h1 className="text-[#111122] dark:text-white text-sm font-bold leading-tight truncate" title={displayName}>
              {displayName}
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getStatusColor()}`}>
                {planName} Account
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1 mt-4">
          <button
            onClick={() => handleNavigation("dashboard")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all w-full text-left ${
              activeView === "dashboard"
                ? "bg-primary/10 dark:bg-[#232348] text-primary dark:text-white font-bold shadow-sm shadow-primary/5"
                : "text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white font-medium"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <p className="text-sm">Dashboard</p>
          </button>

          <button
            onClick={() => handleNavigation("payment-history")}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all w-full text-left ${
              activeView === "payment-history"
                ? "bg-primary/10 dark:bg-[#232348] text-primary dark:text-white font-bold shadow-sm shadow-primary/5"
                : "text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white font-medium"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            <p className="text-sm">Payment History</p>
          </button>
        </div>

        {/* Support at Bottom (Uses mt-auto to push down) */}
        <div className="mt-auto pt-4 border-t border-[#e5e5f0] dark:border-[#232348]">
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#6b6b99] dark:text-[#9292c9] hover:bg-[#f0f2f5] dark:hover:bg-[#232348] hover:text-[#111122] dark:hover:text-white transition-all cursor-pointer font-medium"
            href="https://t.me/meowpibot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[22px]">support_agent</span>
            <p className="text-sm">Support</p>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
