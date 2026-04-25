// ───────────────────────────────────────────────────────────────────
// أكاديمية التسويق — قاعدة بيانات الوحدات والدروس والفيديوهات والقوالب
// ───────────────────────────────────────────────────────────────────

export type Tool = { name: string; url: string; desc: string };
export type Video = { id: string; title: string; summary: string };
export type Template = {
  id: string;
  title: string;
  category: string;
  desc: string;
  body: string; // محتوى نصي قابل للتنزيل
};
export type Lesson = {
  id: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  apply?: string; // خطوة تطبيقية
};
export type CaseStudy = {
  id: string;
  title: string;
  before: string;
  after: string;
  strategy: string;
  duration: string;
  color: string;
};
export type Module = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;          // اسم الأيقونة (SVG في components/Icons)
  accent: string;        // tailwind text color
  bg: string;            // tailwind bg class
  border: string;        // tailwind border class
  ring: string;          // tailwind ring/glow color
  lessons: Lesson[];
  videos: Video[];
  templates: Template[];
  tools: Tool[];
};

// استخراج YouTube ID
export const ytId = (url: string) => {
  const m = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : url;
};

// ────────────────── القوالب الجاهزة (مشتركة) ──────────────────
export const TEMPLATES: Template[] = [
  {
    id: "tpl-landing",
    title: "نموذج صفحة هبوط",
    category: "صفحات",
    desc: "هيكل صفحة هبوط عالية التحويل مع كل العناصر الأساسية",
    body:
`# نموذج صفحة هبوط عالية التحويل

## 1) العنوان الرئيسي (Headline)
- صيغة: [النتيجة المرغوبة] خلال [وقت محدد] بدون [ألم شائع]
- مثال: ضاعف عملاءك خلال 30 يوم بدون ميزانية إعلانات

## 2) العنوان الفرعي (Subheadline)
- وضّح "كيف" بجملة واحدة + اذكر الجمهور.

## 3) الـ Hero Visual
- صورة منتج / فيديو 30 ثانية / Mockup.

## 4) Social Proof فوري
- شعارات عملاء / عدد مستخدمين / تقييم نجوم.

## 5) المشكلة (Pain)
- 3 نقاط ألم يعيشها العميل اليوم.

## 6) الحل (Solution)
- 3 ركائز للمنتج/الخدمة.

## 7) كيف يعمل (3 خطوات)
- الخطوة 1 → الخطوة 2 → الخطوة 3.

## 8) الفوائد (Benefits) — وليس الميزات
- ركّز على "ماذا سيحصل عليه" لا "ما الذي بنيناه".

## 9) شهادات (Testimonials)
- نص + اسم + صورة + نتيجة رقمية.

## 10) تسعير شفّاف
- ابرز الباقة الموصى بها.

## 11) أسئلة شائعة (FAQ)
- 5–7 أسئلة تحطّم الاعتراضات الشائعة.

## 12) CTA نهائي + ضمان
- زر واضح + ضمان استرداد + ندرة حقيقية.`
  },
  {
    id: "tpl-content-cal",
    title: "تقويم المحتوى الأسبوعي",
    category: "محتوى",
    desc: "جدول أسبوعي جاهز لتخطيط محتوى 7 أيام",
    body:
`# تقويم محتوى أسبوعي (Hook → Value → CTA)

| اليوم | المنصة | نوع المحتوى | الـ Hook | الـ CTA |
|------|--------|-------------|---------|--------|
| السبت | Instagram Reel | تعليمي | "3 أخطاء تكلّفك عملاء" | احفظ المنشور |
| الأحد | LinkedIn | قصة شخصية | "في 2022 خسرت..." | شاركني تجربتك |
| الاثنين | TikTok | Hack سريع | "الأداة التي غيّرت..." | تابع للمزيد |
| الثلاثاء | X / Twitter | Thread | "خيط: كيف تبني..." | احفظ الخيط |
| الأربعاء | YouTube Short | Before/After | "من 0 إلى 10K..." | اشترك |
| الخميس | Instagram Carousel | إطار عمل | "إطار 4P للمحتوى" | احفظ + شارك |
| الجمعة | Newsletter | تعميق | عنوان فضولي | كليك على الرابط |
`
  },
  {
    id: "tpl-email-welcome",
    title: "سلسلة البريد الترحيبية",
    category: "بريد",
    desc: "5 رسائل بريدية جاهزة للتعديل والإرسال",
    body:
`# سلسلة ترحيبية من 5 رسائل (Welcome Sequence)

## رسالة 1 — اليوم 0 (الترحيب الفوري)
- العنوان: "وصلتك الهدية ✨ + ماذا تتوقع منّي"
- المحتوى: قدّم نفسك بثلاث جمل، سلّم الهدية، حدّد التوقعات.

## رسالة 2 — اليوم 1 (القصة)
- العنوان: "لماذا بدأت هذا المشروع؟"
- المحتوى: قصة شخصية + درس مستفاد + علاقة بمشكلة العميل.

## رسالة 3 — اليوم 3 (القيمة الكبرى)
- العنوان: "إطار العمل الذي استخدمه يومياً"
- المحتوى: درس عملي قابل للتطبيق فوراً.

## رسالة 4 — اليوم 5 (Social Proof)
- العنوان: "كيف حقق [اسم العميل] نتيجة X؟"
- المحتوى: دراسة حالة قصيرة + رابط للقراءة.

## رسالة 5 — اليوم 7 (العرض)
- العنوان: "هل أنت جاهز للخطوة التالية؟"
- المحتوى: العرض + سعر + ندرة + CTA واحد.`
  },
  {
    id: "tpl-meta-ads",
    title: "هيكل حملة Meta Ads",
    category: "إعلانات",
    desc: "قالب إعداد الحملة الإعلانية على فيسبوك وإنستغرام",
    body:
`# هيكل حملة Meta Ads (Campaign → Ad Set → Ad)

## مستوى الحملة (Campaign)
- الهدف: Conversions / Leads / Traffic
- نوع الميزانية: CBO (Campaign Budget Optimization)

## مستوى المجموعة الإعلانية (Ad Set)
- الجمهور 1: Lookalike 1% من Purchasers
- الجمهور 2: Interests واسعة (Broad)
- الجمهور 3: Retargeting زوار الموقع 30 يوم
- المواضع: Advantage+ Placements
- التحسين: لحدث Purchase / Lead

## مستوى الإعلان (Ad)
- 3 إبداعات لكل مجموعة:
  - فيديو UGC (15–30 ث)
  - صورة Static مع نص قوي
  - Carousel 5 شرائح Before/After

## الميزانية المقترحة للبداية
- $20–$50 يومياً لكل Ad Set
- مرحلة Testing: 7 أيام
- مرحلة Scaling: ضاعف الميزانية 20% كل 3 أيام عند ROAS > 2`
  },
  {
    id: "tpl-competitor",
    title: "تقرير تحليل المنافسين",
    category: "تحليل",
    desc: "نموذج جاهز لتوثيق تحليل 3-5 منافسين",
    body:
`# تقرير تحليل المنافسين

| المنافس | القناة الرئيسية | نوع المحتوى | العروض | نقاط القوة | نقاط الضعف | الفجوة (فرصتك) |
|---------|----------------|------------|--------|-----------|-----------|---------------|
| المنافس 1 |  |  |  |  |  |  |
| المنافس 2 |  |  |  |  |  |  |
| المنافس 3 |  |  |  |  |  |  |

## أسئلة يجب الإجابة عنها:
1. ما الذي يفعلونه أفضل منك؟
2. ما الذي يتجاهلونه ويمكنك سدّه؟
3. ما نبرة صوتهم؟ (رسمي / ودود / تعليمي / استفزازي)
4. ما متوسط معدل التفاعل لديهم؟
5. أين تتركّز شكاوى عملائهم؟
`
  },
  {
    id: "tpl-monthly-plan",
    title: "خطة التسويق الشهرية",
    category: "استراتيجية",
    desc: "خطة شاملة تربط كل القنوات بأهداف واضحة",
    body:
`# الخطة التسويقية الشهرية

## الهدف الرئيسي للشهر
- مثال: 200 Lead بتكلفة < $5 / Lead

## القنوات والميزانية
| القناة | الميزانية | الهدف | KPI |
|--------|----------|------|-----|
| Meta Ads | $1500 | 100 Lead | CPL < $5 |
| Google Ads | $800 | 60 Lead | CPL < $7 |
| محتوى عضوي | — | 30 Lead | معدل Engagement |
| Email | — | إعادة تنشيط 10 | Open Rate 35% |

## التقويم الإسبوعي (4 أسابيع)
- الأسبوع 1: إطلاق + اختبار 3 إبداعات
- الأسبوع 2: تحليل + إيقاف الأضعف
- الأسبوع 3: مضاعفة الفائزين
- الأسبوع 4: تقرير + تخطيط الشهر القادم
`
  },
];

