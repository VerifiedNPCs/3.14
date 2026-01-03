import React from 'react';

const Pricing = () => {
  return (
    <section className="py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-transparent -z-10"></div>
      <div className="container mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Subscription Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400">Choose the plan that fits your trading style.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
            
            {/* Standard Plan (Emerald) */}
            <div className="group relative bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 flex flex-col overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-500 transition-colors text-slate-900 dark:text-white">Standard</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Essential tools for individual traders starting out.</p>
                <ul className="space-y-3 mb-8 text-sm relative z-10">
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-slate-400 text-emerald-500 transition-colors">check</span> Basic limited alerts
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-slate-400 text-emerald-500 transition-colors">check</span> 5 Saved crypto charts
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-slate-400 text-emerald-500 transition-colors">check</span> Image capturing
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-slate-400 text-emerald-500 transition-colors">check</span> 1 Week trial 
                    </li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-500 group-hover:text-white text-slate-900 dark:text-white font-semibold transition-colors relative z-10">Start Free</button>
            </div>

            {/* Pro Plan (Blue) */}
            <div className="group relative bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 flex flex-col overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-500 transition-colors text-slate-900 dark:text-white">Pro</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Advanced features for the dedicated trader.</p>
                <ul className="space-y-3 mb-8 text-sm relative z-10">
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-blue-500">check</span> Unlimited alerts
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-blue-500">check</span> Image capturing
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-blue-500">check</span> 20 Saved charts
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-blue-500">check</span> 2 saved Order tracking
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-blue-500">check</span> Telegram integration
                    </li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-blue-500/50 border border-slate-500/40 dark:border-blue-900 group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white text-slate-900 dark:text-blue-200 font-semibold transition-colors relative z-10">Start Pro</button>
            </div>

            {/* Business+ Plan (Purple) */}
            <div className="group relative bg-white dark:bg-surface-dark rounded-2xl p-6 border border-accent-purple shadow-[0_0_20px_rgba(217,70,239,0.2)] flex flex-col hover:scale-105 transition-transform duration-300 overflow-hidden h-full z-10">
                {/* Badge: Fixed to top-right corner */}
                <div className="absolute top-0 right-0 bg-accent-purple text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider shadow-sm z-20">Most Popular</div>
                
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <h3 className="text-xl font-bold mb-4 text-accent-purple">Business+</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">Power your VIP group with custom signals.</p>
                <ul className="space-y-3 mb-8 text-sm relative z-10">
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-accent-purple">check</span> Unlimited alert, image capturing, saved charts
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-accent-purple">check</span> 5 saved Order tracking
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-accent-purple">check</span> Custom Trading signals
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-accent-purple">check</span> Custom feature
                    </li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-purple-700/30 border border-accent-purple bg-transparent text-accent-purple group-hover:bg-accent-purple group-hover:text-white font-semibold transition-colors relative z-10">Power Your VIP Group</button>
            </div>

            {/* Enterprise+ Plan (Orange) */}
            <div className="group relative bg-white dark:bg-surface-dark rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 hover:scale-105 flex flex-col overflow-hidden h-full">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors text-slate-900 dark:text-white">Enterprise+</h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">White-label solutions for large institutions.</p>
                <ul className="space-y-3 mb-8 text-sm relative z-10">
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-orange-500">check</span> Custom bot
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-orange-500">check</span> Custom service
                    </li>
                    <li className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-xs text-orange-500">check</span> Unlimited access
                    </li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 group-hover:bg-orange-500 group-hover:text-white font-bold transition-colors relative z-10">Contact Us</button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
