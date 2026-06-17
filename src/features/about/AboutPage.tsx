export function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="screen">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div className="page-title">About</div>
      <div className="page-subtitle">Forester's Fieldbook — The Burl Ashley Tribute App</div>

      <div className="card">
        <div className="about-section">
          <h3>About this app</h3>
          <p>
            The Forester's Fieldbook app was created by Dr. Steven Bick, CF of{' '}
            <a href="https://northeastforests.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-forest)' }}>Northeast Forests LLC</a>{' '}
            and{' '}
            <a href="https://forestenterprise.org" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-forest)' }}>The Forest Business School</a>.
          </p>
          <p style={{ marginTop: 10 }}>
            Reach out at{' '}
            <a href="mailto:steve@northeastforests.com"
              style={{ color: 'var(--color-forest)' }}>steve@northeastforests.com</a>{' '}
            if you need a custom app build for your organization.
          </p>
          <p style={{ marginTop: 10 }}>
            There are more free useful apps at{' '}
            <a href="https://www.loggingchance.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-forest)' }}>www.loggingchance.com</a>.
          </p>
        </div>

        <div className="about-section">
          <h3>About the handbook</h3>
          <p>
            Forester's Fieldbook is a mobile, offline-first tribute to the{' '}
            <em>Reference Handbook for Foresters</em> prepared by Burl S. Ashley,
            Field Representative, Resources Management, Northeastern Area State and
            Private Forestry, Morgantown, West Virginia (September 1989, revised for
            the internet October 2001). It rebuilds the handbook's most-used tables
            and shortcut calculations into quick, touch-friendly tools for use in the woods.
          </p>
        </div>

        <div className="about-section">
          <h3>Source caution</h3>
          <p>
            Every result links back to its handbook page via the Source note shown on
            each calculator. Tree-scale tables (pages 1–3) and the cruise shortcut
            formulas have been transcribed and unit-tested. Log-scale tables, pulpwood
            volumes, and wood weights are computed approximations and are marked "Needs
            review" until checked against the printed handbook. Always confirm with
            professional judgment before making management or sale decisions.
          </p>
        </div>

        <div className="about-section">
          <h3>Offline use</h3>
          <p>
            The app is a Progressive Web App. Once loaded it caches its tables and works
            without a signal. Add it to your home screen for full-screen field use.
          </p>
        </div>
      </div>
    </div>
  )
}
