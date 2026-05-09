---
title: "I Built a Personal Finance App That Doesn't Touch Your Data"
date: "May 2026"
tag: "Project"
excerpt: "A technical diary of building DKP Finance — a PWA with no backend, Google Sheets as the database, and every financial decision the app made along the way."
readTime: "8 min read"
---

# I Built a Personal Finance App That Doesn't Touch Your Data

It started with distrust.

I'd been using a couple of popular finance apps — the kind you sign up for, link your bank, and hope for the best. They worked fine. But there was always this low-level discomfort: somewhere on a server I've never seen, in a database I'll never inspect, sits every salary credit, every embarrassing impulse purchase, every month I blew the grocery budget. That felt wrong.

So I built my own. This is the story of how it works, the decisions I made, and the things that surprised me along the way.

---

## The Constraint That Shaped Everything

Before writing a single line of code, I made one rule:

> **The app will have no backend. My data stays in my Google account.**

That sounds simple. It isn't. Almost every interesting feature in a finance app — sync, multi-device access, historical data — assumes a server somewhere. Removing the server meant I had to find creative replacements for things I'd been taking for granted.

The answer turned out to be something hiding in plain sight: **Google Sheets**.

---

## Google Sheets as a Database

I know what you're thinking. But hear me out.

Google Sheets gives you a spreadsheet that:
- Lives in your own Google Drive
- Is readable and writable via a REST API
- Has fine-grained OAuth scopes
- Is human-inspectable (you can just... open it and look)

The app creates one spreadsheet — named `DKP Finance - your@email.com` — with tabs for Transactions, Budgets, Goals, NetWorth, Categories, and Settings. Each tab has a header row. The app reads and writes those tabs on sign-in and after changes.

```
Transactions tab:
id | type | amount | group | category | description | date | notes | tags | ...
```

It's not blazing fast. It's not a real database. But for a personal finance app with a few thousand rows at most, it's more than enough — and the user can open their sheet any time and see exactly what the app knows about them.

That last part matters. **Transparency is a feature.**

---

## The OAuth Scope I'm Most Proud Of

When you sign in with Google, apps request scopes — permissions to access parts of your account. Most apps request broad access. I was careful here.

DKP Finance requests:

```
openid, email, profile
https://www.googleapis.com/auth/spreadsheets
https://www.googleapis.com/auth/drive.file
```

That last one — `drive.file` — is the interesting one. It grants access only to files the app itself creates. The app literally cannot see any other file in your Drive. Not your documents, not your photos, not any other spreadsheet. If it didn't create the file, it's invisible.

This isn't just a privacy talking point. It's enforced by Google's API at the scope level. The app is technically incapable of snooping.

---

## Tabs as Schema, Headers as Contracts

One early problem: Google Sheets has no schema enforcement. A row is just a list of values. If I add a new column next week, existing sheets won't have that header.

I solved this with a header-based read pattern. When the app reads a tab, it uses the first row as a key map:

```ts
// Row: ["id", "amount", "description", ...]
// Data rows: ["abc123", "2500", "Groceries", ...]
// Result: { id: "abc123", amount: "2500", description: "Groceries" }
```

This means **additive changes are safe by default** — add a new column to the code, and existing sheets just return `undefined` for that field, which the app handles gracefully. The new column appears in the sheet after the next sync.

For destructive changes — renaming a column, changing a value format — I built a schema versioning system. The Settings tab stores a `schema_version` number. On sign-in, if the sheet version is behind the app version, a migration function runs in memory first, then pushes the upgraded data back. The sheet is never written to before the data is safely transformed.

I genuinely enjoyed this part. It felt like designing a tiny database migration system for a spreadsheet.

---

## The Token Problem

Here's the part that caused the most grief.

The app uses Google Identity Services (GIS) for authentication. GIS gives you an **access token** that expires after one hour. For apps with a backend, this is fine — you store a refresh token on the server and silently get new access tokens forever.

I have no backend. So I only get the access token.

My first approach was lazy: check the token before every sync, refresh it if expired. This worked until it didn't — sometimes the refresh triggered a popup, interrupting the user mid-session. Not great for something supposed to feel like a native app.

