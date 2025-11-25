// 辅助常量：定义数据发送给后端时的严格顺序
export const SCALES_ORDER = [
    // 荣格八维 (8个功能)
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti',
    // 可发展领域 (8个维度)
    '学习动机', '学习方式', '信息处理', '思维', '情绪', '社交沟通', '自我管理', '创造'
];

const questions = [
    {
        "id": 1,
        "text": "你更倾向于通过想象和抽象理论来理解世界，而不是通过感官的具体事实。",
        "type": "practical",
        "func_scale": "Ni",
        "func_direction": 1,
        "dev_scale": "思维",
        "dev_direction": 1
    },
	
    {
        "id": 2,
        "text": "你认为自己设定了长期目标后，总是难以严格按照计划执行。",
        "type": "practical",
        "func_scale": null,         
        "func_direction": 0,
        "dev_scale": "自我管理",   
        "dev_direction": -1
    },
	
    {
        "id": 65,
        "text": "你喜欢在周末尝试一家新的餐厅。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
];

// 将问题列表作为默认导出
export default questions;