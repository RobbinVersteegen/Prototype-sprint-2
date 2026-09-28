import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Bell, ChevronDown, Clock3, Mail, PackageCheck, ShieldCheck } from 'lucide-react';
import { AutomationPanel } from './components/AutomationPanel';
import { ConnectionCard } from './components/ConnectionCard';
import { RecentResults } from './components/RecentResults';
import { Sidebar } from './components/Sidebar';
import { demoResults } from './data/demoResults';
import { testConnection, type ConnectionTestResult } from './services/connectionService';
import { testAutomation, type AutomationTestResult } from './services/orderAutomationService';
import type { ConnectionProvider } from './types';

const connections: { provider: ConnectionProvider; description: string }[] = [
  { provider: 'Gmail', description: 'Binnenkomende e-mails worden automatisch gecontroleerd.' },
  { provider: 'Google Sheets', description: 'Verwerkte orders worden automatisch geregistreerd.' },
];

function App() {
  const [testingProvider, setTestingProvider] = useState<ConnectionProvider | null>(null);
  const [connectionResults, setConnectionResults] = useState<Partial<Record<ConnectionProvider, ConnectionTestResult>>>({});
  const [testingAutomation, setTestingAutomation] = useState(false);
  const [automationResult, setAutomationResult] = useState<AutomationTestResult>();

  async function handleConnectionTest(provider: ConnectionProvider) {
    setTestingProvider(provider);
    setConnectionResults((current) => ({ ...current, [provider]: undefined }));
    try {
      const result = await testConnection(provider);
      setConnectionResults((current) => ({ ...current, [provider]: result }));
    } finally {
      setTestingProvider(null);
    }
  }

  async function handleAutomationTest() {
    setTestingAutomation(true);
    setAutomationResult(undefined);
    try {
      setAutomationResult(await testAutomation());
    } finally {
      setTestingAutomation(false);
    }
  }

  return (
    <div className="app-shell" id="dashboard">
      <Sidebar />
      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Werkruimte</span><span className="breadcrumb-separator">/</span><strong>Dashboard</strong></div>
          <div className="topbar-actions">
            <span className="topbar-prototype"><span /> Prototype omgeving</span>
            <button className="icon-button notification-button" aria-label="Meldingen"><Bell size={18} /><span /></button>
            <button className="profile-button" aria-label="Profielmenu"><span className="avatar">RV</span><span>Mijn omgeving</span><ChevronDown size={14} /></button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-row" aria-labelledby="page-title">
            <div>
              <div className="welcome-kicker"><span className="kicker-line" /> AUTOMATISCHE ORDERVERWERKING</div>
              <h1 id="page-title">Order Automation<span className="title-period">.</span></h1>
              <p className="page-subtitle">Prototype geautomatiseerde orderverwerking</p>
            </div>
            <div className="date-chip"><Clock3 size={15} /> Maandag 28 september 2026</div>
          </section>

          <section className="metrics-row" aria-label="Automatisering in het kort">
            <article className="metric-item">
              <span className="metric-icon metric-icon-green"><PackageCheck size={18} /></span>
              <div><p className="metric-label">Automatisering</p><p className="metric-value">Actief <span className="metric-live"><span /> Live</span></p></div>
              <ArrowUpRight className="metric-trend" size={17} />
            </article>
            <span className="metric-divider" />
            <article className="metric-item">
              <span className="metric-icon metric-icon-orange"><Mail size={18} /></span>
              <div><p className="metric-label">E-mailbewaking</p><p className="metric-value">Ingeschakeld <span className="metric-muted">Gmail</span></p></div>
              <ArrowDownRight className="metric-trend muted-trend" size={17} />
            </article>
            <span className="metric-divider" />
            <article className="metric-item">
              <span className="metric-icon metric-icon-blue"><ShieldCheck size={18} /></span>
              <div><p className="metric-label">Laatste verwerking</p><p className="metric-value">10:42 <span className="metric-muted">Vandaag</span></p></div>
              <span className="metric-success-dot" />
            </article>
          </section>

          <div className="section-heading" id="koppelingen">
            <div><p className="eyebrow">VERBONDEN DIENSTEN</p><h2>Koppelingen</h2></div>
            <span className="section-count"><span /> 2 actief</span>
          </div>
          <section className="connections-grid" aria-label="Gekoppelde diensten">
            {connections.map(({ provider, description }) => (
              <ConnectionCard
                key={provider}
                provider={provider}
                description={description}
                testing={testingProvider === provider}
                result={connectionResults[provider]}
                onTest={handleConnectionTest}
              />
            ))}
          </section>

          <div className="lower-grid">
            <AutomationPanel testing={testingAutomation} result={automationResult} onTest={handleAutomationTest} />
            <RecentResults results={demoResults} />
          </div>

          <footer className="page-footer"><span>Order Automation <span className="footer-separator">·</span> Studieprototype</span><span>Demo-modus actief</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;