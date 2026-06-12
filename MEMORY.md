# Project Memory

This file serves as the permanent memory for the development of this project. It is updated incrementally at the end of each session with key decisions, learnings, and next steps.

---

## 2026-06-12 - W5: Sanity CMS integration (full site)
- **Context/Git Branch**: A1,A3 (Next.js 16 + Turbopack, React 19, Tailwind 4, shadcn/ui; Sanity project f38z4hpw, dataset production)
- **Key Files Modified**:
  - [sanity.config.ts](sanity.config.ts) - Studio embedded config + struttura singleton
  - [src/sanity/schemas/](src/sanity/schemas/) - schema: servizio, caseStudy, siteSettings, homepage, chiSiamo, contattiPage
  - [src/sanity/queries.ts](src/sanity/queries.ts) - GROQ + fetch (revalidate 3600)
  - [src/sanity/types.ts](src/sanity/types.ts) - tipi TS allineati alla nullabilità schema
  - [src/app/(site)/page.tsx](src/app/(site)/page.tsx), [chi-siamo](src/app/(site)/chi-siamo/page.tsx), [contatti](src/app/(site)/contatti/page.tsx), [servizi](src/app/(site)/servizi/page.tsx), [case-study](src/app/(site)/case-study/page.tsx) - server component async da Sanity
  - [src/components/layout/navbar.tsx](src/components/layout/navbar.tsx), [footer.tsx](src/components/layout/footer.tsx) - leggono siteSettings
  - [src/app/api/contact/route.ts](src/app/api/contact/route.ts) - invio email Brevo, hardened
  - [src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts) - webhook ISR on-demand
  - [src/lib/contact.ts](src/lib/contact.ts), [src/components/contact-form-full.tsx](src/components/contact-form-full.tsx), [contact-form-preview.tsx](src/components/contact-form-preview.tsx)

### Key Decisions & Architecture
- **Singleton pattern per le pagine**: siteSettings/homepage/chiSiamo/contattiPage sono document singleton. `create_documents` MCP NON rispetta `_id` custom (id random), quindi la struttura Studio usa liste per-tipo con creazione/eliminazione disabilitata invece di `documentId` fisso. Il frontend interroga sempre con `*[_type=="X"][0]`.
- **Single source of truth per servizi/case study**: home e pagine dedicate riusano gli stessi documenti `servizio`/`caseStudy`. `servizio` esteso con `icona` (stringa da lista) + `descrizione_breve` per la preview home, evitando duplicazione.
- **Icone non serializzabili**: le icone lucide restano mappe `Record<string, ReactNode>` nel codice; Sanity salva solo l'id stringa, con fallback se id sconosciuto.
- **Immagini**: image field editabili in Studio; fallback ai path statici (/hero.jpg, /images/sede.jpg, /logo.svg) finché non si caricano asset. Array (team, loghi) senza fallback.
- **Schema MCP vs Studio locale**: i file schema locali (ricchi: groups/preview) alimentano lo Studio embedded; la dichiarazione passata a `deploy_schema` MCP è semplificata (solo campi + validation) per validare i documenti creati via MCP. Tenere i due in sync manualmente.
- **Contatti split**: pagina server (fetch) + `ContactFormFull` client; opzioni servizio/urgenza da Sanity.
- **Revalidation**: ISR 1h come fallback + webhook Sanity verso /api/revalidate con secret che fa revalidatePath di /, /servizi, /case-study, /chi-siamo, /contatti.

### Challenges & Solutions
- **Build Vercel rotto (createContext is not a function)**: lo Studio montava `NextStudio` in un Server Component. Soluzione: `page.tsx` ri-esporta da `Studio.tsx` marcato `'use client'`. Causa radice reale: il fix era in working tree ma NON committato/pushato — Vercel builda solo ciò che è su git.
- **CORS Studio su Vercel**: aggiunto origin `https://*.vercel.app` (oltre a localhost:3000) via MCP add_cors_origin.
- **TS narrowing su campi nullable**: `metriche?.length > 0` non restringe per il `.map` interno → usare `metriche && metriche.length > 0`.
- **npm install bloccato**: il dev server in esecuzione locka i file .vite di Turbopack → fermare il server prima di installare.
- **Email/HTML injection nell'API contatti**: tutti i campi utente interpolati in HTML email → aggiunto escape HTML, validazione tipo/regex/lunghezza, honeypot anti-spam, status 400/502 corretti.

### Key Takeaways & Future Lessons
- **Per questo progetto**: il path reale del progetto è la sottocartella `PiP---AI-Website-Template/PiP---AI-Website-Template/`. Branch attivo `A1,A3` (la virgola nel nome richiede quoting in git/CLI). Commit message via file (`-F`) su Windows/PowerShell: le here-string con apostrofi/parentesi rompono il parsing.
- **Per progetti futuri (Sanity MCP)**: `create_documents` ignora `_id` (no singleton a id fisso); usare `edit_document` (set, create-if-missing su published→draft) per modifiche mirate; array items richiedono `_key` manuale; `deploy_schema` non ammette `prepare`/funzioni (solo validation arrow). Workspace MCP-managed: non mischiare con `npx sanity schema deploy`.
- **Sanity images in Next**: aggiungere `cdn.sanity.io` a `next.config.ts` remotePatterns; URL via GROQ `immagine.asset->url`.

### Next Steps
- [ ] Caricare gli asset immagine reali dallo Studio (logo, hero, foto team, loghi clienti, sede)
- [ ] Rate limiting su /api/contact (richiede store esterno: Vercel KV / Upstash)
- [ ] Ruotare il secret del webhook revalidate (a1-revalidate, esposto in chat)
- [ ] Verificare env vars Sanity/Brevo su Vercel (NEXT_PUBLIC_SANITY_*, BREVO_*)
- [ ] Eventuale ripristino dei servizi originali (CNC/Stampaggio) rimossi durante i test Studio
- [ ] Aggiungere `CONTACT_TO_EMAIL` se in futuro mittente Brevo e destinatario devono essere separati

---

## 2026-06-12 - W5 sub-session: Brevo bootstrap + linter incident

### Key Files Modified
- [src/app/api/contact/route.ts](src/app/api/contact/route.ts) - creato da zero (chiamata HTTP diretta a Brevo, no SDK)
- [src/lib/contact.ts](src/lib/contact.ts) - helper condiviso `submitContactForm`; creato per risolvere un import fantasma introdotto dal linter
- [src/components/contact-form-preview.tsx](src/components/contact-form-preview.tsx) - estratto come client component (homepage rimane server component)
- [src/app/(site)/contatti/page.tsx](src/app/(site)/contatti/page.tsx) - form aggiornato a POST JSON su /api/contact
- [.env.local](.env.local) - aggiunte BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME (senza NEXT_PUBLIC_)

### Key Decisions
- **Nessun SDK Brevo**: chiamata `fetch` nativa a `api.brevo.com/v3/smtp/email`; evita dipendenza aggiuntiva
- **CONTACT_TO_EMAIL non aggiunto**: mail destinata a BREVO_SENDER_EMAIL; separazione mittente/destinatario rinviata a quando necessario
- **Variabili server-side**: nessun prefisso NEXT_PUBLIC_ sulle credenziali Brevo

### Challenges & Solutions
- **Linter refactor silenzioso**: il linter ha modificato autonomamente entrambi i form per usare `submitContactForm` da `@/lib/contact` (file non ancora esistente) → errore 500 in test. Soluzione: creato `src/lib/contact.ts` con la logica fetch condivisa, honeypot filter incluso.
