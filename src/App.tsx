import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Droplets,
  Leaf,
  Menu,
  Sprout,
  Waves,
  X,
} from 'lucide-react';
import VoxelTopographyGrid from '@/components/ui/voxel-topography-grid';
import portrait from '@/assets/larissa-santos.jpeg';

const navigation = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Pesquisa', href: '#pesquisa' },
  { label: 'Trajetória', href: '#trajetoria' },
];

const expertise = [
  {
    icon: Droplets,
    title: 'Irrigação e drenagem',
    text: 'Manejo hídrico e estratégias para o uso eficiente da água em sistemas agrícolas.',
  },
  {
    icon: Waves,
    title: 'Estresse salino',
    text: 'Respostas das plantas à salinidade e alternativas para mitigar seus efeitos.',
  },
  {
    icon: Sprout,
    title: 'Fisiologia vegetal',
    text: 'Crescimento, trocas gasosas e qualidade de mudas sob diferentes condições.',
  },
  {
    icon: Leaf,
    title: 'Sustentabilidade',
    text: 'Soluções agronômicas conectadas à realidade hídrica e produtiva do semiárido.',
  },
];

function SectionLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 border-b pb-5 text-[11px] font-bold uppercase tracking-[0.18em] ${light ? 'border-white/15 text-white/55' : 'border-[#1d2923]/15 text-[#657068]'}`}>
      <span className={light ? 'text-[#d8e89d]' : 'text-[#4f775e]'}>{number}</span>
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f1e7] text-[#1d2923]">
      <header id="inicio" className="relative isolate min-h-screen overflow-hidden bg-[#102a23] text-[#fffdf7]">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-20 [&>div]:h-full [&>div]:min-h-0 [&>div]:bg-transparent [&>div]:p-0 [&>div>div]:h-full [&>div>div]:max-w-none [&>div>div]:aspect-auto [&>div>div]:rounded-none [&>div>div]:border-0 [&>div>div]:bg-transparent [&>div>div]:p-0 [&>div>div]:shadow-none [&>div>div>div]:rounded-none [&>div>div>div]:border-0">
          <VoxelTopographyGrid
            tileSize={38}
            maxHeight={48}
            primaryColor="#739d57"
            wireColor="rgba(216, 232, 157, 0.25)"
            speed={0.007}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,34,27,.98)_0%,rgba(16,49,39,.92)_48%,rgba(16,49,39,.58)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_42%,transparent_0%,rgba(7,23,17,.16)_42%,rgba(7,23,17,.5)_100%)]" />

        <nav className="mx-auto flex h-20 w-[min(1180px,calc(100%_-_2rem))] items-center justify-between border-b border-white/15 lg:h-24" aria-label="Navegação principal">
          <a href="#inicio" className="flex items-center gap-3 font-display text-sm font-bold">
            <span className="grid size-10 place-items-center rounded-full border border-[#d8e89d]/50 bg-[#d8e89d]/10 text-xs tracking-wider text-[#d8e89d]">LS</span>
            Larissa Santos
          </a>

          <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            {navigation.map((item) => <a key={item.href} href={item.href} className="transition hover:text-[#d8e89d]">{item.label}</a>)}
            <a href="#contato" className="rounded-full border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:border-[#d8e89d] hover:text-[#d8e89d]">Contato</a>
          </div>

          <button type="button" className="relative z-50 grid size-11 place-items-center rounded-full border border-white/25 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#102a23] text-xl md:hidden">
            {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <a href="#contato" onClick={() => setMenuOpen(false)} className="text-[#d8e89d]">Contato</a>
          </div>
        )}

        <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-[min(1180px,calc(100%_-_2rem))] items-center gap-12 py-14 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d8e89d]">
              <span className="h-px w-8 bg-current" /> Ciência que cultiva futuros
            </div>
            <h1 className="font-display text-[clamp(3.15rem,7vw,7rem)] font-semibold leading-[.94] tracking-[-.07em]">
              Larissa Fernanda<br /><span className="font-medium italic text-[#b7cf86]">Souza Santos.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg sm:leading-8">
              Mestre e doutoranda em Engenharia Agrícola, com formação em Engenharia de Biossistemas, dedicada a soluções para o uso sustentável da água e a produção agrícola no semiárido.
            </p>
            <div className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <a href="#pesquisa" className="inline-flex min-h-14 items-center gap-5 rounded-full bg-[#d8e89d] px-6 text-sm font-bold text-[#102a23] transition hover:-translate-y-0.5 hover:bg-white">
                Conheça minha pesquisa <ArrowUpRight size={17} />
              </a>
              <a href="#contato" className="group inline-flex items-center gap-3 border-b border-white/45 pb-1 text-sm font-semibold">
                Entre em contato <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-1 border-t border-white/15 pt-6 min-[390px]:grid-cols-3">
              {[
                ['Mestre', 'Engenharia Agrícola'],
                ['UFCG', 'Formação acadêmica'],
                ['Doutorado', 'Em andamento'],
              ].map(([value, label], index) => (
                <div key={label} className={`py-3 min-[390px]:py-0 ${index ? 'min-[390px]:border-l min-[390px]:border-white/15 min-[390px]:pl-5' : ''}`}>
                  <strong className="block font-display text-base">{value}</strong>
                  <span className="mt-1 block text-[9px] uppercase tracking-wider text-white/45">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-[430px] lg:block">
            <div className="absolute -inset-7 rounded-[48%_48%_12px_12px] border border-[#d8e89d]/25" />
            <div className="relative aspect-[.78] overflow-hidden rounded-[48%_48%_12px_12px] border border-white/20 bg-[#244d3e] shadow-2xl">
              <img src={portrait} alt="Retrato de Larissa Fernanda Souza Santos" className="h-full w-full object-cover object-[50%_44%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102a23]/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-10 rounded-xl border border-white/20 bg-[#f5f1e7]/95 px-5 py-4 text-[#1d2923] shadow-xl backdrop-blur">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#657068]">Área de concentração</span>
              <strong className="mt-1 block text-sm">Irrigação &amp; Drenagem</strong>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="sobre" className="mx-auto w-[min(1180px,calc(100%_-_2rem))] py-24 lg:py-32">
          <SectionLabel number="01">Sobre mim</SectionLabel>
          <div className="grid gap-12 pt-14 lg:grid-cols-2 lg:gap-24 lg:pt-18">
            <h2 className="font-display text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[1.05] tracking-[-.06em]">Entre a ciência,<br />a água e a terra.</h2>
            <div className="max-w-xl text-base leading-8 text-[#657068]">
              <p className="mb-5 text-xl leading-8 text-[#1d2923]">Minha trajetória é movida pelo desejo de compreender os desafios do campo e transformar conhecimento científico em caminhos para uma agricultura mais eficiente, resiliente e sustentável.</p>
              <p>Sou Engenheira de Biossistemas e Mestre em Engenharia Agrícola pela Universidade Federal de Campina Grande. Atualmente, curso doutorado em Engenharia Agrícola, integrando manejo da água, salinidade e fisiologia vegetal.</p>
              <div className="mt-10 font-display text-2xl font-medium italic text-[#4f775e]">Larissa <span className="ml-2 font-sans text-[10px] not-italic uppercase tracking-[.16em] text-[#657068]">— pesquisadora</span></div>
            </div>
          </div>
        </section>

        <section id="atuacao" className="bg-[#102a23] py-24 text-[#fffdf7] lg:py-32">
          <div className="mx-auto w-[min(1180px,calc(100%_-_2rem))]">
            <SectionLabel number="02" light>Áreas de atuação</SectionLabel>
            <div className="grid items-end gap-8 py-14 lg:grid-cols-[1fr_.7fr] lg:py-16">
              <h2 className="font-display text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[1.05] tracking-[-.06em]">Conhecimento que<br />nasce no campo.</h2>
              <p className="max-w-lg leading-7 text-white/55">Pesquisa aplicada para tornar a produção agrícola mais consciente, produtiva e preparada para os desafios ambientais.</p>
            </div>
            <div className="grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {expertise.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="group min-h-72 border-white/15 p-7 transition hover:bg-white/[.045] sm:[&:nth-child(even)]:border-l lg:border-l lg:first:border-l-0">
                  <span className="text-[10px] text-white/35">0{index + 1}</span>
                  <Icon className="mb-9 mt-12 text-[#d8e89d]" strokeWidth={1.3} size={36} />
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pesquisa" className="mx-auto w-[min(1180px,calc(100%_-_2rem))] py-24 lg:py-32">
          <SectionLabel number="03">Pesquisa em destaque</SectionLabel>
          <div className="mt-14 grid overflow-hidden bg-[#fffdf7] shadow-[0_28px_90px_rgba(36,50,42,.09)] lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-[#e8e4d6] p-10">
              <div className="absolute inset-6 border border-[#315f49]/15" />
              <div className="relative grid size-64 place-items-center rounded-full bg-[#f5f1e7] sm:size-80">
                <Sprout size={150} strokeWidth={.8} className="text-[#4f775e]" />
                <Droplets size={38} strokeWidth={1} className="absolute left-3 top-8 text-[#5d8c91]" />
              </div>
              <span className="absolute bottom-9 font-display text-xs italic text-[#4f775e]">Passiflora edulis Sims</span>
            </div>
            <div className="self-center p-8 sm:p-12 lg:p-16">
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4f775e]">Dissertação de mestrado · 2023</span>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3vw,3rem)] font-semibold leading-[1.16] tracking-[-.045em]">Formação de mudas de maracujazeiro-azedo irrigado com águas salinas e aplicação de prolina</h2>
              <p className="mt-5 leading-7 text-[#657068]">O estudo avaliou como diferentes níveis de salinidade da água e concentrações de prolina influenciam a fisiologia, o crescimento, a qualidade e a tolerância das mudas.</p>
              <div className="my-8 grid gap-5 border-y border-[#1d2923]/15 py-6 min-[420px]:grid-cols-3">
                {[['160', 'unidades experimentais'], ['5 × 4', 'esquema fatorial'], ['UFCG', 'Campina Grande — PB']].map(([value, label]) => (
                  <div key={label}><strong className="block font-display text-lg text-[#245341]">{value}</strong><span className="text-[9px] text-[#657068]">{label}</span></div>
                ))}
              </div>
              <a href="https://dspace.sti.ufcg.edu.br/handle/riufcg/31286" target="_blank" rel="noreferrer" className="inline-flex min-h-14 items-center gap-5 rounded-full bg-[#1d2923] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#245341]">Acessar pesquisa completa <ArrowUpRight size={17} /></a>
            </div>
          </div>
        </section>

        <section id="trajetoria" className="mx-auto w-[min(1180px,calc(100%_-_2rem))] pb-28 lg:pb-36">
          <SectionLabel number="04">Trajetória acadêmica</SectionLabel>
          <div className="grid gap-14 pt-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <div>
              <h2 className="font-display text-[clamp(2.7rem,5vw,4.6rem)] font-semibold leading-[1.05] tracking-[-.06em]">Uma jornada guiada<br />pela curiosidade.</h2>
              <p className="mt-7 max-w-lg leading-7 text-[#657068]">Da gestão dos recursos hídricos à resposta das plantas ao estresse salino, cada etapa amplia o compromisso com uma agricultura mais sustentável.</p>
            </div>
            <div className="relative before:absolute before:bottom-6 before:left-[42px] before:top-2 before:w-px before:bg-[#1d2923]/15">
              {[
                ['2019', 'Engenharia de Biossistemas', 'Graduação pela UFCG, com pesquisa sobre demanda de água urbana no setor comercial da microrregião de Araripina — PE.'],
                ['2023', 'Mestrado em Engenharia Agrícola', 'Conclusão no PPGEA/UFCG, na área de concentração em Irrigação e Drenagem.'],
                ['Hoje', 'Doutorado em Engenharia Agrícola', 'Aprofundamento da pesquisa em irrigação, fisiologia vegetal, fruticultura e tolerância das culturas ao estresse salino.'],
              ].map(([year, title, text]) => (
                <article key={year} className="relative grid grid-cols-[84px_1fr] gap-6 pb-12 last:pb-0">
                  <span className="pt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4f775e]">{year}</span>
                  <span className="absolute left-[38px] top-1 size-[9px] rounded-full border-2 border-[#4f775e] bg-[#f5f1e7]" />
                  <div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#657068]">{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-[#183c31] py-24 text-center text-white lg:py-32">
          <div className="pointer-events-none absolute -left-56 -top-96 size-[620px] rounded-full border border-[#d8e89d]/10" />
          <div className="pointer-events-none absolute -bottom-80 -right-64 size-[520px] rounded-full border border-[#d8e89d]/10" />
          <div className="relative mx-auto w-[min(1000px,calc(100%_-_2rem))]">
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#d8e89d]"><span className="h-px w-8 bg-current" /> Vamos conversar?</div>
            <h2 className="mt-6 font-display text-[clamp(3rem,7vw,6.3rem)] font-semibold leading-[.98] tracking-[-.07em]">Ciência cresce quando<br /><span className="font-medium italic text-[#d8e89d]">é compartilhada.</span></h2>
            <p className="mx-auto mt-7 max-w-xl text-white/55">Para colaborações acadêmicas, projetos de pesquisa e troca de conhecimento.</p>
            <a href="mailto:contato@larissafernanda.com.br" className="mt-10 inline-flex max-w-full items-center gap-3 border-b border-white/60 pb-2 font-display text-[clamp(.95rem,3vw,1.45rem)]">contato@larissafernanda.com.br <ArrowUpRight size={18} /></a>
            <div className="mt-12 flex flex-col justify-center gap-5 text-[10px] uppercase tracking-[.12em] text-white/50 sm:flex-row sm:gap-8">
              <a href="https://www.escavador.com/sobre/442337512/larissa-fernanda-souza-santos" target="_blank" rel="noreferrer" className="transition hover:text-[#d8e89d]">Perfil acadêmico</a>
              <a href="https://dspace.sti.ufcg.edu.br/handle/riufcg/31286" target="_blank" rel="noreferrer" className="transition hover:text-[#d8e89d]">Repositório UFCG</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#102a23] text-white/45">
        <div className="mx-auto grid min-h-24 w-[min(1180px,calc(100%_-_2rem))] items-center gap-3 py-7 text-center text-[10px] tracking-wide sm:grid-cols-3 sm:text-left">
          <p>© {new Date().getFullYear()} Larissa Fernanda Souza Santos</p>
          <p className="text-center font-display italic text-[#d8e89d]">Com amor feito pelo seu amor L.</p>
          <a href="#inicio" className="text-center sm:text-right">Voltar ao topo ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
