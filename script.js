const LEVEL_IMAGES = {
  male: {
    1: "images/male_1.png",
    2: "images/male_2.png",
    3: "images/male_3.png",
    4: "images/male_4.png",
    5: "images/male_5.png",
    6: "images/male_6.png",
    7: "images/male_7.png",
    8: "images/male_8.png"
  },
  female: {
    1: "images/female_1.png",
    2: "images/female_2.png",
    3: "images/female_3.png",
    4: "images/female_4.png",
    5: "images/female_5.png",
    6: "images/female_6.png",
    7: "images/female_7.png",
    8: "images/female_8.png"
  }
};

 const GENRES = [ 
{key:"food", name:"食文化", c1:"#ff7a00", c2:"#ffbf00"}, {key:"comm", name:"コミュ力", c1:"#00a7ff", c2:"#00ffd5"}, {key:"money", name:"金銭感覚", c1:"#00b26f", c2:"#aaff00"}, {key:"local", name:"地域愛", c1:"#8b5cff", c2:"#ff4dd2"}, {key:"fashion",name:"ファッション", c1:"#ff00a8", c2:"#ffbf00"},
 {key:"action", name:"性格行動", c1:"#ffbf00", c2:"#ff3b3b"}
 ];
 const OPTIONS = [ 
{label:"めっちゃあてはまる", hint:"(せや！それや！)", value: 4}, {label:"あてはまる", hint:"(まぁまぁ、せやな)", value: 3}, {label:"どっちともいえへん", hint:"(知らんけど)", value: 2}, {label:"あてはまらへん", hint:"(ちゃうちゃう)", value: 1}, {label:"全然あてはまらへん", hint:"(なんの話やねん)", value: 0}
 ]; 
const QUESTIONS = [ 
{genre:"comm", weight:1.2, text:'会話で"オチ"がないと、ソワソワしてまうタイプや？'}, {genre:"comm", weight:1.1, text:"友達の小ボケに、反射でツッコんでまう？(体が先に動く)"}, {genre:"action", weight:1.0, text:"せっかち言われる？信号が青になる0.2秒前に歩き出す？"}, {genre:"fashion", weight:1.2, text:"派手めの服・柄モン・キラキラ、なんやかんや好きや？"}, {genre:"fashion", weight:1.3, text:'ヒョウ柄に"安心感"ある？(落ち着くって何)'}, {genre:"food", weight:1.2, text:"たこ焼き、お好み焼きは外食やなくて家庭科やと思ってる？"},
 {genre:"food", weight:1.0, text:"ソースの種類にこだわりある？(ウスター？とんかつ？知らんけど)"}, {genre:"food", weight:1.0, text:'串カツの二度づけ禁止を守る時だけ、急に品行方正になる？'}, {genre:"local", weight:1.1, text:"エスカレーター、右側に立つ派や？(急ぐ人のレーン空ける)"}, {genre:"local", weight:1.2, text:"新世界・通天閣・道頓堀のどれか行くと、テンション上がる？"}, {genre:"local", weight:1.0, text:"大阪の地名、地味に言える？(天満/十三/枚方/我孫子…読める？)"}, {genre:"money", weight:1.2, text:'値札見たら、心の中で一回まけてって言うてる？'},
{genre:"money", weight:1.1, text:'これ、実質タダって言いがち？(ポイントで相殺理論)'},
 {genre:"money", weight:1.0, text:"セール情報に反応速い？(LINE通知で走る)"}, {genre:"comm", weight:1.0, text:"初対面でも距離詰めるん早い言われる？(もう友達)"}, {genre:"action", weight:1.1, text:"声デカい言われる？普通に喋ってるだけやのに？"}, {genre:"action", weight:1.0, text:"困ってる人見たら、つい世話焼いてまう？(おせっかい最高)"},
 {genre:"local", weight:1.1, text:'東京の人、ちょっと"かしこそう"で緊張する？(こわい言うたら怒る？)'}
 ]; 

 const LEVELS = [ {name:"LEVEL 1：初級", min:0, max:12, level: 1}, {name:"LEVEL 2：入門", min:13, max:25, level: 2}, {name:"LEVEL 3：普通", min:26, max:38, level: 3}, {name:"LEVEL 4：中級", min:39, max:50, level: 4}, {name:"LEVEL 5：上級", min:51, max:63, level: 5}, {name:"LEVEL 6：熟練", min:64, max:75, level: 6}, {name:"LEVEL 7：達人", min:76, max:88, level: 7}, {name:"LEVEL 8：極み", min:89, max:100, level: 8} ];

 const state = { 
gender: null, qIndex: 0, scores: {food:0, comm:0, money:0, local:0, fashion:0, action:0}, max: {food:0, comm:0, money:0, local:0, fashion:0, action:0}, photoEnabled: false, photoScore: 0, photoImage: null, totalPct: 0, totalPctNoPhoto: 0, genrePct: {}, };

 const el = (id)=>document.getElementById(id);
 const screenTop = el("screenTop");
