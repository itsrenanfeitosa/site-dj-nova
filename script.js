/* ====== CONFIGURAÇÃO EDITÁVEL (Altere suas informações aqui) ====== */

// Seu número de WhatsApp (DDI + DDD + Número)
const WHATSAPP = "5500900000000"; 

// Links para as suas redes sociais
const SOCIAL = {
  Instagram: "https://instagram.com/",
  TikTok: "https://tiktok.com/",
  YouTube: "https://youtube.com/",
  SoundCloud: "https://soundcloud.com/"
};

// Estatísticas
const STATS = [
  ["8+", "Anos de experiência"],
  ["450+", "Eventos realizados"],
  ["120 mil", "Pessoas na pista"]
];

// Estilos de gradiente para os cards
const grad = (a, b, c) => `radial-gradient(circle at ${c || '30% 25%'}, ${a}, transparent 60%), radial-gradient(circle at 80% 85%, ${b}, transparent 55%), #0d0d17`;
const P = "rgba(155,61,255,.85)", B = "rgba(47,107,255,.85)", M = "rgba(220,60,255,.7)", C = "rgba(40,200,255,.6)";

// Estilos Musicais [Título, Descrição, Gradiente Visual]
const STYLES = [
  ["Electronic / House", "Grooves envolventes, vocais e drops que seguram a pista por horas.", grad(P, B)],
  ["Funk Brasileiro", "Do clássico ao novo, com a pegada que faz qualquer festa explodir.", grad(M, P, '70% 20%')],
  ["Open Format", "Pop, rock, anos 2000 e sertanejo: o repertório certo para todas as idades.", grad(B, C, '20% 70%')],
  ["Hip-Hop / Trap", "Graves pesados e batidas marcantes, para noites com atitude.", grad(P, M, '50% 10%')]
];

// Sets e Mixes [Nome, Estilo, Duração, Gradiente, Link Embed SoundCloud/YouTube]
const SETS = [
  ["Neon Pulse Vol. 1", "Electronic / House", "58 min", grad(P, B), ""],
  ["Pista Aberta", "Open Format", "1h 12min", grad(B, C), ""],
  ["Baile da Nova", "Funk Brasileiro", "45 min", grad(M, P), ""],
  ["Midnight Bass", "Hip-Hop / Trap", "52 min", grad(P, M, '60% 15%'), ""]
];

// Fotos da Galeria [Legenda, Categoria, Gradiente]
const GAL = [
  ["Palco principal", "Festival", grad(P, B)],
  ["Noite no clube", "Clube", grad(B, P, '70% 30%')],
  ["Casamento ao pôr do sol", "Particular", grad(M, B)],
  ["Aniversário de 15 anos", "Particular", grad(P, C)],
  ["Pista lotada", "Festival", grad(B, M, '30% 80%')],
  ["After corporativo", "Corporativo", grad(C, P)],
  ["Open air", "Festival", grad(P, M, '80% 20%')],
  ["Lounge VIP", "Clube", grad(B, C, '50% 50%')],
  ["Lançamento de marca", "Corporativo", grad(M, B, '25% 60%')],
  ["Réveillon", "Particular", grad(P, B, '60% 70%')]
];

// Próximas Datas [Dia, Mês, Nome do Evento, Local, Cidade]
// Deixe a lista vazia [] caso não queira exibir eventos no momento
const EVENTS = [
  ["12", "DEZ", "Noite Neon (demo)", "Club Aurora", "São Paulo, SP"],
  ["20", "DEZ", "Open Air Verão (demo)", "Arena Solar", "Fortaleza, CE"],
  ["31", "DEZ", "Réveillon Nova (demo)", "Praia Clube", "Recife, PE"]
];

// Depoimentos [Texto, Autor]
const TESTI = [
  ["A pista ficou cheia do começo ao fim. Profissional e pontual.", "Organizadora de festival (exemplo)"],
  ["Acertou o clima do casamento sem precisarmos explicar nada.", "Noiva (exemplo)"],
  ["Nossa equipe pediu para repetir no evento do ano que vem.", "Gerente de marketing (exemplo)"]
];


/* ====== CÓDIGO DO SITE (Não precisa mexer abaixo) ====== */

const $ = s => document.querySelector(s);
const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Renderizar Estatísticas
$("#stats").innerHTML = STATS.map(s => `<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");

// Renderizar Estilos
$("#styles").innerHTML = STYLES.map(s => `<article class="card rv" style="--g:${s[2]}" tabindex="0"><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join("");

// Renderizar Sets
$("#sets-l").innerHTML = SETS.map((s, i) => `<div class="set rv" style="--g:${s[3]}"><div class="cv"></div><div><h3>${s[0]}</h3><p>${s[1]} • ${s[2]}</p></div><button class="btn" data-i="${i}">▶ OUVIR</button><div class="emb" hidden></div></div>`).join("");

$("#sets-l").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const s = SETS[b.dataset.i], box = b.parentNode.querySelector(".emb");
  box.hidden = !box.hidden;
  if (box.hidden || box.dataset.l) return;
  box.dataset.l = 1;

  const u = s[4];
  let src = "";
  try {
    const h = new URL(u).hostname;
    if (h.includes("soundcloud.com")) src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(u);
    else if (h.includes("youtube.com") || h === "youtu.be") {
      const id = h === "youtu.be" ? new URL(u).pathname.slice(1) : new URL(u).searchParams.get("v");
      src = "https://www.youtube.com/embed/" + id;
    }
  } catch (_) {}

  box.innerHTML = src ? `<iframe src="${src}" allow="autoplay" loading="lazy" title="${esc(s[0])}"></iframe>` : "Nenhum player configurado para este set ainda. Adicione o link do SoundCloud ou YouTube em SETS.";
});

