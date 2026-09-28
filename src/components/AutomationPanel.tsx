import { ArrowUpRight, Check, CircleHelp, Mail, Play, ScanSearch, Sheet } from 'lucide-react';
import type { AutomationTestResult } from '../services/orderAutomationService';

interface AutomationPanelProps {
  testing: boolean;
  result?: AutomationTestResult;
  onTest: () => void;
}

const steps = [
  { label: 'Automatisch e-mails controleren', icon: Mail },
  { label: 'AI-classificatie', icon: ScanSearch },
  { label: 'Automatische orderregistratie', icon: Sheet },
];

export function AutomationPanel({ testing, result, onTest }: AutomationPanelProps) {
  return (
    <section className="panel automation-panel" id="automatisering" aria-labelledby="automation-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">AUTOMATISERING</p>
          <h2 id="automation-title">Orderverwerking</h2>
        </div>
        <span className="active-pill"><span className="pulse-dot" /> Actief</span>
      </div>

      <div className="automation-flow" aria-label="Actieve automatiseringsstappen">
        {steps.map(({ label, icon: Icon }, index) => (
          <div className="flow-step-wrap" key={label}>
            <div className="flow-step">
              <span className="flow-icon"><Icon size={17} /></span>
              <span className="flow-label">{label}</span>
              <span className="flow-status"><Check size={13} /> Actief</span>
            </div>
            {index < steps.length - 1 && <span className="flow-connector" />}
          </div>
        ))}
      </div>

      <div className="outcome-heading">
        <div>
          <h3>AI-classificatie</h3>
          <p>Elke e-mail krijgt een van deze uitkomsten</p>
        </div>
        <CircleHelp size={17} aria-hidden="true" />
      </div>

      <div className="outcome-list">
        <div className="outcome-row">
          <span className="classification-badge badge-order">ORDER</span>
          <span className="outcome-description">Bestelling herkend en automatisch verwerken.</span>
          <ArrowUpRight className="outcome-arrow" size={16} />
        </div>
        <div className="outcome-row">
          <span className="classification-badge badge-no-order">GEEN_ORDER</span>
          <span className="outcome-description">Geen bestelling en dus niet registreren.</span>
          <ArrowUpRight className="outcome-arrow" size={16} />
        </div>
        <div className="outcome-row">
          <span className="classification-badge badge-uncertain">ONZEKER</span>
          <span className="outcome-description">AI heeft onvoldoende zekerheid. Menselijke controle is nodig.</span>
          <ArrowUpRight className="outcome-arrow" size={16} />
        </div>
      </div>

      <div className="automation-footer">
        <div className="automation-footnote"><span className="footnote-dot" /> Laatst getest: vandaag, 10:42</div>
        <button className="button button-primary" onClick={onTest} disabled={testing}>
          <Play size={15} fill="currentColor" />
          {testing ? 'Test wordt uitgevoerd...' : 'Automatisering testen'}
        </button>
      </div>
      {result && <p className="action-feedback automation-feedback" role="status">{result.message}</p>}
    </section>
  );
}