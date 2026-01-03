import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark py-12 px-6 lg:px-12 relative z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="text-primary transform -rotate-45">
            <span className="material-icons-round text-2xl">send</span>
          </div>
          <span className="font-bold text-lg text-slate-700 dark:text-slate-200">Drelegram</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-primary transition-colors">Website</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        </div>
        <div className="text-slate-400 text-sm">
          © 2026 Drelegram Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
