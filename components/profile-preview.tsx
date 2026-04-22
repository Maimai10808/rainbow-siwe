import type { Profile } from "@/types/profile";

function displayValue(value?: string | null) {
  return value && value.trim() ? value : "Not set";
}

type ProfilePreviewProps = {
  profile: Profile | null;
  loading: boolean;
  onEdit: () => void;
};

export function ProfilePreview({
  profile,
  loading,
  onEdit,
}: ProfilePreviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">
          Profile Preview
        </h2>
        <div className="flex items-center gap-2">
          {loading && (
            <span className="text-xs text-slate-500">Loading...</span>
          )}
          <button
            onClick={onEdit}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="space-y-3 text-sm text-slate-700">
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs text-slate-500">Name</p>
          <p className="mt-1 font-medium">{displayValue(profile?.name)}</p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-xs text-slate-500">Gender</p>
          <p className="mt-1 font-medium">{displayValue(profile?.gender)}</p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-xs text-slate-500">Email</p>
          <p className="mt-1 break-all font-medium">
            {displayValue(profile?.email)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-xs text-slate-500">Bio</p>
          <p className="mt-1 whitespace-pre-wrap font-medium">
            {displayValue(profile?.bio)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-3">
          <p className="text-xs text-slate-500">Last updated</p>
          <p className="mt-1 font-medium">
            {profile?.updatedAt
              ? new Date(profile.updatedAt).toLocaleString()
              : "Not set"}
          </p>
        </div>
      </div>
    </div>
  );
}
