# Convites do Arthur · 1 ano 🤠

Três opções de convite interativo para o aniversário de 1 ano do Arthur.
Tema country, domingo, 29 de novembro, às 15h. Confirmação de presença pelo WhatsApp (31) 99169-2132.

**Ver as 3 opções lado a lado:** https://yantorres023.github.io/convite-arthur/

| Opção | Link | Destaques |
|---|---|---|
| 1. Velho Oeste | https://yantorres023.github.io/convite-arthur/velho-oeste/ | Portas de saloon, cartaz "Procura-se", estrela de xerife, Peãozômetro |
| 2. Fazendinha | https://yantorres023.github.io/convite-arthur/fazendinha/ | Celeiro que abre, jogo de achar os bichinhos com sons, cores suaves |
| 3. Rodeio VIP | https://yantorres023.github.io/convite-arthur/rodeio/ | Varal de luzes, laço animado, ingresso de raspadinha, escolha de personagem |

## Como funciona a confirmação

O convidado preenche nome, número de adultos e crianças e um recado opcional.
O botão abre o WhatsApp com a mensagem pronta para o número 5531991692132.
Também há um botão "Não vou conseguir ir" e um botão para salvar na agenda.

## Ajustes rápidos

No final de cada `index.html` há um bloco `CONFIG`:

```js
const CONFIG = {
  whatsapp: '5531991692132',
  inicio: '2026-11-29T15:00:00-03:00',
  local: '',  // ex.: 'Rua das Flores, 123 – Bairro, Belo Horizonte'
  mapa: ''    // link do Google Maps (opcional)
};
```

Com `local` vazio, o convite diz que o endereço vai junto com a confirmação.
Preenchendo `local` (e `mapa`, se quiser), o endereço aparece no convite.
