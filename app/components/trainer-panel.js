"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const basePrompts = [
  { word: "早飯後", hint: "做法：雙手拍肩兩下", group: "med" },
  { word: "午飯後", hint: "做法：雙手上舉摸天", group: "med" },
  { word: "晚飯後", hint: "做法：雙手抱胸輕拍", group: "med" },
  { word: "睡前", hint: "做法：雙手合十點頭", group: "med" }
];

const medicineCall = { word: "藥到", hint: "先拍手一次，再做上一個服藥動作", group: "alert" };

const distractors = [
  { word: "喝水", hint: "停住不動，眼睛看帶領者 2 秒", group: "distractor" },
  { word: "聊天", hint: "停住不動，眼睛看帶領者 2 秒", group: "distractor" },
  { word: "看窗外", hint: "停住不動，眼睛看帶領者 2 秒", group: "distractor" }
];

const roundConfig = {
  easy: [...basePrompts],
  normal: [...basePrompts, medicineCall],
  challenge: [...basePrompts, medicineCall, ...distractors]
};

const defaultPrompt = {
  word: "按下開始帶動",
  hint: "系統會每 4 秒換一題"
};

export default function TrainerPanel() {
  const [difficulty, setDifficulty] = useState("normal");
  const [currentPrompt, setCurrentPrompt] = useState(defaultPrompt);
  const [remaining, setRemaining] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

  const promptBoxRef = useRef(null);
  const tickIdRef = useRef(null);
  const lastMedPromptRef = useRef(basePrompts[0]);

  const flashPrompt = useCallback(() => {
    if (!promptBoxRef.current) {
      return;
    }

    promptBoxRef.current.classList.remove("is-flash");
    void promptBoxRef.current.offsetWidth;
    promptBoxRef.current.classList.add("is-flash");
  }, []);

  const choosePrompt = useCallback(() => {
    const pool = roundConfig[difficulty] ?? roundConfig.normal;
    const randomPrompt = pool[Math.floor(Math.random() * pool.length)];

    if (randomPrompt.group === "med") {
      lastMedPromptRef.current = randomPrompt;
    }

    if (randomPrompt.group === "alert") {
      return {
        word: randomPrompt.word,
        hint: `${randomPrompt.hint}（上一題動作：${lastMedPromptRef.current.hint.replace("做法：", "")}）`
      };
    }

    return randomPrompt;
  }, [difficulty]);

  const showPrompt = useCallback(() => {
    setCurrentPrompt(choosePrompt());
    flashPrompt();
  }, [choosePrompt, flashPrompt]);

  useEffect(() => {
    return () => {
      clearInterval(tickIdRef.current);
    };
  }, []);

  useEffect(() => {
    clearInterval(tickIdRef.current);

    if (!isRunning) {
      return;
    }

    tickIdRef.current = setInterval(() => {
      setRemaining((previous) => {
        const next = previous - 1;

        if (next <= 0) {
          showPrompt();
          return 4;
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(tickIdRef.current);
    };
  }, [isRunning, showPrompt]);

  const startTrainer = () => {
    if (isRunning) {
      return;
    }

    setIsRunning(true);
    setRemaining(4);
    showPrompt();
  };

  const pauseTrainer = () => {
    setIsRunning(false);
  };

  const handlePauseToggle = () => {
    if (isRunning) {
      pauseTrainer();
      setCurrentPrompt((previous) => ({
        ...previous,
        hint: "已暫停，按「開始」可繼續"
      }));
      return;
    }

    startTrainer();
  };

  const handleNextPrompt = () => {
    showPrompt();
    setRemaining(4);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setIsRunning(false);
    setRemaining(4);
    lastMedPromptRef.current = basePrompts[0];
    setCurrentPrompt({
      word: "已切換難度",
      hint: "按下開始重新帶動"
    });
  };

  return (
    <section className="card trainer reveal">
      <div className="trainer__head">
        <h2>帶領模式｜隨機口令訓練器</h2>
        <label>
          難度
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">基礎（只有四個服藥時段）</option>
            <option value="normal">一般（加入藥到口令）</option>
            <option value="challenge">挑戰（加入干擾詞）</option>
          </select>
        </label>
      </div>

      <div className="prompt-box" ref={promptBoxRef}>
        <p className="prompt-box__label">目前口令</p>
        <p className="prompt-box__text">{currentPrompt.word}</p>
        <p className="prompt-box__hint">{currentPrompt.hint}</p>
      </div>

      <div className="trainer__controls">
        <button type="button" id="startBtn" onClick={startTrainer}>
          開始
        </button>
        <button type="button" id="pauseBtn" onClick={handlePauseToggle}>
          暫停
        </button>
        <button type="button" id="nextBtn" onClick={handleNextPrompt}>
          下一題
        </button>
      </div>

      <div className="countdown">
        <span>下一題倒數</span>
        <strong>{remaining}</strong>
      </div>
    </section>
  );
}
