import { useState, useEffect, useRef, ChangeEvent } from "react";
import "./index.css";

type ThemeKey = "heritage-studio" | "coastal-archive" | "quiet-garden";
type PageKey = "home" | "buy" | "preview" | "create" | "local";

interface MemorialDetails {
  fullName: string;
  displayName: string;
  dates: string;
  relationship: string;
  unsureRelationship: boolean;
}

interface StoryFields {
  introQuote: string;
  rememberedFor: string;
  familyMessage: string;
  lifeStoryLength: "short" | "detailed" | "";
  lifeStory: string;
  detailedLifeStory: string;
  placeConnected: string;
  placeOfBirth: string;
  favouriteMemory: string;
}

interface TimelineItem {
  year: string;
  event: string;
  location: string;
  unsure: boolean;
}

interface UploadedImage {
  fileName: string;
  objectUrl: string;
  caption: string;
}

interface SelectedAssets {
  coverImage?: string;
  noPhotosYet?: boolean;
}

interface MemorialOptions {
  showTimeline: boolean;
  showGallery: boolean;
  allowCandle: boolean;
  showFamilyMessage: boolean;
}

type DraftStatus = "" | "saved" | "submitted";

interface DraftData {
  stewardEmail: string;
  memorialDetails: MemorialDetails;
  storyFields: StoryFields;
  timeline: TimelineItem[];
  theme: ThemeKey;
  selectedAssets: SelectedAssets;
  uploadedImagePlaceholders: UploadedImage[];
  memorialOptions: MemorialOptions;
  draftStatus: DraftStatus;
}

const THEME_IMAGES: Record<ThemeKey, { hero: string; plate: string; memorialCover: string; ambience: string; archive: string; gallery: string[] }> = {
  "heritage-studio": {
    hero: "heritage-studio-hero-pexels-cottonbro-studio-8848922.jpg",
    plate: "heritage-studio-plate-pexels-rems-longjam-3372926.jpg",
    memorialCover: "heritage-studio-memorial-cover-pexels-suzy-hazelwood-1629232.jpg",
    ambience: "heritage-studio-ambience-pexels-zafer-erdo-an-1598664.jpg",
    archive: "heritage-studio-archive-pexels-thiago-jos-amaral-14807516.jpg",
    gallery: [
      "heritage-studio-gallery-01-pexels-natalia-olivera-1020014.jpg",
      "heritage-studio-gallery-02-pexels-wolfgang-vreys-12738982.jpg",
      "heritage-studio-gallery-03-pexels-berna-3330554.jpg",
      "heritage-studio-gallery-04-pexels-pavel-danilyuk-6981622.jpg",
    ],
  },
  "coastal-archive": {
    hero: "coastal-archive-hero-pexels-robin-heidrich-3314235.jpg",
    plate: "coastal-archive-plate-pexels-chibili-mugala-2130180.jpg",
    memorialCover: "coastal-archive-memorial-cover-pexels-cottonbro-studio-8834666.jpg",
    ambience: "coastal-archive-ambience-pexels-francesco-ungaro-2325446.jpg",
    archive: "coastal-archive-archive-pexels-lorenzo-manera-1990065.jpg",
    gallery: [
      "coastal-archive-gallery-01-pexels-toni-063371-2768339.jpg",
      "coastal-archive-gallery-02-pexels-stephan-salom-1796063.jpg",
      "coastal-archive-gallery-03-pexels-thomas-balabaud-1573010.jpg",
      "coastal-archive-gallery-04-pexels-kathrine-birgerud-3374207.jpg",
    ],
  },
  "quiet-garden": {
    hero: "quiet-garden-hero-pexels-fbo-media-38119778.jpg",
    plate: "quiet-garden-plate-pexels-j-nos-csatl-s-36722577.jpg",
    memorialCover: "quiet-garden-memorial-cover-pexels-alexandr-podvalny-1179229.jpg",
    ambience: "quiet-garden-ambience-pexels-cl-ment-proust-1879681.jpg",
    archive: "quiet-garden-archive-pexels-andreas-schnabl-19430406.jpg",
    gallery: [
      "quiet-garden-gallery-01-pexels-ant-armada-2815638.jpg",
      "quiet-garden-gallery-02-pexels-rene-terp-12953256.jpg",
      "quiet-garden-gallery-03-pexels-engin-akyurt-2906012.jpg",
      "quiet-garden-gallery-04-pexels-rdne-stock-project-6640891.jpg",
    ],
  },
};

const THEME_LABEL: Record<ThemeKey, string> = {
  "heritage-studio": "Family Archive",
  "coastal-archive": "Coastal Memory",
  "quiet-garden": "Garden Light",
};

const THEME_ORDER: ThemeKey[] = ["heritage-studio", "coastal-archive", "quiet-garden"];

const emptyDetails: MemorialDetails = {
  fullName: "",
  displayName: "",
  dates: "",
  relationship: "",
  unsureRelationship: false,
};

