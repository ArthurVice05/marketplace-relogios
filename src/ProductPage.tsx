import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Minus, Plus, ShieldCheck, Truck } from 'lucide-react'
import WatchVisual from './WatchVisual'
import { money, watchDetails, watches, type Watch } from './data'

const views = [
  { label: 'Visão frontal', className: 'view-front' },
  { label: 'Em perspectiva', className: 'view-angle' },
  { label: 'Detalhes do mostrador', className: 'view-detail' },
] as const

export default function ProductPage({ watch, favorite, onFavorite, onAdd, onBack, onOpenProduct }: {
  watch: Watch
  favorite: boolean
  onFavorite: (id: number) => void
  onAdd: (watch: Watch, quantity: number) => void
  onBack: () => void
  onOpenProduct: (watch: Watch) => void
}) {
  const [view, setView] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openInfo, setOpenInfo] = useState<'details' | 'delivery' | null>('details')
  useEffect(() => { setView(0); setQuantity(1); setOpenInfo('details') }, [watch.id])
  const details = watchDetails[watch.id]
  const related = watches.filter(item => item.id !== watch.id && (item.category === watch.category || item.collection === watch.collection)).slice(0, 3)
  while (related.length < 3) {
    const next = watches.find(item => item.id !== watch.id && !related.some(current => current.id === item.id))
    if (!next) break
    related.push(next)
  }
  return <div className="detail-page">
    <div className="detail-breadcrumb"><button onClick={onBack}><ArrowLeft size={16}/> Voltar à coleção</button><span>AUREL <b>/</b> {watch.collection} <b>/</b> {watch.name}</span></div>
    <section className="detail-main" aria-label={`Detalhes de ${watch.name}`}>
      <div className="detail-gallery">
        <div className={`detail-gallery-main art-${watch.tone}`}>
          <div className="detail-gallery-grid" aria-hidden="true"/><span className="detail-gallery-label">AUREL / {watch.collection.toUpperCase()}</span>
          <AnimatePresence mode="wait"><motion.div key={`${watch.id}-${view}`} className={`detail-gallery-watch ${views[view].className}`} initial={{ opacity: 0, scale: .86, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.08, rotate: 10 }} transition={{ duration: .5 }}><WatchVisual watch={watch} large/></motion.div></AnimatePresence>
          <span className="detail-view-count">0{view + 1} / 03</span>
        </div>
        <div className="detail-views" role="group" aria-label="Ângulos do relógio">{views.map((item, index) => <button key={item.label} className={`detail-view art-${watch.tone} ${view === index ? 'active' : ''}`} onClick={() => setView(index)} aria-label={item.label} aria-pressed={view === index}><div className={item.className}><WatchVisual watch={watch}/></div><span>0{index + 1} / {item.label}</span></button>)}</div>
      </div>
      <div className="detail-content"><div className="detail-content-top"><p className="eyebrow dark"><span className="eyebrow-line"/> {watch.collection}</p><button className={`detail-favorite ${favorite ? 'active' : ''}`} onClick={() => onFavorite(watch.id)} aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}><Heart size={20} fill={favorite ? 'currentColor' : 'none'}/></button></div><p className="detail-category">{watch.category.toUpperCase()} <span>·</span> EDIÇÃO AUREL</p><h1>{watch.name}<span>.</span></h1><p className="detail-lead">{watch.description}</p><p className="detail-story">{details.story}</p><div className="detail-highlights">{details.highlights.map(highlight => <span key={highlight}><Check size={14}/>{highlight}</span>)}</div><div className="detail-price"><strong>{money(watch.price)}</strong><span>Valor demonstrativo para esta etapa do projeto.</span></div><div className="detail-purchase"><div className="detail-quantity" aria-label="Quantidade"><button aria-label="Diminuir quantidade" disabled={quantity <= 1} onClick={() => setQuantity(value => Math.max(1, value - 1))}><Minus size={15}/></button><span>{quantity}</span><button aria-label="Aumentar quantidade" onClick={() => setQuantity(value => value + 1)}><Plus size={15}/></button></div><button className="detail-add" onClick={() => onAdd(watch, quantity)}>Adicionar à sacola <ArrowRight size={19}/></button></div><div className="detail-assurance"><div><Truck size={19}/><span>Entrega para todo o Brasil</span></div><div><ShieldCheck size={19}/><span>Compra segura após integração do checkout</span></div></div><div className="detail-accordions"><div><button aria-expanded={openInfo === 'details'} onClick={() => setOpenInfo(openInfo === 'details' ? null : 'details')}>Especificações <ChevronDown size={17}/></button>{openInfo === 'details' && <dl><div><dt>Movimento</dt><dd>{details.movement}</dd></div><div><dt>Caixa</dt><dd>{details.caseMaterial}</dd></div><div><dt>Diâmetro</dt><dd>{details.diameter}</dd></div><div><dt>Pulseira</dt><dd>{details.strap}</dd></div><div><dt>Mostrador</dt><dd>{details.dial}</dd></div><div><dt>Vidro</dt><dd>{details.glass}</dd></div><div><dt>Resistência à água</dt><dd>{details.waterResistance}</dd></div></dl>}</div><div><button aria-expanded={openInfo === 'delivery'} onClick={() => setOpenInfo(openInfo === 'delivery' ? null : 'delivery')}>Entrega e disponibilidade <ChevronDown size={17}/></button>{openInfo === 'delivery' && <p>Frete, prazo e estoque serão informados pelo serviço de catálogo e pedidos quando o backend estiver conectado.</p>}</div></div></div>
    </section>
    <section className="detail-editorial"><span>DESIGN QUE PERMANECE</span><h2>Feito para marcar<br/><em>o que importa.</em></h2><p>{watch.name} representa a proposta da AUREL: peças para viver e revisitar cada instante.</p></section>
    <section className="detail-related"><div className="detail-related-heading"><div><p className="eyebrow dark"><span className="eyebrow-line"/> Continue explorando</p><h2>Talvez seja o seu <em>próximo Aurel.</em></h2></div><button onClick={onBack}>Ver toda a coleção <ArrowRight size={17}/></button></div><div className="detail-related-grid">{related.map(item => <button className="detail-related-card" key={item.id} onClick={() => onOpenProduct(item)}><div className={`detail-related-art art-${item.tone}`}><WatchVisual watch={item}/></div><span>{item.collection}</span><div><strong>{item.name}</strong><b>{money(item.price)}</b></div></button>)}</div></section>
  </div>
}
