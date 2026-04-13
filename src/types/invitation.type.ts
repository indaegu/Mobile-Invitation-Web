export type AccountInfo = {
  owner: string;
  bank: string;
  accountNumber: string;
};

export type ContactPerson = {
  role: string;
  name: string;
  phone: string;
};

export type RsvpEntry = {
  name: string;
  phone: string;
  attendance: 'attending' | 'not-attending';
  adultCount?: number;
  childCount?: number;
  mealOption?: boolean;
};

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type LocationInfo = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  transport?: string;
};

export type ParentInfo = {
  father: string;
  mother: string;
};

export type InvitationData = {
  groomName: string;
  brideName: string;
  groomParents?: ParentInfo;
  brideParents?: ParentInfo;
  weddingDate: string; // "YYYY-MM-DD"
  weddingTime: string; // "HH:MM" (24h)
  greetingMessage: string;
  accounts: AccountInfo[];
  location: LocationInfo;
  images: string[];
  contacts: ContactPerson[];
  bgMusic?: string;
};
  