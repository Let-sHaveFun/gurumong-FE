export function MobileLayoutWithoutNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-full bg-white shadow-lg max-w-[393px] min-h-screen flex flex-col">{children}</div>
    </div>
  );
}
