import TrainerPanel from "./components/trainer-panel";

const leadingSteps = [
  "暖身 2 分鐘：坐姿深呼吸，提醒「動作小、節奏穩」。",
  "教口訣 3 分鐘：帶唸「早餐畫太陽、中餐摸摸天、晚飯抱抱胸、睡前合十手、喝水杯杯手」。",
  "注意力練習 4 分鐘：使用下方訓練器隨機出題，聽口令反應。",
  "雙人互動 2 分鐘：長者兩兩輪流喊口令、做動作。",
  "收尾 1 分鐘：重複口訣一次，確認今日服藥時點。"
];

const moves = [
  { title: "早餐後", detail: "雙手劃一個大圓（代表太陽）" },
  { title: "中餐後", detail: "雙手上舉摸天" },
  { title: "晚飯後", detail: "雙手抱胸" },
  { title: "睡前", detail: "雙手合十" },
  { title: "喝水", detail: "手部當作杯子，做喝水動作" }
];

const ruleGuide = [
  "早餐後 / 中餐後 / 晚飯後 / 睡前 / 喝水：做對應動作。",
  "藥到：先拍手一次，再做上一個服藥時段動作。",
  "聊天 / 看窗外：停住不動、眼睛看帶領者 2 秒。"
];

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero__badge">社區關懷據點</div>
        <h1>山海共生工作坊</h1>
        <p>長者活動網頁</p>
      </header>

      <main className="layout">
        <section className="card reveal">
          <h2>活動 01｜藥時五拍注意力體操</h2>
          <p className="lead">
            核心口訣：<strong>早餐畫太陽、中餐摸摸天、晚飯抱抱胸、睡前合十手、喝水杯杯手。</strong>
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
          <h2>帶領流程（12 分鐘）</h2>
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

      <footer className="footer">版本：活動原型 v1｜適用場域：社區關懷據點</footer>
    </>
  );
}
