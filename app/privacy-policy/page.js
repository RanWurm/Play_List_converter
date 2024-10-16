// app/privacy-policy/page.jsx
"use client";

import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen w-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Privacy Policy</h1>

        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Personal Information:</strong> Such as your name, email address, and account information when you sign up or use our services.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you use our website and services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide and maintain our service.</li>
          <li>To notify you about changes to our service.</li>
          <li>To provide customer support.</li>
          <li>To monitor the usage of our service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Disclosure of Your Information</h2>
        <p className="mb-4">
          We may disclose your personal information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To comply with a legal obligation.</li>
          <li>To protect and defend our rights or property.</li>
          <li>With your consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Security of Your Information</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal information, but no method of transmission over the internet is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
        <p className="mb-4">
          Our service may contain links to third-party websites or services that are not owned or controlled by us.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Childrens Privacy</h2>
        <p className="mb-4">
          Our service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at [https://ran-wurmbrand.vercel.app/contact].
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Last updated: [10/16/2024]
        </p>
      </div>
    </main>
  );
}
