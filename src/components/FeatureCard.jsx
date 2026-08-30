import React from 'react';

export function FeatureCard({ title, category, date }) {
  return (
    <div
      className="p-6 rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-color)",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "0 10px 25px var(--shadow-color)",
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded"
          style={{
            color: "var(--accent-blue)",
            backgroundColor: "var(--bg-primary)",
          }}
        >
          {category}
        </span>
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          {date}
        </span>
      </div>
      <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
    </div>
  );
}