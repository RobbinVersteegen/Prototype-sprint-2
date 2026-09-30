# Order Automation prototype

Een studieprototype voor een dashboard rond geautomatiseerde orderverwerking met Gmail, AI en Google Sheets. De Make-automatisering wordt gestart via een server-side Vercel API-route.

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

Om de automatisering te starten:

1. Zet het Make Custom Webhook-scenario aan. Een succesvolle HTTP 2xx-response is voldoende; er is geen specifieke JSON-response nodig.
2. Voeg in Vercel `MAKE_WEBHOOK_URL` toe met de Custom Webhook-URL als waarde. Selecteer ten minste Production of Preview, afhankelijk van je testdeployment.
3. Deploy of redeploy de app nadat je code of environment variables hebt aangepast.
4. Open de deployment en klik op **Automatisering starten**. Een succesmelding betekent dat Make de aanvraag heeft geaccepteerd; het garandeert niet dat een order volledig is verwerkt.

De Make-webhook ontvangt `{ "action": "test_connection", "source": "order-automation-dashboard" }`. De webhook-URL wordt nooit naar de browser gestuurd.