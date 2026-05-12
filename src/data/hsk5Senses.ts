import type { HskWord, WordSense } from '../types';

const HSK5_CURATED_SENSES: Record<string, WordSense[]> = {
  'hsk5-an-4': [
    {
      meaning: 'shore; riverbank; coast',
      examples: [
        { hanzi: '我们在岸上等船。', pinyin: 'Wǒmen zài àn shàng děng chuán.', meaning: 'We waited for the boat on the shore.' },
      ],
    },
  ],
  'hsk5-baogao-11': [
    {
      meaning: 'report',
      examples: [
        { hanzi: '他写了一份报告。', pinyin: 'Tā xiě le yí fèn bàogào.', meaning: 'He wrote a report.' },
      ],
    },
    {
      meaning: 'give a report; make a presentation',
      examples: [
        { hanzi: '他在会议上做报告。', pinyin: 'Tā zài huìyì shàng zuò bàogào.', meaning: 'He gave a report at the meeting.' },
      ],
    },
  ],
  'hsk5-biaoxian-26': [
    {
      meaning: 'behave; perform',
      examples: [
        { hanzi: '他今天表现很好。', pinyin: 'Tā jīntiān biǎoxiàn hěn hǎo.', meaning: 'He performed well today.' },
      ],
    },
    {
      meaning: 'performance; showing',
      examples: [
        { hanzi: '他的表现让老师满意。', pinyin: 'Tā de biǎoxiàn ràng lǎoshī mǎnyì.', meaning: 'His performance satisfied the teacher.' },
      ],
    },
  ],
  'hsk5-cankao-40': [
    {
      meaning: 'refer to; consult',
      examples: [
        { hanzi: '你可以参考这本书。', pinyin: 'Nǐ kěyǐ cānkǎo zhè běn shū.', meaning: 'You can refer to this book.' },
      ],
    },
    {
      meaning: 'reference',
      examples: [
        { hanzi: '这份资料仅供参考。', pinyin: 'Zhè fèn zīliào jǐn gōng cānkǎo.', meaning: 'This material is only for reference.' },
      ],
    },
  ],
  'hsk5-chengdan-54': [
    {
      meaning: 'take on; assume responsibility',
      examples: [
        { hanzi: '他愿意承担这个责任。', pinyin: 'Tā yuànyì chéngdān zhège zérèn.', meaning: 'He is willing to take on this responsibility.' },
      ],
    },
  ],
  'hsk5-chengshou-55': [
    {
      meaning: 'endure; withstand; bear',
      examples: [
        { hanzi: '我不能承受很大的压力。', pinyin: 'Wǒ bù néng chéngshòu hěn dà de yālì.', meaning: 'I cannot bear great pressure.' },
      ],
    },
  ],
  'hsk5-chengxu-56': [
    {
      meaning: 'software program',
      examples: [
        { hanzi: '这个程序很容易用。', pinyin: 'Zhège chéngxù hěn róngyì yòng.', meaning: 'This program is easy to use.' },
      ],
    },
    {
      meaning: 'procedure; process',
      examples: [
        { hanzi: '请按程序办理手续。', pinyin: 'Qǐng àn chéngxù bànlǐ shǒuxù.', meaning: 'Please follow the procedure to handle the paperwork.' },
      ],
    },
  ],
  'hsk5-dan-97': [
    {
      meaning: 'light; weak; bland',
      examples: [
        { hanzi: '这汤有点淡。', pinyin: 'Zhè tāng yǒudiǎn dàn.', meaning: 'This soup is a little bland.' },
      ],
    },
    {
      meaning: 'indifferent; distant',
      examples: [
        { hanzi: '他的态度很淡。', pinyin: 'Tā de tàidu hěn dàn.', meaning: 'His attitude is very distant.' },
      ],
    },
  ],
  'hsk5-ding-108': [
    {
      meaning: 'top; summit',
      examples: [
        { hanzi: '山顶上很冷。', pinyin: 'Shāndǐng shàng hěn lěng.', meaning: 'It is cold on the mountaintop.' },
      ],
    },
    {
      meaning: 'measure word for hats, tents, and similar objects',
      examples: [
        { hanzi: '他买了一顶帽子。', pinyin: 'Tā mǎi le yì dǐng màozi.', meaning: 'He bought a hat.' },
      ],
    },
  ],
  'hsk5-dun-118': [
    {
      meaning: 'meal',
      examples: [
        { hanzi: '我们一起吃了一顿饭。', pinyin: 'Wǒmen yìqǐ chī le yí dùn fàn.', meaning: 'We had a meal together.' },
      ],
    },
    {
      meaning: 'measure word for actions such as scolding or beating',
      examples: [
        { hanzi: '老师批评了他一顿。', pinyin: 'Lǎoshī pīpíng le tā yí dùn.', meaning: 'The teacher criticized him.' },
      ],
    },
  ],
  'hsk5-fang-an-133': [
    {
      meaning: 'plan; proposal; solution',
      examples: [
        { hanzi: '经理同意了这个方案。', pinyin: 'Jīnglǐ tóngyì le zhège fāng\'àn.', meaning: 'The manager agreed to this plan.' },
      ],
    },
  ],
  'hsk5-genben-156': [
    {
      meaning: 'fundamental; basic',
      examples: [
        { hanzi: '这是一个根本问题。', pinyin: 'Zhè shì yí ge gēnběn wèntí.', meaning: 'This is a fundamental problem.' },
      ],
    },
    {
      meaning: 'at all; simply',
      examples: [
        { hanzi: '他根本不懂。', pinyin: 'Tā gēnběn bù dǒng.', meaning: 'He does not understand at all.' },
      ],
    },
  ],
  'hsk5-hua-199': [
    {
      meaning: 'row a boat',
      examples: [
        { hanzi: '他会划船。', pinyin: 'Tā huì huá chuán.', meaning: 'He can row a boat.' },
      ],
    },
    {
      meaning: 'scratch; cut',
      examples: [
        { hanzi: '小刀划破了纸。', pinyin: 'Xiǎodāo huá pò le zhǐ.', meaning: 'The knife cut the paper.' },
      ],
    },
  ],
  'hsk5-jige-213': [
    {
      meaning: 'pass an exam; meet a standard',
      examples: [
        { hanzi: '他这次考试及格了。', pinyin: 'Tā zhè cì kǎoshì jígé le.', meaning: 'He passed this exam.' },
      ],
    },
  ],
  'hsk5-jia-222': [
    {
      meaning: 'first; A grade or group',
      examples: [
        { hanzi: '甲队赢了比赛。', pinyin: 'Jiǎ duì yíng le bǐsài.', meaning: 'Team A won the game.' },
      ],
    },
    {
      meaning: 'shell; armor',
      examples: [
        { hanzi: '乌龟有硬甲。', pinyin: 'Wūguī yǒu yìng jiǎ.', meaning: 'A turtle has a hard shell.' },
      ],
    },
  ],
  'hsk5-jiaoxun-241': [
    {
      meaning: 'lesson learned',
      examples: [
        { hanzi: '这次失败给了我教训。', pinyin: 'Zhè cì shībài gěi le wǒ jiàoxùn.', meaning: 'This failure taught me a lesson.' },
      ],
    },
    {
      meaning: 'teach someone a lesson; scold',
      examples: [
        { hanzi: '父亲教训了他。', pinyin: 'Fùqīn jiàoxùn le tā.', meaning: 'His father scolded him.' },
      ],
    },
  ],
  'hsk5-jingshen-258': [
    {
      meaning: 'spirit; mind',
      examples: [
        { hanzi: '团队精神很重要。', pinyin: 'Tuánduì jīngshén hěn zhòngyào.', meaning: 'Team spirit is important.' },
      ],
    },
    {
      meaning: 'energetic; lively',
      examples: [
        { hanzi: '他今天很精神。', pinyin: 'Tā jīntiān hěn jīngshen.', meaning: 'He is very energetic today.' },
      ],
    },
  ],
  'hsk5-jingdian-259': [
    {
      meaning: 'classic; canonical',
      examples: [
        { hanzi: '这本书很经典。', pinyin: 'Zhè běn shū hěn jīngdiǎn.', meaning: 'This book is a classic.' },
      ],
    },
    {
      meaning: 'classic work',
      examples: [
        { hanzi: '这是一部中国文学经典。', pinyin: 'Zhè shì yí bù Zhōngguó wénxué jīngdiǎn.', meaning: 'This is a classic of Chinese literature.' },
      ],
    },
  ],
  'hsk5-kua-278': [
    {
      meaning: 'praise; compliment',
      examples: [
        { hanzi: '妈妈夸我做得好。', pinyin: 'Māma kuā wǒ zuò de hǎo.', meaning: 'Mom praised me for doing well.' },
      ],
    },
    {
      meaning: 'boast; brag',
      examples: [
        { hanzi: '他总是夸自己有本事。', pinyin: 'Tā zǒngshì kuā zìjǐ yǒu běnshi.', meaning: 'He always boasts about his ability.' },
      ],
    },
  ],
  'hsk5-lixi-290': [
    {
      meaning: 'financial interest',
      examples: [
        { hanzi: '银行利息不高。', pinyin: 'Yínháng lìxī bù gāo.', meaning: 'The bank interest is not high.' },
      ],
    },
  ],
  'hsk5-mingling-321': [
    {
      meaning: 'order; command',
      examples: [
        { hanzi: '这是上级的命令。', pinyin: 'Zhè shì shàngjí de mìnglìng.', meaning: 'This is an order from a superior.' },
      ],
    },
    {
      meaning: 'order; command someone to do something',
      examples: [
        { hanzi: '经理命令大家立刻离开。', pinyin: 'Jīnglǐ mìnglìng dàjiā lìkè líkāi.', meaning: 'The manager ordered everyone to leave immediately.' },
      ],
    },
  ],
  'hsk5-mo-322': [
    {
      meaning: 'touch; feel with the hand',
      examples: [
        { hanzi: '不要摸这幅画。', pinyin: 'Bú yào mō zhè fú huà.', meaning: 'Do not touch this painting.' },
      ],
    },
    {
      meaning: 'feel out; find out by probing',
      examples: [
        { hanzi: '我们要先摸清情况。', pinyin: 'Wǒmen yào xiān mōqīng qíngkuàng.', meaning: 'We need to first find out the situation clearly.' },
      ],
    },
  ],
  'hsk5-pai-343': [
    {
      meaning: 'send; dispatch',
      examples: [
        { hanzi: '公司派我去上海。', pinyin: 'Gōngsī pài wǒ qù Shànghǎi.', meaning: 'The company sent me to Shanghai.' },
      ],
    },
    {
      meaning: 'school; faction; style',
      examples: [
        { hanzi: '他属于这个画派。', pinyin: 'Tā shǔyú zhège huàpài.', meaning: 'He belongs to this school of painting.' },
      ],
    },
  ],
  'hsk5-peiyang-345': [
    {
      meaning: 'train; develop people',
      examples: [
        { hanzi: '公司培养年轻人。', pinyin: 'Gōngsī péiyǎng niánqīng rén.', meaning: 'The company develops young people.' },
      ],
    },
    {
      meaning: 'cultivate; foster',
      examples: [
        { hanzi: '培养好习惯需要时间。', pinyin: 'Péiyǎng hǎo xíguàn xūyào shíjiān.', meaning: 'Developing good habits takes time.' },
      ],
    },
  ],
  'hsk5-shai-401': [
    {
      meaning: 'expose to the sun; dry in the sun',
      examples: [
        { hanzi: '别在太阳下晒太久。', pinyin: 'Bié zài tàiyáng xià shài tài jiǔ.', meaning: 'Do not stay in the sun too long.' },
      ],
    },
    {
      meaning: 'post or show something publicly',
      examples: [
        { hanzi: '她喜欢在网上晒照片。', pinyin: 'Tā xǐhuan zài wǎng shàng shài zhàopiàn.', meaning: 'She likes posting photos online.' },
      ],
    },
  ],
  'hsk5-shou-434': [
    {
      meaning: 'measure word for poems and songs',
      examples: [
        { hanzi: '这首诗很短。', pinyin: 'Zhè shǒu shī hěn duǎn.', meaning: 'This poem is short.' },
      ],
    },
  ],
  'hsk5-shuru-438': [
    {
      meaning: 'enter; input data',
      examples: [
        { hanzi: '请在这里输入密码。', pinyin: 'Qǐng zài zhèlǐ shūrù mìmǎ.', meaning: 'Please enter the password here.' },
      ],
    },
    {
      meaning: 'import data',
      examples: [
        { hanzi: '这些数据可以输入系统。', pinyin: 'Zhèxiē shùjù kěyǐ shūrù xìtǒng.', meaning: 'This data can be imported into the system.' },
      ],
    },
  ],
  'hsk5-tao-459': [
    {
      meaning: 'set; suite',
      examples: [
        { hanzi: '我买了一套家具。', pinyin: 'Wǒ mǎi le yí tào jiājù.', meaning: 'I bought a set of furniture.' },
      ],
    },
    {
      meaning: 'put a cover or layer over something',
      examples: [
        { hanzi: '天冷了，套上外套吧。', pinyin: 'Tiān lěng le, tào shàng wàitào ba.', meaning: 'It is cold, so put on a coat.' },
      ],
    },
  ],
  'hsk5-tui-478': [
    {
      meaning: 'move back; retreat',
      examples: [
        { hanzi: '请往后退一步。', pinyin: 'Qǐng wǎng hòu tuì yí bù.', meaning: 'Please step back one step.' },
      ],
    },
    {
      meaning: 'return; refund; withdraw',
      examples: [
        { hanzi: '我想退这张票。', pinyin: 'Wǒ xiǎng tuì zhè zhāng piào.', meaning: 'I want to return this ticket.' },
      ],
    },
  ],
  'hsk5-wanyi-483': [
    {
      meaning: 'just in case',
      examples: [
        { hanzi: '带把伞，以防万一。', pinyin: 'Dài bǎ sǎn, yǐfáng wànyī.', meaning: 'Take an umbrella just in case.' },
      ],
    },
    {
      meaning: 'if by any chance',
      examples: [
        { hanzi: '万一下雨怎么办？', pinyin: 'Wànyī xià yǔ zěnme bàn?', meaning: 'What if it rains?' },
      ],
    },
  ],
  'hsk5-xiqu-501': [
    {
      meaning: 'absorb; take in',
      examples: [
        { hanzi: '植物吸取水分。', pinyin: 'Zhíwù xīqǔ shuǐfèn.', meaning: 'Plants absorb water.' },
      ],
    },
    {
      meaning: 'draw; learn from',
      examples: [
        { hanzi: '我们要吸取经验教训。', pinyin: 'Wǒmen yào xīqǔ jīngyàn jiàoxùn.', meaning: 'We need to learn from experience and lessons.' },
      ],
    },
  ],
  'hsk5-xuxin-532': [
    {
      meaning: 'modest; open-minded',
      examples: [
        { hanzi: '他虚心接受意见。', pinyin: 'Tā xūxīn jiēshòu yìjiàn.', meaning: 'He modestly accepted the suggestions.' },
      ],
    },
  ],
  'hsk5-yidan-547': [
    {
      meaning: 'once; as soon as something happens',
      examples: [
        { hanzi: '一旦开始，就不要放弃。', pinyin: 'Yídàn kāishǐ, jiù bú yào fàngqì.', meaning: 'Once you start, do not give up.' },
      ],
    },
  ],
  'hsk5-yun-577': [
    {
      meaning: 'dizzy; carsick; seasick',
      examples: [
        { hanzi: '坐船让我有点晕。', pinyin: 'Zuò chuán ràng wǒ yǒudiǎn yūn.', meaning: 'Riding a boat makes me a little dizzy.' },
      ],
    },
    {
      meaning: 'faint; pass out',
      examples: [
        { hanzi: '他突然晕倒了。', pinyin: 'Tā tūrán yūndǎo le.', meaning: 'He suddenly fainted.' },
      ],
    },
  ],
  'hsk5-zhi-600': [
    {
      meaning: 'measure word for long thin objects',
      examples: [
        { hanzi: '这支铅笔很长。', pinyin: 'Zhè zhī qiānbǐ hěn cháng.', meaning: 'This pencil is long.' },
      ],
    },
  ],
  'hsk5-daikuan-733': [
    {
      meaning: 'loan',
      examples: [
        { hanzi: '他需要贷款。', pinyin: 'Tā xūyào dàikuǎn.', meaning: 'He needs a loan.' },
      ],
    },
    {
      meaning: 'provide a loan',
      examples: [
        { hanzi: '银行给他们贷款。', pinyin: 'Yínháng gěi tāmen dàikuǎn.', meaning: 'The bank gave them a loan.' },
      ],
    },
  ],
  'hsk5-fei-776': [
    {
      meaning: 'non-; not',
      examples: [
        { hanzi: '这是非正式会议。', pinyin: 'Zhè shì fēi zhèngshì huìyì.', meaning: 'This is an informal meeting.' },
      ],
    },
  ],
  'hsk5-fuzhuang-788': [
    {
      meaning: 'clothing; apparel',
      examples: [
        { hanzi: '她喜欢设计服装。', pinyin: 'Tā xǐhuan shèjì fúzhuāng.', meaning: 'She likes designing clothing.' },
      ],
    },
    {
      meaning: 'costume',
      examples: [
        { hanzi: '今天的服装表演很精彩。', pinyin: 'Jīntiān de fúzhuāng biǎoyǎn hěn jīngcǎi.', meaning: 'Today\'s fashion show was wonderful.' },
      ],
    },
  ],
  'hsk5-jiashe-877': [
    {
      meaning: 'suppose; assume',
      examples: [
        { hanzi: '假设明天下雨，我们就不去。', pinyin: 'Jiǎshè míngtiān xià yǔ, wǒmen jiù bù qù.', meaning: 'Suppose it rains tomorrow; then we will not go.' },
      ],
    },
    {
      meaning: 'hypothesis; assumption',
      examples: [
        { hanzi: '这个假设还需要证明。', pinyin: 'Zhège jiǎshè hái xūyào zhèngmíng.', meaning: 'This hypothesis still needs to be proven.' },
      ],
    },
  ],
  'hsk5-jiangjiu-887': [
    {
      meaning: 'be particular about; pay attention to',
      examples: [
        { hanzi: '这家饭店很讲究味道。', pinyin: 'Zhè jiā fàndiàn hěn jiǎngjiu wèidao.', meaning: 'This restaurant pays close attention to flavor.' },
      ],
    },
    {
      meaning: 'refined; tasteful',
      examples: [
        { hanzi: '这个房间布置得很讲究。', pinyin: 'Zhège fángjiān bùzhì de hěn jiǎngjiu.', meaning: 'This room is arranged very tastefully.' },
      ],
    },
  ],
  'hsk5-ke-917': [
    {
      meaning: 'measure word for small round things',
      examples: [
        { hanzi: '这颗糖很甜。', pinyin: 'Zhè kē táng hěn tián.', meaning: 'This piece of candy is very sweet.' },
      ],
    },
  ],
  'hsk5-peng-992': [
    {
      meaning: 'touch; bump into',
      examples: [
        { hanzi: '别碰这个杯子。', pinyin: 'Bié pèng zhège bēizi.', meaning: 'Do not touch this cup.' },
      ],
    },
    {
      meaning: 'run into; meet by chance',
      examples: [
        { hanzi: '我在街上碰到老师。', pinyin: 'Wǒ zài jiē shàng pèngdào lǎoshī.', meaning: 'I ran into the teacher on the street.' },
      ],
    },
  ],
  'hsk5-quanli-1027': [
    {
      meaning: 'right; entitlement',
      examples: [
        { hanzi: '每个人都有权利。', pinyin: 'Měi ge rén dōu yǒu quánlì.', meaning: 'Everyone has rights.' },
      ],
    },
  ],
  'hsk5-shencai-1053': [
    {
      meaning: 'body build; figure',
      examples: [
        { hanzi: '她身材高，也很健康。', pinyin: 'Tā shēncái gāo, yě hěn jiànkāng.', meaning: 'She is tall and also very healthy.' },
      ],
    },
  ],
  'hsk5-wenzi-1139': [
    {
      meaning: 'text; written passage',
      examples: [
        { hanzi: '这段文字很清楚。', pinyin: 'Zhè duàn wénzì hěn qīngchu.', meaning: 'This passage is very clear.' },
      ],
    },
    {
      meaning: 'writing system; character',
      examples: [
        { hanzi: '这种文字很古老。', pinyin: 'Zhè zhǒng wénzì hěn gǔlǎo.', meaning: 'This writing system is very old.' },
      ],
    },
  ],
  'hsk5-wusuowei-1144': [
    {
      meaning: 'does not matter',
      examples: [
        { hanzi: '这对我无所谓。', pinyin: 'Zhè duì wǒ wúsuǒwèi.', meaning: 'This does not matter to me.' },
      ],
    },
    {
      meaning: 'be indifferent',
      examples: [
        { hanzi: '他对输赢无所谓。', pinyin: 'Tā duì shū yíng wúsuǒwèi.', meaning: 'He is indifferent to winning or losing.' },
      ],
    },
  ],
  'hsk5-xingcheng-1175': [
    {
      meaning: 'form; take shape',
      examples: [
        { hanzi: '这个习惯是慢慢形成的。', pinyin: 'Zhège xíguàn shì mànman xíngchéng de.', meaning: 'This habit formed slowly.' },
      ],
    },
    {
      meaning: 'formation',
      examples: [
        { hanzi: '这里形成了一个新市场。', pinyin: 'Zhèlǐ xíngchéng le yí ge xīn shìchǎng.', meaning: 'A new market formed here.' },
      ],
    },
  ],
  'hsk5-yilu-1198': [
    {
      meaning: 'all; without exception',
      examples: [
        { hanzi: '这里的票一律免费。', pinyin: 'Zhèlǐ de piào yílǜ miǎnfèi.', meaning: 'The tickets here are all free.' },
      ],
    },
    {
      meaning: 'uniformly',
      examples: [
        { hanzi: '学生一律穿校服。', pinyin: 'Xuésheng yílǜ chuān xiàofú.', meaning: 'Students all wear school uniforms.' },
      ],
    },
  ],
  'hsk5-yuding-1221': [
    {
      meaning: 'reserve; book',
      examples: [
        { hanzi: '我已经预订了房间。', pinyin: 'Wǒ yǐjīng yùdìng le fángjiān.', meaning: 'I have already booked a room.' },
      ],
    },
    {
      meaning: 'subscribe',
      examples: [
        { hanzi: '我预订了一份杂志。', pinyin: 'Wǒ yùdìng le yí fèn zázhì.', meaning: 'I subscribed to a magazine.' },
      ],
    },
  ],
  'hsk5-ze-1229': [
    {
      meaning: 'then; in that case',
      examples: [
        { hanzi: '价格太高，则没人买。', pinyin: 'Jiàgé tài gāo, zé méi rén mǎi.', meaning: 'If the price is too high, then no one will buy it.' },
      ],
    },
    {
      meaning: 'measure word for written items',
      examples: [
        { hanzi: '我看到一则新闻。', pinyin: 'Wǒ kàn dào yì zé xīnwén.', meaning: 'I saw a piece of news.' },
      ],
    },
  ],
  'hsk5-zhen-592': [
    {
      meaning: 'short spell; burst; measure word for brief events',
      examples: [
        { hanzi: '外面吹来一阵风。', pinyin: 'Wàimiàn chuī lái yí zhèn fēng.', meaning: 'A gust of wind blew in from outside.' },
      ],
    },
  ],
  'hsk5-zheng-597': [
    {
      meaning: 'just; right at the moment',
      examples: [
        { hanzi: '我正要出门。', pinyin: 'Wǒ zhèng yào chūmén.', meaning: 'I was just about to go out.' },
      ],
    },
    {
      meaning: 'straight; correct',
      examples: [
        { hanzi: '请把照片放正。', pinyin: 'Qǐng bǎ zhàopiàn fàng zhèng.', meaning: 'Please put the photo straight.' },
      ],
    },
  ],
  'hsk5-zhongxin-1262': [
    {
      meaning: 'center',
      examples: [
        { hanzi: '我住在市中心。', pinyin: 'Wǒ zhù zài shì zhōngxīn.', meaning: 'I live in the city center.' },
      ],
    },
    {
      meaning: 'core; central point',
      examples: [
        { hanzi: '这是问题的中心。', pinyin: 'Zhè shì wèntí de zhōngxīn.', meaning: 'This is the core of the problem.' },
      ],
    },
  ],
  'hsk5-zhuzhang-1272': [
    {
      meaning: 'advocate; stand for',
      examples: [
        { hanzi: '我主张马上开始。', pinyin: 'Wǒ zhǔzhāng mǎshàng kāishǐ.', meaning: 'I advocate starting immediately.' },
      ],
    },
    {
      meaning: 'view; proposal',
      examples: [
        { hanzi: '他的主张得到支持。', pinyin: 'Tā de zhǔzhāng dédào zhīchí.', meaning: 'His proposal received support.' },
      ],
    },
  ],
  'hsk5-zhuajin-1275': [
    {
      meaning: 'make full use of time; hurry',
      examples: [
        { hanzi: '我们要抓紧时间完成任务。', pinyin: 'Wǒmen yào zhuājǐn shíjiān wánchéng rènwu.', meaning: 'We need to make full use of the time to finish the task.' },
      ],
    },
    {
      meaning: 'hold tightly',
      examples: [
        { hanzi: '请抓紧扶手。', pinyin: 'Qǐng zhuājǐn fúshǒu.', meaning: 'Please hold the handrail tightly.' },
      ],
    },
  ],
  'hsk5-zhuangtai-1279': [
    {
      meaning: 'condition; status; state',
      examples: [
        { hanzi: '他今天状态很好。', pinyin: 'Tā jīntiān zhuàngtài hěn hǎo.', meaning: 'He is in good condition today.' },
      ],
    },
  ],
  'hsk5-zuowei-1300': [
    {
      meaning: 'as; in the role of',
      examples: [
        { hanzi: '作为老师，他很负责。', pinyin: 'Zuòwéi lǎoshī, tā hěn fùzé.', meaning: 'As a teacher, he is very responsible.' },
      ],
    },
    {
      meaning: 'achievement; conduct',
      examples: [
        { hanzi: '他年轻时很有作为。', pinyin: 'Tā niánqīng shí hěn yǒu zuòwéi.', meaning: 'He accomplished a lot when he was young.' },
      ],
    },
  ],
};

