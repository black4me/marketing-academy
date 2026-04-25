import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center fade-in">
      <div className="text-7xl font-bold text-white mb-4">٤٠٤</div>
      <div className="text-zinc-400 text-lg mb-6">الصفحة التي تبحث عنها غير موجودة</div>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
