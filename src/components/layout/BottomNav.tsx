// src/components/layout/BottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, TrendingUp, MapPin, Sparkles, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Care', icon: Heart },
  { href: '/insights', label: 'Insights', icon: TrendingUp },
  { href: '/booking', label: 'Booking', icon: MapPin },
  { href: '/baby-mode', label: 'Baby', icon: Sparkles },
  { href: '/profile', label: 'EHR', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-auto m-3 flex w-[calc(100%-24px)] max-w-[416px] gap-0.5 rounded-full border border-white/10 bg-stone-900/95 p-1.5 shadow-2xl shadow-stone-900/30 backdrop-blur-xl">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex flex-1 flex-col items-center gap-0.5 rounded-full px-1 py-2.5 transition-all
                ${active
                  ? 'bg-amber-50 text-stone-900'
                  : 'text-amber-50/60 hover:text-amber-50/90'
                }
              `}
            >
              <Icon size={17} strokeWidth={active ? 2.4 : 2} />
              <span className="text-[10px] font-semibold tracking-tight">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
