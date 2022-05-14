'use strict';

{
  const quizStock = [
    {quiz: '翻車魚', hint: '平べったい回遊魚', answer: 'まんぼう', num: 4},
    {quiz: '仙人掌', hint: 'トゲトゲの植物', answer: 'さぼてん', num: 4},
    {quiz: '甘藍', hint: 'トンカツの付け合わせ', answer: 'きゃべつ', num: 4},
    {quiz: '猟虎', hint: 'お腹で貝を割る', answer: 'らっこ', num: 3},
    {quiz: '竜髭菜', hint: 'グリーン○○○○○○', answer: 'あすぱらがす', num: 6},
    {quiz: '鳩尾', hint: '人体の急所の一つ', answer: 'みぞおち', num: 4},
    {quiz: '脹脛', hint: 'こむら返りは痛いです', answer: 'ふくらはぎ', num: 5},
    {quiz: '柳葉魚', hint: '子持ち○○○○', answer: 'ししゃも', num: 4},
    {quiz: '公魚', hint: '氷に穴を開けて釣ってる', answer: 'わかさぎ', num: 4},
    {quiz: '松明', hint: '洞窟探検でよく見る原始的な灯り', answer: 'たいまつ', num: 4},
    {quiz: '蠟燭', hint: '英語でキャンドル', answer: 'ろうそく', num: 4},
    {quiz: '啄木鳥', hint: '木にくちばしで穴を開ける', answer: 'きつつき', num: 4},
    {quiz: '不如帰', hint: '鳴かぬなら鳴くまで待とう', answer: 'ほととぎす', num: 5},
    {quiz: '獺', hint: 'コツメ○○○○', answer: 'かわうそ', num: 4},
    {quiz: '蝸牛', hint: 'でんでんむし', answer: 'かたつむり', num: 5},
    {quiz: '洋刀', hint: '○○○○タイガー', answer: 'さーべる', num: 4},
    {quiz: '韮', hint: 'よくレバーと炒めます', answer: 'にら', num: 2},
    {quiz: '蛞蝓', hint: '塩かけないでね', answer: 'なめくじ', num: 4},
    {quiz: '団扇', hint: '夏に重宝します', answer: 'うちわ', num: 3},
    {quiz: '蝦蛄', hint: '強力なパンチを繰り出すエビ', answer: 'しゃこ', num: 3},
  ];

  const start = document.getElementById('start');
  const startBtn = document.getElementById('startBtn');
  const container = document.querySelector('main');
  const quizText = document.querySelector('.quiz > h1');
  const quizNum = document.querySelector('.quiz > ul');
  const hintBtn = document.querySelector('dt');
  const hintText = document.querySelector('dd');
  const answerInput = document.querySelector('input');
  const answerBtn = document.getElementById('answerBtn');
  const passBtn = document.getElementById('passBtn');
  const number = document.getElementById('current');
  const mask = document.getElementById('mask');
  const maskCorrect = document.getElementById('correct');
  const maskIncorrect = document.getElementById('incorrect');
  const maskImage = document.querySelector('#mask > img');
  const result = document.getElementById('result');
  const resultScore = document.querySelector('#result > ul');
  const resultTotal = document.getElementById('resultTotal');

  let currentQuiz;
  let currentNumber = 1;
  let score = 0;
  let totalScore = 0;

  function quizRename(){
    currentQuiz = Math.floor(Math.random() * quizStock.length);
    quizText.textContent = `${quizStock[currentQuiz].quiz}`;
    hintText.textContent = `${quizStock[currentQuiz].hint}`;

    for(let i = 0; i < quizStock[currentQuiz].num; i++){
      const li = document.createElement('li');
      quizNum.appendChild(li);
    }
  }

  function quizDelete(){ 
    const li = document.createElement('li');
    li.textContent = `${currentNumber} : ${score}点`;
    resultScore.appendChild(li);

    currentNumber++;
    number.textContent = `${currentNumber}`;
    totalScore += score;
    score = 0;
    hintText.classList.add('hidden');
    
    if(currentNumber > 10){
      resultTotal.textContent = `今回の得点 : ${totalScore}点`;
      container.classList.add('hidden');
      result.classList.remove('hidden');
      return;
    }

    while(quizNum.firstChild){
      quizNum.removeChild(quizNum.firstChild);
    }
    
    quizStock.splice(currentQuiz, 1);

    quizRename();
  }

  startBtn.addEventListener('click', () =>{
    start.classList.add('hidden');
    container.classList.remove('hidden');
  });

  hintBtn.addEventListener('click', () =>{
    hintText.classList.remove('hidden');
  });

  answerBtn.addEventListener('click', e =>{
    e.preventDefault();

    if(answerInput.value === quizStock[currentQuiz].answer){
      if(!hintText.classList.contains('hidden')){
        score -= 5;
      }
      score += 10;
      maskCorrect.classList.remove('hidden');
      maskImage.src = 'img/true.png';
    } else {
      maskIncorrect.classList.remove('hidden');
      maskImage.src = 'img/false.png';
    }
    mask.classList.remove('hidden');
  });

  passBtn.addEventListener('click', e =>{
    e.preventDefault();

    score++;
    quizDelete();
  });

  mask.addEventListener('click', () =>{
    answerInput.value = '';
    mask.classList.add('hidden');
    maskCorrect.classList.add('hidden');
    maskIncorrect.classList.add('hidden');

    quizDelete();
  });

  quizRename();
}