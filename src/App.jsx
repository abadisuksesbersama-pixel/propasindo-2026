import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, ChevronRight, Award, Users, Building2, 
  Handshake, Phone, Mail, MapPin, CheckCircle2, 
  ArrowRight, MessageCircle, Star, BarChart3, TrendingUp,
  ShieldCheck, Briefcase, Globe, Zap, Network, Download,
  Calendar, Calculator, FileText, ChevronDown, Scale, 
  ClipboardCheck, Headphones, Percent, HeartHandshake
} from 'lucide-react';

// ==========================================
// 1. DATA CONTENT (Updated with Official Logo)
// ==========================================
const CONTENT = {
  brand: {
    name: 'PROPASINDO',
    fullName: 'Pro Pemberdayaan Aksi Sosial Indonesia',
    tagline: 'Aksi Nyata Pemberdayaan Masyarakat',
    logoUrl: '/logo.jpg', // Pastikan file 2.jpg diubah namanya jadi logo.jpg di folder public
    logoIcon: HeartHandshake // Fallback jika gambar gagal dimuat
  },
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Kalkulator', path: '/kalkulator' },
    { name: 'Proposal', path: '/proposal' },
    { name: 'Kontak', path: '/kontak' },
  ],
  trustLogos: [
    { name: 'P3SM', label: 'Mitra Utama Akreditasi' },
    { name: 'WIRAPINDO', label: 'Kolaborasi Strategis' },
    { name: 'BNSP', label: 'Standar Kompetensi' },
    { name: '2024', label: 'Tahun Pendirian' },
  ],
  hero: {
    badge: 'Social Empowerment & Action',
    headline: {
      part1: 'Pilar',
      highlight: 'Pemberdayaan',
      part2: '& Aksi Sosial',
      bottom: 'Masyarakat Indonesia'
    },
    subheadline: 'Berdiri sejak 2024 sebagai wadah aksi sosial yang berfokus pada peningkatan martabat dan kompetensi masyarakat melalui kolaborasi strategis.',
    ctaMain: 'Lihat Program Kami',
    ctaSecondary: 'Proposal Digital 2026'
  },
  services: [
    { 
      id: 'sertifikasi',
      title: 'Sertifikasi Kompetensi', 
      desc: 'Layanan validasi keahlian yang menginduk pada lisensi resmi P3SM sebagai mitra strategis kami.', 
      icon: Briefcase,
      action: 'Konsultasi Sertifikasi',
      items: ['Mitra Pelaksana P3SM', 'Pendampingan Uji Kompetensi', 'Administrasi Sertifikat']
    },
    { 
      id: 'pemberdayaan',
      title: 'Aksi Pemberdayaan', 
      desc: 'Program aksi sosial nyata untuk meningkatkan kemandirian ekonomi masyarakat marginal.', 
      icon: Users,
      action: 'Ikut Berpartisipasi',
      items: ['Pelatihan Kewirausahaan', 'Workshop Keterampilan', 'Bantuan Sosial Aktif']
    },
    { 
      id: 'kemitraan',
      title: 'Kolaborasi Strategis', 
      desc: 'Bersinergi dengan WIRAPINDO dan P3SM untuk menciptakan ekosistem sosial yang berdaya.', 
      icon: Handshake,
      action: 'Jadilah Mitra',
      items: ['Networking Industri', 'Resource Sharing', 'Sinergi Kelembagaan']
    },
  ],
  calculator: {
    title: 'Estimasi Investasi Sertifikasi',
    subtitle: 'Rencanakan biaya pengembangan SDM Anda melalui skema kemitraan P3SM yang transparan.',
    options: [
      { id: 'sert', label: 'Sertifikasi Profesi (P3SM)', price: 2500000 },
      { id: 'k3', label: 'Lisensi K3 (P3SM)', price: 4500000 },
      { id: 'social', label: 'Pelatihan Pemberdayaan', price: 1000000 },
    ],
    tiers: [
      { max: 10, discount: 0, label: 'Normal Rate' },
      { max: 25, discount: 0.1, label: 'Silver Tier (Disc. 10%)' },
      { max: 50, discount: 0.2, label: 'Gold Tier (Disc. 20%)' },
      { max: 101, discount: 0, label: 'Custom Proposal' },
    ]
  },
  proposal: {
    sections: [
      {
        id: 'profile',
        title: 'Profil Organisasi',
        icon: Building2,
        content: 'PROPASINDO (Pro Pemberdayaan Aksi Sosial Indonesia) adalah lembaga yang lahir pada tahun 2024 dengan visi murni terhadap keberpihakan aksi pemberdayaan dan sosial masyarakat.',
        points: ['Fokus pada aksi pemberdayaan sosial.', 'Didirikan tahun 2024.', 'Misi: Memandirikan masyarakat melalui kompetensi.']
      },
      {
        id: 'collaboration',
        title: 'Kolaborasi & Afiliasi',
        icon: Network,
        content: 'Kami percaya bahwa dampak sosial yang besar hanya bisa dicapai melalui kolaborasi. Saat ini kami bangga berkolaborasi aktif dengan dua lembaga terkemuka.',
        points: ['Mitra Strategis P3SM.', 'Anggota Kolektif WIRAPINDO.', 'Sinergi Program Sertifikasi & Legalitas.']
      },
      {
        id: 'legality',
        title: 'Status Akreditasi',
        icon: Scale,
        content: 'Dalam memberikan layanan sertifikasi BNSP, PROPASINDO bertindak sebagai mitra pendamping resmi yang menginduk sepenuhnya pada SK dan Akreditasi milik lembaga P3SM.',
        points: ['Menginduk pada SK P3SM.', 'Sertifikasi BNSP via P3SM.', 'Kepatuhan Standar Penyelenggaraan.']
      },
      {
        id: 'contact',
        title: 'Hubungi Kami',
        icon: Headphones,
        content: 'Kami sangat terbuka untuk diskusi kemitraan dan kolaborasi aksi sosial.',
        points: ['Technical Advisor: 0858-1747-5597', 'Email: info@propasindo.org', 'Lokasi: Jakarta, Indonesia']
      }
    ]
  },
  contact: {
    address: 'Jl. Sudirman No. 123, Menara Prestasi, Jakarta Pusat',
    email: 'info@propasindo.org',
    phone: '+62 858 1747 5597',
    whatsapp: '6285817475597'
  }
};

