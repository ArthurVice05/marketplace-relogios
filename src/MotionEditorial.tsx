import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { watches, type Watch } from './data'
import WatchVisual from './WatchVisual'

const films = [
  { number: '01', chapter: 'A FORMA', title: 'O tempo ganha outra dimensão.', subtitle: 'Linhas, luz e presença. Uma nova forma de sentir cada segundo.', watch: watches[1], treatment: 'emerald' },
  { number: '02', chapter: 'O CONTRASTE', title: 'A noite tem seu próprio ritmo.', subtitle: 'Uma expressão precisa para momentos que ficam na memória.', watch: watches[0], treatment: 'nocturne' },
  { number: '03', chapter: 'O IMPULSO', title: 'Cada movimento conta.', subtitle: 'Energia e precisão acompanham histórias que ainda serão escritas.', watch: watches[2], treatment: 'steel' },
] as const

export default function MotionEditorial({ onExplore, motionEnabled }: { onExplore: (watch: Watch) => void; motionEnabled: boolean }) {
  const reducedMotion = !motionEnabled
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  useEffect(() => {
    if (!playing || reducedMotion) return
    const interval = window.setInterval(() => setActive(current => (current + 1) % films.length), 6500)
    return () => window.clearInterval(interval)
  }, [playing, reducedMotion])
  const film = films[active]
  return <section id="editorial" className="motion-editorial" aria-labelledby="editorial-title">
    <div className="editorial-marquee" aria-hidden="true"><div>AUREL IN MOTION <span>✦</span> AUREL IN MOTION <span>✦</span> AUREL IN MOTION <span>✦</span></div></div>
    <div className="editorial-inner">
      <div className="editorial-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> Edição em movimento</p><h2 id="editorial-title">O tempo também<br/><em>pode ser visto.</em></h2></div><p>Três perspectivas sobre o mesmo objeto. Uma pequena coleção de ensaios visuais para explorar a personalidade de cada peça.</p></div>
      <div className="editorial-layout">
        <div className={`editorial-feature feature-${film.treatment}`}>
          <div className="feature-grid" aria-hidden="true"/><div className="feature-aura" aria-hidden="true"/>
          <AnimatePresence mode="wait"><motion.div key={film.number} className="feature-watch" initial={reducedMotion ? false : { opacity: 0, rotate: -19, scale: .82, x: 90 }} animate={{ opacity: 1, rotate: 0, scale: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, rotate: 16, scale: 1.1, x: -80 }} transition={{ duration: .85, ease: [.22, 1, .36, 1] }}><WatchVisual watch={film.watch} large/></motion.div></AnimatePresence>
          <span className="feature-index">AUREL / VISUAL STUDIES &nbsp;—&nbsp; {film.number} / 03</span>
          <div className="feature-copy"><AnimatePresence mode="wait"><motion.div key={film.title} initial={reducedMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -15 }} transition={{ duration: .55 }}><span>{film.chapter}</span><h3>{film.title}</h3><p>{film.subtitle}</p></motion.div></AnimatePresence><button onClick={() => onExplore(film.watch)} aria-label={`Conhecer ${film.watch.name}`}><ArrowRight size={21}/></button></div>
          {playing && !reducedMotion && <div key={`progress-${active}`} className="feature-timer"/>}
        </div>
        <div className="editorial-side"><div className="editorial-side-head"><span>SELECIONE UM ENSAIO</span><button aria-label={playing ? 'Pausar alternância dos ensaios' : 'Reproduzir alternância dos ensaios'} onClick={() => setPlaying(value => !value)}>{playing ? <Pause size={15}/> : <Play size={15}/>}<span>{playing ? 'Pausar' : 'Reproduzir'}</span></button></div>{films.map((item, index) => <button key={item.number} className={`editorial-story ${active === index ? 'is-active' : ''}`} onClick={() => { setActive(index); setPlaying(false) }} aria-pressed={active === index}><div className={`editorial-thumb thumb-${item.treatment}`}><WatchVisual watch={item.watch}/></div><div className="editorial-story-copy"><span>ENSAIO {item.number} / {item.chapter}</span><h3>{item.title}</h3><p>{item.watch.name}</p></div><ArrowRight className="editorial-story-arrow" size={17}/></button>)}<div className="editorial-side-note"><span>DESIGN EM MOVIMENTO</span><p>Uma coleção para observar de perto. E levar para a vida.</p></div></div>
      </div>
    </div>
  </section>
}
