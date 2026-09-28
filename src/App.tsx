import { useEffect, useState } from 'react';
import { ArrowUpRight, Clock3, Mail, PackageCheck, Workflow } from 'lucide-react';
import { AutomationPanel } from './components/AutomationPanel';
import { ConnectionCard } from './components/ConnectionCard';
import { RecentResults } from './components/RecentResults';
import { Sidebar } from './components/Sidebar';
import { testAutomation, type AutomationTestResult } from './services/orderAutomationService';
import { getProcessingResults } from './services/processingResultsService';
import type { ConnectionProvider } from './types';

const connections: { provider: ConnectionProvider; description: string }[] = [
  { provider: 'Gmail', description: 'Het testaccount is gekoppeld aan de bestaande Make-workflow.' },
  { provider: 'Google Sheets', description: 'Ordergegevens worden via de bestaande Make-workflow geregistreerd.' },
];

function App() {
  const [testingAutomation, setTestingAutomation] = useState(false);
  const [automationResult, setAutomationResult] = useState<AutomationTestResult>();
  const [processingResults, setProcessingResults] = useState<Awaited<ReturnType<typeof getProcessingResults>>>([]);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [resultsError, setResultsError] = useState<string>();

  useEffect(() => {
    let isCurrent = true;

    getProcessingResults()
      .then((results) => {
        if (isCurrent) setProcessingResults(results);
      })
      .catch(() => {
        if (isCurrent) setResultsError('Verwerkingsgegevens konden niet worden opgehaald.');
      })
      .finally(() => {
        if (isCurrent) setResultsLoading(false);
      });

    return () => { isCurrent = false; };
  }, []);

  async function handleAutomationTest() {
    setTestingAutomation(true);
    setAutomationResult(undefined);
    try {
      setAutomationResult(await testAutomation());
    } catch {
      setAutomationResult({ status: 'failure', message: 'Verbinding met Make mislukt' });
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
            <div className="profile-display" aria-label="Persoonlijk prototype"><span className="avatar" aria-hidden="true">RV</span><span>Persoonlijk prototype</span></div>
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
              <span className="metric-icon metric-icon-green"><Workflow size={18} /></span>
              <div><p className="metric-label">Automatisering</p><p className="metric-value">Actief <span className="metric-live"><span /> Via Make</span></p></div>
              <ArrowUpRight className="metric-trend" size={17} />
            </article>
            <span className="metric-divider" />
            <article className="metric-item">
              <span className="metric-icon metric-icon-orange"><Mail size={18} /></span>
              <div><p className="metric-label">E-mailbron</p><p className="metric-value">Gmail <span className="metric-muted">Via Make</span></p></div>
              <ArrowUpRight className="metric-trend muted-trend" size={17} />
            </article>
            <span className="metric-divider" />
            <article className="metric-item">
              <span className="metric-icon metric-icon-blue"><PackageCheck size={18} /></span>
              <div><p className="metric-label">Orderregistratie</p><p className="metric-value">Google Sheets <span className="metric-muted">Via Make</span></p></div>
              <span className="metric-success-dot" />
            </article>
          </section>

          <div className="section-heading" id="koppelingen">
            <div><p className="eyebrow">VERBONDEN DIENSTEN</p><h2>Koppelingen</h2></div>
            <span className="section-count"><span /> 2 via Make</span>
          </div>
          <section className="connections-grid" aria-label="Gekoppelde diensten">
            {connections.map(({ provider, description }) => (
              <ConnectionCard
                key={provider}
                provider={provider}
                description={description}
              />
            ))}
          </section>

          <div className="lower-grid">
            <AutomationPanel testing={testingAutomation} result={automationResult} onTest={handleAutomationTest} />
            <RecentResults results={processingResults} loading={resultsLoading} error={resultsError} />
          </div>

          <footer className="page-footer"><span>Order Automation <span className="footer-separator">·</span> Studieprototype</span><span>Automatisering via Make</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;