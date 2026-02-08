// src/components/dashboard/PaymentHistoryContent.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';

const PaymentHistoryContent = ({ userId, transactions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(tx => 
    tx.tx_hash?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.plan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'N/A';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>;
      case 'pending':
        return <span className="material-symbols-outlined text-yellow-500 text-xl">schedule</span>;
      case 'failed':
        return <span className="material-symbols-outlined text-red-500 text-xl">error</span>;
      default:
        return <span className="material-symbols-outlined text-gray-500 text-xl">help</span>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'failed': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex-1 px-4 py-8 lg:px-40 lg:py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8">
        
        {/* Page Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black leading-tight tracking-tight lg:text-4xl text-[#111122] dark:text-white">
            Payment History
          </h1>
          <p className="text-base text-[#6b7280] dark:text-[#9292c9]">
            View and manage your crypto subscription payments and invoices.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#111122] p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <button className="group flex h-9 items-center gap-2 rounded-lg border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#232348] px-4 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9292c9] text-lg">calendar_today</span>
              <span className="text-sm font-medium text-[#111122] dark:text-white">Last 30 Days</span>
              <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9292c9] text-lg">expand_more</span>
            </button>

            <button className="group flex h-9 items-center gap-2 rounded-lg border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#232348] px-4 hover:border-primary transition-colors">
              <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9292c9] text-lg">deployed_code</span>
              <span className="text-sm font-medium text-[#111122] dark:text-white">All Assets</span>
              <span className="material-symbols-outlined text-[#6b7280] dark:text-[#9292c9] text-lg">expand_more</span>
            </button>
          </div>

          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] dark:text-[#9292c9]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by transaction hash..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-10 pr-4 rounded-lg border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#232348] text-sm text-[#111122] dark:text-white placeholder:text-[#6b7280] dark:placeholder:text-[#9292c9] focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Payment Table */}
        <div className="overflow-hidden rounded-xl border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#111122] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f9fafb] dark:bg-[#1a1a2e] border-b border-[#e5e7eb] dark:border-[#232348]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Plan</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Asset</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Transaction Hash</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#6b7280] dark:text-[#9292c9]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e7eb] dark:divide-[#232348]">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-[#6b7280] dark:text-[#9292c9]">
                      <div className="flex flex-col items-center gap-2">
                        <span className="material-symbols-outlined text-4xl opacity-50">receipt_long</span>
                        <p>No transactions found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx, index) => (
                    <tr key={index} className="hover:bg-[#f9fafb] dark:hover:bg-[#1a1a2e] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-[#111122] dark:text-white">
                          {formatDate(tx.created_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
                          {tx.plan || 'Subscription'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#111122] dark:text-white">
                            {tx.crypto_amount ? `${tx.crypto_amount} ${tx.crypto_currency || ''}` : `$${tx.amount}`}
                          </span>
                          {tx.crypto_amount && (
                            <span className="text-xs text-[#6b7280] dark:text-[#9292c9]">
                              ≈ ${tx.amount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-[#f3f4f6] dark:bg-[#232348] px-2 py-1 text-xs font-mono font-medium text-[#111122] dark:text-white">
                          {tx.crypto_currency || 'USD'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tx.tx_hash ? (
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-[#111122] dark:text-white">
                              {tx.tx_hash.slice(0, 6)}...{tx.tx_hash.slice(-4)}
                            </span>
                            <a 
                              href={`https://etherscan.io/tx/${tx.tx_hash}`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">open_in_new</span>
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-[#6b7280] dark:text-[#9292c9] italic">Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tx.status)}
                          <span className={`text-sm font-medium capitalize ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination (Simplified) */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#6b7280] dark:text-[#9292c9]">
              Showing <span className="font-medium text-[#111122] dark:text-white">1</span> to{' '}
              <span className="font-medium text-[#111122] dark:text-white">{filteredTransactions.length}</span> results
            </p>
            <div className="flex gap-2">
              <button className="flex h-9 items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#232348] px-4 hover:bg-[#f9fafb] dark:hover:bg-[#1a1a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <span className="material-symbols-outlined text-lg text-[#6b7280] dark:text-[#9292c9]">chevron_left</span>
              </button>
              <button className="flex h-9 items-center justify-center rounded-lg border border-[#e5e7eb] dark:border-[#232348] bg-white dark:bg-[#232348] px-4 hover:bg-[#f9fafb] dark:hover:bg-[#1a1a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                <span className="material-symbols-outlined text-lg text-[#6b7280] dark:text-[#9292c9]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryContent;
