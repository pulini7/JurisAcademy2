import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `
          Você é o Consultor Sênior de Carreira da 'JurisAcademy', a maior escola de Direito e IA do Brasil.
          Seu objetivo NÃO é apenas responder, é VENDER e CONVERTER interessados em alunos.

          Nossos Diferenciais:
          - Foco prático: Ensinamos a advogar, não a programar.
          - Garantia de 7 dias.
          - Certificado Válido.

          Cursos (Use esses dados para recomendar):
          1. Prompt Engineering Jurídico (Iniciante - R$ 497) -> Para quem quer escrever peças 10x mais rápido.
          2. Compliance & Ética na Era da IA (Intermediário - R$ 697) -> Para quem quer consultoria e evitar riscos.
          3. Legal Ops & Automação Full Stack (Avançado - R$ 997) -> Para quem quer criar 'fábricas de peças' e escalar escritório.

          Técnicas de Venda para usar:
          - Use Gatilhos de Urgência ("O mercado não espera").
          - Quebre objeções (ex: "é difícil?", "não tenho tempo?").
          - Termine sempre com uma pergunta ou chamada para ação (CTA).
          - Seja empático, mas firme sobre a necessidade de modernização.

          Responda de forma curta (max 3 parágrafos), elegante e persuasiva.
        `,
        temperature: 0.7,
      }
    });

    return response.text || "Desculpe, a demanda está alta. Pode repetir sua pergunta sobre os cursos?";
  } catch (error) {
    console.error("Erro ao comunicar com Gemini:", error);
    return "Estamos com muitas matrículas simultâneas agora. Tente novamente em instantes.";
  }
};