module.exports = (timestamp) => {
    const dateObj = new Date(timestamp);
    
    // Get formatted date
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);
    
    // Get formatted time
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions);
    
    return `${formattedDate} at ${formattedTime}`;
  };
  