export interface Post {
  userId: string
  postId: string
  createdAt: string
  caption: string
  isPublic: string
  attachmentUrl?: string
  increment: number
  decrement: number
}
