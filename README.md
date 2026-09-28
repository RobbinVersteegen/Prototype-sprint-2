# Order Automation prototype

Een studieprototype voor een dashboard rond geautomatiseerde orderverwerking met Gmail, AI en Google Sheets. De knoppen en koppelingen zijn bewust demo's; er worden geen echte accounts of externe diensten aangeroepen.

## Lokaal starten

```bash
npm install
npm run dev
```

Vite toont daarna de lokale URL in de terminal (standaard `http://localhost:5173`).

## Controleren

```bash
npm run typecheck
npm run build
```

## Structuur en toekomstige Make-koppeling

- `src/components/` bevat de UI-onderdelen.
- `src/components/` bevat de dashboardonderdelen en de lege resultatenstaat.
- `src/services/processingResultsService.ts` haalt resultaten op via `GET /api/processing-results`; zonder die backend-route blijft de lijst leeg.
- `src/services/orderAutomationService.ts` toont tot de backend bestaat dat de test niet is gekoppeld. Het aansluitpunt is `POST /api/automation/test`.
- `src/types.ts` bevat de gedeelde gegevensvormen.

Vervang later de demo-service door requests vanuit de frontend naar een eigen backend/API. Laat die server-side API met Make praten en bewaar webhook-URL's, sleutels en Google/Gmail-gegevens uitsluitend in server-side environment variables. Zet ze niet in `VITE_`-variabelen of frontendcode.

## Vercel

Dit is een statische Vite-app en kan op Vercel worden gedeployed met `npm run build` als build command en `dist` als output directory. Voeg geen geheime Make- of Google-waarden toe aan de frontend deployment.