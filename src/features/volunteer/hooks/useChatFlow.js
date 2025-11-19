import { useState, useEffect, useMemo, useCallback } from "react";
import { validateField, validateAnswer } from "../../../utils/chatbot/validator";

export const useChatFlow = (flow) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [flowIndex, setFlowIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentOptions, setCurrentOptions] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [validationState, setValidationState] = useState({
    status: null,
    message: "",
    preview: ""
  });

  const labels = useMemo(() => {
    const map = {};
    flow.forEach((s) => {
      if (s.type === "ask") map[s.key] = s.label || s.key;
    });
    return map;
  }, [flow]);

  const totalSteps = useMemo(() => {
    return flow.filter((s) => s.type === "ask").length;
  }, [flow]);

  const calcDelay = (text) => {
    const len = (text || "").length;
    const perChar = 18;
    const base = 400;
    return Math.min(base + len * perChar, 1800);
  };

  const pushBot = useCallback((text, next) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: Date.now(), from: "bot", text }]);
      next && next();
    }, calcDelay(text));
  }, []);

  const runStep = useCallback((i) => {
    const step = flow[i];
    if (!step) return;

    pushBot(step.text, () => {
      setFlowIndex(i);

      if (step.type === "ask") {
        const askSteps = flow.slice(0, i + 1).filter((s) => s.type === "ask");
        setCurrentStep(askSteps.length);
      }

      if (step.type === "ask" && step.options) {
        setCurrentOptions(step.options);
      } else {
        setCurrentOptions(null);
      }

      const nxt = flow[i + 1];
      if (nxt && nxt.type === "bot" && !nxt.waitFor) {
        runStep(i + 1);
      }
    });
  }, [flow, pushBot]);

  const goNextAsk = useCallback(() => {
    const nextIndex = flow.findIndex((s, i) => i > flowIndex && s.type === "ask");
    if (nextIndex !== -1) {
      runStep(nextIndex);
    } else {
      const hint = flow.find((s) => s.id === "hint_done");
      if (hint) pushBot(hint.text);
    }
  }, [flow, flowIndex, pushBot, runStep]);

  const handleInputChange = useCallback((value) => {
    setInput(value);
    const step = flow[flowIndex];
    const result = validateField(value, step);
    setValidationState(result);
  }, [flow, flowIndex]);

  const handleSend = useCallback(() => {
    const raw = input;
    const v = raw.trim();
    if (!v) return;

    setValidationState({ status: null, message: "", preview: "" });
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: raw }]);
    setInput("");

    const step = flow[flowIndex];

    if (step?.waitFor === "keyword") {
      const bag = (step.keyword || []).map((k) => k.toLowerCase());
      if (bag.includes(v.toLowerCase())) {
        const nextIndex = flowIndex + 1;
        if (flow[nextIndex]) runStep(nextIndex);
      } else {
        pushBot('Ketik "siap" dulu ya kalau kamu udah ready 😄');
      }
      return;
    }

    if (v.toLowerCase() === "udah") {
      setShowSummary(true);
      return;
    }

    if (step && step.type === "ask" && step.key) {
      const validation = validateAnswer(v, step);

      if (!validation.isValid) {
        pushBot(validation.message);
        return;
      }

      if (validation.message) {
        pushBot(validation.message);
      }

      setAnswers((a) => ({ ...a, [step.key]: validation.formatted }));
    }

    setTimeout(goNextAsk, 250);
  }, [input, flow, flowIndex, pushBot, runStep, goNextAsk]);

  const handleQuickReply = useCallback((selectedOption) => {
    setMessages((m) => [...m, { id: Date.now(), from: "user", text: selectedOption }]);

    const step = flow[flowIndex];

    if (step && step.type === "ask" && step.key) {
      setAnswers((a) => ({ ...a, [step.key]: selectedOption }));
    }

    setCurrentOptions(null);
    setTimeout(goNextAsk, 250);
  }, [flow, flowIndex, goNextAsk]);

  const handleEdit = useCallback(() => {
    setShowSummary(false);
    const lastAskIndex = [...flow]
      .map((s, i) => ({ s, i }))
      .filter((x) => x.s.type === "ask")
      .map((x) => x.i)
      .reverse()[0];
    if (Number.isInteger(lastAskIndex)) runStep(lastAskIndex);
  }, [flow, runStep]);

  useEffect(() => {
    if (flow.length) runStep(0);
  }, []);

  return {
    messages,
    input,
    isTyping,
    answers,
    currentOptions,
    showSummary,
    currentStep,
    totalSteps,
    validationState,
    labels,
    setShowSummary,
    handleInputChange,
    handleSend,
    handleQuickReply,
    handleEdit,
    pushBot,
  };
};