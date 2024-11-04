export const formatDate = (updatedAt) => {
    // Convert the parameter to a Date object and format it
    const formattedDate = new Date(updatedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  
    return formattedDate;
  };