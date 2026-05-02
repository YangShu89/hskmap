import { CLUSTERS, HSK1_WORDS } from './hsk1';
import { HSK5_RAW, HSK6_RAW } from './hsk56';
import type { ClusterId, HskLevel, HskWord } from '../types';

type RawWord = {
  hanzi: string;
  pinyin: string;
  meaning: string;
};

export const HSK_LEVEL_OPTIONS: { id: HskLevel; label: string; description: string }[] = [
  { id: 1, label: 'HSK 1', description: '150 words' },
  { id: 2, label: 'HSK 2', description: '150 new words' },
  { id: 3, label: 'HSK 3', description: '300 new words' },
  { id: 4, label: 'HSK 4', description: '600 new words' },
  { id: 5, label: 'HSK 5', description: '1,300 new words' },
  { id: 6, label: 'HSK 6', description: '2,500 new words' },
];

const HSK2_RAW = `
吧|ba|suggestion particle; OK?
白|bái|white
百|bǎi|hundred
帮助|bāng zhù|help
报纸|bào zhǐ|newspaper
比|bǐ|than; compare
别|bié|do not; other
宾馆|bīn guǎn|hotel; guesthouse
长|cháng|long
唱歌|chàng gē|sing
出|chū|go out; exit
穿|chuān|wear; put on
次|cì|time; occurrence
从|cóng|from
错|cuò|wrong; mistake
打篮球|dǎ lán qiú|play basketball
大家|dà jiā|everyone
到|dào|arrive; to
得|de|degree complement particle
等|děng|wait
弟弟|dì di|younger brother
第一|dì yī|first
懂|dǒng|understand
对|duì|toward; for
对|duì|correct; right
房间|fáng jiān|room
非常|fēi cháng|very; extremely
服务员|fú wù yuán|waiter; attendant
高|gāo|high; tall
告诉|gào su|tell
哥哥|gē ge|older brother
给|gěi|give; for
公共汽车|gōng gòng qì chē|bus
公司|gōng sī|company
贵|guì|expensive
过|guo|experienced-action particle
孩子|hái zi|child
还|hái|still; also
好吃|hǎo chī|delicious
黑|hēi|black
红|hóng|red
火车站|huǒ chē zhàn|train station
机场|jī chǎng|airport
鸡蛋|jī dàn|egg
件|jiàn|measure word for clothes/items
教室|jiào shì|classroom
姐姐|jiě jie|older sister
介绍|jiè shào|introduce
近|jìn|near
进|jìn|enter
就|jiù|then; just
觉得|jué de|feel; think
咖啡|kā fēi|coffee
开始|kāi shǐ|start; begin
考试|kǎo shì|exam
可能|kě néng|possible; maybe
可以|kě yǐ|can; may
课|kè|lesson; class
快|kuài|fast; soon
快乐|kuài lè|happy
累|lèi|tired
离|lí|away from
两|liǎng|two
零|líng|zero
路|lù|road
旅游|lǚ yóu|travel
卖|mài|sell
慢|màn|slow
忙|máng|busy
每|měi|every
妹妹|mèi mei|younger sister
门|mén|door
面条|miàn tiáo|noodles
男|nán|male
您|nín|you (polite)
牛奶|niú nǎi|milk
女|nǚ|female
旁边|páng biān|beside; side
跑步|pǎo bù|run
便宜|pián yi|cheap
票|piào|ticket
妻子|qī zi|wife
起床|qǐ chuáng|get up
千|qiān|thousand
铅笔|qiān bǐ|pencil
晴|qíng|clear; sunny
去年|qù nián|last year
让|ràng|let; allow
日|rì|day; date
上班|shàng bān|go to work
身体|shēn tǐ|body; health
生病|shēng bìng|get sick
生日|shēng rì|birthday
时间|shí jiān|time
事情|shì qing|matter; thing
手表|shǒu biǎo|watch
手机|shǒu jī|mobile phone
说话|shuō huà|speak; talk
送|sòng|give; deliver
虽然…但是…|suī rán …dàn shì …|although…but
它|tā|it
踢足球|tī zú qiú|play soccer
题|tí|question; topic
跳舞|tiào wǔ|dance
外|wài|outside
完|wán|finish
玩|wán|play
晚上|wǎn shang|evening
往|wǎng|toward
为什么|wèi shén me|why
问|wèn|ask
问题|wèn tí|question; problem
希望|xī wàng|hope
西瓜|xī guā|watermelon
洗|xǐ|wash
小时|xiǎo shí|hour
笑|xiào|laugh; smile
新|xīn|new
姓|xìng|surname
休息|xiū xi|rest
雪|xuě|snow
颜色|yán sè|color
眼睛|yǎn jing|eyes
羊肉|yáng ròu|mutton
药|yào|medicine
要|yào|want; need; will
也|yě|also
一下|yī xià|a bit; once
已经|yǐ jīng|already
一起|yī qǐ|together
意思|yì si|meaning
因为…所以…|yīn wèi …suǒ yǐ …|because…so
阴|yīn|cloudy; overcast
游泳|yóu yǒng|swim
右边|yòu bian|right side
鱼|yú|fish
远|yuǎn|far
运动|yùn dòng|exercise; sport
再|zài|again
早上|zǎo shang|morning
丈夫|zhàng fu|husband
找|zhǎo|look for
着|zhe|continuous aspect particle
真|zhēn|really; true
正在|zhèng zài|in the middle of doing
知道|zhī dào|know
准备|zhǔn bèi|prepare
走|zǒu|walk; leave
最|zuì|most
左边|zuǒ bian|left side
`;

