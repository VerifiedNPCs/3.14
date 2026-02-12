// src/components/dashboard/DashboardHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const DashboardHeader = ({ 
  userId, 
  username, 
  email, 
  notifications = [], 
  wallet, 
  onNotificationRead 
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const notificationRef = useRef(null);
  const walletRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

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

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert('Address copied!');
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'payment_success': return { icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-500/10' };
      case 'subscription_renewed': return { icon: 'verified', color: 'text-blue-500', bg: 'bg-blue-500/10' };
      case 'subscription_expiring': return { icon: 'warning', color: 'text-orange-500', bg: 'bg-orange-500/10' };
      case 'payment_failed': return { icon: 'error', color: 'text-red-500', bg: 'bg-red-500/10' };
      default: return { icon: 'notifications', color: 'text-primary', bg: 'bg-primary/10' };
    }
  };

  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'just now';
    }
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e5f0] dark:border-b-[#232348] px-4 md:px-10 py-3 bg-white dark:bg-[#111122] z-20">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#111122] dark:text-white">
          <Link to="/" className="size-8 text-primary">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          </Link>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">
            DrelegramDash
          </h2>
        </div>
      </div>

      <div className="flex flex-1 justify-end gap-4 md:gap-8">
        <div className="flex gap-2">
          
          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowWallet(false);
              }}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#f0f2f5] dark:bg-[#232348] text-[#111122] dark:text-white hover:bg-[#e1e4e8] dark:hover:bg-[#323267] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1 border-2 border-white dark:border-[#111122]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#111122] rounded-xl shadow-2xl border border-[#e5e5f0] dark:border-[#232348] overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-[#e5e5f0] dark:border-[#232348] flex items-center justify-between bg-[#fafafa] dark:bg-[#1a1a35]">
                  <h3 className="text-[#111122] dark:text-white font-bold text-sm">Notifications</h3>
                  {unreadCount > 0 && <span className="text-xs text-primary font-semibold">{unreadCount} unread</span>}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-12 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-[#f0f2f5] dark:bg-[#232348] rounded-full flex items-center justify-center text-[#6b6b99]">
                        <span className="material-symbols-outlined text-2xl">notifications_off</span>
                      </div>
                      <p className="text-[#6b6b99] dark:text-[#9292c9] text-sm font-medium">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notif) => {
                      const { icon, color, bg } = getNotificationIcon(notif.notification_type);
                      return (
                        <div 
                          key={notif.id}
                          onClick={() => !notif.is_read && onNotificationRead && onNotificationRead(notif.id)}
                          className={`px-4 py-3 border-b border-[#e5e5f0] dark:border-[#232348] hover:bg-[#fafafa] dark:hover:bg-[#1a1a35]/50 cursor-pointer transition-colors ${!notif.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${bg} ${color}`}>
                              <span className="material-symbols-outlined text-[18px]">{icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm ${!notif.is_read ? 'font-bold text-[#111122] dark:text-white' : 'font-medium text-[#444455] dark:text-[#bbbbcc]'}`}>
                                  {notif.title}
                                </p>
                                <span className="text-[10px] text-[#6b6b99] whitespace-nowrap">{formatTime(notif.created_at)}</span>
                              </div>
                              <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs mt-0.5 line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                            </div>
                            {!notif.is_read && <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Wallet Button */}
          <div className="relative" ref={walletRef}>
            <button 
              onClick={() => {
                setShowWallet(!showWallet);
                setShowNotifications(false);
              }}
              className={`flex items-center justify-center h-10 px-3 md:px-4 rounded-lg gap-2 text-sm font-bold transition-all border ${
                wallet 
                  ? 'bg-primary/10 dark:bg-[#232348] text-primary dark:text-white border-primary/20 dark:border-transparent' 
                  : 'bg-[#f0f2f5] dark:bg-[#232348] text-[#6b6b99] dark:text-[#9292c9] border-transparent hover:bg-[#e1e4e8]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              <span className="hidden sm:inline">
                {wallet ? `${wallet.wallet_address.slice(0, 6)}...${wallet.wallet_address.slice(-4)}` : 'Connect Wallet'}
              </span>
            </button>

            {/* Wallet Dropdown */}
            {showWallet && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#111122] rounded-xl shadow-2xl border border-[#e5e5f0] dark:border-[#232348] overflow-hidden z-50">
                <div className="px-6 py-4 border-b border-[#e5e5f0] dark:border-[#232348] bg-[#fafafa] dark:bg-[#1a1a35]">
                  <h3 className="text-[#111122] dark:text-white font-bold text-sm mb-1">
                    {wallet ? 'Connected Wallet' : 'Connect Wallet'}
                  </h3>
                  <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs">
                    {wallet ? 'Manage your payment source' : 'Link a wallet for payments'}
                  </p>
                </div>

                <div className="p-6">
                  {wallet ? (
                    <>
                      <div className="mb-6">
                        <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider mb-2">Balance</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#111122] dark:text-white text-2xl font-bold">${wallet.balance.toFixed(2)}</span>
                          <span className="text-[#6b6b99] dark:text-[#9292c9] text-sm">USDT</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-[#6b6b99] dark:text-[#9292c9] text-xs font-semibold uppercase tracking-wider mb-2">Address</p>
                        <div className="flex items-center gap-2 bg-[#f0f2f5] dark:bg-[#232348] rounded-lg p-3 group cursor-pointer" onClick={() => copyToClipboard(wallet.wallet_address)}>
                          <p className="text-[#111122] dark:text-white text-sm font-mono flex-1 break-all">{wallet.wallet_address}</p>
                          <span className="material-symbols-outlined text-[18px] text-[#6b6b99] group-hover:text-primary transition-colors">content_copy</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button className="w-full py-2.5 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                          <span className="material-symbols-outlined text-[20px]">add</span> Add Funds
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-[#f0f2f5] dark:bg-[#232348] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6b6b99]">
                        <span className="material-symbols-outlined text-3xl">link_off</span>
                      </div>
                      <p className="text-sm text-[#6b6b99] mb-6">No wallet connected. Please link your wallet in the bot settings.</p>
                      <a href="https://t.me/meowpibot" target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 px-4 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 text-center">
                        Open Bot to Connect
                      </a>
                    </div>
                  )}
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
