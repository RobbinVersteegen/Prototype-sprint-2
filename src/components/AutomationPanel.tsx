import { ArrowDown, CircleHelp, Mail, PackageCheck, Play, ScanSearch, Sheet, Tags, Workflow } from 'lucide-react';
import type { AutomationTestResult } from '../services/orderAutomationService';

interface AutomationPanelProps {
  testing: boolean;
  result?: AutomationTestResult;
  onTest: () => void;
}

const steps = [
  { label: 'Gmail', icon: Mail },
  { label: 'Make', detail: 'Voert de automatisering op de achtergrond uit', icon: Workflow, active: true },
  { label: 'AI-classificatie', icon: ScanSearch },
  { label: 'ORDER / GEEN_ORDER / ONZEKER', icon: Tags },
  { label: 'Orderregistratie', icon: PackageCheck },
  { label: 'Google Sheets', icon: Sheet },
];

export function AutomationPanel({ testing, result, onTest }: AutomationPanelProps) {
  return (
    <section className="panel automation-panel" id="automatisering" aria-labelledby="automation-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">AUTOMATISERING</p>
          <h2 id="automation-title">Orderautomatisering</h2>
        </div>
        <span className="active-pill"><span className="pulse-dot" /> Actief</span>
      </div>

      <p className="automation-summary">Make voert de automatisering momenteel op de achtergrond uit.</p>

      <div className="automation-flow" aria-label="Gmail via Make naar orderregistratie in Google Sheets">
        {steps.map(({ label, detail, icon: Icon, active }, index) => (
          <div className="flow-step-wrap" key={label}>
            <div className="flow-step">
              <span className="flow-icon"><Icon size={17} /></span>
              <span className="flow-copy">
                <span className="flow-label">{label}</span>
                {detail && <span className="flow-detail">{detail}</span>}
              </span>
              {active && <span className="flow-status">Actief</span>}
            </div>
            {index < steps.length - 1 && <ArrowDown className="flow-connector" size={14} />}
          </div>
        ))}
      </div>

      <div className="outcome-heading">
        <div><h3>AI-classificatie</h3><p>Uitkomsten van de bestaande Make-workflow</p></div>
        <CircleHelp size={17} aria-hidden="true" />
      </div>
      <div className="classification-legend" aria-label="Mogelijke AI-classificaties">
        <span className="classification-badge badge-order">ORDER</span>
        <span className="classification-badge badge-no-order">GEEN_ORDER</span>
        <span className="classification-badge badge-uncertain">ONZEKER</span>
      </div>

      <div className="automation-footer">
        <div className="automation-footnote"><span className="footnote-dot" /> Start via beveiligde server-side API</div>
        <button className="button button-primary" onClick={onTest} disabled={testing}>
          <Play size={15} fill="currentColor" />
          {testing ? 'Automatisering starten...' : 'Automatisering starten'}
        </button>
      </div>
      {result && (
        <div className={`action-feedback automation-feedback ${result.status}`} role="status" aria-live="polite">
          <strong>{result.status === 'success' ? 'Order succesvol verwerkt' : 'Automatisering kon niet worden gestart'}</strong>
          {result.message !== (result.status === 'success' ? 'Order succesvol verwerkt' : 'Automatisering kon niet worden gestart') && (
            <span>{result.message}</span>
          )}
        </div>
      )}
    </section>
  );
}