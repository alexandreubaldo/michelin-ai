import { Message } from "@/types/chat";

const API_URL = "http://localhost:3001/api/chat";

export async function sendMessageToClaude(messages: Message[]): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
} 