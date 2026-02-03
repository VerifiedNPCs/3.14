// src/components/payment/ConfirmStep.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmStep = ({ paymentStatus, planType, totalMoney, userId }) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate(`/dashboard?user_id=${userId}`);
  };

  const handleBackToBot = () => {
    window.location.href = 'https://t.me/drelegrambot';
  };

  if (paymentStatus === 'success') {
    return (
      <>
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-[#0df259]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[#0df259] !text-6xl">check_circle</span>
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Payment Successful!
          </h1>
          <p className="text-[#90cba4] text-lg">
            Your {planType} plan subscription has been activated
          </p>
        </div>

        <div className="w-full bg-[#102216] border border-[#22492f] rounded-2xl shadow-[0_0_50px_rgba(13,242,89,0.05)] overflow-hidden p-8">
          {/* Success Details */}
          <div className="bg-[#183422] rounded-xl p-6 border border-[#22492f] mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[#90cba4] text-sm mb-1">Plan</p>
                <p className="text-white text-lg font-bold">{planType}</p>
              </div>
              <div>
                <p className="text-[#90cba4] text-sm mb-1">Amount Paid</p>
                <p className="text-[#0df259] text-lg font-bold">${totalMoney}</p>
              </div>
              <div>
                <p className="text-[#90cba4] text-sm mb-1">Transaction ID</p>
                <p className="text-white text-sm font-mono">#8392-DK29</p>
              </div>
              <div>
                <p className="text-[#90cba4] text-sm mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0df259]"></div>
                  <p className="text-white font-bold">Confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-[#0df259]/10 border border-[#0df259]/30 rounded-xl p-6 mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#0df259]">rocket_launch</span>
              What's Next?
            </h3>
            <ul className="text-[#90cba4] text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#0df259] !text-lg mt-0.5">check</span>
                Your subscription is now active and ready to use
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#0df259] !text-lg mt-0.5">check</span>
                Access your dashboard to manage your subscription
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#0df259] !text-lg mt-0.5">check</span>
                Receipt has been sent to your registered email
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleBackToDashboard}
              className="flex-1 py-3 px-6 rounded-xl bg-[#0df259] hover:bg-[#0ab843] text-[#102216] font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Go to Dashboard
            </button>
            <button
              onClick={() => window.open("https://t.me/drelegrambot", "_blank")}
              className="flex-1 py-3 px-6 rounded-xl border border-[#22492f] text-white font-bold hover:bg-[#183422] transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Back to Bot
            </button>
          </div>
        </div>
      </>
    );
  }

  // Failure or Timeout
  return (
    <>
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-red-500 !text-6xl">error</span>
        </div>
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Payment {paymentStatus === 'timeout' ? 'Expired' : 'Failed'}
        </h1>
        <p className="text-[#90cba4] text-lg">
          {paymentStatus === 'timeout' 
            ? 'The payment window has expired. Please try again.' 
            : 'We couldn\'t verify your payment. Please try again or contact support.'}
        </p>
      </div>

      <div className="w-full bg-[#102216] border border-[#22492f] rounded-2xl shadow-[0_0_50px_rgba(13,242,89,0.05)] overflow-hidden p-8">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
          <h3 className="text-white font-bold mb-3">What happened?</h3>
          <p className="text-[#90cba4] text-sm mb-4">
            {paymentStatus === 'timeout'
              ? 'The 15-minute payment window has expired. Cryptocurrency prices fluctuate, so we need to refresh the exchange rate.'
              : 'We couldn\'t detect your payment transaction. This might be due to network delays or an incorrect transaction.'}
          </p>
          <ul className="text-[#90cba4] text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-500 !text-lg mt-0.5">info</span>
              If you sent payment, it may still be processing
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-red-500 !text-lg mt-0.5">info</span>
              Contact support with your transaction hash
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3 px-6 rounded-xl bg-[#0df259] hover:bg-[#0ab843] text-[#102216] font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            Try Again
          </button>
          <button
            onClick={handleBackToBot}
            className="flex-1 py-3 px-6 rounded-xl border border-[#22492f] text-white font-bold hover:bg-[#183422] transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">support_agent</span>
            Contact Support
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmStep;
