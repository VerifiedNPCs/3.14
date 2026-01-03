import React from 'react';

const Hero = () => {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
      {/* Left Content */}
      <div className="flex-1 space-y-8 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
          Smart Currency &amp; <br className="hidden lg:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
            Crypto Insights
          </span>
          {" "}— Drelegram
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
          Real-time prices, automated alerts, advanced trading signals for serious traders and communities. Stay ahead of the market with precision data.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a href="#" className="px-8 py-4 bg-primary hover:bg-primary-hover text-slate-900 font-bold rounded-full shadow-neon transition-all hover:-translate-y-0.5">
            Start Free Trial
          </a>
          <a href="#" className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary text-slate-700 dark:text-white font-semibold rounded-full transition-all hover:-translate-y-0.5">
            View Plans
          </a>
        </div>

        <div className="pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 dark:text-slate-500">
          <div className="flex -space-x-2">
            <img alt="User 1" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-Lxfi8czzxxuqiFhkj0tZ9BgYTP6tLyHu8hOA8xe8tv8ytdhxc6cs44SzJ8lHIrgFbs2j6Lflq60wA6ouY7faq5eWuHs5xcAxV7FfG6ZKMnQ9Vu22s7hfl4LTDQjgIoltpAHLmp-wjizKM81VZxQJ4rSiX0HVbGoe4F2u9Knrxo08mnsZjmLEFeEY8J884m46ZsBw5F7axXJV9-d8Hnae1Lohv-um_zJ3Af2TurjsrJzd-Rlctq3w2bsc-siPLlLTgLVCMPxFYg" />
            <img alt="User 2" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHX9Adk0KdPTyBWxKyAyY4SQOxIHRdRImeXHdJm7w7N-r2CESAEfbRcyyzRBux8mV-ERu_TPCdfm3m6f-rqPY1odHshWSQM1PXrasfr9fK9C34zoOaC5OApwovV_xFjyWkmAlrb4Sk5ns1qJVFjoACHmgEJDnPTuCihFrY8SVL23G4gLAV5-uKfJ2mhdUq4n8j9pvRMxQqkjlxerTUxIWf-W5nSkM7nuZ2Fo8PswjXBl-ujtGDT7vcUnS6uAKSHBxEaQ3uJ7rLGw" />
            <img alt="User 3" className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD1Al9LVbMJnoboIfhCdzv3LbZ9REIlKc2ITSQsfaW-E_GeOFn2TKd2Q39FBfJxsXrWydrsC0abym9hevDpnR7HIq1Z8goQLc_5kT0XVeOGu6jRrOVx4PnQxV0eZ6PPRTJt3JYOGayB2GNpRra5sbBHMf8t1iA5gJ7r1arMeCLxQwKHT44ASMA9NCvUZClJn2HWA50vGv_oFKsLF3OJrIlHGHjWM9v8qqFa9mFS13iXkP7lCsjnooyKEoLAI9rRumdZDdzMXgAdQ" />
          </div>
          <span>Trusted by 10,000+ traders</span>
        </div>
      </div>

      {/* Right Content - Phone Mockup & Widgets */}
      <div className="flex-1 relative w-full max-w-md lg:max-w-full flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative z-10 bg-slate-900 border-8 border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden w-[300px] h-[600px] mx-auto ring-1 ring-slate-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
          
          <div className="w-full h-full bg-slate-900 flex flex-col pt-8 p-4 text-white relative">
            {/* Header inside phone */}
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="material-icons-round text-sm text-slate-400">arrow_back_ios</span>
              <span className="font-bold text-sm">BTC/USDT</span>
              <span className="material-icons-round text-sm text-slate-400">settings</span>
            </div>
            
            {/* Price Display */}
            <div className="flex flex-col gap-1 mb-4">
              <div className="text-3xl font-bold text-white">$120,291.00</div>
              <div className="text-primary text-sm flex items-center gap-1">
                <span className="material-icons-round text-sm">trending_up</span> +1.24%
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="h-32 w-full bg-slate-800/50 rounded-xl mb-4 relative overflow-hidden flex items-end px-1 gap-1">
              <div className="w-1/6 bg-primary/20 h-[40%] rounded-t-sm"></div>
              <div className="w-1/6 bg-primary/40 h-[60%] rounded-t-sm"></div>
              <div className="w-1/6 bg-red-500/40 h-[30%] rounded-t-sm"></div>
              <div className="w-1/6 bg-primary/60 h-[80%] rounded-t-sm"></div>
              <div className="w-1/6 bg-primary/30 h-[50%] rounded-t-sm"></div>
              <div className="w-1/6 bg-primary/80 h-[90%] rounded-t-sm shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0 60 L 20 40 L 40 70 L 60 20 L 80 50 L 100 10" fill="none" stroke="#4ade80" strokeWidth="2"></path>
              </svg>
            </div>

            {/* Recent Signals List */}
            <div className="space-y-3">
              <div className="p-3 bg-slate-800 rounded-lg flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">₿</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Bitcoin</span>
                    <span className="text-[10px] text-slate-400">Buy Signal</span>
                  </div>
                </div>
                <div className="text-xs text-primary font-bold">Strong Buy</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xs">Ξ</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Ethereum</span>
                    <span className="text-[10px] text-slate-400">Volume Alert</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300">High Vol</div>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg flex justify-between items-center opacity-60">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xs">S</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold">Solana</span>
                    <span className="text-[10px] text-slate-400">Dip Alert</span>
                  </div>
                </div>
                <div className="text-xs text-red-400">-2.4%</div>
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center text-slate-900">
              <span className="material-icons-round">add</span>
            </div>
          </div>
        </div>

        {/* Floating Widgets */}
        {/* 1. Signal Success */}
        <div className="absolute top-20 -right-4 lg:-right-12 bg-surface-dark p-3 rounded-lg border border-slate-700 shadow-xl hidden sm:flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
          <span className="material-icons-round text-primary">check_circle</span>
          <div className="text-xs">
            <div className="text-slate-400">Signal Success</div>
            <div className="font-bold text-white">94.2% Accuracy</div>
          </div>
        </div>

        {/* 2. ETH Alert */}
        <div className="absolute bottom-32 -left-4 lg:-left-12 bg-surface-dark p-3 rounded-lg border border-slate-700 shadow-xl hidden sm:flex items-center gap-3 animate-pulse">
          <span className="material-icons-round text-accent-purple">notifications_active</span>
          <div className="text-xs">
            <div className="text-slate-400">New Alert</div>
            <div className="font-bold text-white">ETH broke $3200</div>
          </div>
        </div>

        {/* 3. Gold Price */}
        <div className="absolute bottom-20 -right-4 lg:-right-12 bg-surface-dark p-3 rounded-lg border border-slate-700 shadow-xl hidden sm:flex flex-col gap-2 animate-pulse" style={{ animationDuration: '4s' }}>
          <div className="flex items-center gap-3">
            <span className="material-icons-round text-yellow-500">monetization_on</span>
            <div className="text-xs">
              <div className="text-slate-400">Gold Price</div>
              <div className="font-bold text-white">$4621.12</div>
            </div>
          </div>
          {/* Small Gold Chart */}
          <div className="h-8 w-32 bg-slate-800/50 rounded flex items-center justify-center overflow-hidden relative">
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 40">
              <path d="M0 30 Q 20 35 40 15 T 100 10" fill="none" stroke="#eab308" strokeWidth="2" />
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(234, 179, 8, 0.2)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path d="M0 30 Q 20 35 40 15 T 100 10 V 40 H 0 Z" fill="url(#goldGradient)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
