'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import Image from 'next/image';

const ADMIN_PASS = 'darazi2025';

/* ─── Theme ──────────────────────────────────────────────── */
const ThemeCtx = createContext({ dark: true });
const useTheme = () => useContext(ThemeCtx);

function t(dark) {
  return dark ? {
    bg:        '#0d1117',
    surface:   '#161b22',
    surface2:  '#1c2128',
    border:    '#21262d',
    border2:   '#30363d',
    text:      '#f0f6fc',
    muted:     '#8b949e',
    inputBg:   '#0d1117',
    tableEven: '#161b22',
    tableOdd:  '#1c2128',
    tableHead: '#1c2128',
    topBar:    '#161b22',
  } : {
    bg:        '#f6f8fa',
    surface:   '#ffffff',
    surface2:  '#f6f8fa',
    border:    '#d0d7de',
    border2:   '#d0d7de',
    text:      '#1f2328',
    muted:     '#656d76',
    inputBg:   '#ffffff',
    tableEven: '#ffffff',
    tableOdd:  '#f6f8fa',
    tableHead: '#f6f8fa',
    topBar:    '#ffffff',
  };
}

const api = (url, method = 'GET', body) =>
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  }).then(r => r.json());

/* ─── Modal ─────────────────────────────────────────────── */
function Modal({ title, onClose, children }) {
  const { dark } = useTheme();
  const c = t(dark);
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(6px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={onClose}>
      <div style={{ background:c.surface, border:`1px solid ${c.border2}`, borderRadius:16, width:'100%', maxWidth:600, maxHeight:'90vh', display:'flex', flexDirection:'column', boxShadow:'0 32px 80px rgba(0,0,0,0.4)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 26px', borderBottom:`1px solid ${c.border}` }}>
          <h3 style={{ fontSize:17, fontWeight:700, color:c.text }}>{title}</h3>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:c.surface2, border:'none', color:c.muted, fontSize:14, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ padding:'24px 26px', overflowY:'auto' }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Field ──────────────────────────────────────────────── */
function Field({ label, name, value, onChange, as = 'input', placeholder, required }) {
  const { dark } = useTheme();
  const c = t(dark);
  const Tag = as;
  const baseStyle = { display:'block', width:'100%', padding:'11px 14px', borderRadius:8, border:`1px solid ${c.border2}`, background:c.inputBg, color:c.text, fontSize:14, fontFamily:'inherit', boxSizing:'border-box' };
  return (
    <div style={{ marginBottom:18 }}>
      <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:0.8, textTransform:'uppercase', color:c.muted, marginBottom:8 }}>
        {label}{required && <span style={{ color:'#f87171' }}> *</span>}
      </label>
      <Tag name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        style={as === 'textarea' ? { ...baseStyle, resize:'vertical' } : baseStyle}
        rows={as === 'textarea' ? 4 : undefined} />
    </div>
  );
}

