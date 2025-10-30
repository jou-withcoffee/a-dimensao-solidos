import { useState } from 'react';
import './App.css'

const stages = [
  {
    id: 0,
    text: "Bem-vindo ao mundo dos sólidos! Você passou por um portal e acordou aqui, em uma dimensão totalmente diferente, cercado por todo tipo de sólidos geométricos. Sua missão é sair de aqui o mais rápido possível, se você ficar aqui seu gato vai passar fome, ele tá esperando por você em casa, você deveria sair rápido porque seu gato vai ficar muito bravo se não comer logo...",
    question: "Pronto pra começar?",
    options: [
      { text: "Sim!", correct: true, next: 1, msg: "Bora lá!!!" },
      { text: "Não", correct: false, next: 0, msg: "Oxi, vc não se importa com seu gato?" },
    ],
  },
  {
    id: 1,
    text: "Vamos começar com algo fácil, meu amigo Euler tem uma fórmula bem simples para resolver isso...",
    question: "Um prisma tem 8 vértices e 12 arestas. Quantas faces ele tem?",
    options: [
      { text: "6", correct: true, next: 2, msg: "É isso! Muito bem" },
      { text: "5", correct: false, next: 0, msg: "Não é isso" },
      { text: "8", correct: false, next: 0, msg: "Tem certeza? confira os cálculos" },
    ],
  },
  {
    id: 2,
    text: "Tenho um amigo que se chama eneaedro, ele não gosta que esqueçam das suas faces, mas eu não lembro quantas ele tem...",
    question: "Um eneaedro tem quantas faces?",
    options: [
      { text: "indefinido", correct: false, next: 0, msg: "Por acaso isso é possível?" },
      { text: "20", correct: false, next: 0, msg: "Hmmm acho que não" },
      { text: "9", correct: true, next: 3, msg: "Sim! obrigado, ele não vai ficar chateado comigo" },
    ],
  },
  {
    id: 3,
    text: "Essa também deveria ser simples...",
    question: "Existe um sólido geométrico que possui um único vértice e nenhuma face ou aresta, qual é o nome desse sólido?",
    options: [
      { text: "Cone", correct: true, next: 4, msg: "Mandou bem!" },
      { text: "Esfera", correct: false, next: 0, msg: "Hmmm não sei, tenta de novo" },
      { text: "Paralelepípedo", correct: false, next: 0, msg: "Não, ele não tem nada a ver" },
      { text: "Polígono triangular", correct: false, next: 0, msg: "Isso nem é um nome de um poliedro" },
    ],
  },
  {
    id: 4,
    text: "Olha, esse é meu amigo paralelepípedo (ele não é muito simpático com humanos), vai fazer uma pergunta...",
    question: "Quantas arestas tenho? Responda logo, tô com pressa",
    options: [
      { text: "6", correct: false, next: 4, msg: "Não." },
      { text: "12", correct: true, next: 5, msg: "É... acho q tá certo, pode continuar" },
      { text: "14", correct: false, next: 4, msg: "Não não não, nada a ver!" },
      { text: "20", correct: false, next: 4, msg: "Sério? tenta de novo, to ficando bravo" },
    ],
  },
  {
    id: 5,
    text: "Eu sempre tive a teoria de que os gatos fizeram as pirâmides do Egito, ah e falando nisso...",
    question: "Qual é a forma da base das pirâmides do Egito?",
    options: [
      { text: "Triângulo", correct: false, next: 5, msg: "Essas são as faces laterais" },
      { text: "Retângulo", correct: false, next: 5, msg: "Hmm tá quase lá" },
      { text: "Hexágono", correct: false, next: 5, msg: "Não é isso" },
      { text: "Quadrado", correct: true, next: 6, msg: "Boaa, mandou bem" },
    ],
  },
  {
    id: 6,
    text: "Essa é a última pergunta dessa fase inicial...",
    question: "Quantas faces tem um prisma pentagonal?",
    options: [
      { text: "5", correct: false, next: 6, msg: "Acho que faltou alguma coisa no seu cálculo" },
      { text: "6", correct: false, next: 6, msg: "Tem certeza?" },
      { text: "7", correct: true, next: 7, msg: "Sim! 5 faces laterais e 2 bases" },
      { text: "10", correct: false, next: 6, msg: "Não, isso é muito!" },
    ],
  },
  {
    id: 7,
    text: "Mandou bem demais! Agora vamos começar com coisas mais difíceis...",
    question: "Qual foi o matemático que descobriu a relação para poliedros convexos da forma: V + F = A + 2?",
    options: [
      { text: "Isaac Newton", correct: false, next: 7, msg: "Bem famoso, mas não é ele" },
      { text: "René Descartes", correct: false, next: 7, msg: "Descartes não foi" },
      { text: "Leonhard Euler", correct: true, next: 8, msg: "Exatamente!!!" },
      { text: "Emmy Noether", correct: false, next: 7, msg: "Não foi ela" },
    ],
  },
  {
    id: 8,
    text: "",
    question: "A soma das arestas de um cubo de 4cm é:",
    options: [
      { text: "48cm", correct: true, next: 9, msg: "Genial!" },
      { text: "24cm", correct: false, next: 8, msg: "Pensa um pouco mais" },
      { text: "36cm", correct: false, next: 8, msg: "Não, tá errado" },
      { text: "72cm", correct: false, next: 8, msg: "É bem menos do que isso" },
    ],
  },
  {
    id: 9,
    text: "",
    question: "Quantas faces tem um dodecaedro regular?",
    options: [
      { text: "12", correct: true, next: 10, msg: "Isso aí! Dodeca = 12" },
      { text: "20", correct: false, next: 9, msg: "Esse é o icosaedro" },
      { text: "8", correct: false, next: 9, msg: "Não, esse é o octaedro" },
    ],
  },
  {
    id: 10,
    text: "",
    question: "Quantas arestas tem um cubo?",
    options: [
      { text: "8", correct: false, next: 10, msg: "Esses são os vértices" },
      { text: "12", correct: true, next: 11, msg: "Corretíssimo!" },
      { text: "6", correct: false, next: 10, msg: "Essas são as faces" },
    ],
  },
  {
    id: 11,
    text: "",
    question: "Um tetraedro tem quantas faces?",
    options: [
      { text: "3", correct: false, next: 11, msg: "Não, tá errado" },
      { text: "4", correct: true, next: 12, msg: "Sim! Quatro triângulos" },
      { text: "5", correct: false, next: 11, msg: "Não, passou" },
    ],
  },
  {
    id: 12,
    text: "",
    question: "Um prisma hexagonal tem quantas arestas?",
    options: [
      { text: "9", correct: false, next: 12, msg: "Isso seria um prisma triangular" },
      { text: "18", correct: true, next: 13, msg: "Boa! 6 + 6 + 6 = 18" },
      { text: "24", correct: false, next: 12, msg: "Muito alto, tenta de novo" },
    ],
  },
  {
    id: 13,
    text: "",
    question: "Qual é o sólido formado ao girar um triângulo retângulo em torno de um dos catetos?",
    options: [
      { text: "Cilindro", correct: false, next: 13, msg: "Não, esse é com retângulo" },
      { text: "Cone", correct: true, next: 14, msg: "Perfeito!" },
      { text: "Esfera", correct: false, next: 13, msg: "Esse é com círculo" },
    ],
  },
  {
    id: 14,
    text: "",
    question: "Qual é a relação entre vértices (V), faces (F) e arestas (A) em poliedros convexos?",
    options: [
      { text: "V + F = A + 1", correct: false, next: 14, msg: "Tá quase" },
      { text: "V + F = A + 2", correct: true, next: 15, msg: "A famosa fórmula de Euler!" },
      { text: "V + F = A", correct: false, next: 14, msg: "Não, falta algo aí" },
    ],
  },
  {
    id: 15,
    text: "",
    question: "Um cubo tem todas as suas faces com formato de:",
    options: [
      { text: "Quadrado", correct: true, next: 16, msg: "Sim! Todas são quadradas" },
      { text: "Retângulo", correct: false, next: 15, msg: "Não, são lados iguais" },
      { text: "Triângulo", correct: false, next: 15, msg: "Definitivamente não" },
    ],
  },
  {
    id: 16,
    text: "",
    question: "Qual é o nome do sólido formado por duas bases circulares e uma superfície lateral curva?",
    options: [
      { text: "Cone", correct: false, next: 16, msg: "Não, esse tem uma base só" },
      { text: "Cilindro", correct: true, next: 17, msg: "Boa!" },
      { text: "Esfera", correct: false, next: 16, msg: "Essa nem tem base" },
    ],
  },
  {
    id: 17,
    text: "",
    question: "Quantos vértices tem um octaedro?",
    options: [
      { text: "6", correct: true, next: 18, msg: "Perfeito!" },
      { text: "8", correct: false, next: 17, msg: "Essas são as faces" },
      { text: "12", correct: false, next: 17, msg: "Não, exagerou" },
    ],
  },
  {
    id: 18,
    text: "",
    question: "Qual sólido NÃO é um poliedro?",
    options: [
      { text: "Cilindro", correct: true, next: 19, msg: "Exato! Tem superfícies curvas" },
      { text: "Cubo", correct: false, next: 18, msg: "Esse é um poliedro sim" },
      { text: "Tetraedro", correct: false, next: 18, msg: "Também é um poliedro" },
    ],
  },
  {
    id: 19,
    text: "Parabéns! Você conseguiu sair da dimensão dos sólidos geométricos, agora vá lá e abraça o seu gato... mas primeiro dê comida pra ele",
    question: "questões acertou na primeira tentativa!",
    options: [],
  }
];

export default function App() {
  const [stage, setStage] = useState(0);
  const [message, setMessage] = useState('');
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [points, setPoints] = useState(0);

  const handleAnswer = (option) => {
    if (option.correct) {
      setMessage(option.msg);
      isFirstTry ? setPoints(points => points += 1) : setPoints(points);
      setTimeout(() => {
        setStage(option.next);
        setMessage('');
        setIsFirstTry(true);
      }, 1800);
    } else {
      setIsFirstTry(false);
      setMessage(option.msg);
    }
  };

  const current = stages[stage];

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif', fontSize: '20px' }}>
      <h2>A dimensão dos sólidos geométricos! 🧱🎲⚔</h2>
      <p>{current.text}</p>

      {current.question && (
        current.id != 19 ? (
          <div className='question'>
            <h3>{current.question}</h3>
            {current.options.map((option, i) => (
              <button key={i} onClick={() => handleAnswer(option)}>
                {option.text}
              </button>
            ))}
            <p>{message}</p>
          </div>
        ) : (
          <div className='question'>
            <h3 style={{ fontSize: '42px', marginBottom: '0' }}>{points > 18 ? 18 : points}/18</h3>
            <p>{current.question}</p>

          </div>
        )
      )}
    </div>
  );
}
