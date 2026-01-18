export type AccountInfo = {
    owner: string;
    bank: string;
    accountNumber: string;
  };
  
  export type LocationInfo = {
    name: string;
    lat: number;
    lng: number;
  };
  
  export type InvitationData = {
    groomName: string;
    brideName: string;
    accounts: AccountInfo[];
    location: LocationInfo;
    images: string[];
  };
  