interface CustomerServiceResponse {
  response: string;
  suggestions?: string[];
  actionRequired?: {
    type: 'contact_human' | 'navigate' | 'external_link';
    data?: any;
  };
}

interface ServiceError {
  code: string;
  message: string;
}

class CustomerServiceAI {
  private readonly OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  private apiKey: string | null = null;
  private conversationHistory: Array<{role: 'user' | 'assistant'; content: string}> = [];

  constructor() {
    // 使用和食物分析相同的API Key配置
    this.apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || null;
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  clearConversation() {
    this.conversationHistory = [];
  }

  async sendMessage(userMessage: string): Promise<CustomerServiceResponse | ServiceError> {
    if (!this.apiKey) {
      return this.getMockResponse(userMessage);
    }

    try {
      // 添加用戶消息到對話歷史
      this.conversationHistory.push({
        role: 'user',
        content: userMessage
      });

      // 保持對話歷史在合理長度內
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-10);
      }

      const systemPrompt = this.createSystemPrompt();

      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory
      ];

      const response = await fetch(this.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          max_tokens: 800,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          code: 'API_ERROR',
          message: `客服AI暫時無法使用: ${errorData.error?.message || '未知錯誤'}`
        };
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        return {
          code: 'NO_RESPONSE',
          message: '客服AI沒有回應，請稍後再試'
        };
      }

      // 添加AI回應到對話歷史
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse
      });

      return this.parseAIResponse(aiResponse);

    } catch (error) {
      console.error('Customer service AI error:', error);
      return {
        code: 'NETWORK_ERROR',
        message: '網路連線問題，請檢查網路後重試'
      };
    }
  }

  private createSystemPrompt(): string {
    return `
你是「糖友善」應用程式的AI客服助手。你的任務是協助用戶解決問題和回答疑問。

應用程式介紹：
- 糖友善是專為糖尿病患者設計的飲食管理應用程式
- 提供餐廳糖友善度評分、AI食物掃描、血糖記錄等功能
- 幫助用戶做出更好的飲食選擇

回應原則：
1. 使用繁體中文回應
2. 語氣友善、專業、同理心
3. 提供具體、實用的建議
4. 如果涉及醫療問題，建議諮詢專業醫師
5. 回應長度控制在150字以內

常見問題領域：
- 應用程式功能使用說明
- 帳戶和訂閱問題
- 糖尿病飲食建議（非醫療建議）
- 餐廳評分系統說明
- AI掃描功能使用
- 技術問題排解

如果遇到以下情況，建議用戶聯繫人工客服：
- 帳戶安全問題
- 付款和退款問題
- 嚴重技術故障
- 投訴和建議

請提供清晰、有幫助的回應。
    `.trim();
  }

  private parseAIResponse(response: string): CustomerServiceResponse {
    // 檢查是否需要轉接人工客服
    const needHumanSupport = response.includes('人工客服') ||
                           response.includes('專人處理') ||
                           response.includes('技術支援');

    // 提取可能的建議
    const suggestions = this.extractSuggestions(response);

    return {
      response: response,
      suggestions,
      actionRequired: needHumanSupport ? {
        type: 'contact_human',
        data: { message: '根據您的問題，建議您聯繫人工客服獲得更詳細的協助' }
      } : undefined
    };
  }

  private extractSuggestions(response: string): string[] {
    const suggestions: string[] = [];

    // 常見建議模式
    if (response.includes('功能') || response.includes('使用')) {
      suggestions.push('查看功能教學');
    }
    if (response.includes('帳戶') || response.includes('登入')) {
      suggestions.push('帳戶設定');
    }
    if (response.includes('血糖') || response.includes('飲食')) {
      suggestions.push('健康檔案設定');
    }
    if (response.includes('餐廳') || response.includes('評分')) {
      suggestions.push('附近糖友善餐廳');
    }

    return suggestions.slice(0, 3); // 最多3個建議
  }

  // 模擬回應（當沒有API Key時使用）
  private getMockResponse(userMessage: string): CustomerServiceResponse {
    const message = userMessage.toLowerCase();

    if (message.includes('登入') || message.includes('帳戶')) {
      return {
        response: '如果您遇到登入問題，請檢查電子郵件和密碼是否正確。您也可以使用「忘記密碼」功能重設密碼。如果問題持續，建議聯繫技術支援。',
        suggestions: ['重設密碼', '帳戶設定', '聯繫客服']
      };
    }

    if (message.includes('掃描') || message.includes('ai') || message.includes('食物')) {
      return {
        response: 'AI食物掃描功能可以分析食物的營養成分和糖友善度。使用時請確保光線充足，將食物置於畫面中央。如需更準確的分析，建議在設定中配置OpenAI API Key。',
        suggestions: ['掃描教學', 'API設定', '營養分析說明']
      };
    }

    if (message.includes('血糖') || message.includes('記錄')) {
      return {
        response: '血糖記錄功能可以幫您追蹤日常血糖變化。建議每天定時記錄，並設定個人血糖目標範圍。記住，這些記錄僅供參考，請定期諮詢您的醫師。',
        suggestions: ['血糖記錄', '目標設定', '數據分析']
      };
    }

    if (message.includes('餐廳') || message.includes('評分')) {
      return {
        response: '我們的餐廳評分系統會根據菜單的糖友善程度給出評分。您可以搜尋附近餐廳，查看詳細的菜品分析。也歡迎您分享用餐體驗，幫助其他糖友做出更好的選擇。',
        suggestions: ['附近餐廳', '評分說明', '分享體驗']
      };
    }

    // 預設回應
    return {
      response: '感謝您使用糖友善！我是您的AI客服助手。我可以協助您解決使用問題，提供功能說明，或給出一般性的飲食建議。請告訴我您需要什麼協助？',
      suggestions: ['功能介紹', '使用教學', '常見問題']
    };
  }
}

export const customerServiceAI = new CustomerServiceAI();
export type { CustomerServiceResponse, ServiceError };