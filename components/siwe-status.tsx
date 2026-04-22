"use client";

import { signOut, useSession } from "next-auth/react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

import { ProfileForm } from "@/components/profile-form";

import { ProfilePreview } from "@/components/profile-preview";

import { useProfile } from "@/hooks/use-profile";

import type { ProfileFormValues } from "@/types/profile";

export function SiweStatus() {
  const { address, chainId, isConnected } = useAccount();

  const { data: session, status } = useSession();

  const isSignedIn = Boolean(session?.user?.name);

  const {
    savedProfile,

    loadingProfile,

    savingProfile,

    message,

    isEditing,

    saveProfile,

    startEdit,

    cancelEdit,
  } = useProfile({ isSignedIn });

  async function handleSubmit(values: ProfileFormValues) {
    await saveProfile(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              SIWE Profile Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in with your wallet, then manage your profile settings.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
              <ConnectButton />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">
              Wallet & Session
            </h2>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Wallet connected</p>

                <p className="mt-1 font-medium">{isConnected ? "Yes" : "No"}</p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Address</p>

                <p className="mt-1 break-all font-medium">
                  {address ?? "Not connected"}
                </p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Chain ID</p>

                <p className="mt-1 font-medium">{chainId ?? "N/A"}</p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Session status</p>

                <p className="mt-1 font-medium">{status}</p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-xs text-slate-500">Authenticated address</p>

                <p className="mt-1 break-all font-medium">
                  {session?.user?.name ?? "Not signed in"}
                </p>
              </div>
            </div>
          </div>

          {isSignedIn && (
            <>
              <div className="mt-6">
                <ProfilePreview
                  profile={savedProfile}
                  loading={loadingProfile}
                  onEdit={startEdit}
                />
              </div>

              {isEditing && (
                <ProfileForm
                  initialProfile={savedProfile}
                  saving={savingProfile}
                  message={message}
                  onSubmit={handleSubmit}
                  onCancel={cancelEdit}
                />
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => signOut()}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
