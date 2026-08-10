import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppChatLink } from '../utils/helpers';

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppChatLink("Hi Archu Mart, I am looking for something...")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex items-center justify-center animate-bounce-gentle"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></div>
      <MessageCircle size={28} className="relative z-10 sm:w-8 sm:h-8" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
        Chat with us
        {/* Tooltip arrow */}
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></span>
      </span>
    </a>
  );
}
