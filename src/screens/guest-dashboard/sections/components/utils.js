export function filterUpcomingEvents(bookings) {
    const currentDate = new Date();
  
    return bookings.filter((booking) => {
      // Determine if the event is a NOMAD or HOTEL event
      const event = booking.event_type === "NOMAD" ? booking.nomad_event : booking.hotel_event;
  
      if (event && event.start_date && event.end_date) {
        // Parse dates
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
  
        // Filter for events that are either:
        // 1. Starting in the future (upcoming)
        // 2. Currently ongoing (startDate <= currentDate <= endDate)
        return startDate > currentDate || (startDate <= currentDate && endDate >= currentDate);
      }
  
      // Exclude bookings with missing or invalid event dates
      return false;
    });
  }
  