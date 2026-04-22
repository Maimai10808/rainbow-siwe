"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Profile, ProfileFormValues } from "@/types/profile";

type ProfileFormProps = {
  initialProfile: Profile | null;
  saving: boolean;
  message: string;
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  onCancel: () => void;
};

export function ProfileForm({
  initialProfile,
  saving,
  message,
  onSubmit,
  onCancel,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: "",
      gender: "",
      email: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (initialProfile) {
      reset({
        name: initialProfile.name ?? "",
        gender: initialProfile.gender ?? "",
        email: initialProfile.email ?? "",
        bio: initialProfile.bio ?? "",
      });
      return;
    }

    reset({
      name: "",
      gender: "",
      email: "",
      bio: "",
    });
  }, [initialProfile, reset]);

  async function submit(values: ProfileFormValues) {
    await onSubmit(values);

    reset({
      name: "",
      gender: "",
      email: "",
      bio: "",
    });
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-slate-900">
        Edit Profile
      </h2>

      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            {...register("name", {
              maxLength: {
                value: 50,
                message: "Name must be at most 50 characters.",
              },
            })}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Gender
          </label>
          <select
            {...register("gender")}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Bio
          </label>
          <textarea
            {...register("bio", {
              maxLength: {
                value: 300,
                message: "Bio must be at most 300 characters.",
              },
            })}
            placeholder="Write something about yourself"
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400"
          />
          {errors.bio && (
            <p className="text-xs text-red-500">{errors.bio.message}</p>
          )}
        </div>

        {message && (
          <div className="md:col-span-2 rounded-xl bg-white px-4 py-3 text-sm text-slate-700">
            {message}
          </div>
        )}

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
