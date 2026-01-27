// 辅助函数：Fisher-Yates 乱序算法
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

const llosQuestions = [
    { id: 1, part: 'LLOS', scale: 'Intrinsic', text: '因为我喜欢使用英语。' },
    { id: 2, part: 'LLOS', scale: 'Intrinsic', text: '因为在学习英语时第一次意识到新事物会让我感到快乐。' },
    { id: 3, part: 'LLOS', scale: 'Intrinsic', text: '因为学习英语会让我产生一种兴奋愉悦的感觉。' },
    { id: 4, part: 'LLOS', scale: 'Intrinsic', text: '因为当我掌握英语中较难的结构时会感到很享受。' },
    { id: 5, part: 'LLOS', scale: 'Intrinsic', text: '因为听到英语被使用时会让我感到愉快。' },
    { id: 6, part: 'LLOS', scale: 'Intrinsic', text: '因为用英语表达会让我感到快乐。' },
    { id: 7, part: 'LLOS', scale: 'Intrinsic', text: '因为我享受学习这门语言带来的挑战。' },
    { id: 8, part: 'LLOS', scale: 'Integrated', text: '因为学习英语已经成为我是谁以及我所做事情的一部分。' },
    { id: 9, part: 'LLOS', scale: 'Integrated', text: '因为掌握英语是我身份认同的一部分。' },
    { id: 10, part: 'LLOS', scale: 'Integrated', text: '因为英语是我定义自我的重要组成部分。' },
    { id: 11, part: 'LLOS', scale: 'Integrated', text: '因为我把自己看作是能够说英语的那类人。' },
    { id: 12, part: 'LLOS', scale: 'Integrated', text: '因为会说英语对我如何看待自己而言很重要。' },
    { id: 13, part: 'LLOS', scale: 'Identified', text: '因为我认为懂一些英语是个好主意。' },
    { id: 14, part: 'LLOS', scale: 'Identified', text: '因为我选择成为一个会多种语言的人。' },
    { id: 15, part: 'LLOS', scale: 'Identified', text: '因为我认为英语对我的个人发展很重要。' },
    { id: 16, part: 'LLOS', scale: 'Identified', text: '因为英语能帮助我实现对我而言重要的目标。' },
    { id: 17, part: 'LLOS', scale: 'Identified', text: '因为说英语能让我成为一个更全面发展的人。' },
    { id: 18, part: 'LLOS', scale: 'Introjected', text: '因为我感到自己有义务学习英语。' },
    { id: 19, part: 'LLOS', scale: 'Introjected', text: '因为如果我不能用英语与英语使用者交流，我会感到羞愧。' },
    { id: 20, part: 'LLOS', scale: 'Introjected', text: '因为如果我不懂这门语言，我会感到尴尬。' },
    { id: 21, part: 'LLOS', scale: 'Introjected', text: '为了向自己证明我是一个合格的公民，因为我会说英语。' },
    { id: 22, part: 'LLOS', scale: 'Introjected', text: '因为会说英语会让我看起来更优秀。' },
    { id: 23, part: 'LLOS', scale: 'External', text: '为了获得课程学分。' },
    { id: 24, part: 'LLOS', scale: 'External', text: '因为别人要求我这样做。' },
    { id: 25, part: 'LLOS', scale: 'External', text: '为了将来能获得更体面的工作。' },
    { id: 26, part: 'LLOS', scale: 'External', text: '为了在英语考试中取得好成绩。' },
    { id: 27, part: 'LLOS', scale: 'External', text: '因为英语能帮助我将来获得更高的收入。' },
    { id: 28, part: 'LLOS', scale: 'Amotivation', text: '学习英语是在浪费时间。' },
    { id: 29, part: 'LLOS', scale: 'Amotivation', text: '学习英语不会改变任何事情。' },
    { id: 30, part: 'LLOS', scale: 'Amotivation', text: '我不明白为什么我必须学习英语。' },
    { id: 31, part: 'LLOS', scale: 'Amotivation', text: '我已经不想再学习英语了。' },
    { id: 32, part: 'LLOS', scale: 'Amotivation', text: '我不理解学习英语的意义。' }
];

