// DEPRECATED: This service was insecure as it exposed keys on the client.
// Please use the server-side API at /api/chat implemented in app/api/chat/route.ts
// The ChatService class is kept here only to prevent import errors in legacy code, 
// but it will throw errors if used.

export class ChatService {
  constructor() {}

  startChat() {
    console.warn("Client-side chat is deprecated.");
  }

  async sendMessage(message: string): Promise<string> {
    throw new Error("Client-side Gemini calls are disabled for security. Use the Assistant component which calls /api/chat.");
  }
}

export const chatService = new ChatService();