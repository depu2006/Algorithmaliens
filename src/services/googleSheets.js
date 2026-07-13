/**
 * Service to handle form submissions to Google Sheets via Google Apps Script Web Apps
 * or directly to Google Forms via POST requests.
 */

/**
 * Submits the contact form data.
 * Expected columns/inputs: Name, Email, Phone, Subject, Message
 * @param {Object} data - Form data
 * @returns {Promise<{success: boolean, mock?: boolean}>}
 */
export const submitContactForm = async (data) => {
  const url = import.meta.env.VITE_CONTACT_FORM_URL;
  const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_CONTACT_URL;

  const isGoogleFormPlaceholder = !googleFormUrl || googleFormUrl.includes("YOUR_CONTACT_FORM_ID_HERE");
  const isAppsScriptPlaceholder = !url || url.includes("YOUR_CONTACT_APPS_SCRIPT_ID");

  // 1. Direct Google Form Submission (if URL is provided and not placeholder)
  if (googleFormUrl && !isGoogleFormPlaceholder) {
    try {
      const formData = new URLSearchParams();
      // Use configured entry IDs or fallback to generic placeholder IDs
      formData.append(import.meta.env.VITE_GOOGLE_FORM_CONTACT_ENTRY_NAME || 'entry.1000001', data.fullName);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_CONTACT_ENTRY_EMAIL || 'entry.1000002', data.email);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_CONTACT_ENTRY_PHONE || 'entry.1000003', data.phone);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_CONTACT_ENTRY_SUBJECT || 'entry.1000004', data.subject);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_CONTACT_ENTRY_MESSAGE || 'entry.1000005', data.message);

      await fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors', // Crucial for crossing domains to Google Forms
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
      return { success: true };
    } catch (e) {
      console.error("Google Form Contact Submission failed:", e);
      throw e;
    }
  }

  // 2. Google Apps Script Web App (JSON POST) fallback (if url is provided and not placeholder)
  if (url && !isAppsScriptPlaceholder) {
    const payload = {
      Timestamp: new Date().toLocaleString(),
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Subject: data.subject,
      Message: data.message
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return { success: true };
    } catch (error) {
      console.error("Google Sheets Contact API Submission failed:", error);
      throw error;
    }
  }

  // 3. Mock Fallback (if no valid URL is defined)
  console.warn(
    "Neither VITE_GOOGLE_FORM_CONTACT_URL nor VITE_CONTACT_FORM_URL environment variable is defined. " +
    "Falling back to mock submission. To fix, add variables to your .env file."
  );
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, mock: true };
};

/**
 * Submits the book a call form data.
 * Expected columns/inputs: Name, Email, Phone, Company, Service, Project Description
 * @param {Object} data - Form data
 * @returns {Promise<{success: boolean, mock?: boolean}>}
 */
export const submitBookCallForm = async (data) => {
  const url = import.meta.env.VITE_BOOKCALL_FORM_URL;
  const googleFormUrl = import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_URL;

  const isGoogleFormPlaceholder = !googleFormUrl || googleFormUrl.includes("YOUR_BOOKCALL_FORM_ID_HERE");
  const isAppsScriptPlaceholder = !url || url.includes("YOUR_BOOKCALL_APPS_SCRIPT_ID");

  // 1. Direct Google Form Submission (if URL is provided and not placeholder)
  if (googleFormUrl && !isGoogleFormPlaceholder) {
    try {
      const formData = new URLSearchParams();
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_NAME || 'entry.2000001', data.fullName);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_EMAIL || 'entry.2000002', data.email);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_PHONE || 'entry.2000003', data.phone);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_COMPANY || 'entry.2000004', data.companyName || "N/A");
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_SERVICE || 'entry.2000005', data.serviceRequired);
      formData.append(import.meta.env.VITE_GOOGLE_FORM_BOOKCALL_ENTRY_DESC || 'entry.2000006', data.projectDescription);

      await fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      });
      return { success: true };
    } catch (e) {
      console.error("Google Form Book Call Submission failed:", e);
      throw e;
    }
  }

  // 2. Google Apps Script Web App (JSON POST) fallback (if url is provided and not placeholder)
  if (url && !isAppsScriptPlaceholder) {
    const payload = {
      Timestamp: new Date().toLocaleString(),
      Name: data.fullName,
      Email: data.email,
      Phone: data.phone,
      Company: data.companyName || "N/A",
      Service: data.serviceRequired,
      "Project Description": data.projectDescription
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return { success: true };
    } catch (error) {
      console.error("Google Sheets Book Call API Submission failed:", error);
      throw error;
    }
  }

  // 3. Mock Fallback (if no valid URL is defined)
  console.warn(
    "Neither VITE_GOOGLE_FORM_BOOKCALL_URL nor VITE_BOOKCALL_FORM_URL environment variable is defined. " +
    "Falling back to mock submission. To fix, add variables to your .env file."
  );
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, mock: true };
};
