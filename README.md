# AUREL — marketplace de relógios

Primeira etapa visual do marketplace. O frontend é autoral e usa React, TypeScript, Vite e Motion. Os relógios, preços e textos de produto são dados demonstrativos em `src/data.ts`.

## Executar

```bash
pnpm install
pnpm dev
```

Para gerar a versão de produção: `pnpm build`. Para visualizá-la: `pnpm preview`.

## O que já funciona

- Vitrine responsiva com abertura cinematográfica: relógio dimensional girando, saída automática e opção de rever a cena na primeira tela.
- Cena com relógio e textos que mudam conforme a rolagem, movimento de profundidade no destaque, barra de progresso, revelação da coleção e reflexos discretos nos cartões. As animações respeitam `prefers-reduced-motion`.
- Galeria editorial "AUREL in Motion" com três ensaios visuais, troca automática com pausa, seleção manual e acesso à coleção. A composição usa a linguagem de destaque editorial e vitrines curtas observada no Motionographer como referência, sem reproduzir seu layout, marca ou conteúdo.
- Cada relógio agora abre uma página completa em `/relogios/<nome>`, com três ângulos visuais, história, especificações, seleção de quantidade, sacola e peças relacionadas. O link funciona mesmo após atualizar a página; os dados técnicos e os preços ainda são demonstrativos.
- A coleção reúne 14 modelos demonstrativos em estilos clássicos, minimalistas, esportivos, de mergulho, cronógrafos, de campo e GMT. Os desenhos do mostrador distinguem as famílias.
- A aba `/pulseiras` apresenta 7 opções demonstrativas em couro, borracha, lona, nylon, malha de aço e material híbrido. Há filtros por material e largura (18, 20 e 22 mm), página individual e guia básico de encaixe.
- A abertura da aba de pulseiras revela a peça em giro 3D. Uma cena fixa controlada pela rolagem muda a perspectiva da pulseira e alterna os textos antes do catálogo.
- A sacola reúne relógios e pulseiras e guarda a largura selecionada para cada pulseira. O estado da sacola é local à sessão da página.
- A primeira tela foi redesenhada como uma cena contínua com tipografia em escala grande, órbitas, destaque do produto e faixa inferior.
- Alternância de destaque, filtros, busca, favoritos, detalhes dos produtos e sacola local.
- A finalização da compra avisa que depende da integração futura. Nenhum pedido ou pagamento é enviado.

## Próxima etapa: microserviços

Os ZIPs de Potala foram consultados apenas para entender a divisão de responsabilidades: API gateway, identidade, catálogo, vendedores e pedidos em NestJS. Nenhum código ou interface do Potala foi copiado. A integração deve começar pelo catálogo, substituindo `src/data.ts` por um cliente de API tipado que converse com o gateway. Em seguida, identidade e vendedores podem alimentar autenticação e informações dos lojistas. Pedidos e pagamentos devem ser implementados antes de habilitar o checkout. Valores, estoque, frete e disponibilidade devem sempre ser confirmados pelo backend.

## Arte

`public/editorial-watch.png` foi gerada para esta vitrine como uma imagem editorial. O relógio interativo principal e os cartões são construídos com CSS e transformações 3D, sem depender de um arquivo de modelo pesado.
