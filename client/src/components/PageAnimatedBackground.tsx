import { Interactive3DBg } from './Interactive3DBg';

export function PageAnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <Interactive3DBg variant="hex-grid" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0596690d_1px,transparent_1px),linear-gradient(to_bottom,#0596690d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#10b98112_1px,transparent_1px),linear-gradient(to_bottom,#10b98112_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute top-[5%] -left-48 w-[680px] h-[680px] bg-emerald-500/10 dark:bg-emerald-500/20 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute top-[42%] -right-52 w-[720px] h-[720px] bg-teal-500/10 dark:bg-teal-500/15 blur-[170px] rounded-full" />
      <div className="absolute bottom-[2%] left-1/4 w-[600px] h-[600px] bg-emerald-400/10 dark:bg-emerald-600/15 blur-[160px] rounded-full animate-pulse" />
    </div>
  );
}
