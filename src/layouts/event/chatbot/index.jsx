import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { programsData } from "../../../static/event/program/programData";
import TypingDots from "../../../components/chatbot/typingdots";
import ChatHeader from "../../../components/chatbot/chatheader";
import ChatComposer from "../../../components/chatbot/chatcomposer";
import MessageBubble from "../../../components/chatbot/messagebubble";
import { programRegistrationFlow } from "../../../static/chatbot/eventRegistration";
import SummaryCard from "../../../components/chatbot/summarycard";
import { normalizeUniversity } from "../../../utils/form-registration/normalizeUniversity";

const findProgram = (slugOrId) =>
    programsData.find((p) => (p.slug || String(p.id)) === slugOrId) ||
    programsData.find((p) => String(p.id) === slugOrId);

export default function Chatbot() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const programFromState = state?.program;

    const program = useMemo(
        () =>
            programFromState ||
            findProgram(slug) || {
                title: "Program",
                sdgNumber: "3",
                date: "05/2025",
                image:
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
            },
        [programFromState, slug]
    );

    const flow = useMemo(() => programRegistrationFlow(program), [program]);
    const labels = useMemo(() => {
        const map = {};
        flow.forEach((s) => {
            if (s.type === "ask") map[s.key] = s.label || s.key;
        });
        return map;
    }, [flow]);

    // ===== STATE =====
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [flowIndex, setFlowIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [answers, setAnswers] = useState({});
    const [showSummary, setShowSummary] = useState(false);

    // ===== SCROLL TO BOTTOM =====
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "auto" });
    }, []);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, showSummary]);

    // ===== TYPE DELAY =====
    const calcDelay = (text) => {
        const len = (text || "").length;
        const perChar = 18;
        const base = 400;
        return Math.min(base + len * perChar, 1800);
    };

    const pushBot = (text, next) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages((m) => [...m, { id: Date.now(), from: "bot", text }]);
            next && next();
        }, calcDelay(text));
    };

    const runStep = (i) => {
        const step = flow[i];
        if (!step) return;
        pushBot(step.text, () => {
            setFlowIndex(i);
            const nxt = flow[i + 1];
            if (nxt && nxt.type === "bot" && !nxt.waitFor) {
                runStep(i + 1);
            }
        });
    };

    useEffect(() => {
        if (flow.length) runStep(0);
    }, [flow]);

    const goNextAsk = () => {
        const nextIndex = flow.findIndex((s, i) => i > flowIndex && s.type === "ask");
        if (nextIndex !== -1) {
            runStep(nextIndex);
        } else {
            // kalo sudah gak ada pertanyaan → tampilkan hint_done (kalau ada)
            const hint = flow.find((s) => s.id === "hint_done");
            if (hint) pushBot(hint.text);
        }
    };

    const handleSend = () => {
        const raw = input;
        const v = raw.trim();
        if (!v) return;

        setMessages((m) => [...m, { id: Date.now(), from: "user", text: raw }]);
        setInput("");

        const step = flow[flowIndex];

        // 1) welcome nunggu keyword "siap"
        if (step?.waitFor === "keyword") {
            const bag = (step.keyword || []).map((k) => k.toLowerCase());
            if (bag.includes(v.toLowerCase())) {
                const nextIndex = flowIndex + 1;
                if (flow[nextIndex]) runStep(nextIndex);
            } else {
                pushBot('Ketik **"siap"** dulu ya kalau kamu udah ready 😄');
            }
            return;
        }
        if (step && step.type === "ask" && step.key) {
            let valueToSave = v;

            if (step.key === "ask_univhttp://172.16.85.150:3000") {
                valueToSave = normalizeUniversity(v);
            }

            setAnswers((a) => ({ ...a, [step.key]: valueToSave }));
        }

        // 2) selesai → summary
        if (v.toLowerCase() === "udah") {
            setShowSummary(true);
            return;
        }

        // 3) simpan jawaban step ask aktif
        if (step && step.type === "ask" && step.key) {
            setAnswers((a) => ({ ...a, [step.key]: v }));
        }

        // 4) lanjut pertanyaan berikutnya
        setTimeout(goNextAsk, 250);
    };

    const handleConfirm = () => {
        setShowSummary(false);
        pushBot("Mantap! Datamu sudah kami terima. 🎉");
        // TODO: call API submit di sini kalau perlu
    };

    const handleEdit = () => {
        setShowSummary(false);
        // balik ke step ask terakhir
        const lastAskIndex = [...flow]
            .map((s, i) => ({ s, i }))
            .filter((x) => x.s.type === "ask")
            .map((x) => x.i)
            .reverse()[0];
        if (Number.isInteger(lastAskIndex)) runStep(lastAskIndex);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="max-w-4xl mx-auto w-full p-4">
                <ChatHeader program={program} onBack={() => navigate(-1)} />
            </div>
            <div className="h-20" />

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 pb-28 pt-3">
                    <div className="min-h-full flex flex-col justify-end gap-3">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} from={m.from} text={m.text} />
                        ))}
                        {isTyping && <TypingDots />}
                        {showSummary && (
                            <SummaryCard
                                answers={answers}
                                mapping={labels}
                                onConfirm={handleConfirm}
                                onEdit={handleEdit}
                            />
                        )}
                        <div ref={endRef} />
                    </div>
                </div>
            </div>

            <ChatComposer
                value={input}
                onChange={setInput}
                onSend={handleSend}
                placeholder="Type your answer..."
            />
        </div>
    );
}
