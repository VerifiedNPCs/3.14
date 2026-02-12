// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SelectAssetStep from '../components/payment/SelectAssetStep';
import PaymentStep from '../components/payment/PaymentStep';
import ConfirmStep from '../components/payment/ConfirmStep';
import apiService from '../services/api';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  
  // Data State
  const [paymentData, setPaymentData] = useState(null);
  const [cryptoOptions, setCryptoOptions] = useState([]);

  // Get Payment ID
  const paymentId = searchParams.get('payment_id');

  // 1. Initial Load: Fetch Payment Details & Crypto Options
  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!paymentId) {
        alert('Invalid payment link.');
        navigate('/');
        return;
      }

      try {
        // Authenticate Telegram WebApp if available
        const tg = window.Telegram?.WebApp;
        if (tg?.initData) {
           await apiService.authenticateTelegramPayment(tg.initData);
        }

        // A. Get Basic Payment Info (Amount & Plan)
        const data = await apiService.getPaymentRequest(paymentId);
        setPaymentData({
          plan: data.plan,
          amount: data.amount, 
          userId: data.userId,
          status: data.status
        });

        // B. Get Real-time Crypto Options (Prices & Wallets)
        // Ensure you added this method to your apiService!
        const optionsData = await apiService.getCryptoOptions(paymentId);
        setCryptoOptions(optionsData.options || []);
        
        setLoading(false);
        setOptionsLoading(false);

      } catch (error) {
        console.error("Payment load error:", error);
        alert("Failed to load payment details.");
        setLoading(false);
        setOptionsLoading(false);
      }
    };

    fetchAllDetails();
  }, [paymentId, navigate, searchParams]);

  // 2. Timer Logic
  useEffect(() => {
    if (loading || currentStep === 3) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          if (currentStep !== 3) {
            setPaymentStatus('timeout');
            setCurrentStep(3);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStep, loading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAssetSelect = (asset) => {
    // Double check wallet availability before proceeding
    if (!asset.wallet_address) {
        alert("This payment method is temporarily unavailable.");
        return;
    }
    setSelectedAsset(asset);
    setCurrentStep(2);
  };

  const handlePaymentComplete = async (status, txHash) => {
    setLoading(true);
    try {
      // Backend expects 'confirmed', UI might return 'success'
      const backendStatus = status === 'success' ? 'confirmed' : status;
      
      console.log("Sending confirmation to backend:", backendStatus);

      const response = await apiService.confirmPayment(paymentId, backendStatus, txHash);

      if (response.dashboard_token) {
        apiService.setToken(response.dashboard_token);
        console.log('✅ Dashboard access token stored');
      }

      setPaymentStatus('success'); 
      setCurrentStep(3);
    } catch (err) {
      console.error("Payment confirmation failed", err);
      setPaymentStatus('failed');
      setCurrentStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Cancel payment?')) {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.close();
      } else {
        // Redirect to bot with "cancelled" parameter
        window.location.href = 'https://t.me/drelegrambot?start=payment_cancelled';
      }
    }
  };

  const handleSupport = () => {
    window.open('https://t.me/drele_gram', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#102216] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0df259]"></div>
      </div>
    );
  }

  if (!paymentData) return null;

  return (
    <div className="font-display bg-[#102216] text-white antialiased min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-[#22492f] bg-[#102216]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo SVG */}
            <div className="size-8 text-[#0df259]">
               <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_6_543)"><path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path><path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path></g><defs><clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath></defs></svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">
              Drelegram<span className="text-[#0df259]">.ATM</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleSupport} className="flex h-10 px-4 items-center justify-center rounded-xl bg-[#22492f] hover:bg-[#2c5e3d] text-[#90cba4] text-sm font-medium transition-colors">
              <span className="material-symbols-outlined mr-2 !text-base">help</span> Support
            </button>
            <button onClick={handleCancel} className="flex h-10 px-4 items-center justify-center rounded-xl bg-[#22492f] hover:bg-[#2c5e3d] text-white text-sm font-medium transition-colors">
              <span className="truncate">Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-12 px-4 md:px-6 relative overflow-hidden">
        {/* Step Indicator */}
        {currentStep < 3 && (
          <div className="w-full max-w-[960px] z-10">
            <div className="flex flex-wrap items-center justify-center gap-3 p-4">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 1 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>1</div>
                <span className={`text-base font-bold ${currentStep >= 1 ? 'text-white' : 'text-[#90cba4]'}`}>Asset</span>
              </div>
              <div className={`w-8 h-[1px] ${currentStep >= 2 ? 'bg-[#0df259]' : 'bg-[#316843]'}`}></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 2 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>2</div>
                <span className={`text-base font-bold ${currentStep >= 2 ? 'text-white' : 'text-[#90cba4]'}`}>Payment</span>
              </div>
              <div className={`w-8 h-[1px] ${currentStep >= 3 ? 'bg-[#0df259]' : 'bg-[#316843]'}`}></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 3 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>3</div>
                <span className={`text-base font-bold ${currentStep >= 3 ? 'text-white' : 'text-[#90cba4]'}`}>Confirm</span>
              </div>
            </div>
          </div>
        )}

        <div className="w-full max-w-[960px] flex flex-col gap-8 z-10 mt-6">
          {currentStep === 1 && (
            <SelectAssetStep 
              planType={paymentData.plan}
              totalMoney={paymentData.amount}
              options={cryptoOptions}
              onAssetSelect={handleAssetSelect}
              timeLeft={timeLeft}
              formatTime={formatTime}
              loading={optionsLoading}
            />
          )}
          {currentStep === 2 && (
            <PaymentStep 
              selectedAsset={selectedAsset}
              planType={paymentData.plan}
              totalMoney={paymentData.amount}
              userId={paymentData.userId}
              onPaymentComplete={handlePaymentComplete}
              onBack={() => setCurrentStep(1)}
              timeLeft={timeLeft}
              formatTime={formatTime}
            />
          )}
          {currentStep === 3 && (
            <ConfirmStep 
              paymentStatus={paymentStatus}
              planType={paymentData.plan}
              totalMoney={paymentData.amount}
              userId={paymentData.userId}
            />
          )}
        </div>
      </main>

      <footer className="w-full border-t border-[#22492f] bg-[#102216] py-6 text-center text-sm text-[#5c8a6d]">
        <p>© 2026 Drelegram Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentPage;
