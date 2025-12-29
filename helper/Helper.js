import React from 'react'
import API_URLS from '@/config/apiconfig';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import QRCode from 'qrcode';
export const ImagePath = (description, title) => {
  if (!description) {
    return '';
  }

  // Remove empty paragraphs and unwanted <p><br> tags between content
  const cleanedDescription = description
    .replace(/<p><br><\/p>/g, '') // Remove empty paragraphs
    .replace(/<p><\/p>/g, '') // Remove <p> tags with no content
    .replace(/(<p><br><\/p>)+/g, '') // Remove multiple occurrences of empty <p><br> tags
    .replace(/<br\s*\/?>/g, '') // Remove <br> tags
    .replace(/(<span[^>]*>\s*<\/span>)+/g, '') // Remove empty <span> tags
    .replace(/(<li[^>]*>\s*<\/li>)+/g, '') // Remove empty <li> tags
    .replace(/(<h2[^>]*>)<span>(.*?)<\/span><\/h2>/g, '$1$2</h2>') // Replace <h2><span></span></h2> with <h2></h2>
    .replace(/&nbsp;/g, '') // Remove &nbsp; occurrences
    .replace(/(<[^>]+) style=".*?"/gi, '$1'); // Remove style attributes
  const modifiedData = cleanedDescription
    .replace(/<img([^>]*)>/g, (match, group) => {
      if (!group.includes('alt=')) {
        return `<img${group} alt="${title}" class="my-3 desc_img ">`;
      } else {
        return match.replace('>', `class="my-3 desc_img" >`);
      }
    })
    .replace(/<h([1-6])([^>]*)>/g, `<h$1 class="my-3"$2>`); // Add class my-3 to headings

  return modifiedData;
};

