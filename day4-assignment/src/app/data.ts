export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

 const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Coffee, Apples',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Project Ideas',
    content: '1. Build a note taking app\n2. Create a habit tracker\n3. Design a personal portfolio',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Meeting Notes - UI/UX Sync',
    content: 'Discussed the new design system. Need to follow up with the design team regarding the primary color palette and typography choices.',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Books to Read',
    content: '- The Pragmatic Programmer\n- Clean Code\n- Design Patterns\n- Refactoring',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  }
];

export default MOCK_NOTES;
