export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className="flex-shrink-0"
      aria-label="Logo Yakaar Web"
    >
      <rect x="0" y="0" width="200" height="200" rx="54" fill="#123A34"/>
      <path d="M60 59 L100 123 L140 59" stroke="#1FB199" strokeWidth="17" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M100 123 L100 160" stroke="#F2965A" strokeWidth="17" fill="none" strokeLinecap="round"/>
      <circle cx="60" cy="59" r="9" fill="#F2965A"/>
      <circle cx="140" cy="59" r="9" fill="#F2965A"/>
    </svg>
  );
}