export const shortDesc = (description, length) => {
  if (!description) {
    return '';
  }
  const textContent = description.replace(/<[^>]*>/g, '');
  const trimmedContent = textContent.substring(0, length);
  return trimmedContent + '...';
}
export const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === '/') src = src.slice(1);
  const baseUrl = process.env.API_URL || '';
  const isSvgOrGif = src.endsWith('.svg') || src.endsWith('.gif');
  if (isSvgOrGif) return `${baseUrl}/${src}`;
  return `${baseUrl}/${src}${width ? `?w=${width}` : ''}${quality ? `&q=${quality}` : ''}`;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${month} ${day}, ${year}`;
};
export async function getImgheightWidth(url) {
  const img = new Image();
  img.src = url;
  try {
    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
    });

    const { naturalWidth: width, naturalHeight: height } = img;
    return { width, height };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
export const getUniqueData = (data, type) => {
  let newVal = data.map((curElem) => {
    return curElem[type];
  });
  newVal = [...new Set(newVal)].filter((val) => val !== null);
  return newVal;
};
export const getPropertyType = (data, type) => {
  let propertyType = [];
  data.forEach((curElem) => {
    if (curElem[type] != null) {
      const pTypes = curElem[type].split(',');
      pTypes.forEach((pType) => {
        const pTypeTitle = pType.trim(); // Trim to remove any leading or trailing spaces
        propertyType.push(pTypeTitle);
      });
    }
  });

  // Use Set to get unique property types
  const uniquePropertyTypes = [...new Set(propertyType)];

  return uniquePropertyTypes;
};
export const getAmenities = (data, type) => {
  let amenitiesArray = [];

  data.forEach((curElem) => {
    if (curElem[type] != null) {
      const amenities = curElem[type].split(';');

      amenities.forEach((amenity) => {
        const amenityName = amenity.split('|')[0];
        amenitiesArray.push(amenityName);
      });
    }
  });

  return [...new Set(amenitiesArray)];
};

export const filterProperty = (property, filters) => {
  const filteredData = property.filter((item) =>
    Object.keys(filters).every((filterKey) =>
      filters[filterKey].length === 0 ||
      filters[filterKey].some(selected => {
        if (filterKey === 'address') {
          return item.city?.toLowerCase() === selected.toLowerCase();
        } else {
          return item[filterKey]?.toLowerCase().includes(selected.toLowerCase());
        }
      })
    )
  );
  return filteredData;
};

export const uniqueId = (length = 25) => {
  let result = '';
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return "IB" + result;
}

export const slugify = (title) => {
  let slug = null;
  if (title) {
    slug = title.toLowerCase();
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    slug = slug.replace(/ /gi, "-");
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

  }
  return slug;
}

export const StarRating = (count) => {
  if (count == 0) {
    return null;
  }
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        if (index < count) {
          return <i className="fas fa-star" key={index} />;
        } else {
          return <i className="far fa-star" key={index} />;
        }
      })}
    </>
  );

};

export const inquiryFrm = async (formdata) => {
  try {
    const { ip } = await getVisitorInfo();
    const data = {
      ipaddress: ip,
      ...formdata
    };
    await fetch(API_URLS.INQUIRY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error(error);
  }
};

let exchangeRatesCache = null;

export const currencyConverter = async (amount, currency) => {
  // Handle cases where amount is null or 0
  if (amount === null || amount === 0) {
    return null;
  }

  try {
    // Check if exchange rates are already cached
    if (!exchangeRatesCache) {
      const response = await fetch(`${API_URLS.CURRENCY('AED')}`);
      const data = await response.json();
      exchangeRatesCache = data.rates;
    }

    // Get the exchange rate for the given currency from cache
    const exchangeRate = exchangeRatesCache[currency];
    if (exchangeRate) {
      const convertedAmount = amount * exchangeRate;
      const formattedAmount = formatNumber(convertedAmount);
      return `${currency} ${formattedAmount}`;
    }

    // If the target currency is not available in the cache, return null or handle the case accordingly
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toFixed(2);
  }
}

export const calculateTimeRemaining = (targetDate) => {
  const now = new Date().getTime();
  const targetTime = new Date(targetDate).getTime();
  const timeRemaining = targetTime - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Function to pad a number with zeros to ensure two digits
  const padWithZeros = (num) => (num < 10 ? `0${num}` : `${num}`);

  return {
    days: padWithZeros(days),
    hours: padWithZeros(hours),
    minutes: padWithZeros(minutes),
    seconds: padWithZeros(seconds),
  };
};


export const handleSelectForComparison = (item) => {
  const selectedProperties = JSON.parse(localStorage.getItem('compareData')) || [];
  const isAlreadySelected = selectedProperties.find(property => property.id === item.id);
  if (!isAlreadySelected) {
    selectedProperties.push(item);
    localStorage.setItem('compareData', JSON.stringify(selectedProperties));
    Swal.fire({ title: `(${item.title}) added`, text: "Your Property added for Compare check in compare page", icon: "success" });
  } else {
    Swal.fire({ title: `(${item.title}) allready Added`, text: "This property Allready Added in Compare Page", icon: "success" });
  }
};
export const uniqueVisitor = async () => {
  try {
    const session = uniqueId();
    const u_agent = window.navigator.userAgent;
    const { deviceType, browserName } = extractDeviceInfo(u_agent);
    const { ip, city, country_name, currency, latitude, longitude, country_code } = await getVisitorInfo();
    const data = { ip, city, country_name, currency, latitude, longitude, deviceType, browserName, session, country_code };
    const response = await fetch(API_URLS.NEW_VISITOR, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      localStorage.setItem('visitors', JSON.stringify(data));
      return true; // Return true if the post request is successful
    } else {
      console.error('Failed to post visitor data:', response.statusText);
      return false; // Return false if the post request fails
    }
  } catch (error) {
    console.error(error);
  }
};

const extractDeviceInfo = (userAgent) => {
  let deviceType = 'Unknown';
  let browserName = 'Unknown';

  if (userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|Windows Phone)/i)) {
    deviceType = 'Mobile';
  } else if (userAgent.match(/(Tablet|iPad)/i)) {
    deviceType = 'Tablet';
  } else if (userAgent.match(/(Windows NT|Macintosh|Linux)/i)) {
    deviceType = 'Desktop';
  }

  if (userAgent.match(/Chrome/i)) {
    browserName = 'Chrome';
  } else if (userAgent.match(/Firefox/i)) {
    browserName = 'Firefox';
  } else if (userAgent.match(/Safari/i)) {
    browserName = 'Safari';
  } else if (userAgent.match(/Edge/i)) {
    browserName = 'Edge';
  } else if (userAgent.match(/Opera/i)) {
    browserName = 'Opera';
  }

  return { deviceType, browserName };
};
export const getVisitorInfo = async () => {
  try {
    const vistRes = await fetch(`${API_URLS.UNIQUE_USER}`);
    const visitor = await vistRes.json();
    return visitor;
  } catch (error) {
    console.error('Error fetching visitor info:', error);
    return null; // Return null if there's an error fetching data
  }
};


export const mobileInput = (id, setDialCode) => {
  const visitorsData = JSON.parse(localStorage.getItem('visitors'));
  const country = visitorsData?.country_code || 'IN';
  if (typeof document === 'undefined') { return () => { }; }
  const input = document.querySelector(`#${id}`);
  if (!input) {
    console.error(`Element with ID ${id} not found.`);
    return () => { };
  }
  const iti = intlTelInput(input, {
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
    initialCountry: country,
    separateDialCode: true, // Enable separate dial code
    defaultCountry: country, // Set default country to India
    preferredCountries: [country],
  });

  // Set initial dial code
  setDialCode(`+${iti.getSelectedCountryData().dialCode}`);

  // Update dial code when the user changes the country selection
  const countryChangeHandler = () => {
    setDialCode(`+${iti.getSelectedCountryData().dialCode}`);
  };

  input.addEventListener('countrychange', countryChangeHandler);

  return () => {
    input.removeEventListener('countrychange', countryChangeHandler);
    iti.destroy();
  };

};

