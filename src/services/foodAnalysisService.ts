import { NutritionalInfo } from '../data/menus';

export interface FoodAnalysisResult {
  confidence: number;
  foodName: string;
  category: string;
  sugarFriendlyScore: number; // 0-10, 10 is most sugar-friendly
  healthScore: number; // 0-10, 10 is most healthy overall
  nutritionalInfo: NutritionalInfo;
  recommendations: string[];
  warnings: string[];
  diabeticAdvice: string;
  generalHealthAdvice: string;
  portionSizeAdvice: string;
  healthBenefits: string[];
}

export interface AnalysisError {
  code: string;
  message: string;
}

class FoodAnalysisService {
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private apiKey: string | null = null;

  constructor() {
    // Read from environment variables
    this.apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || null;
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
請分析這張食物圖片，並從健康和營養的角度提供詳細分析。請同時考慮一般健康人群和糖尿病患者的需求。請以下列JSON格式回覆：

{
  "confidence": 0.95,
  "foodName": "食物名稱",
  "category": "食物類別（主食/蛋白質/蔬菜/水果/飲料/甜點等）",
  "sugarFriendlyScore": 8,
  "healthScore": 7,
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
    "建議搭配蔬菜一起食用以增加纖維攝取",
    "控制份量在100-150克",
    "適合作為運動後的蛋白質補充"
  ],
  "warnings": [
    "含糖量較高，需注意血糖變化",
    "鈉含量偏高，高血壓患者需注意"
  ],
  "diabeticAdvice": "適合糖尿病患者食用，建議在餐前檢測血糖，搭配蔬菜食用可降低升糖指數",
  "generalHealthAdvice": "營養豐富，適合一般人群食用。富含蛋白質有助肌肉維護，建議搭配蔬菜均衡攝取",
  "portionSizeAdvice": "建議份量為一個拳頭大小，約150-200克",
  "healthBenefits": [
    "富含優質蛋白質，有助肌肉發展",
    "含有豐富維生素B群，支持新陳代謝",
    "提供必需胺基酸，增強免疫力"
  ]
}

分析要點：
1. confidence: 識別準確度 (0-1)
2. sugarFriendlyScore: 糖友善度評分 (0-10，10分最適合糖尿病患者)
3. healthScore: 整體健康評分 (0-10，10分最健康，考慮營養密度、加工程度等)
4. nutritionalInfo: 估算每100克的營養成分
5. recommendations: 針對所有人群的營養建議
6. warnings: 特定人群需要注意的風險提醒
7. diabeticAdvice: 糖尿病患者專業建議
8. generalHealthAdvice: 一般健康人群的建議
9. portionSizeAdvice: 建議的份量控制
10. healthBenefits: 這個食物的健康益處

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
      typeof obj.healthScore === 'number' &&
      typeof obj.nutritionalInfo === 'object' &&
      Array.isArray(obj.recommendations) &&
      Array.isArray(obj.warnings) &&
      typeof obj.diabeticAdvice === 'string' &&
      typeof obj.generalHealthAdvice === 'string' &&
      typeof obj.portionSizeAdvice === 'string' &&
      Array.isArray(obj.healthBenefits)
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
        healthScore: 5,
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
        generalHealthAdvice: '白米飯是基本的能量來源，但營養密度較低。建議選擇全穀類替代品，如糙米或五穀飯，可獲得更多纖維和營養素。',
        portionSizeAdvice: '建議每餐控制在1/3碗至半碗，約80-120克',
        healthBenefits: [
          '提供基本能量需求',
          '容易消化吸收',
          '適合運動後快速補充能量'
        ]
      },
      {
        confidence: 0.89,
        foodName: '蒸蛋豆腐',
        category: '蛋白質',
        sugarFriendlyScore: 9,
        healthScore: 8,
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
        generalHealthAdvice: '蒸蛋豆腐是營養豐富的蛋白質組合，低熱量高營養，適合各年齡層。豆腐含植物雌激素對女性健康有益，蒸蛋易消化適合老人小孩。',
        portionSizeAdvice: '一份約150-200克，相當於一個手掌大小',
        healthBenefits: [
          '提供完整胺基酸，支持肌肉合成',
          '富含鈣質，有助骨骼健康',
          '低熱量高蛋白，適合體重管理',
          '含卵磷脂，有益腦部發展'
        ]
      },
      {
        confidence: 0.85,
        foodName: '蔬菜沙拉',
        category: '蔬菜',
        sugarFriendlyScore: 10,
        healthScore: 9,
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
        generalHealthAdvice: '蔬菜沙拉是營養密度極高的食物，富含各種維生素、礦物質和抗氧化物質。建議多樣化蔬菜搭配，每天至少攝取5種不同顏色的蔬菜。',
        portionSizeAdvice: '建議每餐至少一大碗，約200-300克',
        healthBenefits: [
          '富含維生素C，增強免疫力',
          '高纖維有助消化和腸道健康',
          '含豐富抗氧化物質，延緩老化',
          '低熱量高飽足感，有助體重控制'
        ]
      }
    ];

    // Return a random mock result
    return mockResults[Math.floor(Math.random() * mockResults.length)];
  }
}

export const foodAnalysisService = new FoodAnalysisService();