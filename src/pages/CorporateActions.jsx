import { useState } from 'react'
import { Timer, ChevronDown, ChevronUp, Vote, Megaphone } from 'lucide-react'
import Card from '../components/common/Card'
import Badge from '../components/common/Badge'
import Button from '../components/common/Button'
import { formatNumber } from '../utils/formatters'
import { activeVotes, announcements } from '../data/corporate'

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

const categoryVariants = {
  'Trading Statement': 'warning',
  'Results': 'success',
  'Corporate Action': 'primary',
  'Director Dealings': 'neutral',
}

function VoteCard({ vote }) {
  const [voted, setVoted] = useState(null)
  const days = daysUntil(vote.deadline)

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">{vote.symbol.slice(0, 2)}</span>
          </div>
          <div>
            <p className="font-semibold text-text-primary">{vote.company}</p>
            <span className="text-xs text-text-muted font-mono">{vote.symbol}</span>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Timer className="w-3 h-3" />
          {days > 0 ? `${days} days left` : 'Closed'}
        </span>
      </div>

      <h3 className="text-sm font-medium text-text-primary mb-2">{vote.resolution}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{vote.description}</p>

      <div className="flex items-center justify-between text-xs text-text-muted mb-4">
        <span>Your shares: <span className="font-mono font-medium text-text-primary">{formatNumber(vote.yourShares)}</span></span>
      </div>

      {voted ? (
        <div className="bg-primary-light rounded-lg p-3 text-center">
          <p className="text-sm font-medium text-primary">
            You voted: {voted.toUpperCase()}
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="success" size="sm" className="flex-1" onClick={() => setVoted('for')}>
            For
          </Button>
          <Button variant="danger" size="sm" className="flex-1" onClick={() => setVoted('against')}>
            Against
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => setVoted('abstain')}>
            Abstain
          </Button>
        </div>
      )}
    </Card>
  )
}

function AnnouncementRow({ announcement }) {
  const [expanded, setExpanded] = useState(false)
  const variant = categoryVariants[announcement.category] || 'neutral'
  const time = new Date(announcement.timestamp).toLocaleDateString('en-ZA', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-start gap-3 px-4 py-3 hover:bg-surface/50 transition-colors text-left"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold text-text-secondary">{announcement.symbol.slice(0, 2)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-sm font-medium text-text-primary">{announcement.company}</span>
            <Badge variant={variant}>{announcement.category}</Badge>
          </div>
          <p className="text-sm text-text-secondary truncate">{announcement.title}</p>
          <p className="text-xs text-text-muted mt-0.5">{time}</p>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0 mt-1" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pl-15">
          <p className="text-sm text-text-secondary leading-relaxed ml-11">
            {announcement.body}
          </p>
        </div>
      )}
    </div>
  )
}

export default function CorporateActions() {
  const [tab, setTab] = useState('votes')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Corporate Actions</h1>
        <p className="text-text-secondary text-sm mt-1">
          Vote on resolutions and read SENS announcements
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1">
        <button
          onClick={() => setTab('votes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'votes'
              ? 'bg-primary text-white'
              : 'bg-surface text-text-secondary hover:bg-gray-100'
          }`}
        >
          <Vote className="w-4 h-4" />
          Active Votes ({activeVotes.length})
        </button>
        <button
          onClick={() => setTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === 'announcements'
              ? 'bg-primary text-white'
              : 'bg-surface text-text-secondary hover:bg-gray-100'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          Announcements ({announcements.length})
        </button>
      </div>

      {/* Content */}
      {tab === 'votes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeVotes.map((vote) => (
            <VoteCard key={vote.id} vote={vote} />
          ))}
        </div>
      ) : (
        <Card padding="p-0">
          {announcements.map((ann) => (
            <AnnouncementRow key={ann.id} announcement={ann} />
          ))}
        </Card>
      )}
    </div>
  )
}