const HSK3_RAW = `
啊|a|modal particle; ah
阿姨|ā yí|aunt; nanny
矮|ǎi|short
爱好|ài hào|hobby
安静|ān jìng|quiet
把|bǎ|ba particle; handle
搬|bān|move; carry
班|bān|class; work shift
办法|bàn fǎ|method; way
办公室|bàn gōng shì|office
半|bàn|half
帮忙|bāng máng|help; do a favor
包|bāo|bag; wrap
饱|bǎo|full
北方|běi fāng|north
被|bèi|by; passive marker
鼻子|bí zi|nose
比较|bǐ jiào|compare; relatively
比赛|bǐ sài|competition; match
笔记本|bǐ jì běn|notebook
必须|bì xū|must; have to
变化|biàn huà|change
别人|bié rén|other people
冰箱|bīng xiāng|refrigerator
不但…而且…|bù dàn …ér qiě …|not only…but also
菜单|cài dān|menu
参加|cān jiā|participate
草|cǎo|grass
层|céng|layer; floor
差|chà|poor; differ
超市|chāo shì|supermarket
衬衫|chèn shān|shirt
城市|chéng shì|city
成绩|chéng jì|grade; achievement
迟到|chí dào|arrive late
除了|chú le|besides; except
船|chuán|boat
春|chūn|spring
词典|cí diǎn|dictionary
聪明|cōng ming|clever
打扫|dǎ sǎo|clean; sweep
打算|dǎ suàn|plan; intend
带|dài|bring; carry; belt
担心|dān xīn|worry
蛋糕|dàn gāo|cake
当然|dāng rán|of course
地|de|adverbial particle
灯|dēng|lamp; light
地方|dì fang|place; area
地铁|dì tiě|subway
地图|dì tú|map
电梯|diàn tī|elevator
电子邮件|diàn zǐ yóu jiàn|email
东|dōng|east
冬|dōng|winter
动物|dòng wù|animal
短|duǎn|short
段|duàn|section; paragraph
锻炼|duàn liàn|exercise; train
多么|duō me|how; what
饿|è|hungry
耳朵|ěr duo|ear
发|fā|send; issue
发烧|fā shāo|have a fever
发现|fā xiàn|discover
方便|fāng biàn|convenient
放|fàng|put; release
放心|fàng xīn|feel relieved
分|fēn|divide; point; cent
复习|fù xí|review
附近|fù jìn|nearby
干净|gān jìng|clean
感冒|gǎn mào|catch a cold
感兴趣|gǎn xìng qù|be interested
刚才|gāng cái|just now
个子|gè zi|height
根据|gēn jù|according to; basis
跟|gēn|with; follow
更|gèng|more; even more
公斤|gōng jīn|kilogram
公园|gōng yuán|park
故事|gù shi|story
刮风|guā fēng|be windy
关|guān|close; turn off
关系|guān xì|relationship
关心|guān xīn|care about
关于|guān yú|about; concerning
国家|guó jiā|country
过|guò|pass; cross
过去|guò qu|past; go over
还是|hái shì|or; still
害怕|hài pà|be afraid
黑板|hēi bǎn|blackboard
后来|hòu lái|later; afterwards
护照|hù zhào|passport
花|huā|spend; blossom
花|huā|flower
画|huà|draw; painting
坏|huài|bad; broken
欢迎|huān yíng|welcome
环境|huán jìng|environment
还|huán|return; give back
换|huàn|change; exchange
黄河|huáng hé|Yellow River
回答|huí dá|answer; reply
会议|huì yì|meeting
或者|huò zhě|or; perhaps
几乎|jī hū|almost
机会|jī huì|opportunity
极|jí|extremely
季节|jì jié|season
记得|jì de|remember
检查|jiǎn chá|inspect; check
简单|jiǎn dān|simple
健康|jiàn kāng|health; healthy
见面|jiàn miàn|meet
讲|jiǎng|speak; explain
教|jiào|teach
脚|jiǎo|foot
角|jiǎo|corner; angle
接|jiē|receive; connect; meet
街道|jiē dào|street
结婚|jié hūn|get married
结束|jié shù|finish; end
节目|jié mù|program
节日|jié rì|festival; holiday
解决|jiě jué|solve
借|jiè|borrow; lend
经常|jīng cháng|often
经过|jīng guò|pass; through
经理|jīng lǐ|manager
久|jiǔ|long time
旧|jiù|old
句子|jù zi|sentence
决定|jué dìng|decide; decision
可爱|kě ài|cute; lovely
渴|kě|thirsty
刻|kè|quarter; carve
客人|kè rén|guest
空调|kōng tiáo|air conditioner
口|kǒu|mouth; measure word
哭|kū|cry
裤子|kù zi|pants
筷子|kuài zi|chopsticks
蓝|lán|blue
老|lǎo|old
离开|lí kāi|leave
礼物|lǐ wù|gift
历史|lì shǐ|history
脸|liǎn|face
练习|liàn xí|practice
辆|liàng|measure word for vehicles
聊天|liáo tiān|chat
了解|liǎo jiě|understand
邻居|lín jū|neighbor
留学|liú xué|study abroad
楼|lóu|building; floor
绿|lǜ|green
马|mǎ|horse
马上|mǎ shàng|right away
满意|mǎn yì|satisfied
帽子|mào zi|hat
米|mǐ|rice; meter
面包|miàn bāo|bread
明白|míng bai|understand
拿|ná|take; hold
奶奶|nǎi nai|grandmother
南|nán|south
难|nán|difficult
难过|nán guò|sad
年级|nián jí|grade level
年轻|nián qīng|young
鸟|niǎo|bird
努力|nǔ lì|work hard
爬山|pá shān|climb a mountain
盘子|pán zi|plate
胖|pàng|fat
啤酒|pí jiǔ|beer
皮鞋|pí xié|leather shoes
瓶子|píng zi|bottle
其实|qí shí|actually
其他|qí tā|other
奇怪|qí guài|strange
骑|qí|ride
起飞|qǐ fēi|take off
起来|qǐ lái|get up; begin
清楚|qīng chu|clear
请假|qǐng jià|ask for leave
秋|qiū|autumn
裙子|qún zi|skirt
然后|rán hòu|then
热情|rè qíng|enthusiastic
认为|rèn wéi|think; believe
认真|rèn zhēn|serious; earnest
容易|róng yì|easy
如果|rú guǒ|if
伞|sǎn|umbrella
上网|shàng wǎng|go online
声音|shēng yīn|sound; voice
生气|shēng qì|angry
世界|shì jiè|world
试|shì|try; test
瘦|shòu|thin
叔叔|shū shu|uncle
舒服|shū fu|comfortable
数学|shù xué|math
树|shù|tree
刷牙|shuā yá|brush teeth
双|shuāng|pair
水平|shuǐ píng|level; standard
司机|sī jī|driver
太阳|tài yáng|sun
特别|tè bié|special; especially
疼|téng|hurt; ache
提高|tí gāo|improve; raise
体育|tǐ yù|sports
甜|tián|sweet
条|tiáo|measure word for long things
同事|tóng shì|colleague
同意|tóng yì|agree
头发|tóu fa|hair
突然|tū rán|suddenly
图书馆|tú shū guǎn|library
腿|tuǐ|leg
完成|wán chéng|complete
碗|wǎn|bowl
万|wàn|ten thousand
忘记|wàng jì|forget
为|wèi|for; because of
为了|wèi le|in order to
位|wèi|honorific measure word
文化|wén huà|culture
西|xī|west
习惯|xí guàn|habit; be used to
洗手间|xǐ shǒu jiān|restroom
洗澡|xǐ zǎo|take a shower
夏|xià|summer
先|xiān|first; before
相信|xiāng xìn|believe
香蕉|xiāng jiāo|banana
像|xiàng|look like
向|xiàng|toward
小心|xiǎo xīn|be careful
校长|xiào zhǎng|principal
新闻|xīn wén|news
新鲜|xīn xiān|fresh
信用卡|xìn yòng kǎ|credit card
行李箱|xíng lǐ xiāng|suitcase
熊猫|xióng māo|panda
需要|xū yào|need
选择|xuǎn zé|choose
要求|yāo qiú|request; require
爷爷|yé ye|grandfather
一直|yī zhí|always; continuously
一定|yí dìng|certainly; must
一共|yī gòng|altogether
一会儿|yī huì er|a while
一样|yī yàng|same
以前|yǐ qián|before
一般|yī bān|ordinary; generally
一边|yī biān|one side; while
音乐|yīn yuè|music
银行|yín háng|bank
饮料|yǐn liào|drink
应该|yīng gāi|should
影响|yǐng xiǎng|influence
用|yòng|use
游戏|yóu xì|game
有名|yǒu míng|famous
又|yòu|again; also
遇到|yù dào|meet; encounter
元|yuán|yuan
愿意|yuàn yì|be willing
月亮|yuè liang|moon
越|yuè|the more; exceed
站|zhàn|stand; station
张|zhāng|measure word for flat things
长|zhǎng|grow; elder
着急|zháo jí|anxious
照顾|zhào gu|take care of
照片|zhào piàn|photo
照相机|zhào xiàng jī|camera
只|zhǐ|only
只|zhǐ|measure word for animals/one of a pair
只有…才…|zhǐ yǒu …cái …|only if…then
中间|zhōng jiān|middle
中文|zhōng wén|Chinese language
终于|zhōng yú|finally
种|zhǒng|kind; type
重要|zhòng yào|important
周末|zhōu mò|weekend
主要|zhǔ yào|main
注意|zhù yì|pay attention
自己|zì jǐ|self
自行车|zì xíng chē|bicycle
总是|zǒng shì|always
嘴|zuǐ|mouth
最后|zuì hòu|last; finally
最近|zuì jìn|recently
作业|zuò yè|homework
`;

