# PRISMA 2020 Flowchart Web • Nathan

Uma ferramenta web moderna, leve e autônoma para criação, personalização e exportação de fluxogramas em total conformidade com o **PRISMA 2020 Statement** para revisões sistemáticas.

Desenvolvida como uma alternativa moderna ao pacote R Shiny, executada 100% no navegador (client-side), com **preenchimento dinâmico e intuitivo**, **renderização vetorial SVG de alta definição** e **salvamento em nuvem sem necessidade de servidores**.

---

## ✨ Principais Vantagens em Relação à Versão Original

1. **Preenchimento Prático e Sem Sintaxes Complexas:**
   - Nada de digitar textos formatados como `Database 1, 100; Database 2, 50;`.
   - Adicione bases de dados, registros e motivos de exclusão com um clique (`+ Adicionar Base`, `+ Adicionar Motivo`).
   - Botões de cálculo automático para somar registros e calcular etapas de triagem.
2. **Salvamento em Nuvem e Alterações Rápidas:**
   - **Auto-save Local:** Cada caractere digitado é gravado instantaneamente no seu navegador.
   - **Link Permanente na Nuvem (Hash URL):** Gera um link compartilhável que guarda todo o estado do seu fluxograma. Basta favoritar o link ou guardá-lo nos seus documentos para reabrir exatamente onde parou em qualquer dispositivo.
   - **Cloud Sync ID:** Salve com um identificador de projeto para sincronizar facilmente.
   - **Exportação/Importação JSON e CSV:** Totalmente compatível com o CSV oficial do PRISMA2020 em R.
3. **Qualidade Visual para Publicação:**
   - Renderização SVG vetorial nítida em tempo real.
   - Exportação em **SVG** (vetorial infinito para Adobe Illustrator/Inkscape).
   - Exportação em **PNG de Alta Resolução (300 DPI)** para submissão em revistas de alto fator de impacto.
   - **Copiar Imagem (Ctrl + V):** Cole diretamente no Word ou Google Docs sem precisar baixar arquivos.
   - Suporte completo a **Português (BR)** e **Inglês** oficial do PRISMA com um clique.

---

## 🚀 Como Colocar no seu Repositório do GitHub e Ativar o GitHub Pages

Você pode publicar esta aplicação gratuitamente no seu GitHub em menos de 3 minutos:

### Passo 1: Criar o Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new) e faça login na sua conta.
2. No campo **Repository name**, dê um nome (por exemplo: `prisma2020-fluxograma` ou `meu-prisma`).
3. Deixe o repositório como **Public** (necessário para o GitHub Pages gratuito).
4. Clique em **Create repository**.

### Passo 2: Fazer Upload dos Arquivos
1. Na página do repositório recém-criado, clique em **Add file** > **Upload files** (ou envie via Git no terminal).
2. Selecione ou arraste os seguintes arquivos desta pasta:
   - `index.html`
   - `app.js`
   - `styles.css`
   - `README.md`
3. Clique no botão verde **Commit changes**.

### Passo 3: Ativar o GitHub Pages (Seu site no ar)
1. No seu repositório, clique na aba **Settings** (Configurações) no topo.
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Branch**, mude de `None` para **`main`** (ou `master`) e clique em **Save**.
4. Em 1 a 2 minutos, o GitHub vai gerar o seu link oficial:
   ```text
   https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
   ```
5. Pronto! Agora você e qualquer colega de pesquisa podem acessar sua ferramenta de qualquer lugar pelo celular, tablet ou computador.

---

## 💻 Como Rodar Localmente no seu Computador

Você não precisa instalar Node.js, Python ou R!
Basta dar **duplo clique no arquivo `index.html`** no seu computador. Ele abrirá instantaneamente em qualquer navegador (Chrome, Edge, Firefox, Safari).

---

## 📁 Estrutura dos Arquivos

```text
├── index.html   # Estrutura visual da aplicação (Tailwind CSS, ícones, modais)
├── app.js       # Motor de renderização SVG, lógica de dados e salvamento em nuvem
├── styles.css   # Estilos adicionais e regras de impressão/PDF
└── README.md    # Este manual de instruções
```

---

## 📜 Citação e Conformidade

Este fluxograma segue estritamente as diretrizes do **PRISMA 2020 Statement**:
> Page MJ, McKenzie JE, Bossuyt PM, Boutron I, Hoffmann TC, Mulrow CD, et al. The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ 2021;372:n71. doi: 10.1136/bmj.n71.
