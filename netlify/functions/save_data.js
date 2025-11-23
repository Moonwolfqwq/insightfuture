// ✅ 修正后的代码：正确导入 google 顶级对象
// 必须确保您的 package.json 中包含 "googleapis" 依赖
const { google } = require('googleapis'); 

// 导入环境变量
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

/**
 * 初始化 Google Sheets 客户端并进行身份验证
 */
async function getSheetClient() {
    // ⚠️ 修正：使用 google.auth.JWT 进行身份验证
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
        
        // 确保私钥中的换行符正确处理
        key: process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'), 
        
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    await auth.authorize();
    
    // ⚠️ 修正：使用 google.sheets({ auth, version: 'v4' }) 获取客户端
    return google.sheets({ auth, version: 'v4' });
}

// Netlify Function 的入口点
exports.handler = async (event, context) => {
    // 检查请求方法是否为 POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        // 解析前端发送的 JSON 数据
        const body = JSON.parse(event.body);
        const username = body.username || 'Anonymous';
        const scores = body.scores; // 这是一个包含 { dimension: score } 的对象
        const timestamp = new Date().toISOString();

        // 验证数据完整性
        if (!scores || typeof scores !== 'object') {
            return { statusCode: 400, body: 'Missing or invalid scores data.' };
        }

        // 获取经过身份验证的 Google Sheets 客户端
        const sheets = await getSheetClient();
        const dataRows = [];
        
        // 将分数对象转换为 Google Sheets 需要的行格式
        for (const dimension in scores) {
            if (scores.hasOwnProperty(dimension)) {
                // 每行格式：[Timestamp, Username, Dimension, Score]
                dataRows.push([
                    timestamp,
                    username,
                    dimension,
                    scores[dimension] // 假设这是分数数据
                ]);
            }
        }

        // 将数据附加到 Google Sheet 的 "Sheet1" 表格中
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:D', // 假设您的数据从 A 到 D 列
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: dataRows,
            },
        });

        console.log(`Successfully appended ${result.data.updates.updatedCells} cells.`);

        // 返回成功响应
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Results saved to Google Sheets.', timestamp }),
        };

    } catch (error) {
        console.error('Error saving data:', error);
        // 返回详细错误信息，有助于调试
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Internal Server Error', 
                details: error.message 
            }),
        };
    }
};