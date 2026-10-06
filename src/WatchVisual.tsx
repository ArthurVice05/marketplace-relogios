import { useState, type CSSProperties } from 'react'
import type { Watch } from './data'

export default function WatchVisual({ watch, large = false }: { watch: Watch; large?: boolean }) {
  const [point, setPoint] = useState({ x: 0, y: 0 })
  return <div className={`watch-stage ${large ? 'watch-stage-large' : ''} tone-${watch.tone} design-${watch.design ?? 'classic'}`}
    onPointerMove={e => { if (!large || document.body.classList.contains('motion-off')) return; const r = e.currentTarget.getBoundingClientRect(); setPoint({ x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 }) }}
    onPointerLeave={() => setPoint({ x: 0, y: 0 })}>
    <div className="watch-glow" />
    <div className="watch-tilt" style={{ '--rx': `${-point.y * 16}deg`, '--ry': `${point.x * 19}deg`, '--accent': watch.accent } as CSSProperties}>
      <div className="watch-strap strap-top"/><div className="watch-strap strap-bottom"/>
      <div className="watch-crown"/><div className="watch-body"><div className="watch-bezel"><div className="watch-dial">
        <div className="dial-text">AUREL<span>{watch.design === 'diver' ? 'OCEANO' : watch.design === 'gmt' ? 'HORIZON GMT' : watch.design === 'chrono' ? 'CHRONOGRAPH' : 'CHRONOMÈTRE'}</span></div>
        {[...Array(12)].map((_, i) => <i key={i} className="hour-mark" style={{ transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-${large ? 103 : 68}px)` }} />)}
        {watch.design === 'chrono' && <div className="dial-subdials"><span/><span/><span/></div>}
        {watch.design === 'field' && <div className="dial-field-ring">{[12,3,6,9].map(n => <span key={n}>{n}</span>)}</div>}
        {watch.design === 'gmt' && <div className="dial-gmt-hand"/>}
        <div className="watch-hand hand-hour"/><div className="watch-hand hand-minute"/><div className="watch-hand hand-second"/><div className="hand-pin"/>
        <div className="dial-bottom">{watch.design === 'chrono' ? '1/10 SECOND' : watch.design === 'diver' ? 'DIVER · 200 M' : watch.design === 'gmt' ? 'DUAL TIME' : 'AUTOMATIC'}</div>
      </div></div></div>
    </div>
  </div>
}