const HSK4_RAW = `
爱情|ài qíng|love
安排|ān pái|arrange; plan
安全|ān quán|safe; security
按时|àn shí|on time
按照|àn zhào|according to
百分之|bǎi fēn zhī|percent
棒|bàng|excellent; stick
包子|bāo zi|steamed stuffed bun
保护|bǎo hù|protect
保证|bǎo zhèng|ensure; guarantee
抱|bào|hold
抱歉|bào qiàn|feel sorry; apologize
报名|bào míng|sign up
倍|bèi|times; fold
本来|běn lái|originally
笨|bèn|stupid
比如|bǐ rú|for example; such as
毕业|bì yè|graduate; graduation
遍|biàn|time; occurrence
标准|biāo zhǔn|standard
表格|biǎo gé|form; table
表示|biǎo shì|express; indicate
表演|biǎo yǎn|perform; performance
表扬|biǎo yáng|praise
饼干|bǐng gān|biscuit; cookie
并且|bìng qiě|also; and
博士|bó shì|doctorate; doctoral degree
不过|bú guò|however
不得不|bù dé bù|have to
不管|bù guǎn|no matter; regardless of
不仅|bù jǐn|not only
部分|bù fen|part; section
擦|cā|wipe; rub
猜|cāi|guess
材料|cái liào|material
参观|cān guān|visit
餐厅|cān tīng|restaurant; dining hall
差不多|chà bu duō|almost
尝|cháng|taste; try
长城|Cháng chéng|Great Wall
长江|Cháng jiāng|Yangtze River
场|chǎng|site; measure word for events
超过|chāo guò|exceed; surpass
厕所|cè suǒ|toilet; restroom
成功|chéng gōng|success; successful
成为|chéng wéi|become
诚实|chéng shí|honest
乘坐|chéng zuò|ride; take transport
吃惊|chī jīng|be surprised
重新|chóng xīn|again; anew
抽烟|chōu yān|smoke
出差|chū chāi|go on a business trip
出发|chū fā|set out; depart
出生|chū shēng|be born
出现|chū xiàn|appear
厨房|chú fáng|kitchen
传真|chuán zhēn|fax
窗户|chuāng hu|window
词语|cí yǔ|word; expression
从来|cóng lái|always; ever
粗心|cū xīn|careless
存|cún|store; deposit
错误|cuò wù|error; mistake
答案|dá àn|answer
打招呼|dǎ zhāo hu|greet; say hello
打扮|dǎ ban|dress up
打扰|dǎ rǎo|disturb
打印|dǎ yìn|print
打折|dǎ zhé|give a discount
打针|dǎ zhēn|get an injection
大概|dà gài|probably; roughly
大使馆|dà shǐ guǎn|embassy
大约|dà yuē|approximately
戴|dài|wear; put on
大夫|dài fu|doctor
当|dāng|when; act as
当时|dāng shí|at that time
刀|dāo|knife
导游|dǎo yóu|tour guide
倒|dào|inverted; pour
到处|dào chù|everywhere
到底|dào dǐ|in the end; exactly
道歉|dào qiàn|apologize
得意|dé yì|proud; pleased with oneself
得|děi|have to; must
地点|dì diǎn|location
登机牌|dēng jī pái|boarding pass
等|děng|wait; and so on
低|dī|low
底|dǐ|bottom
地球|dì qiú|earth
地址|dì zhǐ|address
掉|diào|fall; drop
调查|diào chá|investigate; survey
丢|diū|lose
动作|dòng zuò|action; movement
堵车|dǔ chē|traffic jam
肚子|dù zi|belly; stomach
短信|duǎn xìn|text message
对于|duì yú|regarding; toward
对话|duì huà|dialogue
对面|duì miàn|opposite side
而|ér|and; yet
儿童|ér tóng|children
发生|fā shēng|happen; occur
发展|fā zhǎn|develop; development
法律|fǎ lǜ|law
翻译|fān yì|translate; translation
烦恼|fán nǎo|annoyance; worry
反对|fǎn duì|oppose
方法|fāng fǎ|method; way
方面|fāng miàn|aspect
方向|fāng xiàng|direction
房东|fáng dōng|landlord
放弃|fàng qì|give up
放暑假|fàng shǔ jià|have summer vacation
放松|fàng sōng|relax
份|fèn|portion; measure word
丰富|fēng fù|rich; abundant
否则|fǒu zé|otherwise
符合|fú hé|accord with; conform to
富|fù|rich
付款|fù kuǎn|pay
父亲|fù qīn|father
复印|fù yìn|photocopy
复杂|fù zá|complex
负责|fù zé|be responsible for
改变|gǎi biàn|change
干杯|gān bēi|cheers
赶|gǎn|catch up with; rush
敢|gǎn|dare
感动|gǎn dòng|be moved
感觉|gǎn jué|feel; feeling
感情|gǎn qíng|feeling; emotion
感谢|gǎn xiè|thank
干|gān|dry
刚|gāng|just
高速公路|gāo sù gōng lù|expressway; highway
胳膊|gē bo|arm
各|gè|each; various
公里|gōng lǐ|kilometer
工资|gōng zī|salary; wages
功夫|gōng fu|kung fu; skill
共同|gòng tóng|common; together
够|gòu|enough
购物|gòu wù|shopping
估计|gū jì|estimate
鼓励|gǔ lì|encourage
顾客|gù kè|customer
故意|gù yì|deliberately
挂|guà|hang
关键|guān jiàn|key; crucial
观众|guān zhòng|audience
管理|guǎn lǐ|manage; management
光|guāng|light
广播|guǎng bō|broadcast
广告|guǎng gào|advertisement
逛|guàng|stroll
规定|guī dìng|rule; regulation
国际|guó jì|international
国籍|guó jí|nationality
果汁|guǒ zhī|fruit juice
过程|guò chéng|process
海洋|hǎi yáng|ocean
害羞|hài xiū|shy
寒假|hán jià|winter vacation
汗|hàn|sweat
航班|háng bān|flight
好处|hǎo chu|benefit; advantage
好像|hǎo xiàng|seem; be like
号码|hào mǎ|number
合格|hé gé|qualified
合适|hé shì|suitable; appropriate
盒子|hé zi|box
厚|hòu|thick
后悔|hòu huǐ|regret
护士|hù shi|nurse
互联网|hù lián wǎng|internet
互相|hù xiāng|each other
怀疑|huái yí|doubt; suspect
回忆|huí yì|memory; recall
活动|huó dòng|activity
活泼|huó pō|lively
火|huǒ|fire; popular
获得|huò dé|obtain; get
基础|jī chǔ|foundation; basics
激动|jī dòng|excited
积极|jī jí|positive; active
积累|jī lěi|accumulate
及时|jí shí|timely
即使|jí shǐ|even if
寄|jì|send; mail
记者|jì zhě|reporter
计划|jì huà|plan
既然|jì rán|since; given that
技术|jì shù|technology; skill
继续|jì xù|continue
家具|jiā jù|furniture
加班|jiā bān|work overtime
加油站|jiā yóu zhàn|gas station
假|jiǎ|false; fake
价格|jià gé|price
坚持|jiān chí|persist; insist
减肥|jiǎn féi|lose weight
减少|jiǎn shǎo|reduce; decrease
建议|jiàn yì|suggest; suggestion
将来|jiāng lái|future
奖金|jiǎng jīn|bonus
降低|jiàng dī|reduce; lower
降落|jiàng luò|land; descend
交|jiāo|hand over; intersect
交流|jiāo liú|communicate; exchange
交通|jiāo tōng|traffic; transportation
郊区|jiāo qū|suburb
骄傲|jiāo ào|proud
饺子|jiǎo zi|dumpling
教授|jiào shòu|professor
教育|jiào yù|education
接受|jiē shòu|accept
接着|jiē zhe|then; next
结果|jié guǒ|result
节|jié|section; festival
节约|jié yuē|save; economize
解释|jiě shì|explain
尽管|jǐn guǎn|although; despite
紧张|jǐn zhāng|nervous; tense
进行|jìn xíng|carry out; proceed
禁止|jìn zhǐ|prohibit
精彩|jīng cǎi|wonderful
经济|jīng jì|economy
经历|jīng lì|experience
经验|jīng yàn|experience
京剧|jīng jù|Beijing opera
警察|jǐng chá|police officer
景色|jǐng sè|scenery
竟然|jìng rán|unexpectedly
竞争|jìng zhēng|compete; competition
镜子|jìng zi|mirror
究竟|jiū jìng|exactly; after all
举|jǔ|lift; raise
举办|jǔ bàn|hold; host
举行|jǔ xíng|hold; take place
拒绝|jù jué|refuse
距离|jù lí|distance
聚会|jù huì|party; gathering
开玩笑|kāi wán xiào|joke; make fun of
开心|kāi xīn|happy
看法|kàn fǎ|view; opinion
考虑|kǎo lǜ|consider
烤鸭|kǎo yā|roast duck
棵|kē|measure word for trees
科学|kē xué|science
咳嗽|ké sou|cough
可怜|kě lián|pitiful; poor
可是|kě shì|however
可惜|kě xī|unfortunately; pity
客厅|kè tīng|living room
肯定|kěn dìng|sure; certain
空|kōng|empty
空气|kōng qì|air
恐怕|kǒng pà|fear; be afraid that
苦|kǔ|bitter; hardship
矿泉水|kuàng quán shuǐ|mineral water
困|kùn|sleepy
困难|kùn nan|difficulty; difficult
拉|lā|pull
垃圾桶|lā jī tǒng|trash can
辣|là|spicy
来自|lái zì|come from
来不及|lái bu jí|too late; not enough time
来得及|lái de jí|in time
懒|lǎn|lazy
浪费|làng fèi|waste
浪漫|làng màn|romantic
老虎|lǎo hǔ|tiger
冷静|lěng jìng|calm
理发|lǐ fà|get a haircut
理解|lǐ jiě|understand
理想|lǐ xiǎng|ideal
礼貌|lǐ mào|politeness; manners
礼拜天|lǐ bài tiān|Sunday
厉害|lì hai|impressive; fierce
力气|lì qi|strength
例如|lì rú|for example
俩|liǎ|two people; both
连|lián|even; link
联系|lián xì|contact
凉快|liáng kuai|cool; pleasantly cool
零钱|líng qián|small change
另外|lìng wài|in addition
留|liú|stay; leave behind
流利|liú lì|fluent
流行|liú xíng|popular; fashionable
乱|luàn|messy; chaotic
旅行|lǚ xíng|travel
律师|lǜ shī|lawyer
麻烦|má fan|trouble; troublesome
马虎|mǎ hu|careless
满|mǎn|full
毛|máo|hair; dime
毛巾|máo jīn|towel
美丽|měi lì|beautiful
梦|mèng|dream
迷路|mí lù|get lost
密码|mì mǎ|password
免费|miǎn fèi|free of charge
秒|miǎo|second
民族|mín zú|nation; ethnic group
母亲|mǔ qīn|mother
目的|mù dì|purpose
耐心|nài xīn|patience
难道|nán dào|could it be that
难受|nán shòu|feel unwell; uncomfortable
内|nèi|inside; within
内容|nèi róng|content
能力|néng lì|ability
年龄|nián líng|age
弄|nòng|make; do; get
暖和|nuǎn huo|warm
偶尔|ǒu ěr|occasionally
排队|pái duì|queue; line up
排列|pái liè|arrange; array
判断|pàn duàn|judge; judgment
陪|péi|accompany
批评|pī píng|criticize; criticism
皮肤|pí fū|skin
脾气|pí qi|temper
篇|piān|measure word for writing
骗|piàn|cheat; deceive
乒乓球|pīng pāng qiú|table tennis
平时|píng shí|ordinary times
破|pò|broken
葡萄|pú tao|grape
普遍|pǔ biàn|common; universal
普通话|pǔ tōng huà|Mandarin
其次|qí cì|secondly; next
其中|qí zhōng|among
气候|qì hòu|climate
千万|qiān wàn|must; ten million
签证|qiān zhèng|visa
敲|qiāo|knock
桥|qiáo|bridge
巧克力|qiǎo kè lì|chocolate
亲戚|qīn qi|relative
轻|qīng|light
轻松|qīng sōng|relaxed
情况|qíng kuàng|situation
穷|qióng|poor
区别|qū bié|difference
取|qǔ|take; get
全部|quán bù|all; whole
缺点|quē diǎn|shortcoming
缺少|quē shǎo|lack
却|què|but; however
确实|què shí|indeed; exactly
然而|rán ér|however
热闹|rè nao|lively
任何|rèn hé|any; whatever
任务|rèn wu|task
扔|rēng|throw
仍然|réng rán|still
日记|rì jì|diary
入口|rù kǒu|entrance
散步|sàn bù|take a walk
森林|sēn lín|forest
沙发|shā fā|sofa
商量|shāng liang|discuss
伤心|shāng xīn|sad
稍微|shāo wēi|slightly
勺子|sháo zi|spoon
社会|shè huì|society
深|shēn|deep
申请|shēn qǐng|apply
甚至|shèn zhì|even
生活|shēng huó|life; live
生命|shēng mìng|life
生意|shēng yi|business
省|shěng|province; save
剩|shèng|remain; be left
失败|shī bài|fail
失望|shī wàng|disappointed
师傅|shī fu|master worker; skilled worker
十分|shí fēn|very; extremely
实际|shí jì|actual; practical
实在|shí zài|really
使|shǐ|make; cause
使用|shǐ yòng|use
是否|shì fǒu|whether
适合|shì hé|fit; suit
适应|shì yìng|adapt
世纪|shì jì|century
收|shōu|collect; receive
收入|shōu rù|income
收拾|shōu shi|tidy; clean up
首都|shǒu dū|capital city
首先|shǒu xiān|first
受不了|shòu bu liǎo|cannot bear
受到|shòu dào|receive; suffer
售货员|shòu huò yuán|salesperson
输|shū|lose; fail
熟悉|shú xī|be familiar with
数量|shù liàng|quantity; amount
数字|shù zì|number; digit
帅|shuài|handsome
顺便|shùn biàn|incidentally; conveniently
顺利|shùn lì|smoothly; successful
顺序|shùn xù|order; sequence
说明|shuō míng|explain; explanation
硕士|shuò shì|master's degree
死|sǐ|die
速度|sù dù|speed
塑料袋|sù liào dài|plastic bag
酸|suān|sour; acid
随便|suí biàn|casual; as one likes
随着|suí zhe|along with
孙子|sūn zi|grandson
所有|suǒ yǒu|all; possess
台|tái|platform; measure word for machines
抬|tái|lift; raise
态度|tài du|attitude
谈|tán|talk; discuss
弹钢琴|tán gāng qín|play the piano
汤|tāng|soup
糖|táng|sugar; candy
躺|tǎng|lie down
趟|tàng|trip; measure word for trips
讨论|tǎo lùn|discuss
讨厌|tǎo yàn|dislike; hate
特点|tè diǎn|characteristic
提|tí|carry; mention
提供|tí gōng|provide
提前|tí qián|in advance
提醒|tí xǐng|remind
填空|tián kòng|fill in the blanks
条件|tiáo jiàn|condition
停|tíng|stop
挺|tǐng|quite; rather
通过|tōng guò|pass through; by means of
通知|tōng zhī|notice; inform
同时|tóng shí|at the same time
同情|tóng qíng|sympathy
推|tuī|push
推迟|tuī chí|delay; postpone
脱|tuō|take off
袜子|wà zi|socks
完全|wán quán|completely
往往|wǎng wǎng|often
网球|wǎng qiú|tennis
网站|wǎng zhàn|website
危险|wēi xiǎn|dangerous; danger
味道|wèi dao|taste; flavor
卫生间|wèi shēng jiān|bathroom; toilet
温度|wēn dù|temperature
文章|wén zhāng|article
污染|wū rǎn|pollution; contaminate
无|wú|nothing; without
无聊|wú liáo|boring
无论|wú lùn|no matter what
误会|wù huì|misunderstanding
西红柿|xī hóng shì|tomato
吸引|xī yǐn|attract
咸|xián|salty
现金|xiàn jīn|cash
羡慕|xiàn mù|envy; admire
香|xiāng|fragrant
相反|xiāng fǎn|opposite; contrary
相同|xiāng tóng|same; identical
详细|xiáng xì|detailed
响|xiǎng|make a sound; ring
橡皮|xiàng pí|eraser
消息|xiāo xi|news; message
小吃|xiǎo chī|snack
小伙子|xiǎo huǒ zi|young fellow
小说|xiǎo shuō|novel
笑话|xiào hua|joke
效果|xiào guǒ|effect
辛苦|xīn kǔ|hard; exhausting
心情|xīn qíng|mood
信封|xìn fēng|envelope
信息|xìn xī|information
信心|xìn xīn|confidence
兴奋|xīng fèn|excited; excitement
行|xíng|okay; be all right
醒|xǐng|wake up
性别|xìng bié|gender
性格|xìng gé|character; personality
幸福|xìng fú|happiness
修理|xiū lǐ|repair
许多|xǔ duō|many
学期|xué qī|semester
压力|yā lì|pressure
牙膏|yá gāo|toothpaste
亚洲|Yà zhōu|Asia
呀|ya|ah; modal particle
盐|yán|salt
严格|yán gé|strict
严重|yán zhòng|serious
研究|yán jiū|research; study
演出|yǎn chū|performance; show
演员|yǎn yuán|actor; performer
眼镜|yǎn jìng|glasses
阳光|yáng guāng|sunshine
养成|yǎng chéng|develop; cultivate
样子|yàng zi|appearance; look
邀请|yāo qǐng|invite; invitation
要是|yào shi|if
钥匙|yào shi|key
也许|yě xǔ|perhaps
页|yè|page
叶子|yè zi|leaf
一切|yí qiè|everything
以|yǐ|with; by means of
以为|yǐ wéi|think mistakenly
意见|yì jiàn|opinion; suggestion
艺术|yì shù|art
因此|yīn cǐ|therefore
引起|yǐn qǐ|cause; lead to
印象|yìn xiàng|impression
应聘|yìng pìn|apply for a job
赢|yíng|win
勇敢|yǒng gǎn|brave
永远|yǒng yuǎn|forever
优点|yōu diǎn|advantage
优秀|yōu xiù|excellent
幽默|yōu mò|humor; humorous
由|yóu|from; by
由于|yóu yú|because of
邮局|yóu jú|post office
尤其|yóu qí|especially
有趣|yǒu qù|interesting
友好|yǒu hǎo|friendly
友谊|yǒu yì|friendship
愉快|yú kuài|cheerful; pleasant
于是|yú shì|therefore; as a result
与|yǔ|and; with
语法|yǔ fǎ|grammar
语言|yǔ yán|language
羽毛球|yǔ máo qiú|badminton
预习|yù xí|preview; prepare lessons
原来|yuán lái|originally; so it turns out
原谅|yuán liàng|forgive
原因|yuán yīn|reason
约会|yuē huì|date; appointment
阅读|yuè dú|read
云|yún|cloud
允许|yǔn xǔ|allow
杂志|zá zhì|magazine
咱们|zán men|we; us
暂时|zàn shí|temporary; for now
脏|zāng|dirty
责任|zé rèn|responsibility
增加|zēng jiā|increase
占线|zhàn xiàn|line busy
招聘|zhāo pìn|recruit; hire
照|zhào|shine; according to
真正|zhēn zhèng|real; true
整理|zhěng lǐ|organize; tidy
正常|zhèng cháng|normal
正好|zhèng hǎo|just right
正确|zhèng què|correct
正式|zhèng shì|formal; official
证明|zhèng míng|prove; certificate
之|zhī|of
支持|zhī chí|support
知识|zhī shi|knowledge
值得|zhí de|be worth
直接|zhí jiē|direct
植物|zhí wù|plant
职业|zhí yè|occupation; profession
指|zhǐ|point; finger
只好|zhǐ hǎo|have no choice but
只要|zhǐ yào|as long as
质量|zhì liàng|quality
至少|zhì shǎo|at least
重|zhòng|heavy; important
重点|zhòng diǎn|key point
重视|zhòng shì|attach importance to
周围|zhōu wéi|around; surrounding
主意|zhǔ yi|idea
祝贺|zhù hè|congratulate
著名|zhù míng|famous
专门|zhuān mén|specialized
专业|zhuān yè|major; profession
转|zhuàn|turn; rotate
赚|zhuàn|earn
准确|zhǔn què|accurate
准时|zhǔn shí|on time
仔细|zǐ xì|careful
自然|zì rán|natural; nature
自信|zì xìn|self-confidence
总结|zǒng jié|summarize; summary
租|zū|rent
最好|zuì hǎo|best; had better
尊重|zūn zhòng|respect
左右|zuǒ yòu|about; around
座|zuò|seat; measure word
作家|zuò jiā|writer
座位|zuò wèi|seat
作用|zuò yòng|effect; function
作者|zuò zhě|author
`;

