# Convites do Arthur · 1 aninho 🐮

Três opções de convite interativo, todas no tema fazendinha, para o aniversário de 1 aninho do Arthur.
Domingo, 29 de novembro, às 15h. As confirmações vão para uma planilha do Google.

**Ver as 3 opções lado a lado:** https://yantorres023.github.io/convite-arthur/

| Opção | Link | Destaques |
|---|---|---|
| 1. Fazendinha | https://yantorres023.github.io/convite-arthur/fazendinha/ | Celeiro que abre, joguinho de achar os bichinhos com sons |
| 2. Passeio de Trator | https://yantorres023.github.io/convite-arthur/trator/ | Tratorzinho que segue a estrada conforme a rolagem, joguinho das cenouras |
| 3. Livrinho do Arthur | https://yantorres023.github.io/convite-arthur/livrinho/ | Livrinho para folhear, cada bichinho conta uma parte do convite |

## Onde mudar as informações

Tudo fica em [`config.js`](config.js), e vale para os 3 convites:

```js
window.CONVITE = {
  planilha: '',  // endereço do App da Web do Apps Script (termina em /exec)
  local: '',     // endereço da festa
  mapa: '',      // link do Google Maps (opcional)
  inicio: '2026-11-29T15:00:00-03:00',
  fim: '2026-11-29T19:00:00-03:00'
};
```

Enquanto `planilha` estiver vazio, os convites mostram "modo teste" e nada é gravado.

## Como ligar a planilha (uma vez só)

1. Abra a planilha **Confirmações · Aniversário do Arthur** no Google Drive.
2. Menu **Extensões → Apps Script**.
3. Apague o que estiver no editor e cole o conteúdo de [`planilha/Codigo.gs`](planilha/Codigo.gs). Clique em **Salvar**.
4. **Implantar → Nova implantação**. Na engrenagem, escolha **App da Web**.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Clique em **Implantar** e autorize com a sua conta (em "Avançado", clique em "Acessar").
6. Copie o **URL do app da Web** (termina em `/exec`) e coloque em `planilha` no `config.js`.

Cada resposta vira uma linha: data/hora, nome, se vai, adultos, crianças, total, recado e qual convite foi usado.
Uma aba **Resumo** é criada sozinha na primeira resposta, com os totais.
