// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SelectAssetStep from '../components/payment/SelectAssetStep';
import PaymentStep from '../components/payment/PaymentStep';
import ConfirmStep from '../components/payment/ConfirmStep';

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59 - Single timer for all steps

  // Get params from URL
  const userId = searchParams.get('user_id');
  const planType = searchParams.get('plan');
  const totalMoney = searchParams.get('amount');

  // Validate required params
  useEffect(() => {
    if (!userId || !planType || !totalMoney) {
      alert('Invalid payment link. Missing required parameters.');
      navigate('/');
    }
  }, [userId, planType, totalMoney, navigate]);

  // Single timer that runs across all steps
  useEffect(() => {
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
  }, [currentStep]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setCurrentStep(2);
  };

  const handlePaymentComplete = (status) => {
    setPaymentStatus(status);
    setCurrentStep(3);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this payment?')) {
      navigate('/');
    }
  };

  const handleSupport = () => {
    window.open('https://t.me/drele_gram', '_blank');
  };

  return (
    <div className="font-display bg-[#102216] text-white antialiased min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full border-b border-[#22492f] bg-[#102216]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 text-[#0df259]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_543)">
                  <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                  <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                </g>
                <defs>
                  <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">
              Drelegram<span className="text-[#0df259]">.ATM</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSupport}
              className="flex h-10 px-4 items-center justify-center rounded-xl bg-[#22492f] hover:bg-[#2c5e3d] text-[#90cba4] text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined mr-2 !text-base">help</span> Support
            </button>
            <button 
              onClick={handleCancel}
              className="flex h-10 px-4 items-center justify-center rounded-xl bg-[#22492f] hover:bg-[#2c5e3d] text-white text-sm font-medium transition-colors"
            >
              <span className="truncate">Cancel Payment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-12 px-4 md:px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[#0df259]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#183422]/50 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[960px] flex flex-col gap-8 z-10">
          {/* Step Indicator */}
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-3 p-4">
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 1 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>
                  1
                </div>
                <span className={`text-base font-bold leading-normal ${currentStep >= 1 ? 'text-white' : 'text-[#90cba4]'}`}>
                  Select Asset
                </span>
              </div>
              <div className={`w-8 h-[1px] ${currentStep >= 2 ? 'bg-[#0df259]' : 'bg-[#316843]'}`}></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 2 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>
                  2
                </div>
                <span className={`text-base font-medium leading-normal ${currentStep >= 2 ? 'text-white' : 'text-[#90cba4]'}`}>
                  Payment
                </span>
              </div>
              <div className={`w-8 h-[1px] ${currentStep >= 3 ? 'bg-[#0df259]' : 'bg-[#316843] opacity-50'}`}></div>
              <div className="flex items-center gap-2">
                <div className={`flex items-center justify-center size-8 rounded-full font-bold text-sm ${currentStep >= 3 ? 'bg-[#0df259] text-[#102216]' : 'bg-[#22492f] text-[#90cba4] border border-[#316843]'}`}>
                  3
                </div>
                <span className={`text-base font-medium leading-normal ${currentStep >= 3 ? 'text-white' : 'text-[#90cba4]'}`}>
                  Confirm
                </span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <SelectAssetStep 
              planType={planType}
              totalMoney={totalMoney}
              onAssetSelect={handleAssetSelect}
              timeLeft={timeLeft}
              formatTime={formatTime}
            />
          )}
          {currentStep === 2 && (
            <PaymentStep 
              selectedAsset={selectedAsset}
              planType={planType}
              totalMoney={totalMoney}
              userId={userId}
              onPaymentComplete={handlePaymentComplete}
              onBack={() => setCurrentStep(1)}
              timeLeft={timeLeft}
              formatTime={formatTime}
            />
          )}
          {currentStep === 3 && (
            <ConfirmStep 
              paymentStatus={paymentStatus}
              planType={planType}
              totalMoney={totalMoney}
              userId={userId}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#22492f] bg-[#102216] py-6">
        <div className="max-w-[960px] mx-auto px-4 flex justify-center items-center text-sm text-[#5c8a6d]">
          <p>© 2026 Drelegram Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;