export const isVideo = (filename) => {
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
  const extension = filename.split('.').pop().toLowerCase();
  return videoExtensions.includes(extension);
};

export const generateQRCode = async (pass) => {
  try {
    const passUrl = `https://cdn.inchbrick.com/expo-pass/${pass}.jpg`;
    const options = {
      errorCorrectionLevel: 'H', // Error correction level (L, M, Q, or H)
      margin: 1, // Margin around the QR code
      color: {
        dark: '#000', // Color of dark modules
        light: '#fff', // Color of light modules
      },
    };
    return await QRCode.toDataURL(passUrl, options);
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

export const eventDateExtract = (eventDate, time = '10:00:00') => {
  try {
    if (!eventDate || typeof eventDate !== 'string') {
      throw new Error('Invalid eventDate provided');
    }
    const [firstDate] = eventDate.split(',');
    const formattedDate = firstDate.split('-').reverse().join('-'); // Convert 'DD-MM-YYYY' to 'YYYY-MM-DD'
    return `${formattedDate}T${time}`;
  } catch (error) {
    console.error('Error in eventDateExtract:', error.message);
    return null;
  }
};

export const formatEventDatesWithSuffix = (eventDate) => {
  try {
    if (!eventDate || typeof eventDate !== 'string') {
      throw new Error('Invalid eventDate provided');
    }

    // Helper function to determine the day suffix
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    // Split the string into individual dates
    const dates = eventDate.split(',');

    // Map the dates into objects with `value` and `label`
    const formattedDates = dates.map((date) => {
      // Split the date in DD-MM-YYYY format
      const [day, month, year] = date.trim().split('-');
      const formattedDate = `${year}-${month}-${day}T00:00:00`;

      // Create a JavaScript date object for formatting the label
      const labelDate = new Date(`${year}-${month}-${day}`);
      const dayNumber = parseInt(day, 10); // Get the day as a number
      const dayWithSuffix = `${dayNumber}${getDaySuffix(dayNumber)}`;

      const options = { month: 'long', year: 'numeric' };
      const monthAndYear = labelDate.toLocaleDateString('en-US', options);

      return { value: formattedDate, label: `${dayWithSuffix} ${monthAndYear}` };
    });

    return formattedDates;
  } catch (error) {
    console.error('Error in formatEventDatesWithSuffix:', error.message);
    return null;
  }
};

export const formatExpoDate = (dates) => {
  const formattedDates = dates
    .map((item) => {
      const date = new Date(item.value);
      const day = date.getDate();
      const suffix = ['th', 'st', 'nd', 'rd'][day % 10] || 'th'; // Handle day suffix
      const formattedDay = `${day}${suffix}`;
      return formattedDay;
    })
    .join(' & '); // Join the days with " & "

  // Get the month and year from the first date
  const date = new Date(dates[0].value);
  const month = date.toLocaleString('default', { month: 'long' }); // Full month name
  const year = date.getFullYear();

  return `${formattedDates} ${month} ${year}`;
}
export const countDownExpo = (dates) => {
  if (!dates) return false; // Handle cases where eventDates is undefined or null

  // Extract the first date from the eventDates string
  const [firstDate] = dates.split(",");

  // Convert the date from DD-MM-YYYY to YYYY-MM-DD for parsing
  const parsedDate = new Date(firstDate.split("-").reverse().join("-"));
  const currentDate = new Date();

  // Compare the dates
  return parsedDate > currentDate;
}

export const expoDateFormat = (dateString) => {
  if (!dateString) return "";

  const getSuffix = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return dateString.split(",").map((d) => {
    const [day, month, year] = d.split("-"); // "04-10-2025"
    const dateObj = new Date(`${year}-${month}-${day}`); // make it valid ISO

    const dayNum = parseInt(day, 10);
    const monthName = dateObj.toLocaleString("en-US", { month: "short" }); // Oct
    return `${dayNum}${getSuffix(dayNum)} ${monthName} ${year}`;
  });
};
