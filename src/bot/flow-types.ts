/**
 * Declarative conversation flow primitives.
 *
 * A Flow is an ordered list of Steps. The engine walks them, prompting
 * the customer, validating their reply, saving it under `save`, and moving
 * to the next step until completion. Steps are pure data — no side effects —
 * which makes flows trivial to test, compose, and reorder.
 */

import type { Button, ListSection, OutgoingMessage } from '@/messaging/types';

export type FlowData = Record<string, any>;

export type StepContext = {
  data: FlowData;
  customer: { phone: string; name?: string | null };
};

type Base = { id: string };

export type StepText = Base & {
  type: 'text';
  prompt: string | ((ctx: StepContext) => string);
  save: string;
  validate?: (input: string) => string | null; // returns error message or null
  optional?: boolean;
};

export type StepButtons = Base & {
  type: 'buttons';
  prompt: string | ((ctx: StepContext) => string);
  save: string;
  buttons: Button[];
  /** Optional branch: jump to a different step id based on the chosen button id. */
  branch?: Record<string, string>;
};

export type StepList = Base & {
  type: 'list';
  prompt: string | ((ctx: StepContext) => string);
  buttonText?: string;
  save: string;
  sections: ListSection[];
  branch?: Record<string, string>;
};

export type StepMultiSelect = Base & {
  type: 'multiselect';
  prompt: string | ((ctx: StepContext) => string);
  save: string; // saved as string[]
  options: Button[];
  doneTitle?: string; // default "Done ✅"
  doneId?: string;    // default "__done"
};

export type StepMedia = Base & {
  type: 'media';
  prompt: string | ((ctx: StepContext) => string);
  save: string;
  optional?: boolean;
  skipTitle?: string; // default "Skip"
};

export type StepInfo = Base & {
  type: 'info';
  message: (ctx: StepContext) => OutgoingMessage | OutgoingMessage[];
};

/** Terminal step — produces a Ticket and notifies the team. */
export type StepSubmit = Base & {
  type: 'submit';
  ticketType: string;
  title: (ctx: StepContext) => string;
  /** Build the customer-facing confirmation message. */
  summary: (ctx: StepContext, ref: string) => string;
};

/** Jump to another flow (e.g. main menu). */
export type StepGoto = Base & {
  type: 'goto';
  flowId: string;
  stepId?: string;
};

export type Step =
  | StepText
  | StepButtons
  | StepList
  | StepMultiSelect
  | StepMedia
  | StepInfo
  | StepSubmit
  | StepGoto;

export type Flow = {
  id: string;
  title: string;
  steps: Step[];
};
