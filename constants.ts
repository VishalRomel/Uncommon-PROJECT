import { JoyAlbum } from './types';

// Using consistent seeds for picsum to get reproducible images
export const MOCK_ALBUMS: JoyAlbum[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
    message: 'Huge shoutout to the 3rd grade team for organizing the science fair! The kids loved the volcano experiments.',
    images: [
      'https://picsum.photos/seed/science1/600/400',
      'https://picsum.photos/seed/science2/600/400',
      'https://picsum.photos/seed/science3/600/400',
      'https://picsum.photos/seed/science4/600/400'
    ],
    timestamp: '2 hours ago',
    category: 'event'
  },
  {
    id: '2',
    author: 'Mr. Davis',
    avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
    message: 'Found this gem from the field trip yesterday. Pure joy on their faces!',
    images: [
      'https://picsum.photos/seed/trip1/600/400'
    ],
    timestamp: '5 hours ago',
    category: 'shoutout'
  },
  {
    id: '3',
    author: 'Principal Clark',
    avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
    message: 'Staff appreciation breakfast was a hit. Thank you specifically to the ops team for the bagels!',
    images: [
      'https://picsum.photos/seed/breakfast1/600/400',
      'https://picsum.photos/seed/breakfast2/600/400',
      'https://picsum.photos/seed/breakfast3/600/400',
      'https://picsum.photos/seed/breakfast4/600/400',
      'https://picsum.photos/seed/breakfast5/600/400'
    ],
    timestamp: '1 day ago',
    category: 'event'
  },
  {
    id: '4',
    author: 'Ms. Rodriguez',
    avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
    message: 'Just a quiet moment of reading in 4B. They are so focused!',
    images: [
      'https://picsum.photos/seed/reading1/600/400',
      'https://picsum.photos/seed/reading2/600/400'
    ],
    timestamp: '1 day ago',
    category: 'classroom'
  },
  {
    id: '5',
    author: 'Coach Mike',
    avatarUrl: 'https://picsum.photos/seed/avatar5/100/100',
    message: 'Basketball team practice going strong. Hard work pays off.',
    images: [
      'https://picsum.photos/seed/bball1/600/400'
    ],
    timestamp: '2 days ago',
    category: 'event'
  },
  {
    id: '6',
    author: 'Art Dept',
    avatarUrl: 'https://picsum.photos/seed/avatar6/100/100',
    message: 'Look at these murals! The hallway looks amazing.',
    images: [
      'https://picsum.photos/seed/art1/600/400',
      'https://picsum.photos/seed/art2/600/400',
      'https://picsum.photos/seed/art3/600/400'
    ],
    timestamp: '2 days ago',
    category: 'classroom'
  },
  {
    id: '7',
    author: 'Ops Team',
    avatarUrl: 'https://picsum.photos/seed/avatar7/100/100',
    message: 'New books have arrived!',
    images: [
      'https://picsum.photos/seed/books/600/400'
    ],
    timestamp: '3 days ago',
    category: 'shoutout'
  },
  {
    id: '8',
    author: 'Nurse T',
    avatarUrl: 'https://picsum.photos/seed/avatar8/100/100',
    message: 'Stay healthy everyone!',
    images: [
      'https://picsum.photos/seed/health/600/400'
    ],
    timestamp: '3 days ago',
    category: 'shoutout'
  },
  {
    id: '9',
    author: 'Music Class',
    avatarUrl: 'https://picsum.photos/seed/avatar9/100/100',
    images: [
      'https://picsum.photos/seed/music1/600/400',
      'https://picsum.photos/seed/music2/600/400'
    ],
    timestamp: '4 days ago',
    category: 'classroom'
  },
  {
    id: '10',
    author: 'Recess Duty',
    avatarUrl: 'https://picsum.photos/seed/avatar10/100/100',
    message: 'Sunny days are the best days.',
    images: [
      'https://picsum.photos/seed/sun/600/400'
    ],
    timestamp: '4 days ago',
    category: 'funny'
  },
  {
    id: '11',
    author: 'Uncommon Admin',
    avatarUrl: 'https://picsum.photos/seed/avatar11/100/100',
    message: 'Remembering our core values today.',
    images: [
      'https://picsum.photos/seed/values/600/400',
      'https://picsum.photos/seed/values2/600/400'
    ],
    timestamp: '5 days ago',
    category: 'shoutout'
  },
   {
    id: '12',
    author: 'Cafeteria Staff',
    avatarUrl: 'https://picsum.photos/seed/avatar12/100/100',
    message: 'Taco Tuesday was a massive success.',
    images: [
      'https://picsum.photos/seed/taco/600/400'
    ],
    timestamp: '5 days ago',
    category: 'funny'
  },
  {
    id: '13',
    author: 'Ms. K',
    avatarUrl: 'https://picsum.photos/seed/avatar13/100/100',
    message: 'Dance rehearsal is looking FIRE!',
    images: [
      'https://picsum.photos/seed/dance1/600/400',
      'https://picsum.photos/seed/dance2/600/400',
      'https://picsum.photos/seed/dance3/600/400'
    ],
    timestamp: '6 days ago',
    category: 'event'
  },
  {
    id: '14',
    author: 'History Dept',
    avatarUrl: 'https://picsum.photos/seed/avatar14/100/100',
    message: 'Museum visit!',
    images: [
      'https://picsum.photos/seed/history1/600/400',
      'https://picsum.photos/seed/history2/600/400'
    ],
    timestamp: '1 week ago',
    category: 'classroom'
  },
  {
    id: '15',
    author: 'Dean of Students',
    avatarUrl: 'https://picsum.photos/seed/avatar15/100/100',
    message: 'Community Circle was powerful today.',
    images: [
      'https://picsum.photos/seed/circle/600/400'
    ],
    timestamp: '1 week ago',
    category: 'shoutout'
  }
];
