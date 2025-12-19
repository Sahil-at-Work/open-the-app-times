import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, Heart, Moon, Sun, Coffee, CloudRain, Star, MessageCircle, 
  Sparkles, Smile, Ghost, Target, Camera, Music, BookOpen, 
  Gift, MapPin, Zap, Search, Filter, Shield, Home, Utensils, MessagesSquare
} from 'lucide-react';

const CATEGORIES = {
  LOYALTY: { 
    name: 'Security', 
    color: 'bg-indigo-50/80 text-indigo-600 border-indigo-100', 
    active: 'bg-indigo-500 text-white', 
    hex: '#6366f1'
  },
  HEALTH: { 
    name: 'Health Care', 
    color: 'bg-rose-50/80 text-rose-600 border-rose-100', 
    active: 'bg-rose-500 text-white',
    hex: '#f43f5e'
  },
  FUTURE: { 
    name: 'Future', 
    color: 'bg-emerald-50/80 text-emerald-600 border-emerald-100', 
    active: 'bg-emerald-500 text-white',
    hex: '#10b981'
  },
  COMMUNICATION: { 
    name: 'Moods', 
    color: 'bg-amber-50/80 text-amber-600 border-amber-100', 
    active: 'bg-amber-500 text-white',
    hex: '#f59e0b'
  },
  ROMANCE: { 
    name: 'Wild & Sweet', 
    color: 'bg-pink-50/80 text-pink-600 border-pink-100', 
    active: 'bg-pink-500 text-white',
    hex: '#ec4899'
  }
};

const HER_PHOTOS = [
  "https://github.com/user-attachments/assets/f4dd332f-a548-4ada-8bdf-addd0e95a03b",
  "https://github.com/user-attachments/assets/c59d9f47-20f0-47bb-aa5c-a6fb421a5e5f",
  "https://github.com/user-attachments/assets/83109d92-774c-4fa8-8780-23004625960d",
  "https://github.com/user-attachments/assets/c31a5201-bb81-4537-9571-f7de45366039",
  "https://github.com/user-attachments/assets/20e9dec3-54ec-48c5-971b-5ce57fb52006",
  "https://github.com/user-attachments/assets/f500b4ff-0891-4fcb-98aa-0fd1c9b67636",
  "https://github.com/user-attachments/assets/d5ae7b85-e6d5-4f7d-ad74-27a6779ebcd4",
  "https://github.com/user-attachments/assets/c4507f84-4ab9-423a-b637-b260c48782f1",
  "https://github.com/user-attachments/assets/573c4ebc-6618-4ace-9b66-83f412f7f0af",
  "https://github.com/user-attachments/assets/6c4de006-e0e9-4c3e-80c3-d5be13803ba6"
];

