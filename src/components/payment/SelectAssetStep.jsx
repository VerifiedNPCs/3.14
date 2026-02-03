// src/components/payment/SelectAssetStep.jsx
import React from 'react';

const SelectAssetStep = ({ planType, totalMoney, onAssetSelect, timeLeft, formatTime }) => {
  const cryptoAssets = [
    {
      id: 'btc',
      name: 'Bitcoin',
      network: 'BTC Network',
      icon: 'currency_bitcoin'
    },
    {
      id: 'eth',
      name: 'Ethereum',
      network: 'ERC-20 Network',
      icon: 'diamond'
    },
    {
      id: 'usdt',
      name: 'Tether (USDT)',
      network: 'TRC-20 / ERC-20',
      icon: 'attach_money'
    },
    {
      id: 'usdc',
      name: 'USD Coin (USDC)',
      network: 'ERC-20 / SOL',
      icon: 'monetization_on'
    }
  ];

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
              <p>Transaction ID: <span className="font-mono text-[#90cba4]">#8392-DK29</span></p>
              <p>Merchant: <span className="text-white">Drelegram Inc.</span></p>
            </div>
          </div>

          {/* Right: Crypto Selector Grid */}
          <div className="w-full md:w-2/3 p-6 md:p-8 bg-[#102216]">
            <div className="mb-6">
              <h2 className="text-white text-lg font-bold">Select Wallet</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cryptoAssets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => onAssetSelect(asset)}
                  className="group relative flex flex-col gap-3 rounded-xl border border-[#316843] bg-[#183422] p-5 items-start hover:border-[#0df259] hover:shadow-[0_0_15px_rgba(13,242,89,0.15)] transition-all duration-300 text-left"
                >
                  <div className="flex w-full justify-between items-start">
                    <div className="bg-white/10 p-2 rounded-lg group-hover:bg-[#0df259]/20 transition-colors">
                      <span className="material-symbols-outlined text-white group-hover:text-[#0df259] !text-[32px]">
                        {asset.icon}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[#316843] group-hover:text-[#0df259] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      arrow_forward
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold leading-tight group-hover:text-[#0df259] transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-[#5c8a6d] text-sm mt-1">{asset.network}</p>
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-2 ring-[#0df259] opacity-0 group-focus:opacity-100 pointer-events-none"></div>
                </button>
              ))}
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
