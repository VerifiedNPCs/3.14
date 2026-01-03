import React from 'react';

const Features = () => {
  const features = [
    { icon: 'north', title: 'Real-time Prices', desc: 'Live market data feeds', color: 'text-emerald-400', shadow: 'rgba(52,211,153,0.5)' },
    { icon: 'notifications', title: 'Smart Alerts', desc: 'Never miss a move', color: 'text-primary', shadow: 'rgba(74,222,128,0.5)' },
    { icon: 'show_chart', title: 'Advanced Charts', desc: 'Technical analysis tools', color: 'text-purple-400', shadow: 'rgba(192,132,252,0.5)' },
    { icon: 'query_stats', title: 'Order Tracking', desc: 'Monitor all exchanges', color: 'text-blue-400', shadow: 'rgba(96,165,250,0.5)' },
    { icon: 'bolt', title: 'Trading Signals', desc: 'AI powered suggestions', color: 'text-yellow-400', shadow: 'rgba(250,204,21,0.5)' },
    { icon: 'photo_camera', title: 'Auto-Screenshots', desc: 'Capture chart patterns', color: 'text-pink-400', shadow: 'rgba(244,114,182,0.5)' },
  ];

  return (
    <section className="py-20 px-6 lg:px-12 bg-surface-light dark:bg-black/20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center text-slate-900 dark:text-white">Core Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-surface-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg border border-slate-200 dark:border-slate-800">
                <span 
                  className={`material-icons-round text-3xl ${feature.color}`} 
                  style={{ filter: `drop-shadow(0 0 8px ${feature.shadow})` }}
                >
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-bold text-sm mb-1 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-xs text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
