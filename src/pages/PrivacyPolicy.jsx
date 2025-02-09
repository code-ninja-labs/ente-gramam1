import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> February 2025</p>
      <h2>Introduction</h2>
      <p>
        Your privacy is important to us. This Privacy Policy explains how our application handles user data and outlines what information
        is collected, how it is used, and your rights regarding your data. We are committed to ensuring the security and transparency
        of your data usage.
      </p>
      <h2>What Information Do We Collect?</h2>
      <p>
        We do not collect or store any personal information from our users. This includes, but is not limited to:
        <ul>
          <li>Names</li>
          <li>Email addresses</li>
          <li>IP addresses</li>
          <li>Phone numbers</li>
        </ul>
      </p>
      <h2>Login and Signup Process</h2>
      <p>
        To enhance security, we use third-party authentication services to facilitate login and signup. This ensures that your credentials
        are protected securely outside of our application. We <strong>do not store login information</strong>, such as passwords or authentication tokens.
      </p>
      <h2>How Do We Use the Data We Store?</h2>
      <p>
        The only data we store is project-related data (such as "likes"). This information is used solely to support app functionality and
        user experience, for example:
      </p>
      <ul>
        <li>Tracking user engagement with specific projects</li>
      </ul>
      <h2>Cookies and Tracking</h2>
      <p>Our application does <strong>not use cookies</strong>, analytics, or tracking technologies to monitor user behavior.</p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or the functionality of our application, feel free to reach out:
        <br />
        <strong>Email:</strong> mrbenns@yahoo.com
      </p>
      <h2>Updates to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy to reflect changes to our practices, features, or legal requirements. Please review it periodically
        to ensure you remain informed.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