const KNOWN_CLUSTER_OVERRIDES: Record<string, ClusterId> = {
  爸爸: 'people',
  妈妈: 'people',
  学校: 'places',
};

const PEOPLE_KEYWORDS = [
  'aunt',
  'brother',
  'child',
  'colleague',
  'driver',
  'everyone',
  'female',
  'guest',
  'he',
  'husband',
  'male',
  'manager',
  'mother',
  'nanny',
  'neighbor',
  'other people',
  'polite',
  'principal',
  'sister',
  'uncle',
  'wife',
  'younger',
  'grandfather',
  'grandmother',
  'self',
];

const TIME_KEYWORDS = [
  'already',
  'always',
  'autumn',
  'before',
  'birthday',
  'date',
  'day',
  'duration',
  'evening',
  'first',
  'half',
  'hour',
  'last year',
  'long time',
  'morning',
  'now',
  'occurrence',
  'quarter',
  'recently',
  'season',
  'spring',
  'summer',
  'then',
  'thousand',
  'time',
  'today',
  'tomorrow',
  'weekend',
  'winter',
  'year',
  'zero',
  'hundred',
];

const PLACE_KEYWORDS = [
  'airport',
  'area',
  'bank',
  'beijing',
  'beside',
  'city',
  'classroom',
  'company',
  'country',
  'east',
  'floor',
  'guesthouse',
  'hotel',
  'library',
  'map',
  'middle',
  'north',
  'office',
  'outside',
  'park',
  'place',
  'restroom',
  'road',
  'room',
  'side',
  'south',
  'station',
  'street',
  'subway',
  'train station',
  'toward',
  'west',
];