// ────────────────── دراسات الحالة ──────────────────
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    title: "متجر إلكتروني — من 0 إلى 50K متابع",
    before: "0 متابع، 0 مبيعات",
    after: "50K متابع، +200 عملية بيع شهرياً",
    strategy: "التسويق بالمحتوى + إعلانات مستهدفة",
    duration: "6 أشهر",
    color: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    id: "cs-2",
    title: "مدرّب حياة — مضاعفة العملاء 3x",
    before: "5 عملاء/شهر",
    after: "15 عميل/شهر بنمو مستمر",
    strategy: "علامة شخصية + سلسلة بريدية + ويبينارز",
    duration: "4 أشهر",
    color: "from-indigo-500/15 to-indigo-500/5",
  },
  {
    id: "cs-3",
    title: "مطعم محلي — زيادة الزيارات 150%",
    before: "30 طلب/يوم",
    after: "75 طلب/يوم",
    strategy: "Reels يومية + إعلانات محلية + عروض حصرية",
    duration: "3 أشهر",
    color: "from-orange-500/15 to-orange-500/5",
  },
];

// ────────────────── الوحدات التعليمية ──────────────────
export const MODULES: Module[] = [
  // 1) الأساسيات
  {
    id: "m1",
    slug: "foundations",
    title: "أساسيات التسويق",
    subtitle: "سيكولوجية الشراء وبناء القيمة",
    icon: "brain",
    accent: "text-violet-300",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    ring: "shadow-violet-500/10",
    lessons: [
      {
        id: "l1-1",
        title: "سيكولوجية قرارات الشراء",
        summary: "لماذا يشتري الناس؟ ما المحرّكات النفسية الحقيقية؟",
        sections: [
          {
            heading: "العاطفة أولاً، المنطق ثانياً",
            body:
              "كل قرار شرائي يبدأ عاطفياً ثم يبرَّر منطقياً. مهمتك كمسوّق هي إثارة المشاعر الصحيحة (الأمان، الانتماء، الإنجاز، الهوية) ثم تزويد العقل بالأدلة (الأرقام، الشهادات، الضمانات).",
          },
          {
            heading: "محرّكات الشراء السبعة",
            body: "هذه هي المحرّكات النفسية الأساسية التي تقف خلف 95% من قرارات الشراء:",
            bullets: [
              "تجنّب الألم (أقوى من السعي للمتعة بـ 2.5 ضعف)",
              "السعي للمتعة والمكافأة الفورية",
              "الانتماء وتأكيد الهوية الاجتماعية",
              "الندرة والخوف من الفوات (FOMO)",
              "السلطة والثقة في الخبير",
              "المعاملة بالمثل (Reciprocity)",
              "الالتزام والاتساق",
            ],
          },
          {
            heading: "نموذج Jobs-to-be-Done",
            body:
              "العميل لا يشتري المنتج، بل يستأجره لإنجاز مهمة. الفِرَنشي لا يشتري دريلاً، بل ثقباً في الجدار. اسأل دائماً: ما المهمة التي يحاول العميل إنجازها؟",
          },
        ],
        apply: "اكتب 3 محرّكات نفسية يستخدمها أقوى منافس لك في صفحته الرئيسية.",
      },
      {
        id: "l1-2",
        title: "لماذا لا يشتري العملاء؟",
        summary: "الاعتراضات الستة الكبرى وكيفية تحطيمها قبل أن تُطرح",
        sections: [
          {
            heading: "الاعتراضات الستة الكلاسيكية",
            body: "عندما لا يشتري عميل، فهو يقول لنفسه واحدة من ست جمل:",
            bullets: [
              "لا أحتاجه (قيمة غير واضحة)",
              "لا أثق بك (انعدام Social Proof)",
              "لا أملك المال (سعر غير مبرَّر مقابل القيمة)",
              "لن ينجح معي (هويتي مختلفة)",
              "ليس الوقت المناسب (لا توجد ندرة حقيقية)",
              "أحتاج التفكير (لا يوجد CTA واضح أو ضمان)",
            ],
          },
          {
            heading: "إطار حلّ الاعتراضات في المحتوى",
            body:
              "ابنِ مكتبة محتوى تحطّم اعتراضاً لكل قطعة. منشور لكل اعتراض، فيديو لكل اعتراض، إيميل لكل اعتراض. هكذا يصل العميل لصفحة الدفع بدون مقاومة.",
          },
        ],
        apply: "اكتب 6 منشورات قصيرة، كل واحد يحطّم اعتراضاً من القائمة أعلاه.",
      },
      {
        id: "l1-3",
        title: "بناء إدراك القيمة",
        summary: "كيف تجعل سعرك يبدو رخيصاً مقارنة بالنتيجة",
        sections: [
          {
            heading: "معادلة القيمة",
            body:
              "القيمة المُدرَكة = (النتيجة المرغوبة × احتمال النجاح) ÷ (الوقت × الجهد). كلما رفعت البَسط وخفّضت المقام، ارتفعت قيمة عرضك بدون رفع السعر.",
          },
          {
            heading: "مرساة السعر (Price Anchoring)",
            body:
              "اعرض الباقة الأغلى أولاً، ثم الموصى بها، ثم الأرخص. الدماغ سيستخدم الأولى كمرجع، فتبدو الموصى بها 'صفقة'.",
          },
          {
            heading: "Stack القيمة",
            body:
              "بدلاً من بيع 'كورس'، بِع: الكورس ($497) + ملف Notion ($97) + جلسة فردية ($197) + مجموعة خاصة ($97) = قيمة إجمالية $888 — السعر فقط $297.",
          },
        ],
        apply: "أعد تصميم صفحة منتجك باستخدام Stack القيمة + مرساة سعرية.",
      },
    ],
    videos: [
      { id: "glAw6-dJSsE", title: "أساسيات التسويق - الدرس الأول", summary: "مقدمة شاملة حول أساسيات التسويق وكيفية البدء في بناء استراتيجيتك." },
    ],
    templates: [TEMPLATES[5]],
    tools: [
      { name: "Notion", url: "https://notion.so", desc: "لتنظيم بحث الجمهور والاعتراضات" },
    ],
  },

  // 2) جذب العملاء
  {
    id: "m2",
    slug: "lead-generation",
    title: "نظام جذب العملاء",
    subtitle: "Lead Magnets وصفحات الهبوط",
    icon: "magnet",
    accent: "text-pink-300",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    ring: "shadow-pink-500/10",
    lessons: [
      {
        id: "l2-1",
        title: "Lead Magnets — مغناطيس العملاء",
        summary: "كيف تصنع هدية مجانية لا يستطيع جمهورك رفضها",
        sections: [
          {
            heading: "ما هو Lead Magnet الجيد؟",
            body:
              "هدية مجانية تحلّ مشكلة محددة جداً، تُستهلك في أقل من 10 دقائق، وتقود طبيعياً نحو منتجك المدفوع.",
          },
          {
            heading: "أفضل 7 أنواع تعمل في 2026",
            body: "",
            bullets: [
              "PDF Cheat Sheet (صفحة واحدة، نقاط مرقّمة)",
              "Notion Template جاهز للنسخ",
              "Mini-Course بريدي 5 أيام",
              "Webinar مسجّل 30 دقيقة",
              "Audit مجاني (نموذج مكوّن من 10 أسئلة)",
              "Toolkit / مجموعة موارد مُنسَّقة",
              "حاسبة تفاعلية (ROI / Pricing)",
            ],
          },
          {
            heading: "صيغة العنوان السحرية",
            body:
              "[الرقم] + [الفائدة المحددة] + [الإطار الزمني] + [بدون الألم]. مثال: 5 قوالب بريدية تضاعف معدل الفتح خلال أسبوع بدون نسخ من الإنترنت.",
          },
        ],
        apply: "صمّم Lead Magnet واحد فقط وانشره خلال 48 ساعة.",
      },
      {
        id: "l2-2",
        title: "صفحات الهبوط",
        summary: "تركيبة الصفحة عالية التحويل",
        sections: [
          {
            heading: "قاعدة المسح البصري Z-Pattern",
            body:
              "العين العربية تقرأ من اليمين للأسفل ثم لليسار. ضع: الشعار يمين، Headline أعلى وسط، CTA يسار، Hero في الوسط، Social Proof تحته مباشرة.",
          },
          {
            heading: "12 عنصر إلزامي",
            body: "راجع قالب صفحة الهبوط في تبويب الأدوات والقوالب لمعرفة الـ 12 عنصراً.",
          },
        ],
        apply: "ابنِ صفحة هبوط واحدة على Systeme.io أو Tally بناءً على القالب.",
      },
      {
        id: "l2-3",
        title: "قمع التحويل المتكامل",
        summary: "من الزائر الأول إلى العميل الدائم",
        sections: [
          {
            heading: "مراحل القمع TOFU / MOFU / BOFU",
            body: "",
            bullets: [
              "TOFU: محتوى تعليمي مجاني (Reels، مدوّنات، Threads)",
              "MOFU: Lead Magnet + سلسلة بريدية تربوية",
              "BOFU: عرض محدود + Webinar / مكالمة + ضمان",
            ],
          },
          {
            heading: "معدلات التحويل الصحية",
            body:
              "زائر → Lead: 2–5%. Lead → Sales call: 10–20%. Sales call → عميل: 20–40%. تحسين أي مرحلة 2x يضاعف إيرادك بدون زيادة الترافيك.",
          },
        ],
        apply: "ارسم قمع التحويل الخاص بك على ورقة وحدّد المرحلة الأضعف.",
      },
    ],
    videos: [
      { id: "P6uPXhAYeFQ", title: "نظام جذب العملاء والتحويل", summary: "شرح عملي لكيفية بناء نظام متكامل لجذب العملاء المهتمين وتحويلهم إلى مشترين." },
    ],
    templates: [TEMPLATES[0]],
    tools: [
      { name: "Tally", url: "https://tally.so", desc: "بناء نماذج وصفحات هبوط مجانية بسرعة" },
      { name: "Systeme.io", url: "https://systeme.io", desc: "منصة متكاملة لصفحات الهبوط والبريد والقمع" },
    ],
  },

  // 3) التسويق بالمحتوى
  {
    id: "m3",
    slug: "content",
    title: "التسويق بالمحتوى",
    subtitle: "استراتيجية المحتوى الشاملة",
    icon: "pen",
    accent: "text-sky-300",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    ring: "shadow-sky-500/10",
    lessons: [
      {
        id: "l3-1",
        title: "ما هو التسويق بالمحتوى؟",
        summary: "بناء الثقة قبل البيع",
        sections: [
          {
            heading: "تعريف عملي",
            body:
              "التسويق بالمحتوى هو إنتاج معرفة قيّمة مجاناً لجمهور محدد، بهدف بناء سلطة وثقة، تنتهي بتحويل القارئ إلى عميل عندما يصبح جاهزاً.",
          },
          {
            heading: "لماذا الآن؟",
            body:
              "تكلفة الإعلانات ترتفع 25% سنوياً، بينما تكلفة المحتوى ثابتة بل يتراكم تأثيره (Compound Effect). كل قطعة محتوى ممتاز تستمر في جلب عملاء لسنوات.",
          },
        ],
        apply: "حدّد موضوعاً رئيسياً واحداً (Niche) ستكون مرجعاً فيه خلال 12 شهر.",
      },
      {
        id: "l3-2",
        title: "استراتيجية Hook → Value → CTA",
        summary: "البنية الذهبية لأي قطعة محتوى ناجحة",
        sections: [
          {
            heading: "Hook — أوّل 3 ثواني",
            body:
              "إن لم تأسر الانتباه في 3 ثواني، خسرت الجمهور. صيغ ناجحة: 'لو عرفت هذا قبل 5 سنوات...' / 'الخطأ الذي يكلّفك آلاف الدولارات...' / 'فعلت هذا 30 يوم والنتيجة...'",
          },
          {
            heading: "Value — قدّم درساً واحداً",
            body:
              "قطعة محتوى = درس واحد فقط. لا تحاول قول كل شيء. كلما ضيّقت، عمَّقت، وزاد الحفظ والمشاركة.",
          },
          {
            heading: "CTA — اطلب فعلاً واحداً",
            body:
              "احفظ / علّق بكلمة معينة / تابع للمزيد / حمّل الهدية. لا تخلط أكثر من CTA واحد.",
          },
        ],
        apply: "أعد كتابة آخر 3 منشورات لك بصيغة Hook → Value → CTA.",
      },
      {
        id: "l3-3",
        title: "خطة المحتوى الأسبوعية",
        summary: "نظام نشر مستدام بدون احتراق",
        sections: [
          {
            heading: "قاعدة 4-1-1",
            body:
              "من كل 6 منشورات: 4 تعليمية / ترفيهية، 1 قصة شخصية، 1 عرض. يحافظ على ثقة الجمهور بدون أن تتحوّل لـ Salesy.",
          },
          {
            heading: "Batch Recording",
            body:
              "صوّر محتوى 4 أسابيع في يوم واحد. وفّر 80% من وقتك واحفظ جودة الإضاءة والإعداد ثابتة.",
          },
        ],
        apply: "استخدم قالب التقويم الأسبوعي وخطّط محتوى 7 أيام الآن.",
      },
      {
        id: "l3-4",
        title: "المحتوى القصير: Reels & TikTok",
        summary: "خوارزميات 2026 ومتطلبات النمو السريع",
        sections: [
          {
            heading: "صيغة الفيديو الناجح (15-30 ث)",
            body: "",
            bullets: [
              "Hook بصري + نصي في الثانية الأولى",
              "Pattern Interrupt كل 3 ثواني (تغيير زاوية / Zoom / Text)",
              "Payoff واضح في النهاية",
              "Loop يعيد المشاهد للبداية (Watch Time أعلى)",
              "Caption قصير يستفزّ التعليق",
            ],
          },
          {
            heading: "Hashtags & Music",
            body:
              "استخدم 3-5 هاشتاج مزيج (Niche + متوسط + شائع). صوت Trending يضاعف الوصول 3x في أول 24 ساعة.",
          },
        ],
        apply: "انشر Reel واحد يومياً لـ 30 يوم — قاعدة 'الكمية تخلق الجودة'.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=OvfI43fEl6E"), title: "أساسيات التسويق بالمحتوى", summary: "نظرة شاملة على بناء استراتيجية محتوى من الصفر." },
      { id: ytId("https://www.youtube.com/watch?v=F3jb_ceABUA"), title: "كيف تكتب محتوى يبيع؟", summary: "تقنيات الكتابة الإقناعية للمحتوى الرقمي." },
      { id: ytId("https://www.youtube.com/watch?v=NqKOqDrrQR4"), title: "خطة محتوى 30 يوم", summary: "خطة تنفيذية لبناء حضور رقمي خلال شهر." },
    ],
    templates: [TEMPLATES[1]],
    tools: [
      { name: "Notion", url: "https://notion.so", desc: "تخطيط وتقويم المحتوى" },
      { name: "CapCut", url: "https://capcut.com", desc: "تحرير Reels/Shorts بسرعة" },
    ],
  },

  // 4) الإعلانات المدفوعة
  {
    id: "m4",
    slug: "paid-ads",
    title: "نظام الإعلانات المدفوعة",
    subtitle: "Facebook, Instagram, Google Ads",
    icon: "megaphone",
    accent: "text-orange-300",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    ring: "shadow-orange-500/10",
    lessons: [
      {
        id: "l4-1",
        title: "بنية الحملة الإعلانية",
        summary: "Campaign → Ad Set → Ad — الهيكل الذي يحدّد نجاحك",
        sections: [
          {
            heading: "الهرم الإعلاني",
            body: "كل منصة (Meta / Google / TikTok) تتبع نفس الهرم: حملة (الهدف) → مجموعة إعلانية (الجمهور والميزانية) → إعلان (الإبداع).",
          },
          {
            heading: "اختيار الهدف الصحيح",
            body: "",
            bullets: [
              "وعي بالعلامة → Awareness / Reach",
              "زوار للموقع → Traffic",
              "Leads → Lead Generation / Conversions",
              "مبيعات → Sales / Conversions على حدث Purchase",
            ],
          },
        ],
        apply: "ارسم هرم حملتك القادمة قبل الدخول لـ Ads Manager.",
      },
      {
        id: "l4-2",
        title: "استراتيجية الميزانية والاختبار",
        summary: "كيف تختبر بأقل تكلفة وتضاعف الفائز",
        sections: [
          {
            heading: "مرحلة Testing (7 أيام)",
            body: "$20–50 يومياً لكل Ad Set، 3 إبداعات مختلفة، جمهور Broad. اقتل أي إبداع بـ CTR < 1% أو CPL > الهدف بـ 50%.",
          },
          {
            heading: "مرحلة Scaling",
            body: "ضاعف ميزانية الفائز 20% كل 3 أيام (لا أكثر — يكسر الـ Learning). استنسخ الإعلان (Duplicate) لجماهير Lookalike مختلفة.",
          },
        ],
        apply: "حدّد ميزانية Testing شهرية = 10% من إيرادك المستهدف.",
      },
      {
        id: "l4-3",
        title: "جدول: الهدف → نوع الحملة → المنصة",
        summary: "خريطة سريعة لاتخاذ القرار",
        sections: [
          {
            heading: "جدول القرار",
            body:
              "| هدف العمل | نوع الحملة المثالي | أفضل منصة |\n" +
              "|---|---|---|\n" +
              "| بناء وعي | Reach / Brand Awareness | Meta + TikTok |\n" +
              "| زوار للمدوّنة | Traffic | Google Display + Meta |\n" +
              "| تسجيل في ندوة | Lead Generation | Meta + LinkedIn |\n" +
              "| مبيعات منتج رقمي | Conversions | Meta + Google Search |\n" +
              "| مبيعات منتج فعلي | Catalog Sales | Meta + TikTok Shop |\n" +
              "| تطبيق B2B | Lead Gen | LinkedIn + Google |",
          },
        ],
        apply: "اختر الصف الذي يطابق هدفك واحفظه كصورة على هاتفك.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=l1JiUnb8glA"), title: "أنواع الإعلانات المدفوعة", summary: "شرح كامل لأنواع الحملات على فيسبوك وإنستغرام وقواعد التحسين." },
    ],
    templates: [TEMPLATES[3]],
    tools: [
      { name: "g-dart — الإعلانات المدفوعة", url: "https://g-dart.com/الإعلانات-المدفوعة-paid-advertising", desc: "مرجع عربي شامل عن الإعلانات المدفوعة" },
      { name: "momyyaz — أنواع الحملات", url: "https://momyyaz.com/أنواع-الحملات-الإعلانية", desc: "دليل تفصيلي لأنواع الحملات الإعلانية" },
    ],
  },

  // 5) نظام التحويل
  {
    id: "m5",
    slug: "conversion",
    title: "نظام التحويل",
    subtitle: "صفحات الهبوط والـ Copywriting",
    icon: "target",
    accent: "text-fuchsia-300",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    ring: "shadow-fuchsia-500/10",
    lessons: [
      {
        id: "l5-1",
        title: "سيكولوجية صفحات الهبوط",
        summary: "كيف تجعل العين تتدفّق نحو زر الشراء",
        sections: [
          {
            heading: "قاعدة 5 ثواني",
            body: "اعرض صفحتك على شخص لـ 5 ثواني فقط، ثم اسأله: 'ما الذي يقدّمه هذا الموقع؟ ولمن؟'. إن لم يجب، أعد التصميم.",
          },
          {
            heading: "تقليل Friction",
            body: "",
            bullets: [
              "نموذج بحقل واحد (البريد فقط) في المرحلة الأولى",
              "إزالة كل القوائم العلوية (Distraction)",
              "زر CTA واحد متكرر 3-5 مرات",
              "زمن تحميل < 2.5 ثانية",
            ],
          },
        ],
        apply: "اختبر صفحتك على 5 أشخاص حقيقيين خلال 24 ساعة.",
      },
      {
        id: "l5-2",
        title: "Copywriting: AIDA & PAS",
        summary: "أقوى إطارَين للكتابة الإقناعية",
        sections: [
          {
            heading: "إطار AIDA",
            body: "",
            bullets: [
              "Attention: Hook يكسر النمط",
              "Interest: قصة أو إحصائية صادمة",
              "Desire: اعرض النتيجة بعد المنتج",
              "Action: CTA واضح + ضمان",
            ],
          },
          {
            heading: "إطار PAS",
            body: "",
            bullets: [
              "Problem: صف الألم بكلمات العميل نفسها",
              "Agitate: عمّق الألم — ماذا يحدث لو لم يحلّ؟",
              "Solution: قدّم منتجك كحل واضح ومباشر",
            ],
          },
        ],
        apply: "اكتب نسختين من Headlines: واحدة بـ AIDA وأخرى بـ PAS، واختبرهما.",
      },
      {
        id: "l5-3",
        title: "تحسين الـ CTA",
        summary: "زر صغير، فرق كبير",
        sections: [
          {
            heading: "قواعد ذهبية للزر",
            body: "",
            bullets: [
              "نص بصيغة المتكلم: 'ابدأ تجربتي المجانية' بدلاً من 'ابدأ'",
              "لون متباين عن خلفية الصفحة",
              "حجم لا يقل عن 48px ارتفاعاً (Mobile-friendly)",
              "Microcopy تحت الزر يقلّل القلق: 'لا حاجة لبطاقة ائتمان'",
            ],
          },
        ],
        apply: "غيّر نص أزرارك لصيغة المتكلم وقِس النتيجة لمدة 14 يوم.",
      },
    ],
    videos: [
      { id: "Zq-px0qf2co", title: "سيكولوجية صفحات الهبوط", summary: "كيف تجعل العين تتدفّق نحو زر الشراء باستخدام قواعد التصميم البصري." },
      { id: "K5qXI2pN9mA", title: "Copywriting: AIDA & PAS", summary: "شرح عملي لأقوى إطارين في الكتابة الإقناعية لتحويل الزوار إلى عملاء." },
      { id: "oD-ZdHnV1hs", title: "تحسين الـ CTA والتحويل النهائي", summary: "أسرار تحسين أزرار الدعوة لاتخاذ إجراء (CTA) لزيادة معدلات النقر والتحويل." },
    ],
    templates: [TEMPLATES[0]],
    tools: [
      { name: "Hotjar", url: "https://hotjar.com", desc: "خرائط حرارية لتحليل سلوك زوار الصفحة" },
    ],
  },

  // 6) البريد الإلكتروني
  {
    id: "m6",
    slug: "email",
    title: "التسويق بالبريد الإلكتروني",
    subtitle: "السلاسل البريدية والأتمتة",
    icon: "mail",
    accent: "text-emerald-300",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    ring: "shadow-emerald-500/10",
    lessons: [
      {
        id: "l6-1",
        title: "لماذا البريد ما زال الملك؟",
        summary: "ROI = $42 لكل $1 — لا توجد قناة تنافسه",
        sections: [
          {
            heading: "ملكيتك للقائمة",
            body: "السوشيال ميديا مستأجَرة (يمكن إغلاق حسابك غداً). قائمة بريدك ملكك للأبد، تنمو معك بتراكم.",
          },
          {
            heading: "الأرقام الصحية",
            body: "",
            bullets: [
              "Open Rate: 25-35% جيد، 40%+ ممتاز",
              "Click Rate: 3-7%",
              "Unsubscribe: < 0.5% لكل حملة",
            ],
          },
        ],
        apply: "اختر مزوّد بريد (Beehiiv / MailerLite / ConvertKit) وابدأ اليوم.",
      },
      {
        id: "l6-2",
        title: "السلسلة الترحيبية (5 رسائل)",
        summary: "أهم 7 أيام في علاقتك مع المشترك الجديد",
        sections: [
          {
            heading: "البنية الزمنية",
            body: "",
            bullets: [
              "اليوم 0: ترحيب + تسليم الهدية",
              "اليوم 1: قصتك الشخصية",
              "اليوم 3: الدرس الأقوى لديك مجاناً",
              "اليوم 5: دراسة حالة (Social Proof)",
              "اليوم 7: العرض الأول (بدون ضغط)",
            ],
          },
        ],
        apply: "استخدم القالب الجاهز في الأدوات وفعّل سلسلتك خلال 24 ساعة.",
      },
      {
        id: "l6-3",
        title: "سلسلة Lead Nurturing وإعادة التنشيط",
        summary: "ابقَ في عقل العميل بدون إزعاج",
        sections: [
          {
            heading: "Nurturing — رسالة أسبوعية",
            body: "محتوى تعليمي + ربط ذكي بمنتجك في النهاية. القاعدة: 80% قيمة، 20% بيع.",
          },
          {
            heading: "Re-engagement",
            body: "كل 60 يوم، أرسل لمن لم يفتح: 'هل ما زلت معنا؟' — رسالة واحدة مع زر بسيط. من لا يتفاعل، احذفه (يحسّن Deliverability).",
          },
        ],
        apply: "أنشئ شريحة (Segment) للمشتركين غير النشطين خلال 60 يوم.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=w-e8jb2GG2U"), title: "بناء سلاسل البريد الإلكتروني", summary: "شرح عملي لبناء سلاسل بريدية فعّالة من الصفر." },
    ],
    templates: [TEMPLATES[2]],
    tools: [
      { name: "MailerLite", url: "https://mailerlite.com", desc: "مزوّد بريد مجاني للبدء" },
      { name: "LinkedIn — Email Sequences", url: "https://ae.linkedin.com/pulse/create-email-sequences-work-expert-tips-clearout-io-bik3c", desc: "نصائح خبراء لبناء سلاسل تعمل" },
      { name: "MailMeteor — أمثلة", url: "https://mailmeteor.com/blog/email-sequence-examples", desc: "أمثلة جاهزة للاستلهام" },
    ],
  },

  // 7) العلامة الشخصية
  {
    id: "m7",
    slug: "personal-brand",
    title: "العلامة الشخصية",
    subtitle: "بناء حضور لا يُنسى خلال 90 يوم",
    icon: "crown",
    accent: "text-amber-300",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    ring: "shadow-amber-500/10",
    lessons: [
      {
        id: "l7-1",
        title: "تعريف علامتك في جملة واحدة",
        summary: "إذا لم تستطع تعريف نفسك في 10 كلمات، لن يتذكرك أحد",
        sections: [
          {
            heading: "صيغة Brand Statement",
            body: "أنا [مهنتك] أساعد [جمهورك] على [تحقيق نتيجة] عبر [طريقتك الفريدة]. مثال: 'أنا مسوّق رقمي أساعد المدرّبين العرب على بناء قوائم بريدية مربحة عبر المحتوى المجاني.'",
          },
        ],
        apply: "اكتب 5 صيغ مختلفة، شاركها مع 3 أشخاص، واختر الأوضح.",
      },
      {
        id: "l7-2",
        title: "ركائز المحتوى الأربع",
        summary: "اختر 4 مواضيع وكن مرجعاً فيها",
        sections: [
          {
            heading: "نموذج 4 Content Pillars",
            body: "",
            bullets: [
              "ركيزة الخبرة: محتوى تعليمي عميق في مجالك",
              "ركيزة القصة: تجاربك ودروسك الشخصية",
              "ركيزة الرأي: مواقف جريئة تثير النقاش",
              "ركيزة الإلهام: نتائج العملاء وقصص نجاحهم",
            ],
          },
        ],
        apply: "حدّد ركائزك الأربع واكتب 5 أفكار محتوى لكل ركيزة.",
      },
      {
        id: "l7-3",
        title: "خطة 30 يوم لبناء العلامة",
        summary: "روتين يومي قابل للتنفيذ",
        sections: [
          {
            heading: "الجدول اليومي (45 دقيقة)",
            body: "",
            bullets: [
              "15 دقيقة: نشر منشور / فيديو واحد",
              "15 دقيقة: التعليق على 10 منشورات في مجالك",
              "10 دقائق: الردّ على رسائل المتابعين",
              "5 دقائق: تدوين فكرة محتوى للغد",
            ],
          },
          {
            heading: "أسبوع بعد أسبوع",
            body: "",
            bullets: [
              "أسبوع 1: تثبيت الهوية البصرية والـ Bio",
              "أسبوع 2: نشر 7 منشورات تعليمية",
              "أسبوع 3: نشر 3 قصص شخصية + رأي جريء",
              "أسبوع 4: إطلاق Lead Magnet أول",
            ],
          },
        ],
        apply: "اطبع الخطة وعلّقها في مكان مرئي. التزم 30 يوم بدون توقّف.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=FB4Tr0aGmpw"), title: "بناء العلامة الشخصية", summary: "خطوات عملية لبناء حضور مميز ومؤثر." },
      { id: ytId("https://www.youtube.com/watch?v=Z34SEN-j6B8"), title: "ثقة الجمهور والسلطة", summary: "كيف تتحوّل من مجرد 'حضور' إلى مرجع." },
      { id: ytId("https://www.youtube.com/watch?v=IjK4k9dUZ0E"), title: "محتوى يبني علامتك", summary: "نوعية المحتوى التي ترسّخ صورتك الذهنية." },
    ],
    templates: [],
    tools: [
      { name: "Canva", url: "https://canva.com", desc: "تصميم هوية بصرية متسقة" },
    ],
  },

  // 8) التحليلات والمؤشرات
  {
    id: "m8",
    slug: "analytics",
    title: "التحليلات والمؤشرات",
    subtitle: "KPIs والأرقام التي تهم فعلاً",
    icon: "chart",
    accent: "text-cyan-300",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    ring: "shadow-cyan-500/10",
    lessons: [
      {
        id: "l8-1",
        title: "تعريفات KPIs الأساسية",
        summary: "5 مؤشرات تكفيك لاتخاذ 90% من القرارات",
        sections: [
          {
            heading: "المؤشرات الخمسة",
            body: "",
            bullets: [
              "CAC — تكلفة اكتساب عميل (Customer Acquisition Cost)",
              "LTV — قيمة العميل مدى الحياة (Lifetime Value)",
              "ROAS — العائد على الإنفاق الإعلاني",
              "Conversion Rate — معدل التحويل في كل مرحلة",
              "Churn Rate — معدل فقدان العملاء",
            ],
          },
          {
            heading: "القاعدة الذهبية",
            body: "LTV ÷ CAC يجب أن يكون ≥ 3. إن كان أقل، فالنموذج غير مستدام مهما زاد الإنفاق.",
          },
        ],
        apply: "احسب CAC و LTV لمشروعك الآن. هل النسبة ≥ 3؟",
      },
      {
        id: "l8-2",
        title: "معادلات الحساب",
        summary: "كيف تحسب كل KPI بدقة",
        sections: [
          {
            heading: "المعادلات",
            body: "",
            bullets: [
              "CAC = إجمالي الإنفاق التسويقي ÷ عدد العملاء الجدد",
              "LTV = متوسط قيمة الطلب × عدد الطلبات السنوي × سنوات بقاء العميل",
              "ROAS = الإيراد من الإعلان ÷ الإنفاق الإعلاني",
              "Conversion Rate = (التحويلات ÷ الزوار) × 100",
              "Churn Rate الشهري = (العملاء المفقودون ÷ العملاء بداية الشهر) × 100",
            ],
          },
        ],
        apply: "أنشئ Sheet بسيط بهذه المعادلات وحدّثه أسبوعياً.",
      },
      {
        id: "l8-3",
        title: "لوحة مؤشرات نموذجية",
        summary: "كيف تبني Dashboard بسيطة وفعّالة",
        sections: [
          {
            heading: "مكونات Dashboard أسبوعية",
            body: "",
            bullets: [
              "صف 1 (الكبيرة): الإيراد، عدد العملاء الجدد، CAC، LTV",
              "صف 2 (القنوات): الإيراد لكل قناة + ROAS",
              "صف 3 (القمع): زوار → Leads → عملاء + معدلات التحويل",
              "صف 4 (المحتوى): أفضل 5 منشورات أداءً",
              "صف 5 (التحذيرات): أي KPI انحرف > 20% عن الهدف",
            ],
          },
        ],
        apply: "ابنِ Dashboard على Notion أو Google Sheets خلال 60 دقيقة.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=H25jDTiBQt4"), title: "مؤشرات التسويق KPIs", summary: "شرح المؤشرات الأساسية لقياس نجاح الحملات." },
      { id: ytId("https://www.youtube.com/watch?v=HlWQb56MMPs"), title: "حساب ROI و ROAS", summary: "كيف تحسب العائد على الاستثمار التسويقي بدقة." },
      { id: ytId("https://www.youtube.com/watch?v=5cc7nz-bRbI"), title: "Google Analytics للمسوّقين", summary: "أساسيات تحليلات جوجل للمسوّقين الرقميين." },
    ],
    templates: [],
    tools: [
      { name: "Google Analytics 4", url: "https://analytics.google.com", desc: "أداة التحليلات الأشهر مجاناً" },
      { name: "Looker Studio", url: "https://lookerstudio.google.com", desc: "بناء Dashboards احترافية مجاناً" },
    ],
  },

  // 9) تحليل المنافسين
  {
    id: "m9",
    slug: "competitors",
    title: "تحليل المنافسين",
    subtitle: "الاستراتيجية والتمايز",
    icon: "search",
    accent: "text-rose-300",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    ring: "shadow-rose-500/10",
    lessons: [
      {
        id: "l9-1",
        title: "كيف تحلّل منافسيك",
        summary: "إطار 6 محاور لتحليل أي منافس خلال ساعة",
        sections: [
          {
            heading: "المحاور الستة",
            body: "",
            bullets: [
              "القنوات: أين يتواجدون وأيها الأقوى؟",
              "المحتوى: ماذا ينشرون وما نوعية الـ Hooks؟",
              "العروض: ما تركيبة المنتجات والأسعار؟",
              "نقاط القوة: ماذا يفعلون أفضل منك؟",
              "نقاط الضعف: شكاوى العملاء + ما يتجاهلونه",
              "الفجوات: ما الفرص التي يمكنك سدّها؟",
            ],
          },
          {
            heading: "أدوات سريعة",
            body: "Meta Ads Library (مجاناً) لمشاهدة كل إعلاناتهم. SimilarWeb لقياس حجم زوار موقعهم. SocialBlade لمتابعة نمو حساباتهم.",
          },
        ],
        apply: "اختر 3 منافسين واملأ قالب التحليل في الأدوات.",
      },
      {
        id: "l9-2",
        title: "استراتيجية التمايز",
        summary: "كن مختلفاً، لا أفضل",
        sections: [
          {
            heading: "محاور التمايز",
            body: "",
            bullets: [
              "تمايز بالجمهور: تخصّص في شريحة دقيقة جداً",
              "تمايز بالطريقة: نهج فريد لحلّ نفس المشكلة",
              "تمايز بالنبرة: شخصية صوت مميزة (جريء / علمي / دافئ)",
              "تمايز بالسرعة: نتائج أسرع من المنافسين",
              "تمايز بالضمان: ضمان لا يجرؤ غيرك على تقديمه",
            ],
          },
          {
            heading: "Blue Ocean",
            body: "بدلاً من المنافسة في محيط أحمر، اصنع فئة جديدة. اسأل: ما الذي يفعله الجميع وأستطيع التوقف عن فعله؟ وما الذي لا يفعله أحد وأستطيع البدء فيه؟",
          },
        ],
        apply: "اختر محوراً واحداً للتمايز وأعد كتابة Bio حساباتك بناءً عليه.",
      },
    ],
    videos: [
      { id: ytId("https://www.youtube.com/watch?v=4kd1TOJnZXM"), title: "تحليل المنافسين عملياً", summary: "خطوات تحليل منافس من الصفر." },
      { id: ytId("https://www.youtube.com/watch?v=DxrCVfDnhvQ"), title: "أدوات تحليل المنافسين", summary: "أفضل الأدوات المجانية والمدفوعة." },
      { id: ytId("https://www.youtube.com/watch?v=ZvbWSc2j6gg"), title: "استراتيجية التمايز", summary: "كيف تتميّز في سوق مزدحم." },
    ],
    templates: [TEMPLATES[4]],
    tools: [
      { name: "Meta Ads Library", url: "https://www.facebook.com/ads/library", desc: "كل إعلانات المنافسين مكشوفة مجاناً" },
      { name: "SimilarWeb", url: "https://similarweb.com", desc: "حجم وأهم مصادر زوار الموقع" },
    ],
  },
];

