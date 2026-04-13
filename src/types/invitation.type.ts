export type AccountInfo = {
  owner: string;
  bank: string;
  accountNumber: string;
};

export type AccountGroup = {
  title: string;
  items: AccountInfo[];
};

export type ContactPerson = {
  role: string;
  name: string;
  phone: string;
};

export type PersonProfile = {
  role: string;
  name: string;
  summary: string;
  tags: string[];
  image: string;
};

export type InterviewAnswer = {
  speaker: string;
  answer: string;
};

export type InterviewCard = {
  question: string;
  answers: InterviewAnswer[];
};

export type FlowerOption = {
  name: string;
  price: string;
  description: string;
};

export type RsvpEntry = {
  name: string;
  phone: string;
  attendance: "attending" | "not-attending";
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
  weddingDate: string;
  weddingTime: string;
  heroMessage: string;
  invitationTitle: string;
  invitationBody: string[];
  coupleSince: string;
  greetingMessage: string;
  heroImage: string;
  storyImages: string[];
  accounts: AccountInfo[];
  accountGroups: AccountGroup[];
  location: LocationInfo;
  images: string[];
  contacts: ContactPerson[];
  profiles: PersonProfile[];
  interviews: InterviewCard[];
  flowerMessage: string[];
  flowerOptions: FlowerOption[];
  bgMusic?: string;
};
