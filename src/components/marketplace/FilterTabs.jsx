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
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
            ${activeTab === id
              ? 'bg-primary text-white'
              : 'bg-surface text-text-secondary hover:bg-gray-100 hover:text-text-primary'
            }
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
