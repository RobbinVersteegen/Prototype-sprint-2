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
- `src/data/demoResults.ts` bevat de drie losse voorbeeldresultaten.
- `src/services/connectionService.ts` bevat de demo-acties voor Gmail en Sheets.
- `src/services/orderAutomationService.ts` is het aansluitpunt voor de automatiseringstest.
- `src/types.ts` bevat de gedeelde gegevensvormen.

Vervang later de demo-service door requests vanuit de frontend naar een eigen backend/API. Laat die server-side API met Make praten en bewaar webhook-URL's, sleutels en Google/Gmail-gegevens uitsluitend in server-side environment variables. Zet ze niet in `VITE_`-variabelen of frontendcode.

## Vercel

Dit is een statische Vite-app en kan op Vercel worden gedeployed met `npm run build` als build command en `dist` als output directory. Voeg geen geheime Make- of Google-waarden toe aan de frontend deployment.