export type Hsk4LocalizedSenseLanguage =
  | 'ar'
  | 'de'
  | 'es'
  | 'fr'
  | 'id'
  | 'ja'
  | 'ko'
  | 'pt-BR'
  | 'ru'
  | 'vi';

export type Hsk4LocalizedSenseTranslation = {
  meaning: string;
  note?: string;
  examples?: string[];
};

export const HSK4_LOCALIZED_SENSE_TRANSLATIONS: Record<
  Hsk4LocalizedSenseLanguage,
  Record<string, Hsk4LocalizedSenseTranslation[]>
> = {
  ar: {
    'hsk4-bang-7': [
      { meaning: 'ممتاز؛ رائع', examples: ['هذه الطريقة ممتازة.'] },
      { meaning: 'عصا؛ هراوة', examples: ['هو يمسك عصا في يده.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'يصب', examples: ['من فضلك صب بعض الماء.'] },
      { meaning: 'مقلوب؛ معكوس', examples: ['وُضعت هذه الصورة مقلوبة.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'يعمل كـ؛ يكون', examples: ['أن تكون معلما ليس أمرا سهلا.'] },
      { meaning: 'عندما؛ في الوقت الذي', examples: ['عندما وصلت إلى البيت، توقف المطر.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'ينتظر', examples: ['أنا أنتظرك في المدرسة.'] },
      { meaning: 'وما إلى ذلك؛ إلخ', examples: ['اشتريت تفاحا وعنبا وفواكه أخرى.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'نار', examples: ['هناك نار في المطبخ.'] },
      { meaning: 'رائج؛ مشهور جدا', examples: ['هذه الأغنية رائجة جدا مؤخرا.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'حصة دراسية؛ قسم', examples: ['هناك حصة واحدة اليوم.'] },
      { meaning: 'عيد؛ عطلة', examples: ['عيد الربيع عيد صيني مهم.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'حتى', examples: ['هو لم يشرب حتى الماء.'] },
      { meaning: 'يربط؛ يوصل', examples: ['من فضلك اربط هاتين الجملتين.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'يترك؛ يحتفظ بـ', examples: ['من فضلك اترك رقمك.'] },
      { meaning: 'يبقى', examples: ['يريد أن يبقى في بكين للعمل.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'شعر؛ فراء', examples: ['هناك شعر على هذه القطعة من الملابس.'] },
      { meaning: 'ماو؛ عُشر اليوان', examples: ['هذه التفاحة ثمنها خمسة ماو.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'يجب؛ احرص على أن', examples: ['يجب ألا تتأخر.'] },
      { meaning: 'عشرة ملايين', examples: ['ربحت هذه الشركة عشرة ملايين.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'مقاطعة', examples: ['أنا أعيش في هذه المقاطعة.'] },
      { meaning: 'يوفر؛ يقتصد', examples: ['فعل ذلك بهذه الطريقة يمكن أن يوفر الوقت.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'يجمع؛ يأخذ', examples: ['يجمع المعلم الواجبات.'] },
      { meaning: 'يتلقى؛ يستلم', examples: ['هل استلمت الرسالة؟'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'كلمة عد للآلات والأجهزة', examples: ['اشتريت حاسوبا.'] },
      { meaning: 'منصة؛ مسرح', examples: ['وقف الممثل على المسرح.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'يحمل باليد', examples: ['من فضلك احمل هذه الحقيبة.'] },
      { meaning: 'يذكر؛ يطرح', examples: ['طرح المعلم سؤالا.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'يجتاز؛ يمر عبر', examples: ['نجحت في الامتحان.'] },
      { meaning: 'بواسطة؛ من خلال', examples: ['نتواصل مع بعضنا عبر الإنترنت.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'في الأصل؛ سابقا', examples: ['كنت أعيش في الأصل في شنغهاي.'] },
      { meaning: 'اتضح أن؛ كما تبيّن', examples: ['إذن أنت هنا أيضا.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'يضيء؛ ينير', examples: ['تشرق الشمس على الطاولة.'] },
      { meaning: 'وفقا لـ؛ يتبع', examples: ['من فضلك افعل ذلك وفقا لهذه الطريقة.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'الأفضل', examples: ['هذه هي أفضل طريقة.'] },
      { meaning: 'من الأفضل أن؛ يستحسن أن', examples: ['من الأفضل أن ترتاح الآن.'] },
    ],
  },
  de: {
    'hsk4-bang-7': [
      { meaning: 'ausgezeichnet; großartig', examples: ['Diese Methode ist ausgezeichnet.'] },
      { meaning: 'Stock; Keule', examples: ['Er hält einen Stock in der Hand.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'gießen; einschenken', examples: ['Bitte gieß etwas Wasser ein.'] },
      { meaning: 'auf dem Kopf; umgekehrt', examples: ['Dieses Foto wurde verkehrt herum hingelegt.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'als etwas tätig sein; arbeiten als', examples: ['Lehrer zu sein ist nicht einfach.'] },
      { meaning: 'als; zu der Zeit, als', examples: ['Als ich nach Hause kam, hörte der Regen auf.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'warten', examples: ['Ich warte in der Schule auf dich.'] },
      { meaning: 'und so weiter; usw.', examples: ['Ich habe Äpfel, Trauben und anderes Obst gekauft.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'Feuer', examples: ['In der Küche ist Feuer.'] },
      { meaning: 'beliebt; angesagt', examples: ['Dieses Lied war in letzter Zeit sehr beliebt.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'Unterrichtsstunde; Abschnitt', examples: ['Heute gibt es eine Unterrichtsstunde.'] },
      { meaning: 'Fest; Feiertag', examples: ['Das Frühlingsfest ist ein wichtiger chinesischer Feiertag.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'sogar', examples: ['Er hat nicht einmal Wasser getrunken.'] },
      { meaning: 'verbinden; verknüpfen', examples: ['Bitte verbinde diese zwei Sätze.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'zurücklassen; behalten', examples: ['Bitte hinterlassen Sie Ihre Nummer.'] },
      { meaning: 'bleiben', examples: ['Er möchte in Peking bleiben, um zu arbeiten.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'Haar; Fell', examples: ['Auf diesem Kleidungsstück ist ein Haar.'] },
      { meaning: 'Mao; ein Zehntel Yuan', examples: ['Dieser Apfel kostet fünf Mao.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'unbedingt müssen; auf jeden Fall', examples: ['Du darfst auf keinen Fall zu spät kommen.'] },
      { meaning: 'zehn Millionen', examples: ['Diese Firma hat zehn Millionen verdient.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'Provinz', examples: ['Ich wohne in dieser Provinz.'] },
      { meaning: 'sparen; einsparen', examples: ['Wenn man es so macht, kann man Zeit sparen.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'einsammeln; sammeln', examples: ['Der Lehrer sammelt die Hausaufgaben ein.'] },
      { meaning: 'erhalten; bekommen', examples: ['Hast du den Brief erhalten?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'Zähleinheitswort für Maschinen und Geräte', examples: ['Ich habe einen Computer gekauft.'] },
      { meaning: 'Plattform; Bühne', examples: ['Der Schauspieler stand auf der Bühne.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'mit der Hand tragen', examples: ['Bitte trag diese Tasche.'] },
      { meaning: 'erwähnen; zur Sprache bringen', examples: ['Der Lehrer stellte eine Frage.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'bestehen; hindurchgehen', examples: ['Ich habe die Prüfung bestanden.'] },
      { meaning: 'mittels; durch', examples: ['Wir kontaktieren einander über das Internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'ursprünglich; früher', examples: ['Ich habe ursprünglich in Shanghai gewohnt.'] },
      { meaning: 'also doch; wie sich herausstellt', examples: ['Du bist also auch hier.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'scheinen; beleuchten', examples: ['Die Sonne scheint auf den Tisch.'] },
      { meaning: 'gemäß; nach', examples: ['Bitte mach es nach dieser Methode.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'am besten; der/die/das Beste', examples: ['Das ist die beste Methode.'] },
      { meaning: 'sollte am besten; es wäre am besten zu', examples: ['Du solltest dich jetzt am besten ausruhen.'] },
    ],
  },
  es: {
    'hsk4-bang-7': [
      { meaning: 'excelente; genial', examples: ['Este método es excelente.'] },
      { meaning: 'palo; garrote', examples: ['Él tiene un palo en la mano.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'verter; servir', examples: ['Por favor, sirve un poco de agua.'] },
      { meaning: 'boca abajo; invertido', examples: ['Esta foto fue puesta boca abajo.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'hacer de; trabajar como', examples: ['Ser profesor no es fácil.'] },
      { meaning: 'cuando; en el momento en que', examples: ['Cuando llegué a casa, dejó de llover.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'esperar', examples: ['Te estoy esperando en la escuela.'] },
      { meaning: 'etcétera; y demás', examples: ['Compré manzanas, uvas y otras frutas.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'fuego', examples: ['Hay fuego en la cocina.'] },
      { meaning: 'popular; de moda', examples: ['Esta canción ha sido muy popular últimamente.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'clase; sección', examples: ['Hoy hay una clase.'] },
      { meaning: 'festival; día festivo', examples: ['La Fiesta de la Primavera es una festividad china importante.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'incluso', examples: ['Él ni siquiera bebió agua.'] },
      { meaning: 'conectar; unir', examples: ['Por favor, conecta estas dos frases.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'dejar; conservar', examples: ['Por favor, deja tu número.'] },
      { meaning: 'quedarse', examples: ['Él quiere quedarse en Pekín para trabajar.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'pelo; pelaje', examples: ['Hay pelo en esta prenda de ropa.'] },
      { meaning: 'mao; una décima parte de un yuan', examples: ['Esta manzana cuesta cinco mao.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'deber; asegurarse de', examples: ['No debes llegar tarde.'] },
      { meaning: 'diez millones', examples: ['Esta empresa ganó diez millones.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'provincia', examples: ['Vivo en esta provincia.'] },
      { meaning: 'ahorrar; economizar', examples: ['Hacerlo de esta manera puede ahorrar tiempo.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'recoger; reunir', examples: ['El profesor recoge los deberes.'] },
      { meaning: 'recibir', examples: ['¿Recibiste la carta?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'clasificador para máquinas y aparatos', examples: ['Compré una computadora.'] },
      { meaning: 'plataforma; escenario', examples: ['El actor estaba de pie en el escenario.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'llevar en la mano', examples: ['Por favor, lleva esta bolsa.'] },
      { meaning: 'mencionar; sacar un tema', examples: ['El profesor planteó una pregunta.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'aprobar; pasar por', examples: ['Aprobé el examen.'] },
      { meaning: 'por medio de; a través de', examples: ['Nos contactamos a través de internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'originalmente; antes', examples: ['Originalmente vivía en Shanghái.'] },
      { meaning: 'así que resulta que; resulta que', examples: ['Así que tú también estás aquí.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'brillar; iluminar', examples: ['El sol brilla sobre la mesa.'] },
      { meaning: 'según; seguir', examples: ['Por favor, hazlo según este método.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'mejor; el mejor', examples: ['Este es el mejor método.'] },
      { meaning: 'sería mejor; más vale', examples: ['Será mejor que descanses ahora.'] },
    ],
  },
  fr: {
    'hsk4-bang-7': [
      { meaning: 'excellent; super', examples: ['Cette méthode est excellente.'] },
      { meaning: 'bâton; massue', examples: ['Il tient un bâton dans la main.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'verser', examples: ['Verse un peu d’eau, s’il te plaît.'] },
      { meaning: 'à l’envers; inversé', examples: ['Cette photo a été placée à l’envers.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'agir comme; travailler comme', examples: ['Être professeur n’est pas facile.'] },
      { meaning: 'quand; au moment où', examples: ['Quand je suis rentré chez moi, la pluie s’est arrêtée.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'attendre', examples: ['Je t’attends à l’école.'] },
      { meaning: 'et ainsi de suite; etc.', examples: ['J’ai acheté des pommes, des raisins et d’autres fruits.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'feu', examples: ['Il y a du feu dans la cuisine.'] },
      { meaning: 'populaire; à la mode', examples: ['Cette chanson est devenue très populaire récemment.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'heure de cours; section', examples: ['Il y a un cours aujourd’hui.'] },
      { meaning: 'fête; jour férié', examples: ['La fête du Printemps est une fête chinoise importante.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'même', examples: ['Il n’a même pas bu d’eau.'] },
      { meaning: 'connecter; relier', examples: ['Relie ces deux phrases, s’il te plaît.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'laisser; garder', examples: ['Laisse ton numéro, s’il te plaît.'] },
      { meaning: 'rester', examples: ['Il veut rester à Pékin pour travailler.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'cheveu; poil', examples: ['Il y a un poil sur ce vêtement.'] },
      { meaning: 'mao; un dixième de yuan', examples: ['Cette pomme coûte cinq mao.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'devoir absolument; surtout', examples: ['Tu ne dois surtout pas être en retard.'] },
      { meaning: 'dix millions', examples: ['Cette entreprise a gagné dix millions.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'province', examples: ['J’habite dans cette province.'] },
      { meaning: 'économiser; épargner', examples: ['Faire comme cela peut faire gagner du temps.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'ramasser; collecter', examples: ['Le professeur ramasse les devoirs.'] },
      { meaning: 'recevoir', examples: ['As-tu reçu la lettre ?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'classificateur pour machines et appareils', examples: ['J’ai acheté un ordinateur.'] },
      { meaning: 'plateforme; scène', examples: ['L’acteur se tenait sur scène.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'porter à la main', examples: ['Porte ce sac, s’il te plaît.'] },
      { meaning: 'mentionner; soulever', examples: ['Le professeur a posé une question.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'réussir; passer par', examples: ['J’ai réussi l’examen.'] },
      { meaning: 'au moyen de; par', examples: ['Nous nous contactons par internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'à l’origine; autrefois', examples: ['À l’origine, j’habitais à Shanghai.'] },
      { meaning: 'il s’avère que; donc', examples: ['Donc toi aussi tu es ici.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'briller; éclairer', examples: ['Le soleil brille sur la table.'] },
      { meaning: 'selon; suivre', examples: ['Fais-le selon cette méthode, s’il te plaît.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'meilleur; le mieux', examples: ['C’est la meilleure méthode.'] },
      { meaning: 'il vaut mieux; ce serait mieux de', examples: ['Tu ferais mieux de te reposer maintenant.'] },
    ],
  },
  id: {
    'hsk4-bang-7': [
      { meaning: 'unggul; sangat bagus', examples: ['Metode ini sangat bagus.'] },
      { meaning: 'tongkat; pentungan', examples: ['Dia memegang tongkat di tangannya.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'menuang', examples: ['Tolong tuangkan sedikit air.'] },
      { meaning: 'terbalik; kebalik', examples: ['Foto ini diletakkan terbalik.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'menjadi; bekerja sebagai', examples: ['Menjadi guru tidak mudah.'] },
      { meaning: 'ketika; pada saat', examples: ['Ketika saya sampai di rumah, hujan berhenti.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'menunggu', examples: ['Saya menunggumu di sekolah.'] },
      { meaning: 'dan sebagainya; dll.', examples: ['Saya membeli apel, anggur, dan buah-buahan lainnya.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'api', examples: ['Ada api di dapur.'] },
      { meaning: 'populer; sedang tren', examples: ['Lagu ini sangat populer belakangan ini.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'jam pelajaran; bagian', examples: ['Hari ini ada satu jam pelajaran.'] },
      { meaning: 'festival; hari libur', examples: ['Festival Musim Semi adalah hari libur penting di Tiongkok.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'bahkan', examples: ['Dia bahkan tidak minum air.'] },
      { meaning: 'menghubungkan; menyambung', examples: ['Tolong hubungkan dua kalimat ini.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'meninggalkan; menyimpan', examples: ['Tolong tinggalkan nomor Anda.'] },
      { meaning: 'tinggal; menetap', examples: ['Dia ingin tinggal di Beijing untuk bekerja.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'rambut; bulu', examples: ['Ada rambut pada pakaian ini.'] },
      { meaning: 'mao; sepersepuluh yuan', examples: ['Apel ini harganya lima mao.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'harus; pastikan untuk', examples: ['Kamu tidak boleh terlambat.'] },
      { meaning: 'sepuluh juta', examples: ['Perusahaan ini menghasilkan sepuluh juta.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'provinsi', examples: ['Saya tinggal di provinsi ini.'] },
      { meaning: 'menghemat', examples: ['Melakukan dengan cara ini bisa menghemat waktu.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'mengumpulkan', examples: ['Guru mengumpulkan pekerjaan rumah.'] },
      { meaning: 'menerima', examples: ['Apakah kamu menerima surat itu?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'kata bantu bilangan untuk mesin dan perangkat', examples: ['Saya membeli sebuah komputer.'] },
      { meaning: 'panggung; platform', examples: ['Aktor itu berdiri di atas panggung.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'membawa dengan tangan', examples: ['Tolong bawa tas ini.'] },
      { meaning: 'menyebutkan; mengajukan', examples: ['Guru mengajukan sebuah pertanyaan.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'lulus; melewati', examples: ['Saya lulus ujian.'] },
      { meaning: 'melalui; dengan cara', examples: ['Kami saling menghubungi melalui internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'awalnya; dahulu', examples: ['Awalnya saya tinggal di Shanghai.'] },
      { meaning: 'ternyata; rupanya', examples: ['Ternyata kamu juga ada di sini.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'menyinari; menerangi', examples: ['Matahari menyinari meja.'] },
      { meaning: 'menurut; mengikuti', examples: ['Tolong lakukan sesuai metode ini.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'terbaik', examples: ['Ini adalah metode terbaik.'] },
      { meaning: 'sebaiknya; lebih baik', examples: ['Sebaiknya kamu istirahat sekarang.'] },
    ],
  },
  ja: {
    'hsk4-bang-7': [
      { meaning: 'すばらしい；とても良い', examples: ['この方法はすばらしいです。'] },
      { meaning: '棒；こん棒', examples: ['彼は手に棒を持っています。'] },
    ],
    'hsk4-dao-80': [
      { meaning: '注ぐ', examples: ['水を少し注いでください。'] },
      { meaning: '逆さま；反対向き', examples: ['この写真は逆さまに置かれていました。'] },
    ],
    'hsk4-dang-76': [
      { meaning: '〜になる；〜として働く', examples: ['先生になるのは簡単ではありません。'] },
      { meaning: '〜の時；〜した時', examples: ['私が家に着いた時、雨は止みました。'] },
    ],
    'hsk4-deng-88': [
      { meaning: '待つ', examples: ['私は学校であなたを待っています。'] },
      { meaning: '〜など；等', examples: ['私はりんご、ぶどうなどの果物を買いました。'] },
    ],
    'hsk4-huo-184': [
      { meaning: '火', examples: ['台所に火があります。'] },
      { meaning: '人気がある；流行している', examples: ['この歌は最近とても人気があります。'] },
    ],
    'hsk4-jie-222': [
      { meaning: '授業の時間；区切り', examples: ['今日は授業が一つあります。'] },
      { meaning: '祭り；祝日', examples: ['春節は中国の重要な祝日です。'] },
    ],
    'hsk4-lian-286': [
      { meaning: '〜さえ；〜でも', examples: ['彼は水さえ飲みませんでした。'] },
      { meaning: 'つなぐ；結びつける', examples: ['この二つの文をつないでください。'] },
    ],
    'hsk4-liu-291': [
      { meaning: '残す；取っておく', examples: ['あなたの番号を残してください。'] },
      { meaning: '滞在する；残る', examples: ['彼は北京に残って働きたいです。'] },
    ],
    'hsk4-mao-300': [
      { meaning: '髪；毛', examples: ['この服に毛がついています。'] },
      { meaning: '毛；1元の10分の1', examples: ['このりんごは5毛です。'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: '必ず；ぜひ', examples: ['絶対に遅刻してはいけません。'] },
      { meaning: '一千万', examples: ['この会社は一千万稼ぎました。'] },
    ],
    'hsk4-sheng-378': [
      { meaning: '省', examples: ['私はこの省に住んでいます。'] },
      { meaning: '節約する；省く', examples: ['このようにすると時間を節約できます。'] },
    ],
    'hsk4-shou-392': [
      { meaning: '集める；回収する', examples: ['先生は宿題を集めます。'] },
      { meaning: '受け取る', examples: ['手紙を受け取りましたか。'] },
    ],
    'hsk4-tai-418': [
      { meaning: '機械や機器を数える量詞', examples: ['私はコンピューターを一台買いました。'] },
      { meaning: '台；舞台', examples: ['俳優は舞台に立っていました。'] },
    ],
    'hsk4-ti-430': [
      { meaning: '手に提げる', examples: ['このかばんを持ってください。'] },
      { meaning: '言及する；取り上げる', examples: ['先生は質問を出しました。'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: '合格する；通過する', examples: ['私は試験に合格しました。'] },
      { meaning: '〜を通して；〜によって', examples: ['私たちはインターネットを通して連絡します。'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'もともと；以前は', examples: ['私はもともと上海に住んでいました。'] },
      { meaning: 'なるほど；そうだったのか', examples: ['なるほど、あなたもここにいたのですね。'] },
    ],
    'hsk4-zhao-555': [
      { meaning: '照らす；光が当たる', examples: ['太陽が机を照らしています。'] },
      { meaning: '〜に従って；〜の通りに', examples: ['この方法に従ってやってください。'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: '最も良い；一番良い', examples: ['これは一番良い方法です。'] },
      { meaning: '〜したほうがよい；〜するのが一番よい', examples: ['あなたは今休んだほうがよいです。'] },
    ],
  },
  ko: {
    'hsk4-bang-7': [
      { meaning: '훌륭하다; 아주 좋다', examples: ['이 방법은 훌륭합니다.'] },
      { meaning: '막대기; 곤봉', examples: ['그는 손에 막대기를 들고 있습니다.'] },
    ],
    'hsk4-dao-80': [
      { meaning: '따르다; 붓다', examples: ['물을 좀 따라 주세요.'] },
      { meaning: '거꾸로; 뒤집힌', examples: ['이 사진은 거꾸로 놓였습니다.'] },
    ],
    'hsk4-dang-76': [
      { meaning: '~이 되다; ~로 일하다', examples: ['선생님이 되는 것은 쉽지 않습니다.'] },
      { meaning: '~할 때', examples: ['내가 집에 도착했을 때 비가 그쳤습니다.'] },
    ],
    'hsk4-deng-88': [
      { meaning: '기다리다', examples: ['나는 학교에서 당신을 기다리고 있습니다.'] },
      { meaning: '등; 기타', examples: ['나는 사과, 포도 등 과일을 샀습니다.'] },
    ],
    'hsk4-huo-184': [
      { meaning: '불', examples: ['부엌에 불이 있습니다.'] },
      { meaning: '인기가 많다; 유행하다', examples: ['이 노래는 최근에 매우 인기가 많습니다.'] },
    ],
    'hsk4-jie-222': [
      { meaning: '수업 시간; 구간', examples: ['오늘은 수업이 한 시간 있습니다.'] },
      { meaning: '명절; 휴일', examples: ['춘절은 중국의 중요한 명절입니다.'] },
    ],
    'hsk4-lian-286': [
      { meaning: '~조차; ~까지도', examples: ['그는 물조차 마시지 않았습니다.'] },
      { meaning: '연결하다; 잇다', examples: ['이 두 문장을 연결해 주세요.'] },
    ],
    'hsk4-liu-291': [
      { meaning: '남기다; 보관하다', examples: ['번호를 남겨 주세요.'] },
      { meaning: '머무르다; 남다', examples: ['그는 베이징에 남아 일하고 싶어 합니다.'] },
    ],
    'hsk4-mao-300': [
      { meaning: '머리카락; 털', examples: ['이 옷에 털이 있습니다.'] },
      { meaning: '마오; 1위안의 10분의 1', examples: ['이 사과는 5마오입니다.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: '반드시; 꼭', examples: ['당신은 절대 늦으면 안 됩니다.'] },
      { meaning: '천만', examples: ['이 회사는 천만을 벌었습니다.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: '성; 지방 행정구역', examples: ['나는 이 성에 삽니다.'] },
      { meaning: '절약하다; 아끼다', examples: ['이렇게 하면 시간을 절약할 수 있습니다.'] },
    ],
    'hsk4-shou-392': [
      { meaning: '거두다; 모으다', examples: ['선생님이 숙제를 걷습니다.'] },
      { meaning: '받다', examples: ['편지를 받았습니까?'] },
    ],
    'hsk4-tai-418': [
      { meaning: '기계나 기기를 세는 양사', examples: ['나는 컴퓨터 한 대를 샀습니다.'] },
      { meaning: '플랫폼; 무대', examples: ['배우가 무대에 서 있었습니다.'] },
    ],
    'hsk4-ti-430': [
      { meaning: '손에 들다', examples: ['이 가방을 들어 주세요.'] },
      { meaning: '언급하다; 제기하다', examples: ['선생님이 질문을 제기했습니다.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: '통과하다; 합격하다', examples: ['나는 시험에 합격했습니다.'] },
      { meaning: '~을 통해; ~로', examples: ['우리는 인터넷을 통해 서로 연락합니다.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: '원래; 예전에는', examples: ['나는 원래 상하이에 살았습니다.'] },
      { meaning: '알고 보니; 그렇구나', examples: ['알고 보니 당신도 여기 있었군요.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: '비추다; 밝히다', examples: ['햇빛이 탁자를 비춥니다.'] },
      { meaning: '~에 따라; 그대로 하다', examples: ['이 방법대로 해 주세요.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: '가장 좋다; 최고', examples: ['이것은 가장 좋은 방법입니다.'] },
      { meaning: '~하는 것이 좋다', examples: ['당신은 지금 쉬는 것이 좋습니다.'] },
    ],
  },
  'pt-BR': {
    'hsk4-bang-7': [
      { meaning: 'excelente; ótimo', examples: ['Este método é excelente.'] },
      { meaning: 'bastão; vara', examples: ['Ele está segurando um bastão na mão.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'despejar; servir', examples: ['Por favor, sirva um pouco de água.'] },
      { meaning: 'de cabeça para baixo; invertido', examples: ['Esta foto foi colocada de cabeça para baixo.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'atuar como; trabalhar como', examples: ['Ser professor não é fácil.'] },
      { meaning: 'quando; no momento em que', examples: ['Quando cheguei em casa, a chuva parou.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'esperar', examples: ['Estou esperando você na escola.'] },
      { meaning: 'e assim por diante; etc.', examples: ['Comprei maçãs, uvas e outras frutas.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'fogo', examples: ['Há fogo na cozinha.'] },
      { meaning: 'popular; em alta', examples: ['Esta música tem sido muito popular recentemente.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'aula; seção', examples: ['Há uma aula hoje.'] },
      { meaning: 'festival; feriado', examples: ['O Festival da Primavera é um feriado chinês importante.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'até; até mesmo', examples: ['Ele nem bebeu água.'] },
      { meaning: 'conectar; ligar', examples: ['Por favor, conecte estas duas frases.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'deixar; manter', examples: ['Por favor, deixe seu número.'] },
      { meaning: 'ficar', examples: ['Ele quer ficar em Pequim para trabalhar.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'cabelo; pelo', examples: ['Há cabelo nesta peça de roupa.'] },
      { meaning: 'mao; um décimo de yuan', examples: ['Esta maçã custa cinco mao.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'dever; certificar-se de', examples: ['Você não deve se atrasar de jeito nenhum.'] },
      { meaning: 'dez milhões', examples: ['Esta empresa ganhou dez milhões.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'província', examples: ['Eu moro nesta província.'] },
      { meaning: 'economizar; poupar', examples: ['Fazer desse jeito pode economizar tempo.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'recolher; juntar', examples: ['O professor recolhe a lição de casa.'] },
      { meaning: 'receber', examples: ['Você recebeu a carta?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'classificador para máquinas e aparelhos', examples: ['Comprei um computador.'] },
      { meaning: 'plataforma; palco', examples: ['O ator ficou de pé no palco.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'carregar na mão', examples: ['Por favor, carregue esta bolsa.'] },
      { meaning: 'mencionar; levantar', examples: ['O professor levantou uma questão.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'passar; passar por', examples: ['Passei no exame.'] },
      { meaning: 'por meio de; através de', examples: ['Nós nos contatamos pela internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'originalmente; antes', examples: ['Originalmente, eu morava em Xangai.'] },
      { meaning: 'então quer dizer; pelo visto', examples: ['Então você também está aqui.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'brilhar; iluminar', examples: ['O sol brilha sobre a mesa.'] },
      { meaning: 'de acordo com; seguir', examples: ['Por favor, faça de acordo com este método.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'melhor; o melhor', examples: ['Este é o melhor método.'] },
      { meaning: 'seria melhor; é melhor', examples: ['É melhor você descansar agora.'] },
    ],
  },
  ru: {
    'hsk4-bang-7': [
      { meaning: 'отличный; замечательный', examples: ['Этот способ отличный.'] },
      { meaning: 'палка; дубинка', examples: ['Он держит в руке палку.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'наливать', examples: ['Пожалуйста, налейте немного воды.'] },
      { meaning: 'вверх ногами; перевернутый', examples: ['Эту фотографию положили вверх ногами.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'быть; работать кем-либо', examples: ['Быть учителем нелегко.'] },
      { meaning: 'когда; в то время как', examples: ['Когда я пришел домой, дождь прекратился.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'ждать', examples: ['Я жду тебя в школе.'] },
      { meaning: 'и так далее; и прочее', examples: ['Я купил яблоки, виноград и другие фрукты.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'огонь', examples: ['На кухне огонь.'] },
      { meaning: 'популярный; горячий', examples: ['Эта песня в последнее время очень популярна.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'урок; часть', examples: ['Сегодня один урок.'] },
      { meaning: 'праздник; выходной', examples: ['Праздник весны - важный китайский праздник.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'даже', examples: ['Он даже не пил воду.'] },
      { meaning: 'соединять; связывать', examples: ['Пожалуйста, соедините эти два предложения.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'оставлять; сохранять', examples: ['Пожалуйста, оставьте свой номер.'] },
      { meaning: 'оставаться', examples: ['Он хочет остаться в Пекине работать.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'волосы; шерсть', examples: ['На этой одежде есть волосы.'] },
      { meaning: 'мао; одна десятая юаня', examples: ['Это яблоко стоит пять мао.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'обязательно; непременно', examples: ['Ты ни в коем случае не должен опаздывать.'] },
      { meaning: 'десять миллионов', examples: ['Эта компания заработала десять миллионов.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'провинция', examples: ['Я живу в этой провинции.'] },
      { meaning: 'экономить; сберегать', examples: ['Так можно сэкономить время.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'собирать; принимать', examples: ['Учитель собирает домашние задания.'] },
      { meaning: 'получать', examples: ['Ты получил письмо?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'счетное слово для машин и устройств', examples: ['Я купил компьютер.'] },
      { meaning: 'платформа; сцена', examples: ['Актер стоял на сцене.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'нести в руке', examples: ['Пожалуйста, понеси эту сумку.'] },
      { meaning: 'упоминать; поднимать вопрос', examples: ['Учитель задал вопрос.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'пройти; проходить через', examples: ['Я сдал экзамен.'] },
      { meaning: 'посредством; через', examples: ['Мы связываемся друг с другом через интернет.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'изначально; раньше', examples: ['Изначально я жил в Шанхае.'] },
      { meaning: 'оказывается; как выяснилось', examples: ['Так ты тоже здесь.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'светить; освещать', examples: ['Солнце светит на стол.'] },
      { meaning: 'согласно; следовать', examples: ['Пожалуйста, сделайте это согласно этому способу.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'лучший', examples: ['Это лучший способ.'] },
      { meaning: 'лучше бы; было бы лучше', examples: ['Тебе лучше сейчас отдохнуть.'] },
    ],
  },
  vi: {
    'hsk4-bang-7': [
      { meaning: 'xuất sắc; rất tốt', examples: ['Phương pháp này rất tốt.'] },
      { meaning: 'cây gậy; dùi cui', examples: ['Anh ấy đang cầm một cây gậy trong tay.'] },
    ],
    'hsk4-dao-80': [
      { meaning: 'rót; đổ', examples: ['Vui lòng rót một ít nước.'] },
      { meaning: 'lộn ngược; bị đảo ngược', examples: ['Bức ảnh này bị đặt lộn ngược.'] },
    ],
    'hsk4-dang-76': [
      { meaning: 'làm; đảm nhận vai trò', examples: ['Làm giáo viên không dễ.'] },
      { meaning: 'khi; vào lúc', examples: ['Khi tôi về đến nhà, mưa đã tạnh.'] },
    ],
    'hsk4-deng-88': [
      { meaning: 'đợi; chờ', examples: ['Tôi đang đợi bạn ở trường.'] },
      { meaning: 'vân vân; v.v.', examples: ['Tôi đã mua táo, nho và các loại trái cây khác.'] },
    ],
    'hsk4-huo-184': [
      { meaning: 'lửa', examples: ['Có lửa trong nhà bếp.'] },
      { meaning: 'nổi tiếng; đang hot', examples: ['Bài hát này gần đây rất nổi tiếng.'] },
    ],
    'hsk4-jie-222': [
      { meaning: 'tiết học; phần', examples: ['Hôm nay có một tiết học.'] },
      { meaning: 'lễ hội; ngày lễ', examples: ['Tết Xuân là một ngày lễ quan trọng của Trung Quốc.'] },
    ],
    'hsk4-lian-286': [
      { meaning: 'ngay cả; đến cả', examples: ['Anh ấy thậm chí không uống nước.'] },
      { meaning: 'nối; liên kết', examples: ['Vui lòng nối hai câu này lại.'] },
    ],
    'hsk4-liu-291': [
      { meaning: 'để lại; giữ lại', examples: ['Vui lòng để lại số của bạn.'] },
      { meaning: 'ở lại', examples: ['Anh ấy muốn ở lại Bắc Kinh để làm việc.'] },
    ],
    'hsk4-mao-300': [
      { meaning: 'tóc; lông', examples: ['Có lông trên bộ quần áo này.'] },
      { meaning: 'hào; một phần mười nhân dân tệ', examples: ['Quả táo này giá năm hào.'] },
    ],
    'hsk4-qian-wan-339': [
      { meaning: 'nhất định phải; nhớ phải', examples: ['Bạn nhất định không được đến muộn.'] },
      { meaning: 'mười triệu', examples: ['Công ty này kiếm được mười triệu.'] },
    ],
    'hsk4-sheng-378': [
      { meaning: 'tỉnh', examples: ['Tôi sống ở tỉnh này.'] },
      { meaning: 'tiết kiệm', examples: ['Làm như vậy có thể tiết kiệm thời gian.'] },
    ],
    'hsk4-shou-392': [
      { meaning: 'thu; gom lại', examples: ['Giáo viên thu bài tập về nhà.'] },
      { meaning: 'nhận', examples: ['Bạn đã nhận được thư chưa?'] },
    ],
    'hsk4-tai-418': [
      { meaning: 'lượng từ cho máy móc và thiết bị', examples: ['Tôi đã mua một chiếc máy tính.'] },
      { meaning: 'sân khấu; bục', examples: ['Diễn viên đứng trên sân khấu.'] },
    ],
    'hsk4-ti-430': [
      { meaning: 'xách bằng tay', examples: ['Vui lòng xách cái túi này.'] },
      { meaning: 'nhắc đến; nêu ra', examples: ['Giáo viên nêu ra một câu hỏi.'] },
    ],
    'hsk4-tong-guo-438': [
      { meaning: 'vượt qua; thông qua', examples: ['Tôi đã vượt qua kỳ thi.'] },
      { meaning: 'thông qua; bằng cách', examples: ['Chúng tôi liên lạc với nhau qua internet.'] },
    ],
    'hsk4-yuan-lai-540': [
      { meaning: 'ban đầu; trước đây', examples: ['Ban đầu tôi sống ở Thượng Hải.'] },
      { meaning: 'hóa ra; thì ra là', examples: ['Thì ra bạn cũng ở đây.'] },
    ],
    'hsk4-zhao-555': [
      { meaning: 'chiếu sáng; soi', examples: ['Mặt trời chiếu lên bàn.'] },
      { meaning: 'theo; làm theo', examples: ['Vui lòng làm theo phương pháp này.'] },
    ],
    'hsk4-zui-hao-593': [
      { meaning: 'tốt nhất', examples: ['Đây là phương pháp tốt nhất.'] },
      { meaning: 'tốt nhất nên; nên', examples: ['Bây giờ bạn nên nghỉ ngơi.'] },
    ],
  },
};
