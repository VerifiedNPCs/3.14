// src/components/payment/PaymentStep.jsx
import React, { useState } from 'react';

const PaymentStep = ({ selectedAsset, planType, totalMoney, userId, onPaymentComplete, onBack, timeLeft, formatTime }) => {
  const [copied, setCopied] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  // Mock wallet address (in production, this would come from your backend)
  const walletAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8';
  const cryptoAmount = (parseFloat(totalMoney) / 45000).toFixed(6); // Mock conversion rate

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    // NO validation anymore – hash is optional
    // You can still send it to backend if present:
    // onPaymentComplete({ status: 'success', txHash: transactionHash || null });

    setTimeout(() => {
      onPaymentComplete('success');
    }, 1500);
  };

  return (
    <>
      {/* Header Text */}
      <div className="text-center px-4">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Send Payment
        </h1>
        <p className="text-[#90cba4] text-lg">
          Transfer {cryptoAmount} {selectedAsset.name} to the address below
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full bg-[#102216] border border-[#22492f] rounded-2xl shadow-[0_0_50px_rgba(13,242,89,0.05)] overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Timer Warning */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">schedule</span>
            <div className="flex-1">
              <p className="text-white font-bold">Payment expires in {formatTime(timeLeft)}</p>
              <p className="text-[#90cba4] text-sm">Complete your transaction before the timer runs out</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Amount to Send */}
            <div className="bg-[#183422] rounded-xl p-6 border border-[#22492f]">
              <p className="text-[#90cba4] text-sm mb-2">Amount to Send</p>
              <div className="flex items-center justify-between">
                <span className="text-white text-2xl font-bold">{cryptoAmount}</span>
                <span className="text-[#90cba4] text-lg">{selectedAsset.id.toUpperCase()}</span>
              </div>
              <p className="text-[#5c8a6d] text-sm mt-2">≈ ${totalMoney} USD</p>
            </div>

            {/* Network */}
            <div className="bg-[#183422] rounded-xl p-6 border border-[#22492f]">
              <p className="text-[#90cba4] text-sm mb-2">Network</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0df259]">{selectedAsset.icon}</span>
                <span className="text-white text-lg font-bold">{selectedAsset.network}</span>
              </div>
              <p className="text-[#5c8a6d] text-sm mt-2">Make sure to use the correct network</p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="mb-8">
            <p className="text-white font-bold mb-3">Recipient Wallet Address</p>
            <div className="bg-[#183422] border border-[#22492f] rounded-xl p-4 flex items-center justify-between gap-4">
              <p className="text-[#0df259] font-mono text-sm md:text-base break-all">{walletAddress}</p>
              <button
                onClick={() => copyToClipboard(walletAddress)}
                className="flex-shrink-0 bg-[#0df259] hover:bg-[#0ab843] text-[#102216] px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined !text-lg">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white p-4 rounded-xl">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-center text-sm">QR Code<br/>Placeholder</p>
              </div>
            </div>
          </div>

          {/* Transaction Hash Input (still optional, but no label saying Optional now) */}
          <div className="mb-6">
            <p className="text-white font-bold mb-3">Enter Transaction Hash</p>
            <input
              type="text"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              placeholder="e.g. 0x5f3c1a8b9e2d4f7a6c1b3d9e8f2a7c4b1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f"
              className="w-full bg-[#183422] border border-[#22492f] rounded-xl p-4 text-white font-mono placeholder-[#5c8a6d] focus:border-[#0df259] focus:outline-none transition-colors"
            />
            <p className="text-[#5c8a6d] text-sm mt-2">
              You can paste your blockchain transaction hash here. If you skip this, we will try to detect your payment automatically.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBack}
              className="flex-1 py-3 px-6 rounded-xl border border-[#22492f] text-white font-bold hover:bg-[#183422] transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 py-3 px-6 rounded-xl bg-[#0df259] hover:bg-[#0ab843] text-[#102216] font-bold transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">check_circle</span>
              I've Sent Payment
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#183422]/50 border border-[#22492f] rounded-xl p-6">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0df259]">info</span>
          Payment Instructions
        </h3>
        <ol className="text-[#90cba4] text-sm space-y-2 list-decimal list-inside">
          <li>Copy the wallet address or scan the QR code</li>
          <li>Open your crypto wallet app</li>
          <li>Send exactly {cryptoAmount} {selectedAsset.id.toUpperCase()} to the address</li>
          <li>paste your transaction hash above (you can find it in your wallet’s history)</li>
          <li>Click "I've Sent Payment" to complete</li>
        </ol>
      </div>
    </>
  );
};

export default PaymentStep;
