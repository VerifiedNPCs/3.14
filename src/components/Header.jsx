import React from 'react';

const Header = () => {
  const botUsername = "drelegrambot"; 
  const telegramLink = `https://t.me/${botUsername}?start=login`;
  return (
    <header className="w-full py-6 px-6 lg:px-12 flex justify-between items-center relative z-20">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Drelegram Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-900 dark:text-white">
          Drelegram
        </span>
      </div>
      
      <div>
        <button className="md:hidden text-slate-600 dark:text-slate-200">
          <span className="material-icons-round">menu</span>
        </button>
        <a 
          href={telegramLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:text-white transition-all"
        >
          <span className="material-icons-round text-sm">login</span>
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
