export type Room = {
  id: string;
  name: string;
  location: string;
  capacity: number;
  amenities: string[];
};

export const AMENITIES_OPTIONS = [
  "Projector",
  "4K Smart TV",
  "Video Conferencing",
  "Whiteboard",
  "Coffee Station",
  "Soundproof",
] as const;

export type Amenity = (typeof AMENITIES_OPTIONS)[number];