const screenQ = el("screenQ");
const screenR = el("screenR");

 const startBtn = el("startBtn"); const genderMale = el("genderMale"); const genderFemale = el("genderFemale"); const qTitle = el("qTitle"); const qMeta = el("qMeta"); const choices = el("choices"); const qIndexEl = el("qIndex"); const qTotalEl = el("qTotal"); const barFill = el("barFill"); const moodEl = el("mood"); const livePct = el("livePct"); const livePhoto = el("livePhoto"); const resultPct = el("resultPct"); const resultComment = el("resultComment"); const breakdown = el("breakdown"); const shareBtn = el("shareBtn"); const restartBtn = el("restartBtn"); const downloadBtn = el("downloadBtn"); const stageBadge = el("stageBadge"); const photoInput = el("photoInput"); const photoInput2 = el("photoInput2"); const thumb = el("thumb"); const thumb2 = el("thumb2"); const photoScoreVal = el("photoScoreVal"); const photoModeVal = el("photoModeVal");
 const resultImage = el("resultImage");

function initMax(){
 
for(const q of QUESTIONS){ state.max[q.genre] += 4 * q.weight; }
 }
initMax();
qTotalEl.textContent = QUESTIONS.length;

function show(screen){
  [screenTop, screenQ, screenR].forEach(s =>
    s.classList.remove("active")
  );
  screen.classList.add("active");
  window.scrollTo({ top:0, behavior:"smooth" });
}

 function setGender(g){ state.gender = g; genderMale.style.borderColor = (g==="male") ? "rgba(255,0,168,.6)" : "rgba(0,0,0,.14)"; genderFemale.style.borderColor = (g==="female") ? "rgba(255,0,168,.6)" : "rgba(0,0,0,.14)"; startBtn.disabled = false; startBtn.textContent = "ほな、測ったろか！スタート！"; } genderMale.addEventListener("click", ()=>setGender("male")); genderFemale.addEventListener("click", ()=>setGender("female")); startBtn.addEventListener("click", ()=>{ if(!state.gender) return; show(screenQ); renderQuestion(); }); function moodFromPct(p){ if(p<20) return "おとなしいなぁ"; if(p<40) return "ちょい大阪"; if(p<60) return "関西の香り"; if(p<80) return "だいぶコテコテ"; return "祭りや祭り"; } function renderQuestion(){ const i = state.qIndex; qIndexEl.textContent = String(i+1); barFill.style.width = `${Math.round((i/QUESTIONS.length)*100)}%`;
 const q = QUESTIONS[i]; qTitle.textContent = q.text; qMeta.innerHTML = ""; const tag1 = document.createElement("span"); tag1.className = "tag hot"; tag1.textContent = `ジャンル：${GENRES.find(g=>g.key===q.genre).name}`;
 const tag2 = document.createElement("span"); tag2.className = "tag"; tag2.textContent = `偏見係数：${q.weight.toFixed(1)}`; qMeta.appendChild(tag1); qMeta.appendChild(tag2); choices.innerHTML = ""; OPTIONS.forEach(opt=>{ const b = document.createElement("button"); b.className = "choice"; b.textContent = opt.label;

const small = document.createElement("small");
small.textContent = opt.hint;

b.appendChild(small);

 b.addEventListener("click", ()=>applyAnswer(opt.value)); choices.appendChild(b); }); const p = calcPct(false); moodEl.textContent = moodFromPct(p); livePct.textContent = `${p}%`; livePhoto.textContent = state.photoEnabled ? "ON" : "OFF"; } function applyAnswer(value){ const q = QUESTIONS[state.qIndex]; state.scores[q.genre] += value * q.weight; state.qIndex++; const p = calcPct(false); livePct.textContent = `${p}%`; moodEl.textContent = moodFromPct(p); if(state.qIndex >= QUESTIONS.length){ finish(); }else{ renderQuestion(); } } /********************* * スコア計算 *********************/ const clamp = (n,a,b)=>Math.max(a,Math.min(b,n)); function calcGenrePct(){ const out = {}; for(const g of GENRES){ const max = state.max[g.key] || 1; out[g.key] = Math.round((state.scores[g.key] / max) * 100); } state.genrePct = out; return out; } function calcPct(includePhoto){ const gp = calcGenrePct(); const avg = Math.round((gp.food + gp.comm + gp.money + gp.local + gp.fashion + gp.action)/6); if(includePhoto && state.photoEnabled){ return clamp(Math.round(avg*0.80 + state.photoScore*0.20), 0, 100); } return clamp(avg, 0, 100); } function levelFromPct(p){ return LEVELS.find(l=>p>=l.min && p<=l.max) || LEVELS[LEVELS.length-1]; } function commentFromPct(p){ if(p<=12) return "あんた…大阪の風は感じるけど、まだ\"静かなUSJ\"やな。ツッコミ温存してるやろ？";
 if(p<=25) return "そこそこ大阪っぽいで。大阪城見てええ石垣やな言うタイプや。"; if(p<=38) return "新世界の匂いしてきた。串カツ一本で人生語り始める気配あるで。"; if(p<=50) return "道頓堀のネオンが呼んでる。写真撮る時だけ声量2倍になるタイプや。"; if(p<=63) return "通天閣ゾーン突入や。ヒョウ柄が半径3m以内におる。"; if(p<=75) return "もはやNGK級や！あんたが歩いたら看板が点灯して拍手する！"; if(p<=88) return "コテコテ度達人や！豹柄とたこ焼きが似合いすぎてヤバい！"; return "極みや！あんたが大阪そのもの！通天閣がお辞儀する！"; }

