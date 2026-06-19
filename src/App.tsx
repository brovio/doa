import { useEffect, useMemo, useState } from "react";

type Page = "home" | "buy" | "create" | "preview" | "local";
type Theme = "classic" | "garden";

type MemorialForm = {
  name: string;
  dates: string;
  intro: string;
  story: string;
  familyMessage: string;
  theme: Theme;
};

const localAreas = [
  {
    town: "Byron Bay",
    title: "QR memorial plaques and headstone links for Byron Bay families",
    terms: "headstone Byron Bay, memorial plaque Byron Bay, QR memorial plaque Byron Bay",
    copy:
      "For Byron Bay families, a QR memorial plaque can sit beside an existing headstone or grave marker and gently open a richer story online — photos, memories, family messages and a page that can keep growing over time.",
  },
  {
    town: "Ballina NSW",
    title: "Digital memorial pages and grave plaques for Ballina NSW",
    terms: "headstone Ballina, memorial plaque Ballina, digital memorial page Ballina",
    copy:
      "Families in Ballina can use a durable QR plaque to connect a physical memorial place with a calm digital tribute, helping relatives and friends revisit the life story behind the name.",
  },
  {
    town: "Mullumbimby",
    title: "Memorial plaque support for Mullumbimby and nearby communities",
    terms: "headstone Mullumbimby, memorial plaque Mullumbimby, Northern Rivers memorial plaques",
    copy:
      "For Mullumbimby and the wider Northern Rivers, the service is designed for families who want something simple, respectful and lasting — a physical QR plaque linked to a warm online memorial.",
  },
];

const faqs = [
  {
    q: "Is this a replacement for a headstone?",
    a: "No. It is designed to sit alongside an existing headstone, grave marker or memorial plaque, giving family and friends a richer story to visit online.",
  },
  {
    q: "Is the checkout real?",
    a: "Not yet. This MVP uses a dummy checkout so the product journey can be tested before real payments are connected.",
  },
  {
    q: "Can the memorial page be edited later?",
    a: "The intended product flow allows families to update the page over time. In this demo, the editor uses local preview state only.",
  },
  {
    q: "What can be included on a memorial page?",
    a: "A short introduction, life story, important dates, family messages, images and a chosen visual theme.",
  },
];

