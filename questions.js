// questions.js
// 这是一个包含问卷所有问题的数组，共 50 题，分为 10 个维度。
// 评分标准: -2 (完全不同意) 到 +2 (完全同意)
// 维度 (Dimension) 用于最终得分计算。

const QUIZ_DATA = [
    // ----------------------------------------------------
    // 维度一：学习动机
    // ----------------------------------------------------
    {
        id: 1,
        question: "我在学习新知识时通常感到很强的动力。",
        dimension: "学习动机",
        isReversed: false
    },
    {
        id: 2,
        question: "我经常因为好奇而主动探索自己不熟悉的主题。",
        dimension: "学习动机",
        isReversed: false
    },
    {
        id: 3,
        question: "当我对某个学科感兴趣时，我可以长时间专注学习。",
        dimension: "学习动机",
        isReversed: false
    },
    {
        id: 4,
        question: "即使遇到困难，我仍会保持对学习任务的兴趣。",
        dimension: "学习动机",
        isReversed: false
    },
    {
        id: 5,
        question: "我会因为对知识的好奇而尝试新的学习方法或工具。",
        dimension: "学习动机",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度二：学习方式
    // ----------------------------------------------------
    {
        id: 6,
        question: "我在学习新知识时，倾向于使用多种学习方式（例如阅读、实践、讨论等）。",
        dimension: "学习方式",
        isReversed: false
    },
    {
        id: 7,
        question: "我能够快速掌握和应用新的技术或工具来支持我的学习。",
        dimension: "学习方式",
        isReversed: false
    },
    {
        id: 8,
        question: "我喜欢将不同学科的知识结合起来，以解决复杂的问题。",
        dimension: "学习方式",
        isReversed: false
    },
    {
        id: 9,
        question: "我在学习时能够构建清晰的知识体系，将信息有条理地组织起来。",
        dimension: "学习方式",
        isReversed: false
    },
    {
        id: 10,
        question: "我能够理解并执行复杂的指令或任务，而不会感到困惑。",
        dimension: "学习方式",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度三：信息处理
    // ----------------------------------------------------
    {
        id: 11,
        question: "我能够将学到的知识灵活应用到新的问题或情境中。",
        dimension: "信息处理",
        isReversed: false
    },
    {
        id: 12,
        question: "我在接收大量信息时，能够快速抓住核心内容。",
        dimension: "信息处理",
        isReversed: false
    },
    {
        id: 13,
        question: "我能够有效地过滤掉无关或冗余的信息。",
        dimension: "信息处理",
        isReversed: false
    },
    {
        id: 14,
        question: "我能够敏锐地感知学习环境的变化，并相应调整自己的学习策略。",
        dimension: "信息处理",
        isReversed: false
    },
    {
        id: 15,
        question: "我的记忆更容易偏向那些与自己兴趣或经验相关的信息。",
        dimension: "信息处理",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度四：思维
    // ----------------------------------------------------
    {
        id: 16,
        question: "我能够快速从复杂信息中提取核心概念并预测可能的发展趋势。",
        dimension: "思维",
        isReversed: false
    },
    {
        id: 17,
        question: "当同时面对多项任务时，我可以有效地在不同任务之间切换注意力而不丢失重要信息。",
        dimension: "思维",
        isReversed: false
    },
    {
        id: 18,
        question: "我在面对问题时倾向于系统性分析，综合各种因素后再做决策。",
        dimension: "思维",
        isReversed: false
    },
    {
        id: 19,
        question: "我在做决策时，能够合理平衡理想目标与现实限制，并考虑潜在风险。",
        dimension: "思维",
        isReversed: false
    },
    {
        id: 20,
        question: "我在遵守规则的同时，也会尝试打破常规，以寻找更有效的解决方案。",
        dimension: "思维",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度五：情绪
    // ----------------------------------------------------
    {
        id: 21,
        question: "我能够在遇到压力时迅速调整自己的情绪状态。",
        dimension: "情绪",
        isReversed: false
    },
    {
        id: 22,
        question: "当面对困难任务时，我通常能够保持冷静并找到解决方法。",
        dimension: "情绪",
        isReversed: false
    },
    {
        id: 23,
        question: "我能清楚地识别自己和他人的情绪变化。",
        dimension: "情绪",
        isReversed: false
    },
    {
        id: 24,
        question: "在经历负面情绪后，我能够较快恢复到正常状态。",
        dimension: "情绪",
        isReversed: false
    },
    {
        id: 25,
        question: "我在独处时能够保持愉快和自主的心态，而不会感到过度焦虑或无助。",
        dimension: "情绪",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度六：社交沟通
    // ----------------------------------------------------
    {
        id: 26,
        question: "我更喜欢通过面对面交流而不是书面或线上方式进行沟通。",
        dimension: "社交沟通",
        isReversed: false
    },
    {
        id: 27,
        question: "在团队任务中，我通常愿意主动承担协调和组织的角色。",
        dimension: "社交沟通",
        isReversed: false
    },
    {
        id: 28,
        question: "我认为我在表达自己的想法时能够让别人轻松理解。",
        dimension: "社交沟通",
        isReversed: false
    },
    {
        id: 29,
        question: "我在与他人相处时能够清楚地界定自己的界限并加以维护。",
        dimension: "社交沟通",
        isReversed: false
    },
    {
        id: 30,
        question: "我在社交互动中能够保持专注倾听，并在必要时适当恢复自己的精力。",
        dimension: "社交沟通",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度七：自我管理
    // ----------------------------------------------------
    {
        id: 31,
        question: "我通常能按计划高效完成日常任务。",
        dimension: "自我管理",
        isReversed: false
    },
    {
        id: 32,
        question: "我能够自觉坚持既定的工作或学习习惯，而不需要他人监督。",
        dimension: "自我管理",
        isReversed: false
    },
    {
        id: 33,
        question: "我能够合理安排时间，避免临时抱佛脚或拖延。",
        dimension: "自我管理",
        isReversed: false
    },
    {
        id: 34,
        question: "我在开始一个新任务时能够迅速进入状态并持续推进。",
        dimension: "自我管理",
        isReversed: false
    },
    {
        id: 35,
        question: "我能够有效利用可用资源（如工具、信息、人力）完成工作或生活目标。",
        dimension: "自我管理",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度八：创造
    // ----------------------------------------------------
    {
        id: 36,
        question: "我喜欢尝试新的方法或思路来解决问题。",
        dimension: "创造",
        isReversed: false
    },
    {
        id: 37,
        question: "我经常对未知事物或新领域感到好奇。",
        dimension: "创造",
        isReversed: false
    },
    {
        id: 38,
        question: "我能够长期保持对自己感兴趣的事情的热情。",
        dimension: "创造",
        isReversed: false
    },
    {
        id: 39,
        question: "我对艺术、美学或美的事物有敏感的感受力。",
        dimension: "创造",
        isReversed: false
    },
    {
        id: 40,
        question: "我更倾向于接受新奇和创新的事物，而不是完全遵循传统做法。",
        dimension: "创造",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度九：价值观
    // ----------------------------------------------------
    {
        id: 41,
        question: "我在做决定时会优先考虑自己认为最重要的价值观。",
        dimension: "价值观",
        isReversed: false
    },
    {
        id: 42,
        question: "我希望自己在生活或工作中比周围的人更优秀或更成功。",
        dimension: "价值观",
        isReversed: false
    },
    {
        id: 43,
        question: "我通常会明确知道自己在不同情境下的价值取向。",
        dimension: "价值观",
        isReversed: false
    },
    {
        id: 44,
        question: "我认为追求个人优势或卓越是生活中重要的一部分。",
        dimension: "价值观",
        isReversed: false
    },
    {
        id: 45,
        question: "我在面对冲突或选择时，会以自己的核心价值观作为指导。",
        dimension: "价值观",
        isReversed: false
    },

    // ----------------------------------------------------
    // 维度十：适应力
    // ----------------------------------------------------
    {
        id: 46,
        question: "我能够在面对新的情况或环境时迅速调整自己的计划。",
        dimension: "适应力",
        isReversed: false
    },
    {
        id: 47,
        question: "当必须做出决策时，我能够有效地权衡不同信息并快速作出选择。",
        dimension: "适应力",
        isReversed: false
    },
    {
        id: 48,
        question: "遇到失败或挫折时，我能较快从中恢复并继续前进。",
        dimension: "适应力",
        isReversed: false
    },
    {
        id: 49,
        question: "面对不确定性，我通常能够保持冷静并找到可行的解决方案。",
        dimension: "适应力",
        isReversed: false
    },
    {
        id: 50,
        question: "我善于整合不同来源的信息来形成清晰的判断或行动方案。",
        dimension: "适应力",
        isReversed: false
    }
];