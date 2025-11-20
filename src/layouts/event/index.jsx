import { useEffect, useMemo, useRef, useState } from "react";
import { headerSlidesProgram, headerSlidesProject } from "../../static/event/eventData";
import ProgramList from "../../components/programlist";
import ProjectList from "../../components/projectlist";
import TabButton from "../../components/tabbutton";
import { useGetAllEvents } from "../../features/event";

const TABS = { PROGRAM: 0, PROJECT: 1 };

const EventSection = () => {
    const [activeTab, setActiveTab] = useState(TABS.PROGRAM);
    const [activeSlide, setActiveSlide] = useState(0);

    const { data: eventsFromApi, isLoading } = useGetAllEvents();

    const programEvents = eventsFromApi?.filter(
        event => event.category?.toLowerCase() === 'program'
    ) || [];

    const projectEvents = eventsFromApi?.filter(
        event => event.category?.toLowerCase() === 'project'
    ) || [];

    const isPausedRef = useRef(false);
    const reducedMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    }, []);

    const slides =
        activeTab === TABS.PROGRAM ? headerSlidesProgram : headerSlidesProject;

    useEffect(() => {
        setActiveSlide(0);
    }, [activeTab]);

    useEffect(() => {
        if (reducedMotion) return;
        const interval = setInterval(() => {
            if (isPausedRef.current) return;
            setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [reducedMotion, slides.length, activeTab]);

    return (
        <>
            <section
                className="relative bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-600 text-white overflow-hidden"
                aria-label="Event highlights"
                onMouseEnter={() => (isPausedRef.current = true)}
                onMouseLeave={() => (isPausedRef.current = false)}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Slides Container */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id ?? index}
                            className={`absolute inset-0 transition-all duration-1000 ${activeSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                                }`}
                            aria-hidden={activeSlide !== index}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title || `Slide ${index + 1}`}
                                className="w-full h-full object-cover absolute"
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                            {/* Multi-layer Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            {/* Content */}
                            <div className="w-full flex flex-col justify-center items-start h-full px-8 sm:px-12 md:px-16 lg:px-24 relative z-10">
                                <div className="max-w-3xl space-y-4 sm:space-y-6">
                                    {slide.title ? (
                                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight animate-in slide-in-from-left duration-700"
                                            style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.3)' }}>
                                            {slide.title}
                                        </h1>
                                    ) : null}
                                    {slide.description ? (
                                        <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-2xl animate-in slide-in-from-left duration-700 delay-150"
                                            style={{ textShadow: '1px 2px 4px rgba(0,0,0,0.3)' }}>
                                            {slide.description}
                                        </p>
                                    ) : null}
                                    {/* Decorative Line */}
                                    <div className="w-24 h-1 bg-white/80 rounded-full animate-in slide-in-from-left duration-700 delay-300" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aspect Ratio Spacer */}
                <div className="relative z-0 pointer-events-none">
                    <div className="aspect-[16/7] w-full" />
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setActiveSlide(prev => prev === 0 ? slides.length - 1 : prev - 1)}
                    className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 group"
                    aria-label="Previous slide"
                    type="button"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={() => setActiveSlide(prev => prev === slides.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 group"
                    aria-label="Next slide"
                    type="button"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Modern Slide Indicators */}
                <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
                    <div className="flex justify-center gap-2 sm:gap-3 relative z-30">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`group relative transition-all duration-300 ${activeSlide === index ? "w-12 sm:w-16" : "w-3 sm:w-4"
                                    }`}
                                aria-label={`Slide ${index + 1}`}
                                aria-current={activeSlide === index ? "true" : "false"}
                                type="button"
                            >
                                <div className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${activeSlide === index
                                    ? "bg-white shadow-lg shadow-white/50"
                                    : "bg-white/40 hover:bg-white/60"
                                    }`} />
                                {activeSlide === index && (
                                    <div className="absolute inset-0 bg-white/30 rounded-full blur-sm animate-pulse" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-10">
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div
                        className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md relative z-20"
                        role="tablist"
                        aria-label="Event categories"
                    >
                        <TabButton
                            onClick={() => setActiveTab(TABS.PROGRAM)}
                            id="tab-program"
                            active={activeTab === TABS.PROGRAM}
                            ariaControls="panel-program"
                            label="Program"
                        />
                        <TabButton
                            id="tab-project"
                            active={activeTab === TABS.PROJECT}
                            onClick={() => setActiveTab(TABS.PROJECT)}
                            ariaControls="panel-project"
                            label="Project"
                        />
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                        <div className="text-gray-500">Loading events...</div>
                    </div>
                )}

                {!isLoading && (
                    <div className="mb-10 sm:mb-16 md:mb-20">
                        {activeTab === TABS.PROGRAM ? (
                            <div
                                id="panel-program"
                                role="tabpanel"
                                aria-labelledby="tab-program"
                                className="animate-fade-in"
                            >
                                {programEvents.length > 0 ? (
                                    <ProgramList items={programEvents} />
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        Belum ada program tersedia
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div
                                id="panel-project"
                                role="tabpanel"
                                aria-labelledby="tab-project"
                                className="animate-fade-in"
                            >
                                {projectEvents.length > 0 ? (
                                    <ProjectList items={projectEvents} />
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        Belum ada project tersedia
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default EventSection;