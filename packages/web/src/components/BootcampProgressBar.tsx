'use client';

import { useState } from 'react';
import { PHASE_LABELS, PHASE_ORDER, phaseIndex, phaseProgress } from '@/config/bootcamp-phases';

interface BootcampProgressBarProps {
  phase: string;
  completedAt?: number;
}

export function BootcampProgressBar({ phase, completedAt }: BootcampProgressBarProps) {
  const [expanded, setExpanded] = useState(false);

  const currentIdx = phaseIndex(phase);
  const progress = phaseProgress(phase);
  const isCompleted = Boolean(completedAt);
  const currentLabel = PHASE_LABELS[phase] ?? phase;

  return (
    <div data-testid="bootcamp-progress-bar" className="border-b border-cafe-subtle bg-cafe-surface/30 px-4 py-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between text-xs"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-cafe-interactive">
            训练营 Phase {currentIdx >= 0 ? currentIdx + 1 : '?'}/{PHASE_ORDER.length}
          </span>
          <span className="text-cafe-muted">· {currentLabel}</span>
          {isCompleted && <span className="text-semantic-success">· 已完成</span>}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-cafe-accent">{progress}%</span>
          <span className={`text-cafe-muted transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </button>

      {/* Dots row */}
      <div className="mt-2 flex items-center gap-0.5">
        {PHASE_ORDER.map((p, i) => {
          const isDone = isCompleted || i < currentIdx;
          const isActive = !isCompleted && i === currentIdx;
          const label = PHASE_LABELS[p] ?? p;
          return (
            <div key={p} className="flex items-center flex-1 last:flex-none">
              <div
                title={`Phase ${i + 1}: ${label}`}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-micro font-semibold ${
                  isDone
                    ? 'bg-cafe-accent text-[var(--cafe-surface)]'
                    : isActive
                      ? 'bg-cafe-accent/20 text-cafe-accent animate-pulse'
                      : 'bg-cafe-surface-elevated text-cafe-muted'
                }`}
              >
                {isDone ? '\u2713' : i + 1}
              </div>
              {i < PHASE_ORDER.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${i < currentIdx || isCompleted ? 'bg-cafe-accent' : 'bg-cafe-surface-elevated'}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded: full phase list */}
      {expanded && (
        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
          {PHASE_ORDER.map((p, i) => {
            const isDone = isCompleted || i < currentIdx;
            const isActive = !isCompleted && i === currentIdx;
            const label = PHASE_LABELS[p] ?? p;
            return (
              <div key={p} className="flex items-center gap-1.5 text-micro">
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold ${
                    isDone
                      ? 'bg-cafe-accent text-[var(--cafe-surface)]'
                      : isActive
                        ? 'bg-cafe-accent/30 text-cafe-accent'
                        : 'bg-cafe-surface-elevated text-cafe-muted'
                  }`}
                >
                  {isDone ? '\u2713' : i + 1}
                </span>
                <span
                  className={isDone ? 'text-cafe-interactive' : isActive ? 'text-cafe font-medium' : 'text-cafe-muted'}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
