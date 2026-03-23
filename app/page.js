import TrainerPanel from "./components/trainer-panel";

const leadingSteps = [
  "暖身 2 分鐘：坐姿深呼吸，提醒「動作小、節奏慢」。",
  "教口訣 3 分鐘：一句一句帶唸，配對四個固定動作。",
  "注意力練習 4 分鐘：使用下方訓練器隨機出題，聽口令反應。",
  "雙人互動 2 分鐘：長者兩兩輪流喊口令、做動作。",
  "收尾 1 分鐘：重複口訣一次，確認今日服藥時段。"
];

const moves = [
  { title: "早飯後", detail: "雙手拍肩兩下" },
  { title: "午飯後", detail: "雙手上舉摸天" },
  { title: "晚飯後", detail: "雙手抱胸輕拍" },
  { title: "睡前", detail: "雙手合十點頭" }
];

const ruleGuide = [
  "早飯後 / 午飯後 / 晚飯後 / 睡前：做對應四拍動作。",
  "藥到：先拍手一次，再做上一個服藥時段動作。",
  "喝水 / 聊天 / 看窗外：停住不動、眼睛看帶領者 2 秒。"
];

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero__badge">台灣社區關懷據點帶領介面</div>
        <h1>銀心藥時站</h1>
        <p>為資淺指導員設計的長者活動網頁。先從「服藥時間記憶 + 注意力訓練」開始，照著畫面就能帶領。</p>
      </header>

      <main className="layout">
        <section className="card reveal">
          <h2>活動 01｜藥時四拍注意力體操</h2>
          <p className="lead">
            核心口訣：<strong>早拍肩、午摸天、晚抱抱、睡點頭。</strong>
            <br />
            注意力規則：<strong>聽到「藥到」拍一下，聽到雜詞先停手。</strong>
          </p>
          <div className="move-grid">
            {moves.map((move) => (
              <article key={move.title}>
                <h3>{move.title}</h3>
                <p>{move.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card reveal">
          <h2>資淺指導員帶領流程（12 分鐘）</h2>
          <ol className="steps">
            {leadingSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="safety">
            <h3>安全提醒</h3>
            <p>優先採坐姿；若有肩痛，改為小幅度抬手或手指點肩即可。</p>
          </div>
        </section>

        <TrainerPanel />

        <section className="card reveal">
          <h2>口令規則對照（給指導員）</h2>
          <ul className="rules">
            {ruleGuide.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">版本：活動原型 v1｜適用場域：台灣長者社區關懷據點</footer>
    </>
  );
}