/* ─── Empty State ────────────────────────────────────────── */
function EmptyState({ icon, text, onAdd, addLabel }) {
  const { dark } = useTheme();
  const c = t(dark);
  return (
    <div style={{ textAlign:'center', padding:'72px 0', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
      <div style={{ fontSize:48 }}>{icon}</div>
      <p style={{ color:c.muted, fontSize:15 }}>{text}</p>
      <button style={{ padding:'10px 20px', background:'#f0a500', color:'#0d1117', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer' }} onClick={onAdd}>{addLabel}</button>
    </div>
  );
}

/* ─── Packages Section ───────────────────────────────────── */
function PackagesSection() {
  const { dark } = useTheme();
  const c = t(dark);
  const [items,   setItems]   = useState([]);
  const [modal,   setModal]   = useState(null);
  const [form,    setForm]    = useState({});
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api('/api/admin/packages').then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  function openAdd() { setForm({ badge:'', img:'', location:'', name:'', desc:'', nights:'', hotel:'', meals:'', price:'' }); setModal('add'); }
  function openEdit(p) { setForm(p); setModal(p); }

  async function save() {
    setSaving(true);
    if (modal === 'add') await api('/api/admin/packages', 'POST', form);
    else await api('/api/admin/packages', 'PUT', form);
    await load(); setModal(null); setSaving(false);
  }
  async function del(id) {
    if (!confirm('Delete this package?')) return;
    await api('/api/admin/packages', 'DELETE', { id }); load();
  }

  const addBtn = { padding:'10px 20px', background:'#f0a500', color:'#0d1117', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer' };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:18, fontWeight:700, color:c.text, marginBottom:4 }}>Travel Packages</h2>
          <p style={{ fontSize:13, color:c.muted }}>{items.length} package{items.length !== 1 ? 's' : ''} total</p>
        </div>
        <button style={addBtn} onClick={openAdd}>+ Add Package</button>
      </div>

      {loading && <div style={{ textAlign:'center', color:c.muted, padding:'48px 0' }}>Loading…</div>}
      {!loading && items.length === 0 && <EmptyState icon="✈️" text="No packages yet." onAdd={openAdd} addLabel="+ Add Package" />}

      {!loading && items.length > 0 && (
        <div style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:12, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                {['Package','Location','Nights','Hotel','Meals','Price',''].map(h => (
                  <th key={h} style={{ padding:'13px 18px', background:c.tableHead, color:c.muted, fontSize:11, fontWeight:700, letterSpacing:0.8, textTransform:'uppercase', textAlign:'left', borderBottom:`1px solid ${c.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((p, i) => (
                <tr key={p.id} style={{ background: i % 2 === 0 ? c.tableEven : c.tableOdd }}>
                  <td style={{ padding:'14px 18px', borderBottom:`1px solid ${c.border}`, verticalAlign:'middle' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      {p.img && <img src={p.img} alt={p.name} style={{ width:48, height:36, objectFit:'cover', borderRadius:6 }} onError={e => { e.target.style.display='none'; }} />}
                      <div>
                        <div style={{ fontSize:14, fontWeight:600, color:c.text, marginBottom:3 }}>{p.name}</div>
                        {p.badge && <span style={{ display:'inline-block', padding:'2px 8px', borderRadius:4, background:'rgba(240,165,0,0.15)', color:'#f0a500', fontSize:10, fontWeight:700 }}>{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  {[p.location, p.nights, p.hotel, p.meals].map((v, j) => (
                    <td key={j} style={{ padding:'14px 18px', borderBottom:`1px solid ${c.border}`, verticalAlign:'middle', fontSize:13, color:c.muted }}>{v}</td>
                  ))}
                  <td style={{ padding:'14px 18px', borderBottom:`1px solid ${c.border}`, verticalAlign:'middle' }}>
                    <span style={{ display:'inline-block', padding:'4px 10px', borderRadius:6, background:'rgba(63,185,80,0.15)', color:'#3fb950', fontSize:13, fontWeight:700 }}>${p.price}</span>
                  </td>
                  <td style={{ padding:'14px 18px', borderBottom:`1px solid ${c.border}`, verticalAlign:'middle' }}>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={() => openEdit(p)} style={{ padding:'6px 14px', borderRadius:6, background:'rgba(56,139,253,0.15)', border:'1px solid rgba(56,139,253,0.3)', color:'#58a6ff', fontSize:12, fontWeight:600, cursor:'pointer' }}>Edit</button>
                      <button onClick={() => del(p.id)} style={{ padding:'6px 14px', borderRadius:6, background:'rgba(248,81,73,0.1)', border:'1px solid rgba(248,81,73,0.3)', color:'#f85149', fontSize:12, fontWeight:600, cursor:'pointer' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'add' ? 'Add New Package' : `Edit — ${form.name}`} onClose={() => setModal(null)}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 20px' }}>
            <Field label="Package Name"         name="name"     value={form.name||''}     onChange={set} placeholder="Summer Turkey"   required />
            <Field label="Badge"                name="badge"    value={form.badge||''}    onChange={set} placeholder="Most Popular" />
            <Field label="Location (with flag)" name="location" value={form.location||''} onChange={set} placeholder="🇹🇷 Turkey"      required />
            <Field label="Price (USD/person)"   name="price"    value={form.price||''}    onChange={set} placeholder="550"             required />
            <Field label="Nights"               name="nights"   value={form.nights||''}   onChange={set} placeholder="3 Nights" />
            <Field label="Hotel"                name="hotel"    value={form.hotel||''}    onChange={set} placeholder="4-Star Hotel" />
          </div>
          <Field label="Meals"       name="meals" value={form.meals||''} onChange={set} placeholder="Breakfast Incl." />
          <Field label="Image URL"   name="img"   value={form.img||''}   onChange={set} placeholder="https://…" />
          <Field label="Description" name="desc"  value={form.desc||''}  onChange={set} as="textarea" placeholder="Short description…" required />
          <button onClick={save} disabled={saving}
            style={{ display:'block', width:'100%', padding:13, background: saving ? '#5a4a00' : '#f0a500', color: saving ? '#8b949e' : '#0d1117', border:'none', borderRadius:8, fontSize:14, fontWeight:700, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? 'Saving…' : modal === 'add' ? 'Add Package' : 'Save Changes'}
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ─── Gallery Section ────────────────────────────────────── */
function GallerySection() {
  const { dark } = useTheme();
  const c = t(dark);
  const [items,   setItems]   = useState([]);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState({ src:'', alt:'', caption:'' });
  const [saving,  setSaving]  = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    api('/api/admin/gallery').then(d => { setItems(d); setLoading(false); });
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function save() {
    if (!form.src) return;
    setSaving(true);
    await api('/api/admin/gallery', 'POST', form);
    await load(); setForm({ src:'', alt:'', caption:'' }); setModal(false); setSaving(false);
  }
  async function del(id) {
    if (!confirm('Remove this photo?')) return;
    await api('/api/admin/gallery', 'DELETE', { id }); load();
  }

  return (
    <div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:18, fontWeight:700, color:c.text, marginBottom:4 }}>Gallery Photos</h2>
          <p style={{ fontSize:13, color:c.muted }}>{items.length} photo{items.length !== 1 ? 's' : ''} total</p>
        </div>
        <button style={{ padding:'10px 20px', background:'#f0a500', color:'#0d1117', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer' }} onClick={() => setModal(true)}>+ Add Photo</button>
      </div>

      {loading && <div style={{ textAlign:'center', color:c.muted, padding:'48px 0' }}>Loading…</div>}
      {!loading && items.length === 0 && <EmptyState icon="📸" text="No photos yet." onAdd={() => setModal(true)} addLabel="+ Add Photo" />}

      {!loading && items.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16 }}>
          {items.map(g => (
            <div key={g.id} style={{ background:c.surface, border:`1px solid ${c.border}`, borderRadius:12, overflow:'hidden' }}>
              <img src={g.src || g.url} alt={g.alt || 'Photo'} style={{ width:'100%', height:150, objectFit:'cover', display:'block' }}
                onError={e => { e.target.src='https://placehold.co/300x200?text=No+Image'; }} />
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px' }}>
                <span style={{ fontSize:12, color:c.muted, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, marginRight:8 }}>{g.alt || g.caption || 'No caption'}</span>
                <button onClick={() => del(g.id)} style={{ padding:'5px 10px', borderRadius:6, background:'rgba(248,81,73,0.1)', border:'1px solid rgba(248,81,73,0.3)', color:'#f85149', fontSize:11, fontWeight:600, cursor:'pointer', flexShrink:0 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <Modal title="Add Gallery Photo" onClose={() => setModal(false)}>
          <Field label="Image URL" name="src"     value={form.src}     onChange={set} placeholder="https://example.com/photo.jpg" required />
          <Field label="Alt Text"  name="alt"     value={form.alt}     onChange={set} placeholder="Beautiful beach in Turkey" />
          <Field label="Caption"   name="caption" value={form.caption} onChange={set} placeholder="Short caption (optional)" />
          {form.src && (
            <div style={{ marginBottom:18, borderRadius:12, overflow:'hidden', height:180 }}>
              <img src={form.src} alt="preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.target.style.opacity=0.2; }} />
            </div>
          )}
          <button onClick={save} disabled={saving}
            style={{ display:'block', width:'100%', padding:13, background: saving ? '#5a4a00' : '#f0a500', color: saving ? '#8b949e' : '#0d1117', border:'none', borderRadius:8, fontSize:14, fontWeight:700, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? 'Saving…' : 'Add Photo'}
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ─── Dark/Light Toggle ──────────────────────────────────── */
function ThemeToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} title={dark ? 'Switch to Light' : 'Switch to Dark'}
      style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:8, background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', border: dark ? '1px solid #30363d' : '1px solid #d0d7de', color: dark ? '#c9d1d9' : '#1f2328', fontSize:13, fontWeight:500, cursor:'pointer' }}>
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

/* ─── Admin Page ─────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass,   setPass]   = useState('');
  const [err,    setErr]    = useState('');
  const [tab,    setTab]    = useState('packages');
  const [dark,   setDark]   = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin-theme');
    if (saved) setDark(saved === 'dark');
  }, []);

  function toggleDark() {
    setDark(d => {
      const next = !d;
      localStorage.setItem('admin-theme', next ? 'dark' : 'light');
      return next;
    });
  }

  const c = t(dark);

  function login(e) {
    e.preventDefault();
    if (pass === ADMIN_PASS) { setAuthed(true); setErr(''); }
    else setErr('Incorrect password.');
  }

  if (!authed) {
    return (
      <div style={{ minHeight:'100vh', background: dark ? '#0d1117' : '#f6f8fa', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'Poppins, sans-serif' }}>
        <div style={{ position:'absolute', top:20, right:20 }}>
          <ThemeToggle dark={dark} onToggle={toggleDark} />
        </div>
        <div style={{ background:c.surface, border:`1px solid ${c.border2}`, borderRadius:20, padding:'48px 44px', width:'100%', maxWidth:420, boxShadow:'0 24px 64px rgba(0,0,0,0.3)' }}>
          <div style={{ marginBottom:24, display:'flex', justifyContent:'center' }}>
            <Image src="/logo-blue.svg" alt="Darazi Travels" width={130} height={44} />
          </div>
          <h1 style={{ fontSize:26, fontWeight:800, color:c.text, textAlign:'center', marginBottom:6 }}>Admin Panel</h1>
          <p style={{ fontSize:14, color:c.muted, textAlign:'center' }}>Sign in to manage website content</p>
          <form onSubmit={login} style={{ marginTop:28 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:0.8, textTransform:'uppercase', color:c.muted, marginBottom:8 }}>Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter password" autoFocus
              style={{ display:'block', width:'100%', padding:'11px 14px', borderRadius:8, border:`1px solid ${c.border2}`, background:c.inputBg, color:c.text, fontSize:14, fontFamily:'inherit', boxSizing:'border-box' }} />
            {err && <div style={{ marginTop:12, padding:'10px 14px', background:'rgba(248,81,73,0.1)', border:'1px solid rgba(248,81,73,0.4)', borderRadius:8, color:'#f85149', fontSize:13 }}>{err}</div>}
            <button type="submit" style={{ display:'block', width:'100%', padding:13, background:'#f0a500', color:'#0d1117', border:'none', borderRadius:8, fontSize:14, fontWeight:700, cursor:'pointer', marginTop:20 }}>Sign In →</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { key:'packages', label:'Packages', icon:'✈️' },
    { key:'gallery',  label:'Gallery',  icon:'📸' },
  ];

  return (
    <ThemeCtx.Provider value={{ dark }}>
      <div style={{ display:'flex', minHeight:'100vh', background:c.bg, fontFamily:'Poppins, sans-serif' }}>

        {/* Sidebar */}
        <aside style={{ width:240, background:c.surface, borderRight:`1px solid ${c.border}`, display:'flex', flexDirection:'column', flexShrink:0 }}>
          <div style={{ padding:'28px 20px 20px', borderBottom:`1px solid ${c.border}`, display:'flex', flexDirection:'column', gap:12 }}>
            <Image src={dark ? '/logo.svg' : '/logo-blue.svg'} alt="Darazi Travels" width={108} height={36} />
            <span style={{ display:'inline-block', padding:'3px 10px', borderRadius:6, background:'rgba(240,165,0,0.15)', color:'#f0a500', fontSize:10, fontWeight:700, letterSpacing:1.5, width:'fit-content' }}>ADMIN</span>
          </div>

          <nav style={{ flex:1, padding:'16px 12px', display:'flex', flexDirection:'column', gap:4 }}>
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{ display:'flex', alignItems:'center', gap:10, width:'100%', padding:'11px 14px', borderRadius:8,
                  background: tab === t.key ? 'rgba(240,165,0,0.1)' : 'none',
                  border: 'none',
                  color: tab === t.key ? '#f0a500' : c.muted,
                  fontSize:14, fontWeight: tab === t.key ? 700 : 500, textAlign:'left', cursor:'pointer' }}>
                <span style={{ fontSize:16 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </nav>

          <div style={{ padding:'16px 12px', borderTop:`1px solid ${c.border}`, display:'flex', flexDirection:'column', gap:8 }}>
            <ThemeToggle dark={dark} onToggle={toggleDark} />
            <a href="/" target="_blank" rel="noreferrer"
              style={{ display:'block', padding:'10px 14px', borderRadius:8, background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color:c.muted, fontSize:13, fontWeight:500, textAlign:'center', textDecoration:'none' }}>
              🌐 View Site
            </a>
            <button onClick={() => setAuthed(false)}
              style={{ padding:'10px 14px', borderRadius:8, background:'none', border:`1px solid ${c.border}`, color:c.muted, fontSize:13, cursor:'pointer' }}>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <div style={{ padding:'28px 36px 24px', borderBottom:`1px solid ${c.border}`, background:c.topBar, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:700, color:c.text, marginBottom:4 }}>
                {tabs.find(t => t.key === tab)?.icon} Manage {tabs.find(t => t.key === tab)?.label}
              </h1>
              <p style={{ fontSize:13, color:c.muted }}>Changes save instantly and reflect on the live site.</p>
            </div>
          </div>

          <div style={{ flex:1, padding:'32px 36px', overflowY:'auto' }}>
            {tab === 'packages' && <PackagesSection />}
            {tab === 'gallery'  && <GallerySection />}
          </div>
        </main>
      </div>
    </ThemeCtx.Provider>
  );
}
