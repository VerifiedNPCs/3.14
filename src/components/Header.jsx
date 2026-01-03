import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 px-6 lg:px-12 flex justify-between items-center relative z-20">
      <div className="flex items-center gap-2">
        <div className="text-primary transform -rotate-45">
          <span className="material-icons-round text-3xl">send</span>
        </div>
        <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-900 dark:text-white">
          Drelegram
        </span>
      </div>
      
      <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
        <a href="#" className="hover:text-primary transition-colors">Features</a>
        <a href="#" className="hover:text-primary transition-colors">Pricing</a>
        <a href="#" className="hover:text-primary transition-colors">Testimonials</a>
      </nav>
      
      <div>
        <button className="md:hidden text-slate-600 dark:text-slate-200">
          <span className="material-icons-round">menu</span>
        </button>
        <a href="#" className="hidden md:inline-block px-5 py-2 text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:text-white transition-all">
          Login
        </a>
      </div>
    </header>
  );
};

export default Header;
