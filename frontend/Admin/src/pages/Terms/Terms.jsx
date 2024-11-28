import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-form-wrapper">
      <div className="terms-banner">
        <h2>Terms and Conditions</h2>
      </div>
      <div className="terms-form-container">
        <div className="terms-content">
          <p style={{
            backgroundColor: 'rgb(31, 29, 43)',
            color: 'rgb(151, 164 , 172)',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}>
            Welcome to our service. By accessing and using this service, you agree to the following terms and conditions.
            If you do not agree with any part of these terms, please refrain from using our services. You are granted a limited, non-exclusive, 
            and non-transferable right to access and use the services solely for personal or internal business purposes. Use of the service 
            for any illegal or unauthorized activities is strictly prohibited.
            You are solely responsible for maintaining the confidentiality of your account information, including your password, and for any 
            activities that occur under your account. We are not liable for any unauthorized access or use of your account due to your failure 
            to secure your information. All content provided within this service, including but not limited to text, graphics, logos, and images, 
            is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative 
            works of any content provided without express written permission from us or the respective copyright owner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
