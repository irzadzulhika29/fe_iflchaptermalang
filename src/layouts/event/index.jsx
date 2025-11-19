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
                className="relative bg-cyan-500 text-white"
                aria-label="Event highlights"
                onMouseEnter={() => (isPausedRef.current = true)}
                onMouseLeave={() => (isPausedRef.current = false)}
            >
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id ?? index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? "opacity-100" : "opacity-0"
                                }`}
                            aria-hidden={activeSlide !== index}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title || `Slide ${index + 1}`}
                                className="w-full h-full object-cover opacity-30 absolute"
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                            <div className="w-full flex flex-col justify-center items-start h-full px-16 mt-20">
                                {slide.title ? (
                                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold">
                                        {slide.title}
                                    </h1>
                                ) : null}
                                {slide.description ? (
                                    <p className="text-sm sm:text-base lg:text-lg font-normal line-clamp-2 w-full">
                                        {slide.description}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative z-0 pointer-events-none">
                    <div className="aspect-[16/7] w-full" />
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-20 ">
                    <div className="flex justify-center gap-2 relative z-30">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`h-3 rounded-full transition-all ${activeSlide === index ? "bg-white w-6" : "bg-white/50 w-3"
                                    }`}
                                aria-label={`Slide ${index + 1}`}
                                aria-current={activeSlide === index ? "true" : "false"}
                                type="button"
                            />
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