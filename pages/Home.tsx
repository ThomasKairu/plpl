import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROPERTIES, SERVICES, COMPANY_INFO } from '../constants';
import { PropertyCard } from '../components/PropertyCard';

const HERO_SLIDES = [
  {
    image: '/carousel1.png',
    title: 'Choose the Best',
    subtitle: 'We Promise and Deliver Genuinely',
    align: 'left'
  },
  {
    image: '/carousel2.png',
    title: 'Trusted by Thousands',
    subtitle: 'Your Title Deed is Ready',
    align: 'center'
  },
  {
    image: '/carousel3.png',
    title: 'Genuine Documentation',
    subtitle: 'Hassle-free Transfer Process',
    align: 'center'
  },
  {
    image: '/carousel4.png',
    title: 'Free Site Visits',
    subtitle: 'Every Saturday - Join Us!',
    align: 'right'
  },
  {
    image: '/carousel5.png',
    title: 'Prime Locations',
    subtitle: 'Makutano, Ithanga, Thika',
    align: 'center'
  },
  {
    image: '/carousel6.png',
    title: 'Tola Estate Ngoingwa',
    subtitle: 'Premium Residential Plots',
    align: 'left'
  },
  {
    image: '/carousel7.png',
    title: 'Invest Today',
    subtitle: 'Secure Your Future',
    align: 'right'
  }
];

export const Home: React.FC = () => {
  const featuredProperties = PROPERTIES.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/properties');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col">
      <Helmet>
        <title>Home - Provision Land Limited | Land for Sale in Kenya</title>
        <meta name="description" content="Find your dream plot with Provision Land Limited. We offer genuine, affordable land in Thika, Makutano, Sagana, and Machakos with ready title deeds." />
        <link rel="canonical" href="https://provisionlands.co.ke/" />
      </Helmet>

      {/* Infinite Carousel Hero Section */}
      <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-brand-900 group">
        
        {/* Slides */}
        {HERO_SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full overflow-hidden">
               <img 
                src={slide.image} 
                alt={slide.title} 
                className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear ${
                  index === currentSlide ? 'scale-110' : 'scale-100'
                }`}
              />
              {/* Intelligent Overlay: Darker gradient to make text readable over busy flyers */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/70 to-transparent mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronRight size={32} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-accent-500' : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-20 container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            {/* Rating Badge */}
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold backdrop-blur-md shadow-xl">
                <Star className="text-yellow-400 fill-current" size={14} /> 5-Star Rated Real Estate
              </span>
            </div>
            
            {/* Main Headings */}
            <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up delay-100 drop-shadow-2xl">
              {COMPANY_INFO.slogan}
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-200">
                 {HERO_SLIDES[currentSlide].title}
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-brand-50 mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200 drop-shadow-md font-light">
              {HERO_SLIDES[currentSlide].subtitle}. Join thousands of happy landowners. From Ksh 280K plots to Premium listings in Thika.
            </p>
            
            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl max-w-xl shadow-2xl border border-white/20 flex flex-col md:flex-row gap-2 animate-fade-in-up delay-300 transform transition hover:scale-105 duration-300">
               <div className="flex-grow">
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   onKeyDown={handleKeyDown}
                   placeholder="Search (e.g. Makutano, acre, commercial)..." 
                   className="w-full h-12 px-4 rounded-lg bg-white/90 text-gray-900 focus:outline-none placeholder:text-gray-500 font-medium"
                 />
               </div>
               <button 
                onClick={handleSearch}
                className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg whitespace-nowrap">
                 <Search size={20} /> Find Plot
               </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold text-white/90 animate-fade-in-up delay-500 tracking-wide uppercase">
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-accent-500" /> Ready Titles</span>
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-accent-500" /> Site Visits Daily</span>
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-accent-500" /> Flexible Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="h-1 w-20 bg-accent-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We promise and deliver genuinely across all our service offerings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-brand-200 transition duration-300 group">
                <div className="w-14 h-14 bg-brand-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-500 transition duration-300">
                   <div className="text-brand-600 group-hover:text-white transition duration-300 font-bold text-xl">
                      {service.title.charAt(0)}
                   </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">{service.description}</p>
                <Link to="/services" className="text-brand-600 font-semibold text-sm hover:text-accent-600 flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh listings from Thika, Murang'a, and Machakos.</p>
            </div>
            <Link to="/properties" className="hidden md:flex items-center gap-2 text-brand-600 font-bold hover:text-accent-600 transition">
              View All Properties <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/properties" className="inline-block bg-white border border-gray-300 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-800 skew-x-12 transform translate-x-20 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
             <img src="/our core value.jpg" alt="Why Choose Us" className="rounded-2xl shadow-2xl border-4 border-brand-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Core Values</h2>
            <p className="text-brand-100 mb-8 leading-relaxed">
              At Provision Land & Properties Ltd, we are driven by:
            </p>
            <ul className="space-y-4">
              {[
                'Integrity - We are honest in all dealings',
                'Efficiency - We value your time',
                'Quality Service - Professionalism at its peak',
                'Transparency - No hidden costs or issues',
                'Trust - Your partner in growth'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent-500 shrink-0" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link to="/contact" className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-accent-600/20 inline-block">
                Contact Us Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/our properties hero background.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-4">Site Visits Available Daily!</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">Call 0797 331 355 or 0727 774 279 to book your site visit to Matuu, Thika, or Ithanga.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-white text-brand-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg border border-brand-200">
              Book Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};