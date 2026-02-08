// src/components/dashboard/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";
import PaymentHistoryContent from "./PaymentHistoryContent";
import apiService from "../../services/api";

const DashboardLayout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [transactionsData, setTransactionsData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [walletData, setWalletData] = useState(null);

  useEffect(() => {
    authenticateAndLoadData();
  }, []);

  const authenticateAndLoadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get credentials from URL
      const userId = searchParams.get('user_id');
      const token = searchParams.get('token');
      
      if (!userId || !token) {
        setError("⚠️ Missing authentication credentials. Please access from Telegram bot.");
        setLoading(false);
        return;
      }

      // Authenticate with token from bot
      const authData = await apiService.loginWithToken(parseInt(userId), token);
      console.log("✅ Authenticated:", authData);

      // Load all user data
      await loadUserData();
      
      // Remove token from URL for security
      window.history.replaceState({}, '', '/dashboard');
      
      setLoading(false);
      
    } catch (err) {
      console.error("Authentication failed:", err);
      
      if (err.message.includes("Invalid or expired token")) {
        setError(
          "🔒 Your dashboard link has expired.\n\n" +
          "Please get a new link from the bot:\n" +
          "Go to @drelegrambot → Dashboard"
        );
      } else if (err.message.includes("User not found")) {
        setError(
          "❌ Account not found.\n\n" +
          "Create an account in @drelegrambot first."
        );
      } else {
        setError(err.message || "Failed to load dashboard");
      }
      
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const user = await apiService.getCurrentUser();
      setUserData(user);

      const subscription = await apiService.getUserSubscription();
      setSubscriptionData(subscription.subscription);

      const transactions = await apiService.getUserTransactions(50);
      setTransactionsData(transactions.transactions);

      const notifications = await apiService.getUserNotifications();
      setNotificationsData(notifications.notifications);

      const wallet = await apiService.getUserWallet();
      setWalletData(wallet.wallet);

    } catch (err) {
      console.error("Failed to load user data:", err);
      throw err;
    }
  };

  const handleNotificationRead = async (notificationId) => {
    try {
      await apiService.markNotificationRead(notificationId);
      setNotificationsData(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (err) {
      console.error("Failed to mark notification:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-[#6b6b99] dark:text-[#9292c9] text-lg font-medium">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <span className="material-symbols-outlined text-7xl text-red-500 mb-6 block">
            lock
          </span>
          <h2 className="text-2xl font-bold text-[#111122] dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-[#6b6b99] dark:text-[#9292c9] mb-8 whitespace-pre-line">
            {error}
          </p>
          <a
            href="https://t.me/drelegrambot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Open Telegram Bot
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111122] dark:text-white font-display overflow-x-hidden">
      <div className="relative flex h-full min-h-screen w-full flex-col">
        <DashboardHeader 
          userId={userData?.user_id}
          username={userData?.username}
          email={userData?.email}
          notifications={notificationsData}
          wallet={walletData}
          onNotificationRead={handleNotificationRead}
        />

        <div className="flex flex-1 h-full">
          <DashboardSidebar
            activeView={activeView}
            setActiveView={setActiveView}
            userId={userData?.user_id}
            // ADDED MISSING PROPS
            userData={userData}
            subscription={subscriptionData}
          />

          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
              {activeView === "dashboard" ? (
                <DashboardContent 
                  userId={userData?.user_id}
                  userData={userData}
                  subscription={subscriptionData}
                  transactions={transactionsData}
                  wallet={walletData}
                  onRefresh={loadUserData}
                />
              ) : (
                <PaymentHistoryContent 
                  userId={userData?.user_id}
                  transactions={transactionsData}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