const emptyStory: StoryFields = {
  introQuote: "",
  rememberedFor: "",
  familyMessage: "",
  lifeStoryLength: "",
  lifeStory: "",
  detailedLifeStory: "",
  placeConnected: "",
  placeOfBirth: "",
  favouriteMemory: "",
};

const emptyTimeline: TimelineItem[] = [
  { year: "", event: "", location: "", unsure: false },
  { year: "", event: "", location: "", unsure: false },
  { year: "", event: "", location: "", unsure: false },
];

const defaultOptions: MemorialOptions = {
  showTimeline: true,
  showGallery: true,
  allowCandle: true,
  showFamilyMessage: true,
};

const emptyDraft = (): DraftData => ({
  stewardEmail: "",
  memorialDetails: emptyDetails,
  storyFields: emptyStory,
  timeline: emptyTimeline,
  theme: "heritage-studio",
  selectedAssets: {},
  uploadedImagePlaceholders: [],
  memorialOptions: defaultOptions,
  draftStatus: "",
});

function assetPath(theme: ThemeKey, folder: string, file: string): string {
  return "/assets/everstone/themes/" + theme + "/" + folder + "/" + file;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || (parts.length === 1 && parts[0] === "")) return "ES";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "ES";
}

function hasTimeline(timeline: TimelineItem[]): boolean {
  return timeline.some((item) => item.year.trim() !== "" || item.event.trim() !== "");
}

function hasGallery(uploads: UploadedImage[], theme: ThemeKey): boolean {
  return uploads.length > 0 || THEME_IMAGES[theme].gallery.length > 0;
}