// Renderizar Galeria e Filtros
const cats = ["Todos", ...new Set(GAL.map(g => g[1]))];
$("#fl").innerHTML = cats.map((c, i) => `<button class="${i ? "" : "a"}" data-c="${c}">${c}</button>`).join("");
$("#gal").innerHTML = GAL.map(g => `<button class="gi" data-c="${g[1]}" data-t="${esc(g[0])}" style="--g:${g[2]}"><i></i><span>${g[0]}</span></button>`).join("");

$("#fl").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  document.querySelectorAll("#fl button").forEach(x => x.classList.toggle("a", x === b));
  document.querySelectorAll(".gi").forEach(g => g.classList.toggle("h", b.dataset.c !== "Todos" && g.dataset.c !== b.dataset.c));
});

// Lightbox
const lb = $("#lb");
$("#gal").addEventListener("click", e => {
  const g = e.target.closest(".gi");
  if (!g) return;
  $("#lbi").style.setProperty("--g", g.style.getPropertyValue("--g"));
  $("#lbt").textContent = g.dataset.t;
  lb.classList.add("o");
  $("#lbx").focus();
});

const cl = () => lb.classList.remove("o");
$("#lbx").onclick = cl;
lb.onclick = e => { if (e.target === lb) cl(); };
addEventListener("keydown", e => {
  if (e.key === "Escape") { cl(); menu(false); }
});

// Agenda
if (EVENTS.length) {
  $("#ag").innerHTML = EVENTS.map(v => `<div class="ev rv"><div class="dt"><b>${v[0]}</b><span>${v[1]}</span></div><div><h3>${v[2]}</h3><p>${v[3]} • ${v[4]}</p></div><a class="btn" href="#contato" data-ev="${esc(v[2])}">MAIS INFORMAÇÕES</a></div>`).join("");
} else {
  $("#ag").remove();
  $("#em").style.display = "block";
}

// Depoimentos
$("#tg").innerHTML = TESTI.map(t => `<blockquote class="rv">${t[0]}<cite>${t[1]}</cite></blockquote>`).join("");

// Redes Sociais
$("#soc").innerHTML = Object.entries(SOCIAL).map(([k, u]) => `<a href="${u}" target="_blank" rel="noopener">${k}</a>`).join("");
$("#fs").innerHTML = $("#soc").innerHTML;

document.addEventListener("click", e => {
  const a = e.target.closest("[data-ev]");
  if (a) $("[name=msg]").value = "Quero mais informações sobre o evento: " + a.dataset.ev;
});

// Menu Mobile + Animação do Header
const lk = $("#lk"), bg = $("#bg");
function menu(o) {
  lk.classList.toggle("o", o);
  bg.setAttribute("aria-expanded", o);
}
bg.onclick = () => menu(!lk.classList.contains("o"));
lk.addEventListener("click", e => { if (e.target.closest("a")) menu(false); });

const hd = $("#hd");
const sc = () => hd.classList.toggle("s", scrollY > 40);
addEventListener("scroll", sc, { passive: true });
sc();

// Animação de Scroll
const io = new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) {
    x.target.classList.add("v");
    io.unobserve(x.target);
  }
}), { threshold: .12 });

document.querySelectorAll(".rv").forEach(el => io.observe(el));

// Formulário -> Integração WhatsApp
const fm = $("#fm"), say = (t, ok) => {
  $("#msg").textContent = t;
  $("#msg").style.color = ok ? "#7dffb0" : "#ff8da1";
};

function data() {
  const f = new FormData(fm);
  return Object.fromEntries(f);
}

function text(d) {
  return `Olá, DJ NOVA! Gostaria de um orçamento.\nNome: ${d.nome}\nTelefone: ${d.tel}\nTipo de evento: ${d.tipo}\nData: ${d.data ? d.data.split("-").reverse().join("/") : ""}\nCidade: ${d.cidade}\nMensagem: ${d.msg || "-"}`;
}

function validate() {
  let ok = true;
  fm.querySelectorAll("[required]").forEach(i => {
    const w = i.closest(".f");
    let m = "";
    if (!i.value.trim()) m = "Preencha este campo.";
    else if (i.name === "tel" && i.value.replace(/\D/g, "").length < 10) m = "Informe DDD e número.";
    else if (i.name === "data" && new Date(i.value + "T00:00") < new Date(new Date().toDateString())) m = "Escolha uma data futura.";
    
    w.classList.toggle("err", !!m);
    w.querySelector("em").textContent = m;
    if (m) ok = false;
  });
  return ok;
}

const go = () => {
  if (!validate()) {
    say("Corrija os campos destacados para continuar.");
    return false;
  }
  const u = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text(data()))}`;
  window.open(u, "_blank", "noopener");
  say("WhatsApp aberto com seus dados. Envie a mensagem lá para concluir o pedido.", true);
  return true;
};

fm.addEventListener("submit", e => {
  e.preventDefault();
  go();
});

$("#wa").addEventListener("click", e => {
  e.preventDefault();
  const d = data();
  if (d.nome && d.tel && d.tipo && d.data && d.cidade) go();
  else window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá, DJ NOVA! Gostaria de falar sobre um evento.")}`, "_blank", "noopener");
});