const FloatingHearts = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${15 + Math.random() * 20}s`,
      size: 10 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.3
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] animate-float-heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
          }}
        >
          <Heart size={heart.size} fill="currentColor" className="text-rose-300" />
        </div>
      ))}
      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        .animate-float-heart {
          animation-name: float-heart;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

const NoteImage = ({ src }) => {
  const [aspectRatio, setAspectRatio] = useState('square');
  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const ratio = naturalWidth / naturalHeight;
    if (ratio > 1.2) setAspectRatio('landscape');
    else if (ratio < 0.8) setAspectRatio('portrait');
    else setAspectRatio('square');
  };

  return (
    <div className={`mt-6 overflow-hidden transition-all duration-700 delay-300 animate-in fade-in zoom-in-90 fill-mode-both shadow-xl
      ${aspectRatio === 'square' ? 'rounded-lg border-[12px] border-white rotate-2 hover:rotate-0 transition-transform' : ''}
      ${aspectRatio === 'portrait' ? 'rounded-2xl border-4 border-white/80 -rotate-1' : ''}
      ${aspectRatio === 'landscape' ? 'rounded-xl border-8 border-white shadow-lg' : ''}
    `}>
      <img src={src} alt="Memory" className="w-full h-auto object-cover max-h-72" onLoad={handleLoad} />
    </div>
  );
};

export default function App() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [shuffledNotes, setShuffledNotes] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

const rawDataList = useMemo(() => [
    // LOYALTY
    { 
      cat: 'LOYALTY', 
      title: "You feel insecure about others", 
      desc: "My love, remember that you are my ultimate blessing. That photo of us on my phone is my shield; it tells the world I am already completely and irrevocably taken by the most gorgeous girl I've ever known.", 
      icon: <Shield size={20}/> 
    },
    { 
      cat: 'LOYALTY', 
      title: "We are apart in a crowd", 
      desc: "Even in the busiest streets, my eyes only search for you. You aren’t just 'on the list' of people I care about; you are the entire list. I have zero interest in anyone else because I have already found my world in you.", 
      icon: <Search size={20}/> 
    },
    { 
      cat: 'LOYALTY', 
      title: "You think I’m distracted", 
      desc: "Every time I unlock my phone, I see us. That screen solves every misconception—it shows the world exactly who owns my heart and my loyalty. You are the only one I want to talk to.", 
      icon: <Camera size={20}/> 
    },
    { 
      cat: 'LOYALTY', 
      title: "You wonder if I’ll ever leave", 
      desc: "I have already decided that you are my destination. I am not looking for anyone else; I just want to be yours—the one you cherish and keep forever. My heart is already fully booked.", 
      icon: <Target size={20}/> 
    },

    // HEALTH
    { 
      cat: 'HEALTH', 
      title: "When you're feeling unwell", 
      desc: "I know there are days when things feel heavy. Please lean on me. My only goal is to make life easier for you. Whether you need your favorite snack or just me to hold your hand, I am right here.", 
      icon: <Moon size={20}/> 
    },
    { 
      cat: 'HEALTH', 
      title: "You feel like a 'burden' when sick", 
      desc: "You are never, ever a burden. Caring for you is when I feel most connected to you. It teaches me how to love you better. Thank you for letting me be your support system.", 
      icon: <Heart size={20}/> 
    },
    { 
      cat: 'HEALTH', 
      title: "You’re craving something specific", 
      desc: "Is it a treat? A favorite meal? Tell me. I want to keep you as happy as possible. My mission is to provide you with every bit of comfort I can so you can keep that beautiful smile on your face.", 
      icon: <Utensils size={20}/> 
    },

    // FUTURE
    { 
      cat: 'FUTURE', 
      title: "Dreaming of our home", 
      desc: "I wake up imagining us in a place filled with love. I see us building a life where we are both happy and our future is bright. That is the vision I want to build with you, day by day.", 
      icon: <Home size={20}/> 
    },
    { 
      cat: 'FUTURE', 
      title: "I’m working hard today", 
      desc: "Know that the effort I put into my work and studies is an effort spent working toward our future. I am building the foundation now so that one day, I can give you the life we’ve always dreamed of.", 
      icon: <Zap size={20}/> 
    },
    { 
      cat: 'FUTURE', 
      title: "You worry about the future", 
      desc: "We will face everything together. I want a future where our families feel loved and respected. My love for you includes respect for everything that made you who you are. We will be one happy family.", 
      icon: <Heart size={20}/> 
    },

    // COMMUNICATION
    { 
      cat: 'COMMUNICATION', 
      title: "I’ve upset you", 
      desc: "Please, be honest with me. If I’ve done something wrong, tell me. I would rather you be honest and angry than silent and hurting. I want to be the person who fixes things and grows with you.", 
      icon: <MessagesSquare size={20}/> 
    },
    { 
      cat: 'COMMUNICATION', 
      title: "You need a 'reset'", 
      desc: "Let’s just stop, hold hands, and remember why we started. I am with you. Not behind, not before, but right here. Let’s clear the air and remember that our love is bigger than any misunderstanding.", 
      icon: <Target size={20}/> 
    },

    // ROMANCE
    { 
      cat: 'ROMANCE', 
      title: "Why you’re 'The One'", 
      desc: "You’re the one because you make me want to be a better person. No one else could ever make me feel the way you do when you smile at me. You are my greatest blessing.", 
      icon: <Star size={20}/> 
    },
    { 
      cat: 'ROMANCE', 
      title: "Just a random day", 
      desc: "Just because it’s a normal day doesn’t mean my love is normal. I love you more today than I did yesterday. Thank you for being my present, my future, and my greatest joy. Always and forever.", 
      icon: <Smile size={20}/> 
    },
  ], []);
  useEffect(() => {
    const shuffleArray = (array) => {
      const newArr = [...array];
      for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      return newArr;
    };

    const formattedData = rawDataList.map((item, idx) => ({
      id: `note-${idx}`, 
      category: item.cat,
      title: item.title,
      desc: item.desc,
      icon: item.icon
    }));

    setShuffledNotes(shuffleArray(formattedData));
    setTimeout(() => setIsInitialLoad(false), 100);
  }, [rawDataList]);

  const handleOpenNote = (note) => {
    const randomIndex = Math.floor(Math.random() * HER_PHOTOS.length);
    setRandomPhoto(HER_PHOTOS[randomIndex]);
    setSelectedNote(note);
  };

  const filteredNotes = useMemo(() => {
    return shuffledNotes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'ALL' || note.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [shuffledNotes, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-100 to-rose-100 p-4 md:p-8 font-sans text-slate-800 relative overflow-x-hidden">
      <FloatingHearts />

      <div className="relative z-10">
        <header className="max-w-4xl mx-auto text-center mb-10">
          <div className="flex justify-center mb-4">
            <Heart className="text-rose-400 animate-pulse" fill="currentColor" size={32} />
          </div>
          
          <div className="relative inline-block px-12 md:px-24">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight drop-shadow-sm">
              Open the note <span className="text-rose-500 italic">when...</span>
            </h1>
          </div>
          
          <div className="relative max-w-md mx-auto mb-10 group mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300 group-focus-within:text-rose-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for a specific moment..."
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-md border border-rose-100 rounded-[2rem] shadow-lg shadow-rose-200/20 focus:ring-4 focus:ring-rose-200/50 focus:outline-none transition-all placeholder:text-rose-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button 
              onClick={() => setActiveCategory('ALL')}
              className={`px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-sm ${activeCategory === 'ALL' ? 'bg-rose-500 text-white shadow-rose-300' : 'bg-white/60 text-rose-400 hover:bg-white'}`}
            >
              All Letters
            </button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-sm ${activeCategory === key ? cat.active + ' shadow-lg' : 'bg-white/60 text-slate-500 hover:bg-white border border-transparent'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 relative min-h-[400px]">
          {filteredNotes.length === 0 && !isInitialLoad && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-rose-300 animate-in fade-in zoom-in">
              <Ghost size={64} className="mb-4 opacity-20" />
              <p className="font-bold">No hidden letters found for that mood...</p>
            </div>
          )}

          {filteredNotes.map((note, index) => {
            const cat = CATEGORIES[note.category];
            return (
              <button
                key={note.id}
                onClick={() => handleOpenNote(note)}
                style={{ 
                  animationDelay: `${index * 30}ms`,
                  transitionDelay: `${index * 10}ms`
                }}
                className={`
                  group relative aspect-[4/5] rounded-[2rem] p-6 flex flex-col items-center justify-center text-center 
                  shadow-lg shadow-rose-200/10 hover:shadow-2xl hover:shadow-rose-300/30 hover:-translate-y-2 
                  bg-white/80 backdrop-blur-sm border-2 border-white
                  transition-all duration-700 ease-out
                  ${isInitialLoad ? 'opacity-0 scale-90 translate-y-10' : 'opacity-100 scale-100 translate-y-0 animate-in fade-in zoom-in'}
                `}
              >
                <div className={`mb-4 p-4 rounded-2xl ${cat.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {note.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-rose-300 font-black mb-2">Open when...</span>
                <span className="text-sm font-black text-slate-700 leading-tight group-hover:text-rose-500 transition-colors">
                  {note.title}
                </span>
                <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <Sparkles size={16} className="text-rose-400" />
                </div>
              </button>
            );
          })}
        </main>
      </div>

      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/30 backdrop-blur-lg animate-in fade-in duration-500" onClick={() => setSelectedNote(null)}>
          <div 
            className="bg-white/95 w-full max-w-md rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(225,29,72,0.3)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-8 text-white flex justify-between items-start relative overflow-hidden shrink-0"
              style={{ backgroundColor: CATEGORIES[selectedNote.category].hex }}
            >
              <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
                <Heart size={200} fill="white" />
              </div>
              <div className="flex flex-col gap-3 relative z-10">
                <div className="bg-white/20 backdrop-blur-md w-fit p-3 rounded-2xl shadow-inner">
                  {React.cloneElement(selectedNote.icon, { className: "text-white", size: 30 })}
                </div>
                <div>
                  <p className="text-[10px] font-black opacity-70 uppercase tracking-[0.3em]">Special Message</p>
                  <h2 className="text-2xl font-black leading-tight drop-shadow-md">{selectedNote.title}</h2>
                </div>
              </div>
              <button onClick={() => setSelectedNote(null)} className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-all hover:rotate-90">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 pt-6 relative overflow-y-auto grow custom-scrollbar">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="relative z-10">
                <p className="text-xl leading-relaxed text-slate-700 font-serif italic mb-4">
                  {selectedNote.desc}
                </p>
                {randomPhoto && <NoteImage src={randomPhoto} />}
                <div className="mt-12 flex justify-end items-center gap-3 text-rose-500 font-serif italic font-black text-xl">
                  <span>With all my love,</span>
                  <Heart size={24} fill="currentColor" className="animate-pulse" />
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="mt-12 w-full py-4 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 font-black rounded-3xl transition-all duration-300 uppercase tracking-widest text-xs shadow-inner"
              >
                Fold Letter Back
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 text-center text-rose-300 text-sm pb-10 relative z-10">
        <p className="font-medium tracking-wide">A digital archive of my love • Forever & Always Kalyani</p>
        <p className="font-medium tracking-wide">Created with masala of love • Ray of the Mist</p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
        
        main button {
          transition-property: transform, opacity, background-color, box-shadow, left, top;
        }
      `}</style>
    </div>
  );
}
