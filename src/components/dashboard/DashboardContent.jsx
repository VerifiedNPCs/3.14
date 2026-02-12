// src/components/dashboard/DashboardContent.jsx
import React, { useState, useEffect } from 'react';
import { format, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

const DashboardContent = ({ userId, userData, subscription, transactions, wallet, onRefresh }) => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });
  
  // Get plan configuration from backend or define here
  const PLAN_CONFIG = {
    'standard': {
      name: 'Standard',
      icon: 'rocket_launch',
      color: 'emerald',
      description: 'Essential tools for individual traders',
      features: [
        'Basic limited alerts',
        '5 Saved crypto charts',
        'Image capturing',
        '1 Week trial'
      ],
      price: '$9.99',
      buttonText: 'Start Free',
      buttonClass: 'border border-[#e5e5f0] dark:border-[#323267] text-[#111122] dark:text-white hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
    },
    'pro': {
      name: 'Pro',
      icon: 'star',
      color: 'blue',
      description: 'Advanced features for dedicated traders',
      features: [
        'Unlimited alerts',
        'Image capturing',
        '20 Saved charts',
        '2 saved Order tracking',
        'Telegram integration'
      ],
      price: '$29.99',
      buttonText: 'Start Pro',
      buttonClass: 'bg-blue-500/20 border border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/60 hover:text-white'
    },
    'business+': {
      name: 'Business+',
      icon: 'diamond',
      color: 'purple',
      description: 'Power your VIP group with custom signals',
      features: [
        'Unlimited alerts, images, charts',
        '5 saved Order tracking',
        'Custom Trading signals',
        'Custom features'
      ],
      price: '$79.99',
      buttonText: 'Upgrade',
      buttonClass: 'bg-purple-500/20 border border-purple-500/40 text-purple-600 dark:text-purple-400 hover:bg-purple-500/60 hover:text-white'
    },
    'enterprise+': {
      name: 'Enterprise+',
      icon: 'apartment',
      color: 'orange',
      description: 'White-label solutions for institutions',
      features: [
        'Custom bot',
        'Custom service',
        'Unlimited access'
      ],
      price: 'Custom',
      buttonText: 'Contact Us',
      buttonClass: 'bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 hover:bg-orange-500/60 hover:text-white'
    }
  };

  // Calculate countdown timer
  useEffect(() => {
    if (!subscription || subscription.status !== 'active') return;

    const updateCountdown = () => {
      const now = new Date();
      const endDate = new Date(subscription.end_date);
      
      const days = Math.max(0, differenceInDays(endDate, now));
      const hours = Math.max(0, differenceInHours(endDate, now) % 24);
      const minutes = Math.max(0, differenceInMinutes(endDate, now) % 60);
      
      setCountdown({ days, hours, minutes });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [subscription]);

  // Get current plan config
  const currentPlanConfig = subscription ? PLAN_CONFIG[subscription.plan] : null;

  // Format date helper
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'N/A';
    }
  };

  // Truncate wallet address
  const truncateAddress = (address) => {
    if (!address) return 'Not connected';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get status badge
  const getStatusBadge = () => {
    if (!subscription) {
      return (
        <div className="flex items-center gap-2 bg-gray-500/10 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full text-sm font-bold border border-gray-500/20">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>No Active Plan</span>
        </div>
      );
    }

    if (subscription.status === 'active') {
      const daysLeft = subscription.days_remaining || 0;
      if (daysLeft <= 3) {
        return (
          <div className="flex items-center gap-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm font-bold border border-orange-500/20">
            <span className="material-symbols-outlined text-[18px]">warning</span>
            <span>Expiring Soon</span>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-sm font-bold border border-green-500/20">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Active Plan</span>
        </div>
      );
    }

    if (subscription.status === 'expired') {
      return (
        <div className="flex items-center gap-2 bg-red-500/10 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full text-sm font-bold border border-red-500/20">
          <span className="material-symbols-outlined text-[18px]">error</span>
          <span>Expired</span>
        </div>
      );
    }

    return null;
  };

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
                {subscription ? 'Manage your plan and billing details.' : 'Choose a plan to get started.'}
              </p>
            </div>
            {getStatusBadge()}
          </div>
        </div>

        {/* Current Subscription Card */}
        {subscription ? (
          <div className="rounded-xl border border-[#e5e5f0] dark:border-[#232348] bg-white dark:bg-[#15152a] overflow-hidden shadow-sm">
            {/* Card Header */}
            <div className="border-b border-[#e5e5f0] dark:border-[#323267] px-6 py-4 flex justify-between items-center bg-[#fafafa] dark:bg-[#1a1a35]">
              <h2 className="text-[#111122] dark:text-white text-lg font-bold">Current Subscription</h2>
              <button 
                onClick={() => {/* Navigate to transactions history */}}
                className="text-primary text-sm font-bold hover:underline"
              >
                View Invoice History
              </button>
            </div>

            {/* Subscription Details Grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Current Plan</p>
                <p className="text-[#111122] dark:text-white text-lg font-bold flex items-center gap-2">
                  {currentPlanConfig?.name || subscription.plan}
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded font-bold">Monthly</span>
                </p>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Status</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    subscription.status === 'active' ? 'bg-green-500' :
                    subscription.status === 'expired' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                  <p className="text-[#111122] dark:text-white text-lg font-bold capitalize">
                    {subscription.status}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Expiry Date</p>
                <p className="text-[#111122] dark:text-white text-lg font-bold">
                  {formatDate(subscription.end_date)}
                </p>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider">Payment Source</p>
                <div className="flex items-center gap-2 text-[#111122] dark:text-white">
                  <span className="material-symbols-outlined text-[20px] text-[#6b6b99] dark:text-[#9292c9]">
                    account_balance_wallet
                  </span>
                  <p className="text-sm font-medium font-mono">
                    {wallet ? truncateAddress(wallet.wallet_address) : 'Not connected'}
                  </p>
                </div>
              </div>
            </div>

            {/* Expiry Timer Section */}
            {subscription.status === 'active' && (
              <div className="px-6 py-5 border-t border-[#e5e5f0] dark:border-[#323267] bg-[#fafafa] dark:bg-[#1a1a35]/50 flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    countdown.days <= 3 ? 'bg-orange-500/10 text-orange-500' : 'bg-primary/10 text-primary'
                  } dark:bg-[#232348]`}>
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#111122] dark:text-white font-bold text-sm">Subscription Expires In</p>
                    <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm">
                      {countdown.days <= 3 ? '⚠️ Renew soon to avoid interruption!' : 'Renew manually before expiry.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8">
                  <div className="font-mono text-xl md:text-2xl font-bold text-[#111122] dark:text-white tracking-tight tabular-nums">
                    {countdown.days.toString().padStart(2, '0')}
                    <span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1 mr-2 md:mr-3">Days</span>:
                    {countdown.hours.toString().padStart(2, '0')}
                    <span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1 mr-2 md:mr-3">Hours</span>:
                    {countdown.minutes.toString().padStart(2, '0')}
                    <span className="text-xs md:text-sm font-display font-medium text-[#6b6b99] dark:text-[#9292c9] ml-1">Mins</span>
                  </div>
                  <a 
                    href="https://t.me/meowpibot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${
                      countdown.days <= 3 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-primary hover:bg-primary/90'
                    } text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all`}
                  >
                    Renew Now
                  </a>
                </div>
              </div>
            )}

            {/* Expired Warning */}
            {subscription.status === 'expired' && (
              <div className="px-6 py-5 border-t border-[#e5e5f0] dark:border-[#323267] bg-red-50 dark:bg-red-900/10">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl text-red-500">error</span>
                  <div>
                    <p className="text-red-900 dark:text-red-200 font-bold text-lg">Subscription Expired</p>
                    <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                      Your subscription expired on {formatDate(subscription.end_date)}. Renew to continue using our services.
                    </p>
                  </div>
                  <a 
                    href="https://t.me/meowpibot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all whitespace-nowrap"
                  >
                    Renew Now
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* No Subscription Card */
          <div className="rounded-xl border-2 border-dashed border-[#e5e5f0] dark:border-[#323267] bg-[#fafafa] dark:bg-[#1a1a35]/30 p-8 text-center">
            <span className="material-symbols-outlined text-6xl text-[#6b6b99] dark:text-[#9292c9] mb-4 block">shopping_cart</span>
            <h3 className="text-[#111122] dark:text-white text-xl font-bold mb-2">No Active Subscription</h3>
            <p className="text-[#6b6b99] dark:text-[#9292c9] mb-6">
              Choose a plan below to get started with premium features.
            </p>
            <a 
              href="#plans" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('available-plans')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg transition-all"
            >
              Browse Plans
            </a>
          </div>
        )}

        {/* Available Plans */}
        <div id="available-plans" className="flex flex-col gap-6">
          <h2 className="text-[#111122] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
            Available Plans
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(PLAN_CONFIG).map(([planKey, planInfo]) => {
              const isCurrentPlan = subscription?.plan === planKey;
              const colorClass = planInfo.color;
              
              return (
                <div 
                  key={planKey}
                  className={`flex flex-col p-6 rounded-xl ${
                    isCurrentPlan 
                      ? `border-2 border-${colorClass}-500 shadow-lg shadow-${colorClass}-500/10`
                      : 'border border-[#e5e5f0] dark:border-[#323267] hover:border-' + colorClass + '-500'
                  } bg-white dark:bg-[#15152a] transition-colors duration-200 relative`}
                >
                  {isCurrentPlan && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-${colorClass}-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      Current Plan
                    </div>
                  )}
                  
                  <div className={`flex flex-col gap-4 mb-6 ${isCurrentPlan ? 'pt-2' : ''}`}>
                    <div className={`w-12 h-12 rounded-lg bg-${colorClass}-500/20 flex items-center justify-center text-${colorClass}-500`}>
                      <span className="material-symbols-outlined text-[28px]">{planInfo.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111122] dark:text-white">{planInfo.name}</h3>
                      <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm mt-1">{planInfo.description}</p>
                    </div>
                  </div>
                  
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {planInfo.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-[#111122] dark:text-white">
                        <span className={`material-symbols-outlined text-${colorClass}-500 text-[20px]`}>check</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {isCurrentPlan ? (
                    <button className="w-full py-2.5 px-4 rounded-lg bg-[#e5e5f0] dark:bg-[#232348] text-[#6b6b99] dark:text-[#9292c9] font-bold text-sm cursor-default">
                      Current Plan
                    </button>
                  ) : (
                    <a 
                      href="https://t.me/meowpibot" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-colors text-center ${planInfo.buttonClass}`}
                    >
                      {planInfo.buttonText}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[#111122] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] mt-4">
              Recent Transactions
            </h2>
            {transactions && transactions.length > 0 && (
              <button 
                onClick={onRefresh}
                className="text-primary text-sm font-bold hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                Refresh
              </button>
            )}
          </div>
          
          {!transactions || transactions.length === 0 ? (
            <div className="rounded-xl border border-[#e5e5f0] dark:border-[#323267] bg-[#fafafa] dark:bg-[#1a1a35]/30 p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-[#6b6b99] dark:text-[#9292c9] mb-4 block">receipt_long</span>
              <h3 className="text-[#111122] dark:text-white text-lg font-bold mb-2">No Transactions Yet</h3>
              <p className="text-[#6b6b99] dark:text-[#9292c9]">
                Your transaction history will appear here after your first purchase.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-[#e5e5f0] dark:border-[#323267]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#6b6b99] dark:text-[#9292c9] uppercase bg-[#fafafa] dark:bg-[#1a1a35] border-b border-[#e5e5f0] dark:border-[#323267]">
                  <tr>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Amount</th>
                    <th scope="col" className="px-6 py-3">Tx Hash</th>
                    <th scope="col" className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#15152a]">
                  {transactions.map((tx, idx) => (
                    <tr 
                      key={tx.transaction_id || idx}
                      className="border-b border-[#e5e5f0] dark:border-[#323267] hover:bg-[#fafafa] dark:hover:bg-[#1a1a35]/50"
                    >
                      <td className="px-6 py-4 text-[#111122] dark:text-white font-medium">
                        {formatDate(tx.created_at)}
                      </td>
                      <td className="px-6 py-4 text-[#111122] dark:text-white">
                        {PLAN_CONFIG[tx.plan]?.name || tx.plan} Plan Subscription
                      </td>
                      <td className="px-6 py-4 text-[#111122] dark:text-white font-semibold">
                        ${tx.amount.toFixed(2)}
                        {tx.crypto_amount && tx.crypto_currency && (
                          <span className="text-xs text-[#6b6b99] dark:text-[#9292c9] block">
                            {tx.crypto_amount} {tx.crypto_currency}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {tx.tx_hash ? (
                          <a 
                            href={`https://etherscan.io/tx/${tx.tx_hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-primary text-xs hover:underline"
                          >
                            {tx.tx_hash.slice(0, 6)}...{tx.tx_hash.slice(-4)}
                          </a>
                        ) : (
                          <span className="text-[#6b6b99] dark:text-[#9292c9] text-xs">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          tx.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          tx.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default DashboardContent;
