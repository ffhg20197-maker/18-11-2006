export function summarizePipeline(phases) {
  const completed = phases.filter((phase) => phase.completed).length;
  return { completed, total: phases.length, percentage: phases.length ? Math.round((completed / phases.length) * 100) : 0 };
}

export function isSupportedNodeVersion(version) {
  return [18, 20, 22].includes(Number(version));
}

const phases = [
  { name: "Checkout", completed: true },
  { name: "Environment", completed: true },
  { name: "Dependencies", completed: true },
  { name: "Verification", completed: true }
];

if (typeof document !== "undefined") {
  document.documentElement.dataset.pipeline = summarizePipeline(phases).percentage === 100 ? "ready" : "pending";

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.main-nav a').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
}
