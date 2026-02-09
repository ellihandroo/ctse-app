const tabs = [
  { id: 'all', label: 'All' },
  { id: 'equity', label: 'Equities' },
  { id: 'tokenized', label: 'Tokenized' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'prediction', label: 'Predictions' },
  { id: 'futures', label: 'Futures' },
]

export default function FilterTabs({ activeTab, onTabChange }) {
  return (
    <>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            h-9 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0
            ${activeTab === id
              ? 'bg-primary text-white'
              : 'bg-surface text-text-secondary hover:bg-gray-100 hover:text-text-primary'
            }
          `}
        >
          {label}
        </button>
      ))}
    </>
  )
}
