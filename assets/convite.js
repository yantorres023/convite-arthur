/* Funções compartilhadas pelos convites do Arthur.
   Uso: window.Convite.enviar({...}), .countdown(cb), .agenda(a), .local(el) */
(function () {
  const cfg = window.CONVITE || {};
  const raiz = new URL('..', document.currentScript.src);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CHAVE = 'convite-arthur-resposta';

  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
  const limitar = (v, max) => String(v == null ? '' : v).trim().slice(0, max);
  const inteiro = v => Math.max(0, Math.min(30, parseInt(v, 10) || 0));

  /* Envia uma resposta para a planilha.
     dados: { nome, vai (bool), adultos, criancas, fantasia, recado, convite }
     Resolve com { ok: true } (ou { ok: true, teste: true } sem planilha ligada). Rejeita com Error se falhar. */
  async function enviar(dados) {
    const vai = dados.vai !== false;
    const payload = {
      id: uid(),
      nome: limitar(dados.nome, 80),
      vai,
      adultos: vai ? inteiro(dados.adultos) : 0,
      criancas: vai ? inteiro(dados.criancas) : 0,
      fantasia: vai ? limitar(dados.fantasia, 80) : '',
      recado: limitar(dados.recado, 300),
      convite: limitar(dados.convite, 40)
    };
    if (!payload.nome) throw new Error('Faltou o nome.');

    if (!cfg.planilha) {
      await new Promise(r => setTimeout(r, 700));
      lembrar(payload);
      return { ok: true, teste: true };
    }

    const corpo = JSON.stringify(payload); // text/plain: o Google aceita sem pré-verificação de CORS
    try {
      const resp = await fetch(cfg.planilha, { method: 'POST', body: corpo, redirect: 'follow' });
      const json = await resp.json();
      if (!json.ok) throw new Error(json.erro || 'A planilha recusou a resposta.');
      lembrar(payload);
      return json;
    } catch (e) {
      if (e instanceof TypeError) {
        // Se o navegador bloquear a leitura da resposta, reenviamos sem ler.
        // O id evita linha duplicada caso o primeiro envio tenha chegado.
        await fetch(cfg.planilha, { method: 'POST', body: corpo, mode: 'no-cors' });
        lembrar(payload);
        return { ok: true, semRetorno: true };
      }
      throw e;
    }
  }

  function lembrar(p) {
    try { localStorage.setItem(CHAVE, JSON.stringify({ nome: p.nome, vai: p.vai, quando: Date.now() })); } catch (e) {}
  }
  function lembrado() {
    try { return JSON.parse(localStorage.getItem(CHAVE)); } catch (e) { return null; }
  }

  /* Contagem regressiva: cb({ d, h, m, s }) a cada segundo, ou cb({ fim: true, hoje: bool }) depois do início. */
  function countdown(cb) {
    const alvo = new Date(cfg.inicio).getTime();
    let id = null;
    function tick() {
      const diff = alvo - Date.now();
      if (diff <= 0) { if (id) clearInterval(id); cb({ fim: true, hoje: diff > -864e5 }); return false; }
      cb({ d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60, fim: false });
      return true;
    }
    if (tick()) id = setInterval(tick, 1000);
  }

  /* Prepara um link <a> de "Salvar na agenda" (iPhone/Mac: arquivo .ics; outros: Google Agenda). */
  function agenda(a, titulo) {
    if (!a) return;
    titulo = titulo || 'Aniversário de 1 aninho do Arthur 🐮';
    if (/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)) {
      a.href = new URL('arthur.ics', raiz).href; a.removeAttribute('target');
    } else {
      const z = d => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      a.href = 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
        action: 'TEMPLATE', text: titulo, dates: z(cfg.inicio) + '/' + z(cfg.fim || cfg.inicio),
        details: 'Festa na fazendinha! Venha caracterizado. Convite: ' + location.href.split('#')[0],
        location: cfg.local || ''
      });
      a.target = '_blank'; a.rel = 'noopener';
    }
  }

  /* Escreve o endereço num elemento (ou o texto de "em breve"). */
  function local(el, vazio) {
    if (!el) return;
    if (!cfg.local) { el.textContent = vazio || 'Endereço em breve 📍'; return; }
    el.textContent = cfg.local;
    if (cfg.mapa) {
      const a = document.createElement('a');
      a.href = cfg.mapa; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Ver no mapa';
      el.append(document.createElement('br'), a);
    }
  }

  window.Convite = { cfg, reduce, configurado: !!cfg.planilha, enviar, lembrado, countdown, agenda, local };
})();