const DAILY_KEYWORDS = [
  'air conditioner',
  'animal',
  'bag',
  'banana',
  'beer',
  'bird',
  'blackboard',
  'boat',
  'body',
  'book',
  'bowl',
  'bread',
  'cake',
  'camera',
  'chopsticks',
  'clothes',
  'coffee',
  'color',
  'credit card',
  'dictionary',
  'door',
  'drink',
  'ear',
  'egg',
  'email',
  'eyes',
  'fish',
  'flower',
  'food',
  'gift',
  'grass',
  'hair',
  'hat',
  'homework',
  'horse',
  'lamp',
  'medicine',
  'menu',
  'milk',
  'mobile phone',
  'moon',
  'mouth',
  'mutton',
  'newspaper',
  'noodles',
  'nose',
  'notebook',
  'panda',
  'pants',
  'passport',
  'pencil',
  'phone',
  'photo',
  'plate',
  'refrigerator',
  'rice',
  'shirt',
  'shoes',
  'skirt',
  'snow',
  'soccer',
  'sport',
  'suitcase',
  'sun',
  'supermarket',
  'ticket',
  'tree',
  'umbrella',
  'watch',
  'watermelon',
];

const DESCRIPTOR_KEYWORDS = [
  'angry',
  'bad',
  'black',
  'blue',
  'broken',
  'busy',
  'cheap',
  'clean',
  'clear',
  'clever',
  'cloudy',
  'comfortable',
  'convenient',
  'correct',
  'cute',
  'difficult',
  'easy',
  'enthusiastic',
  'expensive',
  'far',
  'fast',
  'fresh',
  'full',
  'green',
  'happy',
  'high',
  'hungry',
  'important',
  'long',
  'near',
  'new',
  'old',
  'quiet',
  'red',
  'sad',
  'satisfied',
  'short',
  'slow',
  'special',
  'strange',
  'sunny',
  'sweet',
  'tall',
  'thin',
  'thirsty',
  'tired',
  'true',
  'very',
  'white',
  'wrong',
  'young',
];

