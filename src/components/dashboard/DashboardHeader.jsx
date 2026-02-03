// src/components/dashboard/DashboardHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ userId }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const notificationRef = useRef(null);
  const walletRef = useRef(null);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Subscription Renewed',
      message: 'Your Business+ plan has been renewed successfully',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Expiring Soon',
      message: 'Your subscription will expire in 8 days',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new custom trading signals feature',
      time: '3 days ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Payment Received',
      message: 'Transaction 0x39...9d21 confirmed',
      time: '5 days ago',
      read: true
    }
  ];

  // Wallet info
  const [walletAddress] = useState('0x8a9F3E2B7C4D1A6E8F5C2B9A7D4E1F3C8B5A2F42');
  const [walletBalance] = useState('1,234.56');

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (walletRef.current && !walletRef.current.contains(event.target)) {
        setShowWallet(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Wallet address copied to clipboard!');
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return { icon: 'check_circle', color: 'text-green-500' };
      case 'warning': return { icon: 'warning', color: 'text-orange-500' };
      case 'info': return { icon: 'info', color: 'text-blue-500' };
      default: return { icon: 'notifications', color: 'text-gray-500' };
    }
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e5f0] dark:border-b-[#232348] px-10 py-3 bg-white dark:bg-[#111122]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#111122] dark:text-white">
          <Link to="/" className="size-8 text-primary">
            <img src="/logo.png" alt="Drelegram Logo" className="w-8 h-8 object-contain" />
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            DrelegramDash
          </h2>
        </div>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex gap-2">
          {/* Notification Button with Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowWallet(false);
              }}
              className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f5] dark:bg-[#232348] text-[#111122] dark:text-white hover:bg-[#e1e4e8] dark:hover:bg-[#323267] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                notifications
              </span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111122] rounded-xl shadow-2xl border border-[#e5e5f0] dark:border-[#232348] overflow-hidden z-50">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#e5e5f0] dark:border-[#232348] flex items-center justify-between bg-[#fafafa] dark:bg-[#1a1a35]">
                  <h3 className="text-[#111122] dark:text-white font-bold text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-primary font-semibold">{unreadCount} new</span>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-[#6b6b99] dark:text-[#9292c9] text-sm">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const { icon, color } = getNotificationIcon(notif.type);
                      return (
                        <div 
                          key={notif.id}
                          className={`px-4 py-3 border-b border-[#e5e5f0] dark:border-[#232348] hover:bg-[#fafafa] dark:hover:bg-[#1a1a35]/50 cursor-pointer transition-colors ${!notif.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                        >
                          <div className="flex gap-3">
                            <span className={`material-symbols-outlined text-[20px] ${color} mt-0.5`}>
                              {icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-[#111122] dark:text-white text-sm font-semibold">
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <span className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                                )}
                              </div>
                              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs mt-1 line-clamp-2">
                                {notif.message}
                              </p>
                              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-[#e5e5f0] dark:border-[#232348] bg-[#fafafa] dark:bg-[#1a1a35]">
                  <button className="text-primary text-sm font-semibold hover:underline w-full text-center">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Wallet Button with Dropdown */}
          <div className="relative" ref={walletRef}>
            <button 
              onClick={() => {
                setShowWallet(!showWallet);
                setShowNotifications(false);
              }}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary/10 dark:bg-[#232348] text-primary dark:text-white border border-primary/20 dark:border-transparent hover:bg-primary/20 dark:hover:bg-[#323267] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                account_balance_wallet
              </span>
              <span className="hidden sm:inline">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
            </button>

            {/* Wallet Dropdown */}
            {showWallet && (
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-[#111122] rounded-xl shadow-2xl border border-[#e5e5f0] dark:border-[#232348] overflow-hidden z-50">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#e5e5f0] dark:border-[#232348] bg-[#fafafa] dark:bg-[#1a1a35]">
                  <h3 className="text-[#111122] dark:text-white font-bold text-sm mb-1">Connected Wallet</h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs">Manage your payment source</p>
                </div>

                {/* Wallet Info */}
                <div className="p-6">
                  {/* Balance */}
                  <div className="mb-6">
                    <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider mb-2">
                      Balance
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#111122] dark:text-white text-2xl font-bold">
                        ${walletBalance}
                      </span>
                      <span className="text-[#6b6b99] dark:text-[#9292c9] text-sm">USDT</span>
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="mb-6">
                    <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider mb-2">
                      Wallet Address
                    </p>
                    <div className="flex items-center gap-2 bg-[#f0f2f5] dark:bg-[#232348] rounded-lg p-3">
                      <p className="text-[#111122] dark:text-white text-sm font-mono flex-1 break-all">
                        {walletAddress}
                      </p>
                      <button 
                        onClick={() => copyToClipboard(walletAddress)}
                        className="text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                        title="Copy address"
                      >
                        <span className="material-symbols-outlined text-[20px]">content_copy</span>
                      </button>
                    </div>
                  </div>

                  {/* Network Info */}
                  <div className="mb-6">
                    <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider mb-2">
                      Network
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-[#111122] dark:text-white text-sm font-medium">
                        Ethereum Mainnet
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                      Change Wallet
                    </button>
                    
                    <button className="w-full py-2.5 px-4 rounded-lg border border-[#e5e5f0] dark:border-[#323267] text-[#111122] dark:text-white font-bold text-sm hover:bg-[#f0f2f5] dark:hover:bg-[#232348] transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">add</span>
                      Add Funds
                    </button>

                    <button className="w-full py-2.5 px-4 rounded-lg border border-red-500/20 text-red-500 font-bold text-sm hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      Disconnect
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#e5e5f0] dark:border-[#232348] bg-[#fafafa] dark:bg-[#1a1a35]">
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs text-center">
                    🔒 Your wallet is secured with end-to-end encryption
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
