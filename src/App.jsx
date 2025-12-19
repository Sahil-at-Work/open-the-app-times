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
          10% { opacity: var(--opacity); }
          90% { opacity: var(--opacity); }
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

const App = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [shuffledNotes, setShuffledNotes] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Raw data constant
  const rawDataList = useMemo(() => [
      { cat: 'LOYALTY', title: "You feel insecure about other girls", desc: "My love, just remember my phone screens. Bappa is on my lock screen as my blesser, but you are on my home screen as my ultimate blessing. That photo of me kissing you is my shield; it tells every girl who might look my way that I am already completely and irrevocably booked by the most gorgeous girl in Pune or Mumbai.", icon: <Shield size={20}/> },
      { cat: 'LOYALTY', title: "We are apart in a crowd", desc: "Even if I am in the busiest streets of Sangli-Miraj or Mumbai, my eyes are only searching for you. You aren’t just 'on the list' of people I care about; you are the entire list. I have zero interest in impressing anyone else because I have already found my world in you.", icon: <Search size={20}/> },
      { cat: 'LOYALTY', title: "You think I’m distracted by my phone", desc: "You know I have a constant habit of checking my phone, but do you know why? It’s because every time I unlock it, I see us. Anyone standing near me sees that I am kissing my girl. That home screen solves every misconception—it shows the world exactly who owns my heart and my loyalty.", icon: <Camera size={20}/> },
      { cat: 'LOYALTY', title: "You wonder if I’ll ever leave", desc: "I have already decided that you are my destination. I am not looking for a 'color' of flag; I just want to be your flag—the one you cherish and keep forever. I am already 'booked' by the lovely lady of my eye, and no one else can ever take that spot.", icon: <Target size={20}/> },
      { cat: 'LOYALTY', title: "You feel like a 'second choice'", desc: "Never forget that you are my absolute priority. I don’t categorize you with other things in my life because you are the foundation of everything I do. From the moment I wake up until I sleep, you are the only vision I want to see and the only person I want to impress.", icon: <Star size={20}/> },
      { cat: 'LOYALTY', title: "You see me talking to someone else", desc: "If you ever feel a pang of worry, just remember the photo on my home screen. It’s my way of telling the world, 'Look, this is the woman I love.' My loyalty isn't just a promise; it’s a visible reality that I carry with me everywhere I go, especially when you're not around.", icon: <MessageCircle size={20}/> },
      { cat: 'LOYALTY', title: "You need to know why I chose you", desc: "I chose you because in a crowd of thousands in Pune or Mumbai, you are the only one who feels like home. You are my blessing from Bappa, and I cherish you more than anything in this universe. You are the most beautiful girl my eyes will ever find, and I’m proud to be yours.", icon: <Heart size={20}/> },
      { cat: 'LOYALTY', title: "You feel like 'just another girl'", desc: "To the world, you might be one person, but to me, you are the entire world. You aren't just someone I'm dating; you are the lady of my eye, the one I want to build a life with, and the person whose face is the first thing I see when I unlock my phone.", icon: <Smile size={20}/> },
      { cat: 'LOYALTY', title: "You doubt my commitment", desc: "My commitment to you is as constant as my habit of checking my phone. Every time I look at that home screen, I am re-committing myself to you. You are my blessing, and I will never do anything to lose the greatest gift Bappa has ever given me.", icon: <Zap size={20}/> },
      { cat: 'LOYALTY', title: "You want to feel protected", desc: "Consider my love your sanctuary. Just like I keep our private moment on my screen to ward off the world, I will always keep you safe in my arms. I am your shield, your partner, and the man who will always choose you over everyone else.", icon: <Ghost size={20}/> },
      { cat: 'HEALTH', title: "The 18th of the month arrives", desc: "My love, I know this date marks the start of that wretched pain. Please lean on me. I’ve learned so much since that night of the 18-19-20, and my only goal is to make you feel easy. Whether you need a pad, a waffle, or just me to hold your hand, I am right here.", icon: <Moon size={20}/> },
      { cat: 'HEALTH', title: "You are in too much pain to speak", desc: "Just rest, my darling. I don’t need you to say a word. I just want to keep my hand on your belly and try my best to conjure up as much happiness as I can for you. I hate seeing my world in pain, so let me carry the weight for you today.", icon: <Coffee size={20}/> },
      { cat: 'HEALTH', title: "You feel 'moody' or 'difficult'", desc: "I don’t care about your mood; I only care about you. If you’re angry or sad because of the pain, let it out. I’m sitting here worried because I want you to be happy, but I will never leave your side just because the days are getting a little bit dark.", icon: <CloudRain size={20}/> },
      { cat: 'HEALTH', title: "You need a 'Period Care' package", desc: "I want to make sure your stomach is never empty and your heart is always full. I’ll bring the pasta, the pizza, and the chocolate lava cake. I want to see that sexy, curvy smile return to your lips because that is my favorite sight in the world.", icon: <Gift size={20}/> },
      { cat: 'HEALTH', title: "You feel like you’re a burden", desc: "You are never, ever a burden to me. Taking care of you during those nights in the 18th-20th was the most connected I’ve ever felt to you. It taught me how to love you better. I don’t have a sister to have learned this from, so thank you for letting me be your caretaker.", icon: <Heart size={20}/> },
      { cat: 'HEALTH', title: "You need to be held", desc: "If I’m not there, imagine my arms around you and my hand gently on your belly. I want that pain to go away more than anything. You are my world, and I can't have my world in pain. Please rest and let my love be your comfort today.", icon: <Sparkles size={20}/> },
      { cat: 'HEALTH', title: "You’re craving something specific", desc: "Is it a waffle? Pizza? Tell me. I want to keep you as happy as possible so you don’t feel that pain quite so much. My only mission during these days is to provide you with every bit of comfort I can conjure up from each moment we share.", icon: <Utensils size={20}/> },
      { cat: 'HEALTH', title: "You think I don't understand", desc: "I’m learning every day, love. Those nights of the 18th-20th changed me. I realized that love isn't just about the happy times; it’s about being with you in the trenches of pain. I’m never the same after that experience, and I only want to love you more because of it.", icon: <BookOpen size={20}/> },
      { cat: 'HEALTH', title: "You feel unattractive while sick", desc: "To me, you are always the most gorgeous girl. Even when you’re in pain, even when you’re resting, I see the woman I want to marry. I want to keep that curvy smile on your lips forever. You are my blessing, and you are beautiful in every single state.", icon: <Camera size={20}/> },
      { cat: 'HEALTH', title: "You just want the pain to stop", desc: "I wish I could take it all and bear it myself. Since I can't, I will be the one who stands by you, brings you whatever you need, and consoles you. You don’t need to worry when I am with you—not behind, not before, but right with you.", icon: <Target size={20}/> },
      { cat: 'FUTURE', title: "Dreaming of our home", desc: "I wake up every morning imagining us in a house filled with love. I see us married, having a good home where both our parents are happy and our kids are running around. That is the 'sweetest of visions' I want to build with you, day by day, starting now.", icon: <Home size={20}/> },
      { cat: 'FUTURE', title: "I’m studying hard for exams", desc: "Know that every hour I spend buried in books is an hour spent working toward our future home. I am building 'everything above' the love we have now so that one day, I can ask you to be mine forever in the home we’ve always dreamed of.", icon: <Zap size={20}/> },
      { cat: 'FUTURE', title: "You wonder about our future kids", desc: "I imagine them having your curvy smile and your beautiful heart. I want to build a world for them where they see how much their father loves their mother. You are my world, and I can't wait to see our world grow into a family.", icon: <Smile size={20}/> },
      { cat: 'FUTURE', title: "You worry about our parents", desc: "We will take care of them together. I want a home where both our parents feel loved and respected. My love for you includes my love for the people who raised you. We will be one big, happy family, and I will always do my best for them.", icon: <Heart size={20}/> },
      { cat: 'FUTURE', title: "You want to talk about 'The Big Day'", desc: "I can already see it—you as the most gorgeous bride Pune has ever seen. But more than the wedding, I look forward to the 'day after,' when I get to wake up next to my blessing every single morning for the rest of my life.", icon: <Star size={20}/> },
      { cat: 'FUTURE', title: "You feel like our dreams are far away", desc: "They might feel far, but we are building the foundation every single day. Every 'I love you,' every shared meal, and every moment of support is a brick in our future home. I am never giving up on the vision of us being married and happy.", icon: <Target size={20}/> },
      { cat: 'FUTURE', title: "You want to plan our kitchen", desc: "I promise to keep that kitchen stocked with all your favorites. I never want your stomach to be empty. We will cook together, laugh together, and share our 'sweetest visions' over pizza and pasta in our very own dining room one day soon.", icon: <Utensils size={20}/> },
      { cat: 'FUTURE', title: "You need a reminder of our 'forever'", desc: "I love you beyond anything in this world or even the universe. My love isn't temporary; it’s a lifetime commitment. You already have me as a whole, so you never have to ask to 'book' me for the future—I’m already yours for eternity.", icon: <Sparkles size={20}/> },
      { cat: 'FUTURE', title: "You’re tired of waiting", desc: "I know it’s hard, but I am working as hard as I can to make our dreams a reality. I am building our life bit by bit. Just keep loving me as I do this for us, and I promise the wait will be worth every second when we finally move in.", icon: <Moon size={20}/> },
      { cat: 'FUTURE', title: "Home Screen becoming Reality", desc: "One day, that photo of us won't just be on my phone; it will be a framed picture on the wall of our living room. We won't have to say goodbye at the end of the night because we will finally be home together.", icon: <Camera size={20}/> },
      { cat: 'COMMUNICATION', title: "I’ve upset you", desc: "Please, je manaat asel te bolaaves. If I’ve done something you don’t like, tell me. Don’t worry about my feelings or mann hurt hoil. I would rather you be honest and angry than silent and hurting. I want to be the person who fixes things for you.", icon: <MessagesSquare size={20}/> },
      { cat: 'COMMUNICATION', title: "You’re afraid to tell me something", desc: "You are my absolute priority. There is nothing you can say that will make me love you less. Whether it’s a small worry or a big fear, share it with me. I want to be the 'flag' you cherish—the one who listens and understands everything.", icon: <MessageCircle size={20}/> },
      { cat: 'COMMUNICATION', title: "You don’t understand my mood", desc: "If I’m quiet or stressed, it’s probably just the exams or the weight of wanting to provide for us. But never doubt that I want to keep you as happy as possible. Talk to me, and let’s figure out how to make things 'easy' again together.", icon: <Ghost size={20}/> },
      { cat: 'COMMUNICATION', title: "You need to be 'real' with me", desc: "I love you baccha, and that means loving the real you—the happy you, the sad you, and the 'tell-it-like-it-is' you. Never hide your true thoughts to protect me. I want our love to be built on total honesty and deep connection, no matter what.", icon: <Sparkles size={20}/> },
      { cat: 'COMMUNICATION', title: "You feel like we’re arguing too much", desc: "Arguments are just us trying to find our way back to each other. I am never the same after we fight because it makes me want to try harder to give you the most happiness I can. Let’s look in each other's eyes and remember we’re on the same team.", icon: <Zap size={20}/> },
      { cat: 'COMMUNICATION', title: "You need to hear 'I’m sorry'", desc: "If I’ve been stubborn, I’m sorry. My goal is never to give you a reason to be angry. I always want you to be happy. Please accept my apology as a token of my love, and let’s build something better starting tomorrow morning.", icon: <Heart size={20}/> },
      { cat: 'COMMUNICATION', title: "Feeling 'red, black, blue, or green'", desc: "I don’t care about the labels of the world. I just want to be your flag. If you’re feeling colorful or dark, I’ll be the flag that flies beside you. I will always try to do everything in my power to make you comfortable.", icon: <Shield size={20}/> },
      { cat: 'COMMUNICATION', title: "You think I’m not listening", desc: "I am listening to every word, every sigh, and every silence. I am sitting here sitting here trying to understand your mood because your happiness is my mission. Tell me what’s on your heart, and I promise to hold it with the utmost care.", icon: <Utensils size={20}/> },
      { cat: 'COMMUNICATION', title: "Do I still 'get' you?", desc: "I am constantly trying to learn you. Your replies to my messages make me think about whether you love them or not. If you do, I’ll send a thousand more just to keep you smiling. I am a student of your happiness, Kalyani.", icon: <BookOpen size={20}/> },
      { cat: 'COMMUNICATION', title: "You need a 'reset'", desc: "Let’s just stop, hold hands, and look into each other's eyes. I am with you. Not behind, not before, but right here. Let’s clear the air and remember that our love is bigger than any misunderstanding or any bad day we might have.", icon: <Target size={20}/> },
      { cat: 'ROMANCE', title: "You want the wildest of my kisses", desc: "Close your eyes and imagine I’m right there. I want to feel your curvy smile against mine and give you a kiss that makes the rest of the world disappear. You are the only lady I ever want to kiss, today and every day forever.", icon: <Heart size={20}/> },
      { cat: 'ROMANCE', title: "You want a 'Classic' date", desc: "Let’s do it all—the surprise at home, the pasta, the pizza, the movie, and our own couple dance. I want to celebrate you in the most classic way possible because you are a timeless beauty who deserves the very best of everything.", icon: <Gift size={20}/> },
      { cat: 'ROMANCE', title: "You need a Choco Lava cake fix", desc: "Consider this your permission to order the biggest one you can find! I want that stomach never to be empty and that smile always to be wide. If I were there, I’d feed it to you myself just to see you happy.", icon: <Coffee size={20}/> },
      { cat: 'ROMANCE', title: "You want to dance", desc: "Even if there’s no music, let’s just sway together. I want to feel your head on my shoulder and know that I’m holding my entire world. This is what love is to me—sharing the quiet, fun moments and just being 'with' you.", icon: <Music size={20}/> },
      { cat: 'ROMANCE', title: "Read an old message of mine", desc: "I meant every word I ever sent you. Every 'I love you,' every reel reply, and every 'baccha' was a piece of my heart. I will never stop sending those replies if they keep you smiling and feeling loved by me.", icon: <BookOpen size={20}/> },
      { cat: 'ROMANCE', title: "Why you’re 'The One'", desc: "You’re the one because you’re my blessing. You’re the one because you make me want to be a better man. You’re the one because no one else in Pune or Mumbai could ever make me feel the way you do when you smile.", icon: <Star size={20}/> },
      { cat: 'ROMANCE', title: "Craving a 'Vision' of us", desc: "Imagine us on a quiet evening, years from now, looking back at these notes and laughing. We’ll be in our home, our parents will be happy, and we’ll still be as obsessed with each other as we are right now. That’s my vision.", icon: <Sparkles size={20}/> },
      { cat: 'ROMANCE', title: "You feel like life is a movie", desc: "If our life is a movie, you are the star, and I am the lucky guy who gets to be your leading man. I’ll watch any movie with you (even ST!), but the best story I’ve ever known is the one we are writing.", icon: <Camera size={20}/> },
      { cat: 'ROMANCE', title: "You want to feel endlessly loved", desc: "I love you beyond anything in this world or even the universe. My love for you is a constant force, like the sun. It’s always there, even when the clouds are grey. You are my world, and I love you endlessly, Kalyani.", icon: <Heart size={20}/> },
      { cat: 'ROMANCE', title: "Just a random Tuesday", desc: "Just because it’s a normal day doesn’t mean my love is normal. I love you more today than I did yesterday. Thank you for being my girlfriend, my future, and my greatest blessing. I love you, baccha. Always and forever. ❤️", icon: <Smile size={20}/> },
  ], []);

  // Shuffle Logic on Reload
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
      id: `note-${idx}`, // Static ID to help React track elements
      category: item.cat,
      title: item.title,
      desc: item.desc,
      icon: item.icon
    }));

    setShuffledNotes(shuffleArray(formattedData));
    
    // Slight delay to trigger entry animations
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

        {/* The Grid Container */}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/30 backdrop-blur-lg animate-in fade-in duration-500">
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
                <p className="text-xl leading-relaxed text-slate-700 font-serif italic mb-4 first-letter:text-5xl first-letter:font-bold first-letter:text-rose-500 first-letter:mr-2 first-letter:float-left">
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
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedNote(null)}></div>
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
};

export default App;
