"use client";

import { useActionState, useEffect, startTransition } from "react";
import { useSession } from "next-auth/react";
import { AMENITIES_OPTIONS } from "@/types/room";
import type { Room } from "@/types/room";
import { RoomActionState, createRoomAction } from "@/actions/rooms.actions";

type Props = {
    onClose: () => void;
    editRoom?: Room; // pass to pre-fill for edit mode
};

const initialState: RoomActionState = {};

export function RoomFormModal({ onClose, editRoom }: Props) {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const isEdit = !!editRoom;

    const [state, formAction, isPending] = useActionState(
        (prev: RoomActionState, formData: FormData) =>
            createRoomAction(prev, formData, token),
        initialState
    );

    // Close on success
    useEffect(() => {
        if (state.success) onClose();
    }, [state.success, onClose]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
    }

    return (
        <div className="fixed inset-0 z-[100] bg-on-surface/30 backdrop-blur-sm flex items-center justify-center p-gutter">
            <div className="bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-xl py-lg border-b border-outline-variant/30 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                            {isEdit ? "Edit Room" : "Add New Meeting Room"}
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                            {isEdit
                                ? "Update the room details below."
                                : "Enter the details of the new facility to add it to the inventory."}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-sm hover:bg-surface-container rounded-full transition-colors text-on-surface-variant"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto px-xl py-lg flex-1">
                    <form
                        id="room-form"
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-lg gap-y-lg"
                    >
                        {/* Error */}
                        {state.error && (
                            <div className="col-span-full flex items-center gap-sm bg-error-container text-on-error-container rounded-lg px-md py-sm text-body-sm">
                                <span className="material-symbols-outlined text-[18px] shrink-0">
                                    error
                                </span>
                                {state.error}
                            </div>
                        )}

                        {/* Room Name */}
                        <div className="col-span-full space-y-xs">
                            <label
                                htmlFor="name"
                                className="font-label-md text-label-md text-on-surface"
                            >
                                Room Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="e.g., Sky Lounge"
                                defaultValue={editRoom?.name}
                                required
                                className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-xs">
                            <label
                                htmlFor="location"
                                className="font-label-md text-label-md text-on-surface"
                            >
                                Location
                            </label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                placeholder="e.g., Mumbai"
                                defaultValue={editRoom?.location}
                                required
                                className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
                            />
                        </div>

                        {/* Capacity */}
                        <div className="space-y-xs">
                            <label
                                htmlFor="capacity"
                                className="font-label-md text-label-md text-on-surface"
                            >
                                Capacity
                            </label>
                            <input
                                id="capacity"
                                name="capacity"
                                type="number"
                                min={1}
                                placeholder="e.g., 10"
                                defaultValue={editRoom?.capacity}
                                required
                                className="w-full h-12 px-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md text-body-md"
                            />
                        </div>

                        {/* Amenities */}
                        <div className="col-span-full space-y-md">
                            <label className="font-label-md text-label-md text-on-surface">
                                Amenities
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-sm">
                                {AMENITIES_OPTIONS.map((amenity) => {
                                    const checked = editRoom?.amenities.includes(amenity);
                                    return (
                                        <label
                                            key={amenity}
                                            className="flex items-center gap-sm p-sm border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors group"
                                        >
                                            <input
                                                type="checkbox"
                                                name="amenities"
                                                value={amenity}
                                                defaultChecked={checked}
                                                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer"
                                            />
                                            <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                                                {amenity}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Facility standards note */}
                        <div className="col-span-full rounded-xl bg-surface-container p-md flex items-center gap-md border border-outline-variant/50">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-[20px]">
                                    info
                                </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                                All new rooms must comply with the corporate "Clean Workspace"
                                policy and provide at least 2 power outlets per seat.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="px-xl py-lg bg-surface-container-lowest border-t border-outline-variant/30 flex flex-row-reverse gap-md shrink-0">
                    <button
                        type="submit"
                        form="room-form"
                        disabled={isPending}
                        className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md px-lg h-11 rounded-lg transition-all active:scale-[0.98] shadow-sm flex items-center gap-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Processing...
                            </>
                        ) : isEdit ? (
                            "Save Changes"
                        ) : (
                            "Create Room"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="bg-transparent hover:bg-surface-container border border-outline-variant text-on-surface-variant font-label-md text-label-md px-lg h-11 rounded-lg transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
}