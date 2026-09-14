# 🖨️ Calculadora de Custos de Impressão 3D

Bem-vindo à **Calculadora de Custos de Impressão 3D**, uma ferramenta web moderna, construída com React e Vite, focada em fornecer precisão absoluta para makers e empreendedores no momento de precificar suas peças impressas em 3D.

![Calculadora de Custos de Impressão 3D](public/favicon.png)

## 🚀 Funcionalidades

A calculadora foi desenvolvida do zero para oferecer todas as variáveis essenciais de um negócio de impressão 3D em uma única tela fluida e responsiva:

- **Configurações da Impressora:** Insira os tempos exatos de impressão (horas e minutos) e selecione o tipo de máquina para contabilizar depreciação.
- **Custos de Filamento (Material):** Possui presets das principais marcas nacionais de filamentos (Voolt3D, 3D Fila, etc.) e a opção Custom, permitindo ajustar o tipo de material (PLA, ABS, PETG) e a quantidade gasta (g).
- **Tarifa de Energia Automatizada (Offline):** Não perca tempo procurando sua conta de luz. Basta selecionar o seu Estado (UF) e a sua Distribuidora de energia, e a ferramenta busca o valor do kWh fixado automaticamente usando um banco de dados interno (100% offline, rápido e gratuito).
- **Custos Operacionais e Margem:** Contabilize taxa de falha (risco da peça dar errado) e aplique a sua Margem de Lucro desejada sobre o custo total.
- **Resumo Inteligente:** Um painel dinâmico exibe os custos separados (Material, Energia, Depreciação), o Custo Total e o **Preço Final Sugerido de Venda**.
- **Layout Responsivo:** A interface se adapta perfeitamente para computadores, tablets e telas de celular (mobile-friendly), exibindo tudo de forma alinhada.

## 🛠️ Tecnologias Utilizadas

- **React 18** (Functional Components + Hooks)
- **Vite** (Build tool ultrarrápida)
- **Styled-Components** (CSS-in-JS dinâmico e flexível)
- **Lucide-React** (Ícones modernos)
- **Vercel** (Deploy contínuo e rápido)

## 📦 Como rodar localmente

1. Clone o repositório ou baixe os arquivos.
2. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
3. Abra o terminal na pasta do projeto e instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse no seu navegador, geralmente em `http://localhost:5173`.

## 🔋 Como atualizar as tarifas de Energia?

O projeto não depende de nenhuma API externa complexa ou paga para puxar as tarifas. Ele utiliza um banco de dados fixo localizado no arquivo `src/data/distribuidoras.js`. 
Caso ocorram reajustes anuais pelas distribuidoras, basta editar este arquivo, alterar o valor da tarifa correspondente ao seu estado e rodar o `npm run build` ou enviar para o Github para atualizar o site no Vercel automaticamente!

---

*Desenvolvido para revolucionar a maneira como você precifica suas ideias!*
