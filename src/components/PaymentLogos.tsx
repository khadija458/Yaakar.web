import React from 'react';

// Official Wave Logo Badge
export function WaveLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-full bg-[#00C3FF] p-1 flex items-center justify-center shadow-md flex-shrink-0 ${className}`}>
      <svg className="w-full h-full text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wave Penguin / Waves Vector */}
        <path d="M16 4C9.37 4 4 9.37 4 16C4 22.63 9.37 28 16 28C22.63 28 28 22.63 28 16C28 9.37 22.63 4 16 4ZM10 18C10 15 13 14 16 14C19 14 22 15 22 18C22 21 19 23 16 23C13 23 10 21 10 18ZM16 7C17.66 7 19 8.34 19 10C19 11.66 17.66 13 16 13C14.34 13 13 11.66 13 10C13 8.34 14.34 7 16 7Z" fill="white"/>
      </svg>
    </div>
  );
}

// Official Orange Money Badge
export function OrangeMoneyLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-[#FF6600] p-1 flex items-center justify-center shadow-md flex-shrink-0 text-white font-extrabold text-[10px] tracking-tighter ${className}`}>
      <div className="flex flex-col items-center justify-center leading-none">
        <span className="text-[11px] font-black">OM</span>
      </div>
    </div>
  );
}

// Official Free Money Logo Badge
export function FreeMoneyLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-[#E2001A] p-1 flex items-center justify-center shadow-md flex-shrink-0 text-white font-black text-[10px] ${className}`}>
      <span>Free</span>
    </div>
  );
}

// Official Visa & Mastercard Logo Badge
export function VisaMastercardLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-gradient-to-r from-[#1A1F71] to-[#EB001B] p-1 flex items-center justify-center shadow-md flex-shrink-0 ${className}`}>
      <div className="flex items-center -space-x-1">
        <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B]/90"></div>
      </div>
    </div>
  );
}

// Official PayPal Logo Badge
export function PayPalLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-[#003087] p-1 flex items-center justify-center shadow-md flex-shrink-0 ${className}`}>
      <span className="font-black italic text-white text-xs text-[#0079C1]">P</span>
    </div>
  );
}

// Official Wise Logo Badge
export function WiseLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`rounded-lg bg-[#9FE870] p-1 flex items-center justify-center shadow-md flex-shrink-0 text-[#163300] font-black text-xs ${className}`}>
      <span>W</span>
    </div>
  );
}
