import { createFileRoute } from "@tanstack/react-router";
import portrait from "@/assets/romina-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Romina Lacerda — Astrologia Psicológica e Transpessoal" },
      {
        name: "description",
        content:
          "Uma prática brasileira de astrologia psicológica e transpessoal. Leituras para atravessar ciclos com mais clareza. Rio de Janeiro.",
      },
      { property: "og:title", content: "Romina Lacerda — Astrologia" },
      {
        property: "og:description",
        content:
          "Uma prática brasileira de astrologia psicológica e transpessoal.",
      },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/5521988624478";

function Label({ children }: { children: React.ReactNode }) {
  return <span className="label">{children}</span>;
}

function Section({
  id,
  num,
  title,
  children,
}: {
  id?: string;
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <Label>§ {num} · {title}</Label>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Terra({ children }: { children: React.ReactNode }) {
  return <em className="text-terracotta not-italic font-medium italic">{children}</em>;
}

function Nav() {
  return (
    <nav className="absolute left-0 right-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7 md:px-12">
        <a href="#top" className="label !text-cream">
          Romina Lacerda
        </a>
        <ul className="hidden gap-8 md:flex">
          {[
            ["Consultas", "#consultas"],
            ["Sobre", "#sobre"],
            ["Projetos", "#projetos"],
            ["Contato", "#contato"],
          ].map(([l, h]) => (
            <li key={l}>
              <a href={h} className="label hover:!text-terracotta transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header id="top" className="relative min-h-[100svh] overflow-hidden">
      <Nav />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroVase})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-32 md:px-12">
        <Label>Astrologia · Rio de Janeiro</Label>
        <h1 className="mt-8 font-serif text-5xl leading-[1.05] tracking-tight text-cream md:text-7xl lg:text-[5.5rem]">
          <em>O céu não prevê —</em>
          <br />
          <em>ele apenas <Terra>acompanha</Terra>.</em>
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-cream/85 md:text-xl">
          Uma prática brasileira de astrologia psicológica e transpessoal.
          Leituras para atravessar ciclos com mais clareza.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-terracotta px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-background transition-all hover:bg-terracotta/85"
          >
            Agendar consulta
            <span aria-hidden>→</span>
          </a>
          <a
            href="#sobre"
            className="label !text-cream/80 hover:!text-terracotta border-b border-border pb-1 transition-colors"
          >
            Ler sobre a prática →
          </a>
        </div>
      </div>
    </header>
  );
}

function Quote() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center md:px-12 md:py-36">
        <div className="mx-auto h-px w-16 bg-terracotta" />
        <blockquote className="mt-12 font-serif text-2xl italic leading-relaxed text-cream md:text-4xl">
          "Quando uma situação interior não é tornada consciente, ela acontece
          exteriormente como destino."
        </blockquote>
        <p className="label mt-10">— Carl G. Jung</p>
      </div>
    </section>
  );
}

const BIO = [
  "Atuo como astróloga desde 2019 — mas a astrologia está na minha vida desde a adolescência, quando percebi que o céu falava uma linguagem que eu já conhecia há muito tempo.",
  "Vedanta é meu caminho espiritual. Outras Tradições Ancestrais me atravessam e fazem parte da minha jornada — vividas, não apenas estudadas — e contribuem para a leitura do mapa.",
  "Sou formada em Pintura e Economia e faço Cerâmica. O trabalho com a argila e o estudo das Tradições Ancestrais informam profundamente o modo como leio um mapa — com atenção ao que está submerso, ao que pede forma, ao que ainda não tem nome.",
  "Tive como mestras Maria Eugênia Castro, Anna Maria Costa Ribeiro e Marcia Ferreira — cada uma deixando uma marca distinta no modo como leio um mapa.",
  "A Astrologia revela o destino — não como fatalidade, mas como forças a serem experienciadas nessa jornada. Traumas, hábitos, potenciais, preferências são indicados no mapa e podem servir como substância viva no caminho de autodesenvolvimento.",
  "Nessa perspectiva, o céu não determina. Indica o caminho para nos tornarmos essa pessoa inteira, simples e feliz que sempre fomos.",
];

function Bio() {
  return (
    <Section id="sobre" num="01" title="Sobre">
      <h2 className="max-w-4xl font-serif text-4xl leading-[1.1] text-cream md:text-6xl">
        <em>Uma astróloga que vive o que <Terra>estuda</Terra>.</em>
      </h2>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={portrait}
              alt="Romina Lacerda"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </div>
          <p className="label mt-4">Romina Lacerda · Rio de Janeiro</p>
        </div>

        <div className="md:col-span-7 md:pl-6">
          <div className="space-y-5 font-serif text-lg leading-[1.75] text-cream/90">
            {BIO.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="mt-10 font-serif text-xl italic leading-relaxed text-terracotta md:text-2xl">
            "Escorpiana com ascendente em Gêmeos. Mergulho fundo. Mas sempre
            volto."
          </p>

          <div className="mt-12 border-t border-border pt-6">
            <p className="label mb-3">Influências</p>
            <p className="font-serif text-base italic text-muted-foreground">
              Vedānta · Jung · Dane Rudhyar · Liz Greene · Tradições Ancestrais
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 grid gap-10 border-t border-border pt-16 md:grid-cols-3">
        {[
          [
            "É destino",
            "A astrologia revela forças — não como fatalidade, mas como convite.",
          ],
          [
            "É processo",
            "Cada consulta convida a compreender como cada aspecto e trânsito indicam caminhos no autoconhecimento.",
          ],
          [
            "É transformação",
            "A Astrologia joga luz no que está submerso — padrões, feridas, potenciais — possibilitando um novo entendimento de quem se é.",
          ],
        ].map(([title, body]) => (
          <div key={title}>
            <p className="font-serif text-2xl italic text-terracotta">{title}</p>
            <p className="mt-4 font-serif text-base leading-relaxed text-cream/85">
              {body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SERVICES = [
  {
    n: "i.",
    title: "Mapa Natal",
    body: "O mapa natal não é uma previsão. É um retrato simbólico da psique — os padrões que você carrega, os recursos que ainda não acessou, as tensões que se repetem pedindo consciência. É o ponto de partida — e muitas vezes o ponto de virada.",
  },
  {
    n: "ii.",
    title: "Ano que se Abre",
    body: "A cada aniversário, o Sol retorna ao ponto exato onde estava quando você nasceu. Esse momento gera um novo mapa — o tema do ciclo que está começando. Não como destino. Como convite — para entender o que esse ano está pedindo de você.",
  },
  {
    n: "iii.",
    title: "Travessias",
    body: "Os planetas continuam se movendo depois que você nasce. Quando tocam pontos do seu mapa natal, ativam processos internos e provocam acontecimentos externos. A pergunta não é 'o que vai acontecer?' — é 'o que está sendo chamado a crescer em mim agora?'",
  },
  {
    n: "iv.",
    title: "Sinastria",
    body: "Dois mapas em diálogo. A sinastria revela onde dois mundos internos se encontram — os pontos de ressonância, as tensões criativas, o que um desperta no outro. Para casais, parceiros, familiares ou sócios.",
  },
  {
    n: "v.",
    title: "Navegando nas Marés Interiores",
    body: "A cada 27-28 dias, a Lua retorna ao ponto exato onde estava quando você nasceu. Um acompanhamento mensal para quem quer atravessar seus ciclos emocionais com mais consciência e clareza.",
  },
];

function Services() {
  return (
    <Section id="consultas" num="02" title="Consultas">
      <div className="grid gap-12 md:grid-cols-12 md:items-end">
        <h2 className="md:col-span-8 font-serif text-4xl leading-[1.1] text-cream md:text-6xl">
          <em>A leitura como uma forma de <Terra>atenção</Terra>.</em>
        </h2>
        <div className="md:col-span-4">
          <p className="font-serif text-lg italic text-cream/80">
            Leituras para atravessar ciclos com mais clareza.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-3 bg-terracotta px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-background transition-all hover:bg-terracotta/85"
          >
            Agendar via WhatsApp →
          </a>
        </div>
      </div>

      <div className="mt-20 grid gap-px bg-border md:grid-cols-2">
        {SERVICES.map((s) => (
          <article
            key={s.title}
            className="group bg-background p-10 transition-colors hover:bg-card md:p-12"
          >
            <div className="flex items-baseline gap-4">
              <span className="label !text-terracotta">{s.n}</span>
              <h3 className="font-serif text-2xl italic text-cream md:text-3xl">
                {s.title}
              </h3>
            </div>
            <div className="mt-6 h-px w-12 bg-terracotta/40 transition-all group-hover:w-20" />
            <p className="mt-6 font-serif text-base leading-[1.8] text-cream/85">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Learning() {
  return (
    <Section num="03" title="Aprendizado">
      <h2 className="max-w-4xl font-serif text-4xl leading-[1.1] text-cream md:text-6xl">
        <em>Para quem quer aprender a olhar para o próprio <Terra>mapa</Terra>.</em>
      </h2>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <blockquote className="md:col-span-5 border-l-2 border-terracotta pl-6">
          <p className="font-serif text-xl italic leading-relaxed text-cream md:text-2xl">
            "Astrologia é uma linguagem. Se você entende essa linguagem o céu
            fala com você."
          </p>
          <footer className="label mt-6">— Dane Rudhyar</footer>
        </blockquote>

        <div className="md:col-span-7">
          <p className="font-serif text-lg leading-[1.8] text-cream/90">
            Ofereço aulas introdutórias de astrologia — individualmente ou em
            pequenos grupos — para quem quer entender como funciona um mapa
            natal: planetas, signos, casas, elementos e aspectos. O objetivo
            não é formar astrólogos. É dar ferramentas para que você possa
            olhar para o próprio mapa e começar a compreender sua linguagem.
          </p>
          <p className="mt-8 font-serif text-base italic text-muted-foreground">
            Turmas abertas por demanda. Entre em contato para saber
            disponibilidade.
          </p>
          <a
            href="#contato"
            className="label mt-6 inline-block !text-terracotta border-b border-terracotta/40 pb-1"
          >
            Saber mais →
          </a>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projetos" num="04" title="Projetos">
      <h2 className="max-w-4xl font-serif text-4xl leading-[1.1] text-cream md:text-6xl">
        <em>Uma prática enraizada em <Terra>muitos solos</Terra>.</em>
      </h2>

      <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
        <article className="bg-background p-10 md:p-12">
          <p className="label !text-terracotta">YASH</p>
          <h3 className="mt-3 font-serif text-2xl italic text-cream md:text-3xl">
            Yoga, Astrologia e Sound Healing
          </h3>
          <p className="mt-3 font-serif text-base italic text-terracotta">
            Três Forças · Um Caminho
          </p>
          <p className="mt-6 font-serif text-base leading-[1.8] text-cream/85">
            Encontros presenciais no Rio de Janeiro que reúnem prática de Yoga,
            banho de som e leitura astrológica coletiva. Uma experiência de
            corpo, som e céu. Terceiro encontro realizado em maio de 2026.
          </p>
          <p className="mt-6 font-serif text-sm italic text-muted-foreground">
            Um projeto de Romina Lacerda, Raquel Florêncio e Nando Rebello.
          </p>
          <a
            href="https://www.instagram.com/yash_sound_astro_yoga"
            target="_blank"
            rel="noreferrer"
            className="label mt-8 inline-block !text-terracotta border-b border-terracotta/40 pb-1"
          >
            Saiba mais →
          </a>
        </article>

        <article className="bg-background p-10 md:p-12">
          <p className="label !text-terracotta">Ciclo Anual</p>
          <h3 className="mt-3 font-serif text-2xl italic text-cream md:text-3xl">
            Estudos Astrológicos
          </h3>
          <p className="mt-3 font-serif text-base italic text-terracotta">
            Doze signos · Doze encontros
          </p>
          <p className="mt-6 font-serif text-base leading-[1.8] text-cream/85">
            Um ano de mergulho nos mitos astrológicos a partir de Astrologia do
            Destino de Liz Greene — doze signos, doze encontros, doze histórias
            que habitam o mapa de cada um. Todo o material está disponível no
            YouTube.
          </p>
          <p className="mt-6 font-serif text-sm italic text-muted-foreground">
            Um projeto de Romina Lacerda e Rodrigo França.
          </p>
          <a
            href="https://www.youtube.com/rominalacerda"
            target="_blank"
            rel="noreferrer"
            className="label mt-8 inline-block !text-terracotta border-b border-terracotta/40 pb-1"
          >
            Assistir no YouTube →
          </a>
        </article>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contato" num="05" title="Contato">
      <h2 className="max-w-4xl font-serif text-4xl leading-[1.1] text-cream md:text-6xl">
        <em>Se algo aqui <Terra>tocou</Terra> você.</em>
      </h2>
      <p className="mt-10 max-w-2xl font-serif text-lg leading-[1.8] text-cream/85">
        Escreva algumas linhas sobre o que te traz. Cada mensagem é lida com
        atenção e respondida em até sete dias.
      </p>
      <div className="mt-12 flex flex-wrap items-center gap-8">
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-terracotta px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-background transition-all hover:bg-terracotta/85"
        >
          Agendar via WhatsApp →
        </a>
        <p className="font-serif text-base italic text-cream/75">
          ou escreva para{" "}
          <a
            href="mailto:romilacerda@hotmail.com"
            className="text-terracotta border-b border-terracotta/40"
          >
            romilacerda@hotmail.com
          </a>
        </p>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3 md:px-12">
        <div>
          <p className="label">Romina Lacerda · Astrologia</p>
          <p className="mt-4 max-w-xs font-serif text-sm italic text-muted-foreground">
            Uma prática contemplativa de astrologia psicológica e transpessoal.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="label mb-2">Acompanhe</p>
          <a
            href="https://www.instagram.com/yash_sound_astro_yoga"
            target="_blank"
            rel="noreferrer"
            className="font-serif text-base text-cream/85 hover:text-terracotta"
          >
            Instagram →
          </a>
          <a
            href="https://www.youtube.com/rominalacerda"
            target="_blank"
            rel="noreferrer"
            className="font-serif text-base text-cream/85 hover:text-terracotta"
          >
            YouTube →
          </a>
        </div>
        <div className="md:text-right">
          <p className="label">© 2026</p>
          <p className="mt-4 font-serif text-sm text-muted-foreground">
            Rio de Janeiro, Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Quote />
      <Bio />
      <Services />
      <Learning />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
