# Mundo dos Slimes

Um mundo vivo e compartilhado: slimes que conversam, aprendem, erram, ganham profissões, se dividem e constroem uma vila numa floresta que é sempre preservada.

- **Página:** GitHub Pages, a partir do ramo `main` (`index.html`).
- **Estado do mundo:** `world.json` no ramo `dados`. Só a automação grava nele.
- **Automação:** `.github/workflows/mundo.yml` roda a cada 10 minutos (o mundo evolui) e sempre que alguém envia uma mensagem pela página (a mensagem vira uma issue, o slime responde e a issue é fechada).
- **Pesquisas:** os slimes pesquisam na Wikipédia em português sobre o que a vila precisa.

## Arquivos

- `sim/_data.js`: tabelas do jogo (áreas de conhecimento, profissões, construções, tarefas).
- `sim/_engine.js`: regras do mundo.
- `shared.js`: gerado por `node sim/build-shared.js`, usado pela página e pela automação.
- `sim/run.js`: roda o mundo (`MODE=tick` ou `MODE=message`).

## Moderação

Cada mensagem fica registrada como issue com a conta de quem enviou. Para bloquear alguém, use o bloqueio de usuários do GitHub. Cada pessoa pode mandar até 10 mensagens por hora.

## Conversa instantânea (Firebase, opcional)

Com `firebase-config.json` preenchido, a página manda as mensagens para o Firestore e o slime responde na hora. A automação lê as mensagens novas a cada rodada e aplica no mundo. As regras em `firestore.rules` deixam o visitante apenas criar mensagens curtas, uma a cada 15 segundos. Ninguém consegue editar ou apagar mensagens, nem mexer no mundo pelo Firebase.
