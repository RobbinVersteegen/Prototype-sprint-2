# Order Automation prototype

Een studieprototype voor een dashboard rond geautomatiseerde orderverwerking met Gmail, AI en Google Sheets. De Make-verbindingstest loopt via een server-side Vercel API-route.

## Lokaal starten

```bash
npm install
npm run dev
```

Vite toont daarna de lokale URL in de terminal (standaard `http://localhost:5173`).
`npm run dev` start alleen de frontend; de Vercel API-functie draait op de Vercel-deployment. Voor een lokale API-test is ook de Vercel CLI nodig (`vercel dev`) en een niet-gecommitte `.env.local` met `MAKE_WEBHOOK_URL`.

## Controleren

```bash
npm run typecheck
npm run build
```

## Structuur en toekomstige Make-koppeling

- `src/components/` bevat de UI-onderdelen.
- `src/services/processingResultsService.ts` haalt resultaten op via `GET /api/processing-results`; zonder die backend-route blijft de lijst leeg.
- `src/services/orderAutomationService.ts` roept vanuit de frontend `POST /api/test-make` aan.
- `api/test-make.ts` stuurt de testpayload server-side door naar de Make-webhook.
- `src/types.ts` bevat de gedeelde gegevensvormen.

De webhook-URL staat uitsluitend in de server-side environment variable `MAKE_WEBHOOK_URL`. Voeg die in Vercel toe bij **Project Settings → Environment Variables** voor de omgevingen waarin je wilt testen en deploy daarna opnieuw. Zet de waarde niet in een `VITE_`-variabele of frontendcode.

## Vercel

Deploy de bestaande Vite-app met `npm run build` als build command en `dist` als output directory. Vercel herkent `api/test-make.ts` als serverless function naast de statische frontend.

Om de verbinding te testen:

1. Zet het Make Custom Webhook-scenario aan en controleer dat Webhook Response JSON terugstuurt.
2. Voeg in Vercel `MAKE_WEBHOOK_URL` toe met de Custom Webhook-URL als waarde. Selecteer ten minste Production of Preview, afhankelijk van je testdeployment.
3. Deploy de app opnieuw zodat de functie de environment variable ontvangt.
4. Open de deployment, klik op **Automatisering testen** en controleer de succes- of foutmelding. Bij succes kun je onder **Antwoord van Make** het ontvangen JSON-antwoord bekijken.

De Make-webhook ontvangt `{ "action": "test_connection", "source": "order-automation-dashboard" }`. De webhook-URL wordt nooit naar de browser gestuurd.