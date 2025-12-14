export interface JoyAlbum {
  id: string;
  author: string;
  avatarUrl: string;
  message?: string;
  images: string[];
  timestamp: string;
  category: 'shoutout' | 'event' | 'classroom' | 'funny';
}