const starterForm: MemorialForm = {
  name: "Eleanor Grace Murphy",
  dates: "1948 – 2024",
  intro: "A kind mother, grandmother, neighbour and friend whose warmth shaped every room she entered.",
  story:
    "Eleanor built a life around family, music, coastal walks and the quiet rituals that made people feel cared for. Her home was a place of tea, stories and gentle humour.",
  familyMessage:
    "We miss you every day. Thank you for the patience, courage and love you gave so freely.",
  theme: "classic",
};

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [form, setForm] = useState<MemorialForm>(starterForm);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  const pageTitle = useMemo(() => {
    if (page === "buy") return "Choose a memorial plaque";
    if (page === "create") return "Personalise the memorial page";
    if (page === "preview") return `${form.name} — memorial preview`;
    if (page === "local") return "Memorial plaques in Byron Bay, Ballina and Northern Rivers";
    return "Everstone — QR memorial plaques for richer life stories";
  }, [page, form.name]);

  useEffect(() => {
    document.title = pageTitle;
    const description =
      "Premium QR-coded memorial plaques linking headstones and grave markers to beautiful online memorial pages for families.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [pageTitle]);

  const update = (field: keyof MemorialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <div className="site-shell">
      <header className="nav">
        <button className="brand" onClick={() => setPage("home")} type="button">
          <span className="brand-mark">◼</span>
          <span>
            <strong>Everstone</strong>
            <small>QR memorial plaques</small>
          </span>
        </button>

        <button className="menu-toggle" onClick={() => setMobileOpen((o) => !o)} type="button" aria-expanded={mobileOpen} aria-controls="main-menu" aria-label="Toggle navigation">
          {mobileOpen ? "Close" : "Menu"}
        </button>

        <nav className={`nav-links ${mobileOpen ? "open" : ""}`} id="main-menu" aria-label="Main navigation">
          <button className="nav-link" onClick={() => { setPage("home"); setMobileOpen(false); }} type="button">Home</button>
          <button className="nav-link" onClick={() => { setPage("buy"); setMobileOpen(false); }} type="button">The Plate</button>
          <button className="nav-link" onClick={() => { setPage("preview"); setMobileOpen(false); }} type="button">Memorials</button>
          <button className="nav-link" onClick={() => { setPage("buy"); setMobileOpen(false); }} type="button">Order</button>
          <button className="nav-cta" onClick={() => { setPage("create"); setMobileOpen(false); }} type="button">Begin</button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="eyebrow">Everstone Memorials</p>
                <h1 className="headline-xl">A story that outlasts the stone.</h1>
                <p className="body-lead hero-tagline">
                  A quiet way to keep their story close. A small, weather-ready QR memorial plaque that sits beside the stone and opens a beautiful digital page of photos, memories and messages.
                </p>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={() => setPage("buy")} type="button">
                    Order the plaque
                  </button>
                  <button className="btn btn-secondary" onClick={() => setPage("preview")} type="button">
                    View an example memorial
                  </button>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-image-block" aria-label="Memorial plaque in a quiet garden setting">
                  <div className="hero-silhouette" aria-hidden="true" />
                  <div className="hero-plaque">
                    <span className="plaque-qr">
                      <span />
                      <span />
                      <span />
                    </span>
                    <small>Scan to remember</small>
                  </div>
                </div>
                <div className="hero-detail-card">
                  <p>“From plaque to living memorial — one quiet scan keeps a life within reach.”</p>
                  <small>Made to sit beside the stone, not replace it</small>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header section-header-center">
                <p className="eyebrow">How it works</p>
                <h2 className="headline-lg">Three quiet steps to a living tribute.</h2>
              </div>
              <div className="grid grid-three">
                <article className="info-card">
                  <span className="step-number">01</span>
                  <h3>Order the plaque</h3>
                  <p className="body-quiet">Choose a discreet, weather-ready QR memorial plaque made to sit beside an existing headstone or grave marker.</p>
                </article>
                <article className="info-card">
                  <span className="step-number">02</span>
                  <h3>Personalise the page</h3>
                  <p className="body-quiet">Add their name, dates, life story, family message, photos and a theme that feels like them.</p>
                </article>
                <article className="info-card">
                  <span className="step-number">03</span>
                  <h3>Share their story</h3>
                  <p className="body-quiet">Visitors scan the QR code and open a beautiful memorial page that tells more than stone alone can hold.</p>
                </article>
              </div>
            </section>

            <section className="dark-section">
              <div className="split-section plate-split">
                <div className="split-content">
                  <p className="eyebrow">The Plate</p>
                  <h2 className="headline-md">Made to sit beside the stone, not replace it.</h2>
                  <p className="body-lead">
                    A discreet, weather-ready QR memorial plaque that opens a richer story online. No batteries, no apps — just a quiet scan that brings their memory closer.
                  </p>
                  <div className="hero-actions">
                    <button className="btn btn-light" onClick={() => setPage("buy")} type="button">
                      See the plate and order
                    </button>
                  </div>
                </div>
                <div className="split-visual plate-visual" aria-label="Memorial plaque detail view">
                  <div className="plate-mockup">
                    <span className="plate-frame">
                      <span className="plate-metal">
                        <span className="plate-qr dark">
                          <span />
                          <span />
                          <span />
                          <span />
                        </span>
                        <small>everstone.co</small>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="split-section feature-split">
              <div className="split-visual archive-visual" aria-label="A collection of remembered moments" />
              <div className="split-content">
                <p className="eyebrow">Thoughtful by design</p>
                <h2 className="headline-md">A calm space for a full life.</h2>
                <p className="body-lead">
                  From plaque to living memorial, the experience is intentionally quiet, simple and human. No clutter, no aggressive upsells, no false urgency — just a dignified path from the stone to a richer digital tribute.
                </p>
                <div className="trust-list">
                  <p>✓ Dummy checkout ready for product testing</p>
                  <p>✓ Memorial editor with preview flow</p>
                  <p>✓ Two peaceful public themes</p>
                  <p>✓ Local SEO foundations for Northern Rivers searches</p>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-header section-header-center">
                <p className="eyebrow">Local service areas</p>
                <h2 className="headline-lg">Memorial plaques and digital tributes for Northern Rivers families.</h2>
              </div>
              <div className="grid grid-three">
                {localAreas.map((area) => (
                  <article className="info-card local-card" key={area.town}>
                    <h3>{area.town}</h3>
                    <p className="body-quiet">{area.copy}</p>
                    <small>{area.terms}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className="dark-section remembrance-section">
              <div className="section narrow">
                <p className="eyebrow">Remembrance</p>
                <h2 className="headline-md">Light a candle, share a memory.</h2>
                <p className="body-lead">
                  Every story deserves a quiet place to be remembered. In time, families will be able to leave candles, messages and moments here.
                </p>
                <div className="candle-row" aria-label="Candles burning in remembrance">
                  <span className="candle" />
                  <span className="candle" />
                  <span className="candle" />
                </div>
              </div>
            </section>

            <FaqSection />
          </>
        )}

        {page === "buy" && (
          <section className="dark-section">
            <div className="section narrow">
              <div className="journey-steps">
                <span className="journey-step active">1. Order the plaque</span>
                <span className="journey-step">2. Personalise the memorial</span>
                <span className="journey-step">3. Preview and share</span>
              </div>
              <p className="eyebrow">Dummy checkout</p>
              <h1 className="headline-lg">Order the memorial plaque.</h1>
              <p className="body-lead">
                This is a demo checkout — no real payment will be taken. After ordering, you can continue to personalise the memorial page.
              </p>

              <div className="product-options">
                <article className="product-card selected">
                  <div className="product-header">
                    <h2>Premium QR Memorial Plaque</h2>
                    <span className="badge">Selected</span>
                  </div>
                  <p>
                    A tasteful, weather-ready QR memorial plaque concept designed to sit beside a headstone or grave marker and link to a personal memorial page.
                  </p>
                  <ul>
                    <li>Durable QR plaque concept</li>
                    <li>Personal memorial page included</li>
                    <li>Two peaceful themes to choose from</li>
                    <li>Designed for respectful, headstone-adjacent placement</li>
                  </ul>
                  <div className="price-row">
                    <span>Demo price</span>
                    <strong>$249</strong>
                  </div>
                </article>
              </div>

              <div className="checkout-summary">
                <h2>Order summary</h2>
                <div className="summary-line">
                  <span>Premium QR Memorial Plaque</span>
                  <span>$249</span>
                </div>
                <div className="summary-line">
                  <span>Memorial page setup</span>
                  <span>Included</span>
                </div>
                <div className="summary-line total">
                  <span>Total (demo)</span>
                  <span>$249</span>
                </div>
                <button className="btn btn-light" onClick={() => setPage("create")} type="button">
                  Continue to personalise the memorial
                </button>
                <p className="disclaimer">No payment will be taken in this demo.</p>
              </div>
            </div>
          </section>
        )}

        {page === "create" && (
          <section className="section editor-layout">
            <div>
              <div className="journey-steps">
                <span className="journey-step done">1. Order the plaque</span>
                <span className="journey-step active">2. Personalise the memorial</span>
                <span className="journey-step">3. Preview and share</span>
              </div>
              <p className="eyebrow">Personalise</p>
              <h1 className="headline-lg">Create the memorial page.</h1>
              <p className="body-lead">
                Add the details that tell their story. Keep it simple now — you can return to add more memories later.
              </p>

              <form className="editor-form">
                <label>
                  Name
                  <input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Eleanor Grace Murphy" />
                </label>

                <label>
                  Dates
                  <input value={form.dates} onChange={(event) => update("dates", event.target.value)} placeholder="e.g. 1948 – 2024" />
                </label>

                <label>
                  Short introduction
                  <textarea value={form.intro} onChange={(event) => update("intro", event.target.value)} placeholder="A sentence or two that captures their spirit." />
                </label>

                <label>
                  Life story
                  <textarea value={form.story} onChange={(event) => update("story", event.target.value)} placeholder="Share the memories, places and moments that shaped their life." />
                </label>

                <label>
                  Family message
                  <textarea value={form.familyMessage} onChange={(event) => update("familyMessage", event.target.value)} placeholder="A message from those who loved them." />
                </label>

                <label>
                  Memorial theme
                  <select value={form.theme} onChange={(event) => update("theme", event.target.value as Theme)}>
                    <option value="classic">Classic Stone</option>
                    <option value="garden">Coastal Garden</option>
                  </select>
                </label>

                <button className="btn btn-primary" onClick={() => setPage("preview")} type="button">
                  Preview the memorial
                </button>
              </form>
            </div>

            <MemorialPreview form={form} compact />
          </section>
        )}

        {page === "preview" && (
          <section className="section preview-page">
            <div className="journey-steps">
              <span className="journey-step done">1. Order the plaque</span>
              <span className="journey-step done">2. Personalise the memorial</span>
              <span className="journey-step active">3. Preview and share</span>
            </div>

            <div className="preview-header">
              <div>
                <p className="eyebrow">Public memorial preview</p>
                <h1 className="headline-lg">{form.name}</h1>
                <p className="body-quiet">{form.dates}</p>
              </div>
              <div className="hero-actions">
                <button className="btn btn-secondary" onClick={() => setPage("create")} type="button">Continue personalising</button>
                <button className="btn btn-secondary" onClick={() => setForm({ ...form, theme: form.theme === "classic" ? "garden" : "classic" })} type="button">
                  Switch theme
                </button>
              </div>
            </div>
            <MemorialPreview form={form} />
          </section>
        )}

        {page === "local" && (
          <section className="section">
            <div className="section-header">
              <p className="eyebrow">Local support</p>
              <h1 className="headline-lg">Memorial plaques for Byron Bay, Ballina, Mullumbimby and Northern Rivers.</h1>
            </div>
            <p className="body-lead">
              Useful, locally relevant information for families in the Northern Rivers looking for a QR memorial plaque or digital tribute option.
            </p>

            <div className="local-pages">
              {localAreas.map((area) => (
                <article className="local-page" key={area.town}>
                  <h2>{area.title}</h2>
                  <p className="body-quiet">{area.copy}</p>
                  <h3>Helpful for families searching for:</h3>
                  <p className="body-quiet">{area.terms}</p>
                  <h3>Common questions</h3>
                  <p className="body-quiet">
                    Can a QR plaque be used with an existing grave marker? Yes — the intent is to complement
                    the physical memorial, not replace it. Can the page be updated? The product is designed for
                    ongoing memories and family additions over time.
                  </p>
                </article>
              ))}
            </div>

            <FaqSection />
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>Everstone</strong>
            <small>QR memorial plaque MVP. Demo checkout only. Local service-area wording is used until business details are confirmed.</small>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <button onClick={() => setPage("home")} type="button">Home</button>
            <button onClick={() => setPage("buy")} type="button">The Plate</button>
            <button onClick={() => setPage("preview")} type="button">Memorials</button>
            <button onClick={() => setPage("local")} type="button">Local support</button>
            <button onClick={() => setPage("create")} type="button">Begin</button>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function MemorialPreview({ form, compact = false }: { form: MemorialForm; compact?: boolean }) {
  const initials = form.name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  return (
    <article className={`memorial ${form.theme} ${compact ? "compact" : ""}`}>
      <div className="memorial-cover">
        <div className="cover-radiance" aria-hidden="true" />
        <div className="memorial-portrait" aria-label="Memorial portrait placeholder">
          <span className="portrait-initials">{initials || "E"}</span>
        </div>
        <div className="memorial-title">
          <p className="eyebrow">{form.theme === "classic" ? "Classic Stone" : "Coastal Garden"}</p>
          <h2>{form.name}</h2>
          <p className="memorial-dates">{form.dates}</p>
        </div>
      </div>

      <div className="memorial-body">
        <blockquote className="memorial-quote">{form.intro}</blockquote>

        <div className="memorial-content">
          <section>
            <h3>Life story</h3>
            <p>{form.story}</p>
          </section>
          <section>
            <h3>From the family</h3>
            <p>{form.familyMessage}</p>
          </section>
        </div>

        <div className="gallery-row" aria-label="Image placeholders">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </article>
  );
}

function FaqSection() {
  return (
    <section className="section">
      <div className="section-header section-header-center">
        <p className="eyebrow">Questions families may ask</p>
        <h2 className="headline-md">Simple answers, calmly explained.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

