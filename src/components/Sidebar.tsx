import { Activity, FileSpreadsheet, LayoutDashboard, Mail, Settings2 } from 'lucide-react';

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Koppelingen', icon: Settings2, active: false },
  { label: 'Automatisering', icon: Activity, active: false },
  { label: 'Verwerkingen', icon: FileSpreadsheet, active: false },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="Order Automation dashboard">
        <span className="brand-mark"><Activity size={19} strokeWidth={2.5} /></span>
        <span className="brand-name">Order <span>Automation</span></span>
      </a>

      <div className="workspace-label">WERKOMGEVING</div>
      <nav className="side-nav" aria-label="Hoofdnavigatie">
        {navigation.map(({ label, icon: Icon, active }) => (
          <a
            className={`nav-item${active ? ' is-active' : ''}`}
            href={`#${label.toLowerCase()}`}
            key={label}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-note-icon"><Mail size={16} /></div>
        <div>
          <p className="sidebar-note-title">Persoonlijk prototype</p>
          <p className="sidebar-note-copy">Alleen voor testgebruik</p>
        </div>
        <span className="prototype-dot" aria-label="Prototype actief" />
      </div>
    </aside>
  );
}