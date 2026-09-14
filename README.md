# 🖨️ Calculadora de Custos de Impressão 3D

**Acesse a versão online aqui:** [Calculadora 3D](https://calc-print3-d.vercel.app/)

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

## 🧮 Como os Custos são Calculados (Fórmulas)

Para garantir precisão centavo a centavo, a calculadora utiliza as seguintes fórmulas sob o capô:

1. **Custo do Material (Filamento):**
   `Custo = (Peso da peça em gramas ÷ 1000) × Preço do carretel de 1kg`
   *A ideia aqui é cobrar proporcionalmente à fração de quilograma exata que a peça consome.*

2. **Custo de Energia Elétrica:**
   `Tempo Total (em horas) = Horas + (Minutos ÷ 60)`
   `Custo = Tempo Total × (Consumo da Máquina em Watts ÷ 1000) × Tarifa da Concessionária (R$/kWh)`
   *Isso converte o tempo total e os Watts consumidos em kWh, multiplicando pelo valor da energia da sua região.*

3. **Custo de Depreciação (Desgaste da Máquina):**
   `Custo = Tempo Total (em horas) × Taxa de Desgaste por Hora (R$/h)`
   *Toda impressora tem uma vida útil e peças descartáveis (bicos, correias). Cobrar um valor fixo (ex: R$ 1,50) por hora de impressão garante que a máquina pague a própria manutenção.*

4. **Custo Total de Produção:**
   `Custo Produção = Material + Energia + Depreciação`

5. **Acréscimo de Taxa de Falha:**
   `Custo Ajustado = Custo Produção × (1 + (Taxa de Falha % ÷ 100))`
   *Impressão 3D falha. Se você colocar 5% de margem de falha, o preço absorve a probabilidade estatística de você perder peças ao longo do mês, sem tirar do seu lucro.*

6. **Preço Final de Venda Sugerido:**
   `Preço Final = Custo Ajustado × (1 + (Margem de Lucro % ÷ 100))`
   *Calcula a venda real (lucro limpo) com base no total gasto, pronto para ser passado ao cliente!*

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
