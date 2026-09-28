import { Mail, Sheet, Workflow } from 'lucide-react';
import type { ConnectionProvider } from '../types';

interface ConnectionCardProps {
  provider: ConnectionProvider;
  description: string;
}

export function ConnectionCard({ provider, description }: ConnectionCardProps) {
  const Icon = provider === 'Gmail' ? Mail : Sheet;

  return (
    <article className="connection-card">
      <div className={`service-icon ${provider === 'Gmail' ? 'gmail-icon' : 'sheets-icon'}`}>
        <Icon size={21} strokeWidth={1.9} />
      </div>
      <div className="connection-content">
        <div className="connection-heading">
          <h3>{provider}</h3>
          <span className="connection-status via-make-status"><Workflow size={13} strokeWidth={2.2} /> Via Make</span>
        </div>
        <p>{description}</p>
        <div className="connection-route"><Workflow size={13} /> Bestaande Make-workflow</div>
      </div>
    </article>
  );
}