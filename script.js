const promptText = document.getElementById("promptText");
const promptHint = document.getElementById("promptHint");
const promptBox = document.getElementById("promptBox");
const countdownValue = document.getElementById("countdownValue");
const difficultySelect = document.getElementById("difficulty");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextBtn");

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

let tickId = null;
let remaining = 4;
let lastMedPrompt = basePrompts[0];
let isRunning = false;

const flashPrompt = () => {
  promptBox.classList.remove("is-flash");
  void promptBox.offsetWidth;
  promptBox.classList.add("is-flash");
};

const choosePrompt = () => {
  const pool = roundConfig[difficultySelect.value] ?? roundConfig.normal;
  const randomPrompt = pool[Math.floor(Math.random() * pool.length)];

  if (randomPrompt.group === "med") {
    lastMedPrompt = randomPrompt;
  }

  if (randomPrompt.group === "alert") {
    return {
      word: randomPrompt.word,
      hint: `${randomPrompt.hint}（上一題動作：${lastMedPrompt.hint.replace("做法：", "")}）`
    };
  }

  return randomPrompt;
};

const showPrompt = () => {
  const nextPrompt = choosePrompt();
  promptText.textContent = nextPrompt.word;
  promptHint.textContent = nextPrompt.hint;
  flashPrompt();
};

const resetCountdown = () => {
  remaining = 4;
  countdownValue.textContent = String(remaining);
};

const runCountdown = () => {
  clearInterval(tickId);
  tickId = setInterval(() => {
    remaining -= 1;

    if (remaining <= 0) {
      showPrompt();
      resetCountdown();
      return;
    }

    countdownValue.textContent = String(remaining);
  }, 1000);
};

const startTrainer = () => {
  if (isRunning) {
    return;
  }

  isRunning = true;
  showPrompt();
  resetCountdown();
  runCountdown();
};

const pauseTrainer = () => {
  isRunning = false;
  clearInterval(tickId);
};

startBtn.addEventListener("click", startTrainer);

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTrainer();
    promptHint.textContent = "已暫停，按「開始」可繼續";
    return;
  }

  startTrainer();
});

nextBtn.addEventListener("click", () => {
  showPrompt();
  resetCountdown();

  if (isRunning) {
    runCountdown();
  }
});

difficultySelect.addEventListener("change", () => {
  pauseTrainer();
  promptText.textContent = "已切換難度";
  promptHint.textContent = "按下開始重新帶動";
  resetCountdown();
});
