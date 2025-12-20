# Tornado Nation

Mobile-first athletics hub for schedules, game centers, live streams, store/fundraising, history, and community.

## Stack

- Mobile: Expo (React Native) + TypeScript + expo-router
- API: NestJS (REST + GraphQL)
- Shared: `@tornado-nation/shared` (TypeScript types + zod schemas)
- UI: `@tornado-nation/ui` (minimal tokens + primitives)

## Run (Dev)

### 1) API

```bash
pnpm -C apps/api dev
```

- REST base: `http://localhost:3000/v1`
- Swagger: `http://localhost:3000/docs`
- GraphQL: `http://localhost:3000/graphql`

### 2) Mobile

```bash
pnpm -C apps/mobile dev
```

If you want mobile to talk to the API:
- Copy `apps/mobile/.env.example` to `apps/mobile/.env`
- Set `EXPO_PUBLIC_API_BASE_URL` to your dev machine URL (Android emulator often needs `http://10.0.2.2:3000`).

## Information Architecture (Implemented as Placeholder Screens)

Tabs:
- Home
- Teams
- Events
- Live
- Store
- History
- Community
- Profile

## API Entities (Scaffold)

- Sport, Season, Team, Athlete
- Game/Event
- Sponsor
- Product
- Order/Donation

REST endpoints are under `/v1/*` and backed by in-memory repositories (no DB yet).

## Roles (Placeholder)

Auth is scaffolded only.
- Send header `Authorization: Bearer role:Admin` (or `AthleticStaff`, `StoreManager`, `Moderator`, `MediaTeam`, `Student`).
- Create/update/delete endpoints are role-gated; read endpoints are open.

## Roadmap Mapping

- MVP (6–8 weeks): Events, Game Center, Live, basic Store, notifications wiring, CMS wiring, roster import, sponsor placement, branding
- Phase 2: History timeline, athlete profiles, donations, volunteer sign-ups, moderated fan wall
- Phase 3: Stats integrations, season passes, offline mode, NIL-safe features, analytics dashboards

## Copy Blocks

### App Store Description

“Celebrate our legacy. Follow every game. Support our athletes. Watch live streams, track schedules and scores, explore championship history, and gear up with official apparel. Get reminders, buy tickets, and join the community. Download now and never miss a moment.”

### Sponsor Pitch

- Audience: students, families, alumni, fans
- Placements: stream bumpers, hero banners, takeovers, co-brands
- Measurement: impressions, clicks, coupons, reports
- Impact: funds equipment, travel, scholarships

## Next Decisions

- Sports scope
- Streaming setup (YouTube/Vimeo/Twitch/RTMP)
- Ticketing provider
- Store platform (Stripe vs Shopify)
- CMS choice (Contentful/Strapi/Sanity)
