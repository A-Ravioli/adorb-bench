import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
  model1: string;
  model2: string;
}

interface ModelResponse {
  model: string;
  creature: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are a creative kaomoji generator. Your task is to generate ONE adorable text character/kaomoji. 

Kaomoji are cute Japanese emoticons made from text characters, like:
- ٩(◕‿◕｡)۶
- (づ｡◕‿‿◕｡)づ
- ʕ•ᴥ•ʔ
- (◕‿◕✿)
- ≧◡≦
- ♡(ӦｖӦ｡)

Be creative and make something absolutely adorable! Output ONLY the kaomoji character itself, with no explanation or additional text.`;

async function generateFromModel(model: string): Promise<ModelResponse> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Adorb Bench'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: 'Generate one adorable kaomoji now!'
          }
        ],
        max_tokens: 100,
        temperature: 1.0
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const creature = data.choices?.[0]?.message?.content?.trim() || '(｡•́︿•̀｡)';
    
    return {
      model,
      creature
    };
  } catch (error) {
    console.error(`Error generating from ${model}:`, error);
    return {
      model,
      creature: '',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { model1, model2 } = body;

    if (!model1 || !model2) {
      return NextResponse.json(
        { error: 'Both model1 and model2 are required' },
        { status: 400 }
      );
    }

    // Generate from both models in parallel
    const [result1, result2] = await Promise.all([
      generateFromModel(model1),
      generateFromModel(model2)
    ]);

    return NextResponse.json({
      results: [result1, result2]
    });
  } catch (error) {
    console.error('Error in generate endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to generate creatures' },
      { status: 500 }
    );
  }
}

