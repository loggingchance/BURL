interface Props {
  onNavigate: (tab: string, sub?: string) => void
  onAbout: () => void
}

interface RefItem {
  title: string
  page: number
  status: 'verified' | 'review'
  tab?: string
  sub?: string
}

const SECTIONS: { category: string; items: RefItem[] }[] = [
  {
    category: 'Scaling — Tree',
    items: [
      { title: 'Tree Scale — International 1/4"', page: 1, status: 'verified', tab: 'calculate', sub: 'tree' },
      { title: 'Tree Scale — Scribner', page: 2, status: 'verified', tab: 'calculate', sub: 'tree' },
      { title: 'Tree Scale — Doyle', page: 3, status: 'verified', tab: 'calculate', sub: 'tree' },
    ],
  },
  {
    category: 'Scaling — Log',
    items: [
      { title: 'Log Scale — International 1/4"', page: 4, status: 'review', tab: 'calculate', sub: 'log' },
      { title: 'Log Scale — Scribner', page: 5, status: 'review', tab: 'calculate', sub: 'log' },
      { title: 'Log Scale — Doyle', page: 6, status: 'review', tab: 'calculate', sub: 'log' },
    ],
  },
  {
    category: 'Pulpwood',
    items: [
      { title: 'Pulpwood — Standing Tree', page: 7, status: 'review', tab: 'calculate', sub: 'pulpwood' },
      { title: 'Pulpwood — Stacked Volume', page: 8, status: 'review' },
      { title: 'Pulpwood — Cordwood Conversions', page: 9, status: 'review' },
    ],
  },
  {
    category: 'Conversions',
    items: [
      { title: 'Cubic Foot / Board Foot', page: 10, status: 'review' },
      { title: 'Cord / Cubic Foot', page: 11, status: 'review' },
      { title: 'Log Rule Comparison', page: 12, status: 'review' },
      { title: 'Tree Volume Equivalents', page: 13, status: 'review' },
      { title: 'Metric Conversions', page: 14, status: 'review' },
      { title: 'Wood Weight by Species', page: 15, status: 'review', tab: 'calculate', sub: 'weight' },
      { title: 'Lumber Board Foot Formula', page: 20, status: 'verified', tab: 'calculate', sub: 'lumber' },
    ],
  },
  {
    category: 'Mensuration',
    items: [
      { title: 'Basal Area per Tree', page: 16, status: 'review' },
      { title: 'Basal Area Factors (Prism)', page: 17, status: 'review' },
      { title: 'Plot Radius Factors', page: 18, status: 'review' },
      { title: 'Expansion Factors', page: 19, status: 'review' },
      { title: 'Form Class Tables', page: 21, status: 'review' },
      { title: 'Tree Height by Merch. Logs', page: 22, status: 'review' },
      { title: 'Site Index Curves', page: 23, status: 'review' },
    ],
  },
  {
    category: 'Cruising Shortcuts',
    items: [
      { title: 'Point Sampling Overview', page: 24, status: 'review' },
      { title: 'Sample Size / Statistics', page: 25, status: 'review' },
      { title: 'Volume per Sample Point', page: 26, status: 'review' },
      { title: 'Tally Sheet Layout', page: 27, status: 'review' },
      { title: 'Pulpwood Cruise Shortcuts', page: 28, status: 'verified', tab: 'cruise', sub: 'pulpwood' },
      { title: 'Sawtimber Cruise Shortcuts', page: 29, status: 'verified', tab: 'cruise', sub: 'sawtimber' },
      { title: 'Basal Area Volume Ratios', page: 30, status: 'verified', tab: 'cruise', sub: 'basal' },
    ],
  },
  {
    category: 'Stocking & Silviculture',
    items: [
      { title: 'Stocking Concepts', page: 31, status: 'review' },
      { title: 'Stand Density Index', page: 32, status: 'review' },
      { title: 'Northern Hardwood Stocking Guide', page: 33, status: 'verified', tab: 'guides', sub: 'northern-hardwood' },
      { title: 'Red Pine Stocking Guide', page: 34, status: 'review', tab: 'guides', sub: 'red-pine' },
      { title: 'Eastern White Pine Stocking Guide', page: 35, status: 'review', tab: 'guides', sub: 'white-pine' },
    ],
  },
]

export function ReferencePage({ onNavigate, onAbout }: Props) {
  return (
    <div className="screen">
      <div className="page-title">Reference</div>
      <div className="page-subtitle">All 35 handbook pages</div>

      {SECTIONS.map(sec => (
        <div key={sec.category}>
          <div className="section-label">{sec.category}</div>
          <div className="card" style={{ padding: 0 }}>
            {sec.items.map(item => (
              <div
                key={item.title + item.page}
                className="ref-item"
                style={{ cursor: item.tab ? 'pointer' : 'default' }}
                onClick={() => item.tab && onNavigate(item.tab, item.sub)}
              >
                <div>
                  <div className="ref-title">{item.title}</div>
                  <span className={`ref-status ${item.status === 'verified' ? 'status-verified' : 'status-review'}`}>
                    {item.status === 'verified' ? 'Verified' : 'Needs review'}
                  </span>
                </div>
                <div className="ref-page">p. {item.page}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="btn btn-secondary" style={{ marginTop: 12 }} onClick={onAbout}>
        About this app
      </button>
    </div>
  )
}