const jungQuestions = [
    { id: 33, part: 'Jung', scale: 'Ne', text: '我享受自由的联想并与他人分享灵感。' },
    { id: 34, part: 'Jung', scale: 'Ne', text: '新概念总能唤起我旺盛的好奇心和探索欲。' },
    { id: 35, part: 'Jung', scale: 'Ne', text: '我的思维比较发散，常常会脱离当前的情景，转移到其他的地方。' },
    { id: 36, part: 'Jung', scale: 'Ne', text: '我常常不由自主的感受到事物之间普遍的、天然的联系。' },
    { id: 37, part: 'Jung', scale: 'Ni', text: '我常常通过直觉形成对事物气场的整体印象，并对其铭记于心。' },
    { id: 38, part: 'Jung', scale: 'Ni', text: '我经常发现自己有一些难以确切描述的模糊想法，并能够在有需要的时候回想起来。' },
    { id: 39, part: 'Jung', scale: 'Ni', text: '我擅长运用直觉，透过现象洞察到事物的本质。' },
    { id: 40, part: 'Jung', scale: 'Ni', text: '即使缺乏充足的信息或证据，我也经常能突然悟出事件的关键之处。' },
    { id: 41, part: 'Jung', scale: 'Se', text: '我喜欢亲身体验或亲自动手操作，并从中获得乐趣。' },
    { id: 42, part: 'Jung', scale: 'Se', text: '我喜欢追求直接的感官刺激和体验，包括视听体验、品味美食、体育运动等。' },
    { id: 43, part: 'Jung', scale: 'Se', text: '我是个活在当下的人，当前实实在在的体验对我最重要。' },
    { id: 44, part: 'Jung', scale: 'Se', text: '我乐于捕捉事物中局部的、细节的亮点。' },
    { id: 45, part: 'Jung', scale: 'Si', text: '我享受安稳的生活节奏和熟悉的日程安排。' },
    { id: 46, part: 'Jung', scale: 'Si', text: '我习惯用重复训练的方式来学习新事物。' },
    { id: 47, part: 'Jung', scale: 'Si', text: '我关注熟悉事物的细节变化，有不一样的地方就会感到一些本能反应。' },
    { id: 48, part: 'Jung', scale: 'Si', text: '我习惯以较为保守的视角看待事物，通常更愿意相信经过时间检验的观念。' },
    { id: 49, part: 'Jung', scale: 'Fe', text: '我喜欢主动地向他人传递友好和善意，并且希望其他人也能这样对待自己。' },
    { id: 50, part: 'Jung', scale: 'Fe', text: '我做事时会优先考虑他人的感受和需求。' },
    { id: 51, part: 'Jung', scale: 'Fe', text: '我喜欢接触他人、理解他人。' },
    { id: 52, part: 'Jung', scale: 'Fe', text: '我常常能对他人的喜怒哀乐感同身受。' },
    { id: 53, part: 'Jung', scale: 'Fi', text: '我常常回顾自己的内心感受，发掘自己的内心世界。' },
    { id: 54, part: 'Jung', scale: 'Fi', text: '我执着于内心的喜好和需求，并为此付出很多时间和精力。' },
    { id: 55, part: 'Jung', scale: 'Fi', text: '我常常感到自己内心波澜起伏、百感交集。' },
    { id: 56, part: 'Jung', scale: 'Fi', text: '我的价值判断遵循一套完全源于自己的标准，并反感别人的干涉。' },
    { id: 57, part: 'Jung', scale: 'Te', text: '我认为生活中的事情应当有客观的标准（例如能力分数，时间消耗等）。' },
    { id: 58, part: 'Jung', scale: 'Te', text: '我乐于评判事物的实用价值。' },
    { id: 59, part: 'Jung', scale: 'Te', text: '我常以效率为标准律己待人。' },
    { id: 60, part: 'Jung', scale: 'Te', text: '我做事总会把目标放在第一位。' },
    { id: 61, part: 'Jung', scale: 'Ti', text: '我常常对事物进行反复的思考和推敲。' },
    { id: 62, part: 'Jung', scale: 'Ti', text: '我看待事物时心中常保持不带感情色彩的旁观者视角。' },
    { id: 63, part: 'Jung', scale: 'Ti', text: '我喜欢问“为什么”，总想搞明白事物的运作方式。' },
    { id: 64, part: 'Jung', scale: 'Ti', text: '我常能察觉到逻辑中的不严谨之处。' }
];

const fillerQuestions = [
    { id: 65, part: 'Filler', scale: null, text: '我在社交活动后常常需要独处以回复心理能量。' },
    { id: 66, part: 'Filler', scale: null, text: '我愿意把自己的想法主动地表达出来，而不是把它们藏在内心。' },
    { id: 67, part: 'Filler', scale: null, text: '我比较在意周围环境是否整洁。' },
    { id: 68, part: 'Filler', scale: null, text: '我会留意天气变化对自己状态的影响。' },
    { id: 69, part: 'Filler', scale: null, text: '我对自己目前的作息情况基本满意。' },
    { id: 70, part: 'Filler', scale: null, text: '我通常会提前规划第二天要做的事情。' }
];

export const getQuestions = () => {
    // 前半段：LLOS 内部打乱
    const part1 = shuffle(llosQuestions);
    // 后半段：荣格内部打乱
    const part2 = shuffle(jungQuestions);
    return [...part1, ...part2];
};

export const SCALES_ORDER = [
    'Intrinsic', 'Integrated', 'Identified', 'Introjected', 'External', 'Amotivation',
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti'
];