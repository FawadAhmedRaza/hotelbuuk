import { ProfileAvatar, Typography } from ".";

// RoomCard Component
export const RoomSelectCard = ({ room, isSelected, onSelect }) => {
  const { id, room_name, room_images, price } = room;

  return (
    <div
      onClick={() => onSelect(id)} // Handle selection
      className={`p-4 rounded-lg cursor-pointer flex flex-col items-start transition-all duration-200 border ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-300 bg-white"
      }`}
    >
      {/* Room Image */}
      {room_images?.length > 0 ? (
        <ProfileAvatar
          src={room_images[0]?.img}
          effect="blur"
          iconSize="!size-28"
          type={"server"}
          className="h-40 w-full object-cover rounded-md mb-4"
        />
      ) : (
        <div className="h-40 w-full bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <Typography className="text-gray-500">No Image</Typography>
        </div>
      )}

      {/* Room Info */}
      <Typography variant="h6" className="font-semibold mb-2">
        {room_name}
      </Typography>
      <Typography variant="body1" className="font-semibold">
        ${price} / night
      </Typography>
    </div>
  );
};
