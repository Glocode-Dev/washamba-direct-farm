import { createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Leaf,
  Menu,
  MessageCircle,
  PackageCheck,
  Play,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Store,
  Truck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Washamba — Direct from the soil to the market" },
      {
        name: "description",
        content:
          "Washamba connects African smallholder farmers directly with verified buyers and consumers for fairer prices and fresher produce.",
      },
      { property: "og:title", content: "Washamba — Farming meets its market" },
      {
        property: "og:description",
        content: "A trusted marketplace for fair farm trade, reliable supply, and locally sourced produce.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WashambaPage,
});

const navLinks = [
  ["Features", "#features"],
  ["Marketplace", "#marketplace"],
  ["About Us", "#about"],
  ["Impact", "#impact"],
  ["FAQs", "#faqs"],
] as const;

const cohorts = [
  {
    icon: Sprout,
    label: "Kwa mkulima",
    title: "Direct Market Access",
    copy: "List each harvest from your shamba, meet verified demand from Nairobi to Mombasa, and negotiate a fair price without giving away value to unnecessary brokers.",
    points: ["Post produce in minutes", "Transparent price discovery", "Verified buyer requests"],
  },
  {
    icon: Store,
    label: "Kwa wanunuzi",
    title: "B2B Supply Integrity",
    copy: "Hotels, mama mboga shops, hotels, supermarkets, and processors across Kenya source directly with clearer volumes, lead times, and delivery logistics.",
    points: ["Reliable farm-level supply", "Consolidated bulk orders", "Traceable fulfilment"],
  },
  {
    icon: ShoppingBasket,
    label: "Kwa kaya",
    title: "Farm-to-Table Freshness",
    copy: "Bring home nutrient-rich seasonal food harvested near you—sukuma wiki, viazi, matunda freshi—with a simple order experience and full visibility into its origin.",
    points: ["Fresh local harvests", "Know your producer", "Convenient delivery options"],
  },
] as const;

const faqs = [
  {
    q: "How does delivery work for farm produce?",
    a: "Delivery is agreed per order based on distance, volume, and produce type. Buyers can select farmer delivery, collection at an agreed market or hub, or a supported logistics partner—from boda riders for town runs to refrigerated trucks for bulk hauls upcountry. Timing and fees are confirmed before payment.",
  },
  {
    q: "Is my payment protected until the order arrives?",
    a: "Yes. Eligible marketplace orders use a secure payment-holding flow powered by mobile money. Funds are reserved when an order is placed via M-Pesa and released to the farmer only after the buyer confirms the agreed quantity and quality were received.",
  },
  {
    q: "How can a farmer register a shamba and start selling?",
    a: "Download the app, create a farmer profile, and add your county, ward, crop type, expected volume, and harvest window. The Washamba team verifies key details before your first public listing goes live.",
  },
  {
    q: "Can restaurants and retailers place recurring orders?",
    a: "Yes. Business buyers can share repeat volume needs, preferred delivery days, and quality specifications. Farmers and aggregators can then respond with supply plans for dependable recurring fulfilment.",
  },
];

