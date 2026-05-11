/**
 * Provider-agnostic messaging primitives.
 * Renderers (Twilio / Simulator) translate these into concrete messages.
 */

export type Button = { id: string; title: string };
export type ListItem = { id: string; title: string; description?: string };
export type ListSection = { title: string; items: ListItem[] };

export type OutgoingMessage =
  | { kind: 'text'; body: string }
  | { kind: 'buttons'; body: string; header?: string; footer?: string; buttons: Button[] }
  | { kind: 'list'; body: string; header?: string; footer?: string; buttonText: string; sections: ListSection[] }
  | { kind: 'media'; mediaUrl: string; caption?: string };

export type IncomingMessage = {
  from: string;          // E.164 phone, no "whatsapp:" prefix
  text?: string;         // freeform text or button title
  payloadId?: string;    // button.id or list-item.id when an interactive reply is sent
  mediaUrl?: string;     // attached media URL (if any)
  providerId?: string;   // upstream message ID
};

export interface MessagingAdapter {
  name: string;
  send(to: string, message: OutgoingMessage): Promise<{ providerId?: string }>;
}
