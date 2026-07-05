export function ImmersiveShowcase() {
  const orbitItems = ['Mock', 'Report', 'Sprint', 'Tuition'];

  return (
    <section className="section overflow-hidden bg-navy text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="badge bg-white/10 text-champagne">Immersive revision journey</span>
          <h2 className="mt-5 text-4xl font-black md:text-6xl">A cinematic GCSE workflow, not a flat worksheet site.</h2>
          <p className="mt-5 text-lg text-blue-100">
            Students move through a premium sequence: diagnostic launch, timed mock room, report reveal, weak-topic sprint, and targeted tuition decision.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['3D-style dashboard depth','Scroll-led product story','Microinteractions on cards','Parent-safe calm motion'].map((item) => (
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4" key={item}>✓ {item}</div>
            ))}
          </div>
        </div>
        <div className="perspective-panel relative min-h-[420px]">
          <div className="absolute inset-8 rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/20 to-white/5 shadow-2xl backdrop-blur animate-float" />
          <div className="absolute left-12 top-16 w-64 rounded-3xl border border-white/20 bg-white p-5 text-navy shadow-2xl rotate-card-left">
            <p className="text-sm font-bold text-royal">Live mock telemetry</p>
            <div className="mt-4 h-3 rounded-full bg-mist"><div className="h-3 w-2/3 rounded-full bg-royal" /></div>
            <p className="mt-4 text-3xl font-black">68%</p>
            <p className="text-sm text-slate-600">Grade 6 trajectory</p>
          </div>
          <div className="absolute bottom-16 right-8 w-72 rounded-3xl border border-white/20 bg-white p-5 text-navy shadow-2xl rotate-card-right">
            <p className="text-sm font-bold text-champagne">Weak-topic orbit</p>
            <div className="relative mt-6 h-44 rounded-full border border-dashed border-royal/40">
              {orbitItems.map((item, index) => (
                <span key={item} className={`orbit-item orbit-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