function PlayStoreIcon({ className = "size-5" }: { className?: string }) {
  return <Play className={className} fill="currentColor" aria-hidden="true" />;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 font-extrabold text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${inverse ? "text-primary-foreground" : "text-forest"}`}>
      <span className={`grid size-9 place-items-center rounded-lg ${inverse ? "bg-primary-foreground text-forest" : "bg-primary text-primary-foreground"}`}>
        <Leaf className="size-5" aria-hidden="true" />
      </span>
      Washamba
    </a>
  );
}

function AppMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-label="Preview of the Washamba mobile marketplace">
      <div className="absolute left-0 top-24 hidden w-44 rounded-xl border border-border bg-card p-4 shadow-xl md:block float-soft">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-amber-soft text-amber"><BarChart3 className="size-5" /></span>
          <div><p className="text-xs font-semibold text-muted-foreground">Fair price gain</p><p className="text-lg font-extrabold text-forest">+24.8%</p></div>
        </div>
      </div>
      <div className="absolute bottom-20 right-0 z-20 hidden w-48 rounded-xl border border-border bg-card p-4 shadow-xl md:block float-soft">
        <p className="text-xs font-semibold text-muted-foreground">Order confirmed</p>
        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-forest"><PackageCheck className="size-5 text-primary" /> 240 kg tomatoes</div>
      </div>
      <div className="mx-auto w-[284px] rounded-[2.5rem] border-[7px] border-forest bg-card p-2 shadow-2xl sm:w-[306px]">
        <div className="overflow-hidden rounded-[1.9rem] bg-surface-soft">
          <div className="bg-forest px-5 pb-5 pt-3 text-primary-foreground">
            <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-primary-foreground/25" />
            <div className="flex items-center justify-between">
              <div><p className="text-[10px] opacity-75">Good morning, Amina</p><p className="mt-0.5 text-sm font-bold">What are you sourcing?</p></div>
              <span className="grid size-8 place-items-center rounded-full bg-primary-foreground/15"><Leaf className="size-4" /></span>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-foreground px-3 py-2 text-xs text-foreground">
              <Search className="size-4 text-muted-foreground" /><span className="text-muted-foreground">Search fresh produce</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-extrabold">Fresh near you</p><span className="text-[10px] font-bold text-primary">See all</span></div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ProduceCard emoji="🍅" name="Roma tomatoes" price="KSh 85/kg" place="Kirinyaga" />
              <ProduceCard emoji="🥑" name="Hass avocado" price="KSh 32/pc" place="Murang'a" />
              <ProduceCard emoji="🥬" name="Sukuma wiki" price="KSh 38/bunch" place="Kiambu" />
              <ProduceCard emoji="🥔" name="Shangi potato" price="KSh 62/kg" place="Nyandarua" />
            </div>
            <div className="mt-4 rounded-xl bg-card p-3 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-[10px] font-bold">Market activity</span><span className="rounded-full bg-secondary px-2 py-1 text-[8px] font-bold text-primary">LIVE</span></div>
              <div className="mt-3 flex h-12 items-end gap-1.5" aria-hidden="true">
                {[35, 52, 44, 68, 56, 84, 72, 94, 78].map((height, i) => <span key={i} className="flex-1 rounded-t bg-primary/70" style={{ height: `${height}%` }} />)}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-around border-t border-border pt-3 text-muted-foreground">
              <Store className="size-4 text-primary" /><MessageCircle className="size-4" /><ShoppingBasket className="size-4" /><Users className="size-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProduceCard({ emoji, name, price, place }: { emoji: string; name: string; price: string; place: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-sm">
      <div className="grid h-16 place-items-center bg-amber-soft text-3xl" aria-hidden="true">{emoji}</div>
      <div className="p-2"><p className="truncate text-[9px] font-bold">{name}</p><p className="mt-1 text-[9px] font-extrabold text-primary">{price}</p><p className="mt-0.5 text-[8px] text-muted-foreground">{place}</p></div>
    </div>
  );
}

function WashambaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <main id="top" className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <nav aria-label="Primary navigation" className="glass-nav mx-auto max-w-7xl rounded-xl border border-border/80 px-4 sm:px-6">
          <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            <Logo />
            <div className="hidden items-center gap-7 md:flex">
              {navLinks.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>)}
            </div>
            <div className="hidden justify-self-end md:block"><Button asChild size="sm"><a href="#download"><PlayStoreIcon />Download App</a></Button></div>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
          {menuOpen && (
            <div className="border-t border-border py-4 md:hidden">
              <div className="grid gap-1">{navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</a>)}</div>
              <Button asChild className="mt-3 w-full"><a href="#download" onClick={() => setMenuOpen(false)}><PlayStoreIcon />Download App</a></Button>
            </div>
          )}
        </nav>
      </header>

      <section className="relative bg-surface-soft px-4 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-forest shadow-sm"><span className="size-2 rounded-full bg-amber" /> Proudly Kenyan — built for our food economy</div>
            <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.12] text-foreground sm:text-5xl lg:text-6xl">Connecting farmers & buyers made easy.</h1>
            <p className="mt-5 text-xl font-bold text-primary sm:text-2xl">Direct from the shamba to the soko.</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">Washamba bridges the gap between the shamba and the soko, so smallholder farmers across Kenya earn fairly, businesses source reliably, and every family enjoys fresher mboga freshi—without exploitative middlemen.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><a href="#download"><PlayStoreIcon />Get the App</a></Button>
              <Button asChild variant="outline" size="lg"><a href="#marketplace">Explore the Marketplace <ArrowRight className="size-4" /></a></Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="size-5 text-primary" /> Verified farmers</span>
              <span className="inline-flex items-center gap-2"><WalletCards className="size-5 text-primary" /> M-Pesa secured payments</span>
              <span className="inline-flex items-center gap-2"><Truck className="size-5 text-primary" /> County-wide logistics</span>
            </div>
          </div>
          <AppMockup />
        </div>
      </section>

      <section id="marketplace" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-sm font-extrabold uppercase text-primary">One market. Shared progress.</p><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-4xl">Better outcomes at every end of the food chain.</h2><p className="mt-5 leading-7 text-muted-foreground">Purpose-built tools give every participant the information and confidence to trade well.</p></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {cohorts.map(({ icon: Icon, label, title, copy, points }) => (
              <article key={title} className="group rounded-xl border border-border bg-card p-7 transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl sm:p-8">
                <div className="flex items-center justify-between"><span className="grid size-12 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-6" /></span><span className="text-xs font-extrabold uppercase text-muted-foreground">{label}</span></div>
                <h3 className="mt-8 text-xl font-extrabold">{title}</h3><p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
                <ul className="mt-6 space-y-3">{points.map((point) => <li key={point} className="flex items-center gap-3 text-sm font-semibold"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Check className="size-3" /></span>{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-28 bg-forest px-4 py-24 text-primary-foreground sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end"><div><p className="text-sm font-extrabold uppercase text-amber-soft">Marketplace intelligence</p><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-4xl">Everything needed to move a harvest forward.</h2></div><p className="max-w-xl text-base leading-7 text-primary-foreground/75 lg:justify-self-end">From discovery to delivery, Washamba keeps product, conversation, and payment context in one dependable place.</p></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl bg-primary-foreground p-6 text-foreground sm:p-8 lg:row-span-2">
              <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary"><ShoppingBasket className="size-5" /></span><span className="text-xs font-bold text-muted-foreground">LIVE CATALOGUES</span></div>
              <h3 className="mt-7 text-2xl font-extrabold">Discover what is fresh, nearby, and ready.</h3><p className="mt-3 leading-7 text-muted-foreground">Filter active harvests by crop, county, price range, quantity, and availability.</p>
              <div className="mt-7 rounded-xl bg-surface-soft p-4">
                <div className="flex gap-2 overflow-hidden"><span className="rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">All produce</span><span className="rounded-full bg-card px-3 py-2 text-xs font-bold">Vegetables</span><span className="rounded-full bg-card px-3 py-2 text-xs font-bold">Fruits</span></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><ProduceCard emoji="🌽" name="Dry maize" price="KSh 4,800/bag" place="Trans Nzoia" /><ProduceCard emoji="🫘" name="Rosecoco beans" price="KSh 168/kg" place="Nakuru" /></div>
              </div>
            </article>
            <article className="rounded-xl bg-forest-soft p-6 sm:p-8">
              <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary-foreground/10"><MessageCircle className="size-5" /></span><div><h3 className="text-xl font-extrabold">Direct communication</h3><p className="mt-2 leading-7 text-primary-foreground/70">Agree on grading, volumes, and handover details with the producer—not through a chain of brokers.</p></div></div>
              <div className="mt-6 space-y-3 text-sm"><div className="mr-10 rounded-lg bg-primary-foreground/10 p-3">Can you supply 300 kg by Friday?</div><div className="ml-10 rounded-lg bg-primary-foreground p-3 font-semibold text-forest">Yes—Grade A, harvested Thursday morning.</div></div>
            </article>
            <article className="rounded-xl bg-amber-soft p-6 text-foreground sm:p-8">
              <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-amber text-primary-foreground"><WalletCards className="size-5" /></span><div><h3 className="text-xl font-extrabold">Protected mobile payments</h3><p className="mt-2 leading-7 text-muted-foreground">Clear order totals, payment held safely through mobile money, and a traceable release to the mkulima once both sides confirm fulfilment.</p></div></div>
              <div className="mt-6 flex items-center justify-between rounded-lg bg-background p-4"><div><p className="text-xs font-semibold text-muted-foreground">Payment status</p><p className="mt-1 font-extrabold">Held securely — M-Pesa</p></div><span className="grid size-10 place-items-center rounded-full bg-secondary text-primary"><ShieldCheck className="size-5" /></span></div>
            </article>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 bg-surface-warm px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-full border border-amber/25 bg-background">
              <div className="grid size-52 place-items-center rounded-full bg-secondary text-center"><div><Leaf className="mx-auto size-12 text-primary" /><p className="mt-3 text-xl font-extrabold text-forest">Farming is enterprise.</p></div></div>
              <span className="absolute right-3 top-20 rounded-lg bg-forest px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg">Data-led</span><span className="absolute bottom-16 left-0 rounded-lg bg-amber px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg">Future-ready</span>
            </div>
            <div><p className="text-sm font-extrabold uppercase text-amber">Our movement</p><h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight sm:text-5xl">Ukulima sio ushamba.</h2><p className="mt-6 text-xl font-bold text-forest">Farming is not backward. It is skilled, technological, and essential.</p><p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">Washamba is shifting the rural narrative across Kenya by giving every mkulima modern tools, direct market visibility, and the commercial respect their work deserves. When agriculture is valued as enterprise, our communities keep more income and the nation's food systems become more resilient.</p></div>
          </div>
        </div>
      </section>

      <section id="impact" className="scroll-mt-28 px-4 py-24 sm:px-6 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {[{ n: "100%", l: "Direct sourcing", d: "Every listing connects demand to a known producer." }, { n: "0%", l: "Hidden broker fees", d: "Costs and terms are visible before an order is placed." }, { n: "3×", l: "Farmer retention", d: "A north-star goal for stronger, lasting market relationships." }].map((stat) => <div key={stat.l} className="px-6 py-10 md:px-10"><p className="text-5xl font-extrabold text-primary">{stat.n}</p><h3 className="mt-3 text-lg font-extrabold">{stat.l}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.d}</p></div>)}
        </div></div>
      </section>

      <section id="faqs" className="scroll-mt-28 bg-surface-soft px-4 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="text-sm font-extrabold uppercase text-primary">Common questions</p><h2 className="mt-4 text-balance text-3xl font-extrabold sm:text-4xl">Clarity before your first trade.</h2><p className="mt-5 max-w-md leading-7 text-muted-foreground">Straight answers on fulfilment, payments, onboarding, and repeat supply.</p></div>
          <Accordion.Root type="single" collapsible className="border-t border-border">
            {faqs.map((item, index) => <Accordion.Item key={item.q} value={`item-${index}`} className="border-b border-border"><Accordion.Header><Accordion.Trigger className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-6 text-left font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="min-w-0">{item.q}</span><ChevronDown className="size-5 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]:rotate-180" /></Accordion.Trigger></Accordion.Header><Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"><p className="max-w-2xl pb-6 pr-8 leading-7 text-muted-foreground">{item.a}</p></Accordion.Content></Accordion.Item>)}
          </Accordion.Root>
        </div>
      </section>

      <section id="download" className="scroll-mt-28 bg-primary px-4 py-16 text-primary-foreground sm:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="text-sm font-extrabold uppercase text-primary-foreground/70">Your next market is closer</p><h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">Trade food fairly. Grow with confidence.</h2><p className="mt-4 max-w-2xl leading-7 text-primary-foreground/80">Join Kenya's marketplace for serious farmers, verified buyers, and better food access—built for the way we already pay and move produce.</p></div><Button asChild variant="inverse" size="lg"><a href="https://play.google.com/store" target="_blank" rel="noreferrer"><PlayStoreIcon />Get it on Google Play</a></Button></div>
      </section>

      <footer className="bg-forest px-4 pb-8 pt-16 text-primary-foreground sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-primary-foreground/15 pb-14 md:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr_1.3fr]">
            <div><Logo inverse /><p className="mt-5 max-w-xs text-sm leading-7 text-primary-foreground/70">The direct agricultural marketplace building fairer trade and stronger food systems across Kenya. Proudly Kenyan, proudly agricultural.</p></div>
            <div><h3 className="text-sm font-extrabold">Platform</h3><ul className="mt-5 space-y-3 text-sm text-primary-foreground/70"><li><a className="hover:text-primary-foreground" href="#features">Features</a></li><li><a className="hover:text-primary-foreground" href="#marketplace">Marketplace</a></li><li><a className="hover:text-primary-foreground" href="#impact">Impact</a></li><li><a className="hover:text-primary-foreground" href="#faqs">FAQs</a></li></ul></div>
            <div><h3 className="text-sm font-extrabold">Company</h3><ul className="mt-5 space-y-3 text-sm text-primary-foreground/70"><li><a className="hover:text-primary-foreground" href="#about">About us</a></li><li><a className="hover:text-primary-foreground" href="mailto:hello@washamba.africa">Contact</a></li><li><a className="hover:text-primary-foreground" href="#privacy">Privacy policy</a></li><li><a className="hover:text-primary-foreground" href="#terms">Terms of service</a></li></ul></div>
            <div><h3 className="text-sm font-extrabold">Field notes, in your inbox</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/70">Market insights, harvest stories, and product updates—sent thoughtfully.</p><form onSubmit={subscribe} className="mt-5"><label htmlFor="newsletter-email" className="sr-only">Email address</label><div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"><input required type="email" id="newsletter-email" placeholder="you@example.com" className="min-h-12 min-w-0 rounded-lg border border-primary-foreground/25 bg-primary-foreground/10 px-4 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/55 focus:border-primary-foreground focus:ring-2 focus:ring-primary-foreground/40" /><Button variant="inverse" type="submit">Subscribe</Button></div>{subscribed && <p role="status" className="mt-3 flex items-center gap-2 text-sm font-semibold"><Check className="size-4" /> You're on the list. Karibu!</p>}</form></div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Washamba. Growing opportunity from the ground up.</p><a href="https://play.google.com/store" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-primary-foreground"><PlayStoreIcon className="size-4" /> Available on Google Play</a></div>
        </div>
      </footer>
    </main>
  );
}