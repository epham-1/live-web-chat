export interface ChatMessage{
  username: string,
  content: string,
  room: string
}

export interface ChatMessageResponse{
  username: string,
  content: string,
  room: string,
  type: string
}