const QUESTION_KEYWORDS = [
  'although',
  'because',
  'but',
  'compare',
  'degree',
  'for; because',
  'if',
  'meaning',
  'measure word',
  'modal',
  'not only',
  'only if',
  'or',
  'particle',
  'problem',
  'question',
  'sentence',
  'should',
  'so',
  'therefore',
  'why',
];

const VERB_KEYWORDS = [
  'agree',
  'allow',
  'answer',
  'arrive',
  'ask',
  'be interested',
  'believe',
  'borrow',
  'bring',
  'brush',
  'carry',
  'chat',
  'choose',
  'clean',
  'climb',
  'close',
  'complete',
  'cry',
  'dance',
  'decide',
  'deliver',
  'discover',
  'draw',
  'exercise',
  'feel',
  'finish',
  'forget',
  'get married',
  'go',
  'go online',
  'grow',
  'help',
  'hope',
  'improve',
  'inspect',
  'introduce',
  'know',
  'laugh',
  'leave',
  'let',
  'listen',
  'look',
  'meet',
  'move',
  'need',
  'participate',
  'pay attention',
  'plan',
  'play',
  'prepare',
  'practice',
  'put',
  'receive',
  'remember',
  'request',
  'rest',
  'return',
  'review',
  'ride',
  'run',
  'sell',
  'send',
  'sing',
  'smile',
  'solve',
  'speak',
  'spend',
  'stand',
  'start',
  'study',
  'swim',
  'take',
  'take care',
  'take off',
  'talk',
  'teach',
  'tell',
  'think',
  'travel',
  'try',
  'turn off',
  'understand',
  'use',
  'wait',
  'walk',
  'wash',
  'wear',
  'welcome',
  'work',
  'worry',
];

