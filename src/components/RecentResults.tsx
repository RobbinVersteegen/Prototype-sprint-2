import { ArrowRight, Inbox } from 'lucide-react';
import type { ProcessingResult } from '../types';

interface RecentResultsProps {
  results: ProcessingResult[];
}

const statusClass: Record<ProcessingResult['status'], string> = {
  Verwerkt: 'status-processed',
  'Controle nodig': 'status-review',
  'Niet verwerkt': 'status-skipped',
};

const classificationClass: Record<ProcessingResult['classification'], string> = {
  ORDER: 'badge-order',
  GEEN_ORDER: 'badge-no-order',
  ONZEKER: 'badge-uncertain',
};

export function RecentResults({ results }: RecentResultsProps) {
  return (
    <section className="panel results-panel" id="resultaten" aria-labelledby="results-title">
      <div className="panel-heading results-heading">
        <div>
          <p className="eyebrow">OVERZICHT</p>
          <h2 id="results-title">Recente verwerkingen</h2>
        </div>
        <a href="#resultaten" className="text-link">Alle resultaten <ArrowRight size={15} /></a>
      </div>

      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th scope="col">ORDER</th>
              <th scope="col">CLASSIFICATIE</th>
              <th scope="col">STATUS</th>
              <th scope="col">ONTVANGEN</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td className="order-id"><span className="order-icon"><Inbox size={15} /></span>#{result.id}</td>
                <td><span className={`classification-badge ${classificationClass[result.classification]}`}>{result.classification}</span></td>
                <td><span className={`result-status ${statusClass[result.status]}`}><span />{result.status}</span></td>
                <td className="received-time">{result.receivedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="demo-data-note">Voorbeeldgegevens · nog niet verbonden met een backend</p>
    </section>
  );
}