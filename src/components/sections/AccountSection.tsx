'use client'

import { useState } from 'react';
import type { AccountInfo, InvitationData } from '@/types/invitation.type';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type Props = Pick<InvitationData, 'accounts'>;
type Delay = 0 | 100 | 200 | 300 | 400 | 500 | 600;
const STAGGER: Delay[] = [0, 100, 200, 300, 400, 500];

function AccountItem({ account }: { account: AccountInfo }) {
  const [copied, setCopied] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
    } catch {
      const el = document.createElement('input');
      el.value = account.accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setRipple(true);
    setCopied(true);
    setTimeout(() => setRipple(false), 600);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
      <div className="space-y-0.5">
        <p className="text-[11px] text-gray-400 tracking-wide">{account.owner}</p>
        <p className="text-sm font-medium text-gray-700">{account.bank}</p>
        <p className="text-sm text-gray-500 tabular-nums tracking-wider">{account.accountNumber}</p>
      </div>

      <button
        onClick={handleCopy}
        className={`relative overflow-hidden px-4 py-2 text-xs rounded-xl border transition-all duration-300 active:scale-95 min-w-[56px] ${
          copied
            ? 'bg-rose-50 border-rose-200 text-rose-500'
            : 'bg-gray-50 border-gray-200 text-gray-500'
        } ${ripple ? 'copy-ripple' : ''}`}
      >
        {copied ? '복사됨 ✓' : '복사'}
      </button>
    </div>
  );
}

export default function AccountSection({ accounts }: Props) {
  return (
    <section
      id="account"
      className="snap-section min-h-svh flex flex-col justify-center px-8 py-20 bg-white"
    >
      <AnimateOnScroll animation="fade-up">
        <SectionTitle en="Account" ko="마음 전하기" />
      </AnimateOnScroll>

      <div className="space-y-3">
        {accounts.map((account, index) => (
          <AnimateOnScroll
            key={index}
            animation="fade-right"
            delay={STAGGER[Math.min(index, STAGGER.length - 1)]}
          >
            <AccountItem account={account} />
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