function rawToWords(raw: string): RawWord[] {
  return raw
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hanzi, pinyin, meaning] = line.split('|');
      return { hanzi, pinyin, meaning };
    });
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function clusterFor(word: RawWord): ClusterId {
  const override = KNOWN_CLUSTER_OVERRIDES[word.hanzi];
  if (override) {
    return override;
  }

  const meaning = word.meaning.toLowerCase();

  if (includesAny(meaning, PEOPLE_KEYWORDS)) {
    return 'people';
  }

  if (includesAny(meaning, TIME_KEYWORDS)) {
    return 'time';
  }

  if (includesAny(meaning, PLACE_KEYWORDS)) {
    return 'places';
  }

  if (includesAny(meaning, QUESTION_KEYWORDS)) {
    return 'questions';
  }

  if (includesAny(meaning, VERB_KEYWORDS)) {
    return 'verbs';
  }

  if (includesAny(meaning, DESCRIPTOR_KEYWORDS)) {
    return 'descriptors';
  }

  if (includesAny(meaning, DAILY_KEYWORDS)) {
    return 'daily';
  }

  return 'daily';
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function buildWords(level: HskLevel, raw: string): HskWord[] {
  return rawToWords(raw).map((word, index) => ({
    ...word,
    cluster: clusterFor(word),
    id: `hsk${level}-${slugify(word.pinyin || word.hanzi)}-${index + 1}`,
    level,
  }));
}

export const HSK1_LEVEL_WORDS: HskWord[] = HSK1_WORDS.map((word) => ({
  ...word,
  level: 1,
}));

export const HSK2_WORDS = buildWords(2, HSK2_RAW);
export const HSK3_WORDS = buildWords(3, HSK3_RAW);
export const HSK4_WORDS = buildWords(4, HSK4_RAW);
export const HSK5_WORDS = buildWords(5, HSK5_RAW);
export const HSK6_WORDS = buildWords(6, HSK6_RAW);

export const HSK_WORDS_BY_LEVEL: Record<HskLevel, HskWord[]> = {
  1: HSK1_LEVEL_WORDS,
  2: HSK2_WORDS,
  3: HSK3_WORDS,
  4: HSK4_WORDS,
  5: HSK5_WORDS,
  6: HSK6_WORDS,
};

export { CLUSTERS };
