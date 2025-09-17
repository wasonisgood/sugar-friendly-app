import { NutritionalInfo } from '../data/menus';

export interface FoodAnalysisResult {
  confidence: number;
  foodName: string;
  category: string;
  sugarFriendlyScore: number; // 0-10, 10 is most sugar-friendly
  nutritionalInfo: NutritionalInfo;
  recommendations: string[];
  warnings: string[];
  diabeticAdvice: string;
  portionSizeAdvice: string;
}

export interface AnalysisError {
  code: string;
  message: string;
}

class FoodAnalysisService {
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private apiKey: string | null = null;

  constructor() {
    // In a real app, you'd get this from environment variables or secure storage
    // For demo purposes, we'll use a placeholder
    this.apiKey = process.env.OPENAI_API_KEY || null;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async analyzeFood(imageBase64: string): Promise<FoodAnalysisResult | AnalysisError> {
    if (!this.apiKey) {
      return {
        code: 'API_KEY_MISSING',
        message: 'OpenAI API key is not configured. Please set it in the app settings.'
      };
    }

    try {
      const prompt = this.createAnalysisPrompt();

      const response = await fetch(this.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: `data:image/jpeg;base64,${imageBase64}`,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          code: 'API_ERROR',
          message: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`
        };
      }

      const data = await response.json();
      const analysisText = data.choices[0]?.message?.content;

      if (!analysisText) {
        return {
          code: 'NO_RESPONSE',
          message: 'No analysis received from OpenAI'
        };
      }

      return this.parseAnalysisResponse(analysisText);

    } catch (error) {
      console.error('Food analysis error:', error);
      return {
        code: 'NETWORK_ERROR',
        message: 'Failed to connect to analysis service'
      };
    }
  }

  private createAnalysisPrompt(): string {
    return `
請分析這張食物圖片，並以糖尿病患者的角度提供詳細分析。請以下列JSON格式回覆：

{
  "confidence": 0.95,
  "foodName": "食物名稱",
  "category": "食物類別（主食/蛋白質/蔬菜/水果/飲料/甜點等）",
  "sugarFriendlyScore": 8,
  "nutritionalInfo": {
    "calories": 250,
    "carbs": 30,
    "sugar": 5,
    "protein": 15,
    "fat": 8,
    "fiber": 4,
    "sodium": 300
  },
  "recommendations": [
    "建議搭配蔬菜一起食用",
    "控制份量在100-150克"
  ],
  "warnings": [
    "含糖量較高，需注意血糖變化"
  ],
  "diabeticAdvice": "適合糖尿病患者食用，建議在餐前檢測血糖",
  "portionSizeAdvice": "建議份量為一個拳頭大小"
}

分析要點：
1. confidence: 識別準確度 (0-1)
2. sugarFriendlyScore: 糖友善度評分 (0-10，10分最適合糖尿病患者)
3. nutritionalInfo: 估算每100克的營養成分
4. recommendations: 針對糖尿病患者的飲食建議
5. warnings: 需要注意的風險提醒
6. diabeticAdvice: 糖尿病專業建議
7. portionSizeAdvice: 建議的份量控制

請務必以JSON格式回覆，不要包含其他文字。
    `.trim();
  }

  private parseAnalysisResponse(responseText: string): FoodAnalysisResult | AnalysisError {
    try {
      // Clean the response text to extract JSON
      const cleanedResponse = responseText.trim();
      let jsonStr = cleanedResponse;

      // Remove markdown code blocks if present
      if (jsonStr.startsWith('```json')) {
        jsonStr = jsonStr.replace(/```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonStr.startsWith('```')) {
        jsonStr = jsonStr.replace(/```\n?/, '').replace(/\n?```$/, '');
      }

      const parsed = JSON.parse(jsonStr);

      // Validate the parsed response
      if (!this.isValidAnalysisResult(parsed)) {
        return {
          code: 'INVALID_RESPONSE',
          message: 'Invalid analysis format received'
        };
      }

      return parsed as FoodAnalysisResult;

    } catch (error) {
      console.error('Parse error:', error);
      return {
        code: 'PARSE_ERROR',
        message: 'Failed to parse analysis response'
      };
    }
  }

  private isValidAnalysisResult(obj: any): boolean {
    return (
      typeof obj === 'object' &&
      typeof obj.confidence === 'number' &&
      typeof obj.foodName === 'string' &&
      typeof obj.category === 'string' &&
      typeof obj.sugarFriendlyScore === 'number' &&
      typeof obj.nutritionalInfo === 'object' &&
      Array.isArray(obj.recommendations) &&
      Array.isArray(obj.warnings) &&
      typeof obj.diabeticAdvice === 'string' &&
      typeof obj.portionSizeAdvice === 'string'
    );
  }

  // Fallback method for demo/testing when API is not available
  async getMockAnalysis(imageUri: string): Promise<FoodAnalysisResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockResults: FoodAnalysisResult[] = [
      {
        confidence: 0.92,
        foodName: '白米飯',
        category: '主食',
        sugarFriendlyScore: 4,
        nutritionalInfo: {
          calories: 130,
          carbs: 28,
          sugar: 0.1,
          protein: 2.7,
          fat: 0.3,
          fiber: 0.4,
          sodium: 1
        },
        recommendations: [
          '建議換成糙米飯或五穀飯',
          '控制份量在半碗以內',
          '搭配高纖蔬菜一起食用'
        ],
        warnings: [
          '精製澱粉會快速升高血糖',
          'GI值較高，需特別注意'
        ],
        diabeticAdvice: '白米飯的升糖指數較高，建議糖尿病患者選擇糙米飯或減少份量，並搭配蛋白質和蔬菜一起食用以減緩血糖上升速度。',
        portionSizeAdvice: '建議每餐控制在1/3碗至半碗，約80-120克'
      },
      {
        confidence: 0.89,
        foodName: '蒸蛋豆腐',
        category: '蛋白質',
        sugarFriendlyScore: 9,
        nutritionalInfo: {
          calories: 95,
          carbs: 5,
          sugar: 2,
          protein: 12,
          fat: 4,
          fiber: 2,
          sodium: 300
        },
        recommendations: [
          '優質蛋白質來源，適合糖尿病患者',
          '可以增加蔬菜配菜',
          '注意調味料的使用'
        ],
        warnings: [
          '注意醬油等調味料的鈉含量'
        ],
        diabeticAdvice: '豆腐是優質的植物蛋白質，對血糖影響小，非常適合糖尿病患者。蒸蛋提供優質動物蛋白，兩者搭配營養均衡。',
        portionSizeAdvice: '一份約150-200克，相當於一個手掌大小'
      },
      {
        confidence: 0.85,
        foodName: '蔬菜沙拉',
        category: '蔬菜',
        sugarFriendlyScore: 10,
        nutritionalInfo: {
          calories: 120,
          carbs: 12,
          sugar: 8,
          protein: 4,
          fat: 8,
          fiber: 6,
          sodium: 200
        },
        recommendations: [
          '豐富的維生素和纖維',
          '可增加堅果提升營養價值',
          '選擇橄欖油醋汁醬料'
        ],
        warnings: [
          '注意沙拉醬的選擇，避免高糖醬料'
        ],
        diabeticAdvice: '蔬菜沙拉是糖尿病患者的理想選擇，豐富的纖維質有助於穩定血糖，建議每餐都要攝取足夠的蔬菜。',
        portionSizeAdvice: '建議每餐至少一大碗，約200-300克'
      }
    ];

    // Return a random mock result
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  }
}

export const foodAnalysisService = new FoodAnalysisService();