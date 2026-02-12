// src/components/payment/SelectAssetStep.jsx
import React from 'react';

const SelectAssetStep = ({ 
    planType, 
    totalMoney, 
    onAssetSelect, 
    timeLeft, 
    formatTime, 
    options = [],
    loading
}) => {
  
  return (
    <>
      {/* Header Text */}
      <div className="text-center px-4">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Choose Cryptocurrency
        </h1>
        <p className="text-[#90cba4] text-lg">
          Select the digital asset you wish to use for payment
        </p>
      </div>

      {/* Main Card Container */}
      <div className="w-full bg-[#102216] border border-[#22492f] rounded-2xl shadow-[0_0_50px_rgba(13,242,89,0.05)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Order Summary */}
          <div className="w-full md:w-1/3 bg-[#162e1f] p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#22492f]">
            <div>
              <div className="flex items-center gap-2 mb-6 text-[#90cba4] text-sm uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined !text-lg">receipt_long</span> Order Summary
              </div>
              <div className="bg-[#102216] rounded-xl p-4 border border-[#22492f] mb-6">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4" 
                  style={{
                    backgroundImage: 'url("https://cdn.usegalileo.ai/stability/d1891367-cda1-4646-aab3-75ab5ce6f31f.png")'
                  }}
                ></div>
                <h3 className="text-white text-lg font-bold leading-tight mb-1">
                  {planType} Plan Subscription
                </h3>
                <p className="text-[#90cba4] text-sm font-normal mb-3">Billed monthly</p>
                <div className="h-px bg-[#22492f] w-full mb-3"></div>
                <div className="flex justify-between items-end">
                  <span className="text-[#90cba4] text-sm">Total</span>
                  <span className="text-[#0df259] text-2xl font-bold">${totalMoney}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-[#5c8a6d] leading-relaxed">
              <p>Transaction ID: <span className="font-mono text-[#90cba4]">#SECURE-PYMNT</span></p>
              <p>Merchant: <span className="text-white">Drelegram Inc.</span></p>
            </div>
          </div>

          {/* Right: Crypto Selector Grid */}
          <div className="w-full md:w-2/3 p-6 md:p-8 bg-[#102216]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold">Select Wallet</h2>
              {loading && <span className="text-xs text-[#0df259] animate-pulse">Live updating...</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading && options.length === 0 ? (
                 <div className="col-span-full py-12 text-center text-[#5c8a6d]">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0df259] mb-2"></div>
                    <p>Fetching real-time exchange rates...</p>
                 </div>
              ) : (
                options.map((asset) => {
                  // Check if wallet address exists (provided by backend)
                  const isAvailable = Boolean(asset.wallet_address && asset.wallet_address.trim() !== '');

                  return (
                    <button
                      key={asset.id}
                      onClick={() => isAvailable && onAssetSelect(asset)}
                      disabled={!isAvailable}
                      className={`
                        group relative flex flex-col gap-3 rounded-xl border p-5 items-start text-left transition-all duration-300
                        ${isAvailable 
                            ? 'bg-[#183422] border-[#316843] hover:border-[#0df259] hover:shadow-[0_0_15px_rgba(13,242,89,0.15)] cursor-pointer' 
                            : 'bg-[#14261b] border-[#1e3a29] opacity-50 cursor-not-allowed grayscale'}
                      `}
                    >
                      <div className="flex w-full justify-between items-start">
                        <div className={`p-2 rounded-lg transition-colors ${isAvailable ? 'bg-white/10 group-hover:bg-[#0df259]/20' : 'bg-white/5'}`}>
                          <span className={`material-symbols-outlined !text-[32px] ${isAvailable ? 'text-white group-hover:text-[#0df259]' : 'text-gray-500'}`}>
                            {asset.icon}
                          </span>
                        </div>
                        {isAvailable ? (
                             <span className="text-[#90cba4] text-[10px] font-mono bg-[#102216] px-2 py-1 rounded border border-[#22492f]">
                                1 {asset.id.toUpperCase()} ≈ ${asset.rate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                             </span>
                        ) : (
                             <span className="text-red-400 text-[10px] font-bold bg-red-900/20 px-2 py-1 rounded border border-red-900/50">
                                UNAVAILABLE
                             </span>
                        )}
                      </div>
                      
                      <div className="w-full">
                        <h3 className={`text-lg font-bold leading-tight transition-colors ${isAvailable ? 'text-white group-hover:text-[#0df259]' : 'text-gray-400'}`}>
                          {asset.name}
                        </h3>
                        <div className="flex justify-between items-end mt-1">
                          <p className="text-[#5c8a6d] text-sm">{asset.network}</p>
                          {isAvailable && (
                            <p className="text-[#0df259] font-mono font-bold text-lg">
                              {asset.crypto_amount} <span className="text-xs">{asset.id.toUpperCase()}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {isAvailable && (
                        <div className="absolute inset-0 rounded-xl ring-2 ring-[#0df259] opacity-0 group-focus:opacity-100 pointer-events-none"></div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Info in Card */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#22492f]">
              <p className="text-[#5c8a6d] text-sm text-center sm:text-left">
                Exchange rate locked for <span className="text-[#0df259] font-mono font-bold">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-center mt-4">
        <a 
          className="text-[#5c8a6d] hover:text-[#0df259] text-sm font-medium transition-colors border-b border-transparent hover:border-[#0df259]" 
          href="#"
        >
          Don't have crypto? Buy with card
        </a>
      </div>
    </>
  );
};

export default SelectAssetStep;
