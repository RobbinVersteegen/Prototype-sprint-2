import { Inbox } from 'lucide-react';
import type { ProcessingResult } from '../types';

interface RecentResultsProps {
  results: ProcessingResult[];
  loading: boolean;
  error?: string;
}

const statusClass: Record<string, string> = {
  Verwerkt: 'status-processed',
  'Controle nodig': 'status-review',
  'Niet verwerkt': 'status-skipped',
};

const classificationClass: Record<string, string> = {
  ORDER: 'badge-order',
  GEEN_ORDER: 'badge-no-order',
  ONZEKER: 'badge-uncertain',
};

function displayOptionalValue(value?: string) {
  return value?.trim() || '-';
}

export function RecentResults({ results, loading, error }: RecentResultsProps) {
  return (
    <section className="panel results-panel" id="verwerkingen" aria-labelledby="results-title">
      <div className="panel-heading results-heading">
        <div>
          <p className="eyebrow">ORDERREGISTRATIE</p>
          <h2 id="results-title">Verwerkingen</h2>
        </div>
      </div>

      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">DATUM / TIJD</th>
              <th scope="col">ORDERNUMMER</th>
              <th scope="col">AFZENDER / KLANT</th>
              <th scope="col">MODEL</th>
              <th scope="col">AANTAL</th>
              <th scope="col">CLASSIFICATIE</th>
              <th scope="col">STATUS</th>
              <th scope="col">REDEN</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td className="received-time">{result.receivedAt ?? '—'}</td>
                <td className="order-id"><span className="order-icon"><Inbox size={15} /></span>{result.orderNumber}</td>
                <td>{displayOptionalValue(result.customer)}</td>
                <td>{displayOptionalValue(result.model)}</td>
                <td>{displayOptionalValue(result.quantity)}</td>
                <td>{result.classification ? <span className={`classification-badge ${classificationClass[result.classification]}`}>{result.classification}</span> : '—'}</td>
                <td><span className={`result-status ${statusClass[result.status ?? ''] ?? 'status-new'}`}><span />{result.status ?? '—'}</span></td>
                <td>{result.reason ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error ? (
        <p className="results-empty-state results-error" role="status">{error}</p>
      ) : loading ? (
        <p className="results-empty-state" role="status">Verwerkingsgegevens ophalen...</p>
      ) : results.length === 0 ? (
        <div className="results-empty-state">
          <span className="empty-state-icon"><Inbox size={19} /></span>
          <h3>Nog geen verwerkingsgegevens beschikbaar</h3>
          <p>Verwerkingen worden hier weergegeven zodra de koppeling met de automatisering actief is.</p>
        </div>
      ) : null}
    </section>
  );
}