The fix was proactive: schedule a refresh **5 minutes before the token expires**. The GIS silent refresh (`prompt: ''`) is truly invisible if the user's Google session cookie is still alive, which it typically is for a few weeks on the same browser.

```ts
const msUntilRefresh = expiry - Date.now() - 5 * 60 * 1000
refreshTimer.current = setTimeout(async () => {
  const { accessToken, expiresIn } = await silentTokenRefresh()
  scheduleTokenRefresh(Date.now() + expiresIn * 1000) // reschedule for new token
}, msUntilRefresh)
```

Now the session stays alive indefinitely on the same browser, self-renewing every hour in the background. After a few weeks of inactivity, or if the user clears cookies, one re-login is required — that's Google's hard limit for apps without a backend, and there's no way around it without a server.

I made peace with that.

---

## Making It a Real App (PWA)

A finance app you can only use at a desk defeats the purpose. I wanted it on my phone, feeling like a native app.

Progressive Web Apps are underrated for this. With `vite-plugin-pwa` and Workbox, I got:

- **Installable** on Android (Chrome → Add to Home Screen) and iOS (Safari → Share → Add to Home Screen)
- **Offline shell** — all JS, CSS, fonts precached at install time
- **Standalone display** — no browser chrome, full screen, dark status bar matching the app
- **Google Fonts cached** for a year (CacheFirst strategy)

The whole PWA config is about 30 lines in `vite.config.ts`. The service worker is generated at build time. It just works.

One thing I learned: iOS is more aggressive than Android about clearing service worker caches if the app isn't used for a few weeks. Budget for that in your UX — don't assume cached assets are always there on iOS.

---

## The Features That Emerged

I started with just transactions and a budget. Then I kept using the app and noticing things I wanted.

**Budget violation history** — not just "are you over this month" but "how many of the last 6 months did you blow this budget?" One line of text: `Over budget 3 of 6 months · avg 112% used`. Simple, but surprisingly useful for spotting patterns you'd otherwise rationalize away month by month.

**Savings transfer exclusion** — early on, my savings rate calculation looked terrible. It was counting money I moved to my own investment account as an expense. Of course the rate looked bad — I was counting saving money as spending it. Fixed by tagging savings-destination categories and filtering them out of expense totals.

**Contextual predictions** — not ML, just arithmetic. Daily burn rate extrapolated to end of month. Three-month moving average per category to flag anomalies (↑23% this month vs average). Savings rate trend (last 3 months vs prior 3). These feel smart but the math is embarrassingly simple.

**No recurring transactions** — I started building a recurring rules engine that auto-populated transactions. Then I removed it. The problem: transactions appearing in your ledger without you explicitly adding them is unsettling in a finance app. Trust matters. The user should always know where every transaction came from.

---

## What I'd Do Differently

**Use the Authorization Code flow with PKCE.** The implicit token flow I'm using is fine but the 1-hour token expiry is a real constraint. With PKCE you get a refresh token and can stay logged in indefinitely — but it technically requires a token exchange endpoint. A single Cloudflare Worker could handle it for pennies a month.

**IndexedDB instead of localStorage.** All data currently lives in `localStorage`, which is synchronous and has a 5-10MB limit. For a few hundred transactions it's fine. For a few years of data, it could get tight.

**Better conflict resolution.** Right now the app does a full push or pull. If you open it on two devices simultaneously and both make changes, last-write-wins. That's fine for a single-user app but fragile.

---

## The Thing I Didn't Expect

I thought the hard part would be the UI — charts, responsive layout, dark mode, themes. It wasn't. The UI was straightforward.

The hard part was **trust**. Specifically, designing every feature so that the user — me, primarily — could trust what the numbers meant. That meant being careful about what counted as income vs savings vs expense. It meant not auto-generating transactions. It meant keeping the data visible and inspectable in a spreadsheet anyone can open.

A finance app that's clever but untrustworthy is worse than useless. Every design decision eventually came back to: *does this make the numbers more or less trustworthy?*

That turned out to be a pretty good question to ask about software in general.

---

**Try it:** The app is live. [Sign in with Google](https://beingdpkpr.github.io/aryas-finance), and your spreadsheet is created in your own Drive — I never see it.

**Ko-fi:** If it saves you money or time, [a coffee is appreciated](https://ko-fi.com/deepakprasad).