function App(): JSX.Element {
  const [page, setPage] = useState<PageKey>("home");
  const [theme, setTheme] = useState<ThemeKey>("heritage-studio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [stewardEmail, setStewardEmail] = useState("");
  const [memorialDetails, setMemorialDetails] = useState<MemorialDetails>(emptyDetails);
  const [storyFields, setStoryFields] = useState<StoryFields>(emptyStory);
  const [timeline, setTimeline] = useState<TimelineItem[]>(emptyTimeline);
  const [selectedAssets, setSelectedAssets] = useState<SelectedAssets>({});
  const [uploadedImagePlaceholders, setUploadedImagePlaceholders] = useState<UploadedImage[]>([]);
  const [memorialOptions, setMemorialOptions] = useState<MemorialOptions>(defaultOptions);
  const [draftStatus, setDraftStatus] = useState<DraftStatus>("");
  const [draftExists, setDraftExists] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [cartCount, setCartCount] = useState(1);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("everstone-life-memorial-draft-v1");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DraftData>;
        if (parsed.stewardEmail || parsed.memorialDetails?.fullName) {
          setDraftExists(true);
        }
      }
    } catch {
      setDraftExists(false);
    }
  }, []);

  const persist = (data: DraftData) => {
    try {
      window.localStorage.setItem("everstone-life-memorial-draft-v1", JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const makeDraft = (): DraftData => ({
    stewardEmail,
    memorialDetails,
    storyFields,
    timeline,
    theme,
    selectedAssets,
    uploadedImagePlaceholders,
    memorialOptions,
    draftStatus,
  });

  const saveDraftLocally = (notify = true) => {
    const data = makeDraft();
    data.draftStatus = "saved";
    setDraftStatus("saved");
    persist(data);
    setDraftExists(true);
    if (notify) {
      setTimeout(() => setDraftStatus(""), 2000);
    }
  };

  const resumeDraft = () => {
    try {
      const raw = window.localStorage.getItem("everstone-life-memorial-draft-v1");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<DraftData>;
      if (parsed.stewardEmail !== undefined) setStewardEmail(parsed.stewardEmail);
      if (parsed.memorialDetails) setMemorialDetails(parsed.memorialDetails);
      if (parsed.storyFields) setStoryFields(parsed.storyFields);
      if (parsed.timeline) setTimeline(parsed.timeline.length > 0 ? parsed.timeline : emptyTimeline);
      if (parsed.theme && THEME_ORDER.includes(parsed.theme)) setTheme(parsed.theme);
      if (parsed.selectedAssets) setSelectedAssets(parsed.selectedAssets);
      if (parsed.uploadedImagePlaceholders) setUploadedImagePlaceholders(parsed.uploadedImagePlaceholders);
      if (parsed.memorialOptions) setMemorialOptions(parsed.memorialOptions);
      setDraftExists(true);
      setPage("create");
    } catch {
      // ignore
    }
  };

  const startAgain = () => {
    window.localStorage.removeItem("everstone-life-memorial-draft-v1");
    setStewardEmail("");
    setMemorialDetails(emptyDetails);
    setStoryFields(emptyStory);
    setTimeline(emptyTimeline);
    setTheme("heritage-studio");
    setSelectedAssets({});
    setUploadedImagePlaceholders([]);
    setMemorialOptions(defaultOptions);
    setDraftStatus("");
    setDraftExists(false);
    setStep(1);
    setShowFullPreview(false);
  };

  const navigateTo = (target: PageKey) => {
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateDetail = <K extends keyof MemorialDetails>(key: K, value: MemorialDetails[K]) => {
    setMemorialDetails((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "fullName" && prev.displayName === "" ? { displayName: value as string } : {}),
    }));
  };

  const updateStory = <K extends keyof StoryFields>(key: K, value: StoryFields[K]) => {
    setStoryFields((prev) => ({ ...prev, [key]: value }));
  };

  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string | boolean) => {
    setTimeline((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addTimelineRow = () => {
    setTimeline((prev) => [...prev, { year: "", event: "", location: "", unsure: false }]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const next: UploadedImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      next.push({ fileName: file.name, objectUrl: URL.createObjectURL(file), caption: String() });
    }
    setUploadedImagePlaceholders((prev) => [...prev, ...next]);
    setSelectedAssets((prev) => ({ ...prev, coverImage: next[0]?.objectUrl, noPhotosYet: false }));
    if (e.target) e.target.value = "";
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImagePlaceholders((prev) => {
      const next = [...prev];
      const removed = next.splice(index, 1)[0];
      if (removed) URL.revokeObjectURL(removed.objectUrl);
      return next;
    });
  };

  const handleNoPhotosYet = (checked: boolean) => {
    setSelectedAssets((prev) => ({ ...prev, noPhotosYet: checked }));
  };

  const updateCaption = (index: number, caption: string) => {
    setUploadedImagePlaceholders((prev) => {
      const next = [...prev];
      if (next[index]) next[index] = { ...next[index], caption };
      return next;
    });
  };


  const renderNav = () => (
    <nav className="nav">
      <button className="brand" onClick={() => navigateTo("home")}>
        <span className="brand-mark">E</span>
        <div>
          <strong>Everstone Life</strong>
          <small>QR memorial plaques</small>
        </div>
      </button>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <div className={"nav-links" + (menuOpen ? " open" : "")}>
        <button className="nav-link" onClick={() => navigateTo("home")}>Home</button>
        <button className="nav-link" onClick={() => navigateTo("buy")}>The Plate</button>
        <button className="nav-link" onClick={() => navigateTo("preview")}>Memorials</button>
        <button className="nav-link" onClick={() => navigateTo("buy")}>Order</button>
        <button className="nav-cta" onClick={() => navigateTo("create")}>Begin</button>
      </div>
    </nav>
  );

  const renderFooter = () => (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <strong>Everstone Life</strong>
          <small>QR memorial plaques for the people and places we love.</small>
        </div>
        <div className="footer-links">
          <button onClick={() => navigateTo("home")}>Home</button>
          <button onClick={() => navigateTo("buy")}>The Plate</button>
          <button onClick={() => navigateTo("preview")}>Memorials</button>
          <button onClick={() => navigateTo("local")}>Local areas</button>
          <button onClick={() => navigateTo("create")}>Begin</button>
        </div>
      </div>
    </footer>
  );

  const renderHome = () => {
    const themeImage = THEME_IMAGES[theme];
    return (
      <>
        <header className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Everstone Life</p>
            <h1 className="headline-xl">A quiet place to remember.</h1>
            <p className="body-lead">Bronze QR memorial plaques that link to a beautiful, shareable life page. Hand-finished, weather-kind, and designed with care.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigateTo("create")}>Begin a memorial</button>
              <button className="btn btn-secondary" onClick={() => navigateTo("buy")}>See the plate</button>
            </div>
            <div className="visual-set-row">
              <span className="visual-set-label">Visual set</span>
              {THEME_ORDER.map((key) => (
                <button
                  key={key}
                  className={"visual-set-chip" + (theme === key ? " active" : "")}
                  onClick={() => setTheme(key)}
                >
                  {THEME_LABEL[key]}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div
              className={"hero-image-block" + (theme === "heritage-studio" ? " heritage-hero" : theme === "coastal-archive" ? " coastal-hero" : " garden-hero")}
              style={{ backgroundImage: "url(" + assetPath(theme, "hero", themeImage.hero) + ")" }}
            >
              <div className="hero-image-bg" />
              <div className="hero-etched-panel" />
              <div className="hero-bronze-inset" />
              <div className="hero-qr-card">
                <div className="plaque-qr">
                  {[...Array(9)].map((_, i) => (<span key={i} />))}
                </div>
                <small>Scan to remember</small>
              </div>
              <div className="hero-note" />
              <div className="hero-detail-card">
                <p>{THEME_LABEL[theme]}</p>
                <small>Curated by Everstone</small>
              </div>
            </div>
          </div>
        </header>

        <section className="section container">
          <div className="section-header section-header-center">
            <p className="eyebrow">How it works</p>
            <h2 className="headline-md">From story to shared memorial in three gentle steps</h2>
          </div>
          <div className="grid grid-three">
            {[
              { number: "1", title: "Begin", body: "Answer a few soft questions about the person you are remembering. Save a draft at any time." },
              { number: "2", title: "Design", body: "Choose a mood and plate finish. We prepare the page, QR link, and weather-ready plaque." },
              { number: "3", title: "Share", body: "Place the plaque where it matters. Family and friends visit the page with a single scan." },
            ].map((item) => (
              <article key={item.title} className="info-card">
                <span className="step-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p className="body-quiet">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section feature-split">
          <div className="split-content">
            <p className="eyebrow">The plate</p>
            <h2 className="headline-lg">Small, solid, and made to last.</h2>
            <p className="body-lead">Each Everstone plate is cast in a warm, hand-finished metal and sealed for gardens, coastlines, and headstones. The QR links to a private, editable memorial page.</p>
            <ul className="trust-list">
              <p>Weather-tested bronze alloy finish</p>
              <p>Private, family-edited memorial page</p>
              <p>Secure QR linking with ongoing hosting</p>
            </ul>
            <button className="btn btn-primary" onClick={() => navigateTo("buy")}>Order a plate</button>
          </div>
          <div
            className={"split-visual plate-visual" + (theme === "coastal-archive" ? " coastal-plate" : theme === "quiet-garden" ? " garden-plate" : "")}
            style={{ backgroundImage: "url(" + assetPath(theme, "plate", themeImage.plate) + ")" }}
          >
            <div className="split-image-bg" />
            <div className="plate-mockup">
              <div className="plate-frame">
                <div className="plate-metal">
                  <small>Everstone</small>
                  <div className="plaque-qr dark">
                    {[...Array(15)].map((_, i) => (<span key={i} />))}
                  </div>
                  <small>Scan to visit</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="split-section">
          <div
            className={"split-visual archive-visual" + (theme === "coastal-archive" ? " coastal-archive" : theme === "quiet-garden" ? " quiet-garden" : "")}
            style={{ backgroundImage: "url(" + assetPath(theme, "archive", themeImage.archive) + ")" }}
          >
            <div className="archive-image-bg" />
          </div>
          <div className="split-content">
            <p className="eyebrow">Thoughtful by design</p>
            <h2 className="headline-lg">A page that grows with memory.</h2>
            <p className="body-lead">Photos, milestones, a family message, and a candle of remembrance. Everything stays editable, respectful, and easy to share.</p>
            <button className="btn btn-secondary" onClick={() => navigateTo("create")}>Start a page</button>
          </div>
        </section>

        <section className="section container">
          <div className="section-header section-header-center">
            <p className="eyebrow">Local areas</p>
            <h2 className="headline-md">Placed with care across the Northern Rivers</h2>
          </div>
          <div className="local-pages">
            {[
              { name: "Byron Bay", body: "Coastal walks, quiet gardens, and community memorial spaces." },
              { name: "Ballina NSW", body: "River-side and park settings for remembering a life well lived." },
              { name: "Mullumbimby", body: "Hinterland views and intimate family garden memorials." },
            ].map((area) => (
              <article key={area.name} className="info-card local-card">
                <h3>{area.name}</h3>
                <p className="body-quiet">{area.body}</p>
                <button className="btn btn-secondary" onClick={() => navigateTo("local")}>View local page</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section dark-section remembrance-section">
          <div className="container">
            <p className="eyebrow">Remembrance</p>
            <h2 className="headline-md">Light a candle, leave a message.</h2>
            <p className="body-lead">Every memorial page includes a place for visitors to quietly share a thought, a prayer, or simply to say they remember.</p>
            <div className="candle-row">
              {[...Array(5)].map((_, i) => (<div key={i} className="candle" />))}
            </div>
            <button className="btn btn-light" onClick={() => navigateTo("create")}>Create a remembrance page</button>
          </div>
        </section>

        <section className="section container narrow">
          <div className="section-header section-header-center">
            <p className="eyebrow">Questions</p>
            <h2 className="headline-md">Common questions</h2>
          </div>
          <div className="faq-list">
            {[
              { q: "Can this replace a headstone?", a: "It can complement or stand in for a traditional headstone. The plate links to a richer, living memorial page that a stone alone cannot hold." },
              { q: "Is checkout real?", a: "No. This checkout is a mock concept for now. Orders are fulfilled by our studio after we confirm details with you directly." },
              { q: "Can the page be edited later?", a: "Yes. Families can return at any time to update the story, add photos, or change settings." },
              { q: "What is included on the page?", a: "A cover image, name and dates, an introduction, optional timeline, gallery, family message, and remembrance candles." },
              { q: "How do I open a memorial?", a: "Click Begin, save a draft with your email, and fill in as much as you feel ready to share. We will guide the rest." },
            ].map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </>
    );
  };


  const renderLocal = () => (
    <>
      <section className="section container">
        <div className="section-header section-header-center">
          <p className="eyebrow">Local areas</p>
          <h1 className="headline-lg">Northern Rivers memorials</h1>
          <p className="body-lead">Everstone Life works gently with families, councils, and cemeteries across the Northern Rivers to place meaningful QR plaques in the landscape.</p>
        </div>
        <div className="local-layout">
          {[
            { name: "Byron Bay", body: "Coastal memorial gardens and quiet family spaces. We consult on plaque placement, materials, and family access to the page." },
            { name: "Ballina NSW", body: "Parklands and riverside settings. Plates are sealed for salt air and garden conditions." },
            { name: "Mullumbimby", body: "Hinterland properties and community gardens where a small, beautiful plaque can mark a tree, a bench, or a quiet corner." },
          ].map((area) => (
            <article key={area.name} className="local-page">
              <h2>{area.name}</h2>
              <p>{area.body}</p>
              <h3>What we offer</h3>
              <p>Site guidance, plaque supply, page setup, and ongoing editing support for families in the region.</p>
            </article>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: "var(--space-lg)" }}>
          <button className="btn btn-primary" onClick={() => navigateTo("create")}>Begin a memorial</button>
          <button className="btn btn-secondary" onClick={() => navigateTo("home")}>Return home</button>
        </div>
      </section>
    </>
  );

  const renderBuy = () => {
    const products = [
      { name: "Everstone Classic Plate", price: 249, note: "Hand-finished bronze-tone plate, QR etched and sealed for outdoor use. Includes one memorial page.", features: ["Single weather-sealed plate", "Lifetime QR hosting", "One private memorial page", "Family editing access"] },
      { name: "Everstone Companion Set", price: 449, note: "Two matching plates for shared memorials, plus a guided page setup call.", features: ["Two matching plates", "Lifetime QR hosting", "One shared memorial page", "Studio setup support"] },
    ];
    const total = products[selectedProduct].price * cartCount;
    return (
      <>
        <section className="section container">
          <div className="section-header section-header-center">
            <p className="eyebrow">The plate</p>
            <h1 className="headline-lg">Order an Everstone plate</h1>
            <p className="body-lead">Choose the plate that suits your setting. Checkout is a mock concept; final orders are confirmed by our studio directly.</p>
          </div>
          <div className="buy-layout">
            <div className="product-options">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className={"product-card" + (selectedProduct === index ? " selected" : "")}
                  onClick={() => setSelectedProduct(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProduct(index); }}
                >
                  <div className="product-header">
                    <h2>{product.name}</h2>
                    {index === 1 && <span className="badge">Popular</span>}
                  </div>
                  <p className="body-quiet">{product.note}</p>
                  <ul>
                    {product.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <div className="price-row">
                    <span>{selectedProduct === index ? "Selected" : "Select"}</span>
                    <strong>{"$" + product.price}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-summary">
              <h2>Checkout summary</h2>
              <label>
                Quantity
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={cartCount}
                  onChange={(e) => setCartCount(Math.max(1, Math.min(10, parseInt(e.target.value || "1", 10))))}
                />
              </label>
              <div className="summary-line">
                <span>{products[selectedProduct].name} x {cartCount}</span>
                <span>{"$" + total}</span>
              </div>
              <div className="summary-line total">
                <span>Total (mock)</span>
                <span>{"$" + total}</span>
              </div>
              <button className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }} onClick={() => navigateTo("create")}>Proceed to create page</button>
              <p className="disclaimer">This checkout is a concept preview. No payment is taken. Our studio will confirm your order and details before production.</p>
            </div>
          </div>
        </section>
      </>
    );
  };


  const renderMemorialPreview = () => {
    const themeImage = THEME_IMAGES[theme];
    const coverUrl = selectedAssets.coverImage || assetPath(theme, "ambience", themeImage.ambience);
    const displayName = memorialDetails.displayName || memorialDetails.fullName || "Your loved one";
    const dates = memorialDetails.dates || "";
    const themeClass = theme === "coastal-archive" ? " coastal-cover" : theme === "quiet-garden" ? " garden-cover" : " heritage-cover";
    const memorialClass = theme === "quiet-garden" ? " garden" : " classic";
    const populatedTimeline = timeline.filter((item) => item.year.trim() || item.event.trim() || item.location.trim());
    const showTimelineSection = memorialOptions.showTimeline && populatedTimeline.length > 0;
    const galleryItems = uploadedImagePlaceholders.length > 0
      ? uploadedImagePlaceholders.map((img) => img.objectUrl)
      : selectedAssets.noPhotosYet
      ? []
      : themeImage.gallery.map((file) => assetPath(theme, "gallery", file));
    const showGallerySection = memorialOptions.showGallery && galleryItems.length > 0;
    const showRemembered = storyFields.rememberedFor.trim() !== "";
    const showIntro = storyFields.introQuote.trim() !== "";
    const showFamilyMsg = memorialOptions.showFamilyMessage && storyFields.familyMessage.trim() !== "";
    const lifeText = storyFields.lifeStoryLength === "detailed" ? storyFields.detailedLifeStory : storyFields.lifeStory;
    const showLifeStory = lifeText.trim() !== "";
    return (
      <div className={"memorial" + memorialClass}>
        <div
          className={"memorial-cover" + themeClass}
          style={{ backgroundImage: "url(" + coverUrl + ")" }}
        >
          <div className="cover-radiance" />
          <div className="cover-ambient" />
          <div className="memorial-portrait">
            <span className="portrait-initials">{initialsFromName(displayName)}</span>
          </div>
          <div className="memorial-title">
            <h2>{displayName}</h2>
            {dates && <p className="body-quiet" style={{ color: "var(--muted)", marginTop: "0.25rem" }}>{dates}</p>}
          </div>
        </div>
        <div className="memorial-body">
          {(showIntro || showRemembered) && (
            <div className="memorial-content">
              <div className="memorial-content-col">
                {showIntro && (
                  <div className="memorial-quote">
                    <p>{storyFields.introQuote}</p>
                  </div>
                )}
                {showRemembered && <p className="remembered-for">{storyFields.rememberedFor}</p>}
              </div>
            </div>
          )}

          {showLifeStory && (
            <section style={{ marginTop: "var(--space-lg)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}>A life remembered</h3>
              <p className="body-quiet">{lifeText}</p>
              {storyFields.placeConnected.trim() && <p className="body-quiet" style={{ marginTop: "0.5rem" }}>Place connected to their life: {storyFields.placeConnected}</p>}
              {storyFields.placeOfBirth.trim() && <p className="body-quiet" style={{ marginTop: "0.5rem" }}>Born in {storyFields.placeOfBirth}</p>}
              {storyFields.favouriteMemory.trim() && <p className="body-quiet" style={{ marginTop: "0.5rem" }}>Favourite memory: {storyFields.favouriteMemory}</p>}
            </section>
          )}

          {showTimelineSection && (
            <section style={{ marginTop: "var(--space-lg)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}>Timeline of memory</h3>
              <div className="timeline-list">
                {populatedTimeline.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-year">{item.year || "?"}</div>
                    <div className="timeline-body">
                      <p>{item.event || (item.unsure ? "I do not know this yet" : "Milestone")}</p>
                      {item.location && <small>{item.location}</small>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {showGallerySection && (
            <section style={{ marginTop: "var(--space-lg)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}>Gallery</h3>
              <div className="gallery-row">
                {galleryItems.map((url, idx) => {
                  const upload = uploadedImagePlaceholders[idx];
                  return (
                    <div key={idx} style={{ display: "grid", gap: "0.25rem" }}>
                      <div className="gallery-thumb" style={{ backgroundImage: "url(" + url + ")" }} />
                      {upload && upload.caption && <small style={{ color: "var(--muted)", fontSize: "0.7rem" }}>{upload.caption}</small>}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {showFamilyMsg && (
            <section className="memorial-quote" style={{ marginTop: "var(--space-lg)" }}>
              <p>{storyFields.familyMessage}</p>
              <small style={{ display: "block", marginTop: "0.5rem", color: "var(--muted)" }}>Family message</small>
            </section>
          )}

          {memorialOptions.allowCandle && (
            <section className="remembrance-section" style={{ marginTop: "var(--space-lg)", padding: "var(--space-lg)", borderRadius: "1rem", background: "rgba(191,160,107,0.06)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem" }}>Light a candle</h3>
              <div className="candle-row">{[...Array(3)].map((_, i) => (<div key={i} className="candle" />))}</div>
              <p className="candle-note">Visitors can leave a quiet remembrance message here.</p>
            </section>
          )}
        </div>
      </div>
    );
  };


  const renderPublicPreview = () => (
    <>
      <section className="section container preview-page">
        <div className="preview-header">
          <div>
            <p className="eyebrow">Memorial preview</p>
            <h1 className="headline-lg">How the page will look</h1>
          </div>
          <button className="btn btn-secondary" onClick={() => navigateTo("create")}>Create your own</button>
        </div>
        {renderMemorialPreview()}
      </section>
    </>
  );

  const renderCreate = () => {
    const steps = [
      "Start",
      "Details",
      "First words",
      "Life story",
      "Timeline",
      "Photos and mood",
      "Options",
      "Preview",
    ];
    return (
      <>
        <section className="section container preview-page">
          <div className="preview-header">
            <div>
              <p className="eyebrow">Begin a memorial</p>
              <h1 className="headline-lg">Tell a life, gently</h1>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft locally</button>
              {draftExists && <button className="btn btn-secondary" onClick={() => startAgain()}>Start again</button>}
            </div>
          </div>

          {draftStatus === "saved" && <p className="draft-notice">Draft saved</p>}

          <div className="journey-steps">
            {steps.map((label, idx) => {
              const s = idx + 1;
              const active = step === s;
              const done = step > s;
              return <span key={label} className={"journey-step" + (active ? " active" : done ? " done" : "")}>{label}</span>;
            })}
          </div>

          <div className="editor-layout">
            <div>{renderWizardStep()}</div>
            <div className="memorial compact">{renderMemorialPreview()}</div>
          </div>
        </section>
      </>
    );
  };

  const renderWizardStep = () => {
    const next = () => setStep((s) => Math.min(8, s + 1));
    const back = () => setStep((s) => Math.max(1, s - 1));
    const canSaveStarter = stewardEmail.trim() !== "" && memorialDetails.fullName.trim() !== "";

    if (step === 1) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Start gently</h2>
          <p className="body-quiet">Only a few details are needed to begin. You can save a draft immediately and return whenever you are ready.</p>

          <div className="editor-form">
            <label>
              Steward / contact email
              <input
                type="email"
                placeholder="you@example.com"
                value={stewardEmail}
                onChange={(e) => setStewardEmail(e.target.value)}
              />
            </label>
            <label>
              Full name of the person being remembered
              <input
                placeholder="Full name"
                value={memorialDetails.fullName}
                onChange={(e) => updateDetail("fullName", e.target.value)}
              />
            </label>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" disabled={!canSaveStarter} onClick={() => saveDraftLocally()}>Save starter draft</button>
            {draftExists && <button className="btn btn-secondary" onClick={() => resumeDraft()}>Resume draft</button>}
          </div>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Essential details</h2>
          <div className="editor-form">
            <label>
              Full name
              <input value={memorialDetails.fullName} onChange={(e) => updateDetail("fullName", e.target.value)} />
            </label>
            <label>
              Preferred display name
              <input value={memorialDetails.displayName} onChange={(e) => updateDetail("displayName", e.target.value)} placeholder={memorialDetails.fullName || "Display name"} />
            </label>
            <label>
              Dates (e.g. 1945 - 2024)
              <input value={memorialDetails.dates} onChange={(e) => updateDetail("dates", e.target.value)} placeholder="1945 - 2024" />
            </label>
            <label>
              Relationship or context
              <input value={memorialDetails.relationship} onChange={(e) => updateDetail("relationship", e.target.value)} placeholder="Mother, friend, partner..." />
            </label>
            <label className="check-item">
              <input
                type="checkbox"
                checked={memorialDetails.unsureRelationship}
                onChange={(e) => updateDetail("unsureRelationship", e.target.checked)}
              />
              I am not sure yet
            </label>
          </div>
          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }


    if (step === 3) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">First words</h2>
          <div className="editor-form">
            <label>
              A short intro or quote
              <textarea value={storyFields.introQuote} onChange={(e) => updateStory("introQuote", e.target.value)} placeholder="A line that captures their spirit..." />
            </label>
            <label>
              Remembered for
              <input value={storyFields.rememberedFor} onChange={(e) => updateStory("rememberedFor", e.target.value)} placeholder="Kindness, humour, gardening, the sea..." />
            </label>
            <label>
              Family message
              <textarea value={storyFields.familyMessage} onChange={(e) => updateStory("familyMessage", e.target.value)} placeholder="A message from the family..." />
            </label>
          </div>
          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }

    if (step === 4) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Life story</h2>
          <div className="editor-form">
            <label>
              Would you like to write a short or detailed life story?
              <select value={storyFields.lifeStoryLength} onChange={(e) => updateStory("lifeStoryLength", e.target.value as "short" | "detailed" | "")}>
                <option value="">Choose...</option>
                <option value="short">Short and simple</option>
                <option value="detailed">Detailed</option>
              </select>
            </label>

            {storyFields.lifeStoryLength !== "" && (
              <>
                <label>
                  {storyFields.lifeStoryLength === "short" ? "A short life story" : "A detailed life story"}
                  <textarea
                    value={storyFields.lifeStoryLength === "short" ? storyFields.lifeStory : storyFields.detailedLifeStory}
                    onChange={(e) => updateStory(storyFields.lifeStoryLength === "short" ? "lifeStory" : "detailedLifeStory", e.target.value)}
                    placeholder="Write as much or as little as you would like..."
                  />
                </label>

                <label>
                  A place connected to their life
                  <input value={storyFields.placeConnected} onChange={(e) => updateStory("placeConnected", e.target.value)} placeholder="Town, country, or landscape..." />
                </label>

                <label>
                  Place of birth (optional)
                  <input value={storyFields.placeOfBirth} onChange={(e) => updateStory("placeOfBirth", e.target.value)} placeholder="City or town" />
                </label>

                <label>
                  A favourite memory (optional)
                  <textarea value={storyFields.favouriteMemory} onChange={(e) => updateStory("favouriteMemory", e.target.value)} placeholder="One moment that always comes to mind..." />
                </label>
              </>
            )}
          </div>
          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }

    if (step === 5) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Timeline</h2>
          <p className="body-quiet">Add at least three milestones. You can leave them as rough notes and refine later, or mark ones you are unsure about.</p>
          <div className="editor-form">
            {timeline.map((item, index) => (
              <div key={index} style={{ display: "grid", gap: "0.5rem", border: "1px solid var(--border-light)", borderRadius: "0.75rem", padding: "1rem" }}>
                <label>
                  Year
                  <input value={item.year} onChange={(e) => updateTimelineItem(index, "year", e.target.value)} placeholder="Year or era" />
                </label>
                <label>
                  Event
                  <input value={item.event} onChange={(e) => updateTimelineItem(index, "event", e.target.value)} placeholder="What happened" />
                </label>
                <label>
                  Location (optional)
                  <input value={item.location} onChange={(e) => updateTimelineItem(index, "location", e.target.value)} placeholder="Where" />
                </label>
                <label className="check-item">
                  <input
                    type="checkbox"
                    checked={item.unsure}
                    onChange={(e) => updateTimelineItem(index, "unsure", e.target.checked)}
                  />
                  I do not know this yet
                </label>
              </div>
            ))}
          </div>
          <div className="wizard-actions">
            <button className="btn btn-secondary" onClick={addTimelineRow}>Add another milestone</button>
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }


    if (step === 6) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Photos and mood</h2>
          <p className="body-quiet">Choose a mood for the memorial page. You can upload family photos now or let the selected mood guide the feel until you have photos ready.</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", margin: "1rem 0" }}>
            {THEME_ORDER.map((key) => (
              <button
                key={key}
                className={"theme-chip" + (theme === key ? " active" : "")}
                onClick={() => setTheme(key)}
              >
                {THEME_LABEL[key]}
              </button>
            ))}
          </div>

          <label className="check-item">
            <input type="checkbox" checked={!!selectedAssets.noPhotosYet} onChange={(e) => handleNoPhotosYet(e.target.checked)} />
            I do not have photos yet
          </label>

          {!selectedAssets.noPhotosYet && (
            <>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: "none" }} />
              <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>Upload family photos (mock)</button>
              <div className="upload-preview-grid">
                {uploadedImagePlaceholders.map((img, index) => (
                  <div key={index} style={{ display: "grid", gap: "0.4rem" }}>
                    <div className="upload-preview-thumb" style={{ backgroundImage: "url(" + img.objectUrl + ")" }} />
                    <input type="text" placeholder="Caption (optional)" value={img.caption} onChange={(e) => updateCaption(index, e.target.value)} style={{ fontSize: "0.75rem", padding: "0.4rem" }} />
                    <button className="btn btn-secondary" onClick={() => removeUploadedImage(index)}>Remove</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }

    if (step === 7) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Memorial options</h2>
          <div className="editor-form">
            <label className="check-item">
              <input type="checkbox" checked={memorialOptions.showTimeline} onChange={(e) => setMemorialOptions((prev) => ({ ...prev, showTimeline: e.target.checked }))} />
              Show timeline
            </label>
            <label className="check-item">
              <input type="checkbox" checked={memorialOptions.showGallery} onChange={(e) => setMemorialOptions((prev) => ({ ...prev, showGallery: e.target.checked }))} />
              Show gallery
            </label>
            <label className="check-item">
              <input type="checkbox" checked={memorialOptions.allowCandle} onChange={(e) => setMemorialOptions((prev) => ({ ...prev, allowCandle: e.target.checked }))} />
              Allow candle / remembrance messages
            </label>
            <label className="check-item">
              <input type="checkbox" checked={memorialOptions.showFamilyMessage} onChange={(e) => setMemorialOptions((prev) => ({ ...prev, showFamilyMessage: e.target.checked }))} />
              Show family message
            </label>
          </div>
          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={next}>Continue</button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft</button>
          </div>
        </div>
      );
    }

    if (step === 8) {
      return (
        <div className="preview-summary">
          <h2 className="headline-md">Preview and submit</h2>
          <p className="body-quiet">Review the preview beside this form. When you are ready, save the draft or submit your interest to our studio.</p>

          <div className="preview-summary" style={{ marginTop: "var(--space-md)" }}>
            <p className="body-quiet"><strong>Steward email:</strong> {stewardEmail || "Not provided"}</p>
            <p className="body-quiet"><strong>Name:</strong> {memorialDetails.fullName || "Not provided"}</p>
            <p className="body-quiet"><strong>Mood:</strong> {THEME_LABEL[theme]}</p>
            <p className="body-quiet"><strong>Timeline:</strong> {hasTimeline(timeline) ? "Populated" : "Empty"}</p>
            <p className="body-quiet"><strong>Gallery:</strong> {hasGallery(uploadedImagePlaceholders, theme) ? "Available" : "Empty"}</p>
          </div>

          <div className="wizard-actions">
            <button className="btn btn-primary" onClick={() => setShowFullPreview(true)}>Preview memorial page</button>
            <button className="btn btn-secondary" onClick={() => saveDraftLocally()}>Save draft locally</button>
            <button
              className="btn btn-secondary"
              disabled={submitting || !stewardEmail.trim()}
              onClick={() => {
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                  setDraftStatus("submitted");
                  saveDraftLocally(false);
                }, 1200);
              }}
            >
              {submitting ? "Sending to studio..." : "Submit interest / send to studio"}
            </button>
            <button className="btn btn-secondary" onClick={back}>Back</button>
          </div>

          {draftStatus === "submitted" && <p className="draft-notice">Thank you. Your interest has been noted. Our studio will be in touch. No email was sent in this preview.</p>}
        </div>
      );
    }

    return <div />;
  };

  const renderBody = () => {
    if (page === "home") return renderHome();
    if (page === "buy") return renderBuy();
    if (page === "preview") return renderPublicPreview();
    if (page === "create") return showFullPreview ? renderPublicPreview() : renderCreate();
    if (page === "local") return renderLocal();
    return renderHome();
  };

  return (
    <div className="site-shell">
{renderNav()}
      <main style={{ flex: 1 }}>{renderBody()}</main>
      {renderFooter()}
    </div>
  );
}

export default App;