// ==========================================
// 2. ROUTING ENGINE
// ==========================================
const useRouter = () => {
  const getHashPath = () => window.location.hash.replace('#', '') || '/';
  const [currentPath, setCurrentPath] = useState(getHashPath());

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getHashPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => { window.location.hash = path; };
  return { currentPath, navigate };
};

// ==========================================
// 3. COMPONENTS
// ==========================================

const Navbar = ({ currentPath, navigate, scrolled, setIsMenuOpen, isMenuOpen }) => {
  const LogoIcon = CONTENT.brand.logoIcon;
  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-100' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <div className="mr-3 overflow-hidden rounded-lg bg-white shadow-sm p-0.5">
               <img 
                 src={CONTENT.brand.logoUrl} 
                 alt="Logo PROPASINDO" 
                 className="w-10 h-10 object-contain"
                 onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
               />
               <div style={{ display: 'none' }} className="p-1.5 rounded-lg bg-[#D4AF37]">
                 <LogoIcon className="text-white w-6 h-6" />
               </div>
            </div>
            <span className={`text-2xl font-black tracking-tighter ${scrolled ? 'text-[#0F172A]' : 'text-white'}`}>{CONTENT.brand.name}</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {CONTENT.navigation.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-xs uppercase tracking-widest font-bold transition-all hover:scale-105 ${currentPath === item.path ? 'text-[#D4AF37]' : (scrolled ? 'text-slate-600 hover:text-[#0F172A]' : 'text-white/80 hover:text-white')}`}
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => navigate('/kontak')}
              className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-amber-500/10"
            >
              Kolaborasi
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={scrolled ? 'text-slate-900' : 'text-white'}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ navigate }) => (
  <section className="relative h-screen flex items-center bg-[#0F172A] overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent z-10"></div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
      <div className="max-w-4xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em]">{CONTENT.hero.badge}</span>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase">
          {CONTENT.hero.headline.part1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F5E6AD]">{CONTENT.hero.headline.highlight}</span> {CONTENT.hero.headline.part2} <br />
          <span className="text-white/90">{CONTENT.hero.headline.bottom}</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-light max-w-2xl">
          {CONTENT.hero.subheadline}
        </p>
        <div className="flex flex-wrap gap-6">
          <button onClick={() => navigate('/layanan')} className="bg-[#D4AF37] hover:bg-[#B8962E] text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest flex items-center transition-all shadow-2xl shadow-amber-500/20">
            {CONTENT.hero.ctaMain} <ArrowRight className="ml-3 w-4 h-4" />
          </button>
          <button onClick={() => navigate('/proposal')} className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-5 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>{CONTENT.hero.ctaSecondary}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <div className="bg-slate-50 py-12 border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
        {CONTENT.trustLogos.map((logo, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="text-2xl font-black text-[#0F172A] tracking-tighter mb-1">{logo.name}</div>
            <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{logo.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ServiceCalculator = () => {
  const [selected, setSelected] = useState(CONTENT.calculator.options[0].id);
  const [count, setCount] = useState(10);
  const [companyName, setCompanyName] = useState('');
  
  const selectedService = CONTENT.calculator.options.find(o => o.id === selected);
  
  const pricingData = useMemo(() => {
    let discount = 0;
    let tierLabel = 'Normal Rate';
    let isEnterprise = false;

    if (count > 50) {
      isEnterprise = true;
      tierLabel = 'Custom Quote';
    } else if (count > 25) {
      discount = 0.20;
      tierLabel = 'Gold Tier (Disc. 20%)';
    } else if (count > 10) {
      discount = 0.10;
      tierLabel = 'Silver Tier (Disc. 10%)';
    }

    const priceAfterDiscount = selectedService.price * (1 - discount);
    const total = priceAfterDiscount * count;

    return { discount, tierLabel, isEnterprise, total, priceAfterDiscount };
  }, [count, selectedService]);

  const handleWAInquiry = () => {
    const ptName = companyName.trim() || '____';
    const message = `Halo admin PROPASINDO, saya dari ${ptName} tertarik dengan program ${selectedService.label} sebanyak ${count} peserta (Mitra P3SM). Mohon info lebih lanjut.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTENT.contact.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.5em] mb-6">Transparency First</h2>
            <h3 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-8 leading-tight">{CONTENT.calculator.title}</h3>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Kami menawarkan skema harga yang adil dan terbuka. Seluruh layanan sertifikasi dikelola secara resmi melalui kemitraan strategis kami dengan P3SM untuk memastikan validitas hukum.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {CONTENT.calculator.tiers.slice(0,3).map((t, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-gray-100 text-center">
                  <div className="text-[#D4AF37] font-black text-lg mb-1">{t.discount > 0 ? `${t.discount * 100}%` : 'Normal'}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.max} Peserta</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F172A] p-10 md:p-12 rounded-[3rem] shadow-3xl relative border border-white/5">
            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Nama Organisasi / PT</label>
                <input 
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Nama Instansi Anda"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none transition-all text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Layanan (Via P3SM)</label>
                <div className="grid grid-cols-1 gap-3">
                  {CONTENT.calculator.options.map((opt) => (
                    <button 
                      key={opt.id}
                      onClick={() => setSelected(opt.id)}
                      className={`text-left p-4 rounded-xl border transition-all text-sm font-bold ${selected === opt.id ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]' : 'border-white/10 text-white/60 hover:border-white/20'}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block flex justify-between">
                  <span>Jumlah Peserta</span>
                  <span className="text-[#D4AF37] text-lg font-black">{count}</span>
                </label>
                <input 
                  type="range" min="1" max="100" step="1" 
                  value={count} 
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" 
                />
              </div>

              <div className="pt-8 border-t border-white/5">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Estimasi Investasi</p>
                    <p className="text-3xl font-black text-white">IDR {pricingData.total.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-tighter mt-1 italic">*Mengikuti SK Tarif P3SM</p>
                  </div>
                </div>

                <button 
                  onClick={handleWAInquiry}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all shadow-xl active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim Permintaan Program</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. PAGES
// ==========================================

const HomePage = ({ navigate }) => (
  <div className="animate-in fade-in duration-1000">
    <Hero navigate={navigate} />
    <TrustSection />
    
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] mb-4">Core Philosophy</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0F172A]">Aksi & <span className="text-[#D4AF37]">Pemberdayaan</span></h3>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {CONTENT.services.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="bg-slate-50 p-12 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-3xl transition-all duration-700 flex flex-col h-full">
                <IconComponent className="w-10 h-10 text-[#D4AF37] mb-8 group-hover:-translate-y-2 transition-transform" />
                <h4 className="text-2xl font-black text-[#0F172A] mb-4">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{item.desc}</p>
                <div className="space-y-3 mb-8">
                  {item.items.map((li, i) => (
                    <div key={i} className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-2" /> {li}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => navigate('/kontak')}
                  className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] group-hover:bg-[#D4AF37] transition-all"
                >
                  {item.action}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <ServiceCalculator />
  </div>
);

const ProposalPage = ({ navigate }) => (
  <div className="pt-40 pb-32 bg-slate-50 animate-in fade-in duration-700">
    <div className="max-w-5xl mx-auto px-6">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#0F172A] p-16 text-white relative">
          <div className="absolute top-10 right-10 opacity-20">
             <img 
               src={CONTENT.brand.logoUrl} 
               alt="Logo PROPASINDO" 
               className="w-40 h-40 object-contain brightness-0 invert opacity-30"
               onError={(e) => { e.target.style.display = 'none'; }}
             />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#D4AF37] mb-6">Transparency & Profile</h2>
          <h3 className="text-5xl font-black mb-8 leading-tight">Membangun Bangsa <br /> Lewat Pemberdayaan</h3>
          <p className="text-gray-400 text-lg font-light max-w-xl">
            Berdiri di tahun 2024, PROPASINDO hadir sebagai jembatan antara standar industri dan kesejahteraan sosial masyarakat.
          </p>
        </div>

        <div className="p-16">
          <div className="grid gap-20">
            {CONTENT.proposal.sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#D4AF37] flex items-center justify-center mr-6 border border-gray-100">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-3xl font-black text-[#0F172A]">{section.title}</h4>
                  </div>
                  <div className="pl-20">
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">{section.content}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.points.map((pt, i) => (
                        <div key={i} className="flex items-center bg-slate-50 p-4 rounded-xl border border-gray-100 text-sm font-bold text-[#0F172A]">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-3 shrink-0" /> {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                  {idx !== CONTENT.proposal.sections.length - 1 && (
                    <div className="absolute -bottom-10 left-7 w-[1px] h-10 bg-gray-200"></div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-32 p-12 rounded-[2rem] bg-gradient-to-br from-[#D4AF37] to-[#B8962E] text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
            <div className="mb-8 md:mb-0">
              <h5 className="text-2xl font-black mb-2 uppercase tracking-tighter">Sinergi Pemberdayaan?</h5>
              <p className="text-white/80 font-medium">Mari berkolaborasi menciptakan dampak sosial yang nyata.</p>
            </div>
            <button 
              onClick={() => navigate('/kontak')}
              className="bg-[#0F172A] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              Diskusi Kolaborasi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LayananPage = ({ navigate }) => (
  <div className="pt-48 pb-32 bg-white animate-in slide-in-from-bottom-8 duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-24 text-center">
        <h2 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.5em] mb-6">Expertise & Social Impact</h2>
        <h3 className="text-5xl font-black text-[#0F172A]">Layanan Pemberdayaan Kami</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {CONTENT.services.map((service, idx) => {
          const IconComponent = service.icon;
          return (
            <div key={idx} className="p-10 rounded-3xl bg-slate-50 border border-gray-100 hover:bg-white hover:shadow-3xl transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-[#0F172A] text-[#D4AF37] flex items-center justify-center mb-8 shadow-lg">
                <IconComponent className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">{service.title}</h3>
              <ul className="space-y-4 mb-10">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-500 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 mr-3 shrink-0"></div> {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => navigate('/kontak')} className="text-xs font-black uppercase tracking-widest text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1 hover:text-[#0F172A] transition-all">Pelajari Lebih Lanjut</button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const KontakPage = () => (
  <div className="pt-48 pb-32 bg-slate-50 animate-in fade-in duration-700">
    <div className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-3xl flex flex-col lg:flex-row border border-gray-100">
        <div className="lg:w-2/5 bg-[#0F172A] p-16 text-white relative">
          <h2 className="text-3xl font-black mb-8 leading-tight">Hubungi Kami Untuk Sinergi</h2>
          <div className="space-y-10">
            <div className="flex items-start">
              <MapPin className="text-[#D4AF37] mr-4 w-6 h-6 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Kantor Pusat</p>
                <p className="text-sm font-medium leading-relaxed">{CONTENT.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="text-[#D4AF37] mr-4 w-6 h-6 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium">{CONTENT.contact.email}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-[#D4AF37] mr-4 w-6 h-6 shrink-0" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">WA Technical Advisor</p>
                <p className="text-sm font-medium">{CONTENT.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-3/5 p-16">
          <h4 className="text-2xl font-black text-[#0F172A] mb-8">Formulir Sinergi</h4>
          <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-50 border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37] font-bold text-sm transition-all" />
              <input type="email" placeholder="Email Instansi" className="w-full bg-slate-50 border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37] font-bold text-sm transition-all" />
            </div>
            <select className="w-full bg-slate-50 border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37] font-bold text-sm transition-all appearance-none">
                <option>Pilih Kategori Kolaborasi</option>
                {CONTENT.services.map(s => <option key={s.id}>{s.title}</option>)}
            </select>
            <textarea rows="4" placeholder="Detail rencana kolaborasi atau pertanyaan..." className="w-full bg-slate-50 border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37] font-bold text-sm transition-all"></textarea>
            <button className="bg-[#D4AF37] hover:bg-[#B8962E] text-white w-full py-5 rounded-2xl font-bold uppercase text-xs tracking-widest shadow-xl transition-all transform active:scale-95 flex items-center justify-center">
              Kirim Pesan <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 5. MAIN APP
// ==========================================

const App = () => {
  const { currentPath, navigate } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const PageRenderer = useMemo(() => {
    switch(currentPath) {
      case '/': return <HomePage navigate={navigate} />;
      case '/layanan': return <LayananPage navigate={navigate} />;
      case '/kalkulator': return <ServiceCalculator />;
      case '/proposal': return <ProposalPage navigate={navigate} />;
      case '/kontak': return <KontakPage />;
      default: return (
        <div className="pt-48 pb-48 text-center bg-white min-h-[60vh]">
          <h3 className="text-4xl font-black text-[#0F172A]">Halaman Tidak Ditemukan</h3>
          <button onClick={() => navigate('/')} className="mt-12 text-xs font-bold uppercase border-b-2 border-[#D4AF37] pb-1">Kembali</button>
        </div>
      );
    }
  }, [currentPath, navigate]);

  const LogoIcon = CONTENT.brand.logoIcon;

  return (
    <div className="min-h-screen font-sans selection:bg-[#D4AF37] selection:text-white bg-white">
      <Navbar currentPath={currentPath} navigate={navigate} scrolled={scrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>{PageRenderer}</main>
      
      <footer className="bg-[#0F172A] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center mb-8">
                <div className="mr-3 overflow-hidden rounded-lg bg-white shadow-sm p-0.5">
                   <img 
                     src={CONTENT.brand.logoUrl} 
                     alt="Logo PROPASINDO" 
                     className="w-8 h-8 object-contain"
                     onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                   />
                   <div style={{ display: 'none' }} className="bg-[#D4AF37] p-1.5 rounded-lg">
                     <LogoIcon className="text-white w-4 h-4" />
                   </div>
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase">{CONTENT.brand.name}</span>
              </div>
              <p className="text-gray-500 text-[10px] leading-loose font-medium uppercase tracking-widest">{CONTENT.brand.fullName}</p>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-[#D4AF37]">Navigasi</h4>
              <ul className="space-y-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <li onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition-colors text-[10px]">Beranda</li>
                <li onClick={() => navigate('/proposal')} className="hover:text-white cursor-pointer transition-colors text-[10px]">Profil & Proposal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-[#D4AF37]">Office</h4>
              <p className="text-gray-400 text-xs leading-loose font-medium uppercase tracking-widest">{CONTENT.contact.address}</p>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
            <p>© 2026 {CONTENT.brand.name}. Mitra Strategis P3SM.</p>
            <p className="mt-6 md:mt-0 italic text-[#D4AF37]">Pro Pemberdayaan Aksi Sosial Indonesia</p>
          </div>
        </div>
      </footer>
      
      <a href={`https://wa.me/${CONTENT.contact.whatsapp}`} target="_blank" rel="noreferrer" className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all flex items-center group">
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold text-sm whitespace-nowrap uppercase tracking-widest">Kontak Sinergi</span>
      </a>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
      `}} />
    </div>
  );
};

export default App;