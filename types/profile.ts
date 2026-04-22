export type Profile = {
  walletAddress: string;

  name: string;

  gender: string;

  email: string;

  bio: string;

  updatedAt: string;
};

export type ProfileResponse = {
  walletAddress: string;

  profile: Profile | null;
};

export type ProfileFormValues = {
  name: string;

  gender: string;

  email: string;

  bio: string;
};
