import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BookOpen, Home, Gift, Sparkles } from 'lucide-react';

const FloatingIcon = ({ Icon, className }) => (
  <div className={`absolute opacity-30 animate-[float_4s_ease-in-out_infinite] ${className}`}>
    <Icon size={48} className="text-white drop-shadow-md" />
  </div>
);

const Hero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden gradient-bg pt-24 pb-16">
      {/* Decorative floating elements */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-[30%] right-[15%] w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[float_5s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-[10%] left-[20%] w-36 h-36 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[float_7s_ease-in-out_infinite]" />
      <div className="absolute bottom-[20%] right-[25%] w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-[float_4s_ease-in-out_infinite_reverse]" />

      <FloatingIcon Icon={ShoppingBag} className="top-[15%] left-[5%] text-pink-500" />
      <FloatingIcon Icon={BookOpen} className="top-[25%] right-[8%] text-blue-500 delay-1000" />
      <FloatingIcon Icon={Home} className="bottom-[20%] left-[8%] text-purple-500 delay-500" />
      <FloatingIcon Icon={Gift} className="bottom-[15%] right-[10%] text-yellow-500 delay-700" />
      <FloatingIcon Icon={Sparkles} className="top-[50%] right-[5%] text-pink-400 delay-300" />

      <div className="container-main relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
            <h1 className="section-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900 tracking-tight">
              Everything You Need,<br />
              <span className="gradient-text">All in One Place.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover everyday essentials, school supplies, household products, toys, gifts and more — all available at Archu Mart, Sakoli.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link to="/shop" className="btn-primary w-full sm:w-auto px-8 py-4 text-lg rounded-full font-medium transition-transform hover:scale-105 shadow-md">
                Shop Now
              </Link>
              <a 
                href="https://wa.me/919356603316" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto px-8 py-4 text-lg rounded-full font-medium flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-md"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Visual pattern representation of categories */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-soft transform rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center p-6">
                 <div className="text-center space-y-4">
                   <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                     <Home size={32} className="text-purple-600" />
                   </div>
                   <h3 className="font-semibold text-gray-800">Household</h3>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-soft transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-10 flex items-center justify-center p-4">
                 <div className="text-center space-y-3">
                   <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                     <Gift size={28} className="text-pink-600" />
                   </div>
                   <h3 className="font-medium text-gray-800">Gifts</h3>
                 </div>
              </div>
               <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-white/60 backdrop-blur-md rounded-3xl border border-white/70 shadow-soft transform -rotate-12 hover:rotate-0 transition-transform duration-500 z-20 flex items-center justify-center p-3">
                 <div className="text-center space-y-2">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                     <BookOpen size={24} className="text-blue-600" />
                   </div>
                   <h3 className="text-sm font-medium text-gray-800">Stationery</h3>
                 </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
