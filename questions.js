/**
 * File: questions.js
 * 目的: 定义所有问题、计分规则和维度顺序。
 *
 * 约束：一个问题最多对一个荣格八维功能和一个可发展领域进行计分。
 *
 * func_scale: 荣格八维 ('Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti', 或 null)
 * func_direction: 计分方向 (1 = 正向, -1 = 反向, 0 或 null = 不计分)
 * dev_scale: 可发展领域 ('学习动机', '学习方式', ... , '创造', 或 null)
 * dev_direction: 计分方向 (1 = 正向, -1 = 反向, 0 或 null = 不计分)
 */

const questions = [
    // ----------------------------------------------------------------
    // 实用问题 (1-64): 示例 (请替换为您真实的 64 个问题)
    // ----------------------------------------------------------------
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
        "text": "你经常觉得，如果不亲眼看到、亲手触摸，就很难相信信息的真实性。",
        "type": "practical",
        "func_scale": "Se",         
        "func_direction": -1,       
        "dev_scale": "信息处理",   
        "dev_direction": 1          
    },
    {
        "id": 3,
        "text": "在做决定前，你倾向于先考虑这件事对所有相关人员的情感影响。",
        "type": "practical",
        "func_scale": "Fe",         
        "func_direction": 1,        
        "dev_scale": null,          
        "dev_direction": 0
    },
    {
        "id": 4,
        "text": "你认为自己设定了长期目标后，总是难以严格按照计划执行。",
        "type": "practical",
        "func_scale": null,         
        "func_direction": 0,
        "dev_scale": "自我管理",   
        "dev_direction": -1         
    },
    // ** 【请在这里补充您剩下的 60 个实用问题（ID 5 到 64）】 **
    
    // ----------------------------------------------------------------
    // 填充问题 (65-70): 不计分 (请替换为您真实的 6 个填充问题)
    // ----------------------------------------------------------------
    {
        "id": 65,
        "text": "你喜欢在周末尝试一家新的餐厅。",
        "type": "filler", // type 为 filler 的问题不会计分
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
    {
        "id": 66,
        "text": "与人交谈时，你倾向于保持目光接触。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
    {
        "id": 67,
        "text": "你认为生活中的小确幸比宏大的成功更重要。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
    {
        "id": 68,
        "text": "你通常更喜欢蓝色而不是红色。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
    {
        "id": 69,
        "text": "你喜欢在旅行前做非常详细的计划。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    },
    {
        "id": 70,
        "text": "在看电影时，你更容易被视觉效果而不是对话所吸引。",
        "type": "filler",
        "func_scale": null, "func_direction": 0,
        "dev_scale": null, "dev_direction": 0
    }
];

// ----------------------------------------------------------------
// 辅助常量：定义数据发送给后端时的严格顺序 (必须与您的 Google Sheet C:R 列顺序一致)
// ----------------------------------------------------------------
export const SCALES_ORDER = [
    // 荣格八维 (8个功能)
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti',
    // 可发展领域 (8个维度)
    '学习动机', '学习方式', '信息处理', '思维', '情绪', '社交沟通', '自我管理', '创造'
];

export default questions;