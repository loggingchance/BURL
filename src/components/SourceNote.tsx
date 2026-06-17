interface Props {
  section: string
  page: number
}

export function SourceNote({ section, page }: Props) {
  return (
    <div className="source-note">
      Source: Reference Handbook for Foresters, {section}, page {page}.
    </div>
  )
}
