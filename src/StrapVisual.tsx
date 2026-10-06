import type { Strap } from './data'

export default function StrapVisual({ strap, large = false }: { strap: Strap; large?: boolean }) {
  return <div className={`strap-visual strap-tone-${strap.tone} ${large ? 'strap-visual-large' : ''}`} role="img" aria-label={`Pulseira ${strap.name} em ${strap.material.toLowerCase()}, cor ${strap.color}`}>
    <div className="strap-piece strap-piece-upper"><span className="strap-buckle"><i/></span><span className="strap-stitch"/></div>
    <div className="strap-piece strap-piece-lower"><span className="strap-stitch"/><span className="strap-holes"><i/><i/><i/><i/><i/></span></div>
    <div className="strap-visual-shadow"/>
  </div>
}
