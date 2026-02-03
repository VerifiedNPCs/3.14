// src/components/DashboardContent.jsx
import React from 'react';

const DashboardContent = ({ userId }) => {
  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-10 py-6 pb-20">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-8">
        
        {/* Page Header */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap justify-between gap-4 items-end">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#111122] dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
                Manage Subscription
              </h1>
              <p className="text-[#6b6b99] dark:text-[#9292c9] text-base font-normal leading-normal">
                Manage your plan tiers and billing details for manual renewal.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-bold border border-green-500/20">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Active Plan</span>
            </div>
          </div>
        </div>

        {/* Current Subscription Card */}
        <div className="rounded-xl border border-[#e5e5f0] dark:border-[#232348] bg-white dark:bg-[#15152a] overflow-hidden shadow-sm">
          {/* Card Header */}
          <div className="border-b border-[#e5e5f0] dark:border-[#323267] px-6 py-4 flex justify-between items-center bg-[#fafafa] dark:bg-[#1a1a35]">
            <h2 className="text-[#111122] dark:text-white text-lg font-bold">Current Subscription</h2>
            <button className="text-primary text-sm font-bold hover:underline">View Invoice History</button>
          </div>

          {/* Subscription Details Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Current Plan</p>
              <p className="text-[#111122] dark:text-white text-lg font-bold flex items-center gap-2">
                Business+
                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded font-bold">Monthly</span>
              </p>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <p className="text-[#111122] dark:text-white text-lg font-bold">Active</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Expiry Date</p>
              <p className="text-[#111122] dark:text-white text-lg font-bold">Nov 15, 2023</p>
            </div>
            
            <div className="flex flex-col gap-1">
              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Payment Source</p>
              <div className="flex items-center gap-2 text-[#111122] dark:text-white">
                <span className="material-symbols-outlined text-[20px] text-[#6b6b99] dark:text-[#9292c9]">account_balance_wallet</span>
                <p className="text-sm font-medium">Wallet 0x8a...42f</p>
              </div>
            </div>
          </div>

          {/* Expiry Timer Section */}
          <div className="px-6 py-5 border-t border-[#e5e5f0] dark:border-[#323267] bg-[#fafafa] dark:bg-[#1a1a35]/50 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary dark:text-white dark:bg-[#232348]">
                <span className="material-symbols-outlined">timer</span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#111122] dark:text-white font-bold text-sm">Subscription Expires In</p>
                <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm">Please renew manually before expiry.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8">
              <div className="font-mono text-xl md:text-2xl font-bold text-[#111122] dark:text-white tracking-tight tabular-nums">
                08<span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1 mr-2 md:mr-3">Days</span>:
                14<span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1 mr-2 md:mr-3">Hours</span>:
                32<span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1">Mins</span>
              </div>
              <a 
                href="https://t.me/drelegrambot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all"
              >
                Renew Now
              </a>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[#111122] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">Available Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Standard Plan */}
            <div className="flex flex-col p-6 rounded-xl border border-[#e5e5f0] dark:border-[#323267] bg-white dark:bg-[#15152a] hover:border-emerald-500 transition-colors duration-200 relative">
              <div className="flex flex-col gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                  <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111122] dark:text-white">Standard</h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm mt-1">Essential tools for individual traders</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">check</span>
                  Basic limited alerts
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">check</span>
                  5 Saved crypto charts
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">check</span>
                  Image capturing
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-emerald-500 text-[20px]">check</span>
                  1 Week trial
                </li>
              </ul>
              
              <a 
                href="https://t.me/drelegrambot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg border border-[#e5e5f0] dark:border-[#323267] text-[#111122] dark:text-white font-bold text-sm hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-colors text-center"
              >
                Start Free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col p-6 rounded-xl border border-[#e5e5f0] dark:border-[#323267] bg-white dark:bg-[#15152a] hover:border-blue-500 transition-colors duration-200 relative">
              <div className="flex flex-col gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <span className="material-symbols-outlined text-[28px]">star</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111122] dark:text-white">Pro</h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm mt-1">Advanced features for dedicated traders</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">check</span>
                  Unlimited alerts
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">check</span>
                  Image capturing
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">check</span>
                  20 Saved charts
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">check</span>
                  2 saved Order tracking
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-blue-500 text-[20px]">check</span>
                  Telegram integration
                </li>
              </ul>
              
              <a 
                href="https://t.me/drelegrambot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-500/60 hover:text-white transition-colors text-center"
              >
                Start Pro
              </a>
            </div>

            {/* Business+ Plan (Current) */}
            <div className="flex flex-col p-6 rounded-xl border-2 border-purple-500 bg-white dark:bg-[#15152a] relative shadow-lg shadow-purple-500/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Current Plan
              </div>
              
              <div className="flex flex-col gap-4 mb-6 pt-2">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                  <span className="material-symbols-outlined text-[28px]">diamond</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111122] dark:text-white">Business+</h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm mt-1">Power your VIP group with custom signals</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check</span>
                  Unlimited alerts, images, charts
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check</span>
                  5 saved Order tracking
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check</span>
                  Custom Trading signals
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-purple-500 text-[20px]">check</span>
                  Custom features
                </li>
              </ul>
              
              <button className="w-full py-2.5 px-4 rounded-lg bg-[#e5e5f0] dark:bg-[#232348] text-[#6b6b99] dark:text-[#9292c9] font-bold text-sm cursor-default">
                Current Plan
              </button>
            </div>

            {/* Enterprise+ Plan */}
            <div className="flex flex-col p-6 rounded-xl border border-[#e5e5f0] dark:border-[#323267] bg-white dark:bg-[#15152a] hover:border-orange-500 transition-colors duration-200">
              <div className="flex flex-col gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <span className="material-symbols-outlined text-[28px]">apartment</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111122] dark:text-white">Enterprise+</h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm mt-1">White-label solutions for institutions</p>
                </div>
              </div>
              
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">check</span>
                  Custom bot
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">check</span>
                  Custom service
                </li>
                <li className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-orange-500 text-[20px]">check</span>
                  Unlimited access
                </li>
              </ul>
              
              <a 
                href="https://t.me/drelegrambot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 font-bold text-sm hover:bg-orange-500/60 hover:text-white transition-colors text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[#111122] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mt-4">Recent Transactions</h2>
          
          <div className="overflow-x-auto rounded-xl border border-[#e5e5f0] dark:border-[#323267]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-[#6b6b99] dark:text-[#9292c9] uppercase bg-[#fafafa] dark:bg-[#1a1a35] border-b border-[#e5e5f0] dark:border-[#323267]">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Tx Hash</th>
                  <th scope="col" className="px-6 py-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#15152a]">
                <tr className="border-b border-[#e5e5f0] dark:border-[#323267] hover:bg-[#fafafa] dark:hover:bg-[#1a1a35]/50">
                  <td className="px-6 py-4 text-[#111122] dark:text-white font-medium">Oct 15, 2023</td>
                  <td className="px-6 py-4 text-[#111122] dark:text-white">Business+ Plan Subscription</td>
                  <td className="px-6 py-4 text-[#111122] dark:text-white">$149.00</td>
                  <td className="px-6 py-4 font-mono text-primary text-xs">0x39...9d21</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#6b6b99] dark:text-[#9292c9] hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-[#e5e5f0] dark:border-[#323267] hover:bg-[#fafafa] dark:hover:bg-[#1a1a35]/50">
                  <td className="px-6 py-4 text-[#111122] dark:text-white font-medium">Sep 15, 2023</td>
                  <td className="px-6 py-4 text-[#111122] dark:text-white">Business+ Plan Subscription</td>
                  <td className="px-6 py-4 text-[#111122] dark:text-white">$149.00</td>
                  <td className="px-6 py-4 font-mono text-primary text-xs">0x1a...4f88</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[#6b6b99] dark:text-[#9292c9] hover:text-primary">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardContent;
