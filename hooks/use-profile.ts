"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  Profile,
  ProfileFormValues,
  ProfileResponse,
} from "@/types/profile";

type UseProfileOptions = {
  isSignedIn: boolean;
};

export function useProfile({ isSignedIn }: UseProfileOptions) {
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!isSignedIn) {
      setSavedProfile(null);
      setIsEditing(false);
      return;
    }

    setLoadingProfile(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load profile");
      }

      const data: ProfileResponse = await res.json();
      setSavedProfile(data.profile ?? null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load profile.");
    } finally {
      setLoadingProfile(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile();
  }, [loadProfile]);

  async function saveProfile(values: ProfileFormValues) {
    if (!isSignedIn) return null;

    setSavingProfile(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to save profile");
      }

      setSavedProfile(data.profile);
      setMessage("Profile saved successfully.");
      setIsEditing(false);

      return data.profile as Profile;
    } catch (error) {
      console.error(error);
      setMessage("Failed to save profile.");
      return null;
    } finally {
      setSavingProfile(false);
    }
  }

  function startEdit() {
    setIsEditing(true);
    setMessage("");
  }

  function cancelEdit() {
    setIsEditing(false);
    setMessage("");
  }

  return {
    savedProfile,
    loadingProfile,
    savingProfile,
    message,
    isEditing,
    loadProfile,
    saveProfile,
    startEdit,
    cancelEdit,
    setMessage,
  };
}
