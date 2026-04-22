export type UserProfile = {
  walletAddress: string;
  name: string;
  gender: string;
  email: string;
  bio: string;
  updatedAt: string;
};

const profileStore = new Map<string, UserProfile>();

export function getProfileByWallet(walletAddress: string) {
  return profileStore.get(walletAddress.toLowerCase()) ?? null;
}

export function saveProfile(profile: UserProfile) {
  profileStore.set(profile.walletAddress.toLowerCase(), profile);
  return profile;
}
