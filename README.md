# Kuwex WhatsApp Commerce & Automation Platform

Production-ready WhatsApp Business automation system for **Kuwex Studios** —
welcomes customers, qualifies leads, captures service requests, generates
ticket references, notifies the team, and gives staff a clean admin
dashboard to manage the pipeline.

> Phase 1 ships a **provider-agnostic conversation engine**, a **web-based
> WhatsApp simulator** (test every flow without Twilio approval), a
> **Twilio WhatsApp adapter** for production, and a **Next.js admin
> dashboard** with leads, tickets, and conversations.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Prisma** + **PostgreSQL** (or SQLite for instant local dev)
- **TailwindCSS** + custom WhatsApp-style UI
- **Twilio** WhatsApp Business API (swappable adapter)
- **Declarative flow engine** — every service flow is just data

---

## Architecture

```
Twilio WhatsApp ──┐
                  ├──► /api/twilio/webhook ──┐
Web Simulator ────┴──► /api/simulator/send ──┴──► bot/engine.ts
                                                     │
                              ┌──── flows/* (declarative steps)
                              ├──── session.ts (Postgres-backed state)
                              └──── messaging/ (Twilio | Simulator adapter)
                                            │
                                            ▼
                              Customer / Session / Message / Ticket / Lead
                                            │
                                            ▼
                                   Admin Dashboard (/admin)
```

### Conversation engine (`src/bot/engine.ts`)

1. Loads/creates `Customer` + `Session` from Postgres.
2. Detects global keywords (`menu`, `agent`, `restart`).
3. Resolves the active `Flow` and current `Step`.
4. Validates the customer reply, persists collected data on the session.
5. Branches, advances, or **submits** — creating a `Ticket` + `Lead`,
   notifying admin, and sending a confirmation message.

### Flows are declarative

Every service is just a typed array of `Step`s — see
`src/bot/flows/website.ts` for the canonical example.
Add a new service in ~30 lines: write a flow file, register it in
`src/bot/flows/index.ts`, and add a menu entry in `src/config/kuwex.ts`.

### Provider-agnostic messaging

`MessagingAdapter` is a tiny interface (`send(to, OutgoingMessage)`).
Two implementations ship today:

- **Simulator** — writes to DB so the `/simulator` UI renders the chat.
- **Twilio** — POSTs to the Twilio REST API. Buttons & lists render as
  numbered text (works in the sandbox + every WhatsApp number); upgrade
  to Content Templates later for native interactive buttons.

Switch via `MESSAGING_PROVIDER=twilio` in `.env`.

---

## Getting started

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
copy .env.example .env       # Windows
# or:  cp .env.example .env
```

For the fastest local dev, use SQLite:

1. Edit `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```
   And remove `String[]` defaults (SQLite doesn't support arrays — change
   `tags String[] @default([])` to `tags String? @default("")`).

Or use Postgres locally / on Render / Neon and keep `DATABASE_URL` as-is.

### 3. Initialise the database

```bash
npm run db:push
npm run db:generate
```

### 4. Run dev server

```bash
npm run dev
```

Open:

- **http://localhost:3000** — landing page
- **http://localhost:3000/simulator** — WhatsApp-style chat tester
- **http://localhost:3000/admin** — admin dashboard
- **http://localhost:3000/admin/tickets** / `/leads` / `/conversations`

### 5. Test every flow

In the simulator, type `Hi` to load the welcome menu. Tap any service to
walk that flow end-to-end. Every submission creates a ticket — verify in
`/admin/tickets`.

---

## Going live with Twilio

1. Sign up at [twilio.com](https://www.twilio.com/) and join the
   **WhatsApp Sandbox** (or request your own WhatsApp Sender).
2. In `.env`:
   ```bash
   MESSAGING_PROVIDER=twilio
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxx
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   ADMIN_NOTIFY_PHONE=+263719066891
   NEXT_PUBLIC_APP_URL=https://your-deployed-url
   ```
3. Deploy (Vercel / Render / Railway).
4. In Twilio Console → Messaging → WhatsApp Sandbox / Sender →
   **"When a message comes in"**, set:
   ```
   POST  https://your-deployed-url/api/twilio/webhook
   ```
5. From your phone, send the sandbox join code to `+1 415 523 8886`,
   then send `Hi`. The bot replies on real WhatsApp.

---

## Configuring branding & services

All copy lives in **`src/config/kuwex.ts`** — company info, services,
budget tiers, timelines. Edit and refresh; no engine changes needed.

For a new service flow:

1. Create `src/bot/flows/myflow.ts` (copy `branding.ts` as a template).
2. Register in `src/bot/flows/index.ts`.
3. Add the menu entry in `SERVICES` (`src/config/kuwex.ts`) and a
   `branch` mapping in `src/bot/flows/main.ts`.

---

## Roadmap (Phase 2+)

- Twilio Content Templates for native interactive buttons
- AI fallback (OpenAI) for free-text questions
- WhatsApp media handling (S3 / Cloudinary)
- Admin auth + role-based access
- Real-time conversation view with manual reply
- Analytics dashboard (conversion rate, drop-off per step)
- Payment integration (Paynow / Stripe)
- Multi-tenant SaaS architecture
- Voice note transcription + understanding

---

## Project layout

```
src/
  config/kuwex.ts              # brand + services + budgets
  lib/                         # db client, id generator, helpers
  messaging/
    types.ts                   # OutgoingMessage primitives
    twilio.ts                  # Twilio adapter
    simulator.ts               # in-memory adapter (DB-backed)
    index.ts                   # provider switcher
  bot/
    flow-types.ts              # Flow / Step types
    engine.ts                  # the heart — see top of file
    session.ts                 # Postgres session helpers
    copy.ts                    # shared message strings
    flows/
      main.ts                  # welcome + main menu
      website.ts marketing.ts branding.ts ai.ts
      whatsapp-automation.ts seo.ts social.ts
      quote.ts portfolio.ts handover.ts
      common.ts                # reusable steps (budget/timeline/etc.)
      index.ts                 # flow registry
  app/
    page.tsx                   # landing
    simulator/page.tsx         # WhatsApp-style chat tester
    admin/                     # dashboard
    api/twilio/webhook         # Twilio inbound webhook
    api/simulator/             # simulator send / history / reset
prisma/schema.prisma
```

---

## License

© Kuwex Studios. All rights reserved.
