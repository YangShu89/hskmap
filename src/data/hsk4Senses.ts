import type { HskWord, WordSense } from '../types';

const HSK4_CURATED_SENSES: Record<string, WordSense[]> = {
  'hsk4-bang-7': [
    {
      meaning: 'excellent; great',
      examples: [
        { hanzi: '这个办法很棒。', pinyin: 'Zhège bànfǎ hěn bàng.', meaning: 'This method is excellent.' },
      ],
    },
    {
      meaning: 'stick; club',
      examples: [
        { hanzi: '他手里拿着一根棒。', pinyin: 'Tā shǒu lǐ názhe yì gēn bàng.', meaning: 'He is holding a stick in his hand.' },
      ],
    },
  ],
  'hsk4-dao-80': [
    {
      meaning: 'pour',
      examples: [
        { hanzi: '请倒一些水。', pinyin: 'Qǐng dào yìxiē shuǐ.', meaning: 'Please pour some water.' },
      ],
    },
    {
      meaning: 'upside down; inverted',
      examples: [
        { hanzi: '这张照片放倒了。', pinyin: 'Zhè zhāng zhàopiàn fàng dào le.', meaning: 'This photo was placed upside down.' },
      ],
    },
  ],
  'hsk4-dang-76': [
    {
      meaning: 'act as; work as',
      examples: [
        { hanzi: '当老师不容易。', pinyin: 'Dāng lǎoshī bù róngyì.', meaning: 'Being a teacher is not easy.' },
      ],
    },
    {
      meaning: 'when; at the time that',
      examples: [
        { hanzi: '当我到家的时候，雨停了。', pinyin: 'Dāng wǒ dào jiā de shíhou, yǔ tíng le.', meaning: 'When I got home, the rain stopped.' },
      ],
    },
  ],
  'hsk4-deng-88': [
    {
      meaning: 'wait',
      examples: [
        { hanzi: '我在学校等你。', pinyin: 'Wǒ zài xuéxiào děng nǐ.', meaning: 'I am waiting for you at school.' },
      ],
    },
    {
      meaning: 'and so on; etc.',
      examples: [
        { hanzi: '我买了苹果、葡萄等水果。', pinyin: 'Wǒ mǎi le píngguǒ, pútao děng shuǐguǒ.', meaning: 'I bought apples, grapes, and other fruit.' },
      ],
    },
  ],
  'hsk4-huo-184': [
    {
      meaning: 'fire',
      examples: [
        { hanzi: '厨房里有火。', pinyin: 'Chúfáng lǐ yǒu huǒ.', meaning: 'There is fire in the kitchen.' },
      ],
    },
    {
      meaning: 'popular; hot',
      examples: [
        { hanzi: '这首歌最近很火。', pinyin: 'Zhè shǒu gē zuìjìn hěn huǒ.', meaning: 'This song has been very popular recently.' },
      ],
    },
  ],
  'hsk4-jie-222': [
    {
      meaning: 'class period; section',
      examples: [
        { hanzi: '今天有一节课。', pinyin: 'Jīntiān yǒu yì jié kè.', meaning: 'There is one class today.' },
      ],
    },
    {
      meaning: 'festival; holiday',
      examples: [
        { hanzi: '春节是中国的重要节日。', pinyin: 'Chūnjié shì Zhōngguó de zhòngyào jiérì.', meaning: 'Spring Festival is an important Chinese holiday.' },
      ],
    },
  ],
  'hsk4-lian-286': [
    {
      meaning: 'even',
      examples: [
        { hanzi: '他连水都没有喝。', pinyin: 'Tā lián shuǐ dōu méiyǒu hē.', meaning: 'He did not even drink water.' },
      ],
    },
    {
      meaning: 'connect; link',
      examples: [
        { hanzi: '请把这两句话连在一起。', pinyin: 'Qǐng bǎ zhè liǎng jù huà lián zài yìqǐ.', meaning: 'Please connect these two sentences.' },
      ],
    },
  ],
  'hsk4-liu-291': [
    {
      meaning: 'leave behind; keep',
      examples: [
        { hanzi: '请留下你的号码。', pinyin: 'Qǐng liú xià nǐ de hàomǎ.', meaning: 'Please leave your number.' },
      ],
    },
    {
      meaning: 'stay',
      examples: [
        { hanzi: '他想留在北京工作。', pinyin: 'Tā xiǎng liú zài Běijīng gōngzuò.', meaning: 'He wants to stay in Beijing to work.' },
      ],
    },
  ],
  'hsk4-mao-300': [
    {
      meaning: 'hair; fur',
      examples: [
        { hanzi: '这件衣服上有毛。', pinyin: 'Zhè jiàn yīfu shàng yǒu máo.', meaning: 'There is hair on this piece of clothing.' },
      ],
    },
    {
      meaning: 'dime; one tenth of a yuan',
      examples: [
        { hanzi: '这个苹果五毛钱。', pinyin: 'Zhège píngguǒ wǔ máo qián.', meaning: 'This apple costs five mao.' },
      ],
    },
  ],
  'hsk4-qian-wan-339': [
    {
      meaning: 'must; be sure to',
      examples: [
        { hanzi: '你千万不要迟到。', pinyin: 'Nǐ qiānwàn bú yào chídào.', meaning: 'You must not be late.' },
      ],
    },
    {
      meaning: 'ten million',
      examples: [
        { hanzi: '这家公司赚了一千万。', pinyin: 'Zhè jiā gōngsī zhuàn le yì qiān wàn.', meaning: 'This company earned ten million.' },
      ],
    },
  ],
  'hsk4-sheng-378': [
    {
      meaning: 'province',
      examples: [
        { hanzi: '我住在这个省。', pinyin: 'Wǒ zhù zài zhège shěng.', meaning: 'I live in this province.' },
      ],
    },
    {
      meaning: 'save; economize',
      examples: [
        { hanzi: '这样做可以省时间。', pinyin: 'Zhèyàng zuò kěyǐ shěng shíjiān.', meaning: 'Doing it this way can save time.' },
      ],
    },
  ],
  'hsk4-shou-392': [
    {
      meaning: 'collect; gather in',
      examples: [
        { hanzi: '老师收作业。', pinyin: 'Lǎoshī shōu zuòyè.', meaning: 'The teacher collects homework.' },
      ],
    },
    {
      meaning: 'receive',
      examples: [
        { hanzi: '你收信了吗？', pinyin: 'Nǐ shōu xìn le ma?', meaning: 'Did you receive the letter?' },
      ],
    },
  ],
  'hsk4-tai-418': [
    {
      meaning: 'measure word for machines and devices',
      examples: [
        { hanzi: '我买了一台电脑。', pinyin: 'Wǒ mǎi le yì tái diànnǎo.', meaning: 'I bought a computer.' },
      ],
    },
    {
      meaning: 'platform; stage',
      examples: [
        { hanzi: '演员站在台上。', pinyin: 'Yǎnyuán zhàn zài tái shàng.', meaning: 'The actor stood on the stage.' },
      ],
    },
  ],
  'hsk4-ti-430': [
    {
      meaning: 'carry by hand',
      examples: [
        { hanzi: '请提这个包。', pinyin: 'Qǐng tí zhège bāo.', meaning: 'Please carry this bag.' },
      ],
    },
    {
      meaning: 'mention; bring up',
      examples: [
        { hanzi: '老师提了一个问题。', pinyin: 'Lǎoshī tí le yí ge wèntí.', meaning: 'The teacher raised a question.' },
      ],
    },
  ],
  'hsk4-tong-guo-438': [
    {
      meaning: 'pass; pass through',
      examples: [
        { hanzi: '我通过了考试。', pinyin: 'Wǒ tōngguò le kǎoshì.', meaning: 'I passed the exam.' },
      ],
    },
    {
      meaning: 'by means of; through',
      examples: [
        { hanzi: '我们通过互联网联系。', pinyin: 'Wǒmen tōngguò hùliánwǎng liánxì.', meaning: 'We contact each other through the internet.' },
      ],
    },
  ],
  'hsk4-yuan-lai-540': [
    {
      meaning: 'originally; formerly',
      examples: [
        { hanzi: '我原来住在上海。', pinyin: 'Wǒ yuánlái zhù zài Shànghǎi.', meaning: 'I originally lived in Shanghai.' },
      ],
    },
    {
      meaning: 'so it turns out; as it turns out',
      examples: [
        { hanzi: '原来你也在这里。', pinyin: 'Yuánlái nǐ yě zài zhèlǐ.', meaning: 'So you are here too.' },
      ],
    },
  ],
  'hsk4-zhao-555': [
    {
      meaning: 'shine; illuminate',
      examples: [
        { hanzi: '太阳照在桌子上。', pinyin: 'Tàiyáng zhào zài zhuōzi shàng.', meaning: 'The sun shines on the table.' },
      ],
    },
    {
      meaning: 'according to; follow',
      examples: [
        { hanzi: '请照这个办法做。', pinyin: 'Qǐng zhào zhège bànfǎ zuò.', meaning: 'Please do it according to this method.' },
      ],
    },
  ],
  'hsk4-zui-hao-593': [
    {
      meaning: 'best',
      examples: [
        { hanzi: '这是最好的办法。', pinyin: 'Zhè shì zuì hǎo de bànfǎ.', meaning: 'This is the best method.' },
      ],
    },
    {
      meaning: 'had better; it would be best to',
      examples: [
        { hanzi: '你最好现在休息。', pinyin: 'Nǐ zuìhǎo xiànzài xiūxi.', meaning: 'You had better rest now.' },
      ],
    },
  ],
};

function splitMeaningIntoSenses(meaning: string): WordSense[] | undefined {
  const senses = meaning
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({ meaning: part }));

  return senses.length > 1 ? senses : undefined;
}

export function getHsk4Senses(word: HskWord): WordSense[] | undefined {
  return HSK4_CURATED_SENSES[word.id] ?? splitMeaningIntoSenses(word.meaning);
}
