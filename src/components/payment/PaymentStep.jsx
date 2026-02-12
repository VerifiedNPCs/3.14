// src/components/payment/PaymentStep.jsx
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 
import { validateTxHash } from '../../utils/cryptoValidators'; 

const PaymentStep = ({ 
    selectedAsset, 
    planType, 
    totalMoney, 
    userId, 
    onPaymentComplete, 
    onBack, 
    timeLeft, 
    formatTime 
}) => {
  const [copied, setCopied] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // 🛡️ CRITICAL SAFETY CHECK
  // ==========================================
  // If data is missing, show loading instead of Crashing (White Page)
  if (!selectedAsset) {
      return (
        <div className="w-full h-64 flex flex-col items-center justify-center text-[#5c8a6d]">
           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0df259] mb-4"></div>
           <p>Initializing payment...</p>
        </div>
      );
  }

  // Use defaults to prevent 'undefined' errors
  const walletAddress = selectedAsset.wallet_address || ""; 
  const cryptoAmount = selectedAsset.crypto_amount || "0";
  const assetId = selectedAsset.id || "UNK";
  const assetName = selectedAsset.name || "Unknown";
  const assetNetwork = selectedAsset.network || "Unknown Network";
  const assetIcon = selectedAsset.icon || "help";
  // ==========================================

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = () => {
    // 1. Validate Hash
    const validation = validateTxHash(transactionHash, assetId);
    
    if (!validation.isValid) {
        setValidationError(validation.error);
        return;
    }

    // 2. Submit
    setValidationError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      onPaymentComplete('success', transactionHash);
    }, 1000);
  };

  return (
    <>
      {/* Header Text */}
      <div className="text-center px-4">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Send Payment
        </h1>
        <p className="text-[#90cba4] text-lg">
          Transfer <span className="text-[#0df259] font-mono font-bold">{cryptoAmount} {assetId.toUpperCase()}</span> to the address below
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full bg-[#102216] border border-[#22492f] rounded-2xl shadow-[0_0_50px_rgba(13,242,89,0.05)] overflow-hidden">
        <div className="p-6 md:p-8">
          
          {/* Timer */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-orange-500 text-2xl">schedule</span>
            <div className="flex-1">
              <p className="text-white font-bold">Payment expires in {formatTime(timeLeft)}</p>
              <p className="text-[#90cba4] text-sm">Complete your transaction before the timer runs out</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#183422] rounded-xl p-6 border border-[#22492f]">
              <p className="text-[#90cba4] text-sm mb-2">Amount to Send</p>
              <div className="flex items-center justify-between">
                <span className="text-white text-2xl font-bold font-mono tracking-tight">{cryptoAmount}</span>
                <span className="text-[#90cba4] text-lg">{assetId.toUpperCase()}</span>
              </div>
              <p className="text-[#5c8a6d] text-sm mt-2">≈ ${totalMoney} USD</p>
            </div>

            <div className="bg-[#183422] rounded-xl p-6 border border-[#22492f]">
              <p className="text-[#90cba4] text-sm mb-2">Network</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0df259]">{assetIcon}</span>
                <span className="text-white text-lg font-bold">{assetNetwork}</span>
              </div>
              <p className="text-[#5c8a6d] text-sm mt-2">Make sure to use the correct network</p>
            </div>
          </div>

          {/* Address & QR */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 mb-8">
             <div>
                <p className="text-white font-bold mb-3">Recipient Wallet Address</p>
                <div className="bg-[#183422] border border-[#22492f] rounded-xl p-4 flex items-center justify-between gap-4 group hover:border-[#0df259] transition-colors">
                  <p className="text-[#0df259] font-mono text-sm md:text-base break-all">{walletAddress}</p>
                  <button
                    onClick={() => copyToClipboard(walletAddress)}
                    className="flex-shrink-0 bg-[#22492f] group-hover:bg-[#0df259] text-[#90cba4] group-hover:text-[#102216] px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined !text-lg">
                      {copied ? 'check' : 'content_copy'}
                    </span>
                    <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
             </div>

             <div className="flex justify-center md:justify-end">
                <div className="bg-white p-3 rounded-xl shadow-lg">
                  {/* SAFETY: Only render QR if address exists, otherwise placeholder */}
                  {walletAddress ? (
                      <QRCodeSVG 
                          value={walletAddress} 
                          size={120}
                          level="M" 
                          fgColor="#000000"
                          bgColor="#FFFFFF"
                      />
                  ) : (
                      <div className="w-[120px] h-[120px] bg-gray-200 animate-pulse"></div>
                  )}

                </div>
             </div>
          </div>

          {/* Hash Input */}
          <div className="mb-6">
            <p className="text-white font-bold mb-3">
                Transaction Hash <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              value={transactionHash}
              onChange={(e) => {
                  setTransactionHash(e.target.value);
                  if (validationError) setValidationError(null);
              }}
              placeholder={`Paste your ${assetId.toUpperCase()} transaction hash...`}
              className={`
                w-full bg-[#183422] border rounded-xl p-4 text-white font-mono placeholder-[#5c8a6d] focus:outline-none transition-colors
                ${validationError ? 'border-red-500 focus:border-red-500' : 'border-[#22492f] focus:border-[#0df259]'}
              `}
            />
            {validationError ? (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined !text-base">error</span>
                    {validationError}
                </p>
            ) : (
                <p className="text-[#5c8a6d] text-sm mt-2">
                  This allows us to instantly verify your payment.
                </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onBack}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-xl border border-[#22492f] text-white font-bold hover:bg-[#183422] transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleConfirmPayment}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-xl bg-[#0df259] hover:bg-[#0ab843] text-[#102216] font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#102216]"></div>
                    Verifying...
                  </>
              ) : (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    I've Sent Payment
                  </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#183422]/50 border border-[#22492f] rounded-xl p-6">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0df259]">info</span>
          Payment Instructions
        </h3>
        <ol className="text-[#90cba4] text-sm space-y-2 list-decimal list-inside">
          <li>Scan the QR code or copy the wallet address above.</li>
          <li>Send exactly <span className="text-white font-mono">{cryptoAmount} {assetId.toUpperCase()}</span>.</li>
          <li>Wait for the transaction to appear in your wallet history.</li>
          <li>Copy the <strong>Transaction Hash (TXID)</strong> and paste it above.</li>
          <li>Click confirmation button to complete your subscription.</li>
        </ol>
      </div>
    </>
  );
};

export default PaymentStep;
