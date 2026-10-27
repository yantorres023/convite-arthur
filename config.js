/* ===== Configuração dos convites do Arthur (vale para os 3) ===== */
window.CONVITE = {
  // Endereço do App da Web do Google Apps Script (termina em /exec).
  // Enquanto estiver vazio, os convites ficam em "modo teste" e nada é gravado.
  planilha: 'https://script.google.com/macros/s/AKfycbxU9WbDLQ1zY_uGd69_QmWoIJXiP8DCeCoEejp67x6HRcbxvv9HbeG9VnaA2Q5OFwKS/exec',

  // Endereço da festa (como aparece no convite).
  local: 'Casa da Árvore – Rua Castelo Branco, nº 31, Cidade Nova, Santana do Paraíso (MG)',
  // Endereço usado na busca do Waze e do Apple Maps.
  endereco: 'Rua Castelo Branco, 31, Cidade Nova, Santana do Paraíso - MG',
  // Link do Google Maps (opcional; sem ele, usa o endereço acima).
  mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Casa da Árvore, Rua Castelo Branco, 31, Cidade Nova, Santana do Paraíso - MG'),

  inicio: '2026-11-29T15:00:00-03:00',
  fim: '2026-11-29T19:00:00-03:00'
};
