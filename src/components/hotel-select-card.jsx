const { ProfileAvatar, Typography } = require(".");

// HotelCard Component
export const HotelSelectCard = ({ hotel, isSelected, onSelect }) => {
  const { id, hotel_name, hotel_image } = hotel;

  return (
    <div
      onClick={() => onSelect(id)} // Handle selection
      className={`p-4 rounded-lg cursor-pointer flex flex-col items-start transition-all duration-200 border ${
        isSelected
          ? "border-blue-500 bg-blue-50 shadow-lg"
          : "border-gray-300 bg-white"
      }`}
    >
      {/* Hotel Image */}
      {hotel_image && (
        <ProfileAvatar
          src={hotel_image}
          effect="blur"
          iconSize="!size-28"
          type={"server"}
          className="h-40 w-full object-cover rounded-md mb-4"
        />
      )}

      {/* Hotel Info */}
      <Typography variant="h6" className="font-semibold mb-2">
        {hotel_name}
      </Typography>
    </div>
  );
};