// ────────────────── فهرسة البحث (Search Index) ──────────────────
export type SearchHit = {
  type: "lesson" | "video" | "template" | "tool" | "module" | "case";
  moduleId?: string;
  moduleTitle?: string;
  title: string;
  subtitle?: string;
  url?: string;
  body?: string;
  id: string;
};

export function buildSearchIndex(): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const m of MODULES) {
    hits.push({
      type: "module",
      id: m.id,
      moduleId: m.id,
      moduleTitle: m.title,
      title: m.title,
      subtitle: m.subtitle,
    });
    for (const l of m.lessons) {
      hits.push({
        type: "lesson",
        id: l.id,
        moduleId: m.id,
        moduleTitle: m.title,
        title: l.title,
        subtitle: l.summary,
        body: l.sections.map((s) => s.heading + " " + s.body + " " + (s.bullets || []).join(" ")).join(" "),
      });
    }
    for (const v of m.videos) {
      hits.push({
        type: "video",
        id: v.id,
        moduleId: m.id,
        moduleTitle: m.title,
        title: v.title,
        subtitle: v.summary,
        url: `https://www.youtube.com/watch?v=${v.id}`,
      });
    }
    for (const t of m.templates) {
      hits.push({
        type: "template",
        id: t.id,
        moduleId: m.id,
        moduleTitle: m.title,
        title: t.title,
        subtitle: t.desc,
      });
    }
    for (const tool of m.tools) {
      hits.push({
        type: "tool",
        id: tool.url,
        moduleId: m.id,
        moduleTitle: m.title,
        title: tool.name,
        subtitle: tool.desc,
        url: tool.url,
      });
    }
  }
  for (const cs of CASE_STUDIES) {
    hits.push({
      type: "case",
      id: cs.id,
      title: cs.title,
      subtitle: `قبل: ${cs.before} → بعد: ${cs.after}`,
      body: cs.strategy,
    });
  }
  return hits;
}

export const SEARCH_INDEX = buildSearchIndex();

// بحث بسيط مع scoring
export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = SEARCH_INDEX.map((h) => {
    const hay = (h.title + " " + (h.subtitle || "") + " " + (h.body || "") + " " + (h.moduleTitle || "")).toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (!hay.includes(t)) return { h, score: -1 };
      if (h.title.toLowerCase().includes(t)) score += 5;
      if ((h.subtitle || "").toLowerCase().includes(t)) score += 3;
      if ((h.body || "").toLowerCase().includes(t)) score += 1;
    }
    return { h, score };
  })
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
  return scored.map((x) => x.h);
}
