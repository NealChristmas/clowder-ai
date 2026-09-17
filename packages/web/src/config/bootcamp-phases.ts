/**
 * F087: Shared bootcamp phase constants.
 * Used by BootcampProgressBar and BootcampListModal.
 */

export const PHASE_LABELS: Record<string, string> = {
  'phase-1-intro': '自我介绍',
  'phase-2-env-check': '环境检测',
  'phase-3-config-help': '配置帮助',
  'phase-4-task-select': '选择任务',
  'phase-5-kickoff': '确认需求',
  'phase-6-design': '设计',
  'phase-7-dev': '开发',
  'phase-7.5-add-teammate': '添加队友',
  'phase-8-collab': '多猫协作',
  'phase-9-complete': '完成',
  'phase-10-retro': '回顾',
  'phase-11-farewell': '毕业',
};

export const PHASE_ORDER = [
  'phase-1-intro',
  'phase-2-env-check',
  'phase-3-config-help',
  'phase-4-task-select',
  'phase-5-kickoff',
  'phase-6-design',
  'phase-7-dev',
  'phase-7.5-add-teammate',
  'phase-8-collab',
  'phase-9-complete',
  'phase-10-retro',
  'phase-11-farewell',
] as const;

export function phaseProgress(phase: string | undefined): number {
  if (!phase) return 0;
  const idx = phaseIndex(phase);
  if (idx < 0) return 0;
  return Math.round(((idx + 1) / PHASE_ORDER.length) * 100);
}

export function phaseIndex(phase: string | undefined): number {
  if (!phase) return -1;
  return PHASE_ORDER.indexOf(phase as (typeof PHASE_ORDER)[number]);
}
