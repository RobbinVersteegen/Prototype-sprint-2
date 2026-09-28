import { Check, ExternalLink, Mail, RefreshCw, Sheet } from 'lucide-react';
import type { ConnectionProvider } from '../types';
import type { ConnectionTestResult } from '../services/connectionService';

interface ConnectionCardProps {
  provider: ConnectionProvider;
  description: string;
  testing: boolean;
  result?: ConnectionTestResult;
  onTest: (provider: ConnectionProvider) => void;
}

export function ConnectionCard({ provider, description, testing, result, onTest }: ConnectionCardProps) {
  const Icon = provider === 'Gmail' ? Mail : Sheet;

  return (
    <article className="connection-card">
      <div className={`service-icon ${provider === 'Gmail' ? 'gmail-icon' : 'sheets-icon'}`}>
        <Icon size={21} strokeWidth={1.9} />
      </div>
      <div className="connection-content">
        <div className="connection-heading">
          <h3>{provider}</h3>
          <span className="connection-status"><Check size={13} strokeWidth={2.7} /> Gekoppeld</span>
        </div>
        <p>{description}</p>
        <div className="connection-actions">
          <button className="button button-secondary button-small" onClick={() => onTest(provider)} disabled={testing}>
            <RefreshCw size={14} className={testing ? 'spin' : undefined} />
            {testing ? 'Bezig...' : 'Verbinding testen'}
          </button>
          <span className="demo-label"><ExternalLink size={12} /> Demo</span>
        </div>
        {result && <p className="action-feedback" role="status">{result.message}</p>}
      </div>
    </article>
  );
}