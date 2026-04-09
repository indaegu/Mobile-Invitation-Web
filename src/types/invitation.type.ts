export type AccountInfo = {
  owner: string;
  bank: string;
  accountNumber: string;
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
};
  