async function handlePhoto(file, where){
  if(!file) return;

  const url = URL.createObjectURL(file);
  const img = new Image();

  img.onload = () => {
    state.photoEnabled = true;
    state.photoImage = img;

    const w = 256;
    const h = Math.round(img.height * (w / img.width));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);

    const data = ctx.getImageData(0, 0, w, h).data;
    const gray = new Uint8ClampedArray(w * h);

    let satSum = 0, brightSum = 0, brightSum2 = 0, edge = 0;

    for (let i = 0, p = 0; i < data.length; i += 4, p++) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      const sat = max === 0 ? 0 : (max - min) / max;
      const y = 0.299 * r + 0.587 * g + 0.114 * b;

      satSum += sat;
      brightSum += y;
      brightSum2 += y * y;
      gray[p] = y;
    }

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const gx = -gray[i - w - 1] - 2 * gray[i - 1] - gray[i + w - 1]
                  + gray[i - w + 1] + 2 * gray[i + 1] + gray[i + w + 1];
        const gy = -gray[i - w - 1] - 2 * gray[i - w] - gray[i - w + 1]
                  + gray[i + w - 1] + 2 * gray[i + w] + gray[i + w + 1];
        edge += Math.sqrt(gx * gx + gy * gy);
      }
    }

    const n = w * h;
    const satAvg = satSum / n;
    const mean = brightSum / n;
    const varr = brightSum2 / n - mean * mean;
    const contrast = Math.sqrt(Math.max(0, varr)) / 128;
    const edgeScore = clamp((edge / ((w - 2) * (h - 2))) / 255 * 0.9, 0, 1);

    let bottomSum = 0, bottomCnt = 0;
    for (let y = Math.floor(h * 0.55); y < h; y++) {
      for (let x = 0; x < w; x++) {
        bottomSum += gray[y * w + x];
        bottomCnt++;
      }
    }
    const smileLike = clamp((bottomSum / bottomCnt - mean) / 60 + 0.5, 0, 1);

    let vivid = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.max(data[i], data[i + 1], data[i + 2]) > 210) vivid++;
    }
    const vividRatio = vivid / (data.length / 4);

    state.photoScore = Math.round(clamp(100 * (0.34 * satAvg + 0.18 * contrast + 0.22 * edgeScore + 0.16 * smileLike + 0.10 * vividRatio), 0, 100));

    const imgEl = document.createElement("img");
    imgEl.src = url;
    if (where === 1) {
      thumb.innerHTML = "";
      thumb.appendChild(imgEl);
    } else {
      thumb2.innerHTML = "";
      thumb2.appendChild(imgEl);
    }

    photoScoreVal.textContent = state.photoScore;
    photoModeVal.textContent = "ON";
    livePhoto.textContent = "ON";
  };

  img.src = url;
}

photoInput.addEventListener("change", (e) => handlePhoto(e.target.files?.[0], 1));
photoInput2.addEventListener("change", (e) => handlePhoto(e.target.files?.[0], 2));

 function finish(){ state.totalPctNoPhoto = calcPct(false); state.totalPct = calcPct(true); show(screenR); 
 renderResult(); } function renderResult(){ const p = state.totalPct;
let start = 0;
const target = state.totalPct;
const interval = setInterval(()=>{
  if(start >= target){ clearInterval(interval); resultPct.textContent = `${target}%`; return; }
  resultPct.textContent = `${start}%`;
  start++;
}, 12);  
 resultPct.textContent = `${p}%`; resultComment.textContent = commentFromPct(p); const lv = levelFromPct(p);
 stageBadge.textContent = lv.name;

const imageUrl = LEVEL_IMAGES[state.gender][lv.level];
resultImage.src = imageUrl;
resultImage.style.display = "block";

 breakdown.innerHTML=""; const gp = state.genrePct; for(const g of GENRES){ const box = document.

createElement("div"); box.className = "meter"; box.innerHTML = `
  <div class="top">
    <div class="name">${g.name}</div>
    <div class="num">${gp[g.key]}%</div>
  </div>
  <div class="g">
    <div style="width:${gp[g.key]}%;background:linear-gradient(90deg, ${g.c1}, ${g.c2})"></div>
  </div>
`; 
breakdown.appendChild(box);
} } 
shareBtn.addEventListener("click", ()=>{
  const text = `大阪人コテコテ度チェッカーの結果：${state.totalPct}%でした！ ${commentFromPct(state.totalPct)}`;
  const url = "https://example.com";
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  );
});

restartBtn.addEventListener("click", ()=>{
  location.reload();
});
 downloadBtn.addEventListener("click", ()=>{ const link = document.createElement("a"); link.href = resultImage.src; link.download = `osaka_level${levelFromPct(state.totalPct).level}.jpg`;

 link.click(); });

