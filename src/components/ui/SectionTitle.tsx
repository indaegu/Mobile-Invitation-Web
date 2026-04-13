type SectionTitleProps = {
  en: string;
  ko?: string;
};

export default function SectionTitle({ en, ko }: SectionTitleProps) {
  return (
    <div className="text-center mb-10">
      {/* 장식 오너먼트 */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="w-10 h-px bg-gray-200" />
        <span className="text-gray-300 text-xs">✦</span>
        <div className="w-10 h-px bg-gray-200" />
      </div>
      <p className="text-[10px] tracking-[0.45em] text-gray-400 uppercase mb-1.5">
        {en}
      </p>
      {ko && <p className="text-sm text-gray-500 tracking-wider">{ko}</p>}
    </div>
  );
}
