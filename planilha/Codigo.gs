/**
 * Recebe as confirmações dos convites do Arthur e grava na planilha.
 * Cole este código em: Planilha > Extensões > Apps Script (substituindo o que houver).
 * Depois: Implantar > Nova implantação > App da Web
 *   - Executar como: Eu
 *   - Quem pode acessar: Qualquer pessoa
 */

const CABECALHO = ['Data/hora', 'Nome', 'Vai?', 'Adultos', 'Crianças', 'Total', 'Fantasia', 'Recado', 'Convite', 'ID'];
const COLUNA_ID = 10;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const aba = abaRespostas_(ss);

    const id = texto_(d.id, 64);
    if (id && aba.getLastRow() > 1) {
      const achou = aba.getRange(2, COLUNA_ID, aba.getLastRow() - 1, 1)
        .createTextFinder(id).matchEntireCell(true).findNext();
      if (achou) return json_({ ok: true, duplicado: true });
    }

    const nome = texto_(d.nome, 80);
    if (!nome) return json_({ ok: false, erro: 'Faltou o nome.' });
    const vai = d.vai !== false;
    const adultos = vai ? numero_(d.adultos) : 0;
    const criancas = vai ? numero_(d.criancas) : 0;

    aba.appendRow([
      new Date(), nome, vai ? 'Sim' : 'Não', adultos, criancas, adultos + criancas,
      vai ? texto_(d.fantasia, 80) : '', texto_(d.recado, 300), texto_(d.convite, 40), id
    ]);
    resumo_(ss, aba.getName());
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, mensagem: 'Planilha do Arthur funcionando!' });
}

function abaRespostas_(ss) {
  const aba = ss.getSheets()[0];
  if (/^(Untitled|Sheet1|Página1|Planilha1)$/i.test(aba.getName())) aba.setName('Confirmações');
  if (aba.getLastRow() === 0) aba.appendRow(CABECALHO);
  if (aba.getFrozenRows() === 0) {
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold').setBackground('#ffe9a8');
  }
  return aba;
}

function resumo_(ss, nomeAba) {
  if (ss.getSheetByName('Resumo')) return;
  const r = ss.insertSheet('Resumo');
  const a = "'" + nomeAba.replace(/'/g, "''") + "'";
  r.getRange('A1').setValue('Resumo das confirmações').setFontWeight('bold').setFontSize(13);
  r.getRange('A3:B8').setValues([
    ['Respostas recebidas', '=COUNTA(' + a + '!B2:B)'],
    ['Famílias que vão', '=COUNTIF(' + a + '!C2:C,"Sim")'],
    ['Adultos', '=SUM(' + a + '!D2:D)'],
    ['Crianças', '=SUM(' + a + '!E2:E)'],
    ['Total de pessoas', '=SUM(' + a + '!F2:F)'],
    ['Não vão', '=COUNTIF(' + a + '!C2:C,"Não")']
  ]);
  r.getRange('A7:B7').setFontWeight('bold');
  r.setColumnWidth(1, 190);
}

function numero_(v) {
  return Math.max(0, Math.min(30, parseInt(v, 10) || 0));
}

// Corta o tamanho e evita que um texto vire fórmula na planilha.
function texto_(v, max) {
  let s = String(v == null ? '' : v).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