const HSK5_MEANING_OVERRIDES_BY_HANZI: Record<string, string> = {
  爱心: 'compassion; caring; kind-heartedness',
  保存: 'save; preserve',
  保留: 'retain; keep',
  表达: 'express; convey',
  表情: 'facial expression',
  吵: 'noisy; quarrel',
  拆: 'take apart; dismantle',
  冲: 'rush; charge; dash',
  出席: 'attend; be present',
  处理: 'handle; deal with',
  传染: 'infect; be contagious',
  促使: 'cause; prompt; impel',
  打工: 'work a temporary or part-time job',
  单位: 'work unit; organization; unit of measure',
  递: 'hand; pass; deliver',
  逗: 'tease; amuse',
  度过: 'spend; pass through time',
  对比: 'compare; contrast',
  朵: 'measure word for flowers, clouds, and similar things',
  发达: 'developed; advanced',
  发挥: 'bring into play; give full play to',
  繁荣: 'prosperous; flourishing',
  改进: 'improve; make better',
  概括: 'summarize; generalize',
  感想: 'thoughts; reflections',
  各自: 'each; respectively',
  光明: 'bright; promising',
  规律: 'pattern; regularity; law',
  滚: 'roll; get lost',
  结合: 'combine; integrate',
  届: 'session; measure word for events or graduating classes',
  开放: 'open; open up',
  辣椒: 'chili pepper',
  年代: 'era; decade; period of years',
  配合: 'coordinate; cooperate',
  拍: 'pat; clap; take a photo; shoot',
  批: 'batch; measure word for batches; criticize',
  片: 'slice; measure word for flat things or areas',
  飘: 'float; drift',
  凭: 'rely on; on the basis of',
  其余: 'the rest; the remaining',
  绕: 'go around; wind around',
  晒: 'dry in the sun; bask; post online',
  舍不得: 'be reluctant to part with or use',
  手术: 'surgery; operation',
  寿命: 'lifespan; life span',
  随身: 'carry with oneself',
  台阶: 'steps; stairs',
  推辞: 'decline; refuse politely',
  位于: 'be located at; be situated in',
  行动: 'action; take action',
  宣传: 'publicize; promote; propaganda',
  要不: 'otherwise; or else; how about',
  遗憾: 'regret; regrettable',
  乙: 'second; B',
  在于: 'lie in; consist in; depend on',
  阵: 'short spell; burst; gust; measure word for brief events',
  追求: 'pursue; seek',
  爱护: 'take good care of; protect',
  爱惜: 'cherish; use sparingly',
  摆: 'put; arrange; swing',
  背: 'back; carry on the back; recite',
  不得了: 'extremely; terribly; serious',
  朝: 'toward; face; dynasty',
  吃亏: 'suffer losses; be at a disadvantage',
  传说: 'legend; it is said',
  催: 'urge; hurry someone',
  存在: 'exist; existence',
  大方: 'generous; natural and poised',
  地道: 'authentic; genuine',
  对象: 'target; object; romantic partner',
  翻: 'turn over; translate',
  方: 'square; direction; side',
  废话: 'nonsense; useless talk',
  分别: 'separate; respectively',
  幅: 'measure word for pictures, paintings, and cloth',
  辅导: 'tutor; coach; give guidance',
  妇女: 'women',
  盖: 'cover; build; lid',
  感激: 'be grateful; appreciate',
  搞: 'do; make; handle',
  挂号: 'register; register at a hospital',
  官: 'official; officer',
  光临: 'honorific: visit; presence',
  规矩: 'rule; proper behavior',
  华裔: 'person of Chinese descent',
  挥: 'wave; wield',
  恢复: 'recover; restore',
  记录: 'record; take notes',
  计算: 'calculate; calculation',
  假设: 'suppose; assume; hypothesis',
  接触: 'contact; touch',
  进口: 'import; imported',
  尽力: 'do one\'s best',
  经营: 'run; manage; operate a business',
  开发: 'develop; exploit',
  靠: 'lean on; rely on',
  领导: 'lead; leader',
  毛病: 'fault; problem; bad habit',
  面积: 'area',
  念: 'read aloud; study; miss',
  破产: 'go bankrupt; bankruptcy',
  期间: 'during; period',
  圈: 'circle; ring; enclosure',
  热烈: 'warm; enthusiastic',
  上当: 'be fooled; be taken in',
  射击: 'shoot; shooting',
  升: 'rise; liter',
  实现: 'realize; achieve',
  似的: 'like; as if',
  收获: 'harvest; gain',
  甩: 'throw off; fling; dump',
  思考: 'think deeply; reflect',
  随手: 'conveniently; without extra effort',
  烫: 'scalding hot; burn; iron',
  推广: 'promote; popularize',
  退步: 'regress; fall behind',
  完善: 'improve; perfect',
  往返: 'go and return; round trip',
  危害: 'harm; endanger',
  违反: 'violate; go against',
  闻: 'smell; hear',
  文明: 'civilization; civilized',
  武术: 'martial arts',
  鲜艳: 'bright-colored; vivid',
  消化: 'digest; digestion',
  欣赏: 'appreciate; enjoy',
  性质: 'nature; property; character',
  幸亏: 'fortunately; luckily',
  学术: 'academic',
  询问: 'inquire; ask',
  训练: 'train; training',
  业余: 'spare-time; amateur',
  一致: 'unanimous; consistent',
  意外: 'accident; unexpected',
  议论: 'discuss; comment on',
  应用: 'apply; application',
  预报: 'forecast; predict',
  运用: 'use; apply',
  赞成: 'agree with; approve of',
  糟糕: 'terrible; awful',
  责备: 'blame; reproach',
  展开: 'unfold; launch; develop',
  证件: 'certificate; ID document',
  指导: 'guide; give guidance',
  制定: 'formulate; draw up',
  主任: 'director; head of an office or department',
  专心: 'concentrate; be focused',
  转告: 'pass on a message; relay',
  装: 'pretend; install; pack; dress up',
  资格: 'qualification; eligibility',
  资料: 'materials; data',
  字幕: 'subtitles',
  组成: 'form; make up; compose',
  组织: 'organize; organization',
};

function getSenseMeaningText(senses: WordSense[] | undefined) {
  const meaning = senses
    ?.map((sense) => sense.meaning.trim())
    .filter(Boolean)
    .join('; ');

  return meaning || undefined;
}

function splitMeaningIntoSenses(meaning: string): WordSense[] | undefined {
  const senses = meaning
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({ meaning: part }));

  return senses.length > 1 ? senses : undefined;
}

export function getHsk5Senses(word: HskWord): WordSense[] | undefined {
  return HSK5_CURATED_SENSES[word.id] ?? splitMeaningIntoSenses(word.meaning);
}

export function getHsk5Meaning(word: HskWord, senses = getHsk5Senses(word)) {
  return HSK5_MEANING_OVERRIDES_BY_HANZI[word.hanzi] ?? getSenseMeaningText(senses) ?? word.meaning;
}
