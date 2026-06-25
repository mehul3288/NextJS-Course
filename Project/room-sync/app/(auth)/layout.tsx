export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex items-center justify-center p-md overflow-hidden relative">
      {/* Ambient decorative blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      {children}
    </div>
  );
}