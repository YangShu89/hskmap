export type Hsk6LocalizedSenseLanguage =
  | "ar"
  | "de"
  | "es"
  | "fr"
  | "id"
  | "ja"
  | "ko"
  | "pt-BR"
  | "ru"
  | "vi";

export type Hsk6LocalizedSenseTranslation = {
  meaning: string;
  note?: string;
  examples?: string[];
};

export const HSK6_LOCALIZED_SENSE_TRANSLATIONS: Record<
  Hsk6LocalizedSenseLanguage,
  Record<string, Hsk6LocalizedSenseTranslation[]>
> = {
  "ar": {
    "hsk6-bajie-20": [
      { meaning: "يتملق", examples: ["هو غير مستعد للاعتماد على التملّق للآخرين للحصول على الفرص."] },
      { meaning: "يتودد طلبا للمنفعة", examples: ["إنه يحاول دائمًا التودد إلى مديره للحصول على ترقية."] },
      { meaning: "يتزلف إلى", examples: ["لدخول تلك الدائرة، تعمد التودد إلى عدة مشاهير."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "يحصل على تعويض نفقات", examples: ["بعد عودته من رحلة العمل، أخذ الفاتورة ليطلب تعويضها."] },
      { meaning: "يقدم النفقات لاستردادها", examples: ["بعد عودتها من رحلة العمل، قدمت تذاكر القطار لاسترداد قيمتها."] },
      { meaning: "يشطب/يتخلص من الأصل كخردة", examples: ["لا يمكن إصلاح تلك الآلة القديمة، ولا خيار سوى تخريدها."] },
    ],
    "hsk6-bise-101": [
      { meaning: "مسدود/مغلق", examples: ["المواصلات هنا معزولة، لذلك تصل الأخبار ببطء."] },
      { meaning: "معزول", examples: ["كانت هذه القرية الجبلية معزولة جدًا في الماضي، ونادرًا ما كان يأتيها الغرباء."] },
      { meaning: "متخلف أو قليل الاطلاع", examples: ["قلة الاطلاع على المعلومات قد تجعل الشركة تفوّت الفرص."] },
    ],
    "hsk6-bing-135": [
      { meaning: "درجة C", examples: ["في هذا الامتحان كانت درجته «ج»."] },
      { meaning: "الثالث", examples: ["على الأشخاص الثلاثة المدرجين باسم أ وب وج أن يتحدثوا جميعًا."] },
      { meaning: "الجذع السماوي الثالث", examples: ["بينغ هو الثالث من الجذوع السماوية."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "لا يتوقف عند أي حد", examples: ["من أجل الفوز في المسابقة لا يتورّع عن أي وسيلة."] },
      { meaning: "يستخدم أي وسيلة", examples: ["للفوز بالعملاء، يستخدم أي وسيلة لخفض الأسعار."] },
      { meaning: "بكل وسيلة مشروعة أو غير مشروعة", examples: ["توسّع تلك الشركة سوقها بالوسائل المشروعة أو غير المشروعة."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "يتراجع", examples: ["بدأ الجميع بالانسحاب."] },
      { meaning: "ينسحب", examples: ["قبل وصول العاصفة الممطرة، انسحب الفريق من الوادي."] },
      { meaning: "يرجع إلى الخلف", examples: ["كان نيران العدو كثيفة جدًا، فاضطرت قوات الجبهة إلى التراجع."] },
    ],
    "hsk6-chili-275": [
      { meaning: "شاق", examples: ["هذا الكتاب ثقيل جدًا ومن الصعب رفعه."] },
      { meaning: "مجهد", examples: ["نقل هذا البيانو عمل شاق حقًا."] },
      { meaning: "يجد صعوبة في القيام بـ", examples: ["لديه بعض الصعوبة في فهم نشرات الأخبار السريعة."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "إجراء تأديبي", examples: ["انتهك الانضباط فتلقّى عقوبة تأديبية من المدرسة."] },
      { meaning: "عقوبة", examples: ["تلقى عقوبة صارمة بسبب الغش."] },
      { meaning: "يعالج/يتعامل مع", examples: ["يجب التعامل مع هذه الدفعة من البضائع في أقرب وقت ممكن."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "يتدبر الأمر بما هو متاح", examples: ["يمكن أن تكون هذه الوجبة بسيطة؛ لنتدبّر الأمر بها فحسب."] },
      { meaning: "يرتجل", examples: ["ارتجلت الفرقة مقطوعة افتتاحية في اللحظة الأخيرة."] },
      { meaning: "مقبول/ليس سيئا جدا", examples: ["طعام هذا المتجر الصغير مقبول."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "يندفع/يسرع", examples: ["ذلك القط اندفع فجأة إلى المطبخ."] },
      { meaning: "يهرب", examples: ["فرّ المجرم من الباب الخلفي وسط الفوضى."] },
      { meaning: "يغير/يعبث بالنص", examples: ["غيّر تاريخ العقد دون إذن."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "في أسوأ الأحوال", examples: ["في أسوأ الأحوال، يمكننا أن نأتي مرة أخرى غدًا."] },
      { meaning: "ليس أكثر من", examples: ["يمكن إنهاء هذا العمل في مدة لا تزيد على يومين."] },
      { meaning: "ليس أمرا مهما في السياقات المنفية", examples: ["تفويت حافلة واحدة ليس بالأمر الكبير."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "الشخص المعني", examples: ["علينا الاستماع إلى شرح الشخص المعني."] },
      { meaning: "الطرف المعني", examples: ["يجب التحقق من تفاصيل الحادث مع الطرف المعني."] },
      { meaning: "متقاض", examples: ["مثل الخصمان أمام المحكمة للإدلاء بشهادتهما."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "يفلس", examples: ["بسبب سوء الإدارة، أُغلِق ذلك المطعم العام الماضي."] },
      { meaning: "يغلق نشاطه", examples: ["كان الإيجار مرتفعًا جدًا، لذلك اضطرّت تلك المكتبة إلى الإغلاق."] },
      { meaning: "يفشل كعمل تجاري", examples: ["ما إن انقطعت سلسلة التمويل حتى فشلت الشركة سريعًا كعمل تجاري."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "يقطع", examples: ["قرر أن يقطع صلته بعاداته السيئة الماضية."] },
      { meaning: "يفصل", examples: ["قطعت العاصفة الثلجية وسائل النقل إلى القرية الجبلية."] },
      { meaning: "يقطع العلاقات", examples: ["بعد الشجار، قطعوا علاقتهم."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "يفي/ينجز وعدا", examples: ["أوفى أخيرًا بوعده الذي قطعه في البداية."] },
      { meaning: "يصرف شيكا", examples: ["ذهب إلى البنك لصرف شيك."] },
      { meaning: "يحوله إلى نقد", examples: ["يمكن تحويل هذه النقاط إلى نقد قبل نهاية الشهر."] },
    ],
    "hsk6-fan-504": [
      { meaning: "كلمة عد للأقوال/الأفعال", examples: ["كان هذا الشرح واضحًا جدًا."] },
      { meaning: "جولة/فترة", examples: ["بعد جولة من النقاش، وافق الجميع على الخطة."] },
      { meaning: "نوع/صنف", examples: ["هذا النوع من المشاهد لا يُنسى بالنسبة لي."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "ضمن نصف قطر", examples: ["لا يوجد مستشفى ضمن عشرة كيلومترات."] },
      { meaning: "المنطقة المحيطة", examples: ["يمكن سماع الجرس في المنطقة المحيطة على مدى عدة لي."] },
      { meaning: "المحيط", examples: ["يقيس العمال محيط حوض الزهور."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "يزور", examples: ["سيجري الصحفي مقابلة مع مدير المدرسة غدًا."] },
      { meaning: "يجري مقابلة", examples: ["سيجري الصحفي مقابلة مع المخرج الحائز على الجائزة غدًا."] },
      { meaning: "يصل إلى/يدخل", examples: ["لا يستطيع المستخدمون الوصول إلى هذا الموقع."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "يتعامل بسطحية", examples: ["لا تتملّص مني، أجب بجدية من فضلك."] },
      { meaning: "يصرف باستخفاف", examples: ["صرف المدير العميل ببضع كلمات فارغة."] },
      { meaning: "يتدبر الأمر كيفما اتفق", examples: ["لم يكن مستعدًا، فلم يستطع إلا أن يتدبر أمر العرض بصعوبة."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "يردد", examples: ["ما إن يتكلم الآخرون حتى يسايرهم ويكرر كلامهم."] },
      { meaning: "ينضم إلى الحديث", examples: ["ما إن قدمت اقتراحها حتى انضم الأشخاص القريبون إلى الحديث مؤيدين."] },
      { meaning: "يوافق بلا نقد", examples: ["لا توافق بلا تفكير على كل ما يقوله الآخرون."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "تابع/مرتبط", examples: ["هذا المستشفى تابع لمدرسة."] },
      { meaning: "مرفق/ملحق", examples: ["أُرفقت ثلاث قوائم في نهاية العقد."] },
      { meaning: "مرؤوس", examples: ["هذا القسم ليس إلا وحدة تابعة."] },
      { meaning: "مساعد/ثانوي", examples: ["موقف السيارات مرفق إضافي تابع للفندق."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "يمدح", examples: ["أشاد الفيلم بالعمال."] },
      { meaning: "يرثي/يثني", examples: ["أشادت كلمة التأبين بتفانيه المتجرد من الأنانية."] },
      { meaning: "يمجد", examples: ["يمجد الشاعر قوة البحر."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "علنا", examples: ["خالف القواعد علنًا."] },
      { meaning: "على الملأ", examples: ["عارض القرار علنًا في الاجتماع."] },
      { meaning: "بوقاحة", examples: ["كذب بوقاحة دون أدنى خجل."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "يخذل", examples: ["لا أريد أن أُخيّب آمال والديّ."] },
      { meaning: "يخيب أمل", examples: ["لا تخيب توقعات والديك."] },
      { meaning: "لا يرقى إلى مستوى التوقعات", examples: ["لم يخذل ثقة معلمه به."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "في النهاية", examples: ["في نهاية المطاف، الصحة هي الأهم."] },
      { meaning: "في التحليل النهائي", examples: ["في التحليل النهائي، الجودة هي الأهم."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "يتمنى لو يستطيع", examples: ["يتمنى لو يستطيع العودة إلى البيت فورًا."] },
      { meaning: "يتلهف إلى", examples: ["بعد سماع الخبر السار، كان يتوق بشدة إلى العودة إلى المنزل فورًا."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "مخاوف بشأن العواقب", examples: ["بهذه الأموال، لم يعد لديه أي قلق بشأن العواقب أو ما قد يعوقه لاحقًا."] },
      { meaning: "مخاوف بشأن الجبهة الداخلية", examples: ["بعد أن استقر أمر عائلته، لم تعد لديه مخاوف بشأن البيت أثناء سفره للعمل."] },
      { meaning: "قلق باق", examples: ["بعد تأمين التمويل، لم تعد لدى فريق المشروع أي مخاوف عالقة."] },
    ],
    "hsk6-huali-790": [
      { meaning: "رائع الجمال", examples: ["ترتدي ملابس فاخرة."] },
      { meaning: "فخم", examples: ["تتدلّى في القاعة ثريا كريستالية فخمة."] },
      { meaning: "مزخرف", examples: ["التطريز على هذا الفستان الرسمي مزخرف."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "منظمة", examples: ["هذه المؤسسة تساعد كبار السن."] },
      { meaning: "مؤسسة", examples: ["تتخصص هذه المؤسسة في أبحاث الصحة العامة."] },
      { meaning: "آلية", examples: ["آلية الساعة الداخلية دقيقة للغاية."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "يتشدد في التفاصيل", examples: ["لا تماكس كثيرًا على الأمور الصغيرة."] },
      { meaning: "يساوم على", examples: ["كان البائع ما زال يساوم على يوانين."] },
      { meaning: "يهتم/يبالي بـ", examples: ["لا يهمني من يعتذر أولاً."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "يدوس", examples: ["لا تدسوا العشب."] },
      { meaning: "يطأ", examples: ["من فضلك لا تطأ العشب المزروع حديثاً."] },
      { meaning: "ينتهك", examples: ["انتهك هذا الأمر حقوق المواطنين."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "مجذاف", examples: ["انكسر المجداف في القارب."] },
      { meaning: "مجداف", examples: ["استخدم مجدافاً ليعيد القارب إلى الشاطئ."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "رقيق/مدلل", examples: ["لا تكن شديد التدلل، سنصل حالًا."] },
      { meaning: "مدلل", examples: ["لقد دُلّل منذ طفولته فأصبح مدللاً جداً."] },
      { meaning: "غير قادر على تحمل المشقة", examples: ["بعد كيلومترين فقط اشتكى من التعب؛ إنه حقاً لا يتحمل المشقة."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan3 يلف/يتجعد", examples: ["لفّت اللوحة ووضعَتها جانبًا."] },
      { meaning: "juan4 مجلد/لفافة", examples: ["كانت لفافة من الرسم القديم على رف الكتب."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "يتحدث بصراحة/ثقة وبإسهاب", examples: ["تحدث على المنصة بثقة تامة ولم يكن متوترًا إطلاقًا."] },
      { meaning: "يتحدث بطلاقة", examples: ["يمكنه التحدث بطلاقة حتى من دون نص."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "جاد", examples: ["طلب المساعدة بنبرة صادقة ومُلِحّة."] },
      { meaning: "صادق", examples: ["كان اعتذارها صادقاً جداً."] },
      { meaning: "من القلب", examples: ["عبّر عن شكر عميق لمساعدة أهل القرية."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "يعامل بظلم", examples: ["لم تُجحف الشركة بحق الموظفين القدامى."] },
      { meaning: "يبخس حق", examples: ["لا يبخس المدير أبداً مكافآت الموظفين القدامى."] },
      { meaning: "يسيء معاملة", examples: ["لم يكن يرغب في إساءة معاملة ذلك الحصان العجوز."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "بارد", examples: ["بدت إجابته باردة وقاسية جدًا."] },
      { meaning: "قاس القلب", examples: ["بدا قاسياً جداً تجاه معاناة المريض."] },
      { meaning: "عديم الرحمة", examples: ["أصدر الجنرال أمراً قاسياً بالإعدام."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "يندهش مذهولا", examples: ["عندما سمع الخبر تجمّد للحظة."] },
      { meaning: "يتجمد", examples: ["انفتح الباب فجأة فتجمد في مكانه."] },
      { meaning: "يتشتت ذهنه", examples: ["لا تبقَ شارد الذهن تحدق خارج النافذة أثناء الدرس."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "مصالح/رهانات", examples: ["أخيرًا فهم ما الذي كان على المحك في هذه المسألة."] },
      { meaning: "إيجابيات وسلبيات", examples: ["فكّر جيداً في الإيجابيات والسلبيات قبل التوقيع."] },
      { meaning: "الخطورة", examples: ["لم يدرك بعد خطورة المشكلة."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "يدفن", examples: ["دفنت الأعمال المزدحمة موهبته."] },
      { meaning: "يحجب", examples: ["حجب الضجيج غناءها."] },
      { meaning: "يترك الموهبة بلا تقدير", examples: ["لا تدع الأعمال الروتينية تطمس موهبته."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "يخطو خطوة", examples: ["دخل إلى الصف بخطى متوترة."] },
      { meaning: "يخطو بخطوة واسعة", examples: ["خطا بخطوات واسعة نحو قاعة الاجتماع."] },
      { meaning: "يدخل بخطوة", examples: ["تخطو الشركة نحو السوق الدولية."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "حبر", examples: ["نفد الحبر."] },
      { meaning: "ثقافة/معرفة كتبية", examples: ["لديه حقاً قدر من الثقافة والمعرفة."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "نظرة", examples: ["توقفت نظرة المعلم عند السبورة."] },
      { meaning: "نظر", examples: ["ألقت نظرة مشجعة."] },
      { meaning: "بصر/رؤية", examples: ["تعافى بصره بسرعة."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "قصة داخلية", examples: ["أراد الصحفي معرفة كواليس الحادثة."] },
      { meaning: "معلومات داخلية", examples: ["حصل الصحفي على معلومات داخلية عن الصفقة."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "يصوغ مسودة", examples: ["نحن بصدد صياغة خطة جديدة."] },
      { meaning: "يضع", examples: ["تقوم السكرتيرة بإعداد جدول أعمال الاجتماع."] },
      { meaning: "يصوغ", examples: ["وضع الخبراء معايير تقييم جديدة."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "ينتصب/يرتفع", examples: ["كانت قدماه مرفوعتين على الكرسي."] },
      { meaning: "يسند", examples: ["رفع اللوح الخشبي ليسند العجلة ويمنعها."] },
      { meaning: "ينحني إلى الأعلى", examples: ["التوى طرف الورقة إلى الأعلى بعد أن ابتل بالماء."] },
      { meaning: "بارز/متفوق", examples: ["إنه طالب بارز في الصف."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "يثابر", examples: ["ما دمتَ مثابرًا فلن تخلو من التقدم."] },
      { meaning: "يواصل العمل عليه", examples: ["ما دمت تواصل المحاولة، فستُحل المسألة الصعبة في النهاية."] },
      { meaning: "يكون مثابرا", examples: ["حققت بإصرار في الحقيقة."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "شائع", examples: ["هذا المقرر شائع جدًا."] },
      { meaning: "مطلوب", examples: ["أصبح محلل البيانات وظيفة مطلوبة."] },
      { meaning: "رائج/ساخن", examples: ["أصبحت هذه الرقصة رائجة مؤخراً."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "يحدد", examples: ["قرّرت المحكمة أن العقد قانوني."] },
      { meaning: "يعرّف على أنه", examples: ["حددت الشرطة هويته كمشتبه به."] },
      { meaning: "يؤمن بقوة", examples: ["إنها تؤمن بقوة بأن الجهد سيؤتي ثماره."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "يوافق", examples: ["نال جهده موافقة الجميع."] },
      { meaning: "يعترف", examples: ["اعترفت المنظمة الدولية بهذا المعيار."] },
      { meaning: "قبول/موافقة", examples: ["حصلت هذه الخطة على موافقة الفريق."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "كلمة عد للسفن/القوارب", examples: ["ترسو في الميناء ثلاث سفن."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "يتحدث بلا نهاية", examples: ["ما إن يتحدث عن التاريخ حتى يظلّ يتكلم بلا توقف."] },
      { meaning: "يتكلم بلا توقف/بطلاقة", examples: ["بدأ المضيف يتحدث بلا توقف فور افتتاح الفعالية."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "متعدد الأغراض", examples: ["هذه الطريقة قابلة للتطبيق بشكل عام."] },
      { meaning: "مستخدم/قابل للتطبيق عالميا", examples: ["هذا النوع من القوابس مستخدم على نطاق واسع في أوروبا."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "وهم", examples: ["لا تتوهم أنك ستنجح من دون بذل جهد."] },
      { meaning: "أمل باطل", examples: ["النجاح بلا جهد مجرد أمل باطل."] },
      { meaning: "يتخيل", examples: ["يقضي يومه كله متخيلاً أنه سيصبح غنياً بين ليلة وضحاها."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "يستمر لمدة", examples: ["تستمر الدورة التدريبية ثلاثة أشهر."] },
      { meaning: "لمدة فترة", examples: ["تستمر الدورة التدريبية لمدة ثلاثة أشهر."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "الأيض", examples: ["يمكن للتمارين أن تعزّز عملية الأيض."] },
      { meaning: "استبدال القديم بالجديد", examples: ["تتسارع عملية استبدال القديم بالجديد في الصناعة."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "جهد مضن", examples: ["استغرق هذا الكتاب كثيرًا من جهده."] },
      { meaning: "عمل/إخلاص مصبوب في شيء", examples: ["يجسد هذا الكتاب عشر سنوات من جهدها المخلص."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "يشرب بإفراط", examples: ["الإفراط في شرب الكحول باستمرار يؤثر في الصحة."] },
      { meaning: "إساءة استخدام الكحول", examples: ["أضر تعاطي الكحول طويل الأمد بصحته."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "يضغط/يعصر", examples: ["لا يجوز لأصحاب العمل استغلال العمال."] },
      { meaning: "يستغل", examples: ["استغل المصنع عديم الضمير العمال المؤقتين."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "البصر", examples: ["المدير لديه حُسنُ تقدير."] },
      { meaning: "حسن التقدير", examples: ["لديها حكم جيد عند اختيار الشركاء."] },
      { meaning: "بصيرة", examples: ["هذا المحرر لديه بصيرة فريدة."] },
      { meaning: "ذوق", examples: ["ذوقه انتقائي؛ فهو لا يشتري إلا التصاميم الكلاسيكية."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "صوت/صوتيات", examples: ["صوت نظام الصوت في الغرفة مرتفع جدًا."] },
      { meaning: "نظام صوت/معدات ستيريو", examples: ["تم شراء نظام صوت جديد لغرفة المعيشة."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "مدع", examples: ["شرح المدّعي الوضع للمحكمة."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "تكون حاملا بـ", examples: ["الأرض تُنَمّي حياةً غنية."] },
      { meaning: "يولّد", examples: ["تتكاثر في الأرض الرطبة أنواع كثيرة من الطيور المائية."] },
      { meaning: "يرعى/ينمي", examples: ["رعت المدرسة مجموعة من العلماء الشباب."] },
      { meaning: "يؤدي إلى", examples: ["أدت الأزمة إلى ظهور فرص جديدة."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "بمناسبة", examples: ["عند التخرج، تمنى المعلم أن ينجح الجميع."] },
      { meaning: "في وقت", examples: ["عند التخرج، كتب رسالة يشكر فيها معلمه."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "يحكم/يدير", examples: ["الحكومة تعالج التلوث حاليًا."] },
      { meaning: "يدير/يعالج", examples: ["بدأ المصنع في معالجة مياه الصرف."] },
      { meaning: "حوكمة", examples: ["تحتاج حوكمة الشركات إلى الشفافية."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "يبقى عالقا", examples: ["تركت الثلوج الكثيفة كثيرًا من الناس عالقين في المطار."] },
      { meaning: "يحتجز", examples: ["تم احتجازه في المطار بسبب مشكلة في الوثائق."] },
      { meaning: "يبقى في الخلف", examples: ["بقي المتطوعون في الموقع لتنظيف القمامة."] },
      { meaning: "احتفاظ/استبقاء", examples: ["أظهر الفحص احتباس الطعام في المعدة."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "مركز الثقل", examples: ["يرجى خفض مركز ثقل جسمك."] },
      { meaning: "محور/لب", examples: ["محور عمل هذا العام هو الجودة."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "مهيب", examples: ["هو مرتدٍ لباسًا رسميًا جدًا."] },
      { meaning: "وقور", examples: ["تصرفاتها وقورة ولائقة."] },
      { meaning: "رسمي", examples: ["يرجى إلقاء الكلمة بنبرة رسمية."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai1 يكون بجانب/قريبا من", examples: ["من فضلكم اجلسوا متقاربين، فما زال هناك أشخاص خلفكم."] },
      { meaning: "ai2 يعاني/يتحمل", examples: ["تحمل جولة من الانتقاد."] },
    ],
    "hsk6-ao-15": [
      { meaning: "يطهو على نار هادئة/يغلي حتى يتركز", examples: ["أمّي تركت حساء السمك يُطهى على نار هادئة لمدة ساعتين."] },
      { meaning: "يتحمل", examples: ["تم تجاوز هذه الفترة الصعبة أخيرًا بالصبر."] },
      { meaning: "يسهر لوقت متأخر", examples: ["سهر حتى الفجر ثم نام."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "راحة/سهولة", examples: ["محطة المترو الجديدة جلبت للسكان كثيرًا من التسهيلات."] },
      { meaning: "مريح", examples: ["المواصلات هنا مريحة جدًا."] },
      { meaning: "يسهل", examples: ["سهّل النظام الجديد عملية التعويض."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "لا يطاق", examples: ["كانت الغرفة فوضوية على نحو لا يُطاق."] },
      { meaning: "بشكل لا يطاق/فظيع", examples: ["كانت الغرفة خانقة وحارة بشكل لا يطاق."] },
      { meaning: "في حالة سيئة", examples: ["أصبح المبنى القديم في حالة متهالكة جدًا."] },
    ],
    "hsk6-chan-221": [
      { meaning: "يشتهي الطعام", examples: ["ما إن رأى أخي الأصغر الكعكة حتى اشتهَاها."] },
      { meaning: "شره للطعام", examples: ["يصبح شديد الشراهة للطعام بمجرد حلول وقت الوجبة."] },
      { meaning: "نهم", examples: ["هذا الطفل شره جدًا، يلتقط الوجبات الخفيفة كلما رآها."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "غير حاد/كليل", examples: ["استُخدم هذا السكين مدة طويلة وأصبح كليلًا إلى حدّ ما."] },
      { meaning: "بطيء الفهم", examples: ["ردود فعله بطيئة الفهم بعض الشيء."] },
      { meaning: "بطيء/خامل", examples: ["يعمل الحاسوب ببطء."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "يبيع", examples: ["خيانة الأصدقاء من أجل المال أمر خاطئ."] },
      { meaning: "يخون/يبيع", examples: ["لقد خان ثقة صديقه."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "يخدم", examples: ["تعتني بأمّها المريضة بعناية."] },
      { meaning: "ينتظر لخدمة", examples: ["اعتنت الممرضة بالمريض بعناية أثناء تناول الطعام."] },
      { meaning: "يعتني بـ", examples: ["تعتني بأمها المسنة في المنزل."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "يدافع عن أطروحة", examples: ["يشارك في مناقشة التخرّج."] },
      { meaning: "مناقشة شفوية", examples: ["ستحضر غدًا مناقشة رسالتها الشفوية."] },
      { meaning: "يرد على الاعتراضات", examples: ["أجاب بهدوء على الاعتراضات ورد على الشكوك."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi مهمل", examples: ["كان مهمِلًا جدًا فترك جواز سفره في البيت."] },
      { meaning: "dayi الفكرة الرئيسية/المعنى العام", examples: ["يرجى تلخيص الفكرة العامة للمقال أولًا."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "الجانب العكسي/المقابل", examples: ["هذه القصة تحمل أيضًا عِبرة سلبية."] },
      { meaning: "جانب/مثال سلبي", examples: ["هذه الحالة مثال سلبي."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "يفكك", examples: ["قسّم المعلم المسألة إلى عدة أجزاء."] },
      { meaning: "يقسم/يحلل", examples: ["قسّم المعلم المسألة الصعبة إلى ثلاث خطوات."] },
      { meaning: "يتحلل", examples: ["يمكن للبكتيريا أن تحلل الأوراق المتساقطة."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "ممتلئ/مكتنز", examples: ["محتوى هذه المقالة غني."] },
      { meaning: "وافر", examples: ["أصبحت قدراته ودعمه وافرين الآن."] },
      { meaning: "غني/جوهري", examples: ["محتوى التقرير غني ومقنع."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "فاسد/متعفن", examples: ["الخشب المتعفّن ينكسر بسهولة."] },
      { meaning: "منحط/متدهور", examples: ["يجب تغيير النظام الفاسد المتعفن."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "يتأثر بعمق", examples: ["عندما رأى الصورة القديمة تأثّر كثيرًا."] },
      { meaning: "يتنهد بتأثر", examples: ["عندما رأى الصورة القديمة، تنهد بمشاعر كثيرة."] },
      { meaning: "تأملات/مشاعر", examples: ["دوّنت تأملاتها من الرحلة."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "أرض زراعية/أرض مزروعة", examples: ["المزارع يحرث الأرض."] },
      { meaning: "يحرث الأرض", examples: ["في الربيع، يبدأ المزارعون حراثة الأرض."] },
    ],
    "hsk6-heng-768": [
      { meaning: "أفقي", examples: ["وقف جانبًا عند الباب."] },
      { meaning: "جانبي/عبر", examples: ["وضع الطاولة بشكل جانبي."] },
      { meaning: "فظ/غير معقول", examples: ["يتحدث بفظاظة شديدة."] },
    ],
    "hsk6-hong-769": [
      { meaning: "يدلل/يقنع بلطف", examples: ["الأب يُلاطف الطفل لينام."] },
      { meaning: "يهدئ", examples: ["هدأت الطفل بصوت خافت حتى نام."] },
      { meaning: "يخدع/يمكر", examples: ["لا تخدعني بمعلومات كاذبة."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "يعيد إلى أصله", examples: ["من فضلك أعد تمثيل الموقع كما كان."] },
      { meaning: "يعيد البناء", examples: ["عملت الشرطة على إعادة بناء كيفية وقوع القضية."] },
      { meaning: "يختزل كيميائيا", examples: ["يمكن للهيدروجين أن يختزل أكسيد النحاس كيميائيًا."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "مرن", examples: ["تتضمن الخطة وقتًا مرنًا."] },
      { meaning: "متحرك", examples: ["يمكن للفريق المتنقل تقديم الدعم في أي وقت."] },
      { meaning: "مزود بمحرك", examples: ["تقف دراجة ثلاثية آلية عند المدخل."] },
      { meaning: "يناور", examples: ["ناورت القوات في الجبال."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "طرف مدبب", examples: ["تستخدم الشركة تقنية متطورة للغاية."] },
      { meaning: "متقدم جدا/طليعي", examples: ["تطوّر الشركة رقائق متطورة جدًا."] },
      { meaning: "متقدم", examples: ["يمتلك هذا المستشفى معدات متقدمة."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "نقد ذاتي", examples: ["كتب نقدًا ذاتيًا."] },
      { meaning: "يراجع/يفحص", examples: ["بعد الاجتماع، راجعنا عيوب الخطة."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "جاسوس", examples: ["الجاسوس في الفيلم ذكي."] },
      { meaning: "عميل تجسس", examples: ["تم العثور على عميل تجسس أجنبي عند الحدود."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "ما يراه ويسمعه المرء", examples: ["زاد السفر من معارفه وتجربته."] },
      { meaning: "معرفة وخبرة", examples: ["وسّع السفر معرفته وخبرته."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "سليم/كامل", examples: ["تحتاج الشركة إلى تحسين نظام إدارتها."] },
      { meaning: "يحسن/يكمل", examples: ["ستحسن الحكومة آلية الرقابة."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "يشرح", examples: ["شرح المدير المهمة بوضوح."] },
      { meaning: "يقدم تفسيرا/حسابا", examples: ["يجب أن يوضح أين ذهبت الأموال."] },
      { meaning: "يسلم", examples: ["يرجى تسليم العمل إلى الزميل الجديد."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "يكون مستعدا/مسرورا لـ", examples: ["يسعدني أن أساعدك في الانتقال."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "كأمر بديهي", examples: ["لا تعتبر المساعدة أمرًا طبيعيًا ومفروغًا منه."] },
      { meaning: "يعده أمرا مفروغا منه", examples: ["يعتبر مساعدة الآخرين أمرًا مفروغًا منه."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "يبلل حتى الغمر", examples: ["تبلّل بالماء."] },
      { meaning: "يسكب/يرش", examples: ["سكبت العسل على الكعكة."] },
      { meaning: "يبتل", examples: ["نسي مظلته فابتل تمامًا بالمطر."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "ينتحل شخصية", examples: ["انتحل شخص صفة طبيب ليخدع المسنين."] },
      { meaning: "يتظاهر بأنه", examples: ["تظاهر بأنه صحفي ليدخل القاعة."] },
      { meaning: "يمرر نفسه على أنه", examples: ["قدمت نفسها كخبيرة لكسب الثقة."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "كلمة عد لأشياء صغيرة مسطحة/مستديرة مثل العملات والخواتم والميداليات والطوابع", examples: ["اشترت خاتمًا واحدًا."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "يسير عكس اتجاه المرور", examples: ["يُحظر السير عكس الاتجاه في هذا الطريق."] },
      { meaning: "يسافر في الاتجاه العكسي/الخاطئ", examples: ["كانت تلك السيارة تسير عكس الاتجاه في شارع باتجاه واحد."] },
      { meaning: "راجع/ارتجاعي", examples: ["لنبتون حركة تراجعية."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "يتماسك", examples: ["هذا الهدف وحّد قوة الجميع."] },
      { meaning: "يجمع/يحشد", examples: ["حشد هذا الانتصار ثقة الفريق كله."] },
      { meaning: "يتكاثف", examples: ["يكثف الهواء البارد بخار الماء إلى ضباب."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "يجهز", examples: ["جهّزت المدرسة الفصل بحواسيب."] },
      { meaning: "يزود بـ", examples: ["زودت المدرسة كل فصل دراسي بمكيف هواء."] },
      { meaning: "معدات", examples: ["تم تسليم معدات مكافحة الحرائق إلى المستودع بالفعل."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "ينقض/يندفع نحو", examples: ["اندفع الطفل نحو أمه."] },
      { meaning: "يخفق/يرفرف", examples: ["رفرفت الفراشة بجناحيها برفق بين الزهور."] },
      { meaning: "يرمي نفسه على", examples: ["ما إن دخل الطفل حتى ألقى بنفسه في حضن أمه."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "فجوة", examples: ["في هذا الكوب ثَلمة."] },
      { meaning: "ثغرة", examples: ["فتح الفيضان ثغرة في السد."] },
      { meaning: "كسر صغير/نقرة", examples: ["توجد شظية صغيرة مكسورة على حافة الكوب."] },
      { meaning: "عجز/نقص", examples: ["لا تزال لدى الشركة فجوة تمويلية قدرها ثلاثة ملايين."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "يدوي", examples: ["الترجمة البشرية أدقّ."] },
      { meaning: "من صنع الإنسان", examples: ["يمر هذا النهر من صنع الإنسان عبر المنطقة الجديدة."] },
      { meaning: "اصطناعي", examples: ["اقترح الطبيب تركيب مفصل صناعي للمريض."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "أناس آخرون", examples: ["رجاءً لا تُزعِج الآخرين."] },
      { meaning: "أسرة/عائلة", examples: ["تعيش بضع عائلات عند سفح الجبل."] },
      { meaning: "أنا في الكلام العامي", examples: ["لقد اعتذرت بالفعل، فلا تغضب."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "ينبعث/يطلق", examples: ["تفوح من الزهرة رائحة."] },
      { meaning: "يوزع", examples: ["وزع المتطوعون المنشورات عند المدخل."] },
      { meaning: "يرسل", examples: ["سيرسل النظام رسائل الإشعار الإلكترونية تلقائيا."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "مفعم بالحيوية", examples: ["يبدو فخورًا جدًا اليوم."] },
      { meaning: "فخور/مغرور", examples: ["بعد أن ارتدى الزي الجديد، بدا فخورا جدا."] },
      { meaning: "تعبير/هيئة", examples: ["بدا تعبيرها متعبا بعض الشيء."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "غير مألوف", examples: ["لقد وصل للتو وما زالت البيئة غير مألوفة له."] },
      { meaning: "صدئ/غير متمرس", examples: ["بعد سنوات بلا تدريب، أصبحت مهارته في العزف على البيانو صدئة."] },
      { meaning: "غير قريب", examples: ["بعد الانتقال، أصبحنا أقل قربا من جيراننا القدامى."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "حزمة/باقة", examples: ["على الطاولة باقةُ زهور."] },
      { meaning: "شعاع", examples: ["دخل شعاع من ضوء الشمس إلى الغرفة."] },
      { meaning: "كلمة عد للحزم", examples: ["أهداها باقة من الورود."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "يشكل", examples: ["التربية الأسرية تُشكّل الشخصية."] },
      { meaning: "يصوغ/يقالب", examples: ["شكّل الحرفي مزهرية من الطين."] },
      { meaning: "يصوّر/يخلق", examples: ["تصور الرواية أما شجاعة."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "يعد صحيحا/ساريا", examples: ["إذا وعدتَ فيجب أن يُعتدّ بوعدك."] },
      { meaning: "يفي بكلمته", examples: ["هو يفي بكلمته دائما."] },
      { meaning: "يحسب", examples: ["كان يحسب وهو مطأطئ الرأس."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "شلل", examples: ["تسبّب الحادث في شلل حركة المرور."] },
      { meaning: "يشل", examples: ["تسبب الحادث في شلل ساقه اليسرى."] },
      { meaning: "يوقف تماما", examples: ["أوقفت العاصفة الثلجية حركة المرور في المدينة."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "يخرج", examples: ["أخرج مفتاحًا."] },
      { meaning: "يسحب إلى الخارج", examples: ["سحب المفتاح من الدرج."] },
      { meaning: "ينقب ويخرج", examples: ["حفر العامل الطين والرمل بالمجرفة وأخرجهما."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "يضبط", examples: ["الموسيقى يمكن أن تُخفف من توتر الحياة."] },
      { meaning: "يخفف", examples: ["يمكن للموسيقى أن تخفف المشاعر المتوترة."] },
      { meaning: "يضيف تنوعا/ينعش", examples: ["يمكن للسفر في عطلة نهاية الأسبوع أن يضيف تنوعا إلى حياة رتيبة."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "يضع خططا شاملة مع مراعاة كل العوامل/الأطراف", examples: ["ينبغي على القادة مراعاة جميع الجوانب."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "يشحن الأمتعة", examples: ["تحتاج الحقيبة إلى الشحن كأمتعة مسجلة."] },
      { meaning: "يرسل للشحن", examples: ["تحتاج هذه الدفعة من الأدوية إلى شحن موكل عبر سلسلة تبريد."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "كامل", examples: ["هذه المجموعة من المواد متكاملة جدًا."] },
      { meaning: "مجهز بالكامل", examples: ["هذا المستشفى مجهز بالكامل."] },
      { meaning: "شامل", examples: ["يقدم التقرير تحليلا شاملا للبيانات."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "الأدب والفن", examples: ["نظمت المدرسة عرضًا فنيًا."] },
      { meaning: "الفنون", examples: ["تخصصت في إدارة الفنون في الجامعة."] },
      { meaning: "أدبي/فني", examples: ["لهذا المقهى أجواء فنية جدا."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "قوات مسلحة", examples: ["أنهى الجنود تسليح أنفسهم."] },
      { meaning: "أسلحة/معدات", examples: ["يفتقر هذا الفريق إلى الأسلحة والمعدات الضرورية."] },
      { meaning: "يسلح/يجهز", examples: ["جهزوا فريق الإنقاذ بتقنية جديدة."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "ينسق", examples: ["تنسيق الألوان متناغم جدًا."] },
      { meaning: "منسق", examples: ["كانت إجراءات جميع الأقسام منسقة جيدا."] },
      { meaning: "متناغم", examples: ["ألوان هذه اللوحة متناغمة جدا."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "يكبت/يقمع", examples: ["عبّر عمّا كان يكبته من مشاعر."] },
      { meaning: "قمعي/خانق", examples: ["كان الجو في غرفة الاجتماعات خانقا."] },
      { meaning: "مكتئب", examples: ["جعلته الإخفاقات المتتالية مكتئبا جدا."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "يستنتج", examples: ["جسّد الممثل حياةَ شخصٍ مسنّ."] },
      { meaning: "يفسر/يجسد/يؤدي", examples: ["جسدت البطلة بدقة كبيرة."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "وعي/إدراك", examples: ["أدرك أن المشكلة خطيرة جدًا."] },
      { meaning: "يدرك/يعي", examples: ["أدرك أخيرا خطورة المشكلة."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "أصلي", examples: ["تُحفظ هنا غابة بدائية."] },
      { meaning: "بدائي", examples: ["لا تزال القرية تحافظ على أساليب زراعة بدائية."] },
      { meaning: "غابر/بدائي جدا", examples: ["يدرس العلماء بيئة الغابات البدائية القديمة."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "يربط", examples: ["وخزته الممرضة مرة واحدة."] },
      { meaning: "يوخز/يغرز", examples: ["وخزت الإبرة إصبعها فألمها."] },
      { meaning: "يدخل", examples: ["غرس الزهور في المزهرية."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "يكسر/يكسر عظما", examples: ["طوى الخريطة."] },
      { meaning: "يطوي", examples: ["طوت الرسالة ووضعتها في الظرف."] },
      { meaning: "خصم", examples: ["هذا المعطف عليه خصم ثلاثين بالمئة اليوم."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "ذكاء", examples: ["غيّرت الهواتف الذكية الحياة."] },
      { meaning: "ذكي", examples: ["اشترى ثلاجة ذكية."] },
      { meaning: "ذكاء اصطناعي", examples: ["يغير الذكاء الاصطناعي الخدمات الطبية."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "مشرف/الشخص المسؤول", examples: ["سيقوم المشرف بتفقد العمل غدًا."] },
      { meaning: "يتولى مسؤولية", examples: ["هي مسؤولة عن الأعمال المالية للشركة."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "موضوع/محور خاص", examples: ["ناقش الاجتماع اليوم موضوعًا بيئيًا."] },
      { meaning: "ميزة/موضوع بارز", examples: ["تتضمن أخبار الليلة فقرة خاصة عن البيئة."] },
      { meaning: "موضوعي", examples: ["أطلق المتحف معرضا موضوعيا."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "وضعية/وقفة", examples: ["تحافظ على وضعية جيدة."] },
      { meaning: "موقف/اتجاه", examples: ["حافظت الحكومة على موقف منفتح تجاه المفاوضات."] },
    ],
  },
  "de": {
    "hsk6-bajie-20": [
      { meaning: "schmeicheln", examples: ["Er will keine Chancen bekommen, indem er anderen schmeichelt."] },
      { meaning: "sich bei jemandem einschmeicheln", examples: ["Er versucht ständig, sich bei seinem Chef einzuschmeicheln, um befördert zu werden."] },
      { meaning: "sich bei jemandem beliebt machen", examples: ["Um in diesen Kreis aufgenommen zu werden, schmeichelte er sich bewusst bei mehreren Prominenten ein."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "erstattet bekommen", examples: ["Nach der Dienstreise nahm er die Rechnung mit, um sie erstatten zu lassen."] },
      { meaning: "Ausgaben zur Erstattung einreichen", examples: ["Nach der Dienstreise reichte sie die Zugtickets zur Erstattung ein."] },
      { meaning: "abschreiben/verschrotten", examples: ["Die alte Maschine lässt sich nicht reparieren und kann nur verschrottet werden."] },
    ],
    "hsk6-bise-101": [
      { meaning: "blockiert/verschlossen", examples: ["Hier ist der Verkehr abgeschnitten, daher verbreiten sich Nachrichten nur langsam."] },
      { meaning: "abgelegen", examples: ["Dieses Bergdorf war früher sehr abgeschieden, und Außenstehende kamen selten dorthin."] },
      { meaning: "rückständig oder schlecht informiert", examples: ["Schlecht informiert zu sein kann dazu führen, dass ein Unternehmen Chancen verpasst."] },
    ],
    "hsk6-bing-135": [
      { meaning: "Note C", examples: ["Bei dieser Prüfung war seine Note C."] },
      { meaning: "dritter", examples: ["Die drei als A, B und C aufgeführten Personen müssen alle sprechen."] },
      { meaning: "dritter Himmelsstamm", examples: ["Bing ist der dritte der Himmlischen Stämme."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "vor nichts zurückschrecken", examples: ["Um den Wettbewerb zu gewinnen, schreckt er vor nichts zurück."] },
      { meaning: "jedes Mittel einsetzen", examples: ["Um Kunden zu gewinnen, nutzt er jedes Mittel, um die Preise zu drücken."] },
      { meaning: "mit fairen oder unfairen Mitteln", examples: ["Dieses Unternehmen erweitert seinen Markt mit allen erlaubten und unerlaubten Mitteln."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "sich zurückziehen", examples: ["Alle begannen, sich zurückzuziehen."] },
      { meaning: "abziehen", examples: ["Bevor der Starkregen eintraf, zog sich das Team aus dem Tal zurück."] },
      { meaning: "sich zurückziehen", examples: ["Das feindliche Feuer war zu stark, daher mussten sich die Fronttruppen zurückziehen."] },
    ],
    "hsk6-chili-275": [
      { meaning: "anstrengend", examples: ["Dieses Buch ist zu schwer, es ist mühsam, es hochzuheben."] },
      { meaning: "mühsam", examples: ["Dieses Klavier zu transportieren ist wirklich mühsam."] },
      { meaning: "Schwierigkeiten haben, etwas zu tun", examples: ["Er hat etwas Mühe, schnelle Nachrichtensendungen zu verstehen."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "Disziplinarmaßnahme", examples: ["Er hat gegen die Disziplin verstoßen und wurde von der Schule disziplinarisch bestraft."] },
      { meaning: "Strafe", examples: ["Er erhielt eine strenge Strafe wegen Betrugs."] },
      { meaning: "behandeln/sich befassen mit", examples: ["Diese Warenpartie muss so schnell wie möglich abgewickelt werden."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "sich behelfen", examples: ["Dieses Essen kann ruhig einfach sein – wir behelfen uns damit."] },
      { meaning: "improvisieren", examples: ["Die Band improvisierte in letzter Minute ein Eröffnungsstück."] },
      { meaning: "passabel/nicht allzu schlecht", examples: ["Das Essen in diesem kleinen Laden ist ganz passabel."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "losschießen/huschen", examples: ["Die Katze schoss plötzlich in die Küche."] },
      { meaning: "fliehen", examples: ["Der Täter floh im Chaos durch die Hintertür."] },
      { meaning: "Text verändern/manipulieren", examples: ["Er änderte das Vertragsdatum ohne Genehmigung."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "schlimmstenfalls", examples: ["Im schlimmsten Fall kommen wir morgen einfach noch einmal."] },
      { meaning: "nicht mehr als", examples: ["Diese Arbeit kann in höchstens zwei Tagen erledigt werden."] },
      { meaning: "in verneinten Kontexten keine große Sache", examples: ["Einen Bus zu verpassen ist keine große Sache."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "beteiligte Person", examples: ["Wir müssen uns die Erklärung der beteiligten Person anhören."] },
      { meaning: "betroffene Partei", examples: ["Die Einzelheiten des Unfalls müssen mit der betroffenen Partei überprüft werden."] },
      { meaning: "Prozesspartei", examples: ["Die beiden Prozessparteien sind vor Gericht erschienen, um auszusagen."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "bankrottgehen", examples: ["Wegen schlechter Geschäftsführung musste das Restaurant letztes Jahr schließen."] },
      { meaning: "schließen", examples: ["Die Miete war zu hoch, daher musste diese Buchhandlung schließen."] },
      { meaning: "als Unternehmen scheitern", examples: ["Als der Geldfluss abriss, scheiterte das Unternehmen schnell."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "trennen", examples: ["Er beschloss, mit seinen früheren schlechten Gewohnheiten zu brechen."] },
      { meaning: "abschneiden", examples: ["Der Schneesturm schnitt die Verkehrsverbindung zum Bergdorf ab."] },
      { meaning: "Beziehungen abbrechen", examples: ["Nach dem Streit brachen sie den Kontakt ab."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "ein Versprechen einlösen/erfüllen", examples: ["Er hat endlich sein ursprüngliches Versprechen eingelöst."] },
      { meaning: "einen Scheck einlösen", examples: ["Er ging zur Bank, um einen Scheck einzulösen."] },
      { meaning: "in Bargeld umwandeln", examples: ["Diese Punkte können vor Monatsende in Bargeld umgewandelt werden."] },
    ],
    "hsk6-fan-504": [
      { meaning: "Zähleinheitswort für Rede/Handlung", examples: ["Diese Erklärung war sehr klar."] },
      { meaning: "eine Runde/Periode", examples: ["Nach einer Diskussionsrunde stimmten alle dem Plan zu."] },
      { meaning: "Art/Sorte", examples: ["Diese Art von Szene ist für mich unvergesslich."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "in einem Umkreis von", examples: ["Im Umkreis von zehn Kilometern gibt es kein Krankenhaus."] },
      { meaning: "umliegendes Gebiet", examples: ["Die Glocke ist in der umliegenden Gegend über mehrere Li hinweg zu hören."] },
      { meaning: "Umfang", examples: ["Die Arbeiter messen den Umfang des Blumenbeets."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "besuchen", examples: ["Der Reporter wird morgen den Schulleiter interviewen."] },
      { meaning: "interviewen", examples: ["Der Reporter wird morgen den preisgekrönten Regisseur interviewen."] },
      { meaning: "zugreifen", examples: ["Nutzer können auf diese Website nicht zugreifen."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "oberflächlich handeln", examples: ["Fertig mich nicht ab, bitte antworte ernsthaft."] },
      { meaning: "abwimmeln", examples: ["Der Manager speiste den Kunden mit ein paar leeren Worten ab."] },
      { meaning: "sich irgendwie durchwursteln", examples: ["Er war unvorbereitet und konnte sich nur irgendwie durch den Bericht durchmogeln."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "nachplappern", examples: ["Sobald andere etwas sagen, stimmt er ihnen nachplappernd zu."] },
      { meaning: "einstimmen", examples: ["Sobald sie den Vorschlag machte, stimmten die Leute in der Nähe sofort ein."] },
      { meaning: "unkritisch zustimmen", examples: ["Stimme nicht unkritisch allem zu, was andere sagen."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "angegliedert", examples: ["Dieses Krankenhaus ist ein dem Campus angeschlossenes Krankenhaus."] },
      { meaning: "angeschlossen", examples: ["Dem Vertrag wurden am Ende drei Listen beigefügt."] },
      { meaning: "untergeordnet", examples: ["Diese Abteilung ist nur eine untergeordnete Einheit."] },
      { meaning: "zusätzlich", examples: ["Der Parkplatz ist eine Nebeneinrichtung des Hotels."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "loben", examples: ["Der Film pries die Arbeiter."] },
      { meaning: "preisen", examples: ["Die Trauerrede pries seine selbstlose Hingabe."] },
      { meaning: "rühmen", examples: ["Der Dichter preist die Kraft des Meeres."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "offen", examples: ["Er hat die Vorschriften offen verletzt."] },
      { meaning: "öffentlich", examples: ["Er widersprach der Entscheidung öffentlich in der Sitzung."] },
      { meaning: "dreist", examples: ["Er log dreist, ohne auch nur im Geringsten verlegen zu sein."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "enttäuschen", examples: ["Ich möchte die Hoffnungen meiner Eltern nicht enttäuschen."] },
      { meaning: "enttäuschen", examples: ["Enttäusche die Erwartungen deiner Eltern nicht."] },
      { meaning: "den Erwartungen nicht gerecht werden", examples: ["Er wurde dem Vertrauen seines Lehrers gerecht."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "letztlich", examples: ["Letztlich ist Gesundheit am wichtigsten."] },
      { meaning: "letztlich betrachtet", examples: ["Letztlich ist Qualität das Entscheidende."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "wünschen, man könnte", examples: ["Er würde am liebsten sofort nach Hause."] },
      { meaning: "unbedingt wollen", examples: ["Nachdem er die gute Nachricht gehört hatte, wollte er unbedingt sofort nach Hause."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "Sorgen über Folgen", examples: ["Mit diesem Geld hat er keine Sorgen mehr im Rücken."] },
      { meaning: "Sorgen um die Heimatfront", examples: ["Da seine Familie gut versorgt war, hatte er auf Dienstreise keine Sorgen um Zuhause."] },
      { meaning: "anhaltende Sorge", examples: ["Nachdem die Finanzierung gesichert war, hatte das Projektteam keine verbleibenden Sorgen mehr."] },
    ],
    "hsk6-huali-790": [
      { meaning: "prächtig", examples: ["Sie trägt prächtige Kleidung."] },
      { meaning: "großartig", examples: ["In der Halle hängt ein prächtiger Kristallleuchter."] },
      { meaning: "prunkvoll", examples: ["Die Stickerei auf diesem Abendkleid ist kunstvoll verziert."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "Organisation", examples: ["Diese Organisation hilft älteren Menschen."] },
      { meaning: "Institution", examples: ["Diese Institution ist auf Forschung im Bereich öffentliche Gesundheit spezialisiert."] },
      { meaning: "Mechanismus", examples: ["Der innere Mechanismus der Uhr ist äußerst präzise."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "sich über etwas aufregen", examples: ["Sei nicht zu kleinlich bei Kleinigkeiten."] },
      { meaning: "um etwas feilschen", examples: ["Der Verkäufer feilschte immer noch um zwei Yuan."] },
      { meaning: "sich an etwas stören", examples: ["Mir ist egal, wer sich zuerst entschuldigt."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "zertrampeln", examples: ["Den Rasen nicht betreten."] },
      { meaning: "auf etwas treten", examples: ["Bitte tritt nicht auf den neu angelegten Rasen."] },
      { meaning: "verletzen", examples: ["Diese Anordnung verletzte die Rechte der Bürger."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "Ruder", examples: ["Das Ruder am Boot ist gebrochen."] },
      { meaning: "Paddel", examples: ["Er benutzte ein Paddel, um das Boot zurück ans Ufer zu rudern."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "empfindlich", examples: ["Sei nicht so zimperlich, wir sind gleich da."] },
      { meaning: "verwöhnt", examples: ["Er wurde von Kindheit an verwöhnt und wurde sehr verzogen."] },
      { meaning: "keine Härten ertragen können", examples: ["Nach nur zwei Kilometern klagte er über Müdigkeit; er hält wirklich keine Mühen aus."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juǎn aufrollen/kräuseln", examples: ["Sie rollte das Bild zusammen und legte es ordentlich weg."] },
      { meaning: "juàn Band/Schriftrolle", examples: ["Auf dem Bücherregal lag eine Rolle mit alter Malerei."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "offen/selbstsicher und ausführlich sprechen", examples: ["Er sprach auf der Bühne ganz selbstsicher und war überhaupt nicht nervös."] },
      { meaning: "fließend sprechen", examples: ["Er kann auch ohne Manuskript flüssig sprechen."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "ernsthaft", examples: ["Er bat in einem eindringlichen Ton um Hilfe."] },
      { meaning: "aufrichtig", examples: ["Ihre Entschuldigung war sehr aufrichtig."] },
      { meaning: "von Herzen kommend", examples: ["Er dankte den Dorfbewohnern von Herzen für ihre Hilfe."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "unfair behandeln", examples: ["Die Firma hat die langjährigen Mitarbeiter nicht benachteiligt."] },
      { meaning: "benachteiligen", examples: ["Der Chef kürzt erfahrenen Mitarbeitern nie die Boni."] },
      { meaning: "misshandeln", examples: ["Er wollte dieses alte Pferd nicht schlecht behandeln."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "kalt", examples: ["Seine Antwort wirkte sehr kalt."] },
      { meaning: "gefühllos", examples: ["Er wirkte gegenüber dem Leiden des Patienten sehr gefühllos."] },
      { meaning: "rücksichtslos", examples: ["Der General erließ einen rücksichtslosen Hinrichtungsbefehl."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "fassungslos sein", examples: ["Als er die Nachricht hörte, erstarrte er einen Moment."] },
      { meaning: "erstarren", examples: ["Die Tür öffnete sich plötzlich, und er erstarrte auf der Stelle."] },
      { meaning: "abgelenkt sein", examples: ["Lass dich im Unterricht nicht ständig ablenken und aus dem Fenster starren."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "Interessenlage", examples: ["Er verstand schließlich, was bei der Sache auf dem Spiel stand."] },
      { meaning: "Vor- und Nachteile", examples: ["Überlege dir vor der Unterschrift die Vor- und Nachteile gut."] },
      { meaning: "Ernsthaftigkeit", examples: ["Er hat den Ernst des Problems immer noch nicht erkannt."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "begraben", examples: ["Die hektische Arbeit ließ sein Talent untergehen."] },
      { meaning: "verdecken", examples: ["Der Lärm übertönte ihren Gesang."] },
      { meaning: "Talent unerkannt lassen", examples: ["Lass nicht zu, dass Routineaufgaben sein Talent begraben."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "einen Schritt machen", examples: ["Er betrat das Klassenzimmer ganz nervös."] },
      { meaning: "schreiten", examples: ["Er schritt mit großen Schritten zum Konferenzsaal."] },
      { meaning: "hineintreten", examples: ["Das Unternehmen tritt in den internationalen Markt ein."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "Tinte", examples: ["Die Tinte ist alle."] },
      { meaning: "Buchwissen/Kultur", examples: ["Er hat wirklich einiges an Bildung."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "Blick", examples: ["Der Blick der Lehrkraft blieb an der Tafel hängen."] },
      { meaning: "Blick", examples: ["Sie warf einen ermutigenden Blick zu."] },
      { meaning: "Sehkraft/Vision", examples: ["Sein Sehvermögen erholte sich schnell."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "Hintergrundgeschichte", examples: ["Der Reporter wollte die Hintergründe des Vorfalls verstehen."] },
      { meaning: "Insiderinformation", examples: ["Der Reporter erhielt Insiderinformationen über den Deal."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "entwerfen", examples: ["Wir entwerfen gerade einen neuen Plan."] },
      { meaning: "ausarbeiten", examples: ["Die Sekretärin erstellt gerade die Tagesordnung der Sitzung."] },
      { meaning: "formulieren", examples: ["Experten formulierten neue Bewertungsstandards."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "hochstehen/hochheben", examples: ["Er hat die Füße auf dem Stuhl hochgelegt."] },
      { meaning: "abstützen", examples: ["Er stützte das Brett hoch, um das Rad zu blockieren."] },
      { meaning: "sich nach oben biegen", examples: ["Die Ecke des Papiers bog sich nach oben, nachdem sie nass geworden war."] },
      { meaning: "herausragend", examples: ["Er ist ein herausragender Schüler in der Klasse."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "beharrlich bleiben", examples: ["Solange du beharrlich dranbleibst, wirst du Fortschritte machen."] },
      { meaning: "dranbleiben", examples: ["Solange du dranbleibst, wird das schwierige Problem irgendwann gelöst."] },
      { meaning: "ausdauernd sein", examples: ["Sie untersuchte beharrlich die Wahrheit."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "beliebt", examples: ["Dieser Kurs ist sehr beliebt."] },
      { meaning: "gefragt", examples: ["Datenanalyst ist zu einer gefragten Position geworden."] },
      { meaning: "angesagt/heiß", examples: ["Dieser Tanz liegt in letzter Zeit im Trend."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "feststellen", examples: ["Das Gericht stellte fest, dass der Vertrag rechtmäßig war."] },
      { meaning: "identifizieren als", examples: ["Die Polizei identifizierte ihn als Verdächtigen."] },
      { meaning: "fest glauben", examples: ["Sie glaubt fest daran, dass harte Arbeit sich auszahlen wird."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "billigen", examples: ["Seine Anstrengungen fanden die Zustimmung aller."] },
      { meaning: "anerkennen", examples: ["Die internationale Organisation erkannte diesen Standard an."] },
      { meaning: "Akzeptanz/Anerkennung", examples: ["Dieser Plan erhielt die Zustimmung des Teams."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "Zähleinheitswort für Schiffe/Fahrzeuge", examples: ["Im Hafen liegen drei Schiffe."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "endlos reden", examples: ["Sobald er über Geschichte spricht, redet er ohne Ende."] },
      { meaning: "ununterbrochen/fließend sprechen", examples: ["Der Moderator begann gleich zu Beginn der Veranstaltung ununterbrochen zu sprechen."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "Allzweck-", examples: ["Diese Methode ist allgemein anwendbar."] },
      { meaning: "allgemein verwendet/anwendbar", examples: ["Diese Art von Stecker ist in Europa allgemein gebräuchlich."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "Wahnvorstellung", examples: ["Fantasier nicht davon, ohne Anstrengung Erfolg zu haben."] },
      { meaning: "vergebliche Hoffnung", examples: ["Erfolg ohne Anstrengung ist nur eine vergebliche Hoffnung."] },
      { meaning: "fantasieren", examples: ["Er fantasiert den ganzen Tag davon, über Nacht reich zu werden."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "andauern für", examples: ["Die Fortbildung dauert drei Monate."] },
      { meaning: "für einen Zeitraum von", examples: ["Die Schulung dauert drei Monate."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "Stoffwechsel", examples: ["Sport kann den Stoffwechsel anregen."] },
      { meaning: "Ersetzung des Alten durch Neues", examples: ["Der Austausch des Alten durch Neues in der Branche beschleunigt sich."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "mühevolle Anstrengung", examples: ["In dieses Buch hat er sehr viel Herzblut gesteckt."] },
      { meaning: "in etwas gesteckte Mühe/Hingabe", examples: ["Dieses Buch verkörpert zehn Jahre ihrer hingebungsvollen Arbeit."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "übermäßig trinken", examples: ["Dauerhaftes Rauschtrinken beeinträchtigt die Gesundheit."] },
      { meaning: "Alkoholmissbrauch", examples: ["Langjähriger Alkoholmissbrauch schadete seiner Gesundheit."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "pressen/quetschen", examples: ["Chefs dürfen Arbeiter nicht ausbeuten."] },
      { meaning: "ausbeuten", examples: ["Die skrupellose Fabrik beutete Leiharbeiter aus."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "Sehkraft", examples: ["Der Manager hat ein sehr gutes Urteilsvermögen."] },
      { meaning: "Urteilsvermögen", examples: ["Sie hat ein gutes Urteilsvermögen bei der Auswahl von Partnern."] },
      { meaning: "Einsicht", examples: ["Dieser Redakteur hat eine einzigartige Einsicht."] },
      { meaning: "Geschmack", examples: ["Sein Geschmack ist wählerisch; er kauft nur klassische Modelle."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "Ton/Audio", examples: ["Die Soundanlage im Zimmer ist zu laut."] },
      { meaning: "Soundsystem/Stereoanlage", examples: ["Für das Wohnzimmer wurde eine neue Stereoanlage gekauft."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "Kläger", examples: ["Der Kläger schilderte dem Gericht die Situation."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "schwanger sein mit", examples: ["Das Land bringt reiches Leben hervor."] },
      { meaning: "hervorbringen", examples: ["Das Feuchtgebiet bringt viele Arten von Wasservögeln hervor."] },
      { meaning: "nähren", examples: ["Die Schule brachte eine Gruppe junger Wissenschaftler hervor."] },
      { meaning: "entstehen lassen", examples: ["Die Krise brachte neue Chancen hervor."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "anlässlich", examples: ["Anlässlich des Abschlusses hoffte der Lehrer, dass alle erfolgreich sein würden."] },
      { meaning: "zur Zeit von", examples: ["Zur Zeit des Abschlusses schrieb er einen Brief, um seinem Lehrer zu danken."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "regieren/verwalten", examples: ["Die Regierung geht gegen die Umweltverschmutzung vor."] },
      { meaning: "verwalten/behandeln", examples: ["Die Fabrik begann mit der Behandlung von Abwasser."] },
      { meaning: "Regierungsführung", examples: ["Unternehmensführung braucht Transparenz."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "festsitzen", examples: ["Der starke Schneefall ließ viele Menschen am Flughafen stranden."] },
      { meaning: "festgehalten werden", examples: ["Er wurde wegen eines Dokumentenproblems am Flughafen festgehalten."] },
      { meaning: "zurückbleiben", examples: ["Die Freiwilligen blieben vor Ort zurück, um Müll aufzuräumen."] },
      { meaning: "Zurückbehaltung", examples: ["Die Untersuchung zeigte eine Zurückhaltung von Nahrung im Magen."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "Schwerpunkt", examples: ["Bitte senke den Körperschwerpunkt."] },
      { meaning: "Fokus/Kern", examples: ["Der Schwerpunkt der diesjährigen Arbeit ist Qualität."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "feierlich", examples: ["Er ist sehr förmlich gekleidet."] },
      { meaning: "würdevoll", examples: ["Ihr Auftreten ist würdevoll und angemessen."] },
      { meaning: "förmlich", examples: ["Bitte halten Sie die Rede in einem formellen Ton."] },
    ],
    "hsk6-ai-1": [
      { meaning: "āi neben/nahe bei sein", examples: ["Bitte setzt euch dicht zusammen; hinten kommen noch Leute."] },
      { meaning: "ái erleiden/erdulden", examples: ["Er musste eine Runde Kritik einstecken."] },
    ],
    "hsk6-ao-15": [
      { meaning: "köcheln/einkochen", examples: ["Mama ließ die Fischsuppe zwei Stunden lang köcheln."] },
      { meaning: "erdulden", examples: ["Diese schwierige Zeit wurde endlich durchgestanden."] },
      { meaning: "lange aufbleiben", examples: ["Er blieb bis in die frühen Morgenstunden wach, bevor er schlief."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "Bequemlichkeit", examples: ["Die neue U-Bahn-Station bringt den Bewohnern viel Bequemlichkeit."] },
      { meaning: "praktisch", examples: ["Der Verkehr hier ist sehr praktisch."] },
      { meaning: "erleichtern", examples: ["Das neue System erleichterte den Erstattungsprozess."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "nicht ertragen können", examples: ["Das Zimmer war unerträglich unordentlich."] },
      { meaning: "unerträglich/furchtbar", examples: ["Das Zimmer war unerträglich stickig und heiß."] },
      { meaning: "in schlechtem Zustand", examples: ["Das alte Gebäude ist bereits stark heruntergekommen."] },
    ],
    "hsk6-chan-221": [
      { meaning: "Heißhunger auf Essen haben", examples: ["Sobald mein kleiner Bruder den Kuchen sah, bekam er richtig Appetit darauf."] },
      { meaning: "gierig nach Essen", examples: ["Sobald Essenszeit ist, wird er besonders gierig nach Essen."] },
      { meaning: "gefräßig", examples: ["Dieses Kind ist so gefräßig, dass es Snacks nimmt, sobald es sie sieht."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "stumpf", examples: ["Dieses Messer wurde lange benutzt und ist schon etwas stumpf."] },
      { meaning: "begriffsstutzig", examples: ["Seine Reaktionen sind etwas schwerfällig."] },
      { meaning: "träge", examples: ["Der Computer läuft träge."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "verkaufen", examples: ["Freunde für Geld zu verraten ist falsch."] },
      { meaning: "verraten/ausverkaufen", examples: ["Er verriet das Vertrauen seines Freundes."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "bedienen", examples: ["Sie kümmert sich sorgfältig um ihre kranke Mutter."] },
      { meaning: "aufwarten", examples: ["Die Krankenschwester bediente den Patienten beim Essen aufmerksam."] },
      { meaning: "sich kümmern um", examples: ["Sie kümmert sich zu Hause um ihre alte Mutter."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "eine Abschlussarbeit verteidigen", examples: ["Er nimmt an der Abschlussverteidigung teil."] },
      { meaning: "mündliche Verteidigung", examples: ["Sie nimmt morgen an ihrer mündlichen Verteidigung der Abschlussarbeit teil."] },
      { meaning: "auf Einwände antworten", examples: ["Er beantwortete die Einwände ruhig und reagierte auf die Zweifel."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dàyi nachlässig", examples: ["Er war zu unachtsam und ließ seinen Pass zu Hause liegen."] },
      { meaning: "dàyì Hauptgedanke/allgemeine Bedeutung", examples: ["Bitte fassen Sie zuerst die Hauptaussage des Artikels zusammen."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "Rückseite/Gegenseite", examples: ["Diese Geschichte hat auch eine negative Lehre."] },
      { meaning: "negativer Aspekt/Beispiel", examples: ["Dieser Fall ist ein negatives Beispiel."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "abbauen", examples: ["Der Lehrer gliederte das Problem in mehrere Teile auf."] },
      { meaning: "aufspalten/analysieren", examples: ["Der Lehrer zerlegte die schwierige Aufgabe in drei Schritte."] },
      { meaning: "zersetzen", examples: ["Bakterien können Laub zersetzen."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "rundlich/voll", examples: ["Dieser Artikel ist inhaltlich sehr gehaltvoll."] },
      { meaning: "reichlich", examples: ["Seine Fähigkeiten und seine Unterstützung sind nun reichlich vorhanden."] },
      { meaning: "reichhaltig/substanziell", examples: ["Der Inhalt des Berichts ist reichhaltig und überzeugend."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "verfault/zerfallen", examples: ["Morsches Holz bricht leicht."] },
      { meaning: "dekadent/verfallend", examples: ["Das dekadente System muss geändert werden."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "tief bewegt sein", examples: ["Als er das alte Foto sah, wurde er sehr wehmütig."] },
      { meaning: "vor Rührung seufzen", examples: ["Beim Anblick des alten Fotos seufzte er voller Gefühle."] },
      { meaning: "Gedanken/Gefühle", examples: ["Sie schrieb ihre Eindrücke von der Reise nieder."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "Ackerland/kultiviertes Land", examples: ["Der Bauer pflügt gerade das Feld."] },
      { meaning: "Land bestellen/pflügen", examples: ["Im Frühling beginnen die Bauern, das Land zu pflügen."] },
    ],
    "hsk6-heng-768": [
      { meaning: "waagerecht", examples: ["Er stand seitlich in der Tür."] },
      { meaning: "seitwärts/quer", examples: ["Er stellte den Tisch seitlich hin."] },
      { meaning: "grob/unvernünftig", examples: ["Er spricht zu grob."] },
    ],
    "hsk6-hong-769": [
      { meaning: "zureden", examples: ["Der Vater wiegt das Kind in den Schlaf."] },
      { meaning: "beruhigen", examples: ["Sie beruhigte das Kind leise, bis es einschlief."] },
      { meaning: "täuschen/tricksen", examples: ["Täusch mich nicht mit falschen Informationen."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "wiederherstellen", examples: ["Bitte rekonstruieren Sie den Tatort/Schauplatz einmal."] },
      { meaning: "rekonstruieren", examples: ["Die Polizei bemühte sich, den Ablauf des Vorfalls zu rekonstruieren."] },
      { meaning: "chemisch reduzieren", examples: ["Wasserstoff kann Kupferoxid chemisch reduzieren."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "flexibel", examples: ["Der Plan enthält flexible Zeitpuffer."] },
      { meaning: "mobil", examples: ["Das mobile Team kann jederzeit Unterstützung leisten."] },
      { meaning: "motorisiert", examples: ["Ein motorisiertes Dreirad steht am Eingang."] },
      { meaning: "manövrieren", examples: ["Die Truppen manövrierten im Gebirge."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "spitze Spitze", examples: ["Das Unternehmen nutzt Spitzentechnologie."] },
      { meaning: "Spitzen-", examples: ["Das Unternehmen entwickelt Spitzentechnologie-Chips."] },
      { meaning: "fortschrittlich", examples: ["Dieses Krankenhaus verfügt über moderne Geräte."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "Selbstkritik", examples: ["Er schrieb eine Selbstkritik."] },
      { meaning: "überprüfen/untersuchen", examples: ["Nach der Besprechung überprüften wir die Schwachstellen des Plans."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "Spion", examples: ["Der Spion im Film ist sehr clever."] },
      { meaning: "Spionageagent", examples: ["An der Grenze wurde ein ausländischer Spionageagent entdeckt."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "was man sieht und hört", examples: ["Reisen hat seine Erfahrungen und Kenntnisse erweitert."] },
      { meaning: "Wissen und Erfahrung", examples: ["Das Reisen erweiterte sein Wissen und seine Erfahrung."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "solide/vollständig", examples: ["Das Unternehmen muss sein Managementsystem verbessern und vervollständigen."] },
      { meaning: "verbessern/vervollkommnen", examples: ["Die Regierung wird den Aufsichtsmechanismus verbessern."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "erklären", examples: ["Der Manager hat die Aufgabe klar erläutert."] },
      { meaning: "Rechenschaft ablegen", examples: ["Er muss Rechenschaft darüber ablegen, wohin die Gelder gingen."] },
      { meaning: "übergeben", examples: ["Bitte übergeben Sie die Arbeit dem neuen Kollegen."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "bereit/gern bereit sein", examples: ["Ich helfe dir gern beim Umzug."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "selbstverständlich", examples: ["Betrachte Hilfe nicht als etwas Selbstverständliches."] },
      { meaning: "als selbstverständlich ansehen", examples: ["Er hält die Hilfe anderer für selbstverständlich."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "durchnässen", examples: ["Er wurde mit Wasser durchnässt."] },
      { meaning: "gießen/besprengen", examples: ["Sie goss Honig über den Kuchen."] },
      { meaning: "nass werden", examples: ["Er vergaß seinen Regenschirm und wurde vom Regen durchnässt."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "sich als jemand ausgeben", examples: ["Jemand gab sich als Arzt aus, um ältere Menschen zu betrügen."] },
      { meaning: "vorgeben zu sein", examples: ["Er gab vor, Reporter zu sein, um den Veranstaltungsort zu betreten."] },
      { meaning: "sich ausgeben als", examples: ["Sie gab sich als Expertin aus, um Vertrauen zu gewinnen."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "Zähleinheitswort für kleine flache/runde Gegenstände wie Münzen, Ringe, Medaillen, Briefmarken", examples: ["Sie hat einen Ring gekauft."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "gegen den Verkehr fahren", examples: ["Auf dieser Straße ist das Fahren in die falsche Richtung verboten."] },
      { meaning: "rückwärts/in die falsche Richtung fahren", examples: ["Das Auto fuhr auf einer Einbahnstraße in die falsche Richtung."] },
      { meaning: "retrograd", examples: ["Neptun hat eine rückläufige Bewegung."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "zusammenhalten", examples: ["Dieses Ziel bündelte die Kräfte aller."] },
      { meaning: "sammeln/mobilisieren", examples: ["Dieser Sieg bündelte das Vertrauen des ganzen Teams."] },
      { meaning: "kondensieren", examples: ["Kalte Luft kondensiert Wasserdampf zu Nebel."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "ausrüsten", examples: ["Die Schule hat die Klassenräume mit Computern ausgestattet."] },
      { meaning: "versehen mit", examples: ["Die Schule stattete jedes Klassenzimmer mit Klimaanlage aus."] },
      { meaning: "Ausrüstung", examples: ["Die Feuerwehrausrüstung wurde bereits ins Lager geliefert."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "sich stürzen auf", examples: ["Das Kind stürzte auf seine Mutter zu."] },
      { meaning: "flattern", examples: ["Der Schmetterling flatterte sanft mit den Flügeln zwischen den Blumen."] },
      { meaning: "sich auf etwas werfen", examples: ["Sobald das Kind hereinkam, warf es sich in die Arme seiner Mutter."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "Lücke", examples: ["Diese Tasse hat eine Absplitterung."] },
      { meaning: "Bresche", examples: ["Die Flut riss eine Bresche in den Damm."] },
      { meaning: "Absplitterung/Kerbe", examples: ["Am Rand der Tasse ist eine kleine Kerbe."] },
      { meaning: "Fehlbetrag", examples: ["Dem Unternehmen fehlen noch drei Millionen an Mitteln."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "manuell", examples: ["Eine Übersetzung von Hand ist genauer."] },
      { meaning: "menschengemacht", examples: ["Dieser menschengemachte Fluss verläuft durch den neuen Bezirk."] },
      { meaning: "künstlich", examples: ["Der Arzt schlug vor, dem Patienten ein künstliches Gelenk einzusetzen."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "andere Leute", examples: ["Belästige die anderen nicht."] },
      { meaning: "Haushalt/Familie", examples: ["Einige Haushalte wohnen am Fuß des Berges."] },
      { meaning: "umgangssprachlich ich/mich", examples: ["Ich habe mich schon entschuldigt, also sei nicht böse."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "ausströmen/verströmen", examples: ["Die Blume verströmt einen Duft."] },
      { meaning: "verteilen", examples: ["Freiwillige verteilten am Eingang Flugblätter."] },
      { meaning: "aussenden", examples: ["Das System sendet automatisch Benachrichtigungs-E-Mails aus."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "lebhaft", examples: ["Heute wirkt er sehr stolz."] },
      { meaning: "stolz/überheblich", examples: ["Nachdem er die neue Uniform angezogen hatte, wirkte er besonders stolz."] },
      { meaning: "Ausdruck/Miene", examples: ["Ihr Ausdruck wirkte etwas müde."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "unvertraut", examples: ["Er ist gerade erst angekommen, und die Umgebung ist ihm noch sehr ungewohnt."] },
      { meaning: "eingerostet", examples: ["Nach Jahren ohne Übung war seine Klaviertechnik eingerostet."] },
      { meaning: "nicht vertraut", examples: ["Nach dem Umzug standen wir unseren alten Nachbarn weniger nahe."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "Bündel/Strauß", examples: ["Auf dem Tisch steht ein Blumenstrauß."] },
      { meaning: "Lichtstrahl", examples: ["Ein Sonnenstrahl fiel ins Zimmer."] },
      { meaning: "Zähleinheitswort für Bündel", examples: ["Er schenkte ihr einen Strauß Rosen."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "formen", examples: ["Familienerziehung prägt den Charakter."] },
      { meaning: "prägen", examples: ["Der Handwerker formte eine Vase aus Ton."] },
      { meaning: "darstellen/erschaffen", examples: ["Der Roman porträtiert eine mutige Mutter."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "zählen/gültig sein", examples: ["Wenn du es versprochen hast, muss es auch gelten."] },
      { meaning: "sein Wort halten", examples: ["Er hält immer sein Wort."] },
      { meaning: "berechnen", examples: ["Er rechnete mit gesenktem Kopf."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "Lähmung", examples: ["Der Unfall legte den Verkehr lahm."] },
      { meaning: "lähmen", examples: ["Der Unfall lähmte sein linkes Bein."] },
      { meaning: "zum Stillstand bringen", examples: ["Der Schneesturm brachte den Stadtverkehr zum Stillstand."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "herausnehmen", examples: ["Er holte einen Schlüssel heraus."] },
      { meaning: "herausziehen", examples: ["Er zog den Schlüssel aus der Schublade."] },
      { meaning: "ausgraben", examples: ["Der Arbeiter grub Schlamm und Sand mit einer Schaufel aus."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "anpassen", examples: ["Musik kann ein angespanntes Leben etwas auflockern."] },
      { meaning: "erleichtern", examples: ["Musik kann angespannte Gefühle lindern."] },
      { meaning: "Abwechslung bringen/auffrischen", examples: ["Wochenendreisen können Abwechslung in ein eintöniges Leben bringen."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "Gesamtpläne machen und dabei alle Faktoren/Seiten berücksichtigen", examples: ["Führungskräfte sollten alle Seiten berücksichtigen."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "Gepäck aufgeben", examples: ["Der Koffer muss aufgegeben werden."] },
      { meaning: "zum Versand aufgeben", examples: ["Diese Medikamentencharge muss per Kühlkette zum Versand aufgegeben werden."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "vollständig", examples: ["Diese Materialsammlung ist sehr vollständig."] },
      { meaning: "voll ausgestattet", examples: ["Dieses Krankenhaus ist vollständig ausgestattet."] },
      { meaning: "umfassend", examples: ["Der Bericht bietet eine umfassende Datenanalyse."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "Literatur und Kunst", examples: ["Die Schule organisierte eine künstlerische Aufführung."] },
      { meaning: "Künste", examples: ["Sie studierte an der Universität Kunstmanagement."] },
      { meaning: "literarisch/künstlerisch", examples: ["Dieses Café hat eine sehr künstlerische Atmosphäre."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "Streitkräfte", examples: ["Die Soldaten haben sich bereits bewaffnet."] },
      { meaning: "Waffen/Ausrüstung", examples: ["Dieser Trupp hat nicht die nötigen Waffen und Ausrüstung."] },
      { meaning: "bewaffnen/ausrüsten", examples: ["Sie rüsteten das Rettungsteam mit neuer Technologie aus."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "koordinieren", examples: ["Die Farbkombination wirkt sehr harmonisch."] },
      { meaning: "koordiniert", examples: ["Die Maßnahmen aller Abteilungen waren gut koordiniert."] },
      { meaning: "harmonisch", examples: ["Die Farben dieses Gemäldes sind sehr harmonisch."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "unterdrücken/verdrängen", examples: ["Er sprach seine unterdrückten Gefühle aus."] },
      { meaning: "beklemmend", examples: ["Die Atmosphäre im Besprechungsraum war bedrückend."] },
      { meaning: "deprimiert", examples: ["Wiederholte Misserfolge machten ihn sehr niedergeschlagen."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "ableiten", examples: ["Der Schauspieler stellte das Leben eines älteren Menschen dar."] },
      { meaning: "interpretieren/darstellen/aufführen", examples: ["Sie verkörperte die Heldin mit großer Feinheit."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "Bewusstsein/Gewahrsein", examples: ["Er erkannte, dass das Problem sehr ernst ist."] },
      { meaning: "erkennen/sich bewusst sein", examples: ["Er erkannte schließlich den Ernst des Problems."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "ursprünglich", examples: ["Hier ist ein Urwald erhalten geblieben."] },
      { meaning: "primitiv", examples: ["Das Dorf bewahrt noch primitive Anbaumethoden."] },
      { meaning: "urzeitlich", examples: ["Wissenschaftler untersuchen die Ökologie von Urwäldern."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "binden", examples: ["Die Krankenschwester hat ihn einmal gepikst."] },
      { meaning: "stechen/einstechen", examples: ["Die Nadel stach schmerzhaft in ihren Finger."] },
      { meaning: "einführen", examples: ["Er steckte die Blumen in die Vase."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "brechen/frakturieren", examples: ["Er faltete die Karte zusammen."] },
      { meaning: "falten", examples: ["Sie faltete den Brief und steckte ihn in den Umschlag."] },
      { meaning: "Rabatt", examples: ["Dieser Mantel ist heute um dreißig Prozent reduziert."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "Intelligenz", examples: ["Smartphones haben das Leben verändert."] },
      { meaning: "intelligent/smart", examples: ["Er kaufte einen intelligenten Kühlschrank."] },
      { meaning: "KI", examples: ["KI verändert medizinische Dienstleistungen."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "Vorgesetzter/verantwortliche Person", examples: ["Der/die Vorgesetzte wird morgen die Arbeit kontrollieren."] },
      { meaning: "verantwortlich sein für", examples: ["Sie ist für die Finanzarbeit des Unternehmens zuständig."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "Spezialthema/-gegenstand", examples: ["Heute wurde in der Sitzung ein Umweltthema besprochen."] },
      { meaning: "Feature", examples: ["Die Nachrichten heute Abend haben ein Umwelt-Feature."] },
      { meaning: "thematisch", examples: ["Das Museum eröffnete eine thematische Ausstellung."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "Körperhaltung/Pose", examples: ["Sie bewahrt eine gute Körperhaltung."] },
      { meaning: "Haltung/Standpunkt", examples: ["Die Regierung behielt eine offene Haltung gegenüber den Verhandlungen bei."] },
    ],
  },
  "es": {
    "hsk6-bajie-20": [
      { meaning: "adular", examples: ["No está dispuesto a conseguir oportunidades a base de adular a los demás."] },
      { meaning: "hacer la pelota a", examples: ["Siempre intenta congraciarse con su jefe para conseguir un ascenso."] },
      { meaning: "congraciarse con", examples: ["Para entrar en ese círculo, se congració deliberadamente con varias celebridades."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "recibir reembolso", examples: ["Al volver del viaje de trabajo, llevó la factura para que se la reembolsaran."] },
      { meaning: "presentar gastos para reembolso", examples: ["Después de volver del viaje de negocios, presentó los boletos de tren para reembolso."] },
      { meaning: "dar de baja/desguazar", examples: ["Esa máquina vieja no se puede reparar y solo puede desecharse."] },
    ],
    "hsk6-bise-101": [
      { meaning: "bloqueado/cerrado", examples: ["Aquí el transporte está muy limitado, por eso las noticias llegan lentamente."] },
      { meaning: "aislado", examples: ["Este pueblo de montaña antes estaba muy aislado, y rara vez venía gente de fuera."] },
      { meaning: "atrasado o mal informado", examples: ["Estar mal informado puede hacer que una empresa pierda oportunidades."] },
    ],
    "hsk6-bing-135": [
      { meaning: "calificacion C", examples: ["En este examen, su calificación fue C."] },
      { meaning: "tercero", examples: ["Las tres personas enumeradas como A, B y C deben hablar."] },
      { meaning: "tercer Tronco Celestial", examples: ["Bing es el tercero de los Tallos Celestiales."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "no detenerse ante nada", examples: ["Para ganar la competición, no se detiene ante nada."] },
      { meaning: "usar cualquier medio", examples: ["Para ganar clientes, usa cualquier medio para bajar los precios."] },
      { meaning: "por las buenas o por las malas", examples: ["Esa empresa expande su mercado por las buenas o por las malas."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "retirarse", examples: ["Todos empezaron a retirarse."] },
      { meaning: "retirar(se)", examples: ["Antes de que llegara la tormenta, el equipo se retiró del valle."] },
      { meaning: "retroceder", examples: ["El fuego enemigo era demasiado intenso, así que las tropas del frente se vieron obligadas a replegarse."] },
    ],
    "hsk6-chili-275": [
      { meaning: "arduo", examples: ["Este libro pesa demasiado; levantarlo cuesta mucho."] },
      { meaning: "laborioso", examples: ["Mover este piano es realmente trabajoso."] },
      { meaning: "tener dificultad para hacer algo", examples: ["Tiene cierta dificultad para entender los noticieros rápidos."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "medida disciplinaria", examples: ["Violó la disciplina y recibió una sanción disciplinaria de la escuela."] },
      { meaning: "castigo", examples: ["Recibió un castigo severo por hacer trampa."] },
      { meaning: "manejar/tratar con", examples: ["Este lote de mercancías debe gestionarse lo antes posible."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "arreglarselas", examples: ["Esta comida puede ser sencilla; con apañarnos basta."] },
      { meaning: "improvisar", examples: ["La banda improvisó una melodía de apertura en el último momento."] },
      { meaning: "aceptable/no demasiado malo", examples: ["La comida de esta pequeña tienda es aceptable."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "abalanzarse/escabullirse rapidamente", examples: ["Ese gato se metió de golpe en la cocina."] },
      { meaning: "huir", examples: ["El delincuente huyó por la puerta trasera en medio del caos."] },
      { meaning: "alterar/manipular un texto", examples: ["Alteró la fecha del contrato sin autorización."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "en el peor de los casos", examples: ["En el peor de los casos, volvemos mañana otra vez."] },
      { meaning: "no mas de", examples: ["Este trabajo puede terminarse en no más de dos días."] },
      { meaning: "no es gran cosa en contextos negativos", examples: ["Perder un autobús no es gran cosa."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "persona involucrada", examples: ["Hay que escuchar la explicación de la persona implicada."] },
      { meaning: "parte interesada", examples: ["Los detalles del accidente deben verificarse con la parte interesada."] },
      { meaning: "litigante", examples: ["Los dos litigantes comparecieron ante el tribunal para testificar."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "quebrar", examples: ["Por una mala gestión, ese restaurante cerró el año pasado."] },
      { meaning: "cerrar", examples: ["El alquiler era demasiado alto, así que esa librería tuvo que cerrar."] },
      { meaning: "fracasar como negocio", examples: ["Cuando se rompió su flujo de fondos, la empresa fracasó rápidamente."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "cortar", examples: ["Decidió cortar lazos con sus malos hábitos del pasado."] },
      { meaning: "interrumpir", examples: ["La tormenta de nieve cortó el transporte hacia el pueblo de montaña."] },
      { meaning: "romper relaciones", examples: ["Después de la discusión, rompieron relaciones."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "cumplir una promesa", examples: ["Por fin cumplió la promesa que hizo al principio."] },
      { meaning: "cobrar un cheque", examples: ["Fue al banco a cobrar un cheque."] },
      { meaning: "convertir en efectivo", examples: ["Estos puntos pueden convertirse en efectivo antes de fin de mes."] },
    ],
    "hsk6-fan-504": [
      { meaning: "clasificador para discurso/accion", examples: ["Esta explicación ha sido muy clara."] },
      { meaning: "una ronda/periodo", examples: ["Después de una ronda de discusión, todos aceptaron el plan."] },
      { meaning: "tipo/clase", examples: ["Este tipo de escena es inolvidable para mí."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "dentro de un radio de", examples: ["No hay ningún hospital en un radio de diez kilómetros."] },
      { meaning: "zona circundante", examples: ["La campana se oye en toda la zona circundante a varios li de distancia."] },
      { meaning: "circunferencia", examples: ["Los trabajadores están midiendo la circunferencia del parterre."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "visitar", examples: ["El periodista entrevistará al director mañana."] },
      { meaning: "entrevistar", examples: ["El periodista entrevistará mañana al director premiado."] },
      { meaning: "acceder", examples: ["Los usuarios no pueden acceder a este sitio web."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "ser superficial", examples: ["No me despaches; por favor, responde en serio."] },
      { meaning: "despachar con evasivas", examples: ["El gerente despachó al cliente con unas pocas palabras vacías."] },
      { meaning: "salir del paso", examples: ["No estaba preparado y solo pudo salir del paso con el informe."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "hacerse eco", examples: ["En cuanto otros hablan, él les hace eco."] },
      { meaning: "intervenir apoyando", examples: ["En cuanto hizo la sugerencia, las personas cercanas se sumaron de inmediato."] },
      { meaning: "estar de acuerdo sin criterio", examples: ["No estés de acuerdo sin pensar con todo lo que dicen los demás."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "afiliado", examples: ["Este hospital está afiliado a una escuela."] },
      { meaning: "adjunto", examples: ["Se adjuntaron tres listas al final del contrato."] },
      { meaning: "subordinado", examples: ["Este departamento es solo una unidad subordinada."] },
      { meaning: "auxiliar", examples: ["El estacionamiento es una instalación auxiliar del hotel."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "alabar", examples: ["La película elogió a los trabajadores."] },
      { meaning: "elogiar", examples: ["El elogio fúnebre alabó su entrega desinteresada."] },
      { meaning: "ensalzar", examples: ["El poeta exalta el poder del mar."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "abiertamente", examples: ["Violó las normas abiertamente."] },
      { meaning: "publicamente", examples: ["Se opuso públicamente a la decisión en la reunión."] },
      { meaning: "descaradamente", examples: ["Mintió descaradamente sin la menor vergüenza."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "defraudar", examples: ["No quiero defraudar las esperanzas de mis padres."] },
      { meaning: "decepcionar", examples: ["No decepciones las expectativas de tus padres."] },
      { meaning: "no estar a la altura de", examples: ["No dejó de estar a la altura de la confianza de su maestro."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "en ultima instancia", examples: ["En última instancia, la salud es lo más importante."] },
      { meaning: "en el analisis final", examples: ["En el análisis final, la calidad es lo más importante."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "desear poder", examples: ["Desea poder volver a casa de inmediato."] },
      { meaning: "morirse de ganas de", examples: ["Al oír la buena noticia, se moría por volver a casa de inmediato."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "preocupaciones por las consecuencias", examples: ["Con este dinero, no tiene preocupaciones a futuro."] },
      { meaning: "preocupaciones por la retaguardia/el hogar", examples: ["Con su familia acomodada, no tenía preocupaciones por el hogar al viajar por trabajo."] },
      { meaning: "preocupacion persistente", examples: ["Después de asegurarse la financiación, el equipo del proyecto ya no tenía preocupaciones pendientes."] },
    ],
    "hsk6-huali-790": [
      { meaning: "suntuoso", examples: ["Lleva ropa muy lujosa."] },
      { meaning: "magnifico", examples: ["En el salón cuelga una magnífica lámpara de cristal."] },
      { meaning: "ornamentado", examples: ["El bordado de este vestido formal es ornamentado."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "organizacion", examples: ["Esta organización ayuda a las personas mayores."] },
      { meaning: "institucion", examples: ["Esta institución se especializa en la investigación de salud pública."] },
      { meaning: "mecanismo", examples: ["El mecanismo interno del reloj es extremadamente preciso."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "hacer aspavientos por", examples: ["No le des tanta importancia a asuntos pequeños."] },
      { meaning: "regatear sobre", examples: ["El vendedor todavía regateaba por dos yuanes."] },
      { meaning: "importarle/preocuparse por", examples: ["No me importa quién se disculpe primero."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "pisotear", examples: ["No pisotee el césped."] },
      { meaning: "pisar", examples: ["Por favor, no pises el césped recién colocado."] },
      { meaning: "violar", examples: ["Esta orden violó los derechos de los ciudadanos."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "remo", examples: ["Se rompió el remo del barco."] },
      { meaning: "pala", examples: ["Usó un remo para llevar la barca de vuelta a la orilla."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "delicado", examples: ["No seas tan delicado; ya casi llegamos."] },
      { meaning: "consentido", examples: ["Fue mimado desde niño y se volvió muy consentido."] },
      { meaning: "incapaz de soportar dificultades", examples: ["Después de solo dos kilómetros se quejó de estar cansado; de verdad no soporta las dificultades."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan enrollar/rizar", examples: ["Enrolló el cuadro y lo guardó."] },
      { meaning: "juan volumen/rollo", examples: ["En la estantería había un rollo de pintura antigua."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "hablar franca/confiadamente y extensamente", examples: ["Habló con soltura en el escenario y no se puso nada nervioso."] },
      { meaning: "hablar con fluidez", examples: ["Puede hablar con fluidez incluso sin guion."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "serio", examples: ["Pidió ayuda con un tono sincero."] },
      { meaning: "sincero", examples: ["Su disculpa fue muy sincera."] },
      { meaning: "sentido", examples: ["Agradeció de corazón la ayuda de los aldeanos."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "tratar injustamente", examples: ["La empresa no trató injustamente a los empleados veteranos."] },
      { meaning: "dar menos de lo debido", examples: ["El jefe nunca escatima los bonos de los empleados veteranos."] },
      { meaning: "maltratar", examples: ["No quería maltratar a ese caballo viejo."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "frio", examples: ["Su respuesta pareció muy fría."] },
      { meaning: "insensible", examples: ["Parecía muy insensible ante el sufrimiento del paciente."] },
      { meaning: "despiadado", examples: ["El general emitió una orden de ejecución despiadada."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "quedarse atonito", examples: ["Al oír la noticia, se quedó paralizado un momento."] },
      { meaning: "quedarse paralizado", examples: ["La puerta se abrió de repente y él se quedó paralizado en el sitio."] },
      { meaning: "estar distraido", examples: ["No te distraigas mirando por la ventana durante la clase."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "intereses en juego", examples: ["Por fin entendió lo que estaba en juego."] },
      { meaning: "pros y contras", examples: ["Piensa bien los pros y los contras antes de firmar."] },
      { meaning: "gravedad", examples: ["Todavía no se ha dado cuenta de la gravedad del problema."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "enterrar", examples: ["El trabajo ajetreado sepultó su talento."] },
      { meaning: "oscurecer", examples: ["El ruido ocultó su canto."] },
      { meaning: "dejar que el talento pase desapercibido", examples: ["No dejes que las tareas rutinarias oculten su talento."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "dar un paso", examples: ["Entró al aula con nervios."] },
      { meaning: "dar zancadas", examples: ["Avanzó a grandes zancadas hacia la sala de conferencias."] },
      { meaning: "entrar en", examples: ["La empresa está entrando en el mercado internacional."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "tinta", examples: ["Se acabó la tinta."] },
      { meaning: "cultura/conocimientos librescos", examples: ["De verdad tiene algo de cultura libresca."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "mirada", examples: ["La mirada del profesor se detuvo en la pizarra."] },
      { meaning: "vistazo", examples: ["Ella lanzó una mirada de ánimo."] },
      { meaning: "vista/vision", examples: ["Su vista se recuperó rápidamente."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "historia interna", examples: ["El periodista quería conocer los entresijos del incidente."] },
      { meaning: "informacion interna", examples: ["El periodista obtuvo información interna sobre el acuerdo."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "borrador", examples: ["Estamos redactando un nuevo plan."] },
      { meaning: "redactar", examples: ["La secretaria está elaborando la agenda de la reunión."] },
      { meaning: "formular", examples: ["Los expertos formularon nuevos estándares de evaluación."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "levantar/alzar", examples: ["Tiene los pies levantados sobre la silla."] },
      { meaning: "apoyar", examples: ["Levantó la tabla para bloquear la rueda."] },
      { meaning: "curvarse hacia arriba", examples: ["La esquina del papel se curvó hacia arriba después de mojarse."] },
      { meaning: "sobresaliente", examples: ["Es un alumno destacado de la clase."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "perseverar", examples: ["Mientras perseveres, habrá progreso."] },
      { meaning: "seguir insistiendo", examples: ["Mientras sigas intentándolo, el problema difícil acabará resolviéndose."] },
      { meaning: "ser persistente", examples: ["Ella investigó la verdad con persistencia."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "popular", examples: ["Este curso es muy popular."] },
      { meaning: "muy solicitado", examples: ["Analista de datos se ha convertido en un puesto muy demandado."] },
      { meaning: "en tendencia/de moda", examples: ["Este baile ha estado de moda últimamente."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "determinar", examples: ["El tribunal determinó que el contrato era legal."] },
      { meaning: "identificar como", examples: ["La policía lo identificó como sospechoso."] },
      { meaning: "creer firmemente", examples: ["Ella cree firmemente que el esfuerzo dará frutos."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "aprobar", examples: ["Su esfuerzo obtuvo la aprobación de todos."] },
      { meaning: "reconocer", examples: ["La organización internacional reconoció esta norma."] },
      { meaning: "aceptacion/aprobacion", examples: ["Este plan recibió la aprobación del equipo."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "clasificador para barcos/embarcaciones", examples: ["Hay tres barcos atracados en el puerto."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "hablar sin parar", examples: ["En cuanto habla de historia, no para de hablar."] },
      { meaning: "hablar sin parar/con fluidez", examples: ["El presentador empezó a hablar sin parar en cuanto comenzó el evento."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "de uso general", examples: ["Este método es de aplicación general."] },
      { meaning: "usado/aplicable universalmente", examples: ["Este tipo de enchufe se usa universalmente en Europa."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "delirio", examples: ["No fantasees con triunfar sin esforzarte."] },
      { meaning: "vana esperanza", examples: ["Triunfar sin esfuerzo es solo una vana esperanza."] },
      { meaning: "fantasear", examples: ["Pasa todo el día fantaseando con hacerse rico de la noche a la mañana."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "durar", examples: ["La formación dura tres meses."] },
      { meaning: "durante un periodo de", examples: ["La capacitación dura un período de tres meses."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "metabolismo", examples: ["El ejercicio puede favorecer el metabolismo."] },
      { meaning: "reemplazo de lo viejo por lo nuevo", examples: ["El reemplazo de lo viejo por lo nuevo en la industria se está acelerando."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "esfuerzo minucioso", examples: ["Este libro le costó muchísimo esfuerzo."] },
      { meaning: "trabajo/devocion invertidos en algo", examples: ["Este libro encarna diez años de su labor dedicada."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "beber en exceso", examples: ["Beber en exceso de forma continua afectará a la salud."] },
      { meaning: "abuso de alcohol", examples: ["El abuso prolongado de alcohol dañó su salud."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "prensar/exprimir", examples: ["Los jefes no deben explotar a los trabajadores."] },
      { meaning: "explotar", examples: ["La fábrica sin escrúpulos explotó a los trabajadores temporales."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "vista", examples: ["El gerente tiene buen criterio."] },
      { meaning: "criterio", examples: ["Tiene buen criterio al elegir socios."] },
      { meaning: "perspicacia", examples: ["Este editor tiene una perspectiva única."] },
      { meaning: "gusto", examples: ["Su gusto es exigente; solo compra estilos clásicos."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "sonido/audio", examples: ["El equipo de sonido de la habitación está demasiado alto."] },
      { meaning: "sistema de sonido/equipo estereo", examples: ["Se compró un nuevo sistema de sonido para la sala."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "demandante", examples: ["El demandante explicó la situación al tribunal."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "estar embarazada de", examples: ["La tierra nutre una vida abundante."] },
      { meaning: "criar", examples: ["El humedal cría muchas especies de aves acuáticas."] },
      { meaning: "nutrir", examples: ["La escuela formó a un grupo de jóvenes científicos."] },
      { meaning: "dar lugar a", examples: ["La crisis dio lugar a nuevas oportunidades."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "con ocasion de", examples: ["Al graduarse, el profesor esperaba que todos tuvieran éxito."] },
      { meaning: "en el momento de", examples: ["Al momento de graduarse, escribió una carta para agradecer a su profesor."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "gobernar/administrar", examples: ["El gobierno está gestionando la contaminación."] },
      { meaning: "gestionar/tratar", examples: ["La fábrica empezó a tratar las aguas residuales."] },
      { meaning: "gobernanza", examples: ["El gobierno corporativo necesita transparencia."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "quedar varado", examples: ["La gran nevada dejó a mucha gente varada en el aeropuerto."] },
      { meaning: "ser detenido", examples: ["Fue retenido en el aeropuerto por un problema con sus documentos."] },
      { meaning: "quedarse atras", examples: ["Los voluntarios se quedaron en el lugar para limpiar la basura."] },
      { meaning: "retencion", examples: ["El examen mostró retención de alimentos en el estómago."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "centro de gravedad", examples: ["Por favor, baja el centro de gravedad de tu cuerpo."] },
      { meaning: "foco/nucleo", examples: ["El enfoque del trabajo de este año es la calidad."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "solemne", examples: ["Va vestido muy formalmente."] },
      { meaning: "digno", examples: ["Su comportamiento es digno y apropiado."] },
      { meaning: "formal", examples: ["Por favor, pronuncie el discurso con un tono formal."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai estar junto a/cerca de", examples: ["Por favor, siéntense bien juntos; todavía hay gente detrás."] },
      { meaning: "ai sufrir/soportar", examples: ["Soportó una serie de críticas."] },
    ],
    "hsk6-ao-15": [
      { meaning: "cocer a fuego lento/reducir", examples: ["Mamá coció a fuego lento la sopa de pescado durante dos horas."] },
      { meaning: "soportar", examples: ["Este período difícil finalmente se superó."] },
      { meaning: "quedarse despierto hasta tarde", examples: ["Se quedó despierto hasta la madrugada antes de dormir."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "conveniencia", examples: ["La nueva estación de metro aporta muchas comodidades a los residentes."] },
      { meaning: "conveniente", examples: ["El transporte aquí es muy conveniente."] },
      { meaning: "facilitar", examples: ["El nuevo sistema facilitó el proceso de reembolso."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "no poder soportar", examples: ["La habitación estaba desordenada hasta resultar insoportable."] },
      { meaning: "insoportablemente/terriblemente", examples: ["La habitación estaba insoportablemente sofocante y calurosa."] },
      { meaning: "en mal estado", examples: ["El edificio antiguo ya está en un estado muy deteriorado."] },
    ],
    "hsk6-chan-221": [
      { meaning: "tener antojo de comida", examples: ["Mi hermano menor se antojó del pastel en cuanto lo vio."] },
      { meaning: "goloso por la comida", examples: ["En cuanto llega la hora de comer, se vuelve especialmente ansioso por la comida."] },
      { meaning: "gloton", examples: ["Este niño es tan glotón que toma dulces cada vez que los ve."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "romo/sin filo", examples: ["Este cuchillo se ha usado mucho tiempo y ya está algo desafilado."] },
      { meaning: "lento de entendimiento", examples: ["Sus reacciones son algo lentas."] },
      { meaning: "lento", examples: ["La computadora funciona con lentitud."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "vender", examples: ["Traicionar a los amigos por dinero está mal."] },
      { meaning: "traicionar/venderse", examples: ["Traicionó la confianza de su amigo."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "servir", examples: ["Ella cuida con esmero a su madre enferma."] },
      { meaning: "atender", examples: ["La enfermera atendió cuidadosamente al paciente durante la comida."] },
      { meaning: "cuidar de", examples: ["Cuida de su madre anciana en casa."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "defender una tesis", examples: ["Él participa en la defensa de graduación."] },
      { meaning: "defensa oral", examples: ["Mañana asistirá a la defensa oral de su tesis."] },
      { meaning: "responder a objeciones", examples: ["Respondió con calma a los cuestionamientos y aclaró las dudas."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi descuidado", examples: ["Fue demasiado descuidado y dejó el pasaporte en casa."] },
      { meaning: "dayi idea principal/significado general", examples: ["Por favor, resume primero la idea principal del artículo."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "lado inverso/opuesto", examples: ["Esta historia también deja una lección negativa."] },
      { meaning: "aspecto/ejemplo negativo", examples: ["Este caso es un ejemplo negativo."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "descomponer", examples: ["El profesor desglosó el problema en varias partes."] },
      { meaning: "dividir/analizar", examples: ["El profesor dividió el problema difícil en tres pasos."] },
      { meaning: "descomponer", examples: ["Las bacterias pueden descomponer las hojas caídas."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "relleno/lleno", examples: ["Este artículo tiene un contenido muy rico."] },
      { meaning: "abundante", examples: ["Sus capacidades y apoyos ya son amplios."] },
      { meaning: "rico/sustancial", examples: ["El contenido del informe es rico y convincente."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "podrido/descompuesto", examples: ["La madera podrida se rompe con facilidad."] },
      { meaning: "decadente/en decadencia", examples: ["El sistema decadente debe cambiarse."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "sentirse profundamente conmovido", examples: ["Al ver la foto antigua, se emocionó mucho."] },
      { meaning: "suspirar con emocion", examples: ["Al ver la foto antigua, suspiró con muchas emociones."] },
      { meaning: "reflexiones/sentimientos", examples: ["Escribió sus reflexiones del viaje."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "tierra de cultivo", examples: ["El agricultor está arando la tierra."] },
      { meaning: "labrar/arar la tierra", examples: ["En primavera, los agricultores empiezan a labrar la tierra."] },
    ],
    "hsk6-heng-768": [
      { meaning: "horizontal", examples: ["Estaba de lado en la puerta."] },
      { meaning: "de lado/a traves", examples: ["Colocó la mesa de lado."] },
      { meaning: "grosero/irrazonable", examples: ["Habla de manera demasiado grosera."] },
    ],
    "hsk6-hong-769": [
      { meaning: "persuadir con dulzura", examples: ["Papá está arrullando al niño para que se duerma."] },
      { meaning: "calmar", examples: ["Ella calmó suavemente al niño hasta que se durmió."] },
      { meaning: "engañar/embaucar", examples: ["No me engañes con información falsa."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "restaurar", examples: ["Por favor, reconstituye la escena."] },
      { meaning: "reconstruir", examples: ["La policía trabajó para reconstruir cómo ocurrió el caso."] },
      { meaning: "reducir quimicamente", examples: ["El hidrógeno puede reducir químicamente el óxido de cobre."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "flexible", examples: ["El plan incluye tiempo flexible."] },
      { meaning: "movil", examples: ["El equipo móvil puede brindar apoyo en cualquier momento."] },
      { meaning: "motorizado", examples: ["Un triciclo motorizado está estacionado en la entrada."] },
      { meaning: "maniobrar", examples: ["Las tropas maniobraron en la zona montañosa."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "punta afilada", examples: ["La empresa utiliza tecnología de vanguardia."] },
      { meaning: "de vanguardia", examples: ["La empresa desarrolla chips de vanguardia."] },
      { meaning: "avanzado", examples: ["Este hospital cuenta con equipos avanzados."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "autocritica", examples: ["Escribió una autocrítica."] },
      { meaning: "revisar/examinar", examples: ["Después de la reunión, revisamos las fallas del plan."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "espia", examples: ["El espía de la película es muy astuto."] },
      { meaning: "agente de espionaje", examples: ["Se encontró a un agente de espionaje extranjero en la frontera."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "lo que uno ve y oye", examples: ["Viajar aumentó sus conocimientos y experiencia."] },
      { meaning: "conocimiento y experiencia", examples: ["Viajar amplió sus conocimientos y experiencia."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "solido/completo", examples: ["La empresa necesita perfeccionar su sistema de gestión."] },
      { meaning: "mejorar/perfeccionar", examples: ["El gobierno mejorará el mecanismo de supervisión."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "explicar", examples: ["El gerente explicó la tarea con claridad."] },
      { meaning: "dar cuenta de", examples: ["Debe rendir cuentas sobre el destino de los fondos."] },
      { meaning: "entregar", examples: ["Por favor, entrega el trabajo al nuevo colega."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "estar dispuesto/contento de", examples: ["Con gusto te ayudo con la mudanza."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "como cosa natural", examples: ["No des por hecho que la ayuda es algo natural y esperado."] },
      { meaning: "dar por sentado", examples: ["Da por sentada la ayuda de los demás."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "empapar", examples: ["Lo empaparon con agua."] },
      { meaning: "verter/rociar", examples: ["Vertió miel sobre el pastel."] },
      { meaning: "mojarse", examples: ["Olvidó su paraguas y se empapó con la lluvia."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "suplantar", examples: ["Alguien se hizo pasar por médico para estafar a personas mayores."] },
      { meaning: "fingir ser", examples: ["Fingió ser reportero para entrar al recinto."] },
      { meaning: "hacerse pasar por", examples: ["Se hizo pasar por experta para ganarse la confianza."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "clasificador para objetos pequenos planos/redondos como monedas, anillos, medallas, sellos", examples: ["Ella compró un anillo."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "ir contra el trafico", examples: ["En esta carretera está prohibido circular en sentido contrario."] },
      { meaning: "viajar en reversa/direccion equivocada", examples: ["Ese coche circulaba en sentido contrario por una calle de un solo sentido."] },
      { meaning: "retrogrado", examples: ["Neptuno tiene movimiento retrógrado."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "cohesionarse", examples: ["Este objetivo aglutinó la fuerza de todos."] },
      { meaning: "reunir/agrupar", examples: ["Esta victoria reunió la confianza de todo el equipo."] },
      { meaning: "condensar", examples: ["El aire frío condensa el vapor de agua en niebla."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "equipar", examples: ["La escuela equipó el aula con ordenadores."] },
      { meaning: "proveer de", examples: ["La escuela proporcionó aire acondicionado a cada aula."] },
      { meaning: "equipo", examples: ["El equipo contra incendios ya fue entregado al almacén."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "abalanzarse/correr hacia", examples: ["El niño se lanzó hacia su mamá."] },
      { meaning: "aletear/revolotear", examples: ["La mariposa aleteaba suavemente entre las flores."] },
      { meaning: "lanzarse sobre", examples: ["En cuanto entró, el niño se lanzó a los brazos de su madre."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "brecha", examples: ["Esta taza tiene una muesca."] },
      { meaning: "abertura", examples: ["La inundación abrió una brecha en la presa."] },
      { meaning: "mella/desportilladura", examples: ["Hay una pequeña muesca en el borde de la taza."] },
      { meaning: "deficit", examples: ["La empresa aún tiene un déficit de financiación de tres millones."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "manual", examples: ["La traducción hecha por humanos es más precisa."] },
      { meaning: "hecho por humanos", examples: ["Este río hecho por el ser humano atraviesa el nuevo distrito."] },
      { meaning: "artificial", examples: ["El médico sugirió ponerle al paciente una articulación artificial."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "otras personas", examples: ["No molestes a los demás."] },
      { meaning: "hogar/familia", examples: ["Unas cuantas familias viven al pie de la montaña."] },
      { meaning: "yo/me coloquial", examples: ["Ya me disculpé, así que no te enojes."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "emitir/desprender", examples: ["La flor desprende un olor."] },
      { meaning: "distribuir", examples: ["Los voluntarios repartieron volantes en la entrada."] },
      { meaning: "enviar", examples: ["El sistema enviará automáticamente correos de notificación."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "animado", examples: ["Hoy se le ve muy orgulloso."] },
      { meaning: "orgulloso/engreido", examples: ["Después de ponerse el uniforme nuevo, se veía especialmente orgulloso."] },
      { meaning: "expresion/aire", examples: ["Su expresión parecía algo cansada."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "desconocido", examples: ["Acaba de llegar y el entorno todavía le resulta poco familiar."] },
      { meaning: "falto de practica", examples: ["Después de años sin practicar, su técnica de piano se volvió oxidada."] },
      { meaning: "no cercano", examples: ["Después de mudarnos, nos volvimos menos cercanos a nuestros antiguos vecinos."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "manojo/ramo", examples: ["Hay un ramo de flores sobre la mesa."] },
      { meaning: "haz", examples: ["Un rayo de sol iluminó la habitación."] },
      { meaning: "clasificador para manojos", examples: ["Él le regaló un ramo de rosas."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "dar forma", examples: ["La educación familiar moldea el carácter."] },
      { meaning: "moldear", examples: ["El artesano moldeó un jarrón con arcilla."] },
      { meaning: "representar/crear", examples: ["La novela retrata a una madre valiente."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "contar/ser valido", examples: ["Si lo prometiste, tiene que valer."] },
      { meaning: "cumplir la palabra", examples: ["Él siempre cumple su palabra."] },
      { meaning: "calcular", examples: ["Él calculaba con la cabeza agachada."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "paralisis", examples: ["El accidente paralizó el tráfico."] },
      { meaning: "paralizar", examples: ["El accidente paralizó su pierna izquierda."] },
      { meaning: "llevar a un punto muerto", examples: ["La tormenta de nieve paralizó el tráfico de la ciudad."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "sacar", examples: ["Sacó una llave."] },
      { meaning: "extraer", examples: ["Sacó la llave del cajón."] },
      { meaning: "desenterrar", examples: ["El obrero sacó barro y arena con una pala."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "ajustar", examples: ["La música puede aliviar la vida tensa."] },
      { meaning: "aliviar", examples: ["La música puede aliviar las emociones tensas."] },
      { meaning: "dar variedad/refrescar", examples: ["Viajar el fin de semana puede añadir variedad a una vida monótona."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "hacer planes generales teniendo en cuenta todos los factores/lados", examples: ["Los líderes deben tener en cuenta todas las partes."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "facturar equipaje", examples: ["La maleta tiene que facturarse."] },
      { meaning: "consignar para envio", examples: ["Este lote de medicamentos debe consignarse para envío con cadena de frío."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "completo", examples: ["Este conjunto de materiales está muy completo."] },
      { meaning: "totalmente equipado", examples: ["Este hospital está completamente equipado."] },
      { meaning: "integral", examples: ["El informe ofrece un análisis de datos exhaustivo."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "literatura y arte", examples: ["La escuela organizó una función artística."] },
      { meaning: "artes", examples: ["Ella se especializó en gestión de las artes en la universidad."] },
      { meaning: "literario/artistico", examples: ["Esta cafetería tiene un ambiente muy artístico."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "fuerzas armadas", examples: ["Los soldados ya han terminado de armarse."] },
      { meaning: "armas/equipo", examples: ["Este equipo carece de las armas y el equipo necesarios."] },
      { meaning: "armar/equipar", examples: ["Equiparon al equipo de rescate con nueva tecnología."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "coordinar", examples: ["La combinación de colores es armoniosa."] },
      { meaning: "coordinado", examples: ["Las acciones de todos los departamentos estuvieron bien coordinadas."] },
      { meaning: "armonioso", examples: ["Los colores de esta pintura son muy armoniosos."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "reprimir/suprimir", examples: ["Expresó las emociones reprimidas que llevaba dentro."] },
      { meaning: "opresivo", examples: ["El ambiente en la sala de reuniones era opresivo."] },
      { meaning: "deprimido", examples: ["Los fracasos repetidos lo hicieron sentirse muy deprimido."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "deducir", examples: ["El actor retrató la vida de una persona mayor."] },
      { meaning: "interpretar/representar/actuar", examples: ["Ella interpretó a la protagonista con gran sutileza."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "conciencia/percepcion", examples: ["Se dio cuenta de que el problema era grave."] },
      { meaning: "darse cuenta de/ser consciente de", examples: ["Finalmente se dio cuenta de la gravedad del problema."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "original", examples: ["Aquí se conserva un bosque primigenio."] },
      { meaning: "primitivo", examples: ["El pueblo aún conserva métodos de cultivo primitivos."] },
      { meaning: "primigenio", examples: ["Los científicos estudian la ecología de los bosques primigenios."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "atar/amarrar", examples: ["La enfermera le pinchó una vez."] },
      { meaning: "pinchar/clavar", examples: ["La aguja le pinchó el dedo con dolor."] },
      { meaning: "insertar", examples: ["Insertó las flores en el jarrón."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "romper/fracturar", examples: ["Dobló el mapa."] },
      { meaning: "doblar", examples: ["Ella dobló la carta y la puso en el sobre."] },
      { meaning: "descuento", examples: ["Este abrigo tiene un treinta por ciento de descuento hoy."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "inteligencia", examples: ["Los teléfonos inteligentes han cambiado la vida."] },
      { meaning: "inteligente/listo", examples: ["Compró un refrigerador inteligente."] },
      { meaning: "IA", examples: ["La IA está cambiando los servicios médicos."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "supervisor/persona a cargo", examples: ["El supervisor inspeccionará el trabajo mañana."] },
      { meaning: "estar a cargo de", examples: ["Ella está a cargo del trabajo financiero de la empresa."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "tema/asunto especial", examples: ["Hoy, en la reunión se debatió un tema medioambiental."] },
      { meaning: "reportaje", examples: ["Las noticias de esta noche tienen un reportaje sobre el medio ambiente."] },
      { meaning: "tematico", examples: ["El museo lanzó una exposición temática."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "postura/pose", examples: ["Ella mantiene una buena postura."] },
      { meaning: "actitud/postura", examples: ["El gobierno mantuvo una postura abierta hacia las negociaciones."] },
    ],
  },
  "fr": {
    "hsk6-bajie-20": [
      { meaning: "flatter", examples: ["Il ne veut pas compter sur la flatterie des autres pour obtenir des opportunités."] },
      { meaning: "chercher les faveurs de", examples: ["Il essaie toujours de s'attirer les faveurs de son patron pour obtenir une promotion."] },
      { meaning: "s'attirer les bonnes graces de", examples: ["Pour entrer dans ce cercle, il s'est délibérément ingratié auprès de plusieurs célébrités."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "se faire rembourser", examples: ["De retour de son déplacement professionnel, il a apporté la facture pour se faire rembourser."] },
      { meaning: "soumettre des depenses pour remboursement", examples: ["Après son retour du déplacement professionnel, elle a soumis les billets de train au remboursement."] },
      { meaning: "passer en perte/demolir", examples: ["Cette vieille machine ne peut pas être réparée et doit seulement être mise au rebut."] },
    ],
    "hsk6-bise-101": [
      { meaning: "bloque/ferme", examples: ["Ici, les transports sont enclavés, donc les informations arrivent lentement."] },
      { meaning: "isole", examples: ["Ce village de montagne était autrefois très isolé, et les étrangers y venaient rarement."] },
      { meaning: "arriéré ou mal informe", examples: ["Être mal informée peut faire manquer des occasions à une entreprise."] },
    ],
    "hsk6-bing-135": [
      { meaning: "note C", examples: ["À cet examen, sa note était C."] },
      { meaning: "troisieme", examples: ["Les trois personnes indiquées comme A, B et C doivent toutes prendre la parole."] },
      { meaning: "troisieme Tronc celeste", examples: ["Bing est le troisième des Troncs célestes."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "ne reculer devant rien", examples: ["Pour gagner la compétition, il ne recule devant rien."] },
      { meaning: "employer tous les moyens", examples: ["Pour gagner des clients, il emploie tous les moyens pour faire baisser les prix."] },
      { meaning: "par tous les moyens", examples: ["Cette entreprise étend son marché par tous les moyens, honnêtes ou non."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "battre en retraite", examples: ["Tout le monde a commencé à battre en retraite."] },
      { meaning: "se retirer", examples: ["Avant l'arrivée de l'orage, l'équipe s'est retirée de la vallée."] },
      { meaning: "reculer", examples: ["Le feu ennemi était trop intense, alors les troupes de première ligne ont été forcées de se replier."] },
    ],
    "hsk6-chili-275": [
      { meaning: "penible", examples: ["Ce livre est trop lourd, c’est difficile de le soulever."] },
      { meaning: "laborieux", examples: ["Déplacer ce piano est vraiment laborieux."] },
      { meaning: "avoir du mal a faire quelque chose", examples: ["Il a un peu de mal à comprendre les journaux rapides."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "mesure disciplinaire", examples: ["Il a enfreint la discipline et a été sanctionné par l’école."] },
      { meaning: "punition", examples: ["Il a reçu une sanction sévère pour tricherie."] },
      { meaning: "traiter/gerer", examples: ["Ce lot de marchandises doit être traité dès que possible."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "se debrouiller avec les moyens du bord", examples: ["Ce repas peut être simple : on s’en contente."] },
      { meaning: "improviser", examples: ["Le groupe a improvisé un morceau d'ouverture à la dernière minute."] },
      { meaning: "passable/pas trop mauvais", examples: ["La nourriture de cette petite échoppe est passable."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "filer/detaler", examples: ["Ce chat a soudain filé dans la cuisine."] },
      { meaning: "fuir", examples: ["Le malfaiteur s'est enfui par la porte arrière au milieu du chaos."] },
      { meaning: "alterer/trafiquer un texte", examples: ["Il a modifié la date du contrat sans autorisation."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "au pire", examples: ["Au pire, on reviendra demain."] },
      { meaning: "pas plus de", examples: ["Ce travail peut être terminé en deux jours au maximum."] },
      { meaning: "ce n'est pas grave dans des contextes negatifs", examples: ["Rater un bus, ce n'est pas grave."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "personne impliquee", examples: ["Il faut écouter l’explication de la personne concernée."] },
      { meaning: "partie concernee", examples: ["Les détails de l'accident doivent être vérifiés auprès de la partie concernée."] },
      { meaning: "plaideur", examples: ["Les deux plaideurs ont comparu au tribunal pour témoigner."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "faire faillite", examples: ["À cause d’une mauvaise gestion, ce restaurant a fermé l’an dernier."] },
      { meaning: "fermer", examples: ["Le loyer était trop élevé, alors cette librairie a dû fermer."] },
      { meaning: "echouer en tant qu'entreprise", examples: ["Une fois sa trésorerie rompue, l'entreprise a rapidement fait faillite."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "rompre", examples: ["Il a décidé de rompre avec ses mauvaises habitudes d’autrefois."] },
      { meaning: "couper", examples: ["La tempête de neige a coupé les transports vers le village de montagne."] },
      { meaning: "rompre les relations", examples: ["Après la dispute, ils ont rompu leurs relations."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "tenir une promesse", examples: ["Il a enfin tenu sa promesse d’origine."] },
      { meaning: "encaisser un cheque", examples: ["Il est allé à la banque pour encaisser un chèque."] },
      { meaning: "convertir en especes", examples: ["Ces points peuvent être convertis en espèces avant la fin du mois."] },
    ],
    "hsk6-fan-504": [
      { meaning: "classificateur pour discours/action", examples: ["Cette explication est très claire."] },
      { meaning: "un tour/une periode", examples: ["Après une série de discussions, tout le monde a accepté le plan."] },
      { meaning: "sorte/type", examples: ["Ce genre de scène est inoubliable pour moi."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "dans un rayon de", examples: ["Il n’y a pas d’hôpital dans un rayon de dix kilomètres."] },
      { meaning: "zone environnante", examples: ["La cloche s'entend dans toute la zone environnante sur plusieurs li."] },
      { meaning: "circonference", examples: ["Les ouvriers mesurent la circonférence du parterre de fleurs."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "visiter", examples: ["Le journaliste interviewera le proviseur demain."] },
      { meaning: "interviewer", examples: ["Le journaliste interviewera demain le réalisateur primé."] },
      { meaning: "acceder", examples: ["Les utilisateurs ne peuvent pas accéder à ce site web."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "etre superficiel", examples: ["Ne me réponds pas à la légère, s’il te plaît; réponds sérieusement."] },
      { meaning: "eluder", examples: ["Le directeur a éconduit le client avec quelques paroles creuses."] },
      { meaning: "s'en tirer tant bien que mal", examples: ["Il n'était pas préparé et n'a pu que se débrouiller tant bien que mal pour finir le rapport."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "faire echo", examples: ["Dès que les autres parlent, il leur fait écho."] },
      { meaning: "abonder dans le sens de", examples: ["Dès qu'elle a fait la proposition, les personnes autour ont aussitôt renchéri."] },
      { meaning: "approuver sans esprit critique", examples: ["Ne sois pas d'accord sans esprit critique avec tout ce que disent les autres."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "affilie", examples: ["Cet hôpital est un hôpital affilié à une école."] },
      { meaning: "attache", examples: ["Trois listes ont été jointes à la fin du contrat."] },
      { meaning: "subordonne", examples: ["Ce service n'est qu'une unité subordonnée."] },
      { meaning: "auxiliaire", examples: ["Le parking est une installation annexe de l'hôtel."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "louer", examples: ["Le film a fait l’éloge des ouvriers."] },
      { meaning: "faire l'eloge de", examples: ["L'éloge funèbre a salué son dévouement désintéressé."] },
      { meaning: "exalter", examples: ["Le poète exalte la puissance de la mer."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "ouvertement", examples: ["Il a ouvertement enfreint le règlement."] },
      { meaning: "publiquement", examples: ["Il s'est publiquement opposé à cette décision lors de la réunion."] },
      { meaning: "effrontement", examples: ["Il a menti effrontément sans la moindre gêne."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "decevoir", examples: ["Je ne veux pas décevoir les espoirs de mes parents."] },
      { meaning: "decevoir", examples: ["Ne déçois pas les attentes de tes parents."] },
      { meaning: "ne pas etre a la hauteur de", examples: ["Il n'a pas failli à la confiance de son professeur."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "en fin de compte", examples: ["En fin de compte, la santé est ce qu’il y a de plus important."] },
      { meaning: "en derniere analyse", examples: ["En dernière analyse, c'est la qualité qui compte le plus."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "souhaiter pouvoir", examples: ["Il voudrait rentrer chez lui tout de suite."] },
      { meaning: "bruler d'envie de", examples: ["Après avoir entendu la bonne nouvelle, il mourait d'envie de rentrer chez lui immédiatement."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "inquietudes quant aux consequences", examples: ["Avec cet argent, il n’a plus de souci à se faire."] },
      { meaning: "inquietudes concernant l'arriere/le foyer", examples: ["Sa famille étant installée, il n'avait plus de soucis concernant le foyer pendant ses déplacements professionnels."] },
      { meaning: "preoccupation persistante", examples: ["Une fois le financement assuré, l'équipe du projet n'avait plus de préoccupations persistantes."] },
    ],
    "hsk6-huali-790": [
      { meaning: "somptueux", examples: ["Elle porte des vêtements somptueux."] },
      { meaning: "magnifique", examples: ["Un magnifique lustre en cristal est suspendu dans le hall."] },
      { meaning: "orne", examples: ["La broderie de cette robe de cérémonie est ornée."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "organisation", examples: ["Cet organisme aide les personnes âgées."] },
      { meaning: "institution", examples: ["Cette institution est spécialisée dans la recherche en santé publique."] },
      { meaning: "mecanisme", examples: ["Le mécanisme interne de l'horloge est extrêmement précis."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "faire des histoires pour", examples: ["Ne chipote pas trop pour des broutilles."] },
      { meaning: "marchander sur", examples: ["Le vendeur marchandait encore pour deux yuans."] },
      { meaning: "se soucier de", examples: ["Peu m'importe qui s'excuse en premier."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "pietiner", examples: ["Ne piétinez pas la pelouse."] },
      { meaning: "marcher sur", examples: ["Ne piétine pas la pelouse fraîchement posée, s'il te plaît."] },
      { meaning: "violer", examples: ["Cet ordre a violé les droits des citoyens."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "rame", examples: ["La rame du bateau s’est cassée."] },
      { meaning: "pagaie", examples: ["Il a utilisé une pagaie pour ramener le bateau au rivage."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "delicat", examples: ["Ne fais pas ta délicate, on y est presque."] },
      { meaning: "gate", examples: ["Il a été gâté depuis l'enfance et est devenu très capricieux."] },
      { meaning: "incapable de supporter les difficultes", examples: ["Après seulement deux kilomètres, il s'est plaint d'être fatigué ; il supporte vraiment mal les difficultés."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan enrouler/boucler", examples: ["Elle a roulé le tableau et l’a rangé."] },
      { meaning: "juan volume/rouleau", examples: ["Un rouleau de peinture ancienne se trouvait sur l'étagère."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "parler franchement/avec assurance et longuement", examples: ["Sur scène, il s’est exprimé avec assurance, sans être le moins du monde nerveux."] },
      { meaning: "parler couramment", examples: ["Il peut parler couramment même sans texte."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "serieux", examples: ["Il a demandé de l’aide d’un ton sincère."] },
      { meaning: "sincere", examples: ["Ses excuses étaient très sincères."] },
      { meaning: "profondement ressenti", examples: ["Il a remercié de tout cœur les villageois pour leur aide."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "traiter injustement", examples: ["L’entreprise n’a pas lésé les anciens employés."] },
      { meaning: "leser", examples: ["Le patron ne lésine jamais sur les primes des anciens employés."] },
      { meaning: "maltraiter", examples: ["Il ne voulait pas maltraiter ce vieux cheval."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "froid", examples: ["Sa réponse semblait très froide."] },
      { meaning: "insensible", examples: ["Il semblait très insensible à la souffrance du patient."] },
      { meaning: "impitoyable", examples: ["Le général a donné un ordre d'exécution impitoyable."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "etre stupefait", examples: ["En entendant la nouvelle, il est resté figé un instant."] },
      { meaning: "se figer", examples: ["La porte s'est soudain ouverte, et il s'est figé sur place."] },
      { meaning: "etre distrait", examples: ["Ne reste pas distrait à regarder par la fenêtre pendant le cours."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "enjeux", examples: ["Il a fini par comprendre les enjeux de l’affaire."] },
      { meaning: "avantages et inconvenients", examples: ["Pèse bien le pour et le contre avant de signer."] },
      { meaning: "gravite", examples: ["Il n'a toujours pas compris la gravité du problème."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "enterrer", examples: ["Un travail accaparant a étouffé son talent."] },
      { meaning: "obscurcir", examples: ["Le bruit a couvert son chant."] },
      { meaning: "laisser un talent meconnu", examples: ["Ne laisse pas les tâches routinières étouffer son talent."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "faire un pas", examples: ["Il est entré dans la salle de classe d’un pas nerveux."] },
      { meaning: "marcher a grandes enjambees", examples: ["Il s'est dirigé à grandes enjambées vers la salle de conférence."] },
      { meaning: "entrer dans", examples: ["L'entreprise entre sur le marché international."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "encre", examples: ["Il n’y a plus d’encre."] },
      { meaning: "culture/savoir livresque", examples: ["Il a vraiment une certaine culture livresque."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "regard", examples: ["Le regard du professeur s’est arrêté sur le tableau."] },
      { meaning: "coup d'oeil", examples: ["Elle a lancé un regard encourageant."] },
      { meaning: "vue/vision", examples: ["Sa vue s'est rétablie rapidement."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "coulisses", examples: ["Le journaliste voulait comprendre les dessous de l’incident."] },
      { meaning: "information interne", examples: ["Le journaliste a obtenu des informations internes sur l'accord."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "brouillon", examples: ["Nous sommes en train de rédiger un nouveau plan."] },
      { meaning: "rediger", examples: ["La secrétaire est en train d'établir l'ordre du jour de la réunion."] },
      { meaning: "formuler", examples: ["Les experts ont formulé de nouvelles normes d'évaluation."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "dresser/lever", examples: ["Il a les pieds relevés sur la chaise."] },
      { meaning: "etayer", examples: ["Il a calé la planche pour bloquer la roue."] },
      { meaning: "se recourber vers le haut", examples: ["Le coin du papier s'est recourbé vers le haut après avoir été mouillé."] },
      { meaning: "remarquable", examples: ["C'est un élève remarquable de la classe."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "perseverer", examples: ["Tant que tu persévères, tu progresseras."] },
      { meaning: "s'y tenir", examples: ["Tant que tu continues, le problème difficile finira par se résoudre."] },
      { meaning: "etre persistant", examples: ["Elle a enquêté avec persistance sur la vérité."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "populaire", examples: ["Ce cours est très populaire."] },
      { meaning: "tres demande", examples: ["Analyste de données est devenu un poste très demandé."] },
      { meaning: "tendance/en vogue", examples: ["Cette danse est très tendance récemment."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "determiner", examples: ["Le tribunal a jugé que le contrat était légal."] },
      { meaning: "identifier comme", examples: ["La police l'a identifié comme suspect."] },
      { meaning: "croire fermement", examples: ["Elle croit fermement que les efforts seront récompensés."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "approuver", examples: ["Ses efforts ont été reconnus par tout le monde."] },
      { meaning: "reconnaitre", examples: ["L'organisation internationale a reconnu cette norme."] },
      { meaning: "acceptation/approbation", examples: ["Ce plan a reçu l'approbation de l'équipe."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "classificateur pour navires/embarcations", examples: ["Trois bateaux sont amarrés au port."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "parler sans fin", examples: ["Dès qu’il parle d’histoire, il n’arrête plus."] },
      { meaning: "parler sans arret/couramment", examples: ["L'animateur s'est mis à parler sans arrêt dès l'ouverture de l'événement."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "a usage general", examples: ["Cette méthode est d’application générale."] },
      { meaning: "universellement utilise/applicable", examples: ["Ce type de prise est couramment utilisé dans toute l'Europe."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "delire", examples: ["Ne fantasme pas de réussir sans faire d’efforts."] },
      { meaning: "vain espoir", examples: ["Réussir sans effort n'est qu'un vain espoir."] },
      { meaning: "fantasmer", examples: ["Il fantasme toute la journée sur le fait de devenir riche du jour au lendemain."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "durer", examples: ["La formation dure trois mois."] },
      { meaning: "pendant une periode de", examples: ["La formation dure trois mois."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "metabolisme", examples: ["L’exercice physique peut stimuler le métabolisme."] },
      { meaning: "remplacement de l'ancien par le nouveau", examples: ["Le remplacement de l'ancien par le nouveau dans le secteur s'accélère."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "effort minutieux", examples: ["Ce livre lui a demandé énormément d’efforts."] },
      { meaning: "travail/devouement consacre a quelque chose", examples: ["Ce livre incarne dix ans de son travail dévoué."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "boire excessivement", examples: ["Boire excessivement tout le temps nuit à la santé."] },
      { meaning: "abus d'alcool", examples: ["L'abus d'alcool à long terme a nui à sa santé."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "presser/comprimer", examples: ["Les patrons ne doivent pas exploiter les ouvriers."] },
      { meaning: "exploiter", examples: ["L'usine sans scrupules exploitait les travailleurs temporaires."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "vue", examples: ["Le directeur a un très bon jugement."] },
      { meaning: "jugement", examples: ["Elle a un bon jugement pour choisir ses partenaires."] },
      { meaning: "perspicacite", examples: ["Cet éditeur a une perspicacité unique."] },
      { meaning: "gout", examples: ["Il a des goûts difficiles ; il n'achète que des modèles classiques."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "son/audio", examples: ["Le système audio de la pièce est trop fort."] },
      { meaning: "systeme de sonorisation/equipement stereo", examples: ["Un nouveau système audio a été acheté pour le salon."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "demandeur", examples: ["Le demandeur a expliqué la situation au tribunal."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "etre enceinte de", examples: ["La terre nourrit une vie abondante."] },
      { meaning: "engendrer", examples: ["La zone humide abrite la reproduction de nombreuses espèces d'oiseaux d'eau."] },
      { meaning: "nourrir", examples: ["L'école a formé un groupe de jeunes scientifiques."] },
      { meaning: "donner naissance a", examples: ["La crise a donné naissance à de nouvelles opportunités."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "a l'occasion de", examples: ["À l’occasion de la remise des diplômes, l’enseignant espérait que tout le monde réussirait."] },
      { meaning: "au moment de", examples: ["Au moment de la remise des diplômes, il a écrit une lettre pour remercier son professeur."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "gouverner/administrer", examples: ["Le gouvernement est en train de lutter contre la pollution."] },
      { meaning: "gerer/traiter", examples: ["L'usine a commencé à traiter les eaux usées."] },
      { meaning: "gouvernance", examples: ["La gouvernance d'entreprise exige de la transparence."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "etre bloque", examples: ["La forte neige a laissé beaucoup de gens bloqués à l’aéroport."] },
      { meaning: "etre detenu", examples: ["Il a été retenu à l'aéroport à cause d'un problème de papiers."] },
      { meaning: "rester en arriere", examples: ["Les bénévoles sont restés sur place pour ramasser les déchets."] },
      { meaning: "retention", examples: ["L'examen a montré une rétention d'aliments dans l'estomac."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "centre de gravite", examples: ["Veuillez abaisser le centre de gravité de votre corps."] },
      { meaning: "foyer/noyau", examples: ["Le cœur du travail de cette année est la qualité."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "solennel", examples: ["Il est habillé très formellement."] },
      { meaning: "digne", examples: ["Son attitude est digne et convenable."] },
      { meaning: "formel", examples: ["Veuillez prononcer le discours sur un ton formel."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai etre a cote de/proche de", examples: ["Veuillez vous asseoir en vous serrant, il y a encore des gens derrière."] },
      { meaning: "ai souffrir/endurer", examples: ["Il a essuyé une série de critiques."] },
    ],
    "hsk6-ao-15": [
      { meaning: "mijoter/reduire", examples: ["Maman a fait mijoter la soupe de poisson pendant deux heures."] },
      { meaning: "endurer", examples: ["Cette période difficile a finalement été endurée."] },
      { meaning: "veiller tard", examples: ["Il est resté éveillé jusqu'au petit matin avant de dormir."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "commodite", examples: ["La nouvelle station de métro apporte beaucoup de commodité aux habitants."] },
      { meaning: "pratique", examples: ["Les transports ici sont très pratiques."] },
      { meaning: "faciliter", examples: ["Le nouveau système a facilité le processus de remboursement."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "ne pas pouvoir supporter", examples: ["La chambre était d’un désordre insupportable."] },
      { meaning: "insupportablement/terriblement", examples: ["La pièce était étouffante et chaude au point d'être insupportable."] },
      { meaning: "en mauvais etat", examples: ["Le vieux bâtiment est déjà dans un état très délabré."] },
    ],
    "hsk6-chan-221": [
      { meaning: "avoir envie de nourriture", examples: ["Mon petit frère a eu envie de gâteau dès qu’il l’a vu."] },
      { meaning: "friand de nourriture", examples: ["Dès que vient l'heure du repas, il devient particulièrement avide de nourriture."] },
      { meaning: "glouton", examples: ["Cet enfant est si gourmand qu'il prend des snacks dès qu'il les voit."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "emousse", examples: ["Ce couteau a beaucoup servi ; il est déjà un peu émoussé."] },
      { meaning: "lent d'esprit", examples: ["Ses réactions sont un peu lentes."] },
      { meaning: "lent", examples: ["L'ordinateur fonctionne lentement."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "vendre", examples: ["Trahir ses amis pour de l’argent, c’est mal."] },
      { meaning: "trahir/vendre", examples: ["Il a trahi la confiance de son ami."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "servir", examples: ["Elle s’occupe consciencieusement de sa mère malade."] },
      { meaning: "servir aux petits soins", examples: ["L'infirmière a servi le patient avec soin pendant le repas."] },
      { meaning: "prendre soin de", examples: ["Elle s'occupe de sa mère âgée à la maison."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "soutenir une these", examples: ["Il participe à la soutenance de fin d’études."] },
      { meaning: "soutenance orale", examples: ["Elle participera demain à la soutenance orale de son mémoire."] },
      { meaning: "repondre aux objections", examples: ["Il a répondu calmement aux objections et aux doutes."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi negligent", examples: ["Il a été trop négligent et a laissé son passeport à la maison."] },
      { meaning: "dayi idee principale/sens general", examples: ["Veuillez d'abord résumer l'idée générale de l'article."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "cote inverse/oppose", examples: ["Cette histoire comporte aussi une leçon négative."] },
      { meaning: "aspect/exemple negatif", examples: ["Ce cas est un exemple négatif."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "decomposer", examples: ["Le professeur a décomposé le problème en plusieurs parties."] },
      { meaning: "diviser/analyser", examples: ["Le professeur a décomposé le problème difficile en trois étapes."] },
      { meaning: "decomposer", examples: ["Les bactéries peuvent décomposer les feuilles mortes."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "dodue/plein", examples: ["Cet article a un contenu riche."] },
      { meaning: "ample", examples: ["Ses capacités et ses appuis sont désormais solides."] },
      { meaning: "riche/substantiel", examples: ["Le contenu du rapport est riche et convaincant."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "pourri/decompose", examples: ["Le bois pourri se casse facilement."] },
      { meaning: "decadent/en declin", examples: ["Le système décadent doit être changé."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "etre profondement emu", examples: ["En voyant la vieille photo, il a été très ému."] },
      { meaning: "soupirer d'emotion", examples: ["En voyant la vieille photo, il a soupiré avec beaucoup d'émotion."] },
      { meaning: "reflexions/sentiments", examples: ["Elle a noté ses impressions du voyage."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "terre agricole/terre cultivee", examples: ["Le paysan est en train de labourer la terre."] },
      { meaning: "labourer la terre", examples: ["Au printemps, les paysans commencent à labourer la terre."] },
    ],
    "hsk6-heng-768": [
      { meaning: "horizontal", examples: ["Il se tenait de côté à l’entrée."] },
      { meaning: "de travers/a travers", examples: ["Il a placé la table de travers."] },
      { meaning: "grossier/deraisonnable", examples: ["Il parle de façon trop brutale."] },
    ],
    "hsk6-hong-769": [
      { meaning: "amadouer", examples: ["Papa est en train de bercer l’enfant pour l’endormir."] },
      { meaning: "apaiser", examples: ["Elle a doucement apaisé l'enfant pour l'endormir."] },
      { meaning: "tromper/duper", examples: ["Ne me trompe pas avec de fausses informations."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "restaurer", examples: ["Veuillez reconstituer la scène, s’il vous plaît."] },
      { meaning: "reconstituer", examples: ["La police s'est efforcée de reconstituer le déroulement de l'affaire."] },
      { meaning: "reduire chimiquement", examples: ["L'hydrogène peut réduire chimiquement l'oxyde de cuivre."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "flexible", examples: ["Le plan prévoit du temps flexible."] },
      { meaning: "mobile", examples: ["L'équipe mobile peut apporter son soutien à tout moment."] },
      { meaning: "motorise", examples: ["Un tricycle motorisé est garé à l'entrée."] },
      { meaning: "manoeuvrer", examples: ["Les troupes ont manoeuvré en montagne."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "pointe", examples: ["L’entreprise utilise une technologie de pointe."] },
      { meaning: "de pointe", examples: ["L'entreprise développe des puces de pointe."] },
      { meaning: "avance", examples: ["Cet hôpital possède des équipements avancés."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "autocritique", examples: ["Il a écrit une autocritique."] },
      { meaning: "revoir/examiner", examples: ["Après la réunion, nous avons examiné les failles du plan."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "espion", examples: ["L’espion dans le film est très astucieux."] },
      { meaning: "agent d'espionnage", examples: ["Un agent d'espionnage étranger a été découvert à la frontière."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "ce que l'on voit et entend", examples: ["Les voyages ont enrichi ses connaissances et son expérience."] },
      { meaning: "connaissances et experience", examples: ["Le voyage a élargi ses connaissances et son expérience."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "sain/complet", examples: ["L’entreprise doit améliorer son système de gestion."] },
      { meaning: "ameliorer/perfectionner", examples: ["Le gouvernement améliorera le mécanisme de contrôle."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "expliquer", examples: ["Le directeur a expliqué clairement la mission."] },
      { meaning: "rendre compte de", examples: ["Il doit rendre compte de la destination des fonds."] },
      { meaning: "remettre", examples: ["Veuillez transmettre le travail au nouveau collègue."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "etre dispose/content de", examples: ["Je suis ravi de t’aider à déménager."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "comme allant de soi", examples: ["Ne considère pas l’aide comme allant de soi."] },
      { meaning: "tenir pour acquis", examples: ["Il tient l'aide des autres pour acquise."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "tremper", examples: ["Il a été trempé par l’eau."] },
      { meaning: "verser/asperger", examples: ["Elle a versé du miel sur le gâteau."] },
      { meaning: "se mouiller", examples: ["Il a oublié son parapluie et s'est fait tremper par la pluie."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "usurper l'identite de", examples: ["Quelqu’un s’est fait passer pour un médecin afin d’escroquer des personnes âgées."] },
      { meaning: "pretendre etre", examples: ["Il a prétendu être journaliste pour entrer dans la salle."] },
      { meaning: "se faire passer pour", examples: ["Elle s'est fait passer pour une experte afin de gagner la confiance."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "classificateur pour petits objets plats/ronds tels que pieces, bagues, medailles, timbres", examples: ["Elle a acheté une bague."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "aller a contresens", examples: ["Il est interdit de rouler à contresens sur cette route."] },
      { meaning: "circuler en marche arriere/dans la mauvaise direction", examples: ["Cette voiture roulait à contresens dans une rue à sens unique."] },
      { meaning: "retrograde", examples: ["Neptune a un mouvement rétrograde."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "coherer", examples: ["Cet objectif a rassemblé les forces de tout le monde."] },
      { meaning: "rassembler/mobiliser", examples: ["Cette victoire a rassemblé la confiance de toute l'équipe."] },
      { meaning: "condenser", examples: ["L'air froid condense la vapeur d'eau en brouillard."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "equiper", examples: ["L’école a équipé la salle de classe d’ordinateurs."] },
      { meaning: "munir de", examples: ["L'école a équipé chaque salle de classe de la climatisation."] },
      { meaning: "equipement", examples: ["L'équipement de lutte contre l'incendie a déjà été livré à l'entrepôt."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "bondir/se ruer vers", examples: ["L’enfant s’est précipité vers sa mère."] },
      { meaning: "battre des ailes/flotter", examples: ["Le papillon battait doucement des ailes parmi les fleurs."] },
      { meaning: "se jeter sur", examples: ["Dès qu'il est entré, l'enfant s'est jeté dans les bras de sa mère."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "ecart", examples: ["Cette tasse a un éclat."] },
      { meaning: "breche", examples: ["La crue a ouvert une brèche dans le barrage."] },
      { meaning: "eclat/encoche", examples: ["Il y a un petit éclat sur le bord de la tasse."] },
      { meaning: "deficit", examples: ["L'entreprise a encore un déficit de financement de trois millions."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "manuel", examples: ["La traduction humaine est plus précise."] },
      { meaning: "fabrique par l'homme", examples: ["Cette rivière artificielle traverse le nouveau quartier."] },
      { meaning: "artificiel", examples: ["Le médecin a proposé de poser une articulation artificielle au patient."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "les autres", examples: ["Ne dérange pas les autres."] },
      { meaning: "foyer/famille", examples: ["Quelques foyers vivent au pied de la montagne."] },
      { meaning: "je/moi familier", examples: ["Je me suis déjà excusé, alors ne sois pas fâché."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "emettre/degager", examples: ["La fleur dégage une odeur."] },
      { meaning: "distribuer", examples: ["Les bénévoles ont distribué des tracts à l'entrée."] },
      { meaning: "envoyer", examples: ["Le système enverra automatiquement des courriels de notification."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "vif", examples: ["Aujourd’hui, il a l’air très fier."] },
      { meaning: "fier/pretentieux", examples: ["Après avoir mis le nouvel uniforme, il avait l'air particulièrement fier."] },
      { meaning: "expression/air", examples: ["Son expression semblait un peu fatiguée."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "inconnu", examples: ["Il vient d’arriver, l’environnement lui est encore très peu familier."] },
      { meaning: "rouille", examples: ["Après des années sans pratique, sa technique au piano s'est rouillée."] },
      { meaning: "peu proche", examples: ["Après le déménagement, nous sommes devenus moins proches de nos anciens voisins."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "botte/bouquet", examples: ["Il y a un bouquet de fleurs sur la table."] },
      { meaning: "faisceau", examples: ["Un rayon de soleil a pénétré dans la pièce."] },
      { meaning: "classificateur pour bottes/bouquets", examples: ["Il lui a offert un bouquet de roses."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "faconner", examples: ["L’éducation familiale façonne le caractère."] },
      { meaning: "mouler", examples: ["L'artisan a moulé un vase en argile."] },
      { meaning: "depeindre/creer", examples: ["Le roman dépeint une mère courageuse."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "compter/etre valable", examples: ["Si tu as promis, tu dois tenir parole."] },
      { meaning: "tenir parole", examples: ["Il tient toujours parole."] },
      { meaning: "calculer", examples: ["Il calculait la tête baissée."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "paralysie", examples: ["L’accident a paralysé la circulation."] },
      { meaning: "paralyser", examples: ["L'accident a paralysé sa jambe gauche."] },
      { meaning: "mettre a l'arret", examples: ["Le blizzard a paralysé la circulation urbaine."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "sortir", examples: ["Il a sorti une clé."] },
      { meaning: "retirer", examples: ["Il a sorti la clé du tiroir."] },
      { meaning: "deterrer", examples: ["L'ouvrier a dégagé la boue et le sable avec une pelle."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "ajuster", examples: ["La musique peut soulager une vie stressante."] },
      { meaning: "soulager", examples: ["La musique peut apaiser les émotions tendues."] },
      { meaning: "varier/rafraichir", examples: ["Voyager le week-end peut apporter de la variété à une vie monotone."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "elaborer des plans d'ensemble en tenant compte de tous les facteurs/cotes", examples: ["Les dirigeants doivent prendre en compte tous les aspects."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "enregistrer des bagages", examples: ["La valise doit être enregistrée."] },
      { meaning: "consigner pour expedition", examples: ["Ce lot de médicaments doit être confié à une expédition en chaîne du froid."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "complet", examples: ["Cet ensemble de documents est très complet."] },
      { meaning: "entierement equipe", examples: ["Cet hôpital est entièrement équipé."] },
      { meaning: "exhaustif", examples: ["Le rapport fournit une analyse complète des données."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "litterature et art", examples: ["L’école a organisé un spectacle artistique."] },
      { meaning: "arts", examples: ["Elle s'est spécialisée en gestion des arts à l'université."] },
      { meaning: "litteraire/artistique", examples: ["Ce café a une ambiance très artistique."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "forces armees", examples: ["Les soldats ont fini de s’armer."] },
      { meaning: "armes/equipement", examples: ["Cette équipe manque des armes et de l'équipement nécessaires."] },
      { meaning: "armer/equiper", examples: ["Ils ont équipé l'équipe de secours de nouvelles technologies."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "coordonner", examples: ["L’association des couleurs est harmonieuse."] },
      { meaning: "coordonne", examples: ["Les actions de tous les services étaient bien coordonnées."] },
      { meaning: "harmonieux", examples: ["Les couleurs de ce tableau sont très harmonieuses."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "refouler/reprimer", examples: ["Il a exprimé ses émotions réprimées."] },
      { meaning: "oppressant", examples: ["L'atmosphère dans la salle de réunion était oppressante."] },
      { meaning: "deprime", examples: ["Les échecs répétés l'ont rendu très déprimé."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "deduire", examples: ["L’acteur a incarné la vie d’une personne âgée."] },
      { meaning: "interpreter/depeindre/jouer", examples: ["Elle a interprété l'héroïne avec beaucoup de finesse."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "conscience/perception", examples: ["Il a pris conscience de la gravité du problème."] },
      { meaning: "se rendre compte de/etre conscient de", examples: ["Il a finalement pris conscience de la gravité du problème."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "original", examples: ["Une forêt primaire est préservée ici."] },
      { meaning: "primitif", examples: ["Le village conserve encore des méthodes agricoles primitives."] },
      { meaning: "primordial", examples: ["Les scientifiques étudient l'écologie des forêts primaires."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "lier/attacher", examples: ["L’infirmière l’a piqué une fois."] },
      { meaning: "piquer/enfoncer", examples: ["L'aiguille lui a piqué le doigt douloureusement."] },
      { meaning: "inserer", examples: ["Il a inséré les fleurs dans le vase."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "casser/fracturer", examples: ["Il a plié la carte."] },
      { meaning: "plier", examples: ["Elle a plié la lettre et l'a mise dans l'enveloppe."] },
      { meaning: "remise", examples: ["Ce manteau est à moins trente pour cent aujourd'hui."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "intelligence", examples: ["Les smartphones ont changé la vie."] },
      { meaning: "intelligent", examples: ["Il a acheté un réfrigérateur intelligent."] },
      { meaning: "IA", examples: ["L'IA transforme les services médicaux."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "superviseur/personne responsable", examples: ["Le responsable contrôlera le travail demain."] },
      { meaning: "etre responsable de", examples: ["Elle est chargée du travail financier de l'entreprise."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "sujet/theme special", examples: ["Aujourd’hui, la réunion a discuté d’un sujet environnemental."] },
      { meaning: "dossier", examples: ["Le journal de ce soir propose un dossier sur l'environnement."] },
      { meaning: "thematique", examples: ["Le musée a lancé une exposition thématique."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "posture/pose", examples: ["Elle garde une bonne posture."] },
      { meaning: "attitude/position", examples: ["Le gouvernement a maintenu une position ouverte envers les négociations."] },
    ],
  },
  "id": {
    "hsk6-bajie-20": [
      { meaning: "menjilat", examples: ["Dia tidak mau mengandalkan menjilat orang lain untuk mendapatkan kesempatan."] },
      { meaning: "mencari muka kepada", examples: ["Dia selalu berusaha mengambil hati atasannya agar bisa naik jabatan."] },
      { meaning: "mengambil hati", examples: ["Untuk masuk ke lingkungan itu, dia sengaja menjilat beberapa selebritas."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "mendapat penggantian biaya", examples: ["Setelah pulang dari perjalanan dinas, dia membawa kuitansi untuk diajukan penggantian biaya."] },
      { meaning: "mengajukan biaya untuk diganti", examples: ["Setelah kembali dari perjalanan dinas, dia menyerahkan tiket kereta untuk penggantian biaya."] },
      { meaning: "menghapus dari pembukuan/menjadikan rongsokan", examples: ["Mesin tua itu tidak bisa diperbaiki dan hanya bisa dibesituakan."] },
    ],
    "hsk6-bise-101": [
      { meaning: "tersumbat/tertutup", examples: ["Transportasi di sini terpencil, jadi kabar menyebar lambat."] },
      { meaning: "terisolasi", examples: ["Desa pegunungan ini dulu sangat terpencil, dan orang luar jarang datang."] },
      { meaning: "terbelakang atau kurang informasi", examples: ["Kurang informasi dapat membuat perusahaan kehilangan peluang."] },
    ],
    "hsk6-bing-135": [
      { meaning: "nilai C", examples: ["Dalam ujian ini, nilainya C."] },
      { meaning: "ketiga", examples: ["Tiga orang yang tercantum sebagai A, B, dan C semuanya harus berbicara."] },
      { meaning: "Batang Langit ketiga", examples: ["Bing adalah yang ketiga dari Batang Langit."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "menghalalkan segala cara", examples: ["Demi memenangkan pertandingan, ia menghalalkan segala cara."] },
      { meaning: "menggunakan cara apa pun", examples: ["Untuk merebut klien, dia menggunakan segala cara untuk menekan harga."] },
      { meaning: "dengan cara halal maupun tidak", examples: ["Perusahaan itu memperluas pasarnya dengan cara apa pun, baik benar maupun tidak."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "mundur", examples: ["Semua orang mulai mundur."] },
      { meaning: "menarik diri", examples: ["Sebelum hujan badai datang, tim mundur dari lembah."] },
      { meaning: "mundur kembali", examples: ["Tembakan musuh terlalu hebat, sehingga pasukan garis depan terpaksa mundur."] },
    ],
    "hsk6-chili-275": [
      { meaning: "berat dilakukan", examples: ["Buku ini terlalu berat, mengangkatnya pun susah."] },
      { meaning: "melelahkan", examples: ["Memindahkan piano ini benar-benar berat."] },
      { meaning: "mengalami kesulitan melakukan", examples: ["Dia agak kesulitan memahami siaran berita yang cepat."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "tindakan disipliner", examples: ["Dia melanggar disiplin dan dikenai sanksi oleh sekolah."] },
      { meaning: "hukuman", examples: ["Dia menerima hukuman berat karena menyontek."] },
      { meaning: "menangani/mengurus", examples: ["Sekumpulan barang ini perlu ditangani secepat mungkin."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "mencukup-cukupkan", examples: ["Untuk makan ini, sederhana saja—cukup seadanya."] },
      { meaning: "berimprovisasi", examples: ["Band itu mengimprovisasi lagu pembuka secara mendadak."] },
      { meaning: "lumayan/tidak terlalu buruk", examples: ["Makanan di kedai kecil ini lumayan."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "melesat/berlari cepat", examples: ["Kucing itu tiba-tiba melesat masuk ke dapur."] },
      { meaning: "melarikan diri", examples: ["Penjahat itu melarikan diri lewat pintu belakang di tengah kekacauan."] },
      { meaning: "mengubah/memalsukan teks", examples: ["Dia mengubah tanggal kontrak tanpa izin."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "paling buruk", examples: ["Paling-paling kita datang lagi besok."] },
      { meaning: "tidak lebih dari", examples: ["Pekerjaan ini bisa selesai dalam waktu paling lama dua hari."] },
      { meaning: "bukan masalah besar dalam konteks negatif", examples: ["Ketinggalan satu bus bukan masalah besar."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "orang yang terlibat", examples: ["Kita harus mendengarkan penjelasan dari pihak yang bersangkutan."] },
      { meaning: "pihak terkait", examples: ["Rincian kecelakaan perlu diverifikasi dengan pihak yang bersangkutan."] },
      { meaning: "pihak berperkara", examples: ["Dua pihak berperkara telah hadir di pengadilan untuk bersaksi."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "bangkrut", examples: ["Karena pengelolaannya buruk, restoran itu tutup tahun lalu."] },
      { meaning: "tutup usaha", examples: ["Sewanya terlalu tinggi, jadi toko buku itu terpaksa tutup."] },
      { meaning: "gagal sebagai bisnis", examples: ["Begitu arus dananya terputus, perusahaan itu cepat gagal sebagai bisnis."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "memutuskan", examples: ["Dia memutuskan untuk memutus hubungan dengan kebiasaan buruknya di masa lalu."] },
      { meaning: "memutus", examples: ["Badai salju memutus akses transportasi ke desa pegunungan itu."] },
      { meaning: "memutus hubungan", examples: ["Setelah pertengkaran itu, mereka memutuskan hubungan."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "menepati/memenuhi janji", examples: ["Akhirnya dia menunaikan janji yang pernah dibuatnya."] },
      { meaning: "mencairkan cek", examples: ["Dia pergi ke bank untuk mencairkan cek."] },
      { meaning: "mengubah menjadi uang tunai", examples: ["Poin-poin ini dapat dikonversi menjadi uang tunai sebelum akhir bulan."] },
    ],
    "hsk6-fan-504": [
      { meaning: "kata bantu bilangan untuk ucapan/tindakan", examples: ["Penjelasan kali ini sangat jelas."] },
      { meaning: "satu putaran/periode", examples: ["Setelah satu putaran diskusi, semua orang menyetujui rencana itu."] },
      { meaning: "jenis/macam", examples: ["Pemandangan semacam ini tak terlupakan bagi saya."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "dalam radius", examples: ["Dalam radius sepuluh kilometer tidak ada rumah sakit."] },
      { meaning: "daerah sekitar", examples: ["Bunyi lonceng dapat terdengar di seluruh daerah sekitar hingga beberapa li."] },
      { meaning: "keliling", examples: ["Para pekerja sedang mengukur keliling petak bunga."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "berkunjung", examples: ["Wartawan itu akan mewawancarai kepala sekolah besok."] },
      { meaning: "mewawancarai", examples: ["Reporter itu akan mewawancarai sutradara pemenang penghargaan besok."] },
      { meaning: "mengakses", examples: ["Pengguna tidak dapat mengakses situs web ini."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "bersikap asal-asalan", examples: ["Jangan mengelak dariku; tolong jawab dengan sungguh-sungguh."] },
      { meaning: "menanggapi seadanya", examples: ["Manajer itu menepis pelanggan dengan beberapa kata kosong."] },
      { meaning: "menyelesaikan asal jadi", examples: ["Dia tidak siap dan hanya bisa menyelesaikan laporan itu seadanya."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "menggemakan", examples: ["Begitu orang lain berbicara, dia langsung ikut-ikutan membenarkan."] },
      { meaning: "menimpali", examples: ["Begitu dia mengajukan usul, orang-orang di sekitarnya langsung ikut menimpali."] },
      { meaning: "menyetujui tanpa kritis", examples: ["Jangan menyetujui begitu saja apa pun yang dikatakan orang lain."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "berafiliasi", examples: ["Rumah sakit ini adalah rumah sakit afiliasi milik sebuah sekolah."] },
      { meaning: "melekat/terlampir", examples: ["Tiga daftar dilampirkan di bagian akhir kontrak."] },
      { meaning: "bawahan", examples: ["Departemen ini hanyalah unit bawahan."] },
      { meaning: "tambahan/penunjang", examples: ["Tempat parkir adalah fasilitas tambahan hotel."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "memuji", examples: ["Film itu memuji para buruh."] },
      { meaning: "memuja dalam pujian", examples: ["Pidato duka itu memuji pengabdiannya yang tanpa pamrih."] },
      { meaning: "menyanjung", examples: ["Penyair itu memuja kekuatan laut."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "secara terang-terangan", examples: ["Dia secara terang-terangan melanggar peraturan."] },
      { meaning: "secara publik", examples: ["Dia secara terbuka menentang keputusan itu dalam rapat."] },
      { meaning: "secara kurang ajar", examples: ["Dia berbohong dengan terang-terangan tanpa sedikit pun malu."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "mengecewakan", examples: ["Aku tidak ingin mengecewakan harapan ayah dan ibu."] },
      { meaning: "membuat kecewa", examples: ["Jangan mengecewakan harapan orang tuamu."] },
      { meaning: "gagal memenuhi harapan", examples: ["Dia tidak gagal memenuhi kepercayaan gurunya."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "pada akhirnya", examples: ["Pada akhirnya, kesehatan yang paling penting."] },
      { meaning: "dalam analisis akhir", examples: ["Pada akhirnya, kualitaslah yang paling penting."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "berharap bisa", examples: ["Dia ingin sekali segera pulang."] },
      { meaning: "sangat ingin", examples: ["Setelah mendengar kabar baik itu, dia sangat ingin segera pulang."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "kekhawatiran tentang akibat", examples: ["Dengan uang ini, dia tidak punya kekhawatiran lagi."] },
      { meaning: "kekhawatiran tentang urusan di rumah", examples: ["Setelah keluarganya tertata, dia tidak lagi khawatir soal rumah saat bepergian untuk kerja."] },
      { meaning: "kekhawatiran yang masih tersisa", examples: ["Setelah pendanaan tersedia, tim proyek tidak lagi memiliki kekhawatiran tersisa."] },
    ],
    "hsk6-huali-790": [
      { meaning: "indah gemerlap", examples: ["Dia mengenakan pakaian yang mewah."] },
      { meaning: "megah", examples: ["Sebuah lampu kristal megah tergantung di aula."] },
      { meaning: "berhias mewah", examples: ["Sulaman pada gaun resmi ini sangat berhias."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "organisasi", examples: ["Lembaga ini membantu para lansia."] },
      { meaning: "lembaga", examples: ["Lembaga ini mengkhususkan diri dalam penelitian kesehatan masyarakat."] },
      { meaning: "mekanisme", examples: ["Mekanisme internal jam itu sangat presisi."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "meributkan hal kecil", examples: ["Jangan terlalu mempersoalkan hal-hal kecil."] },
      { meaning: "menawar/berselisih soal", examples: ["Pedagang itu masih menawar soal dua yuan."] },
      { meaning: "memedulikan/mempermasalahkan", examples: ["Saya tidak peduli siapa yang meminta maaf lebih dulu."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "menginjak-injak", examples: ["Jangan menginjak-injak rumput."] },
      { meaning: "menginjak", examples: ["Tolong jangan injak rumput yang baru dipasang."] },
      { meaning: "melanggar", examples: ["Perintah ini melanggar hak warga negara."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "dayung", examples: ["Dayung di perahu itu patah."] },
      { meaning: "kayuh", examples: ["Dia menggunakan dayung untuk membawa perahu kembali ke tepi."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "lembut/manja", examples: ["Jangan terlalu manja, sebentar lagi sampai."] },
      { meaning: "dimanja", examples: ["Dia dimanjakan sejak kecil dan menjadi sangat manja."] },
      { meaning: "tidak tahan kesulitan", examples: ["Baru berjalan dua kilometer, dia sudah mengeluh lelah; dia benar-benar tidak tahan susah."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan3 menggulung/melengkung", examples: ["Dia menggulung lukisan itu lalu menyimpannya dengan rapi."] },
      { meaning: "juan4 jilid/gulungan", examples: ["Di rak buku ada satu gulungan lukisan kuno."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "berbicara terus terang/percaya diri dan panjang lebar", examples: ["Dia berbicara dengan lancar dan percaya diri di atas panggung, sama sekali tidak gugup."] },
      { meaning: "berbicara lancar", examples: ["Dia bisa berbicara lancar bahkan tanpa naskah."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "sungguh-sungguh", examples: ["Dia meminta bantuan dengan nada yang tulus."] },
      { meaning: "tulus", examples: ["Permintaan maafnya sangat tulus."] },
      { meaning: "sepenuh hati", examples: ["Dia berterima kasih sepenuh hati atas bantuan warga desa."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "memperlakukan tidak adil", examples: ["Perusahaan tidak memperlakukan karyawan lama dengan tidak adil."] },
      { meaning: "merugikan", examples: ["Bos tidak pernah mengurangi bonus karyawan lama."] },
      { meaning: "memperlakukan buruk", examples: ["Dia tidak mau memperlakukan kuda tua itu dengan buruk."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "dingin", examples: ["Jawabannya terkesan sangat dingin dan tak berperasaan."] },
      { meaning: "tak berperasaan", examples: ["Dia tampak sangat tidak berperasaan terhadap penderitaan pasien."] },
      { meaning: "kejam", examples: ["Jenderal mengeluarkan perintah eksekusi yang kejam."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "terpana", examples: ["Mendengar kabar itu, dia terpaku sejenak."] },
      { meaning: "membeku", examples: ["Pintu tiba-tiba terbuka, dan dia membeku di tempat."] },
      { meaning: "melamun/tidak fokus", examples: ["Jangan terus melamun menatap keluar jendela saat pelajaran."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "taruhan/kepentingan", examples: ["Dia akhirnya memahami apa yang dipertaruhkan dalam perkara ini."] },
      { meaning: "pro dan kontra", examples: ["Pikirkan baik-baik untung ruginya sebelum menandatangani."] },
      { meaning: "keseriusan", examples: ["Dia masih belum menyadari keseriusan masalah itu."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "mengubur", examples: ["Pekerjaan yang sibuk menenggelamkan bakatnya."] },
      { meaning: "mengaburkan", examples: ["Kebisingan menutupi suara nyanyiannya."] },
      { meaning: "membiarkan bakat tidak dikenali", examples: ["Jangan biarkan tugas rutin mengubur bakatnya."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "melangkah", examples: ["Dia melangkah masuk ke kelas dengan gugup."] },
      { meaning: "langkah panjang", examples: ["Dia melangkah lebar menuju ruang konferensi."] },
      { meaning: "melangkah masuk", examples: ["Perusahaan sedang melangkah ke pasar internasional."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "tinta", examples: ["Tintanya sudah habis."] },
      { meaning: "pengetahuan buku/budaya", examples: ["Dia benar-benar punya sedikit wawasan dari buku."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "tatapan", examples: ["Tatapan guru berhenti pada papan tulis."] },
      { meaning: "pandangan", examples: ["Dia memberikan tatapan yang menyemangati."] },
      { meaning: "penglihatan/visi", examples: ["Penglihatannya pulih dengan cepat."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "cerita orang dalam", examples: ["Wartawan itu ingin memahami cerita di balik insiden tersebut."] },
      { meaning: "informasi orang dalam", examples: ["Wartawan itu memperoleh informasi orang dalam tentang transaksi tersebut."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "menyusun draf", examples: ["Kami sedang menyusun rencana baru."] },
      { meaning: "merancang", examples: ["Sekretaris sedang menyusun agenda rapat."] },
      { meaning: "merumuskan", examples: ["Para ahli merumuskan standar evaluasi baru."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "menjulur/terangkat", examples: ["Kakinya diangkat di atas kursi."] },
      { meaning: "menopang", examples: ["Dia menyangga papan itu untuk menahan roda."] },
      { meaning: "melengkung ke atas", examples: ["Sudut kertas melengkung ke atas setelah terkena air."] },
      { meaning: "menonjol/unggul", examples: ["Dia adalah siswa yang menonjol di kelas."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "tekun", examples: ["Selama kamu tekun dan tidak menyerah, pasti akan ada kemajuan."] },
      { meaning: "terus berusaha", examples: ["Selama kamu terus berusaha, masalah sulit itu akhirnya akan terpecahkan."] },
      { meaning: "gigih", examples: ["Dia menyelidiki kebenaran dengan gigih."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "populer", examples: ["Mata kuliah ini sangat populer."] },
      { meaning: "banyak diminati", examples: ["Analis data telah menjadi posisi yang banyak dicari."] },
      { meaning: "sedang tren/panas", examples: ["Tarian ini sedang tren belakangan ini."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "menentukan", examples: ["Pengadilan memutuskan bahwa kontrak itu sah."] },
      { meaning: "mengidentifikasi sebagai", examples: ["Polisi mengidentifikasi dia sebagai tersangka."] },
      { meaning: "meyakini dengan kuat", examples: ["Dia sangat yakin bahwa kerja keras akan membuahkan hasil."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "menyetujui", examples: ["Upayanya mendapat pengakuan dari semua orang."] },
      { meaning: "mengakui", examples: ["Organisasi internasional mengakui standar ini."] },
      { meaning: "penerimaan/persetujuan", examples: ["Rencana ini mendapat persetujuan tim."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "kata bantu bilangan untuk kapal/perahu", examples: ["Ada tiga kapal berlabuh di pelabuhan."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "berbicara tanpa henti", examples: ["Begitu membicarakan sejarah, dia langsung berbicara tanpa henti."] },
      { meaning: "berbicara terus-menerus/lancar", examples: ["Pembawa acara mulai berbicara tanpa henti begitu acara dibuka."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "serbaguna", examples: ["Metode ini berlaku umum."] },
      { meaning: "digunakan/berlaku secara universal", examples: ["Jenis colokan ini digunakan secara luas di Eropa."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "khayalan", examples: ["Jangan berkhayal bisa sukses tanpa usaha."] },
      { meaning: "harapan sia-sia", examples: ["Berhasil tanpa usaha hanyalah harapan kosong."] },
      { meaning: "berfantasi", examples: ["Dia seharian berkhayal menjadi kaya dalam semalam."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "berlangsung selama", examples: ["Pelatihan ini berlangsung selama tiga bulan."] },
      { meaning: "selama suatu periode", examples: ["Pelatihan berlangsung selama tiga bulan."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "metabolisme", examples: ["Olahraga dapat meningkatkan metabolisme."] },
      { meaning: "penggantian yang lama oleh yang baru", examples: ["Pergantian yang lama dengan yang baru dalam industri sedang semakin cepat."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "jerih payah", examples: ["Buku ini menghabiskan banyak jerih payahnya."] },
      { meaning: "tenaga/pengabdian yang dicurahkan pada sesuatu", examples: ["Buku ini mewujudkan sepuluh tahun jerih payahnya yang penuh dedikasi."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "minum berlebihan", examples: ["Terus-menerus minum alkohol berlebihan akan memengaruhi kesehatan."] },
      { meaning: "penyalahgunaan alkohol", examples: ["Penyalahgunaan alkohol jangka panjang merusak kesehatannya."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "menekan/memeras", examples: ["Bos tidak boleh mengeksploitasi pekerja."] },
      { meaning: "mengeksploitasi", examples: ["Pabrik yang tidak bermoral itu mengeksploitasi pekerja sementara."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "penglihatan", examples: ["Manajer itu punya penilaian yang bagus."] },
      { meaning: "penilaian", examples: ["Dia punya penilaian yang baik saat memilih mitra."] },
      { meaning: "wawasan", examples: ["Editor ini memiliki wawasan yang unik."] },
      { meaning: "selera", examples: ["Seleranya sangat pemilih; dia hanya membeli model klasik."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "suara/audio", examples: ["Suara dari sound system di kamar itu terlalu keras."] },
      { meaning: "sistem suara/peralatan stereo", examples: ["Satu set sound system baru dibeli untuk ruang tamu."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "penggugat", examples: ["Penggugat menjelaskan situasinya kepada pengadilan."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "mengandung", examples: ["Tanah ini menumbuhkan kehidupan yang melimpah."] },
      { meaning: "membiakkan", examples: ["Lahan basah itu menjadi tempat berkembang biak banyak jenis burung air."] },
      { meaning: "memupuk", examples: ["Sekolah itu membina sekelompok ilmuwan muda."] },
      { meaning: "menimbulkan", examples: ["Krisis itu melahirkan peluang baru."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "pada kesempatan", examples: ["Saat kelulusan, guru berharap semua orang sukses."] },
      { meaning: "pada saat", examples: ["Pada saat kelulusan, dia menulis surat untuk berterima kasih kepada gurunya."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "memerintah/mengelola pemerintahan", examples: ["Pemerintah sedang menanggulangi polusi."] },
      { meaning: "mengelola/menangani", examples: ["Pabrik mulai mengolah air limbah."] },
      { meaning: "tata kelola", examples: ["Tata kelola perusahaan membutuhkan transparansi."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "terdampar", examples: ["Salju lebat membuat banyak orang terdampar di bandara."] },
      { meaning: "ditahan", examples: ["Ia ditahan di bandara karena masalah dokumen."] },
      { meaning: "tinggal di belakang", examples: ["Para relawan tetap tinggal di lokasi untuk membersihkan sampah."] },
      { meaning: "retensi/penahanan", examples: ["Pemeriksaan menunjukkan retensi makanan di dalam lambung."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "pusat gravitasi", examples: ["Silakan turunkan pusat gravitasi tubuh Anda."] },
      { meaning: "fokus/inti", examples: ["Fokus kerja tahun ini adalah kualitas."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "khidmat", examples: ["Dia berpakaian sangat formal."] },
      { meaning: "berwibawa", examples: ["Sikapnya anggun dan pantas."] },
      { meaning: "resmi", examples: ["Silakan menyampaikan pidato dengan nada formal."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai1 berada di sebelah/dekat", examples: ["Tolong semuanya duduk rapat-rapat; masih ada orang di belakang."] },
      { meaning: "ai2 menderita/menahan", examples: ["Ia menerima banyak kritik."] },
    ],
    "hsk6-ao-15": [
      { meaning: "merebus perlahan hingga kental", examples: ["Ibu menyimmer sup ikan selama dua jam."] },
      { meaning: "bertahan/menahan", examples: ["Masa sulit ini akhirnya berhasil dilalui."] },
      { meaning: "begadang", examples: ["Ia begadang sampai dini hari baru tidur."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "kemudahan", examples: ["Stasiun MRT yang baru membawa banyak kemudahan bagi warga."] },
      { meaning: "nyaman/mudah", examples: ["Transportasi di sini sangat mudah."] },
      { meaning: "memfasilitasi", examples: ["Sistem baru memudahkan proses penggantian biaya."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "tidak sanggup menanggung", examples: ["Kamar itu berantakan sampai tidak tertahankan."] },
      { meaning: "sangat/tak tertahankan", examples: ["Ruangan itu pengap dan panas tak tertahankan."] },
      { meaning: "dalam keadaan buruk", examples: ["Gedung lama itu sudah sangat rusak."] },
    ],
    "hsk6-chan-221": [
      { meaning: "mengidam makanan", examples: ["Adik laki-lakiku langsung ngiler begitu melihat kue."] },
      { meaning: "rakus terhadap makanan", examples: ["Begitu waktu makan tiba, ia sangat ingin makan."] },
      { meaning: "lahap/rakus", examples: ["Anak ini sangat rakus; begitu melihat camilan, ia langsung mengambilnya."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "tumpul", examples: ["Pisau ini sudah lama dipakai dan sudah agak tumpul."] },
      { meaning: "lamban berpikir", examples: ["Reaksinya agak lamban."] },
      { meaning: "lesu/lamban", examples: ["Komputer berjalan lamban."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "menjual", examples: ["Mengkhianati teman demi uang itu salah."] },
      { meaning: "mengkhianati/menjual keluar", examples: ["Ia mengkhianati kepercayaan temannya."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "melayani", examples: ["Ia merawat ibunya yang sakit dengan sungguh-sungguh."] },
      { meaning: "menunggu/melayani", examples: ["Perawat dengan teliti melayani pasien saat makan."] },
      { meaning: "merawat", examples: ["Ia merawat ibunya yang sudah lanjut usia di rumah."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "mempertahankan tesis", examples: ["Dia mengikuti sidang pembelaan kelulusan."] },
      { meaning: "ujian lisan", examples: ["Ia akan mengikuti sidang lisan tesisnya besok."] },
      { meaning: "menjawab sanggahan", examples: ["Ia menjawab sanggahan dengan tenang dan menanggapi keraguan."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi ceroboh", examples: ["Dia terlalu ceroboh dan meninggalkan paspornya di rumah."] },
      { meaning: "dayi gagasan utama/makna umum", examples: ["Silakan rangkum dulu gagasan utama artikel itu."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "sisi sebaliknya/berlawanan", examples: ["Kisah ini juga mengandung pelajaran dari sisi negatif."] },
      { meaning: "aspek/contoh negatif", examples: ["Kasus ini adalah contoh negatif."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "menguraikan", examples: ["Guru menguraikan masalah itu menjadi beberapa bagian."] },
      { meaning: "memecah/menganalisis", examples: ["Guru membagi soal sulit itu menjadi tiga langkah."] },
      { meaning: "mengurai secara kimia", examples: ["Bakteri dapat menguraikan daun gugur."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "montok/penuh", examples: ["Artikel ini isinya kaya."] },
      { meaning: "berlimpah", examples: ["Kemampuan dan dukungannya kini sudah memadai."] },
      { meaning: "kaya/substansial", examples: ["Isi laporan itu kaya dan meyakinkan."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "busuk/lapuk", examples: ["Kayu yang lapuk mudah patah."] },
      { meaning: "dekaden/membusuk", examples: ["Sistem yang dekaden itu harus diubah."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "sangat tersentuh", examples: ["Melihat foto lama itu membuatnya sangat terharu."] },
      { meaning: "menghela napas penuh emosi", examples: ["Melihat foto lama itu, ia menghela napas penuh perasaan."] },
      { meaning: "renungan/perasaan", examples: ["Ia menuliskan renungannya selama perjalanan."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "lahan pertanian/tanah garapan", examples: ["Petani sedang membajak tanah."] },
      { meaning: "mengolah/membajak tanah", examples: ["Pada musim semi, petani mulai mengolah tanah."] },
    ],
    "hsk6-heng-768": [
      { meaning: "horizontal", examples: ["Dia berdiri menyamping di pintu."] },
      { meaning: "menyamping/melintang", examples: ["Ia meletakkan meja itu menyamping."] },
      { meaning: "kasar/tidak masuk akal", examples: ["Cara bicaranya terlalu kasar."] },
    ],
    "hsk6-hong-769": [
      { meaning: "membujuk", examples: ["Ayah sedang membujuk anak itu agar tidur."] },
      { meaning: "menenangkan", examples: ["Ia menenangkan anak itu dengan lembut hingga tertidur."] },
      { meaning: "menipu/mengelabui", examples: ["Jangan menipu saya dengan informasi palsu."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "memulihkan", examples: ["Tolong rekonstruksi kondisi tempat kejadian seperti semula."] },
      { meaning: "merekonstruksi", examples: ["Polisi berusaha merekonstruksi jalannya kejadian."] },
      { meaning: "mereduksi secara kimia", examples: ["Hidrogen dapat mereduksi tembaga oksida secara kimia."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "fleksibel", examples: ["Rencana itu mencakup waktu yang fleksibel."] },
      { meaning: "bergerak/mobile", examples: ["Tim bergerak dapat memberi dukungan kapan saja."] },
      { meaning: "bermotor", examples: ["Becak motor diparkir di pintu masuk."] },
      { meaning: "bermanuver", examples: ["Pasukan bermanuver di daerah pegunungan."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "ujung runcing", examples: ["Perusahaan itu menggunakan teknologi mutakhir."] },
      { meaning: "mutakhir", examples: ["Perusahaan mengembangkan chip mutakhir."] },
      { meaning: "maju/canggih", examples: ["Rumah sakit ini memiliki peralatan canggih."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "kritik diri", examples: ["Dia menulis surat pernyataan kritik diri."] },
      { meaning: "meninjau/memeriksa", examples: ["Setelah rapat, kami meninjau kelemahan rencana itu."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "mata-mata", examples: ["Mata-mata dalam film itu sangat cerdik."] },
      { meaning: "agen spionase", examples: ["Seorang agen spionase asing ditemukan di perbatasan."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "apa yang dilihat dan didengar", examples: ["Perjalanan menambah pengetahuan dan pengalamannya."] },
      { meaning: "pengetahuan dan pengalaman", examples: ["Perjalanan memperluas pengetahuan dan pengalamannya."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "sehat/lengkap", examples: ["Perusahaan perlu menyempurnakan sistem manajemennya."] },
      { meaning: "memperbaiki/menyempurnakan", examples: ["Pemerintah akan menyempurnakan mekanisme pengawasan."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "menjelaskan", examples: ["Manajer menjelaskan tugas itu dengan jelas."] },
      { meaning: "mempertanggungjawabkan", examples: ["Ia harus mempertanggungjawabkan ke mana dana itu pergi."] },
      { meaning: "menyerahkan", examples: ["Silakan serahkan pekerjaan kepada rekan baru."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "bersedia/senang untuk", examples: ["Saya dengan senang hati membantu kamu pindahan."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "sudah semestinya", examples: ["Jangan menganggap bantuan itu sesuatu yang wajar dan pasti didapat."] },
      { meaning: "menganggap sudah sewajarnya", examples: ["Ia menganggap bantuan orang lain sebagai hal yang wajar."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "membasahi sampai kuyup", examples: ["Dia basah kuyup karena terguyur air."] },
      { meaning: "menuang/memercikkan", examples: ["Ia menuangkan madu di atas kue."] },
      { meaning: "menjadi basah", examples: ["Ia lupa membawa payung dan basah kuyup oleh hujan."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "menyamar sebagai", examples: ["Seseorang menyamar sebagai dokter untuk menipu para lansia."] },
      { meaning: "berpura-pura menjadi", examples: ["Ia berpura-pura menjadi wartawan untuk masuk ke tempat acara."] },
      { meaning: "mengaku sebagai", examples: ["Ia mengaku sebagai ahli untuk mendapatkan kepercayaan."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "kata bantu bilangan untuk benda kecil pipih/bulat seperti koin, cincin, medali, prangko", examples: ["Dia membeli sebuah cincin."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "melawan arus lalu lintas", examples: ["Melaju melawan arah dilarang di jalan ini."] },
      { meaning: "bergerak ke arah terbalik/salah", examples: ["Mobil itu melaju berlawanan arah di jalan satu arah."] },
      { meaning: "retrograd", examples: ["Neptunus memiliki gerak retrograde."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "menyatu", examples: ["Tujuan ini menghimpun kekuatan semua orang."] },
      { meaning: "berkumpul/menggalang", examples: ["Kemenangan ini menghimpun kepercayaan diri seluruh tim."] },
      { meaning: "mengembun", examples: ["Udara dingin mengembunkan uap air menjadi kabut."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "melengkapi", examples: ["Sekolah melengkapi ruang kelas dengan komputer."] },
      { meaning: "menyediakan dengan", examples: ["Sekolah menyediakan AC untuk setiap ruang kelas."] },
      { meaning: "peralatan", examples: ["Peralatan pemadam kebakaran sudah dikirim ke gudang."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "menerkam/bergegas ke arah", examples: ["Anak itu bergegas memeluk ibunya."] },
      { meaning: "mengepak/berkibar", examples: ["Kupu-kupu mengepakkan sayapnya dengan lembut di antara bunga-bunga."] },
      { meaning: "menjatuhkan diri ke atas", examples: ["Begitu masuk, anak itu menghambur ke pelukan ibunya."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "celah", examples: ["Cangkir ini ada bagian yang terkelupas (sumbing)."] },
      { meaning: "retakan/tembusan", examples: ["Banjir membuka celah besar pada bendungan."] },
      { meaning: "sumbing/takik", examples: ["Ada gompal kecil di bibir cangkir."] },
      { meaning: "kekurangan", examples: ["Perusahaan masih memiliki kekurangan dana sebesar tiga juta."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "manual", examples: ["Terjemahan oleh manusia lebih akurat."] },
      { meaning: "buatan manusia", examples: ["Sungai buatan manusia ini melintasi distrik baru."] },
      { meaning: "artifisial", examples: ["Dokter menyarankan memasang sendi buatan pada pasien."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "orang lain", examples: ["Jangan merepotkan orang lain."] },
      { meaning: "rumah tangga/keluarga", examples: ["Beberapa keluarga tinggal di kaki gunung."] },
      { meaning: "aku/saya dalam bahasa percakapan", examples: ["Aku sudah meminta maaf, jadi jangan marah."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "memancarkan/mengeluarkan", examples: ["Bunga itu mengeluarkan aroma."] },
      { meaning: "mendistribusikan", examples: ["Para relawan membagikan selebaran di pintu masuk."] },
      { meaning: "mengirimkan", examples: ["Sistem akan secara otomatis mengirim email pemberitahuan."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "bersemangat", examples: ["Hari ini dia terlihat sangat bangga."] },
      { meaning: "bangga/sombong", examples: ["Setelah memakai seragam baru, ia tampak sangat bangga."] },
      { meaning: "ekspresi/raut", examples: ["Raut wajahnya tampak agak lelah."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "tidak akrab/asing", examples: ["Dia baru datang, jadi lingkungan ini masih terasa asing baginya."] },
      { meaning: "kaku karena lama tidak dipakai", examples: ["Setelah bertahun-tahun tidak berlatih, teknik pianonya menjadi kaku."] },
      { meaning: "tidak dekat", examples: ["Setelah pindah, kami menjadi kurang dekat dengan tetangga lama."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "ikat/rumpun", examples: ["Di atas meja ada seikat bunga."] },
      { meaning: "berkas cahaya", examples: ["Seberkas sinar matahari masuk ke dalam ruangan."] },
      { meaning: "kata bantu bilangan untuk ikatan", examples: ["Ia memberinya seikat mawar."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "membentuk", examples: ["Pendidikan keluarga membentuk karakter."] },
      { meaning: "mencetak/membentuk", examples: ["Pengrajin membentuk vas dari tanah liat."] },
      { meaning: "menggambarkan/menciptakan", examples: ["Novel itu menggambarkan seorang ibu yang berani."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "berlaku/dianggap sah", examples: ["Kalau kamu sudah berjanji, harus ditepati."] },
      { meaning: "menepati kata-kata", examples: ["Ia selalu menepati janjinya."] },
      { meaning: "menghitung", examples: ["Ia sedang berhitung sambil menundukkan kepala."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "kelumpuhan", examples: ["Kecelakaan itu melumpuhkan lalu lintas."] },
      { meaning: "melumpuhkan", examples: ["Kecelakaan itu melumpuhkan kaki kirinya."] },
      { meaning: "membuat berhenti total", examples: ["Badai salju membuat lalu lintas kota lumpuh."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "mengeluarkan", examples: ["Dia mengeluarkan kunci."] },
      { meaning: "menarik keluar", examples: ["Ia mengeluarkan kunci dari laci."] },
      { meaning: "menggali keluar", examples: ["Pekerja menggali lumpur dan pasir dengan sekop."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "menyesuaikan", examples: ["Musik dapat meringankan kehidupan yang penuh ketegangan."] },
      { meaning: "meredakan", examples: ["Musik dapat meredakan emosi yang tegang."] },
      { meaning: "memberi variasi/menyegarkan", examples: ["Perjalanan akhir pekan dapat memberi variasi pada hidup yang monoton."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "membuat rencana menyeluruh sambil mempertimbangkan semua faktor/sisi", examples: ["Pemimpin harus mempertimbangkan semua sisi."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "mendaftarkan bagasi", examples: ["Koper perlu dibagasikan."] },
      { meaning: "mengirimkan sebagai kargo", examples: ["Batch obat ini perlu dikirim melalui pengiriman rantai dingin."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "lengkap", examples: ["Perangkat bahan ini sangat lengkap."] },
      { meaning: "berperalatan lengkap", examples: ["Rumah sakit ini memiliki fasilitas lengkap."] },
      { meaning: "komprehensif", examples: ["Laporan itu menyediakan analisis data yang komprehensif."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "sastra dan seni", examples: ["Sekolah menyelenggarakan pertunjukan seni."] },
      { meaning: "seni", examples: ["Ia mengambil jurusan manajemen seni di universitas."] },
      { meaning: "bersifat sastra/artistik", examples: ["Kafe ini punya suasana yang sangat artistik."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "angkatan bersenjata", examples: ["Para tentara sudah selesai mempersenjatai diri."] },
      { meaning: "senjata/peralatan", examples: ["Tim ini kekurangan senjata dan perlengkapan yang diperlukan."] },
      { meaning: "mempersenjatai/melengkapi", examples: ["Mereka membekali tim penyelamat dengan teknologi baru."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "mengoordinasikan", examples: ["Perpaduan warnanya sangat serasi."] },
      { meaning: "terkoordinasi", examples: ["Tindakan semua departemen sangat terkoordinasi."] },
      { meaning: "harmonis", examples: ["Warna dalam lukisan ini sangat serasi."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "menekan/menahan", examples: ["Ia mengungkapkan emosi yang selama ini dipendam."] },
      { meaning: "menindas/menyesakkan", examples: ["Suasana di ruang rapat terasa menekan."] },
      { meaning: "tertekan/depresif", examples: ["Kegagalan berulang membuatnya sangat tertekan."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "menurunkan kesimpulan", examples: ["Aktor itu memerankan kehidupan seorang lansia."] },
      { meaning: "menafsirkan/memerankan/menampilkan", examples: ["Ia memerankan tokoh utama wanita dengan sangat halus."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "kesadaran", examples: ["Dia menyadari masalah itu serius."] },
      { meaning: "menyadari", examples: ["Ia akhirnya menyadari seriusnya masalah itu."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "asli", examples: ["Hutan perawan masih dilestarikan di sini."] },
      { meaning: "primitif", examples: ["Desa itu masih mempertahankan cara bercocok tanam yang primitif."] },
      { meaning: "purba", examples: ["Para ilmuwan mempelajari ekologi hutan purba."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "mengikat", examples: ["Perawat itu menusuknya sekali."] },
      { meaning: "menusuk", examples: ["Jarum itu menusuk jarinya hingga sakit."] },
      { meaning: "memasukkan", examples: ["Ia memasukkan bunga ke dalam vas."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "patah/retak", examples: ["Dia melipat peta itu."] },
      { meaning: "melipat", examples: ["Ia melipat surat itu dan memasukkannya ke amplop."] },
      { meaning: "diskon", examples: ["Mantel ini hari ini diskon tiga puluh persen."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "kecerdasan", examples: ["Ponsel pintar telah mengubah kehidupan."] },
      { meaning: "cerdas/pintar", examples: ["Ia membeli kulkas pintar."] },
      { meaning: "AI", examples: ["AI sedang mengubah layanan medis."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "supervisor/orang yang bertanggung jawab", examples: ["Supervisor akan memeriksa pekerjaan besok."] },
      { meaning: "bertanggung jawab atas", examples: ["Ia bertanggung jawab atas pekerjaan keuangan perusahaan."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "topik/subjek khusus", examples: ["Rapat hari ini membahas topik khusus tentang lingkungan."] },
      { meaning: "fitur", examples: ["Berita malam ini memiliki liputan khusus tentang lingkungan."] },
      { meaning: "tematik", examples: ["Museum itu meluncurkan pameran tematik."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "postur/pose", examples: ["Dia menjaga postur yang baik."] },
      { meaning: "sikap/pendirian", examples: ["Pemerintah mempertahankan sikap terbuka terhadap perundingan."] },
    ],
  },
  "ja": {
    "hsk6-bajie-20": [
      { meaning: "お世辞を言う", examples: ["彼は、他人にへつらって機会を得ようとはしない。"] },
      { meaning: "取り入る", examples: ["彼は昇進するために、いつも上司に取り入ろうとしている。"] },
      { meaning: "ご機嫌を取る", examples: ["その集まりに入るため、彼は意図的に何人かの有名人に取り入った。"] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "払い戻しを受ける", examples: ["出張から戻った後、彼は領収書を持って精算しに行った。"] },
      { meaning: "経費精算を申請する", examples: ["出張から戻った後、彼女は列車の切符を精算に出した。"] },
      { meaning: "償却する/廃棄処分にする", examples: ["その古い機械は修理できず、廃棄するしかない。"] },
    ],
    "hsk6-bise-101": [
      { meaning: "塞がっている/閉ざされている", examples: ["ここは交通が不便で、情報の伝わりが遅い。"] },
      { meaning: "孤立している", examples: ["この山村は昔とても閉ざされていて、外部の人はめったに来なかった。"] },
      { meaning: "遅れている、または情報に疎い", examples: ["情報に疎いと、企業はチャンスを逃すことがある。"] },
    ],
    "hsk6-bing-135": [
      { meaning: "C評価", examples: ["今回の試験で、彼の成績はCだった。"] },
      { meaning: "第三の", examples: ["甲、乙、丙として載っている三人は全員発言しなければならない。"] },
      { meaning: "十干の第三", examples: ["丙は十干の三番目である。"] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "手段を選ばない", examples: ["彼は試合に勝つために手段を選ばない。"] },
      { meaning: "あらゆる手段を使う", examples: ["顧客を奪うために、彼は手段を選ばず価格を下げる。"] },
      { meaning: "目的のためには手段を選ばない", examples: ["その会社は手段を選ばず市場を拡大している。"] },
    ],
    "hsk6-chetui-243": [
      { meaning: "撤退する", examples: ["みんなが撤退し始めた。"] },
      { meaning: "退く", examples: ["豪雨が来る前に、隊は谷から撤退した。"] },
      { meaning: "後退する", examples: ["敵の砲火が激しすぎたため、前線部隊は後退を余儀なくされた。"] },
    ],
    "hsk6-chili-275": [
      { meaning: "骨の折れる", examples: ["この本は重すぎて、持ち上げるのが大変だ。"] },
      { meaning: "労力のいる", examples: ["このピアノを運ぶのは本当に骨が折れる。"] },
      { meaning: "するのに苦労する", examples: ["彼は速いニュース放送を聞き取るのに少し苦労している。"] },
    ],
    "hsk6-chufen-306": [
      { meaning: "懲戒処分", examples: ["彼は規律に違反し、学校から懲戒処分を受けた。"] },
      { meaning: "処罰", examples: ["彼は不正行為のため厳しい処分を受けた。"] },
      { meaning: "処理する/対処する", examples: ["この一群の商品はできるだけ早く処理しなければならない。"] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "間に合わせる", examples: ["この食事は簡単に済ませて、適当に間に合わせればいい。"] },
      { meaning: "即興でやる", examples: ["バンドは直前にオープニング曲を即興で合わせた。"] },
      { meaning: "まあまあの/悪くない", examples: ["この小さな店の味はまあまあだ。"] },
    ],
    "hsk6-cuan-342": [
      { meaning: "さっと走る/すばやく逃げる", examples: ["その猫は突然キッチンに飛び込んだ。"] },
      { meaning: "逃げる", examples: ["犯人は混乱に乗じて裏口から逃げた。"] },
      { meaning: "文章を改ざんする", examples: ["彼は無断で契約の日付を改ざんした。"] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "せいぜい/最悪でも", examples: ["最悪でも、明日また来ればいい。"] },
      { meaning: "多くても", examples: ["この仕事はせいぜい二日で終わる。"] },
      { meaning: "否定文で大したことではない", examples: ["バスを一本逃しても大したことではない。"] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "関係者", examples: ["当事者の説明を聞かなければならない。"] },
      { meaning: "当事者", examples: ["事故の詳細は当事者に確認する必要がある。"] },
      { meaning: "訴訟当事者", examples: ["二人の訴訟当事者は出廷して証言した。"] },
    ],
    "hsk6-daobi-392": [
      { meaning: "倒産する", examples: ["経営がうまくいかず、そのレストランは昨年閉店した。"] },
      { meaning: "閉店する", examples: ["家賃が高すぎたため、その書店は閉店せざるを得なかった。"] },
      { meaning: "事業として失敗する", examples: ["資金繰りが切れると、その会社はすぐに経営破綻した。"] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "断つ", examples: ["彼は過去の悪い習慣と縁を切ることにした。"] },
      { meaning: "切り離す", examples: ["吹雪が山村への交通を遮断した。"] },
      { meaning: "関係を断つ", examples: ["口論の後、彼らは付き合いを断った。"] },
    ],
    "hsk6-duixian-479": [
      { meaning: "約束を果たす", examples: ["彼はついに当初の約束を果たした。"] },
      { meaning: "小切手を現金化する", examples: ["彼は小切手を現金化するために銀行へ行った。"] },
      { meaning: "現金に換える", examples: ["これらのポイントは月末までに現金に換えられる。"] },
    ],
    "hsk6-fan-504": [
      { meaning: "話や行為を数える量詞", examples: ["この一通りの説明はとても分かりやすい。"] },
      { meaning: "一回/一期間", examples: ["ひとしきり議論した後、皆がその案に同意した。"] },
      { meaning: "種類", examples: ["このような光景は私にとって忘れがたい。"] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "半径...以内", examples: ["周囲10キロ以内に病院はない。"] },
      { meaning: "周辺地域", examples: ["鐘の音は周囲数里にわたって聞こえる。"] },
      { meaning: "円周", examples: ["作業員たちは花壇の周囲を測っている。"] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "訪問する", examples: ["記者は明日、校長を取材する。"] },
      { meaning: "インタビューする", examples: ["記者は明日、受賞した監督にインタビューする。"] },
      { meaning: "アクセスする", examples: ["ユーザーはこのウェブサイトにアクセスできない。"] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "いい加減に対応する", examples: ["私をいい加減にあしらわないで、真剣に答えてください。"] },
      { meaning: "軽くあしらう", examples: ["マネージャーは中身のない言葉をいくつか並べて客をあしらった。"] },
      { meaning: "その場しのぎで済ませる", examples: ["彼は準備しておらず、報告を何とかごまかしながら終えるしかなかった。"] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "同調する", examples: ["他人が何か言うと、彼はすぐ同調する。"] },
      { meaning: "相づちを打つ", examples: ["彼女が提案すると、そばの人たちはすぐに同調して口を挟んだ。"] },
      { meaning: "無批判に賛同する", examples: ["他人の言うことに何でも無批判に同調してはいけない。"] },
    ],
    "hsk6-fushu-604": [
      { meaning: "付属の", examples: ["この病院は学校の附属病院だ。"] },
      { meaning: "付着した/付属した", examples: ["契約書の末尾に三つのリストが添付された。"] },
      { meaning: "従属する", examples: ["この部門は単なる従属部門である。"] },
      { meaning: "補助的な", examples: ["駐車場はホテルの付属施設である。"] },
    ],
    "hsk6-gesong-637": [
      { meaning: "称賛する", examples: ["その映画は労働者を称えた。"] },
      { meaning: "賛美する", examples: ["弔辞は彼の無私の献身をたたえた。"] },
      { meaning: "褒めたたえる", examples: ["詩人は海の力をたたえている。"] },
    ],
    "hsk6-gongran-659": [
      { meaning: "公然と", examples: ["彼は公然と規定に違反した。"] },
      { meaning: "公に", examples: ["彼は会議でその決定に公然と反対した。"] },
      { meaning: "厚かましく", examples: ["彼は少しも恥じずに図々しく嘘をついた。"] },
    ],
    "hsk6-gufu-683": [
      { meaning: "期待を裏切る", examples: ["両親の期待を裏切りたくない。"] },
      { meaning: "失望させる", examples: ["両親の期待を裏切ってはいけない。"] },
      { meaning: "期待に応えられない", examples: ["彼は先生の信頼に応えた。"] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "結局", examples: ["結局のところ、健康がいちばん大切だ。"] },
      { meaning: "つまるところ", examples: ["突き詰めれば、品質こそが最も重要だ。"] },
    ],
    "hsk6-henbude-766": [
      { meaning: "できることなら...したい", examples: ["彼は今すぐ家に帰りたくてたまらない。"] },
      { meaning: "したくてたまらない", examples: ["良い知らせを聞いて、彼は今すぐ家に帰りたくてたまらなかった。"] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "結果への心配", examples: ["このお金があれば、彼には後顧の憂いがない。"] },
      { meaning: "後顧の憂い", examples: ["家族のことが落ち着いたので、彼は出張中に後顧の憂いがなかった。"] },
      { meaning: "残る懸念", examples: ["資金が確保された後、プロジェクトチームに残る懸念はなくなった。"] },
    ],
    "hsk6-huali-790": [
      { meaning: "華やかな", examples: ["彼女は華やかな服を着ている。"] },
      { meaning: "壮麗な", examples: ["ホールには華麗なクリスタルシャンデリアが掛かっている。"] },
      { meaning: "装飾的な", examples: ["この礼服の刺繍は華やかで装飾的だ。"] },
    ],
    "hsk6-jigou-840": [
      { meaning: "組織", examples: ["この機関は高齢者を支援している。"] },
      { meaning: "機関", examples: ["この機関は公衆衛生の研究を専門としている。"] },
      { meaning: "仕組み", examples: ["時計の内部機構は非常に精密だ。"] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "細かくこだわる", examples: ["些細なことにあまりこだわらないで。"] },
      { meaning: "値切る/言い争う", examples: ["その売り手はまだ二元のことで値切っていた。"] },
      { meaning: "気にする", examples: ["誰が先に謝るかは気にしない。"] },
    ],
    "hsk6-jianta-920": [
      { meaning: "踏みにじる", examples: ["芝生を踏み荒らさないでください。"] },
      { meaning: "踏む", examples: ["新しく敷いた芝生を踏まないでください。"] },
      { meaning: "侵害する", examples: ["この命令は市民の権利を侵害した。"] },
    ],
    "hsk6-jiang-927": [
      { meaning: "オール", examples: ["船のオールが折れた。"] },
      { meaning: "櫂", examples: ["彼はパドルを使って小舟を岸へ漕ぎ戻した。"] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "か弱い", examples: ["そんなにわがまま言わないで、もうすぐ着くよ。"] },
      { meaning: "甘やかされた", examples: ["彼は幼い頃から甘やかされ、とても甘ったれになった。"] },
      { meaning: "苦労に耐えられない", examples: ["たった二キロ歩いただけで疲れたと文句を言うなんて、本当に苦労に耐えられない。"] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juǎn 巻き上げる/丸まる", examples: ["彼女は絵を巻いて、きちんとしまった。"] },
      { meaning: "juàn 巻/巻物", examples: ["本棚には古い絵巻が一巻置かれていた。"] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "率直かつ自信を持って長々と話す", examples: ["彼は壇上で堂々と話し、少しも緊張していなかった。"] },
      { meaning: "流暢に話す", examples: ["彼は原稿がなくても流暢に話せる。"] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "熱心な", examples: ["彼は切実な口調で助けを求めた。"] },
      { meaning: "誠実な", examples: ["彼女の謝罪はとても誠実だった。"] },
      { meaning: "心からの", examples: ["彼は村人たちの助けに心から感謝した。"] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "不公平に扱う", examples: ["会社は古参社員を冷遇しなかった。"] },
      { meaning: "不当に少なく与える", examples: ["社長はベテラン社員のボーナスを決して出し渋らない。"] },
      { meaning: "虐待する", examples: ["彼はその老馬を粗末に扱いたくなかった。"] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "冷たい", examples: ["彼の返事はとても冷たく感じられた。"] },
      { meaning: "無情な", examples: ["彼は患者の苦痛に対してとても冷淡に見えた。"] },
      { meaning: "冷酷な", examples: ["将軍は無慈悲な処刑命令を下した。"] },
    ],
    "hsk6-leng-1133": [
      { meaning: "ぼうっとする", examples: ["その知らせを聞いて、彼はしばらく固まった。"] },
      { meaning: "固まる", examples: ["ドアが突然開き、彼はその場で固まった。"] },
      { meaning: "気を取られる", examples: ["授業中にぼんやり窓の外ばかり見ていてはいけない。"] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "利害", examples: ["彼はついに、事の重大さ（何が賭か）を理解した。"] },
      { meaning: "長所と短所", examples: ["署名する前に利害をよく考えなさい。"] },
      { meaning: "重大さ", examples: ["彼はまだ問題の重大さに気づいていない。"] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "埋める", examples: ["忙しい仕事が彼の才能を埋もれさせてしまった。"] },
      { meaning: "覆い隠す", examples: ["騒音が彼女の歌声をかき消した。"] },
      { meaning: "才能を埋もれさせる", examples: ["雑務で彼の才能を埋もれさせてはいけない。"] },
    ],
    "hsk6-mai-1218": [
      { meaning: "一歩踏み出す", examples: ["彼は緊張しながら教室に足を踏み入れた。"] },
      { meaning: "大股で歩く", examples: ["彼は大股で会場へ向かった。"] },
      { meaning: "踏み入る", examples: ["その会社は国際市場へ踏み出している。"] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "インク", examples: ["インクがなくなった。"] },
      { meaning: "学識/教養", examples: ["彼は本当に少し学がある。"] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "まなざし", examples: ["先生の視線は黒板に止まった。"] },
      { meaning: "視線", examples: ["彼女は励ますような視線を送った。"] },
      { meaning: "視力/見識", examples: ["彼の視力はすぐに回復した。"] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "内幕", examples: ["記者はその事件の内幕を知りたがっていた。"] },
      { meaning: "内部情報", examples: ["記者はその取引に関する内部情報を入手した。"] },
    ],
    "hsk6-niding-1303": [
      { meaning: "草案を作る", examples: ["私たちは新しい計画を策定しているところだ。"] },
      { meaning: "起草する", examples: ["秘書は会議の議題を作成している。"] },
      { meaning: "策定する", examples: ["専門家は新しい評価基準を策定した。"] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "突き出す/上げる", examples: ["彼は足を椅子の上に上げている。"] },
      { meaning: "支える", examples: ["彼は板を立てて車輪を止めた。"] },
      { meaning: "上向きに反る", examples: ["紙の角は水にぬれて上向きに反った。"] },
      { meaning: "優れた", examples: ["彼はクラスで際立って優秀な学生だ。"] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "粘り強く続ける", examples: ["粘り強く続けさえすれば、進歩がある。"] },
      { meaning: "やり続ける", examples: ["粘り強く続ければ、難問はいずれ解ける。"] },
      { meaning: "根気強い", examples: ["彼女は粘り強く真相を追った。"] },
    ],
    "hsk6-remen-1520": [
      { meaning: "人気のある", examples: ["この科目はとても人気がある。"] },
      { meaning: "需要がある", examples: ["データアナリストは需要の高い職種になった。"] },
      { meaning: "流行中の/ホットな", examples: ["このダンスは最近とても流行っている。"] },
    ],
    "hsk6-rending-1533": [
      { meaning: "認定する", examples: ["裁判所はその契約が合法だと認定した。"] },
      { meaning: "...と見なす", examples: ["警察は彼を容疑者と認定した。"] },
      { meaning: "固く信じる", examples: ["彼女は努力は必ず報われると固く信じている。"] },
    ],
    "hsk6-renke-1534": [
      { meaning: "承認する", examples: ["彼の努力は皆の承認を得た。"] },
      { meaning: "認める", examples: ["国際機関はこの基準を認めた。"] },
      { meaning: "受容/承認", examples: ["この案はチームの承認を得た。"] },
    ],
    "hsk6-sou-1721": [
      { meaning: "船舶を数える量詞", examples: ["港には船が三隻停泊している。"] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "延々と話す", examples: ["彼は歴史の話になると、滔々と話し続ける。"] },
      { meaning: "止まらず流暢に話す", examples: ["司会者は開会と同時に途切れなく話し始めた。"] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "汎用の", examples: ["この方法は一般に通用する。"] },
      { meaning: "広く使われる/適用できる", examples: ["このタイプのプラグはヨーロッパで広く使われている。"] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "妄想", examples: ["努力せずに成功できるなどと妄想するな。"] },
      { meaning: "むなしい望み", examples: ["努力せずに成功するなど、ただのむなしい望みだ。"] },
      { meaning: "空想する", examples: ["彼は一日中、一夜にして大金持ちになることを妄想している。"] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "...にわたって続く", examples: ["研修は3か月間にわたる。"] },
      { meaning: "...の期間", examples: ["研修期間は三か月です。"] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "新陳代謝", examples: ["運動は新陳代謝を促進できる。"] },
      { meaning: "古いものが新しいものに置き換わること", examples: ["業界では新旧交代が加速している。"] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "心血", examples: ["この本には彼の多大な労力が注がれている。"] },
      { meaning: "注ぎ込まれた労力/献身", examples: ["この本には彼女の十年にわたる心血が注がれている。"] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "酒を飲み過ぎる", examples: ["常に大酒を飲むと健康に影響する。"] },
      { meaning: "アルコール乱用", examples: ["長期の飲酒乱用が彼の健康を損なった。"] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "圧搾する/搾り取る", examples: ["雇い主は労働者を搾取してはならない。"] },
      { meaning: "搾取する", examples: ["悪質な工場は臨時労働者を搾取した。"] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "視力", examples: ["マネージャーは見る目がある。"] },
      { meaning: "判断力", examples: ["彼女はパートナー選びの目が確かだ。"] },
      { meaning: "洞察力", examples: ["この編集者は独自の見識を持っている。"] },
      { meaning: "審美眼", examples: ["彼の趣味は厳しく、定番の型しか買わない。"] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "音/音声", examples: ["部屋の音響の音量が大きすぎる。"] },
      { meaning: "音響装置/ステレオ機器", examples: ["リビングに新しい音響セットを買った。"] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "原告", examples: ["原告は裁判所に事情を説明した。"] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "身ごもっている", examples: ["大地は豊かな生命を育んだ。"] },
      { meaning: "育む", examples: ["湿地は多くの種類の水鳥を育む。"] },
      { meaning: "育成する", examples: ["その学校は若い科学者たちを育てた。"] },
      { meaning: "生み出す", examples: ["危機は新たな機会を生んだ。"] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "...の折に", examples: ["卒業の折に、先生は皆の成功を願った。"] },
      { meaning: "...の時に", examples: ["卒業に際して、彼は先生に感謝の手紙を書いた。"] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "統治する/管理する", examples: ["政府は汚染の対策に取り組んでいる。"] },
      { meaning: "管理する/治療する", examples: ["工場は廃水の処理を始めた。"] },
      { meaning: "統治", examples: ["企業統治には透明性が必要だ。"] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "足止めされる", examples: ["大雪で多くの人が空港で足止めになった。"] },
      { meaning: "拘留される", examples: ["彼は書類の問題で空港に留め置かれた。"] },
      { meaning: "後に残る", examples: ["ボランティアは現場に残ってごみを片づけた。"] },
      { meaning: "滞留", examples: ["検査で胃内の食物停滞が示された。"] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "重心", examples: ["体の重心を低くしてください。"] },
      { meaning: "焦点/核心", examples: ["今年の仕事の重点は品質だ。"] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "厳粛な", examples: ["彼はとても改まった服装をしている。"] },
      { meaning: "威厳のある", examples: ["彼女の振る舞いは品位があり適切だ。"] },
      { meaning: "正式な", examples: ["正式な口調で挨拶してください。"] },
    ],
    "hsk6-ai-1": [
      { meaning: "āi 隣り合う/近くにある", examples: ["みなさん詰めて座ってください。後ろにもまだ人がいます。"] },
      { meaning: "ái 苦しむ/耐える", examples: ["彼はひとしきり批判を受けた。"] },
    ],
    "hsk6-ao-15": [
      { meaning: "煮込む/煮詰める", examples: ["母は魚のスープを2時間煮込んだ。"] },
      { meaning: "耐える", examples: ["この困難な時期をようやく耐え抜いた。"] },
      { meaning: "夜更かしする", examples: ["彼は明け方まで起きてから寝た。"] },
    ],
    "hsk6-bianli-112": [
      { meaning: "便利さ", examples: ["新しい地下鉄駅は住民に多くの便利さをもたらした。"] },
      { meaning: "便利な", examples: ["ここは交通がとても便利だ。"] },
      { meaning: "促進する", examples: ["新しいシステムは精算手続きを円滑にした。"] },
    ],
    "hsk6-bukan-162": [
      { meaning: "耐えられない", examples: ["部屋はひどく散らかっていて、目も当てられないほどだった。"] },
      { meaning: "耐え難いほど/ひどく", examples: ["部屋は耐えられないほど蒸し暑かった。"] },
      { meaning: "悪い状態で", examples: ["古い建物はすでにひどく老朽化している。"] },
    ],
    "hsk6-chan-221": [
      { meaning: "食べ物を欲しがる", examples: ["弟はケーキを見るなり、食べたくてたまらなくなった。"] },
      { meaning: "食いしん坊の", examples: ["食事の時間になると、彼は特に食いしん坊になる。"] },
      { meaning: "大食いの", examples: ["この子はとても食い意地が張っていて、おやつを見るとすぐ取る。"] },
    ],
    "hsk6-chidun-276": [
      { meaning: "鈍い/切れ味が悪い", examples: ["この包丁は長く使ったので、もう少し切れ味が鈍っている。"] },
      { meaning: "頭の回転が遅い", examples: ["彼の反応は少し鈍い。"] },
      { meaning: "緩慢な", examples: ["パソコンの動作が鈍い。"] },
    ],
    "hsk6-chumai-297": [
      { meaning: "売る", examples: ["金のために友人を売るのは間違っている。"] },
      { meaning: "裏切る/売り渡す", examples: ["彼は友人の信頼を裏切った。"] },
    ],
    "hsk6-cihou-337": [
      { meaning: "仕える", examples: ["彼女は病気の母親を丁寧に世話している。"] },
      { meaning: "世話をする", examples: ["看護師は食事中の患者を丁寧に世話した。"] },
      { meaning: "面倒を見る", examples: ["彼女は家で年老いた母親の世話をしている。"] },
    ],
    "hsk6-dabian-351": [
      { meaning: "論文を弁論する", examples: ["彼は卒業論文の口頭試問（ディフェンス）に参加する。"] },
      { meaning: "口頭試問", examples: ["彼女は明日、論文の口頭審査に参加する。"] },
      { meaning: "異議に答える", examples: ["彼は落ち着いて反論に答え、疑問に応じた。"] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dàyi 不注意な", examples: ["彼は不注意で、パスポートを家に置き忘れた。"] },
      { meaning: "dàyì 大意/おおまかな意味", examples: ["まず文章の大意を要約してください。"] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "裏面/反対側", examples: ["この話には反面の教訓もある。"] },
      { meaning: "否定的な側面/例", examples: ["この事例は反面教師だ。"] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "分解する", examples: ["先生はその問題をいくつかの部分に分けて説明した。"] },
      { meaning: "分けて分析する", examples: ["先生は難問を三つの手順に分解した。"] },
      { meaning: "分解する", examples: ["細菌は落ち葉を分解できる。"] },
    ],
    "hsk6-fengman-572": [
      { meaning: "ふっくらした/豊かな", examples: ["この記事は内容が充実している。"] },
      { meaning: "十分な", examples: ["彼の能力と後ろ盾はすでに十分に整っている。"] },
      { meaning: "豊富な/充実した", examples: ["報告の内容は充実していて説得力がある。"] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "腐った/朽ちた", examples: ["腐った木は折れやすい。"] },
      { meaning: "退廃した/腐敗した", examples: ["腐敗した制度は変えなければならない。"] },
    ],
    "hsk6-gankai-617": [
      { meaning: "深く心を動かされる", examples: ["古い写真を見て、彼は感慨にふけった。"] },
      { meaning: "感慨深くため息をつく", examples: ["古い写真を見て、彼はさまざまな思いにため息をついた。"] },
      { meaning: "感慨/思い", examples: ["彼女は旅の中での感慨を書き留めた。"] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "農地/耕作地", examples: ["農家は畑を耕している。"] },
      { meaning: "土地を耕す", examples: ["春になると、農民は土地を耕し始める。"] },
    ],
    "hsk6-heng-768": [
      { meaning: "水平の", examples: ["彼は戸口で横向きに立っていた。"] },
      { meaning: "横向きに/横切って", examples: ["彼は机を横向きに置いた。"] },
      { meaning: "横柄な/理不尽な", examples: ["彼の話し方はあまりに横柄だ。"] },
    ],
    "hsk6-hong-769": [
      { meaning: "なだめる", examples: ["父は子どもを寝かしつけようとあやしている。"] },
      { meaning: "慰める", examples: ["彼女は優しく子どもをあやして寝かしつけた。"] },
      { meaning: "だます/欺く", examples: ["偽情報で私をだまさないで。"] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "復元する", examples: ["現場の状況を再現してください。"] },
      { meaning: "再構築する", examples: ["警察は事件の経緯を再現しようと努めた。"] },
      { meaning: "化学的に還元する", examples: ["水素は酸化銅を化学的に還元できる。"] },
    ],
    "hsk6-jidong-839": [
      { meaning: "柔軟な", examples: ["計画には融通のきく時間が含まれている。"] },
      { meaning: "機動的な", examples: ["機動チームはいつでも支援できる。"] },
      { meaning: "動力付きの", examples: ["電動三輪車が入口に停まっている。"] },
      { meaning: "機動する", examples: ["部隊は山地で機動した。"] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "尖った先端", examples: ["その会社は最先端の技術を使っている。"] },
      { meaning: "最先端の", examples: ["会社は最先端のチップを開発している。"] },
      { meaning: "先進的な", examples: ["この病院は先進的な設備を備えている。"] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "自己批判", examples: ["彼は反省文を書いた。"] },
      { meaning: "見直す/点検する", examples: ["会議後、私たちは案の欠陥を検討した。"] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "スパイ", examples: ["映画のスパイは機転が利く。"] },
      { meaning: "諜報員", examples: ["国境で外国の諜報員が発見された。"] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "見聞", examples: ["旅行は彼の見聞を広げた。"] },
      { meaning: "知識と経験", examples: ["旅行は彼の見聞を広げた。"] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "健全な/完全な", examples: ["会社は管理制度を整備する必要がある。"] },
      { meaning: "改善する/整備する", examples: ["政府は監督制度を整備する。"] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "説明する", examples: ["マネージャーは任務をはっきり説明した。"] },
      { meaning: "申し開きをする", examples: ["彼は資金の行方を説明しなければならない。"] },
      { meaning: "引き渡す", examples: ["仕事を新しい同僚に引き継いでください。"] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "喜んで...する", examples: ["引っ越しを手伝うのは喜んで。"] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "当然のこととして", examples: ["助けてもらうことを当然だと思わないで。"] },
      { meaning: "当然だと思う", examples: ["彼は他人の助けを当然のものと考えている。"] },
    ],
    "hsk6-lin-1168": [
      { meaning: "びしょ濡れにする", examples: ["彼は水を浴びてびしょ濡れになった。"] },
      { meaning: "注ぐ/振りかける", examples: ["彼女はケーキに蜂蜜をかけた。"] },
      { meaning: "濡れる", examples: ["傘を忘れて、彼は雨でびしょぬれになった。"] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "なりすます", examples: ["医者になりすまして高齢者をだます者がいる。"] },
      { meaning: "...のふりをする", examples: ["彼は記者のふりをして会場に入った。"] },
      { meaning: "...を装う", examples: ["彼女は専門家を装って信用を得た。"] },
    ],
    "hsk6-mei-1232": [
      { meaning: "硬貨、指輪、メダル、切手など小さく平たい/丸い物を数える量詞", examples: ["彼女は指輪を一つ買った。"] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "逆走する", examples: ["この道路では逆走が禁止されている。"] },
      { meaning: "逆方向に進む", examples: ["その車は一方通行の道路を逆走していた。"] },
      { meaning: "逆行する", examples: ["海王星には逆行運動がある。"] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "凝集する", examples: ["この目標は皆の力を結集させた。"] },
      { meaning: "集まる/結集する", examples: ["この勝利はチーム全体の自信を結集させた。"] },
      { meaning: "凝縮する", examples: ["冷たい空気が水蒸気を凝結させて霧にする。"] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "装備する", examples: ["学校は教室にパソコンを備え付けた。"] },
      { meaning: "備え付ける", examples: ["学校は各教室にエアコンを備え付けた。"] },
      { meaning: "設備", examples: ["消防設備はすでに倉庫に運ばれた。"] },
    ],
    "hsk6-pu-1390": [
      { meaning: "飛びかかる/突進する", examples: ["子どもは母親に飛びついた。"] },
      { meaning: "羽ばたく/はためく", examples: ["蝶は花の間でそっと羽ばたいていた。"] },
      { meaning: "身を投げ出す", examples: ["子どもは入るなり母親の腕の中に飛び込んだ。"] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "隙間", examples: ["このカップには欠けがある。"] },
      { meaning: "破れ口", examples: ["洪水が堤防に決壊口を開けた。"] },
      { meaning: "欠け/切れ込み", examples: ["カップの縁に小さな欠けがある。"] },
      { meaning: "不足分", examples: ["会社にはまだ三百万の資金不足がある。"] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "手作業の", examples: ["人手による翻訳のほうがより正確だ。"] },
      { meaning: "人造の", examples: ["この人工河川は新地区を通っている。"] },
      { meaning: "人工の", examples: ["医師は患者に人工関節を入れることを勧めた。"] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "他人", examples: ["他人に迷惑をかけないで。"] },
      { meaning: "世帯/家族", examples: ["山のふもとに数軒の家が住んでいる。"] },
      { meaning: "口語の私", examples: ["もう謝ったんだから、怒らないで。"] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "放つ/発する", examples: ["花が香りを放っている。"] },
      { meaning: "配布する", examples: ["ボランティアは入口でチラシを配った。"] },
      { meaning: "送り出す", examples: ["システムは通知メールを自動的に送信する。"] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "元気そうな", examples: ["彼は今日はとても得意げに見える。"] },
      { meaning: "得意げな/威張った", examples: ["彼は新しい制服を着ると、とても得意げに見えた。"] },
      { meaning: "表情/様子", examples: ["彼女の表情は少し疲れて見えた。"] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "不慣れな", examples: ["彼は来たばかりで、環境にはまだ慣れていない。"] },
      { meaning: "腕が鈍った", examples: ["何年も練習しなかったため、彼のピアノの技術は鈍った。"] },
      { meaning: "親しくない", examples: ["引っ越してから、私たちは昔の隣人と疎遠になった。"] },
    ],
    "hsk6-shu-1693": [
      { meaning: "束/房", examples: ["机の上に花が一束置いてある。"] },
      { meaning: "光線", examples: ["一筋の日差しが部屋に差し込んだ。"] },
      { meaning: "束を数える量詞", examples: ["彼は彼女に一束のバラを贈った。"] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "形作る", examples: ["家庭教育は人格を形作る。"] },
      { meaning: "形成する", examples: ["職人は粘土で花瓶を形作った。"] },
      { meaning: "描き出す/創造する", examples: ["その小説は勇敢な母親を描いている。"] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "有効である/数に入る", examples: ["約束したなら、それは有効にしなきゃ。"] },
      { meaning: "約束を守る", examples: ["彼はいつも約束を守る。"] },
      { meaning: "計算する", examples: ["彼はうつむいて計算していた。"] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "麻痺", examples: ["事故で交通が麻痺した。"] },
      { meaning: "麻痺させる", examples: ["事故で彼の左脚は麻痺した。"] },
      { meaning: "停止状態にする", examples: ["猛吹雪で都市交通は麻痺した。"] },
    ],
    "hsk6-tao-1754": [
      { meaning: "取り出す", examples: ["彼は鍵を取り出した。"] },
      { meaning: "引き抜く", examples: ["彼は引き出しから鍵を取り出した。"] },
      { meaning: "掘り出す", examples: ["作業員はシャベルで泥や砂を掘り出した。"] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "調整する", examples: ["音楽は緊張した生活を和らげてくれる。"] },
      { meaning: "和らげる", examples: ["音楽は緊張した気持ちを和らげることができる。"] },
      { meaning: "変化を加える/気分転換させる", examples: ["週末旅行は単調な生活に変化を加えられる。"] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "全体計画を立てつつ、すべての要素/側面を考慮する", examples: ["指導者は各方面を総合的に考慮すべきだ。"] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "荷物を預ける", examples: ["そのスーツケースは預け入れが必要だ。"] },
      { meaning: "託送する", examples: ["この医薬品のロットはコールドチェーンで委託輸送する必要がある。"] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "完全な", examples: ["この資料一式はよく整っている。"] },
      { meaning: "十分に備わった", examples: ["この病院は設備が整っている。"] },
      { meaning: "包括的な", examples: ["報告書は包括的なデータ分析を提供している。"] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "文学と芸術", examples: ["学校は文芸公演を企画した。"] },
      { meaning: "芸術", examples: ["彼女は大学で芸術管理を専攻した。"] },
      { meaning: "文学的/芸術的な", examples: ["このカフェはとても文芸的な雰囲気がある。"] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "武装勢力", examples: ["兵士たちは武装を終えた。"] },
      { meaning: "武器/装備", examples: ["この部隊は必要な武器装備を欠いている。"] },
      { meaning: "武装させる/装備する", examples: ["彼らは新技術で救援隊を装備した。"] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "調整する", examples: ["色の組み合わせが調和している。"] },
      { meaning: "調和の取れた", examples: ["各部門の行動はよく協調していた。"] },
      { meaning: "調和した", examples: ["この絵の色彩はとても調和している。"] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "抑圧する/抑える", examples: ["彼は抑え込んでいた感情を口にした。"] },
      { meaning: "重苦しい", examples: ["会議室の雰囲気はとても重苦しかった。"] },
      { meaning: "落ち込んだ", examples: ["相次ぐ失敗で彼はひどく落ち込んだ。"] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "推論する", examples: ["その俳優は高齢者の生活を演じた。"] },
      { meaning: "解釈する/演じる/表現する", examples: ["彼女はヒロインをとても繊細に演じた。"] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "意識/認識", examples: ["彼は問題が深刻だと気づいた。"] },
      { meaning: "気づく/認識する", examples: ["彼はついに問題の深刻さに気づいた。"] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "元の", examples: ["ここには原生林が保護されている。"] },
      { meaning: "原始的な", examples: ["村にはまだ原始的な農耕方法が残っている。"] },
      { meaning: "太古の", examples: ["科学者は原生林の生態を研究している。"] },
    ],
    "hsk6-zha-2263": [
      { meaning: "縛る/結ぶ", examples: ["看護師は彼に一回針を刺した。"] },
      { meaning: "刺す/突く", examples: ["針が彼女の指を刺して痛んだ。"] },
      { meaning: "差し込む", examples: ["彼は花を瓶に挿した。"] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "折れる/骨折する", examples: ["彼は地図を折り畳んだ。"] },
      { meaning: "折り畳む", examples: ["彼女は手紙を折って封筒に入れた。"] },
      { meaning: "割引", examples: ["このコートは今日三割引きだ。"] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "知能", examples: ["スマートフォンは生活を変えた。"] },
      { meaning: "知能のある/スマートな", examples: ["彼はスマート冷蔵庫を買った。"] },
      { meaning: "AI", examples: ["AIは医療サービスを変えつつある。"] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "主管者/責任者", examples: ["主管は明日、仕事を点検する。"] },
      { meaning: "担当する", examples: ["彼女は会社の財務業務を担当している。"] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "特別なテーマ/主題", examples: ["今日の会議では環境についてのテーマを議論した。"] },
      { meaning: "特集", examples: ["今夜のニュースには環境特集がある。"] },
      { meaning: "テーマ別の", examples: ["博物館はテーマ展を開催した。"] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "姿勢/ポーズ", examples: ["彼女は良い姿勢を保っている。"] },
      { meaning: "態度/立場", examples: ["政府は交渉に対して開かれた姿勢を保った。"] },
    ],
  },
  "ko": {
    "hsk6-bajie-20": [
      { meaning: "아첨하다", examples: ["그는 남에게 아첨해서 기회를 얻는 것에 의존하고 싶어 하지 않는다."] },
      { meaning: "환심을 사다", examples: ["그는 승진하려고 늘 상사의 환심을 사려 한다."] },
      { meaning: "비위를 맞추다", examples: ["그 모임에 들어가려고 그는 일부러 몇몇 유명인에게 환심을 샀다."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "환급받다", examples: ["출장에서 돌아온 뒤 그는 영수증을 가져가서 경비 처리를 했다."] },
      { meaning: "경비 정산을 신청하다", examples: ["출장에서 돌아온 뒤 그녀는 기차표를 경비 처리하려고 제출했다."] },
      { meaning: "상각하다/폐기 처리하다", examples: ["그 낡은 기계는 고칠 수 없어 폐기할 수밖에 없다."] },
    ],
    "hsk6-bise-101": [
      { meaning: "막힌/닫힌", examples: ["여기는 교통이 불편하고 고립되어 소식이 매우 더디다."] },
      { meaning: "고립된", examples: ["이 산골 마을은 예전에 매우 고립되어 외부인이 거의 오지 않았다."] },
      { meaning: "뒤떨어졌거나 정보에 어두운", examples: ["정보에 어두우면 기업이 기회를 놓칠 수 있다."] },
    ],
    "hsk6-bing-135": [
      { meaning: "C 등급", examples: ["이번 시험에서 그는 성적이 C였다."] },
      { meaning: "세 번째", examples: ["갑, 을, 병으로 적힌 세 사람은 모두 발언해야 한다."] },
      { meaning: "천간의 셋째", examples: ["병은 천간의 세 번째이다."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "수단과 방법을 가리지 않다", examples: ["그는 경기를 이기기 위해 수단과 방법을 가리지 않았다."] },
      { meaning: "어떤 수단이든 쓰다", examples: ["고객을 빼앗기 위해 그는 수단과 방법을 가리지 않고 가격을 낮춘다."] },
      { meaning: "수단과 방법을 가리지 않고", examples: ["그 회사는 수단과 방법을 가리지 않고 시장을 넓힌다."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "후퇴하다", examples: ["모두가 후퇴하기 시작했다."] },
      { meaning: "철수하다", examples: ["폭우가 오기 전에 대원들은 계곡에서 철수했다."] },
      { meaning: "물러나다", examples: ["적의 화력이 너무 거세서 전방 부대는 물러날 수밖에 없었다."] },
    ],
    "hsk6-chili-275": [
      { meaning: "힘든", examples: ["이 책은 너무 무거워서 들기가 힘들다."] },
      { meaning: "고된", examples: ["이 피아노를 옮기는 것은 정말 힘들다."] },
      { meaning: "하는 데 어려움을 겪다", examples: ["그는 빠른 뉴스 방송을 이해하는 데 조금 어려움을 겪는다."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "징계 처분", examples: ["그는 규율을 어겨 학교로부터 징계를 받았다."] },
      { meaning: "처벌", examples: ["그는 부정행위로 엄한 처분을 받았다."] },
      { meaning: "처리하다/대처하다", examples: ["이 물량은 가능한 한 빨리 처리해야 한다."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "그럭저럭 때우다", examples: ["이번 끼니는 간단히 대충 때우면 된다."] },
      { meaning: "즉흥적으로 해내다", examples: ["밴드는 마지막 순간에 오프닝 곡을 즉흥으로 맞췄다."] },
      { meaning: "그럭저럭 괜찮은", examples: ["이 작은 가게의 음식 맛은 그럭저럭 괜찮다."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "휙 달아나다/재빨리 움직이다", examples: ["그 고양이는 갑자기 부엌으로 휙 뛰어 들어갔다."] },
      { meaning: "도망치다", examples: ["범인은 혼란을 틈타 뒷문으로 달아났다."] },
      { meaning: "글을 고치거나 변조하다", examples: ["그는 허가 없이 계약 날짜를 고쳤다."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "최악의 경우", examples: ["최악의 경우 우리 내일 다시 한 번 오면 돼."] },
      { meaning: "기껏해야", examples: ["이 일은 많아야 이틀이면 끝낼 수 있다."] },
      { meaning: "부정문에서 대수롭지 않음", examples: ["버스 한 대를 놓치는 것은 별일 아니다."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "관련자", examples: ["당사자의 설명을 들어야 한다."] },
      { meaning: "당사자", examples: ["사고의 세부 사항은 당사자에게 확인해야 한다."] },
      { meaning: "소송 당사자", examples: ["두 소송 당사자는 법정에 출석해 증언했다."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "파산하다", examples: ["경영이 좋지 않아 그 식당은 지난해 폐업했다."] },
      { meaning: "폐업하다", examples: ["임대료가 너무 높아서 그 서점은 문을 닫을 수밖에 없었다."] },
      { meaning: "사업에 실패하다", examples: ["자금 흐름이 끊기자 회사는 곧 사업에 실패했다."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "끊다", examples: ["그는 과거의 나쁜 습관과 완전히 결별하기로 했다."] },
      { meaning: "차단하다", examples: ["눈보라가 산골 마을로 가는 교통을 끊었다."] },
      { meaning: "관계를 끊다", examples: ["다툰 뒤 그들은 관계를 끊었다."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "약속을 지키다", examples: ["그는 마침내 처음의 약속을 지켰다."] },
      { meaning: "수표를 현금화하다", examples: ["그는 수표를 현금화하러 은행에 갔다."] },
      { meaning: "현금으로 바꾸다", examples: ["이 포인트들은 월말 전까지 현금으로 바꿀 수 있다."] },
    ],
    "hsk6-fan-504": [
      { meaning: "말이나 행동을 세는 양사", examples: ["이번 설명은 매우 명확하다."] },
      { meaning: "한 차례/한 기간", examples: ["한 차례 토론을 거친 뒤 모두가 그 방안에 동의했다."] },
      { meaning: "종류", examples: ["이런 광경은 나에게 잊기 어렵다."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "반경 ... 이내", examples: ["반경 10킬로미터 이내에 병원이 없다."] },
      { meaning: "주변 지역", examples: ["종소리는 주변 몇 리 안에서 모두 들린다."] },
      { meaning: "원주", examples: ["작업자들이 화단의 둘레를 재고 있다."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "방문하다", examples: ["기자는 내일 교장을 인터뷰한다."] },
      { meaning: "인터뷰하다", examples: ["기자는 내일 수상한 감독을 인터뷰할 것이다."] },
      { meaning: "접속하다", examples: ["사용자는 이 웹사이트에 접속할 수 없다."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "건성으로 대하다", examples: ["나를 대충 넘기지 말고 진지하게 대답해 줘."] },
      { meaning: "대충 넘기다", examples: ["매니저는 몇 마디 빈말로 고객을 대충 넘겼다."] },
      { meaning: "임시방편으로 넘기다", examples: ["그는 준비가 안 되어 있어서 보고를 대충 넘기며 끝낼 수밖에 없었다."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "맞장구치다", examples: ["남이 한마디 하면 그는 곧바로 맞장구친다."] },
      { meaning: "거들어 말하다", examples: ["그녀가 제안하자마자 옆 사람들은 곧바로 맞장구쳤다."] },
      { meaning: "무비판적으로 동의하다", examples: ["다른 사람이 뭐라고 하든 무비판적으로 동조하지 마라."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "부속된", examples: ["이 병원은 학교 부속 병원이다."] },
      { meaning: "붙어 있는/부착된", examples: ["계약서 뒤에 세 개의 목록이 첨부되었다."] },
      { meaning: "종속된", examples: ["이 부서는 단지 부속 기관일 뿐이다."] },
      { meaning: "보조적인", examples: ["주차장은 호텔의 부대시설이다."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "찬양하다", examples: ["그 영화는 노동자들을 찬양했다."] },
      { meaning: "찬미하다", examples: ["추도사는 그의 사심 없는 헌신을 기렸다."] },
      { meaning: "격찬하다", examples: ["시인은 바다의 힘을 찬양한다."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "공공연히", examples: ["그는 공공연히 규정을 위반했다."] },
      { meaning: "공개적으로", examples: ["그는 회의에서 그 결정에 공개적으로 반대했다."] },
      { meaning: "뻔뻔스럽게", examples: ["그는 전혀 부끄러워하지 않고 뻔뻔하게 거짓말을 했다."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "기대를 저버리다", examples: ["나는 부모님의 기대를 저버리고 싶지 않다."] },
      { meaning: "실망시키다", examples: ["부모님의 기대를 저버리지 마라."] },
      { meaning: "기대에 부응하지 못하다", examples: ["그는 선생님의 신뢰를 저버리지 않았다."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "결국", examples: ["결국 건강이 가장 중요하다."] },
      { meaning: "최종적으로 보면", examples: ["결국 가장 중요한 것은 품질이다."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "가능하다면 ...하고 싶다", examples: ["그는 당장 집에 돌아가고 싶어 했다."] },
      { meaning: "몹시 ...하고 싶다", examples: ["좋은 소식을 듣고 그는 당장 집에 가고 싶어 안달이 났다."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "결과에 대한 걱정", examples: ["이 돈이 생기고 나서 그는 뒤탈이 없다."] },
      { meaning: "뒷걱정", examples: ["가족이 잘 안정되자 그는 출장 중 집안 걱정이 없었다."] },
      { meaning: "남아 있는 우려", examples: ["자금이 확보된 뒤 프로젝트 팀은 더 이상 남은 걱정이 없었다."] },
    ],
    "hsk6-huali-790": [
      { meaning: "화려한", examples: ["그녀는 화려한 옷을 입고 있다."] },
      { meaning: "장려한", examples: ["홀에는 화려한 크리스털 샹들리에가 걸려 있다."] },
      { meaning: "장식적인", examples: ["이 예복의 자수는 장식이 화려하다."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "조직", examples: ["이 기관은 노인들을 돕는다."] },
      { meaning: "기관", examples: ["이 기관은 공중 보건 연구를 전문으로 한다."] },
      { meaning: "메커니즘", examples: ["시계의 내부 기구는 매우 정밀하다."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "시시콜콜 따지다", examples: ["사소한 일에 너무 따지지 마라."] },
      { meaning: "흥정하다/따지다", examples: ["그 상인은 아직도 2위안을 두고 흥정하고 있었다."] },
      { meaning: "신경 쓰다", examples: ["누가 먼저 사과하는지는 신경 쓰지 않는다."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "짓밟다", examples: ["잔디를 밟지 마세요."] },
      { meaning: "밟다", examples: ["새로 깐 잔디를 밟지 마세요."] },
      { meaning: "침해하다", examples: ["이 명령은 시민의 권리를 침해했다."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "노", examples: ["배에 있던 노가 부러졌다."] },
      { meaning: "패들", examples: ["그는 노를 써서 작은 배를 기슭까지 저어 갔다."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "여린", examples: ["너무 유난 떨지 마, 곧 도착해."] },
      { meaning: "응석받이의", examples: ["그는 어릴 때부터 응석받이로 자라 매우 버릇없어졌다."] },
      { meaning: "고생을 견디지 못하는", examples: ["겨우 2킬로미터를 걷고 피곤하다고 불평하다니, 그는 정말 고생을 못 견딘다."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juǎn 말아 올리다/말리다", examples: ["그녀는 그림을 말아 잘 보관했다."] },
      { meaning: "juàn 권/두루마리", examples: ["책장 위에 고화 한 권축이 놓여 있었다."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "솔직하고 자신 있게 길게 말하다", examples: ["그는 무대 위에서 자신 있게 막힘없이 말했고, 전혀 긴장하지 않았다."] },
      { meaning: "유창하게 말하다", examples: ["그는 원고 없이도 유창하게 말할 수 있다."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "간절한", examples: ["그는 간절한 말투로 도움을 요청했다."] },
      { meaning: "성실한", examples: ["그녀의 사과는 매우 진심이었다."] },
      { meaning: "진심 어린", examples: ["그는 마을 사람들의 도움에 진심으로 감사했다."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "부당하게 대하다", examples: ["회사는 오래된 직원들을 부당하게 대우하지 않았다."] },
      { meaning: "제 몫보다 적게 주다", examples: ["사장은 오래된 직원들의 보너스를 결코 적게 주지 않는다."] },
      { meaning: "학대하다", examples: ["그는 그 늙은 말을 함부로 대하고 싶지 않았다."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "차가운", examples: ["그의 대답은 매우 냉정하게 느껴졌다."] },
      { meaning: "냉담한", examples: ["그는 환자의 고통에 매우 냉담해 보였다."] },
      { meaning: "무자비한", examples: ["장군은 무자비한 처형 명령을 내렸다."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "멍해지다", examples: ["그 소식을 듣고 그는 한동안 얼어붙어 있었다."] },
      { meaning: "얼어붙다", examples: ["문이 갑자기 열리자 그는 그 자리에서 얼어붙었다."] },
      { meaning: "주의가 산만해지다", examples: ["수업 시간에 멍하니 창밖만 바라보지 마라."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "이해관계", examples: ["그는 마침내 그 일의 득실이 무엇인지 이해했다."] },
      { meaning: "장단점", examples: ["서명하기 전에 장단점을 잘 따져 보세요."] },
      { meaning: "심각성", examples: ["그는 아직 문제의 심각성을 깨닫지 못했다."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "묻다", examples: ["바쁜 일이 그의 재능을 묻어버렸다."] },
      { meaning: "가리다", examples: ["소음이 그녀의 노랫소리를 덮어 버렸다."] },
      { meaning: "재능을 묻히게 하다", examples: ["잡무가 그의 재능을 묻히게 하지 마라."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "한 걸음 내딛다", examples: ["그는 긴장한 채로 교실 안으로 발을 내디뎠다."] },
      { meaning: "성큼 걷다", examples: ["그는 큰 걸음으로 회의장으로 향했다."] },
      { meaning: "발을 들여놓다", examples: ["그 회사는 국제 시장으로 나아가고 있다."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "잉크", examples: ["잉크가 다 떨어졌다."] },
      { meaning: "학식/교양", examples: ["그는 정말 어느 정도 학식이 있다."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "시선", examples: ["선생님의 시선이 칠판에 멈췄다."] },
      { meaning: "눈길", examples: ["그녀는 격려하는 눈빛을 보냈다."] },
      { meaning: "시력/안목", examples: ["그의 시력은 빠르게 회복되었다."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "내막", examples: ["기자는 그 사건의 내막을 알고 싶어 했다."] },
      { meaning: "내부 정보", examples: ["기자는 그 거래에 대한 내부 정보를 입수했다."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "초안을 만들다", examples: ["우리는 새로운 계획을 작성하고 있다."] },
      { meaning: "기초하다", examples: ["비서는 회의 의제를 작성하고 있다."] },
      { meaning: "제정하다", examples: ["전문가들은 새로운 평가 기준을 마련했다."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "치켜세우다/들어 올리다", examples: ["그는 발을 의자 위에 올려두고 있었다."] },
      { meaning: "받치다", examples: ["그는 바퀴를 막으려고 판자를 받쳐 올렸다."] },
      { meaning: "위로 말리다", examples: ["종이 모서리가 물에 젖어 위로 말려 올라갔다."] },
      { meaning: "뛰어난", examples: ["그는 반에서 뛰어난 학생이다."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "끈기 있게 계속하다", examples: ["끈기 있게만 하면 반드시 발전이 있다."] },
      { meaning: "계속 밀고 나가다", examples: ["끈질기게 계속하면 어려운 문제도 결국 풀릴 것이다."] },
      { meaning: "끈질긴", examples: ["그녀는 끈질기게 진실을 추적했다."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "인기 있는", examples: ["이 과목은 인기가 매우 많다."] },
      { meaning: "수요가 많은", examples: ["데이터 분석가는 수요가 많은 직무가 되었다."] },
      { meaning: "유행하는/핫한", examples: ["이 춤은 최근에 인기를 끌고 있다."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "판정하다", examples: ["법원은 그 계약이 합법이라고 판정했다."] },
      { meaning: "...로 인정하다", examples: ["경찰은 그를 용의자로 판단했다."] },
      { meaning: "굳게 믿다", examples: ["그녀는 노력이 반드시 보답받을 것이라고 굳게 믿는다."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "승인하다", examples: ["그의 노력은 모두의 인정을 받았다."] },
      { meaning: "인정하다", examples: ["국제기구는 이 기준을 인정했다."] },
      { meaning: "수용/승인", examples: ["이 방안은 팀의 승인을 받았다."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "선박을 세는 양사", examples: ["항구에 배 세 척이 정박해 있다."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "끝없이 말하다", examples: ["그는 역사 이야기를 하면 끝없이 말을 쏟아낸다."] },
      { meaning: "멈추지 않고 유창하게 말하다", examples: ["사회자는 행사가 시작되자마자 쉬지 않고 말하기 시작했다."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "범용의", examples: ["이 방법은 일반적으로 적용할 수 있다."] },
      { meaning: "널리 쓰이는/적용 가능한", examples: ["이런 종류의 플러그는 유럽에서 보편적으로 사용된다."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "망상", examples: ["노력도 하지 않고 성공하겠다고 망상하지 마라."] },
      { meaning: "헛된 희망", examples: ["노력 없이 성공한다는 것은 헛된 바람일 뿐이다."] },
      { meaning: "공상하다", examples: ["그는 하루 종일 하룻밤 사이에 부자가 되는 상상을 한다."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "...동안 지속되다", examples: ["교육 기간은 3개월이다."] },
      { meaning: "...의 기간", examples: ["교육은 3개월 동안 진행된다."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "신진대사", examples: ["운동은 신진대사를 촉진할 수 있다."] },
      { meaning: "낡은 것이 새것으로 대체됨", examples: ["업계의 신구 교체가 빨라지고 있다."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "심혈", examples: ["이 책에는 그가 많은 정성과 노력을 쏟았다."] },
      { meaning: "쏟아부은 노력/헌신", examples: ["이 책에는 그녀의 10년간의 헌신적인 노력이 담겨 있다."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "술을 과하게 마시다", examples: ["계속 폭음하면 건강에 영향을 준다."] },
      { meaning: "알코올 남용", examples: ["장기간의 알코올 남용이 그의 건강을 해쳤다."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "압착하다/짜내다", examples: ["사장은 노동자를 착취해서는 안 된다."] },
      { meaning: "착취하다", examples: ["악덕 공장은 임시 노동자들을 착취했다."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "시력", examples: ["그 매니저는 안목이 좋다."] },
      { meaning: "판단력", examples: ["그녀는 파트너를 고를 때 판단력이 좋다."] },
      { meaning: "통찰력", examples: ["이 편집자는 독특한 통찰력을 가지고 있다."] },
      { meaning: "안목", examples: ["그의 취향은 까다로워서 클래식한 스타일만 산다."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "소리/오디오", examples: ["방 안의 음향기기 소리가 너무 크다."] },
      { meaning: "음향 장비/스테레오 장비", examples: ["거실에 새 오디오 시스템 한 세트를 샀다."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "원고", examples: ["원고는 법원에 상황을 설명했다."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "임신하고 있다", examples: ["땅은 풍부한 생명을 길러 낸다."] },
      { meaning: "키우다", examples: ["습지는 여러 종류의 물새를 번식시킨다."] },
      { meaning: "육성하다", examples: ["그 학교는 젊은 과학자들을 길러냈다."] },
      { meaning: "생겨나게 하다", examples: ["위기는 새로운 기회를 낳았다."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "...을 맞아", examples: ["졸업할 즈음 선생님은 모두가 성공하길 바랐다."] },
      { meaning: "...할 때에", examples: ["졸업할 때 그는 선생님께 감사 편지를 썼다."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "통치하다/관리하다", examples: ["정부가 오염을 관리하고 있다."] },
      { meaning: "관리하다/치료하다", examples: ["공장은 폐수 처리를 시작했다."] },
      { meaning: "통치", examples: ["기업 지배구조에는 투명성이 필요하다."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "발이 묶이다", examples: ["폭설로 많은 사람이 공항에 발이 묶였다."] },
      { meaning: "구금되다", examples: ["그는 서류 문제로 공항에 억류되었다."] },
      { meaning: "뒤에 남다", examples: ["자원봉사자들은 현장에 남아 쓰레기를 치웠다."] },
      { meaning: "체류/잔류", examples: ["검사에서 위 안에 음식물이 정체되어 있음이 나타났다."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "무게중심", examples: ["몸의 무게중심을 낮춰 주세요."] },
      { meaning: "초점/핵심", examples: ["올해 업무의 중점은 품질이다."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "엄숙한", examples: ["그는 매우 격식을 갖춰 입었다."] },
      { meaning: "위엄 있는", examples: ["그녀의 행동거지는 품위 있고 적절하다."] },
      { meaning: "격식 있는", examples: ["격식 있는 어조로 연설해 주세요."] },
    ],
    "hsk6-ai-1": [
      { meaning: "āi 옆에 붙다/가까이 있다", examples: ["다들 바짝 붙어서 앉아 주세요. 뒤에 아직 사람이 있어요."] },
      { meaning: "ái 고통받다/견디다", examples: ["그는 한 차례 비판을 받았다."] },
    ],
    "hsk6-ao-15": [
      { meaning: "졸이다/푹 끓이다", examples: ["엄마는 생선탕을 두 시간 동안 푹 끓였다."] },
      { meaning: "견디다", examples: ["이 어려운 시기를 마침내 견뎌 냈다."] },
      { meaning: "밤을 새우다", examples: ["그는 새벽까지 버티다가 잠들었다."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "편리함", examples: ["새 지하철역은 주민들에게 많은 편의를 가져다준다."] },
      { meaning: "편리한", examples: ["이곳은 교통이 매우 편리하다."] },
      { meaning: "편의를 제공하다", examples: ["새 시스템은 비용 정산 절차를 편리하게 했다."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "견딜 수 없다", examples: ["방이 어지러움이 견딜 수 없을 정도였다."] },
      { meaning: "견딜 수 없을 정도로/몹시", examples: ["방은 견딜 수 없을 만큼 후덥지근했다."] },
      { meaning: "나쁜 상태의", examples: ["낡은 건물은 이미 몹시 허름한 상태다."] },
    ],
    "hsk6-chan-221": [
      { meaning: "음식을 탐내다", examples: ["동생은 케이크를 보자마자 군침을 흘렸다."] },
      { meaning: "식탐 많은", examples: ["식사 시간이 되면 그는 유난히 먹을 것을 탐낸다."] },
      { meaning: "대식가의", examples: ["이 아이는 너무 식탐이 많아서 간식을 보면 바로 집는다."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "둔한/무딘", examples: ["이 칼은 오래 써서 이미 좀 무뎌졌다."] },
      { meaning: "둔한 머리의", examples: ["그의 반응은 다소 둔하다."] },
      { meaning: "느릿한", examples: ["컴퓨터가 느리게 작동한다."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "팔다", examples: ["돈 때문에 친구를 배신하는 것은 옳지 않다."] },
      { meaning: "배신하다/팔아넘기다", examples: ["그는 친구의 신뢰를 배신했다."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "시중들다", examples: ["그녀는 병든 어머니를 정성껏 돌본다."] },
      { meaning: "돌보다", examples: ["간호사는 식사 중인 환자를 세심하게 시중들었다."] },
      { meaning: "보살피다", examples: ["그녀는 집에서 연로한 어머니를 돌본다."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "논문을 변론하다", examples: ["그는 졸업 논문 구두심사에 참가한다."] },
      { meaning: "구술 심사", examples: ["그녀는 내일 논문 구술 심사에 참석한다."] },
      { meaning: "이의 제기에 답하다", examples: ["그는 침착하게 이의에 답하고 의문에 응답했다."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dàyi 부주의한", examples: ["그는 너무 부주의해서 여권을 집에 두고 왔다."] },
      { meaning: "dàyì 대의/대략적인 뜻", examples: ["먼저 글의 대의를 요약해 주세요."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "뒷면/반대쪽", examples: ["이 이야기에도 반면교사가 되는 교훈이 있다."] },
      { meaning: "부정적인 측면/예", examples: ["이 사례는 부정적인 본보기다."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "분해하다", examples: ["선생님은 문제를 몇 부분으로 나누어 설명했다."] },
      { meaning: "나누어 분석하다", examples: ["선생님은 어려운 문제를 세 단계로 나누었다."] },
      { meaning: "분해하다", examples: ["박테리아는 낙엽을 분해할 수 있다."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "통통한/풍만한", examples: ["이 글은 내용이 충실하다."] },
      { meaning: "충분한", examples: ["그의 능력과 기반은 이제 충분히 갖추어졌다."] },
      { meaning: "풍부한/충실한", examples: ["보고서 내용은 풍부하고 설득력이 있다."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "썩은/부패한", examples: ["썩은 나무는 쉽게 부러진다."] },
      { meaning: "퇴폐적인/쇠락한", examples: ["부패한 제도는 반드시 바뀌어야 한다."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "깊이 감동하다", examples: ["오래된 사진을 보고 그는 감회에 젖었다."] },
      { meaning: "감회에 젖어 탄식하다", examples: ["오래된 사진을 보고 그는 여러 감정에 젖어 탄식했다."] },
      { meaning: "감회/느낌", examples: ["그녀는 여행 중의 감회를 적었다."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "농지/경작지", examples: ["농부가 땅을 갈고 있다."] },
      { meaning: "땅을 갈다", examples: ["봄이 되면 농민들은 땅을 갈기 시작한다."] },
    ],
    "hsk6-heng-768": [
      { meaning: "수평의", examples: ["그는 문앞에 옆으로 서 있었다."] },
      { meaning: "옆으로/가로질러", examples: ["그는 책상을 옆으로 놓았다."] },
      { meaning: "무례한/불합리한", examples: ["그는 말을 너무 무례하게 한다."] },
    ],
    "hsk6-hong-769": [
      { meaning: "달래다", examples: ["아빠가 아이를 재우려고 달래고 있다."] },
      { meaning: "진정시키다", examples: ["그녀는 부드러운 목소리로 아이를 달래 재웠다."] },
      { meaning: "속이다/기만하다", examples: ["거짓 정보로 나를 속이지 마."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "복원하다", examples: ["현장을 한번 복원해 주세요."] },
      { meaning: "재구성하다", examples: ["경찰은 사건 발생 과정을 재구성하려고 노력했다."] },
      { meaning: "화학적으로 환원하다", examples: ["수소는 산화구리를 화학적으로 환원할 수 있다."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "융통성 있는", examples: ["계획에는 기동 시간(예비 시간)이 포함되어 있다."] },
      { meaning: "기동적인", examples: ["기동팀은 언제든 지원할 수 있다."] },
      { meaning: "동력화된", examples: ["전동 삼륜차가 입구에 세워져 있다."] },
      { meaning: "기동하다", examples: ["부대는 산악 지대에서 기동했다."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "뾰족한 끝", examples: ["회사는 최첨단 기술을 사용한다."] },
      { meaning: "최첨단의", examples: ["회사는 첨단 칩을 개발한다."] },
      { meaning: "선진적인", examples: ["이 병원은 첨단 장비를 갖추고 있다."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "자기비판", examples: ["그는 반성문을 한 장 썼다."] },
      { meaning: "검토하다/점검하다", examples: ["회의 후 우리는 방안의 허점을 검토했다."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "스파이", examples: ["영화 속 스파이는 매우 영리하다."] },
      { meaning: "첩보원", examples: ["국경에서 외국 첩보원이 발견되었다."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "견문", examples: ["여행은 그의 견문과 경험을 넓혀 주었다."] },
      { meaning: "지식과 경험", examples: ["여행은 그의 견문을 넓혔다."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "건전한/완전한", examples: ["회사는 관리 제도를 더 건전하게 갖춰야 한다."] },
      { meaning: "개선하다/완비하다", examples: ["정부는 감독 체계를 개선할 것이다."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "설명하다", examples: ["매니저가 업무를 명확히 설명해 주었다."] },
      { meaning: "해명하다", examples: ["그는 자금의 행방을 해명해야 한다."] },
      { meaning: "넘겨주다", examples: ["업무를 새 동료에게 인계해 주세요."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "기꺼이 ...하다", examples: ["나는 네 이사를 기꺼이 도와주겠다."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "당연한 일로", examples: ["도움을 당연한 것으로 여기지 마라."] },
      { meaning: "당연하게 여기다", examples: ["그는 다른 사람의 도움을 당연하게 여긴다."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "흠뻑 적시다", examples: ["그는 물에 흠뻑 젖었다."] },
      { meaning: "붓다/뿌리다", examples: ["그녀는 케이크 위에 꿀을 뿌렸다."] },
      { meaning: "젖다", examples: ["그는 우산을 잊어버려 비에 흠뻑 젖었다."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "사칭하다", examples: ["누군가 의사를 사칭해 노인들을 속였다."] },
      { meaning: "...인 척하다", examples: ["그는 기자인 척하고 회의장에 들어갔다."] },
      { meaning: "...로 가장하다", examples: ["그녀는 전문가 행세를 하며 신뢰를 얻었다."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "동전, 반지, 메달, 우표 같은 작고 납작하거나 둥근 물건을 세는 양사", examples: ["그녀는 반지 하나를 샀다."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "역주행하다", examples: ["이 도로에서는 역주행이 금지되어 있다."] },
      { meaning: "반대 방향으로 가다", examples: ["그 차는 일방통행 도로에서 역주행했다."] },
      { meaning: "역행하는", examples: ["해왕성에는 역행 운동이 있다."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "응집하다", examples: ["이 목표는 모두의 힘을 한데 모았다."] },
      { meaning: "모이다/결집하다", examples: ["이번 승리는 팀 전체의 자신감을 결집했다."] },
      { meaning: "응축하다", examples: ["찬 공기는 수증기를 응결시켜 안개로 만든다."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "장비하다", examples: ["학교는 교실에 컴퓨터를 갖추어 놓았다."] },
      { meaning: "갖추어 주다", examples: ["학교는 각 교실에 에어컨을 갖추었다."] },
      { meaning: "장비", examples: ["소방 장비는 이미 창고로 운송되었다."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "덮치다/달려들다", examples: ["아이가 엄마에게 달려들었다."] },
      { meaning: "퍼덕이다/펄럭이다", examples: ["나비가 꽃 사이에서 가볍게 날개를 퍼덕였다."] },
      { meaning: "몸을 던지다", examples: ["아이는 들어오자마자 엄마 품에 안겼다."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "틈", examples: ["이 컵에는 이가 나갔다."] },
      { meaning: "뚫린 곳/파손부", examples: ["홍수가 둑에 터진 틈을 냈다."] },
      { meaning: "이 빠진 곳/홈", examples: ["컵 가장자리에 작은 이가 빠진 부분이 있다."] },
      { meaning: "부족분", examples: ["그 회사에는 아직 300만의 자금 부족분이 있다."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "수작업의", examples: ["사람이 하는 번역이 더 정확하다."] },
      { meaning: "인간이 만든", examples: ["이 인공 하천은 신구를 가로지른다."] },
      { meaning: "인공의", examples: ["의사는 환자에게 인공 관절을 넣자고 제안했다."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "다른 사람", examples: ["남에게 폐를 끼치지 마."] },
      { meaning: "가구/가족", examples: ["산기슭에 몇 가구가 살고 있다."] },
      { meaning: "구어체의 나/저", examples: ["내가 이미 사과했으니 화내지 마."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "내뿜다/발산하다", examples: ["꽃에서 냄새가 난다."] },
      { meaning: "배포하다", examples: ["자원봉사자들이 입구에서 전단지를 배포했다."] },
      { meaning: "내보내다", examples: ["시스템이 알림 이메일을 자동으로 발송한다."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "활기찬", examples: ["그는 오늘 매우 의기양양해 보인다."] },
      { meaning: "의기양양한/거만한", examples: ["그는 새 제복을 입고 나서 무척 으쓱해 보였다."] },
      { meaning: "표정/기색", examples: ["그녀의 표정은 다소 피곤해 보였다."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "낯선", examples: ["그는 막 와서 환경이 아직 낯설다."] },
      { meaning: "서툴러진", examples: ["여러 해 연습하지 않아 그의 피아노 기법은 녹슬었다."] },
      { meaning: "친하지 않은", examples: ["이사한 뒤 우리는 옛 이웃들과 서먹해졌다."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "다발/송이", examples: ["탁자 위에 꽃 한 다발이 놓여 있다."] },
      { meaning: "광선", examples: ["한 줄기 햇빛이 방 안으로 비쳤다."] },
      { meaning: "다발을 세는 양사", examples: ["그는 그녀에게 장미 한 다발을 선물했다."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "형성하다", examples: ["가정교육은 성격을 형성한다."] },
      { meaning: "빚다", examples: ["장인은 진흙으로 꽃병을 빚었다."] },
      { meaning: "묘사하다/창조하다", examples: ["그 소설은 용감한 어머니를 그려냈다."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "유효하다/계산에 넣다", examples: ["약속했으면 지켜야 한다."] },
      { meaning: "약속을 지키다", examples: ["그는 늘 약속을 지킨다."] },
      { meaning: "계산하다", examples: ["그는 고개를 숙인 채 계산하고 있었다."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "마비", examples: ["사고로 교통이 마비되었다."] },
      { meaning: "마비시키다", examples: ["사고로 그의 왼쪽 다리가 마비되었다."] },
      { meaning: "정지 상태로 만들다", examples: ["눈보라가 도시 교통을 마비시켰다."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "꺼내다", examples: ["그는 열쇠를 꺼냈다."] },
      { meaning: "뽑아내다", examples: ["그는 서랍에서 열쇠를 꺼냈다."] },
      { meaning: "파내다", examples: ["인부는 삽으로 진흙과 모래를 파냈다."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "조절하다", examples: ["음악은 긴장된 생활을 완화해 줄 수 있다."] },
      { meaning: "완화하다", examples: ["음악은 긴장된 감정을 풀어 줄 수 있다."] },
      { meaning: "변화를 주다/기분 전환을 시키다", examples: ["주말 여행은 단조로운 생활에 변화를 줄 수 있다."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "종합적으로 계획하면서 모든 요소/측면을 고려하다", examples: ["지도자는 여러 측면을 두루 고려해야 한다."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "수하물을 부치다", examples: ["여행가방은 위탁 수하물로 부쳐야 한다."] },
      { meaning: "위탁 운송하다", examples: ["이 의약품 묶음은 콜드체인 위탁 운송이 필요하다."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "완전한", examples: ["이 자료 세트는 아주 완비되어 있다."] },
      { meaning: "충분히 갖춘", examples: ["이 병원은 시설이 완비되어 있다."] },
      { meaning: "포괄적인", examples: ["보고서는 포괄적인 데이터 분석을 제공한다."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "문학과 예술", examples: ["학교는 문예 공연을 조직했다."] },
      { meaning: "예술", examples: ["그녀는 대학에서 예술 경영을 전공했다."] },
      { meaning: "문학적/예술적인", examples: ["이 카페는 매우 예술적인 분위기가 있다."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "무장 세력", examples: ["병사들은 이미 무장을 마쳤다."] },
      { meaning: "무기/장비", examples: ["이 팀은 필요한 무기와 장비가 부족하다."] },
      { meaning: "무장시키다/장비하다", examples: ["그들은 구조대를 신기술로 무장시켰다."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "조정하다", examples: ["색상 조합이 매우 조화롭다."] },
      { meaning: "조화된", examples: ["각 부서의 행동은 잘 조율되어 있었다."] },
      { meaning: "조화로운", examples: ["이 그림의 색채는 매우 조화롭다."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "억누르다/억압하다", examples: ["그는 억눌린 감정을 털어놓았다."] },
      { meaning: "억압적인", examples: ["회의실 분위기는 매우 억압적이었다."] },
      { meaning: "우울한", examples: ["잇따른 실패로 그는 매우 우울해졌다."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "추론하다", examples: ["그 배우는 노인의 삶을 연기해 표현했다."] },
      { meaning: "해석하다/연기하다/표현하다", examples: ["그녀는 여주인공을 매우 섬세하게 표현했다."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "의식/인식", examples: ["그는 문제가 매우 심각하다는 것을 깨달았다."] },
      { meaning: "깨닫다/인식하다", examples: ["그는 마침내 문제의 심각성을 깨달았다."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "원래의", examples: ["이곳에는 원시림이 보존되어 있다."] },
      { meaning: "원시적인", examples: ["마을에는 아직 원시적인 농경 방식이 남아 있다."] },
      { meaning: "태고의", examples: ["과학자들은 원시림의 생태를 연구한다."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "묶다/동이다", examples: ["간호사가 그에게 한 번 찔렀다."] },
      { meaning: "찌르다/쑤시다", examples: ["바늘이 그녀의 손가락을 찔러 아팠다."] },
      { meaning: "꽂다", examples: ["그는 꽃을 병에 꽂았다."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "부러지다/골절되다", examples: ["그는 지도를 접었다."] },
      { meaning: "접다", examples: ["그녀는 편지를 접어 봉투에 넣었다."] },
      { meaning: "할인", examples: ["이 코트는 오늘 30퍼센트 할인된다."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "지능", examples: ["스마트폰이 생활을 바꿔 놓았다."] },
      { meaning: "지능적인/스마트한", examples: ["그는 스마트 냉장고를 샀다."] },
      { meaning: "AI", examples: ["AI가 의료 서비스를 바꾸고 있다."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "주관자/책임자", examples: ["상사가 내일 업무를 점검한다."] },
      { meaning: "담당하다", examples: ["그녀는 회사의 재무 업무를 담당한다."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "특별 주제/주제", examples: ["오늘 회의에서는 환경 관련 주제를 논의했다."] },
      { meaning: "특집", examples: ["오늘 밤 뉴스에는 환경 특집이 있다."] },
      { meaning: "주제별의", examples: ["박물관은 주제별 전시를 시작했다."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "자세/포즈", examples: ["그녀는 좋은 자세를 유지한다."] },
      { meaning: "태도/입장", examples: ["정부는 협상에 대해 개방적인 태도를 유지했다."] },
    ],
  },
  "pt-BR": {
    "hsk6-bajie-20": [
      { meaning: "bajular", examples: ["Ele não quer depender de bajular os outros para conseguir oportunidades."] },
      { meaning: "puxar o saco de", examples: ["Ele está sempre tentando bajular o chefe para ser promovido."] },
      { meaning: "insinuar-se junto a", examples: ["Para entrar naquele círculo, ele deliberadamente se insinuou junto a várias celebridades."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "ser reembolsado", examples: ["Depois de voltar da viagem a trabalho, ele levou a nota fiscal para pedir reembolso."] },
      { meaning: "apresentar despesas para reembolso", examples: ["Depois de voltar da viagem de negócios, ela apresentou as passagens de trem para reembolso."] },
      { meaning: "baixar como perda/sucatear", examples: ["Aquela máquina antiga não pode ser consertada e só pode ser descartada."] },
    ],
    "hsk6-bise-101": [
      { meaning: "bloqueado/fechado", examples: ["Aqui o transporte é precário e isolado, então as notícias chegam devagar."] },
      { meaning: "isolado", examples: ["Essa aldeia nas montanhas costumava ser muito isolada, e pessoas de fora raramente vinham."] },
      { meaning: "atrasado ou mal informado", examples: ["Estar mal informado pode fazer uma empresa perder oportunidades."] },
    ],
    "hsk6-bing-135": [
      { meaning: "nota C", examples: ["Nesta prova, a nota dele foi C."] },
      { meaning: "terceiro", examples: ["As três pessoas listadas como A, B e C precisam falar."] },
      { meaning: "terceiro Tronco Celestial", examples: ["Bing é o terceiro dos Troncos Celestiais."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "não medir esforços", examples: ["Para ganhar a competição, ele não mede esforços."] },
      { meaning: "usar qualquer meio", examples: ["Para conquistar clientes, ele usa qualquer meio para baixar os preços."] },
      { meaning: "por bem ou por mal", examples: ["Aquela empresa expande seu mercado por meios lícitos ou ilícitos."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "recuar", examples: ["Todos começaram a recuar."] },
      { meaning: "retirar-se", examples: ["Antes da tempestade chegar, a equipe se retirou do vale."] },
      { meaning: "retroceder", examples: ["O fogo inimigo era intenso demais, então as tropas da linha de frente foram obrigadas a recuar."] },
    ],
    "hsk6-chili-275": [
      { meaning: "árduo", examples: ["Este livro é pesado demais; é difícil até levantá-lo."] },
      { meaning: "trabalhoso", examples: ["Mover este piano é realmente trabalhoso."] },
      { meaning: "ter dificuldade para fazer algo", examples: ["Ele tem certa dificuldade para entender noticiários rápidos."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "medida disciplinar", examples: ["Ele violou a disciplina e recebeu uma punição disciplinar da escola."] },
      { meaning: "punição", examples: ["Ele recebeu uma punição severa por colar."] },
      { meaning: "lidar/tratar com", examples: ["Este lote de mercadorias precisa ser tratado o mais rápido possível."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "improvisar com o que há", examples: ["Essa refeição pode ser simples; dá para quebrar o galho."] },
      { meaning: "improvisar", examples: ["A banda improvisou uma música de abertura no último minuto."] },
      { meaning: "razoável/não muito ruim", examples: ["A comida desta lojinha é razoável."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "disparar/esgueirar-se rapidamente", examples: ["Aquele gato disparou de repente para dentro da cozinha."] },
      { meaning: "fugir", examples: ["O criminoso fugiu pela porta dos fundos em meio ao caos."] },
      { meaning: "alterar/adulterar um texto", examples: ["Ele alterou a data do contrato sem autorização."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "na pior das hipóteses", examples: ["No pior dos casos, a gente vem de novo amanhã."] },
      { meaning: "não mais que", examples: ["Este trabalho pode ser concluído em no máximo dois dias."] },
      { meaning: "não é grande coisa em contextos negativos", examples: ["Perder um ônibus não é grande coisa."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "pessoa envolvida", examples: ["Precisamos ouvir a explicação da parte envolvida."] },
      { meaning: "parte interessada", examples: ["Os detalhes do acidente precisam ser verificados com a parte interessada."] },
      { meaning: "litigante", examples: ["Os dois litigantes compareceram ao tribunal para testemunhar."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "ir à falência", examples: ["Por má gestão, aquele restaurante fechou no ano passado."] },
      { meaning: "fechar", examples: ["O aluguel era alto demais, então aquela livraria teve que fechar."] },
      { meaning: "fracassar como negócio", examples: ["Quando o fluxo de caixa se rompeu, a empresa rapidamente fracassou."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "romper", examples: ["Ele decidiu cortar de vez os laços com os maus hábitos do passado."] },
      { meaning: "cortar", examples: ["A nevasca cortou o transporte até a aldeia nas montanhas."] },
      { meaning: "romper relações", examples: ["Depois da briga, eles romperam relações."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "cumprir uma promessa", examples: ["Ele finalmente cumpriu a promessa que tinha feito no começo."] },
      { meaning: "descontar um cheque", examples: ["Ele foi ao banco para descontar um cheque."] },
      { meaning: "converter em dinheiro", examples: ["Esses pontos podem ser convertidos em dinheiro antes do fim do mês."] },
    ],
    "hsk6-fan-504": [
      { meaning: "classificador para fala/ação", examples: ["Esta explicação foi muito clara."] },
      { meaning: "uma rodada/período", examples: ["Depois de uma rodada de discussão, todos concordaram com o plano."] },
      { meaning: "tipo/espécie", examples: ["Esse tipo de cena é inesquecível para mim."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "dentro de um raio de", examples: ["Não há hospital num raio de dez quilômetros."] },
      { meaning: "área ao redor", examples: ["O sino pode ser ouvido por toda a área ao redor por vários li."] },
      { meaning: "circunferência", examples: ["Os trabalhadores estão medindo a circunferência do canteiro de flores."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "visitar", examples: ["O jornalista vai entrevistar o diretor amanhã."] },
      { meaning: "entrevistar", examples: ["O repórter entrevistará amanhã o diretor premiado."] },
      { meaning: "acessar", examples: ["Os usuários não conseguem acessar este site."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "ser superficial", examples: ["Não me enrole; por favor, responda com seriedade."] },
      { meaning: "despachar com evasivas", examples: ["O gerente despachou o cliente com algumas palavras vazias."] },
      { meaning: "ir levando", examples: ["Ele não estava preparado e só conseguiu improvisar para terminar o relatório."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "ecoar", examples: ["Assim que os outros falam, ele só repete e concorda."] },
      { meaning: "entrar na conversa apoiando", examples: ["Assim que ela fez a sugestão, as pessoas ao redor logo entraram na conversa."] },
      { meaning: "concordar sem crítica", examples: ["Não concorde sem critério com tudo o que os outros dizem."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "afiliado", examples: ["Este hospital é afiliado a uma escola."] },
      { meaning: "anexo", examples: ["Três listas foram anexadas ao final do contrato."] },
      { meaning: "subordinado", examples: ["Este departamento é apenas uma unidade subordinada."] },
      { meaning: "auxiliar", examples: ["O estacionamento é uma instalação auxiliar do hotel."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "elogiar", examples: ["O filme enalteceu os operários."] },
      { meaning: "fazer elogio fúnebre", examples: ["O elogio fúnebre exaltou sua dedicação altruísta."] },
      { meaning: "exaltar", examples: ["O poeta exalta a força do mar."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "abertamente", examples: ["Ele violou as regras abertamente."] },
      { meaning: "publicamente", examples: ["Ele se opôs publicamente à decisão na reunião."] },
      { meaning: "descaradamente", examples: ["Ele mentiu descaradamente sem o menor constrangimento."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "decepcionar", examples: ["Não quero decepcionar as expectativas dos meus pais."] },
      { meaning: "desapontar", examples: ["Não decepcione as expectativas dos seus pais."] },
      { meaning: "não corresponder a", examples: ["Ele não deixou de corresponder à confiança do professor."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "em última análise", examples: ["No fim das contas, saúde é o mais importante."] },
      { meaning: "em última instância", examples: ["Em última análise, a qualidade é o que mais importa."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "querer poder", examples: ["Ele mal podia esperar para voltar para casa imediatamente."] },
      { meaning: "estar morrendo de vontade de", examples: ["Ao ouvir a boa notícia, ele estava morrendo de vontade de ir para casa imediatamente."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "preocupações com as consequências", examples: ["Com esse dinheiro, ele não tem mais preocupações para o futuro."] },
      { meaning: "preocupações com a retaguarda/o lar", examples: ["Com a família acomodada, ele não tinha preocupações com a casa ao viajar a trabalho."] },
      { meaning: "preocupação persistente", examples: ["Depois que o financiamento foi garantido, a equipe do projeto não tinha mais preocupações pendentes."] },
    ],
    "hsk6-huali-790": [
      { meaning: "suntuoso", examples: ["Ela está vestindo roupas luxuosas."] },
      { meaning: "magnífico", examples: ["Um magnífico lustre de cristal está pendurado no salão."] },
      { meaning: "ornamentado", examples: ["O bordado deste vestido formal é ornamentado."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "organização", examples: ["Esta instituição ajuda idosos."] },
      { meaning: "instituição", examples: ["Esta instituição é especializada em pesquisa em saúde pública."] },
      { meaning: "mecanismo", examples: ["O mecanismo interno do relógio é extremamente preciso."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "implicar com", examples: ["Não fique se prendendo demais a coisas pequenas."] },
      { meaning: "pechinchar sobre", examples: ["O vendedor ainda estava pechinchando por dois yuans."] },
      { meaning: "se importar/preocupar-se com", examples: ["Não me importo com quem pede desculpas primeiro."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "pisotear", examples: ["Não pise na grama."] },
      { meaning: "pisar em", examples: ["Por favor, não pise no gramado recém-colocado."] },
      { meaning: "violar", examples: ["Essa ordem violou os direitos dos cidadãos."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "remo", examples: ["O remo do barco quebrou."] },
      { meaning: "pá", examples: ["Ele usou um remo para levar o barco de volta à margem."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "delicado", examples: ["Não faça tanta manha; já vamos chegar."] },
      { meaning: "mimado", examples: ["Ele foi mimado desde pequeno e ficou muito manhoso."] },
      { meaning: "incapaz de suportar dificuldades", examples: ["Depois de apenas dois quilômetros, ele reclamou de cansaço; ele realmente não aguenta dificuldade."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan enrolar/cachear", examples: ["Ela enrolou a pintura e a guardou."] },
      { meaning: "juan volume/pergaminho", examples: ["Havia um rolo de pintura antiga na estante."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "falar franca/confiantemente e longamente", examples: ["Ele falou com muita desenvoltura no palco, sem ficar nem um pouco nervoso."] },
      { meaning: "falar fluentemente", examples: ["Ele consegue falar fluentemente mesmo sem roteiro."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "sério", examples: ["Ele pediu ajuda num tom sincero."] },
      { meaning: "sincero", examples: ["O pedido de desculpas dela foi muito sincero."] },
      { meaning: "sentido", examples: ["Ele agradeceu de coração pela ajuda dos moradores da aldeia."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "tratar injustamente", examples: ["A empresa não tratou injustamente os funcionários antigos."] },
      { meaning: "dar menos do que o devido", examples: ["O chefe nunca prejudica os funcionários antigos nos bônus."] },
      { meaning: "maltratar", examples: ["Ele não queria maltratar aquele cavalo velho."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "frio", examples: ["A resposta dele pareceu bem fria."] },
      { meaning: "insensível", examples: ["Ele parecia muito insensível ao sofrimento do paciente."] },
      { meaning: "implacável", examples: ["O general emitiu uma ordem de execução implacável."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "ficar atônito", examples: ["Ao ouvir a notícia, ele ficou paralisado por um momento."] },
      { meaning: "congelar", examples: ["A porta se abriu de repente, e ele ficou paralisado no lugar."] },
      { meaning: "estar distraído", examples: ["Não fique distraído olhando pela janela durante a aula."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "interesses em jogo", examples: ["Ele finalmente entendeu o que estava em jogo."] },
      { meaning: "prós e contras", examples: ["Pense bem nos prós e contras antes de assinar."] },
      { meaning: "gravidade", examples: ["Ele ainda não percebeu a gravidade do problema."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "enterrar", examples: ["O trabalho corrido enterrou o talento dele."] },
      { meaning: "obscurecer", examples: ["O barulho encobriu o canto dela."] },
      { meaning: "deixar o talento passar despercebido", examples: ["Não deixe tarefas rotineiras enterrarem o talento dele."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "dar um passo", examples: ["Ele entrou na sala de aula, dando um passo para dentro, muito nervoso."] },
      { meaning: "dar passadas largas", examples: ["Ele caminhou a passos largos em direção ao auditório."] },
      { meaning: "entrar em", examples: ["A empresa está entrando no mercado internacional."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "tinta", examples: ["A tinta acabou."] },
      { meaning: "cultura/conhecimento livresco", examples: ["Ele realmente tem algum conhecimento livresco."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "olhar", examples: ["O olhar do professor parou no quadro."] },
      { meaning: "olhada", examples: ["Ela lançou um olhar encorajador."] },
      { meaning: "visão", examples: ["A visão dele se recuperou rapidamente."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "história interna", examples: ["O repórter queria entender os bastidores do incidente."] },
      { meaning: "informação interna", examples: ["O repórter obteve informações internas sobre o acordo."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "rascunho", examples: ["Estamos elaborando um novo plano."] },
      { meaning: "redigir", examples: ["A secretária está elaborando a pauta da reunião."] },
      { meaning: "formular", examples: ["Especialistas formularam novos padrões de avaliação."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "levantar/erguer", examples: ["Ele está com os pés levantados em cima da cadeira."] },
      { meaning: "escorar", examples: ["Ele escorou a tábua para bloquear a roda."] },
      { meaning: "curvar para cima", examples: ["O canto do papel curvou para cima depois de molhado."] },
      { meaning: "notável", examples: ["Ele é um aluno excepcional da turma."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "perseverar", examples: ["Desde que você persevere, haverá progresso."] },
      { meaning: "persistir nisso", examples: ["Desde que você continue tentando, o problema difícil acabará sendo resolvido."] },
      { meaning: "ser persistente", examples: ["Ela investigou a verdade com persistência."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "popular", examples: ["Esta disciplina é muito popular."] },
      { meaning: "muito procurado", examples: ["Analista de dados se tornou uma posição muito procurada."] },
      { meaning: "em alta/quente", examples: ["Essa dança tem estado em alta ultimamente."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "determinar", examples: ["O tribunal determinou que o contrato era legal."] },
      { meaning: "identificar como", examples: ["A polícia o identificou como suspeito."] },
      { meaning: "acreditar firmemente", examples: ["Ela acredita firmemente que o esforço será recompensado."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "aprovar", examples: ["O esforço dele obteve a aprovação de todos."] },
      { meaning: "reconhecer", examples: ["A organização internacional reconheceu esse padrão."] },
      { meaning: "aceitação/aprovação", examples: ["Este plano recebeu a aprovação da equipe."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "classificador para navios/embarcações", examples: ["Há três barcos atracados no porto."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "falar sem parar", examples: ["Quando ele começa a falar de história, não para mais."] },
      { meaning: "falar sem parar/fluentemente", examples: ["O apresentador começou a falar sem parar assim que o evento começou."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "de uso geral", examples: ["Este método é aplicável de modo geral."] },
      { meaning: "usado/aplicável universalmente", examples: ["Esse tipo de plugue é usado universalmente na Europa."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "delírio", examples: ["Não fantasiem que dá para ter sucesso sem esforço."] },
      { meaning: "esperança vã", examples: ["Ter sucesso sem esforço é apenas uma esperança vã."] },
      { meaning: "fantasiar", examples: ["Ele passa o dia fantasiando em ficar rico da noite para o dia."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "durar", examples: ["O treinamento dura três meses."] },
      { meaning: "por um período de", examples: ["O treinamento dura um período de três meses."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "metabolismo", examples: ["O exercício pode acelerar o metabolismo."] },
      { meaning: "substituição do velho pelo novo", examples: ["A substituição do antigo pelo novo no setor está se acelerando."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "esforço meticuloso", examples: ["Este livro exigiu muito esforço dele."] },
      { meaning: "trabalho/devoção dedicados a algo", examples: ["Este livro incorpora dez anos de trabalho dedicado dela."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "beber em excesso", examples: ["Beber em excesso o tempo todo afeta a saúde."] },
      { meaning: "abuso de álcool", examples: ["O abuso de álcool por longo prazo prejudicou a saúde dele."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "prensar/espremer", examples: ["Os patrões não devem explorar os trabalhadores."] },
      { meaning: "explorar", examples: ["A fábrica inescrupulosa explorou trabalhadores temporários."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "visão", examples: ["O gerente tem um ótimo julgamento."] },
      { meaning: "julgamento", examples: ["Ela tem bom julgamento ao escolher parceiros."] },
      { meaning: "discernimento", examples: ["Este editor tem uma percepção única."] },
      { meaning: "gosto", examples: ["O gosto dele é exigente; ele só compra estilos clássicos."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "som/áudio", examples: ["O som do aparelho no quarto está alto demais."] },
      { meaning: "sistema de som/equipamento estéreo", examples: ["Um novo sistema de som foi comprado para a sala."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "autor da ação", examples: ["O autor explicou a situação ao tribunal."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "estar grávida de", examples: ["A terra nutre uma vida abundante."] },
      { meaning: "criar", examples: ["A área úmida abriga a reprodução de muitos tipos de aves aquáticas."] },
      { meaning: "nutrir", examples: ["A escola formou um grupo de jovens cientistas."] },
      { meaning: "dar origem a", examples: ["A crise deu origem a novas oportunidades."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "por ocasião de", examples: ["Na ocasião da formatura, o professor esperava que todos tivessem sucesso."] },
      { meaning: "no momento de", examples: ["Na época da formatura, ele escreveu uma carta para agradecer ao professor."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "governar/administrar", examples: ["O governo está combatendo a poluição."] },
      { meaning: "gerir/tratar", examples: ["A fábrica começou a tratar as águas residuais."] },
      { meaning: "governança", examples: ["A governança corporativa precisa de transparência."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "ficar retido", examples: ["A nevasca deixou muita gente presa no aeroporto."] },
      { meaning: "ser detido", examples: ["Ele foi retido no aeroporto por causa de um problema nos documentos."] },
      { meaning: "ficar para trás", examples: ["Os voluntários ficaram no local para limpar o lixo."] },
      { meaning: "retenção", examples: ["O exame mostrou retenção de alimento no estômago."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "centro de gravidade", examples: ["Por favor, abaixe o centro de gravidade do seu corpo."] },
      { meaning: "foco/núcleo", examples: ["O foco do trabalho deste ano é a qualidade."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "solene", examples: ["Ele está vestido de maneira bem formal."] },
      { meaning: "digno", examples: ["Seu comportamento é digno e adequado."] },
      { meaning: "formal", examples: ["Por favor, faça o discurso em um tom formal."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai ficar ao lado de/perto de", examples: ["Por favor, sentem-se mais juntos; ainda tem gente atrás."] },
      { meaning: "ai sofrer/suportar", examples: ["Ele suportou uma rodada de críticas."] },
    ],
    "hsk6-ao-15": [
      { meaning: "cozinhar em fogo baixo/reduzir", examples: ["A mãe deixou a sopa de peixe cozinhando em fogo baixo por duas horas."] },
      { meaning: "suportar", examples: ["Este período difícil finalmente foi suportado."] },
      { meaning: "ficar acordado até tarde", examples: ["Ele ficou acordado até de madrugada antes de dormir."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "conveniência", examples: ["A nova estação de metrô trouxe muita conveniência aos moradores."] },
      { meaning: "conveniente", examples: ["O transporte aqui é muito conveniente."] },
      { meaning: "facilitar", examples: ["O novo sistema facilitou o processo de reembolso."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "não suportar", examples: ["O quarto estava numa bagunça insuportável."] },
      { meaning: "insuportavelmente/terrivelmente", examples: ["O quarto estava insuportavelmente abafado e quente."] },
      { meaning: "em mau estado", examples: ["O prédio antigo já está em um estado muito deteriorado."] },
    ],
    "hsk6-chan-221": [
      { meaning: "ter desejo por comida", examples: ["Meu irmão mais novo ficou com vontade de comer o bolo assim que o viu."] },
      { meaning: "ávido por comida", examples: ["Assim que chega a hora da refeição, ele fica especialmente guloso."] },
      { meaning: "glutão", examples: ["Esta criança é tão gulosa que pega lanches sempre que os vê."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "cego/sem fio", examples: ["Esta faca foi usada por muito tempo e já está um pouco cega."] },
      { meaning: "lento de raciocínio", examples: ["As reações dele são um pouco lentas."] },
      { meaning: "lento", examples: ["O computador está funcionando lentamente."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "vender", examples: ["Trair amigos por dinheiro é errado."] },
      { meaning: "trair/vender-se", examples: ["Ele traiu a confiança do amigo."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "servir", examples: ["Ela cuida com atenção da mãe doente."] },
      { meaning: "atender", examples: ["A enfermeira atendeu cuidadosamente o paciente durante a refeição."] },
      { meaning: "cuidar de", examples: ["Ela cuida da mãe idosa em casa."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "defender uma tese", examples: ["Ele está participando da defesa de conclusão do curso."] },
      { meaning: "defesa oral", examples: ["Ela participará amanhã da defesa oral da tese."] },
      { meaning: "responder a objeções", examples: ["Ele respondeu calmamente aos questionamentos e às dúvidas."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi descuidado", examples: ["Ele foi muito descuidado e deixou o passaporte em casa."] },
      { meaning: "dayi ideia principal/significado geral", examples: ["Por favor, resuma primeiro a ideia principal do artigo."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "lado reverso/oposto", examples: ["Esta história também traz uma lição negativa."] },
      { meaning: "aspecto/exemplo negativo", examples: ["Este caso é um exemplo negativo."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "decompor", examples: ["O professor desmembrou o problema em várias partes."] },
      { meaning: "dividir/analisar", examples: ["O professor dividiu o problema difícil em três etapas."] },
      { meaning: "decompor", examples: ["Bactérias podem decompor folhas caídas."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "cheio/volumoso", examples: ["Este artigo tem um conteúdo bem rico."] },
      { meaning: "amplo", examples: ["Suas capacidades e seu apoio agora são amplos."] },
      { meaning: "rico/substancial", examples: ["O conteúdo do relatório é rico e convincente."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "podre/decomposto", examples: ["Madeira podre quebra facilmente."] },
      { meaning: "decadente/em decadência", examples: ["O sistema decadente precisa ser mudado."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "ficar profundamente comovido", examples: ["Ao ver a foto antiga, ele ficou muito emocionado."] },
      { meaning: "suspirar de emoção", examples: ["Ao ver a foto antiga, ele suspirou com muitas emoções."] },
      { meaning: "reflexões/sentimentos", examples: ["Ela anotou suas reflexões da viagem."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "terra agrícola/terra cultivada", examples: ["O agricultor está arando a terra."] },
      { meaning: "lavrar/arar a terra", examples: ["Na primavera, os agricultores começam a arar a terra."] },
    ],
    "hsk6-heng-768": [
      { meaning: "horizontal", examples: ["Ele ficou de lado na porta."] },
      { meaning: "de lado/através", examples: ["Ele colocou a mesa de lado."] },
      { meaning: "grosseiro/irracional", examples: ["Ele fala de modo rude demais."] },
    ],
    "hsk6-hong-769": [
      { meaning: "persuadir com carinho", examples: ["O pai está ninando a criança para dormir."] },
      { meaning: "acalmar", examples: ["Ela acalmou suavemente a criança até ela dormir."] },
      { meaning: "enganar/trapacear", examples: ["Não me engane com informações falsas."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "restaurar", examples: ["Por favor, reconstitua a cena."] },
      { meaning: "reconstruir", examples: ["A polícia trabalhou para reconstruir como o caso aconteceu."] },
      { meaning: "reduzir quimicamente", examples: ["O hidrogênio pode reduzir quimicamente o óxido de cobre."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "flexível", examples: ["O plano inclui um tempo flexível."] },
      { meaning: "móvel", examples: ["A equipe móvel pode dar apoio a qualquer momento."] },
      { meaning: "motorizado", examples: ["Um triciclo motorizado está estacionado na entrada."] },
      { meaning: "manobrar", examples: ["As tropas manobraram nas montanhas."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "ponta afiada", examples: ["A empresa usa tecnologia de ponta."] },
      { meaning: "de ponta", examples: ["A empresa desenvolve chips de ponta."] },
      { meaning: "avançado", examples: ["Este hospital possui equipamentos avançados."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "autocrítica", examples: ["Ele escreveu uma autocrítica."] },
      { meaning: "revisar/examinar", examples: ["Depois da reunião, revisamos as falhas do plano."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "espião", examples: ["O espião no filme é muito esperto."] },
      { meaning: "agente de espionagem", examples: ["Um agente de espionagem estrangeiro foi encontrado na fronteira."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "o que se vê e ouve", examples: ["Viajar aumentou seus conhecimentos e experiências."] },
      { meaning: "conhecimento e experiência", examples: ["Viajar ampliou seu conhecimento e experiência."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "sólido/completo", examples: ["A empresa precisa aperfeiçoar seu sistema de gestão."] },
      { meaning: "melhorar/aperfeiçoar", examples: ["O governo vai aperfeiçoar o mecanismo de supervisão."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "explicar", examples: ["O gerente explicou a tarefa com clareza."] },
      { meaning: "prestar contas de", examples: ["Ele deve prestar contas sobre o destino dos fundos."] },
      { meaning: "entregar", examples: ["Por favor, passe o trabalho para o novo colega."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "estar disposto/feliz em", examples: ["Fico feliz em ajudar você na mudança."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "como algo natural", examples: ["Não encare a ajuda como algo natural e esperado."] },
      { meaning: "dar como certo", examples: ["Ele considera a ajuda dos outros algo garantido."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "encharcar", examples: ["Ele ficou encharcado de água."] },
      { meaning: "derramar/borrifar", examples: ["Ela derramou mel sobre o bolo."] },
      { meaning: "molhar-se", examples: ["Ele esqueceu o guarda-chuva e ficou encharcado pela chuva."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "personificar fraudulentamente", examples: ["Alguém se passou por médico para enganar idosos."] },
      { meaning: "fingir ser", examples: ["Ele fingiu ser repórter para entrar no local."] },
      { meaning: "fazer-se passar por", examples: ["Ela se passou por especialista para ganhar confiança."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "classificador para pequenos objetos planos/redondos como moedas, anéis, medalhas, selos", examples: ["Ela comprou um anel."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "andar na contramão", examples: ["É proibido andar na contramão nesta estrada."] },
      { meaning: "viajar em marcha ré/direção errada", examples: ["Aquele carro estava andando na contramão em uma rua de mão única."] },
      { meaning: "retrógrado", examples: ["Netuno tem movimento retrógrado."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "coerir", examples: ["Esse objetivo reuniu a força de todos."] },
      { meaning: "reunir/mobilizar", examples: ["Esta vitória reuniu a confiança de toda a equipe."] },
      { meaning: "condensar", examples: ["O ar frio condensa o vapor de água em neblina."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "equipar", examples: ["A escola equipou a sala de aula com computadores."] },
      { meaning: "fornecer com", examples: ["A escola equipou cada sala de aula com ar-condicionado."] },
      { meaning: "equipamento", examples: ["O equipamento de combate a incêndio já foi entregue ao armazém."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "avançar/correr para", examples: ["A criança correu em direção à mãe."] },
      { meaning: "bater as asas/esvoaçar", examples: ["A borboleta batia suavemente as asas entre as flores."] },
      { meaning: "lançar-se sobre", examples: ["Assim que entrou, a criança se jogou nos braços da mãe."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "lacuna", examples: ["Este copo tem uma lasca."] },
      { meaning: "brecha", examples: ["A enchente abriu uma brecha na represa."] },
      { meaning: "lascado/entalhe", examples: ["Há uma pequena lasca na borda da xícara."] },
      { meaning: "déficit", examples: ["A empresa ainda tem um déficit de financiamento de três milhões."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "manual", examples: ["A tradução humana é mais precisa."] },
      { meaning: "feito por humanos", examples: ["Este rio feito pelo homem atravessa o novo distrito."] },
      { meaning: "artificial", examples: ["O médico sugeriu colocar uma articulação artificial no paciente."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "outras pessoas", examples: ["Não incomode os outros."] },
      { meaning: "lar/família", examples: ["Algumas famílias moram ao pé da montanha."] },
      { meaning: "eu/mim coloquial", examples: ["Eu já pedi desculpas, então não fique bravo."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "emitir/exalar", examples: ["A flor exala um cheiro."] },
      { meaning: "distribuir", examples: ["Voluntários distribuíram panfletos na entrada."] },
      { meaning: "enviar", examples: ["O sistema enviará automaticamente e-mails de notificação."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "animado", examples: ["Hoje ele parece bem orgulhoso."] },
      { meaning: "orgulhoso/metido", examples: ["Depois de vestir o uniforme novo, ele parecia especialmente orgulhoso."] },
      { meaning: "expressão/ar", examples: ["A expressão dela parecia um pouco cansada."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "desconhecido", examples: ["Ele acabou de chegar e o ambiente ainda é bem desconhecido para ele."] },
      { meaning: "enferrujado", examples: ["Depois de anos sem praticar, sua técnica de piano ficou enferrujada."] },
      { meaning: "não próximo", examples: ["Depois da mudança, ficamos menos próximos dos antigos vizinhos."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "maço/buquê", examples: ["Há um buquê de flores sobre a mesa."] },
      { meaning: "feixe", examples: ["Um raio de sol entrou no quarto."] },
      { meaning: "classificador para maços/buquês", examples: ["Ele deu a ela um buquê de rosas."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "dar forma", examples: ["A educação familiar molda o caráter."] },
      { meaning: "moldar", examples: ["O artesão moldou um vaso de argila."] },
      { meaning: "retratar/criar", examples: ["O romance retrata uma mãe corajosa."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "contar/ser válido", examples: ["Se você prometeu, tem que valer."] },
      { meaning: "cumprir a palavra", examples: ["Ele sempre cumpre sua palavra."] },
      { meaning: "calcular", examples: ["Ele calculava de cabeça baixa."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "paralisia", examples: ["O acidente paralisou o trânsito."] },
      { meaning: "paralisar", examples: ["O acidente paralisou a perna esquerda dele."] },
      { meaning: "levar à paralisação", examples: ["A nevasca paralisou o tráfego da cidade."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "tirar", examples: ["Ele tirou uma chave."] },
      { meaning: "puxar para fora", examples: ["Ele tirou a chave da gaveta."] },
      { meaning: "desenterrar", examples: ["O trabalhador escavou lama e areia com uma pá."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "ajustar", examples: ["A música pode aliviar uma vida tensa."] },
      { meaning: "aliviar", examples: ["A música pode aliviar emoções tensas."] },
      { meaning: "dar variedade/renovar", examples: ["Viajar no fim de semana pode trazer variedade a uma vida monótona."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "fazer planos gerais considerando todos os fatores/lados", examples: ["Os líderes devem considerar todos os lados."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "despachar bagagem", examples: ["A mala precisa ser despachada."] },
      { meaning: "consignar para envio", examples: ["Este lote de medicamentos precisa ser consignado para transporte em cadeia fria."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "completo", examples: ["Este conjunto de materiais está bem completo."] },
      { meaning: "totalmente equipado", examples: ["Este hospital é totalmente equipado."] },
      { meaning: "abrangente", examples: ["O relatório oferece uma análise de dados abrangente."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "literatura e arte", examples: ["A escola organizou uma apresentação artística."] },
      { meaning: "artes", examples: ["Ela se formou em gestão de artes na universidade."] },
      { meaning: "literário/artístico", examples: ["Este café tem uma atmosfera muito artística."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "forças armadas", examples: ["Os soldados já terminaram de se armar."] },
      { meaning: "armas/equipamento", examples: ["Esta equipe carece das armas e equipamentos necessários."] },
      { meaning: "armar/equipar", examples: ["Eles equiparam a equipe de resgate com nova tecnologia."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "coordenar", examples: ["A combinação de cores é bem harmoniosa."] },
      { meaning: "coordenado", examples: ["As ações de todos os departamentos foram bem coordenadas."] },
      { meaning: "harmonioso", examples: ["As cores desta pintura são muito harmoniosas."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "reprimir/suprimir", examples: ["Ele colocou para fora as emoções reprimidas."] },
      { meaning: "opressivo", examples: ["A atmosfera na sala de reunião era opressiva."] },
      { meaning: "deprimido", examples: ["Fracassos repetidos o deixaram muito deprimido."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "deduzir", examples: ["O ator retratou a vida de um idoso."] },
      { meaning: "interpretar/retratar/atuar", examples: ["Ela interpretou a heroína com grande sutileza."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "consciência/percepção", examples: ["Ele percebeu que o problema era grave."] },
      { meaning: "perceber/estar ciente de", examples: ["Ele finalmente percebeu a gravidade do problema."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "original", examples: ["Aqui se preserva uma floresta primitiva."] },
      { meaning: "primitivo", examples: ["A vila ainda preserva métodos agrícolas primitivos."] },
      { meaning: "primordial", examples: ["Cientistas estudam a ecologia de florestas primevas."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "atar/amarrar", examples: ["A enfermeira deu uma picada nele."] },
      { meaning: "picar/espetar", examples: ["A agulha espetou o dedo dela dolorosamente."] },
      { meaning: "inserir", examples: ["Ele inseriu as flores no vaso."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "quebrar/fraturar", examples: ["Ele dobrou o mapa."] },
      { meaning: "dobrar", examples: ["Ela dobrou a carta e a colocou no envelope."] },
      { meaning: "desconto", examples: ["Este casaco está com trinta por cento de desconto hoje."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "inteligência", examples: ["Os smartphones mudaram a vida."] },
      { meaning: "inteligente/esperto", examples: ["Ele comprou uma geladeira inteligente."] },
      { meaning: "IA", examples: ["A IA está mudando os serviços médicos."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "supervisor/pessoa responsável", examples: ["O supervisor vai inspecionar o trabalho amanhã."] },
      { meaning: "estar responsável por", examples: ["Ela é responsável pelo trabalho financeiro da empresa."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "tópico/assunto especial", examples: ["Hoje a reunião discutiu um tema ambiental."] },
      { meaning: "matéria especial", examples: ["O noticiário de hoje à noite tem uma matéria especial sobre meio ambiente."] },
      { meaning: "temático", examples: ["O museu lançou uma exposição temática."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "postura/pose", examples: ["Ela mantém uma boa postura."] },
      { meaning: "atitude/posição", examples: ["O governo manteve uma postura aberta em relação às negociações."] },
    ],
  },
  "ru": {
    "hsk6-bajie-20": [
      { meaning: "льстить", examples: ["Он не хочет получать возможности, подлизываясь к другим."] },
      { meaning: "заискивать перед", examples: ["Он постоянно пытается выслужиться перед начальником, чтобы получить повышение."] },
      { meaning: "втираться в доверие к", examples: ["Чтобы попасть в этот круг, он намеренно втирался в доверие к нескольким знаменитостям."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "получить возмещение", examples: ["Вернувшись из командировки, он отнёс счёт-фактуру на возмещение."] },
      { meaning: "подать расходы к возмещению", examples: ["Вернувшись из командировки, она подала железнодорожные билеты на возмещение."] },
      { meaning: "списать/утилизировать", examples: ["Этот старый станок нельзя починить, его остается только списать."] },
    ],
    "hsk6-bise-101": [
      { meaning: "заблокированный/закрытый", examples: ["Здесь транспортное сообщение слабое, поэтому новости доходят медленно."] },
      { meaning: "изолированный", examples: ["Эта горная деревня раньше была очень изолированной, и чужие туда редко приезжали."] },
      { meaning: "отсталый или плохо осведомленный", examples: ["Плохая осведомленность может привести к тому, что компания упустит возможности."] },
    ],
    "hsk6-bing-135": [
      { meaning: "оценка C", examples: ["На этом экзамене у него была оценка «C»."] },
      { meaning: "третий", examples: ["Три человека, указанные как A, B и C, все должны выступить."] },
      { meaning: "третий небесный ствол", examples: ["Бин является третьим из Небесных стволов."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "не останавливаться ни перед чем", examples: ["Чтобы выиграть соревнование, он готов идти на всё."] },
      { meaning: "использовать любые средства", examples: ["Чтобы заполучить клиентов, он использует любые средства для снижения цен."] },
      { meaning: "любыми средствами", examples: ["Эта компания расширяет рынок всеми правдами и неправдами."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "отступать", examples: ["Все начали отступать."] },
      { meaning: "выводить/отводить", examples: ["До прихода ливня группа отошла из долины."] },
      { meaning: "отойти назад", examples: ["Огонь противника был слишком плотным, поэтому передовые части были вынуждены отступить."] },
    ],
    "hsk6-chili-275": [
      { meaning: "трудоемкий", examples: ["Эта книга слишком тяжёлая, поднять её трудно."] },
      { meaning: "мучительный", examples: ["Переносить это пианино действительно тяжело."] },
      { meaning: "испытывать трудности при выполнении", examples: ["Ему немного трудно понимать быстрые новостные передачи."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "дисциплинарное взыскание", examples: ["Он нарушил дисциплину и получил дисциплинарное взыскание от школы."] },
      { meaning: "наказание", examples: ["Он получил суровое наказание за списывание."] },
      { meaning: "обрабатывать/иметь дело с", examples: ["С этой партией товаров нужно разобраться как можно скорее."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "обходиться тем, что есть", examples: ["Этот обед может быть простым — просто перебьёмся как-нибудь."] },
      { meaning: "импровизировать", examples: ["Группа в последний момент сымпровизировала вступительную мелодию."] },
      { meaning: "сносный/не так уж плохо", examples: ["Еда в этой маленькой лавке вполне сносная."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "метнуться/юркнуть", examples: ["Та кошка вдруг юркнула на кухню."] },
      { meaning: "бежать", examples: ["Преступник в суматохе сбежал через заднюю дверь."] },
      { meaning: "изменять/искажать текст", examples: ["Он самовольно изменил дату в договоре."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "в худшем случае", examples: ["В худшем случае мы просто придём ещё раз завтра."] },
      { meaning: "не более чем", examples: ["Эту работу можно закончить не более чем за два дня."] },
      { meaning: "в отрицательных контекстах не такое уж большое дело", examples: ["Опоздать на один автобус не такая уж большая беда."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "участвующее лицо", examples: ["Нужно выслушать объяснение человека, непосредственно причастного к делу."] },
      { meaning: "заинтересованная сторона", examples: ["Подробности аварии нужно уточнить у заинтересованной стороны."] },
      { meaning: "сторона судебного процесса", examples: ["Два участника процесса явились в суд для дачи показаний."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "обанкротиться", examples: ["Из-за плохого управления тот ресторан закрылся в прошлом году."] },
      { meaning: "закрыться", examples: ["Аренда была слишком высокой, поэтому книжному магазину пришлось закрыться."] },
      { meaning: "потерпеть крах как бизнес", examples: ["Когда денежный поток оборвался, компания быстро потерпела крах."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "разорвать", examples: ["Он решил порвать с прежними дурными привычками."] },
      { meaning: "отрезать", examples: ["Снежная буря отрезала транспортное сообщение с горной деревней."] },
      { meaning: "порвать отношения", examples: ["После ссоры они прекратили отношения."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "сдержать/выполнить обещание", examples: ["Он наконец выполнил данное тогда обещание."] },
      { meaning: "обналичить чек", examples: ["Он пошел в банк, чтобы обналичить чек."] },
      { meaning: "превратить в наличные", examples: ["Эти баллы можно обменять на наличные до конца месяца."] },
    ],
    "hsk6-fan-504": [
      { meaning: "счетное слово для речи/действия", examples: ["Это пояснение очень понятное."] },
      { meaning: "раунд/период", examples: ["После раунда обсуждения все согласились с планом."] },
      { meaning: "вид/сорт", examples: ["Такая картина для меня незабываема."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "в радиусе", examples: ["В радиусе десяти километров нет ни одной больницы."] },
      { meaning: "окрестная территория", examples: ["Колокол слышен по всей окрестности на несколько ли."] },
      { meaning: "окружность", examples: ["Рабочие измеряют окружность клумбы."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "посещать", examples: ["Журналист завтра возьмёт интервью у директора школы."] },
      { meaning: "брать интервью", examples: ["Завтра репортер возьмет интервью у отмеченного наградой режиссера."] },
      { meaning: "получать доступ", examples: ["Пользователи не могут получить доступ к этому сайту."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "относиться формально", examples: ["Не отмахивайся от меня — ответь, пожалуйста, серьёзно."] },
      { meaning: "отмахиваться", examples: ["Менеджер отмахнулся от клиента несколькими пустыми фразами."] },
      { meaning: "кое-как справляться", examples: ["Он не подготовился и смог лишь кое-как провести доклад."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "повторять за другими", examples: ["Стоит другим заговорить — он тут же начинает им поддакивать."] },
      { meaning: "поддакивать", examples: ["Как только она внесла предложение, люди рядом сразу подхватили его."] },
      { meaning: "некритично соглашаться", examples: ["Не соглашайся бездумно со всем, что говорят другие."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "аффилированный", examples: ["Эта больница является аффилированной больницей при учебном заведении."] },
      { meaning: "прикрепленный", examples: ["К концу договора были приложены три списка."] },
      { meaning: "подчиненный", examples: ["Этот отдел является лишь подчиненным подразделением."] },
      { meaning: "вспомогательный", examples: ["Парковка является вспомогательным объектом отеля."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "хвалить", examples: ["Фильм прославил рабочих."] },
      { meaning: "восхвалять", examples: ["Надгробная речь прославила его бескорыстную самоотверженность."] },
      { meaning: "превозносить", examples: ["Поэт воспевает силу моря."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "открыто", examples: ["Он открыто нарушил правила."] },
      { meaning: "публично", examples: ["Он публично выступил против этого решения на собрании."] },
      { meaning: "нагло", examples: ["Он нагло солгал, ничуть не смутившись."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "подвести", examples: ["Я не хочу подвести надежды родителей."] },
      { meaning: "разочаровывать", examples: ["Не разочаровывай ожидания своих родителей."] },
      { meaning: "не оправдать ожиданий", examples: ["Он оправдал доверие своего учителя."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "в конечном счете", examples: ["В конечном счёте здоровье важнее всего."] },
      { meaning: "в конечном анализе", examples: ["В конечном счете, главное — качество."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "желать, чтобы можно было", examples: ["Ему не терпится сразу же вернуться домой."] },
      { meaning: "очень хотеть", examples: ["Услышав хорошую новость, он очень хотел немедленно поехать домой."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "тревоги о последствиях", examples: ["С этими деньгами у него нет никаких забот на будущее."] },
      { meaning: "тревоги о тыле", examples: ["Когда семья была устроена, у него не было забот о доме во время командировки."] },
      { meaning: "затяжная тревога", examples: ["После обеспечения финансирования у проектной группы больше не осталось затяжных опасений."] },
    ],
    "hsk6-huali-790": [
      { meaning: "роскошный", examples: ["На ней роскошная одежда."] },
      { meaning: "великолепный", examples: ["В зале висит великолепная хрустальная люстра."] },
      { meaning: "вычурный", examples: ["Вышивка на этом парадном платье богато украшена."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "организация", examples: ["Эта организация помогает пожилым людям."] },
      { meaning: "учреждение", examples: ["Это учреждение специализируется на исследованиях в области общественного здравоохранения."] },
      { meaning: "механизм", examples: ["Внутренний механизм часов чрезвычайно точен."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "придираться к", examples: ["Не стоит слишком придираться к мелочам."] },
      { meaning: "торговаться из-за", examples: ["Продавец все еще торговался из-за двух юаней."] },
      { meaning: "придавать значение/заботиться о", examples: ["Мне все равно, кто извинится первым."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "топтать", examples: ["Не топчите газон."] },
      { meaning: "наступать на", examples: ["Пожалуйста, не наступайте на недавно уложенный газон."] },
      { meaning: "нарушать", examples: ["Этот приказ нарушил права граждан."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "весло", examples: ["Весло на лодке сломалось."] },
      { meaning: "весло-лопасть", examples: ["Он с помощью весла пригнал лодку обратно к берегу."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "изнеженный", examples: ["Не будь таким изнеженным — скоро уже приедем."] },
      { meaning: "избалованный", examples: ["Его с детства баловали, и он стал очень избалованным."] },
      { meaning: "не способный переносить трудности", examples: ["Пройдя всего два километра, он пожаловался на усталость; он совсем не выносит трудностей."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juǎn свернуть/завить", examples: ["Она свернула картину и убрала её."] },
      { meaning: "juàn том/свиток", examples: ["На книжной полке лежал свиток старинной картины."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "говорить откровенно/уверенно и подробно", examples: ["На сцене он говорил уверенно и совсем не нервничал."] },
      { meaning: "говорить бегло", examples: ["Он может свободно говорить даже без текста."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "искренний", examples: ["Он попросил о помощи искренним тоном."] },
      { meaning: "искренний", examples: ["Ее извинение было очень искренним."] },
      { meaning: "сердечный", examples: ["Он сердечно поблагодарил односельчан за помощь."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "обходиться несправедливо", examples: ["Компания не обошлась несправедливо со старыми сотрудниками."] },
      { meaning: "обделять", examples: ["Начальник никогда не обделяет старых сотрудников премиями."] },
      { meaning: "плохо обращаться", examples: ["Он не хотел плохо обращаться с той старой лошадью."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "холодный", examples: ["Его ответ показался очень холодным."] },
      { meaning: "черствый", examples: ["Он казался очень черствым к страданиям пациента."] },
      { meaning: "безжалостный", examples: ["Генерал отдал беспощадный приказ о казни."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "быть ошеломленным", examples: ["Услышав новость, он на мгновение оцепенел."] },
      { meaning: "застыть", examples: ["Дверь внезапно открылась, и он застыл на месте."] },
      { meaning: "быть рассеянным", examples: ["Не отвлекайся постоянно, глядя в окно во время урока."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "ставки/интересы", examples: ["Он наконец понял, что поставлено на карту."] },
      { meaning: "плюсы и минусы", examples: ["Перед подписью хорошо обдумайте все плюсы и минусы."] },
      { meaning: "серьезность", examples: ["Он все еще не осознал серьезности проблемы."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "похоронить", examples: ["Из-за бесконечной занятости его талант оказался похоронен."] },
      { meaning: "скрывать", examples: ["Шум заглушил ее пение."] },
      { meaning: "оставить талант непризнанным", examples: ["Не позволяй рутинным делам похоронить его талант."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "сделать шаг", examples: ["Он нервничал, когда шагнул в класс."] },
      { meaning: "шагать", examples: ["Он широким шагом направился к конференц-залу."] },
      { meaning: "вступить в", examples: ["Компания выходит на международный рынок."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "чернила", examples: ["Чернила закончились."] },
      { meaning: "книжная ученость/культура", examples: ["У него действительно есть кое-какая книжная образованность."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "взгляд", examples: ["Взгляд учителя остановился на доске."] },
      { meaning: "взгляд", examples: ["Она бросила ободряющий взгляд."] },
      { meaning: "зрение/видение", examples: ["Его зрение быстро восстановилось."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "закулисная история", examples: ["Журналист хотел разобраться в подоплёке этого инцидента."] },
      { meaning: "инсайдерская информация", examples: ["Журналист получил инсайдерскую информацию о сделке."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "проект", examples: ["Мы разрабатываем новый план."] },
      { meaning: "составлять", examples: ["Секретарь составляет повестку заседания."] },
      { meaning: "формулировать", examples: ["Эксперты сформулировали новые стандарты оценки."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "торчать/поднимать", examples: ["Он закинул ноги на стул."] },
      { meaning: "подпирать", examples: ["Он подпер доску, чтобы заблокировать колесо."] },
      { meaning: "загибаться вверх", examples: ["Уголок бумаги загнулся вверх после намокания."] },
      { meaning: "выдающийся", examples: ["Он выдающийся ученик в классе."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "упорствовать", examples: ["Если упорно не сдаваться, обязательно будет прогресс."] },
      { meaning: "продолжать упорно", examples: ["Если продолжать стараться, трудная задача в конце концов решится."] },
      { meaning: "быть настойчивым", examples: ["Она настойчиво расследовала правду."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "популярный", examples: ["Этот курс очень популярен."] },
      { meaning: "востребованный", examples: ["Должность аналитика данных стала востребованной."] },
      { meaning: "трендовый/горячий", examples: ["Этот танец в последнее время в тренде."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "определять", examples: ["Суд признал договор законным."] },
      { meaning: "идентифицировать как", examples: ["Полиция установила его как подозреваемого."] },
      { meaning: "твердо верить", examples: ["Она твердо верит, что усилия окупятся."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "одобрять", examples: ["Его усилия получили всеобщее признание."] },
      { meaning: "признавать", examples: ["Международная организация признала этот стандарт."] },
      { meaning: "принятие/одобрение", examples: ["Этот план получил одобрение команды."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "счетное слово для кораблей/судов", examples: ["В порту пришвартованы три корабля."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "говорить без конца", examples: ["Стоит ему заговорить об истории — и он говорит без умолку."] },
      { meaning: "говорить без остановки/бегло", examples: ["Ведущий начал говорить без остановки сразу после открытия мероприятия."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "общего назначения", examples: ["Этот метод универсален."] },
      { meaning: "универсально используемый/применимый", examples: ["Этот тип вилки повсеместно используется в Европе."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "заблуждение", examples: ["Не мечтай о успехе без усилий."] },
      { meaning: "тщетная надежда", examples: ["Успех без усилий - лишь тщетная надежда."] },
      { meaning: "фантазировать", examples: ["Он целыми днями фантазирует о том, чтобы разбогатеть за одну ночь."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "длиться", examples: ["Обучение длится три месяца."] },
      { meaning: "в течение периода", examples: ["Обучение длится три месяца."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "метаболизм", examples: ["Физические упражнения могут ускорять обмен веществ."] },
      { meaning: "замена старого новым", examples: ["Замена старого новым в отрасли ускоряется."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "кропотливые усилия", examples: ["На эту книгу он потратил очень много сил и труда."] },
      { meaning: "труд/самоотдача, вложенные во что-либо", examples: ["Эта книга воплощает десять лет ее преданного труда."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "чрезмерно пить", examples: ["Если постоянно злоупотреблять алкоголем, это скажется на здоровье."] },
      { meaning: "злоупотребление алкоголем", examples: ["Длительное злоупотребление алкоголем повредило его здоровью."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "давить/выжимать", examples: ["Начальники не должны эксплуатировать рабочих."] },
      { meaning: "эксплуатировать", examples: ["Бессовестная фабрика эксплуатировала временных работников."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "зрение", examples: ["У менеджера хорошее чутьё."] },
      { meaning: "суждение", examples: ["У нее хорошее чутье при выборе партнеров."] },
      { meaning: "проницательность", examples: ["У этого редактора уникальная проницательность."] },
      { meaning: "вкус", examples: ["У него взыскательный вкус; он покупает только классические модели."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "звук/аудио", examples: ["Звук в комнате из аудиосистемы слишком громкий."] },
      { meaning: "звуковая система/стереооборудование", examples: ["Для гостиной купили новую аудиосистему."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "истец", examples: ["Истец изложил суду обстоятельства дела."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "быть беременной", examples: ["Земля взращивает богатую жизнь."] },
      { meaning: "порождать", examples: ["Болото служит местом размножения многих видов водоплавающих птиц."] },
      { meaning: "взращивать", examples: ["Школа воспитала группу молодых ученых."] },
      { meaning: "дать начало", examples: ["Кризис породил новые возможности."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "по случаю", examples: ["На выпускном учитель пожелал всем добиться успеха."] },
      { meaning: "во время", examples: ["Во время выпуска он написал письмо, чтобы поблагодарить учителя."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "управлять/администрировать", examples: ["Правительство занимается борьбой с загрязнением."] },
      { meaning: "управлять/лечить", examples: ["Завод начал очищать сточные воды."] },
      { meaning: "управление", examples: ["Корпоративное управление требует прозрачности."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "застрять", examples: ["Сильный снегопад оставил многих людей застрявшими в аэропорту."] },
      { meaning: "быть задержанным", examples: ["Его задержали в аэропорту из-за проблемы с документами."] },
      { meaning: "остаться позади", examples: ["Волонтеры остались на месте, чтобы убрать мусор."] },
      { meaning: "удержание", examples: ["Обследование показало задержку пищи в желудке."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "центр тяжести", examples: ["Пожалуйста, опустите центр тяжести тела ниже."] },
      { meaning: "фокус/ядро", examples: ["Главный акцент работы в этом году - качество."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "торжественный", examples: ["Он одет очень официально."] },
      { meaning: "достойный", examples: ["Ее манеры достойны и уместны."] },
      { meaning: "официальный", examples: ["Пожалуйста, произнесите речь в официальном тоне."] },
    ],
    "hsk6-ai-1": [
      { meaning: "āi быть рядом/близко", examples: ["Пожалуйста, садитесь плотнее: сзади ещё есть люди."] },
      { meaning: "ái страдать/терпеть", examples: ["Он выдержал порцию критики."] },
    ],
    "hsk6-ao-15": [
      { meaning: "томить/уваривать", examples: ["Мама томила рыбный суп два часа."] },
      { meaning: "терпеть", examples: ["Этот трудный период наконец удалось пережить."] },
      { meaning: "засиживаться допоздна", examples: ["Он не спал до раннего утра и только потом лег."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "удобство", examples: ["Новая станция метро принесла жителям много удобств."] },
      { meaning: "удобный", examples: ["Транспорт здесь очень удобный."] },
      { meaning: "облегчать", examples: ["Новая система упростила процесс возмещения расходов."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "не в состоянии вынести", examples: ["В комнате был невыносимый беспорядок."] },
      { meaning: "невыносимо/ужасно", examples: ["В комнате было невыносимо душно и жарко."] },
      { meaning: "в плохом состоянии", examples: ["Старое здание уже в крайне ветхом состоянии."] },
    ],
    "hsk6-chan-221": [
      { meaning: "испытывать тягу к еде", examples: ["Младший брат, едва увидел торт, сразу захотел его."] },
      { meaning: "жадный до еды", examples: ["Как только наступает время еды, он особенно жаден до пищи."] },
      { meaning: "прожорливый", examples: ["Этот ребенок такой прожорливый, что хватает сладости, как только видит их."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "тупой", examples: ["Нож долго использовали, и он уже немного затупился."] },
      { meaning: "медленно соображающий", examples: ["Он реагирует несколько туго."] },
      { meaning: "вялый", examples: ["Компьютер работает медленно."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "продавать", examples: ["Предавать друзей ради денег — неправильно."] },
      { meaning: "предавать/продавать", examples: ["Он предал доверие друга."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "служить", examples: ["Она внимательно ухаживает за больной матерью."] },
      { meaning: "прислуживать", examples: ["Медсестра внимательно ухаживала за пациентом во время еды."] },
      { meaning: "заботиться о", examples: ["Она ухаживает дома за пожилой матерью."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "защищать диссертацию/работу", examples: ["Он участвует в защите выпускной работы."] },
      { meaning: "устная защита", examples: ["Завтра она будет участвовать в устной защите диссертации."] },
      { meaning: "отвечать на возражения", examples: ["Он спокойно ответил на возражения и сомнения."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dàyi небрежный", examples: ["Он был слишком невнимателен и оставил паспорт дома."] },
      { meaning: "dàyì основная мысль/общий смысл", examples: ["Сначала кратко изложите основную мысль статьи."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "обратная/противоположная сторона", examples: ["В этой истории есть и отрицательный урок."] },
      { meaning: "негативный аспект/пример", examples: ["Этот случай является отрицательным примером."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "разлагать", examples: ["Учитель разложил задачу на несколько частей."] },
      { meaning: "разделять/анализировать", examples: ["Учитель разбил трудную задачу на три шага."] },
      { meaning: "разлагать", examples: ["Бактерии могут разлагать опавшие листья."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "пухлый/полный", examples: ["У этой статьи богатое содержание."] },
      { meaning: "обильный", examples: ["Его возможности и поддержка теперь достаточно сильны."] },
      { meaning: "богатый/содержательный", examples: ["Содержание отчета насыщенное и убедительное."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "гнилой/разложившийся", examples: ["Гнилое дерево легко ломается."] },
      { meaning: "декадентский/разлагающийся", examples: ["Прогнившую систему необходимо изменить."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "быть глубоко тронутым", examples: ["Увидев старую фотографию, он растрогался."] },
      { meaning: "вздыхать от чувств", examples: ["Увидев старую фотографию, он вздохнул с множеством чувств."] },
      { meaning: "размышления/чувства", examples: ["Она записала свои впечатления от поездки."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "пашня/обрабатываемая земля", examples: ["Фермер пашет землю."] },
      { meaning: "обрабатывать/пахать землю", examples: ["Весной крестьяне начинают пахать землю."] },
    ],
    "hsk6-heng-768": [
      { meaning: "горизонтальный", examples: ["Он стоял боком в дверях."] },
      { meaning: "вбок/поперек", examples: ["Он поставил стол боком."] },
      { meaning: "грубый/неразумный", examples: ["Он говорит слишком грубо."] },
    ],
    "hsk6-hong-769": [
      { meaning: "уговаривать", examples: ["Папа убаюкивает ребёнка, чтобы тот уснул."] },
      { meaning: "успокаивать", examples: ["Она тихо убаюкала ребенка."] },
      { meaning: "обманывать/проводить", examples: ["Не обманывай меня ложной информацией."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "восстанавливать", examples: ["Пожалуйста, восстановите картину происшествия."] },
      { meaning: "реконструировать", examples: ["Полиция старалась восстановить ход происшествия."] },
      { meaning: "химически восстанавливать", examples: ["Водород может химически восстанавливать оксид меди."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "гибкий", examples: ["В плане предусмотрено резервное время."] },
      { meaning: "мобильный", examples: ["Мобильная группа может оказать поддержку в любое время."] },
      { meaning: "моторизованный", examples: ["У входа припаркован моторизованный трехколесный транспорт."] },
      { meaning: "маневрировать", examples: ["Войска маневрировали в горах."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "острый кончик", examples: ["Компания использует передовые технологии."] },
      { meaning: "передовой", examples: ["Компания разрабатывает передовые чипы."] },
      { meaning: "продвинутый", examples: ["В этой больнице есть современное оборудование."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "самокритика", examples: ["Он написал объяснительную с самокритикой."] },
      { meaning: "пересматривать/проверять", examples: ["После совещания мы рассмотрели недостатки плана."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "шпион", examples: ["Шпион в фильме очень сообразительный."] },
      { meaning: "агент разведки", examples: ["На границе обнаружили иностранного агента разведки."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "то, что человек видел и слышал", examples: ["Путешествия расширили его кругозор и опыт."] },
      { meaning: "знания и опыт", examples: ["Путешествия расширили его знания и опыт."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "надежный/полный", examples: ["Компании нужно усовершенствовать систему управления."] },
      { meaning: "улучшать/совершенствовать", examples: ["Правительство усовершенствует механизм надзора."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "объяснять", examples: ["Руководитель чётко разъяснил задание."] },
      { meaning: "отчитаться за", examples: ["Он должен отчитаться, куда ушли средства."] },
      { meaning: "передавать", examples: ["Пожалуйста, передайте работу новому коллеге."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "быть готовым/радостно согласным", examples: ["Я с радостью помогу тебе с переездом."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "как само собой разумеющееся", examples: ["Не считай помощь чем-то само собой разумеющимся."] },
      { meaning: "считать само собой разумеющимся", examples: ["Он воспринимает помощь других как должное."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "промочить", examples: ["Он промок, его облило водой."] },
      { meaning: "поливать/обрызгивать", examples: ["Она полила торт медом."] },
      { meaning: "намокнуть", examples: ["Он забыл зонтик и промок под дождем."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "выдавать себя за", examples: ["Кто-то выдавал себя за врача, чтобы обманывать пожилых людей."] },
      { meaning: "притворяться", examples: ["Он притворился журналистом, чтобы войти в зал."] },
      { meaning: "сойти за", examples: ["Она выдала себя за эксперта, чтобы завоевать доверие."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "счетное слово для маленьких плоских/круглых предметов, таких как монеты, кольца, медали, марки", examples: ["Она купила кольцо."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "ехать против движения", examples: ["На этой дороге запрещено движение против направления."] },
      { meaning: "двигаться назад/в неправильном направлении", examples: ["Та машина ехала в неправильном направлении по улице с односторонним движением."] },
      { meaning: "ретроградный", examples: ["У Нептуна есть ретроградное движение."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "сцепляться/сплачиваться", examples: ["Эта цель объединила силы всех."] },
      { meaning: "собирать/мобилизовать", examples: ["Эта победа сплотила уверенность всей команды."] },
      { meaning: "конденсироваться", examples: ["Холодный воздух конденсирует водяной пар в туман."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "оснащать", examples: ["Школа оснастила класс компьютерами."] },
      { meaning: "обеспечивать", examples: ["Школа оснастила каждый класс кондиционером."] },
      { meaning: "оборудование", examples: ["Пожарное оборудование уже доставлено на склад."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "наброситься/ринуться на", examples: ["Ребёнок бросился к маме."] },
      { meaning: "хлопать/трепетать", examples: ["Бабочка тихо хлопала крыльями среди цветов."] },
      { meaning: "броситься на", examples: ["Как только ребенок вошел, он бросился в объятия матери."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "зазор", examples: ["На этой чашке есть скол."] },
      { meaning: "брешь", examples: ["Наводнение пробило брешь в дамбе."] },
      { meaning: "скол/зарубка", examples: ["На краю чашки есть небольшой скол."] },
      { meaning: "дефицит", examples: ["У компании все еще не хватает трех миллионов средств."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "ручной", examples: ["Ручной перевод точнее."] },
      { meaning: "созданный человеком", examples: ["Эта рукотворная река проходит через новый район."] },
      { meaning: "искусственный", examples: ["Врач предложил установить пациенту искусственный сустав."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "другие люди", examples: ["Не беспокой людей."] },
      { meaning: "домохозяйство/семья", examples: ["У подножия горы живет несколько семей."] },
      { meaning: "разговорное я/меня", examples: ["Я уже извинился, так что не сердись."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "излучать/испускать", examples: ["Цветок источает запах."] },
      { meaning: "распределять", examples: ["Волонтеры раздавали листовки у входа."] },
      { meaning: "рассылать", examples: ["Система автоматически разошлет уведомительные письма."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "оживленный", examples: ["Сегодня он выглядит очень важным."] },
      { meaning: "гордый/заносчивый", examples: ["Надев новую форму, он выглядел особенно гордым."] },
      { meaning: "выражение/вид", examples: ["Ее выражение лица казалось немного усталым."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "незнакомый", examples: ["Он только что приехал, и обстановка для него ещё непривычная."] },
      { meaning: "заржавевший", examples: ["После многих лет без практики его техника игры на пианино заржавела."] },
      { meaning: "не близкий", examples: ["После переезда мы отдалились от старых соседей."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "пучок/букет", examples: ["На столе стоит букет цветов."] },
      { meaning: "луч", examples: ["Луч солнечного света проник в комнату."] },
      { meaning: "счетное слово для пучков", examples: ["Он подарил ей букет роз."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "формировать", examples: ["Семейное воспитание формирует характер."] },
      { meaning: "лепить/формовать", examples: ["Мастер слепил вазу из глины."] },
      { meaning: "изображать/создавать", examples: ["Роман изображает смелую мать."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "засчитываться/быть действительным", examples: ["Если ты пообещал, обещание должно быть в силе."] },
      { meaning: "держать слово", examples: ["Он всегда держит свое слово."] },
      { meaning: "вычислять", examples: ["Он считал, опустив голову."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "паралич", examples: ["Авария парализовала движение."] },
      { meaning: "парализовать", examples: ["Авария парализовала его левую ногу."] },
      { meaning: "привести к остановке", examples: ["Метель парализовала городской транспорт."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "вынимать", examples: ["Он достал ключ."] },
      { meaning: "вытаскивать", examples: ["Он вытащил ключ из ящика."] },
      { meaning: "выкапывать", examples: ["Рабочий выкопал грязь и песок лопатой."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "регулировать", examples: ["Музыка может разрядить напряжённую жизнь."] },
      { meaning: "облегчать", examples: ["Музыка может облегчить напряженные эмоции."] },
      { meaning: "вносить разнообразие/освежать", examples: ["Поездки на выходных могут внести разнообразие в однообразную жизнь."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "составлять общие планы, учитывая все факторы/стороны", examples: ["Руководителям следует учитывать все стороны."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "сдать багаж", examples: ["Чемодан нужно сдать в багаж."] },
      { meaning: "отправить грузом", examples: ["Эту партию лекарств нужно передать для перевозки по холодовой цепи."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "полный", examples: ["Этот комплект материалов очень полный."] },
      { meaning: "полностью оснащенный", examples: ["Эта больница полностью оборудована."] },
      { meaning: "всеобъемлющий", examples: ["Отчет предоставляет всесторонний анализ данных."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "литература и искусство", examples: ["Школа организовала художественное представление."] },
      { meaning: "искусства", examples: ["В университете она специализировалась на управлении искусством."] },
      { meaning: "литературный/художественный", examples: ["У этого кафе очень артистичная атмосфера."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "вооруженные силы", examples: ["Солдаты уже завершили вооружение."] },
      { meaning: "оружие/оборудование", examples: ["Этой команде не хватает необходимого вооружения и снаряжения."] },
      { meaning: "вооружать/оснащать", examples: ["Они оснастили спасательную команду новой технологией."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "координировать", examples: ["Сочетание цветов очень гармоничное."] },
      { meaning: "скоординированный", examples: ["Действия всех отделов были хорошо скоординированы."] },
      { meaning: "гармоничный", examples: ["Цвета на этой картине очень гармоничны."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "подавлять/вытеснять", examples: ["Он выговорился и выразил свои подавленные эмоции."] },
      { meaning: "угнетающий", examples: ["Атмосфера в переговорной была гнетущей."] },
      { meaning: "подавленный", examples: ["Повторные неудачи сделали его очень подавленным."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "выводить дедуктивно", examples: ["Актёр воплотил жизнь пожилого человека."] },
      { meaning: "интерпретировать/изображать/исполнять", examples: ["Она тонко воплотила образ героини."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "сознание/осознанность", examples: ["Он осознал, что проблема очень серьёзная."] },
      { meaning: "осознать/быть осведомленным о", examples: ["Он наконец осознал серьезность проблемы."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "исходный", examples: ["Здесь сохранился первозданный лес."] },
      { meaning: "примитивный", examples: ["В деревне все еще сохраняются примитивные методы земледелия."] },
      { meaning: "первобытный", examples: ["Ученые изучают экологию первобытных лесов."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "связывать", examples: ["Медсестра уколола его один раз."] },
      { meaning: "колоть/втыкать", examples: ["Игла больно уколола ей палец."] },
      { meaning: "вставлять", examples: ["Он вставил цветы в вазу."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "ломать/получать перелом", examples: ["Он сложил карту."] },
      { meaning: "складывать", examples: ["Она сложила письмо и положила его в конверт."] },
      { meaning: "скидка", examples: ["Сегодня на это пальто скидка тридцать процентов."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "интеллект", examples: ["Смартфоны изменили жизнь."] },
      { meaning: "интеллектуальный/умный", examples: ["Он купил умный холодильник."] },
      { meaning: "ИИ", examples: ["ИИ меняет медицинские услуги."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "руководитель/ответственное лицо", examples: ["Руководитель завтра проверит работу."] },
      { meaning: "быть ответственным за", examples: ["Она отвечает за финансовую работу компании."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "специальная тема/предмет", examples: ["Сегодня на собрании обсуждали тему экологии."] },
      { meaning: "спецматериал", examples: ["В вечерних новостях есть специальный сюжет об экологии."] },
      { meaning: "тематический", examples: ["Музей открыл тематическую выставку."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "осанка/поза", examples: ["Она сохраняет хорошую осанку."] },
      { meaning: "позиция/отношение", examples: ["Правительство сохранило открытую позицию по отношению к переговорам."] },
    ],
  },
  "vi": {
    "hsk6-bajie-20": [
      { meaning: "nịnh bợ", examples: ["Anh ấy không muốn dựa vào việc nịnh bợ người khác để có cơ hội."] },
      { meaning: "lấy lòng", examples: ["Anh ấy luôn cố lấy lòng sếp để được thăng chức."] },
      { meaning: "luồn cúi lấy lòng", examples: ["Để bước vào giới đó, anh ta cố tình lấy lòng vài người nổi tiếng."] },
    ],
    "hsk6-baoxiao-63": [
      { meaning: "được hoàn tiền", examples: ["Sau khi đi công tác về, anh ấy mang hóa đơn đi làm thủ tục hoàn tiền."] },
      { meaning: "nộp chi phí để được hoàn lại", examples: ["Sau khi đi công tác về, cô ấy đem vé tàu đi thanh toán chi phí."] },
      { meaning: "xóa sổ/thanh lý", examples: ["Cái máy cũ đó không sửa được, chỉ có thể thanh lý."] },
    ],
    "hsk6-bise-101": [
      { meaning: "bị chặn/đóng kín", examples: ["Giao thông ở đây cách trở nên tin tức truyền đi rất chậm."] },
      { meaning: "cô lập", examples: ["Ngôi làng miền núi này trước đây rất biệt lập, người ngoài hiếm khi đến."] },
      { meaning: "lạc hậu hoặc thiếu thông tin", examples: ["Thiếu thông tin có thể khiến doanh nghiệp bỏ lỡ cơ hội."] },
    ],
    "hsk6-bing-135": [
      { meaning: "điểm C", examples: ["Trong kỳ thi này, kết quả của anh ấy là hạng C."] },
      { meaning: "thứ ba", examples: ["Ba người được liệt kê là A, B và C đều phải phát biểu."] },
      { meaning: "Thiên can thứ ba", examples: ["Bính là can thứ ba trong Thiên can."] },
    ],
    "hsk6-buzeshouduan-170": [
      { meaning: "không từ thủ đoạn", examples: ["Để thắng cuộc thi, anh ta không từ thủ đoạn."] },
      { meaning: "dùng bất cứ phương tiện nào", examples: ["Để giành khách hàng, anh ta dùng mọi thủ đoạn để ép giá xuống."] },
      { meaning: "bằng mọi cách, tốt hay xấu", examples: ["Công ty đó mở rộng thị trường bằng mọi cách, dù đúng hay sai."] },
    ],
    "hsk6-chetui-243": [
      { meaning: "rút lui", examples: ["Mọi người bắt đầu rút lui."] },
      { meaning: "rút khỏi", examples: ["Trước khi mưa bão ập đến, đội đã rút khỏi thung lũng."] },
      { meaning: "lùi lại", examples: ["Hỏa lực địch quá mạnh nên đơn vị tiền tuyến buộc phải rút lui."] },
    ],
    "hsk6-chili-275": [
      { meaning: "vất vả", examples: ["Cuốn sách này quá nặng, cầm lên rất tốn sức."] },
      { meaning: "tốn sức", examples: ["Chuyển cây đàn piano này thật sự rất vất vả."] },
      { meaning: "gặp khó khăn khi làm", examples: ["Anh ấy hơi khó hiểu các bản tin nói nhanh."] },
    ],
    "hsk6-chufen-306": [
      { meaning: "hình thức kỷ luật", examples: ["Anh ấy vi phạm kỷ luật nên bị nhà trường xử lý kỷ luật."] },
      { meaning: "hình phạt", examples: ["Anh ấy bị xử phạt nghiêm khắc vì gian lận."] },
      { meaning: "xử lý/giải quyết", examples: ["Lô hàng này cần được xử lý càng sớm càng tốt."] },
    ],
    "hsk6-couhuo-340": [
      { meaning: "tạm dùng cho qua", examples: ["Bữa cơm này đơn giản thôi, tạm bợ ăn cho qua là được."] },
      { meaning: "ứng biến", examples: ["Ban nhạc tạm thời ứng biến một đoạn nhạc mở màn."] },
      { meaning: "tạm được/không quá tệ", examples: ["Đồ ăn ở quán nhỏ này cũng tạm được."] },
    ],
    "hsk6-cuan-342": [
      { meaning: "lao vút/chạy vụt", examples: ["Con mèo đó bỗng lao vụt vào bếp."] },
      { meaning: "chạy trốn", examples: ["Tên tội phạm nhân lúc hỗn loạn chạy trốn ra cửa sau."] },
      { meaning: "sửa đổi/làm giả văn bản", examples: ["Anh ta tự ý sửa đổi ngày tháng trong hợp đồng."] },
    ],
    "hsk6-dabuliao-361": [
      { meaning: "cùng lắm thì", examples: ["Cùng lắm thì ngày mai chúng ta lại đến một lần nữa."] },
      { meaning: "không quá", examples: ["Việc này nhiều lắm là hai ngày có thể làm xong."] },
      { meaning: "không có gì to tát trong ngữ cảnh phủ định", examples: ["Lỡ một chuyến xe buýt không có gì to tát."] },
    ],
    "hsk6-dangshiren-386": [
      { meaning: "người liên quan", examples: ["Phải nghe lời giải thích của người liên quan."] },
      { meaning: "bên liên quan", examples: ["Chi tiết vụ tai nạn cần được xác minh với bên liên quan."] },
      { meaning: "đương sự", examples: ["Hai đương sự đã ra tòa làm chứng."] },
    ],
    "hsk6-daobi-392": [
      { meaning: "phá sản", examples: ["Do kinh doanh không tốt, nhà hàng đó đã đóng cửa vào năm ngoái."] },
      { meaning: "đóng cửa", examples: ["Tiền thuê quá cao nên hiệu sách đó đành phải đóng cửa."] },
      { meaning: "thất bại trong kinh doanh", examples: ["Khi dòng tiền bị đứt, công ty nhanh chóng thất bại trong kinh doanh."] },
    ],
    "hsk6-duanjue-469": [
      { meaning: "cắt đứt", examples: ["Anh ấy quyết định cắt đứt với những thói quen xấu trước đây."] },
      { meaning: "cắt bỏ", examples: ["Bão tuyết đã cắt đứt giao thông đến ngôi làng miền núi."] },
      { meaning: "cắt đứt quan hệ", examples: ["Sau cuộc cãi vã, họ đã cắt đứt quan hệ."] },
    ],
    "hsk6-duixian-479": [
      { meaning: "giữ/thực hiện lời hứa", examples: ["Cuối cùng anh ấy cũng thực hiện lời hứa ban đầu."] },
      { meaning: "đổi séc lấy tiền mặt", examples: ["Anh ấy đến ngân hàng để đổi séc lấy tiền mặt."] },
      { meaning: "chuyển thành tiền mặt", examples: ["Những điểm này có thể đổi thành tiền mặt trước cuối tháng."] },
    ],
    "hsk6-fan-504": [
      { meaning: "lượng từ cho lời nói/hành động", examples: ["Lời giải thích lần này rất rõ ràng."] },
      { meaning: "một lượt/giai đoạn", examples: ["Sau một hồi thảo luận, mọi người đã đồng ý với phương án."] },
      { meaning: "loại/kiểu", examples: ["Cảnh tượng kiểu này khiến tôi khó quên."] },
    ],
    "hsk6-fangyuan-525": [
      { meaning: "trong bán kính", examples: ["Trong vòng mười ki-lô-mét không có bệnh viện nào."] },
      { meaning: "khu vực xung quanh", examples: ["Tiếng chuông có thể nghe thấy khắp khu vực xung quanh trong phạm vi vài dặm Hoa."] },
      { meaning: "chu vi", examples: ["Công nhân đang đo chu vi của bồn hoa."] },
    ],
    "hsk6-fangwen-531": [
      { meaning: "thăm", examples: ["Ngày mai phóng viên sẽ phỏng vấn hiệu trưởng."] },
      { meaning: "phỏng vấn", examples: ["Phóng viên sẽ phỏng vấn đạo diễn đoạt giải vào ngày mai."] },
      { meaning: "truy cập", examples: ["Người dùng không thể truy cập trang web này."] },
    ],
    "hsk6-fuyan-581": [
      { meaning: "làm qua loa", examples: ["Đừng qua loa cho có với tôi, hãy trả lời nghiêm túc."] },
      { meaning: "gạt đi/đáp cho xong", examples: ["Quản lý dùng vài lời sáo rỗng để qua loa với khách hàng."] },
      { meaning: "làm tạm cho qua", examples: ["Anh ấy không chuẩn bị, chỉ có thể nói qua loa cho xong báo cáo."] },
    ],
    "hsk6-fuhe-602": [
      { meaning: "phụ họa", examples: ["Người khác vừa nói là anh ta liền hùa theo."] },
      { meaning: "chen vào hưởng ứng", examples: ["Cô ấy vừa đề xuất, những người bên cạnh liền hưởng ứng."] },
      { meaning: "đồng ý thiếu suy xét", examples: ["Đừng ai nói gì cũng hùa theo một cách thiếu suy nghĩ."] },
    ],
    "hsk6-fushu-604": [
      { meaning: "trực thuộc/liên kết", examples: ["Bệnh viện này là bệnh viện trực thuộc trường."] },
      { meaning: "gắn kèm", examples: ["Ba danh sách được đính kèm ở cuối hợp đồng."] },
      { meaning: "cấp dưới", examples: ["Bộ phận này chỉ là một đơn vị phụ thuộc."] },
      { meaning: "phụ trợ", examples: ["Bãi đậu xe là một cơ sở phụ trợ của khách sạn."] },
    ],
    "hsk6-gesong-637": [
      { meaning: "ca ngợi", examples: ["Bộ phim đã ca ngợi người công nhân."] },
      { meaning: "tán dương", examples: ["Điếu văn ca ngợi sự cống hiến vô tư của ông ấy."] },
      { meaning: "ngợi ca", examples: ["Nhà thơ ca ngợi sức mạnh của biển cả."] },
    ],
    "hsk6-gongran-659": [
      { meaning: "công khai", examples: ["Anh ta công khai vi phạm quy định."] },
      { meaning: "trước công chúng", examples: ["Anh ấy công khai phản đối quyết định này trong cuộc họp."] },
      { meaning: "trắng trợn", examples: ["Anh ta trắng trợn nói dối mà không hề đỏ mặt."] },
    ],
    "hsk6-gufu-683": [
      { meaning: "phụ lòng", examples: ["Tôi không muốn phụ lòng kỳ vọng của bố mẹ."] },
      { meaning: "làm thất vọng", examples: ["Đừng phụ lòng kỳ vọng của cha mẹ."] },
      { meaning: "không đáp lại kỳ vọng", examples: ["Anh ấy đã không phụ sự tin tưởng của thầy giáo."] },
    ],
    "hsk6-guigendaodi-719": [
      { meaning: "rốt cuộc", examples: ["Rốt cuộc thì sức khỏe là quan trọng nhất."] },
      { meaning: "xét đến cùng", examples: ["Xét cho cùng, chất lượng mới là điều quan trọng nhất."] },
    ],
    "hsk6-henbude-766": [
      { meaning: "ước gì có thể", examples: ["Anh ấy chỉ muốn lập tức về nhà."] },
      { meaning: "rất nóng lòng muốn", examples: ["Nghe tin vui, anh ấy nóng lòng muốn về nhà ngay."] },
    ],
    "hsk6-houguzhiyou-778": [
      { meaning: "lo lắng về hậu quả", examples: ["Có số tiền này rồi, anh ấy không còn nỗi lo về phía sau nữa."] },
      { meaning: "nỗi lo hậu phương/gia đình", examples: ["Khi gia đình đã ổn định, anh ấy đi công tác không còn lo chuyện hậu phương."] },
      { meaning: "mối bận tâm còn dai dẳng", examples: ["Sau khi nguồn vốn được đảm bảo, nhóm dự án không còn nỗi lo nào vướng lại."] },
    ],
    "hsk6-huali-790": [
      { meaning: "lộng lẫy", examples: ["Cô ấy đang mặc bộ quần áo lộng lẫy."] },
      { meaning: "tráng lệ", examples: ["Trong đại sảnh treo một chiếc đèn pha lê lộng lẫy."] },
      { meaning: "cầu kỳ hoa lệ", examples: ["Họa tiết thêu trên bộ lễ phục này rất cầu kỳ."] },
    ],
    "hsk6-jigou-840": [
      { meaning: "tổ chức", examples: ["Tổ chức này giúp đỡ người cao tuổi."] },
      { meaning: "cơ quan", examples: ["Cơ quan này chuyên nghiên cứu về y tế công cộng."] },
      { meaning: "cơ chế", examples: ["Cơ cấu bên trong của đồng hồ cực kỳ chính xác."] },
    ],
    "hsk6-jijiao-874": [
      { meaning: "so đo", examples: ["Đừng so đo chuyện nhỏ nhặt quá."] },
      { meaning: "mặc cả/tranh cãi về", examples: ["Người bán hàng vẫn còn mặc cả hai nhân dân tệ."] },
      { meaning: "để tâm/bận tâm về", examples: ["Tôi không bận tâm ai xin lỗi trước."] },
    ],
    "hsk6-jianta-920": [
      { meaning: "giẫm đạp", examples: ["Đừng giẫm đạp lên bãi cỏ."] },
      { meaning: "giẫm lên", examples: ["Xin đừng giẫm lên bãi cỏ mới trải."] },
      { meaning: "vi phạm/chà đạp", examples: ["Mệnh lệnh này đã vi phạm quyền công dân."] },
    ],
    "hsk6-jiang-927": [
      { meaning: "mái chèo", examples: ["Mái chèo trên thuyền bị gãy rồi."] },
      { meaning: "chèo", examples: ["Anh ấy dùng mái chèo đưa chiếc thuyền nhỏ về bờ."] },
    ],
    "hsk6-jiaoqi-937": [
      { meaning: "yếu ớt/nhõng nhẽo", examples: ["Đừng quá đỏng đảnh, sắp đến rồi."] },
      { meaning: "được nuông chiều", examples: ["Anh ta được nuông chiều từ nhỏ nên trở nên rất được chiều hư."] },
      { meaning: "không chịu được gian khổ", examples: ["Mới đi hai cây số anh ta đã kêu mệt; anh ta thật sự không chịu được gian khổ."] },
    ],
    "hsk6-juan-1029": [
      { meaning: "juan3 cuộn lại/uốn cong", examples: ["Cô ấy cuộn bức tranh lại và cất đi."] },
      { meaning: "juan4 quyển/cuộn", examples: ["Trên giá sách có một cuộn tranh cổ."] },
    ],
    "hsk6-kankan-er-tan-1051": [
      { meaning: "nói thẳng thắn/tự tin và dài dòng", examples: ["Anh ấy nói chuyện trên sân khấu rất tự tin, hoàn toàn không hề căng thẳng."] },
      { meaning: "nói lưu loát", examples: ["Anh ấy có thể nói trôi chảy ngay cả khi không có bản thảo."] },
    ],
    "hsk6-kenqie-1073": [
      { meaning: "tha thiết", examples: ["Anh ấy dùng giọng điệu chân thành để xin được giúp đỡ."] },
      { meaning: "chân thành", examples: ["Lời xin lỗi của cô ấy rất chân thành."] },
      { meaning: "tận đáy lòng", examples: ["Anh ấy chân thành cảm ơn sự giúp đỡ của dân làng."] },
    ],
    "hsk6-kuidai-1107": [
      { meaning: "đối xử bất công", examples: ["Công ty không đối xử tệ với nhân viên lâu năm."] },
      { meaning: "đối xử thiệt thòi", examples: ["Ông chủ không bao giờ trả thiếu tiền thưởng cho nhân viên lâu năm."] },
      { meaning: "ngược đãi", examples: ["Anh ấy không muốn ngược đãi con ngựa già đó."] },
    ],
    "hsk6-lengku-1130": [
      { meaning: "lạnh lùng", examples: ["Câu trả lời của anh ấy có vẻ rất lạnh lùng."] },
      { meaning: "nhẫn tâm", examples: ["Anh ta tỏ ra rất vô cảm trước nỗi đau của bệnh nhân."] },
      { meaning: "tàn nhẫn", examples: ["Vị tướng ban lệnh hành quyết tàn nhẫn."] },
    ],
    "hsk6-leng-1133": [
      { meaning: "sững sờ", examples: ["Nghe tin đó, anh ấy sững người một lúc."] },
      { meaning: "đứng khựng", examples: ["Cánh cửa đột nhiên mở ra, anh ấy đứng sững tại chỗ."] },
      { meaning: "lơ đãng", examples: ["Đừng cứ lơ đãng nhìn ra ngoài cửa sổ trong giờ học."] },
    ],
    "hsk6-lihai-1150": [
      { meaning: "lợi hại/quyền lợi liên quan", examples: ["Cuối cùng anh ấy cũng hiểu được điều gì đang bị đặt cược trong chuyện này."] },
      { meaning: "mặt lợi và hại", examples: ["Hãy cân nhắc rõ lợi hại trước khi ký."] },
      { meaning: "mức độ nghiêm trọng", examples: ["Anh ấy vẫn chưa nhận ra mức độ nghiêm trọng của vấn đề."] },
    ],
    "hsk6-maimo-1216": [
      { meaning: "chôn vùi", examples: ["Công việc bận rộn đã chôn vùi tài năng của anh ấy."] },
      { meaning: "che khuất", examples: ["Tiếng ồn đã lấn át giọng hát của cô ấy."] },
      { meaning: "để tài năng không được công nhận", examples: ["Đừng để công việc vụn vặt vùi lấp tài năng của anh ấy."] },
    ],
    "hsk6-mai-1218": [
      { meaning: "bước một bước", examples: ["Anh ấy bước vào lớp học với vẻ rất căng thẳng."] },
      { meaning: "sải bước", examples: ["Anh ấy sải bước về phía hội trường."] },
      { meaning: "bước vào", examples: ["Công ty đang bước vào thị trường quốc tế."] },
    ],
    "hsk6-moshuir-1284": [
      { meaning: "mực", examples: ["Hết mực rồi."] },
      { meaning: "học vấn/văn hóa sách vở", examples: ["Anh ấy thật sự có chút học vấn."] },
    ],
    "hsk6-muguang-1289": [
      { meaning: "ánh mắt", examples: ["Ánh mắt của thầy giáo dừng lại trên bảng đen."] },
      { meaning: "cái nhìn", examples: ["Cô ấy trao một ánh mắt động viên."] },
      { meaning: "thị lực/tầm nhìn", examples: ["Thị lực của anh ấy phục hồi rất nhanh."] },
    ],
    "hsk6-neimu-1300": [
      { meaning: "chuyện nội bộ", examples: ["Phóng viên muốn tìm hiểu nội tình của vụ việc."] },
      { meaning: "thông tin nội bộ", examples: ["Phóng viên nắm được thông tin nội bộ về giao dịch."] },
    ],
    "hsk6-niding-1303": [
      { meaning: "soạn thảo", examples: ["Chúng tôi đang soạn thảo một kế hoạch mới."] },
      { meaning: "lập ra", examples: ["Thư ký đang soạn thảo chương trình họp."] },
      { meaning: "xây dựng", examples: ["Các chuyên gia đã xây dựng tiêu chuẩn đánh giá mới."] },
    ],
    "hsk6-qiao-1456": [
      { meaning: "vểnh lên/nâng lên", examples: ["Anh ấy gác chân lên ghế."] },
      { meaning: "chống lên", examples: ["Anh ấy chống tấm ván lên để chặn bánh xe."] },
      { meaning: "cong lên", examples: ["Góc tờ giấy bị nước làm cong vểnh lên."] },
      { meaning: "nổi bật/xuất sắc", examples: ["Anh ấy là học sinh xuất sắc trong lớp."] },
    ],
    "hsk6-qie-erbushe-1458": [
      { meaning: "kiên trì", examples: ["Chỉ cần kiên trì thì sẽ có tiến bộ."] },
      { meaning: "tiếp tục bền bỉ", examples: ["Chỉ cần kiên trì làm tiếp, bài toán khó rồi cũng sẽ được giải."] },
      { meaning: "bền chí", examples: ["Cô ấy kiên trì truy tìm sự thật."] },
    ],
    "hsk6-remen-1520": [
      { meaning: "phổ biến", examples: ["Môn học này rất phổ biến."] },
      { meaning: "được ưa chuộng", examples: ["Chuyên viên phân tích dữ liệu đã trở thành vị trí được săn đón."] },
      { meaning: "đang thịnh hành/nóng", examples: ["Điệu nhảy này gần đây rất thịnh hành."] },
    ],
    "hsk6-rending-1533": [
      { meaning: "xác định", examples: ["Tòa án xác định hợp đồng là hợp pháp."] },
      { meaning: "nhận định là", examples: ["Cảnh sát xác định anh ta là nghi phạm."] },
      { meaning: "tin chắc", examples: ["Cô ấy tin chắc rằng nỗ lực nhất định sẽ được đền đáp."] },
    ],
    "hsk6-renke-1534": [
      { meaning: "chấp thuận", examples: ["Nỗ lực của anh ấy đã được mọi người công nhận."] },
      { meaning: "công nhận", examples: ["Tổ chức quốc tế đã công nhận tiêu chuẩn này."] },
      { meaning: "sự chấp nhận/phê chuẩn", examples: ["Phương án này đã nhận được sự chấp thuận của nhóm."] },
    ],
    "hsk6-sou-1721": [
      { meaning: "lượng từ cho tàu/thuyền", examples: ["Có ba chiếc tàu đang neo tại cảng."] },
    ],
    "hsk6-taotaobujue-1755": [
      { meaning: "nói không ngừng", examples: ["Hễ anh ấy nói về lịch sử là nói thao thao bất tuyệt."] },
      { meaning: "nói liên tục/lưu loát", examples: ["Người dẫn chương trình vừa mở màn đã nói không ngừng."] },
    ],
    "hsk6-tongyong-1803": [
      { meaning: "đa dụng", examples: ["Phương pháp này có thể áp dụng rộng rãi."] },
      { meaning: "được dùng/áp dụng phổ biến", examples: ["Loại phích cắm này được dùng phổ biến ở châu Âu."] },
    ],
    "hsk6-wangxiang-1865": [
      { meaning: "ảo tưởng", examples: ["Đừng ảo tưởng không nỗ lực mà vẫn thành công."] },
      { meaning: "hy vọng hão huyền", examples: ["Thành công mà không nỗ lực chỉ là ảo vọng."] },
      { meaning: "mơ tưởng", examples: ["Anh ta suốt ngày mơ tưởng làm giàu chỉ sau một đêm."] },
    ],
    "hsk6-weiqi-1879": [
      { meaning: "kéo dài trong", examples: ["Khóa đào tạo kéo dài ba tháng."] },
      { meaning: "trong một khoảng thời gian", examples: ["Khóa đào tạo kéo dài trong ba tháng."] },
    ],
    "hsk6-xinchendaixie-2001": [
      { meaning: "sự trao đổi chất", examples: ["Vận động có thể thúc đẩy quá trình trao đổi chất."] },
      { meaning: "sự thay cái cũ bằng cái mới", examples: ["Sự thay thế cái cũ bằng cái mới trong ngành đang tăng tốc."] },
    ],
    "hsk6-xinxue-2009": [
      { meaning: "tâm huyết", examples: ["Cuốn sách này đã tốn rất nhiều tâm huyết của anh ấy."] },
      { meaning: "công sức/sự tận tụy dồn vào việc gì", examples: ["Cuốn sách này kết tinh mười năm tâm huyết của cô ấy."] },
    ],
    "hsk6-xujiu-2050": [
      { meaning: "uống rượu quá mức", examples: ["Uống rượu quá độ lâu dài sẽ ảnh hưởng đến sức khỏe."] },
      { meaning: "lạm dụng rượu", examples: ["Lạm dụng rượu lâu dài đã làm tổn hại sức khỏe của anh ấy."] },
    ],
    "hsk6-yazha-2081": [
      { meaning: "ép/nén", examples: ["Ông chủ không được bóc lột công nhân."] },
      { meaning: "bóc lột", examples: ["Nhà máy vô lương tâm bóc lột công nhân thời vụ."] },
    ],
    "hsk6-yanguang-2106": [
      { meaning: "thị lực", examples: ["Người quản lý có con mắt đánh giá rất tốt."] },
      { meaning: "khả năng phán đoán", examples: ["Cô ấy có óc phán đoán tốt khi chọn đối tác."] },
      { meaning: "tầm nhìn", examples: ["Biên tập viên này có tầm nhìn độc đáo."] },
      { meaning: "gu/thẩm mỹ", examples: ["Gu thẩm mỹ của anh ấy rất kén chọn; anh ấy chỉ mua kiểu cổ điển."] },
    ],
    "hsk6-yinxiang-2165": [
      { meaning: "âm thanh/audio", examples: ["Dàn âm thanh trong phòng quá to."] },
      { meaning: "hệ thống âm thanh/thiết bị stereo", examples: ["Phòng khách mới mua một bộ dàn âm thanh."] },
    ],
    "hsk6-yuangao-2223": [
      { meaning: "nguyên đơn", examples: ["Nguyên đơn trình bày tình hình với tòa án."] },
    ],
    "hsk6-yunyu-2238": [
      { meaning: "mang thai", examples: ["Đất đai nuôi dưỡng một hệ sinh mệnh phong phú."] },
      { meaning: "sinh sôi", examples: ["Vùng đất ngập nước nuôi sinh nhiều loài chim nước."] },
      { meaning: "nuôi dưỡng", examples: ["Trường học đã nuôi dưỡng một nhóm nhà khoa học trẻ."] },
      { meaning: "làm nảy sinh", examples: ["Khủng hoảng đã tạo ra những cơ hội mới."] },
    ],
    "hsk6-zhi-ji-2337": [
      { meaning: "nhân dịp", examples: ["Nhân dịp tốt nghiệp, thầy cô mong mọi người thành công."] },
      { meaning: "vào lúc", examples: ["Vào lúc tốt nghiệp, anh ấy viết thư cảm ơn thầy giáo."] },
    ],
    "hsk6-zhili-2367": [
      { meaning: "cai trị/quản lý", examples: ["Chính phủ đang quản lý vấn nạn ô nhiễm."] },
      { meaning: "quản lý/điều trị", examples: ["Nhà máy bắt đầu xử lý nước thải."] },
      { meaning: "sự quản trị", examples: ["Quản trị công ty cần sự minh bạch."] },
    ],
    "hsk6-zhiliu-2378": [
      { meaning: "bị mắc kẹt", examples: ["Tuyết rơi dày khiến rất nhiều người bị kẹt ở sân bay."] },
      { meaning: "bị giam giữ", examples: ["Anh ấy bị giữ lại ở sân bay vì vấn đề giấy tờ."] },
      { meaning: "ở lại phía sau", examples: ["Các tình nguyện viên ở lại hiện trường để dọn rác."] },
      { meaning: "sự giữ lại/lưu giữ", examples: ["Kết quả kiểm tra cho thấy thức ăn bị lưu lại trong dạ dày."] },
    ],
    "hsk6-zhongxin-2394": [
      { meaning: "trọng tâm", examples: ["Vui lòng hạ thấp trọng tâm cơ thể."] },
      { meaning: "tiêu điểm/cốt lõi", examples: ["Trọng tâm công việc năm nay là chất lượng."] },
    ],
    "hsk6-zhuangzhong-2442": [
      { meaning: "trang nghiêm", examples: ["Anh ấy ăn mặc rất trang trọng."] },
      { meaning: "đĩnh đạc", examples: ["Cử chỉ của cô ấy trang trọng và đúng mực."] },
      { meaning: "trang trọng", examples: ["Xin hãy phát biểu bằng giọng trang trọng."] },
    ],
    "hsk6-ai-1": [
      { meaning: "ai1 ở sát/gần", examples: ["Mời mọi người ngồi sát lại, phía sau vẫn còn người."] },
      { meaning: "ai2 chịu đựng", examples: ["Anh ấy chịu một trận phê bình."] },
    ],
    "hsk6-ao-15": [
      { meaning: "ninh/sắc cho cô lại", examples: ["Mẹ đã ninh canh cá suốt hai tiếng."] },
      { meaning: "chịu đựng", examples: ["Giai đoạn khó khăn này cuối cùng cũng được chịu đựng qua."] },
      { meaning: "thức khuya", examples: ["Anh ấy thức đến rạng sáng mới ngủ."] },
    ],
    "hsk6-bianli-112": [
      { meaning: "sự tiện lợi", examples: ["Ga tàu điện ngầm mới mang lại rất nhiều tiện lợi cho cư dân."] },
      { meaning: "tiện lợi", examples: ["Giao thông ở đây rất thuận tiện."] },
      { meaning: "tạo điều kiện", examples: ["Hệ thống mới đã tạo thuận lợi cho quy trình hoàn tiền."] },
    ],
    "hsk6-bukan-162": [
      { meaning: "không thể chịu nổi", examples: ["Căn phòng bừa bộn đến mức không chịu nổi."] },
      { meaning: "cực kỳ/không chịu nổi", examples: ["Căn phòng nóng bức ngột ngạt không chịu nổi."] },
      { meaning: "trong tình trạng tồi tệ", examples: ["Tòa nhà cũ đã xuống cấp tồi tệ."] },
    ],
    "hsk6-chan-221": [
      { meaning: "thèm ăn", examples: ["Em trai tôi vừa thấy bánh gato là đã thèm ngay."] },
      { meaning: "tham ăn", examples: ["Cứ đến giờ ăn là anh ấy đặc biệt thèm ăn."] },
      { meaning: "háu ăn", examples: ["Đứa trẻ này quá ham ăn, thấy đồ ăn vặt là lấy ngay."] },
    ],
    "hsk6-chidun-276": [
      { meaning: "cùn/không sắc", examples: ["Con dao này dùng lâu rồi, đã hơi cùn."] },
      { meaning: "chậm hiểu", examples: ["Phản ứng của anh ấy hơi chậm chạp."] },
      { meaning: "chậm chạp", examples: ["Máy tính chạy chậm chạp."] },
    ],
    "hsk6-chumai-297": [
      { meaning: "bán", examples: ["Vì tiền mà bán đứng bạn bè là không đúng."] },
      { meaning: "phản bội/bán đứng", examples: ["Anh ấy đã phản bội lòng tin của bạn mình."] },
    ],
    "hsk6-cihou-337": [
      { meaning: "phục vụ", examples: ["Cô ấy chăm sóc rất chu đáo cho mẹ bị bệnh."] },
      { meaning: "hầu hạ", examples: ["Y tá chăm sóc bệnh nhân ăn uống rất chu đáo."] },
      { meaning: "chăm sóc", examples: ["Cô ấy chăm sóc người mẹ già ở nhà."] },
    ],
    "hsk6-dabian-351": [
      { meaning: "bảo vệ luận văn", examples: ["Anh ấy tham gia buổi bảo vệ tốt nghiệp."] },
      { meaning: "buổi bảo vệ vấn đáp", examples: ["Ngày mai cô ấy sẽ tham gia buổi bảo vệ luận văn."] },
      { meaning: "trả lời chất vấn", examples: ["Anh ấy bình tĩnh trả lời các chất vấn và phản hồi những nghi ngờ."] },
    ],
    "hsk6-dayi-366": [
      { meaning: "dayi bất cẩn", examples: ["Anh ấy quá bất cẩn, để hộ chiếu ở nhà."] },
      { meaning: "dayi ý chính/nghĩa chung", examples: ["Xin hãy tóm tắt ý chính của bài viết trước."] },
    ],
    "hsk6-fanmian-515": [
      { meaning: "mặt trái/đối diện", examples: ["Câu chuyện này cũng có bài học mặt trái."] },
      { meaning: "khía cạnh/ví dụ tiêu cực", examples: ["Trường hợp này là một ví dụ tiêu cực."] },
    ],
    "hsk6-fenjie-549": [
      { meaning: "phân giải", examples: ["Thầy giáo chia vấn đề thành vài phần."] },
      { meaning: "tách ra/phân tích", examples: ["Giáo viên chia bài toán khó thành ba bước."] },
      { meaning: "phân hủy", examples: ["Vi khuẩn có thể phân hủy lá rụng."] },
    ],
    "hsk6-fengman-572": [
      { meaning: "đầy đặn", examples: ["Bài viết này có nội dung phong phú."] },
      { meaning: "dồi dào", examples: ["Năng lực và sự hỗ trợ của anh ấy nay đã đầy đủ."] },
      { meaning: "phong phú/có chiều sâu", examples: ["Nội dung báo cáo phong phú và thuyết phục."] },
    ],
    "hsk6-fuxiu-593": [
      { meaning: "mục nát/thối rữa", examples: ["Gỗ mục dễ bị gãy."] },
      { meaning: "suy đồi/mục ruỗng", examples: ["Chế độ mục nát phải được thay đổi."] },
    ],
    "hsk6-gankai-617": [
      { meaning: "vô cùng xúc động", examples: ["Nhìn bức ảnh cũ, anh ấy rất bùi ngùi."] },
      { meaning: "thở dài xúc động", examples: ["Nhìn thấy bức ảnh cũ, anh ấy bùi ngùi xúc động."] },
      { meaning: "cảm tưởng/cảm xúc", examples: ["Cô ấy ghi lại những cảm xúc trong chuyến đi."] },
    ],
    "hsk6-gengdi-651": [
      { meaning: "đất nông nghiệp/đất canh tác", examples: ["Người nông dân đang cày đất."] },
      { meaning: "cày xới đất", examples: ["Mùa xuân, nông dân bắt đầu cày đất."] },
    ],
    "hsk6-heng-768": [
      { meaning: "ngang", examples: ["Anh ấy đứng nghiêng ngang ở cửa."] },
      { meaning: "ngang qua/bên hông", examples: ["Anh ấy đặt cái bàn nằm ngang."] },
      { meaning: "thô lỗ/vô lý", examples: ["Anh ấy nói chuyện quá ngang ngược."] },
    ],
    "hsk6-hong-769": [
      { meaning: "dỗ dành", examples: ["Bố đang dỗ đứa trẻ ngủ."] },
      { meaning: "xoa dịu", examples: ["Cô ấy nhẹ nhàng dỗ đứa trẻ ngủ."] },
      { meaning: "lừa gạt", examples: ["Đừng lấy tin giả để lừa tôi."] },
    ],
    "hsk6-huanyuan-800": [
      { meaning: "khôi phục", examples: ["Làm ơn phục dựng lại hiện trường một chút."] },
      { meaning: "tái dựng", examples: ["Cảnh sát cố gắng tái dựng quá trình xảy ra vụ án."] },
      { meaning: "khử về mặt hóa học", examples: ["Hydro có thể khử oxit đồng về mặt hóa học."] },
    ],
    "hsk6-jidong-839": [
      { meaning: "linh hoạt", examples: ["Kế hoạch có thời gian linh động."] },
      { meaning: "cơ động", examples: ["Nhóm cơ động có thể hỗ trợ bất cứ lúc nào."] },
      { meaning: "có động cơ", examples: ["Một chiếc xe ba bánh có động cơ đậu ở cửa."] },
      { meaning: "điều động", examples: ["Quân đội cơ động trong vùng núi."] },
    ],
    "hsk6-jianduan-897": [
      { meaning: "đầu nhọn", examples: ["Công ty sử dụng công nghệ tiên tiến."] },
      { meaning: "mũi nhọn/tiên tiến nhất", examples: ["Công ty phát triển chip tiên tiến."] },
      { meaning: "tiên tiến", examples: ["Bệnh viện này có thiết bị tiên tiến."] },
    ],
    "hsk6-jiantao-902": [
      { meaning: "tự kiểm điểm", examples: ["Anh ấy đã viết một bản kiểm điểm."] },
      { meaning: "xem xét/kiểm tra", examples: ["Sau cuộc họp, chúng tôi xem xét các lỗ hổng của phương án."] },
    ],
    "hsk6-jiandie-912": [
      { meaning: "gián điệp", examples: ["Điệp viên trong phim rất lanh trí."] },
      { meaning: "đặc vụ gián điệp", examples: ["Một điệp viên nước ngoài bị phát hiện ở biên giới."] },
    ],
    "hsk6-jianwen-917": [
      { meaning: "những điều mắt thấy tai nghe", examples: ["Du lịch đã tăng thêm kiến văn cho anh ấy."] },
      { meaning: "kiến thức và kinh nghiệm", examples: ["Du lịch đã mở rộng kiến thức và trải nghiệm của anh ấy."] },
    ],
    "hsk6-jianquan-919": [
      { meaning: "lành mạnh/hoàn chỉnh", examples: ["Công ty cần kiện toàn chế độ quản lý."] },
      { meaning: "cải thiện/hoàn thiện", examples: ["Chính phủ sẽ hoàn thiện cơ chế giám sát."] },
    ],
    "hsk6-jiaodai-932": [
      { meaning: "giải thích", examples: ["Người quản lý đã dặn dò, giao nhiệm vụ rất rõ ràng."] },
      { meaning: "khai báo/giải trình", examples: ["Anh ấy phải giải trình số tiền đã đi đâu."] },
      { meaning: "bàn giao", examples: ["Xin hãy bàn giao công việc cho đồng nghiệp mới."] },
    ],
    "hsk6-leyi-1127": [
      { meaning: "sẵn lòng/vui lòng", examples: ["Tôi rất sẵn lòng giúp bạn chuyển nhà."] },
    ],
    "hsk6-lisuodangran-1139": [
      { meaning: "lẽ đương nhiên", examples: ["Đừng coi việc người khác giúp đỡ là điều đương nhiên."] },
      { meaning: "coi là hiển nhiên", examples: ["Anh ấy coi sự giúp đỡ của người khác là điều hiển nhiên."] },
    ],
    "hsk6-lin-1168": [
      { meaning: "ướt sũng", examples: ["Anh ấy bị nước tạt ướt sũng."] },
      { meaning: "rót/tưới/rắc", examples: ["Cô ấy rưới mật ong lên bánh."] },
      { meaning: "bị ướt", examples: ["Quên mang ô, anh ấy bị mưa ướt sũng."] },
    ],
    "hsk6-maochong-1229": [
      { meaning: "mạo danh", examples: ["Có người mạo danh bác sĩ để lừa người già."] },
      { meaning: "giả vờ là", examples: ["Anh ấy giả làm phóng viên để vào hội trường."] },
      { meaning: "tự xưng là", examples: ["Cô ấy mạo nhận là chuyên gia để lấy lòng tin."] },
    ],
    "hsk6-mei-1232": [
      { meaning: "lượng từ cho vật nhỏ dẹt/tròn như đồng xu, nhẫn, huy chương, tem", examples: ["Cô ấy mua một chiếc nhẫn."] },
    ],
    "hsk6-nixing-1304": [
      { meaning: "đi ngược chiều giao thông", examples: ["Con đường này cấm đi ngược chiều."] },
      { meaning: "đi theo hướng ngược/sai", examples: ["Chiếc xe đó đi ngược chiều trên đường một chiều."] },
      { meaning: "ngược dòng/nghịch hành", examples: ["Sao Hải Vương có chuyển động nghịch hành."] },
    ],
    "hsk6-ningju-1309": [
      { meaning: "kết tụ", examples: ["Mục tiêu này đã quy tụ sức mạnh của mọi người."] },
      { meaning: "tập hợp/quy tụ", examples: ["Chiến thắng này đã quy tụ niềm tin của cả đội."] },
      { meaning: "ngưng tụ", examples: ["Không khí lạnh ngưng tụ hơi nước thành sương mù."] },
    ],
    "hsk6-peibei-1340": [
      { meaning: "trang bị", examples: ["Nhà trường đã trang bị máy tính cho lớp học."] },
      { meaning: "cung cấp cho", examples: ["Nhà trường đã trang bị điều hòa cho mỗi phòng học."] },
      { meaning: "thiết bị", examples: ["Thiết bị phòng cháy chữa cháy đã được chuyển đến kho."] },
    ],
    "hsk6-pu-1390": [
      { meaning: "vồ/lao tới", examples: ["Đứa trẻ lao tới phía mẹ."] },
      { meaning: "vỗ cánh/phấp phới", examples: ["Con bướm nhẹ nhàng vỗ cánh giữa những bông hoa."] },
      { meaning: "lao mình lên", examples: ["Vừa bước vào, đứa trẻ đã lao vào vòng tay mẹ."] },
    ],
    "hsk6-quekou-1504": [
      { meaning: "khe hở", examples: ["Cái cốc này bị mẻ một chỗ."] },
      { meaning: "lỗ thủng/chỗ vỡ", examples: ["Lũ đã xé mở một đoạn vỡ trên con đê."] },
      { meaning: "mẻ/khấc", examples: ["Miệng cốc có một vết mẻ nhỏ."] },
      { meaning: "thiếu hụt", examples: ["Công ty vẫn còn thiếu hụt ba triệu tiền vốn."] },
    ],
    "hsk6-rengong-1523": [
      { meaning: "thủ công", examples: ["Bản dịch do con người thực hiện chính xác hơn."] },
      { meaning: "do con người tạo ra", examples: ["Con sông nhân tạo này chảy qua khu mới."] },
      { meaning: "nhân tạo", examples: ["Bác sĩ đề nghị lắp khớp nhân tạo cho bệnh nhân."] },
    ],
    "hsk6-renjia-1524": [
      { meaning: "người khác", examples: ["Đừng làm phiền người ta."] },
      { meaning: "hộ gia đình/gia đình", examples: ["Dưới chân núi có vài hộ gia đình sinh sống."] },
      { meaning: "tôi trong khẩu ngữ", examples: ["Tớ đã xin lỗi rồi, đừng giận nữa."] },
    ],
    "hsk6-sanfa-1559": [
      { meaning: "tỏa ra/phát ra", examples: ["Bông hoa tỏa ra mùi hương."] },
      { meaning: "phân phát", examples: ["Tình nguyện viên phát tờ rơi ở cổng vào."] },
      { meaning: "phát đi", examples: ["Hệ thống sẽ tự động gửi email thông báo."] },
    ],
    "hsk6-shenqi-1597": [
      { meaning: "có thần thái", examples: ["Hôm nay anh ấy trông rất đắc ý."] },
      { meaning: "kiêu hãnh/kiêu căng", examples: ["Sau khi mặc đồng phục mới, anh ấy trông rất oai."] },
      { meaning: "vẻ mặt/thần thái", examples: ["Vẻ mặt cô ấy trông hơi mệt."] },
    ],
    "hsk6-shengshu-1610": [
      { meaning: "xa lạ", examples: ["Anh ấy vừa mới đến nên vẫn còn chưa quen môi trường."] },
      { meaning: "lạ tay/lâu không dùng", examples: ["Nhiều năm không luyện tập, kỹ thuật piano của anh ấy đã lụt đi."] },
      { meaning: "không thân", examples: ["Sau khi chuyển nhà, chúng tôi trở nên xa cách với hàng xóm cũ."] },
    ],
    "hsk6-shu-1693": [
      { meaning: "bó/chùm", examples: ["Trên bàn có một bó hoa."] },
      { meaning: "tia", examples: ["Một tia nắng chiếu vào phòng."] },
      { meaning: "lượng từ cho bó", examples: ["Anh ấy tặng cô ấy một bó hoa hồng."] },
    ],
    "hsk6-suzao-1724": [
      { meaning: "định hình", examples: ["Giáo dục gia đình định hình tính cách."] },
      { meaning: "nhào nặn", examples: ["Người thợ nặn chiếc bình từ đất sét."] },
      { meaning: "khắc họa/tạo dựng", examples: ["Cuốn tiểu thuyết khắc họa một người mẹ dũng cảm."] },
    ],
    "hsk6-suanshu-1728": [
      { meaning: "có hiệu lực/được tính", examples: ["Anh đã hứa rồi thì phải có hiệu lực."] },
      { meaning: "giữ lời", examples: ["Anh ấy luôn giữ lời."] },
      { meaning: "tính toán", examples: ["Anh ấy đang cúi đầu tính toán."] },
    ],
    "hsk6-tanhuan-1742": [
      { meaning: "sự tê liệt", examples: ["Tai nạn khiến giao thông tê liệt."] },
      { meaning: "làm tê liệt", examples: ["Tai nạn làm chân trái của anh ấy bị liệt."] },
      { meaning: "làm đình trệ hoàn toàn", examples: ["Bão tuyết làm giao thông thành phố tê liệt."] },
    ],
    "hsk6-tao-1754": [
      { meaning: "lấy ra", examples: ["Anh ấy móc chìa khóa ra."] },
      { meaning: "rút ra", examples: ["Anh ấy lấy chìa khóa từ trong ngăn kéo ra."] },
      { meaning: "đào ra", examples: ["Công nhân dùng xẻng móc bùn cát ra."] },
    ],
    "hsk6-tiaoji-1788": [
      { meaning: "điều chỉnh", examples: ["Âm nhạc có thể giúp làm dịu cuộc sống căng thẳng."] },
      { meaning: "làm dịu", examples: ["Âm nhạc có thể làm dịu cảm xúc căng thẳng."] },
      { meaning: "thêm sự đa dạng/làm mới", examples: ["Du lịch cuối tuần có thể làm cuộc sống đơn điệu thêm phong phú."] },
    ],
    "hsk6-tongchoujiangu-1809": [
      { meaning: "lập kế hoạch tổng thể đồng thời tính đến mọi yếu tố/phía", examples: ["Lãnh đạo nên cân nhắc mọi phía."] },
    ],
    "hsk6-tuoyun-1837": [
      { meaning: "ký gửi hành lý", examples: ["Vali cần phải ký gửi."] },
      { meaning: "gửi vận chuyển", examples: ["Lô thuốc này cần được gửi vận chuyển bằng chuỗi lạnh."] },
    ],
    "hsk6-wanbei-1853": [
      { meaning: "hoàn chỉnh", examples: ["Bộ tài liệu này rất đầy đủ."] },
      { meaning: "được trang bị đầy đủ", examples: ["Bệnh viện này được trang bị đầy đủ."] },
      { meaning: "toàn diện", examples: ["Báo cáo cung cấp phân tích dữ liệu toàn diện."] },
    ],
    "hsk6-wenyi-1895": [
      { meaning: "văn học và nghệ thuật", examples: ["Nhà trường tổ chức một buổi biểu diễn văn nghệ."] },
      { meaning: "nghệ thuật", examples: ["Cô ấy học chuyên ngành quản lý nghệ thuật ở đại học."] },
      { meaning: "thuộc văn học/nghệ thuật", examples: ["Quán cà phê này có phong cách rất nghệ thuật."] },
    ],
    "hsk6-wuzhuang-1918": [
      { meaning: "lực lượng vũ trang", examples: ["Các binh sĩ đã trang bị vũ khí xong."] },
      { meaning: "vũ khí/trang bị", examples: ["Đội này thiếu vũ khí và trang bị cần thiết."] },
      { meaning: "vũ trang/trang bị", examples: ["Họ trang bị công nghệ mới cho đội cứu hộ."] },
    ],
    "hsk6-xietiao-1994": [
      { meaning: "điều phối", examples: ["Cách phối màu rất hài hòa."] },
      { meaning: "phối hợp nhịp nhàng", examples: ["Hoạt động của các bộ phận rất phối hợp nhịp nhàng."] },
      { meaning: "hài hòa", examples: ["Màu sắc của bức tranh này rất hài hòa."] },
    ],
    "hsk6-yayi-2080": [
      { meaning: "kìm nén/ức chế", examples: ["Anh ấy đã nói ra những cảm xúc bị kìm nén."] },
      { meaning: "ngột ngạt/áp bức", examples: ["Bầu không khí trong phòng họp rất ngột ngạt."] },
      { meaning: "chán nản/u uất", examples: ["Những thất bại liên tiếp khiến anh ấy rất chán nản."] },
    ],
    "hsk6-yanyi-2101": [
      { meaning: "suy diễn", examples: ["Diễn viên đã thể hiện cuộc sống của một người cao tuổi."] },
      { meaning: "diễn giải/khắc họa/biểu diễn", examples: ["Cô ấy diễn giải vai nữ chính rất tinh tế."] },
    ],
    "hsk6-yishi-2157": [
      { meaning: "ý thức/nhận thức", examples: ["Anh ấy nhận ra vấn đề rất nghiêm trọng."] },
      { meaning: "nhận ra/ý thức được", examples: ["Cuối cùng anh ấy nhận ra mức độ nghiêm trọng của vấn đề."] },
    ],
    "hsk6-yuanshi-2225": [
      { meaning: "nguyên bản", examples: ["Ở đây bảo tồn rừng nguyên sinh."] },
      { meaning: "nguyên thủy", examples: ["Trong làng vẫn còn giữ phương thức canh tác nguyên thủy."] },
      { meaning: "thời nguyên sinh", examples: ["Các nhà khoa học nghiên cứu hệ sinh thái rừng nguyên sinh."] },
    ],
    "hsk6-zha-2263": [
      { meaning: "buộc", examples: ["Y tá chích anh ấy một cái."] },
      { meaning: "châm/đâm", examples: ["Kim đâm vào ngón tay cô ấy đau nhói."] },
      { meaning: "cắm vào", examples: ["Anh ấy cắm hoa vào bình."] },
    ],
    "hsk6-zhe-2294": [
      { meaning: "gãy/nứt", examples: ["Anh ấy gấp bản đồ lại."] },
      { meaning: "gấp", examples: ["Cô ấy gấp lá thư lại rồi cho vào phong bì."] },
      { meaning: "giảm giá", examples: ["Hôm nay chiếc áo khoác này được giảm ba mươi phần trăm."] },
    ],
    "hsk6-zhineng-2376": [
      { meaning: "trí tuệ", examples: ["Điện thoại thông minh đã thay đổi cuộc sống."] },
      { meaning: "thông minh", examples: ["Anh ấy đã mua một chiếc tủ lạnh thông minh."] },
      { meaning: "AI", examples: ["AI đang thay đổi các dịch vụ y tế."] },
    ],
    "hsk6-zhuguan-2413": [
      { meaning: "người phụ trách/giám sát", examples: ["Ngày mai người phụ trách sẽ kiểm tra công việc."] },
      { meaning: "phụ trách", examples: ["Cô ấy phụ trách công việc tài chính của công ty."] },
    ],
    "hsk6-zhuanti-2432": [
      { meaning: "chủ đề/chuyên đề đặc biệt", examples: ["Hôm nay cuộc họp thảo luận về chuyên đề môi trường."] },
      { meaning: "chuyên mục", examples: ["Bản tin tối nay có chuyên mục về môi trường."] },
      { meaning: "theo chủ đề", examples: ["Bảo tàng đã mở một triển lãm chuyên đề."] },
    ],
    "hsk6-zitai-2461": [
      { meaning: "tư thế/dáng", examples: ["Cô ấy giữ một tư thế rất tốt."] },
      { meaning: "thái độ/lập trường", examples: ["Chính phủ giữ lập trường cởi mở đối với đàm phán."] },
    ],
  },
};
