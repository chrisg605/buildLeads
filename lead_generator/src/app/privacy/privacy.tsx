import Link from 'next/link';

export default function PrivacyPage() {
  const lastUpdated = 'April 2024';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            Marin County Permits
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Home
            </Link>
            <Link href="/terms" className="text-slate-600 hover:text-slate-900">
              Terms
            </Link>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-600">
            Last updated: <span className="font-medium text-slate-900">{lastUpdated}</span>
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Effective for all users of the Marin County Building Permits portal
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="font-semibold text-blue-900 mb-3">Quick Summary</h2>
          <ul className="space-y-2 text-blue-900 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We display publicly available Marin County building permit records</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We don't collect personal information beyond what's necessary to operate the service</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>All permit data is public record maintained by Marin County</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We use encryption and standard security practices to protect data</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We don't sell or share your information with third parties</span>
            </li>
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-50 rounded-lg p-6 mb-12">
          <h2 className="font-semibold text-slate-900 mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            {[
              { id: 'overview', label: '1. Overview' },
              { id: 'data-sources', label: '2. Data Sources & Public Records' },
              { id: 'what-we-collect', label: '3. What Information We Display' },
              { id: 'how-we-use', label: '4. How We Use Information' },
              { id: 'retention', label: '5. Data Retention' },
              { id: 'security', label: '6. Security Practices' },
              { id: 'cookies', label: '7. Cookies & Tracking' },
              { id: 'ccpa', label: '8. California Consumer Privacy Act' },
              { id: 'contact', label: '9. Contact & Requests' },
            ].map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-slate-600 hover:text-slate-900 transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {/* Section 1 */}
          <PrivacySection id="overview" title="1. Overview">
            <p className="text-slate-700 mb-4">
              This privacy policy describes how we handle information when you use the Marin County Building Permits portal. We are a private service that provides public access to building permit records maintained by Marin County.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Important:</strong> We do not collect or own the building permit data displayed on this service. All permit information is public record maintained and classified by Marin County. We simply provide a searchable interface to access publicly available information.
            </p>
            <p className="text-slate-700">
              This policy explains what information we collect, how we protect it, and your rights regarding that information.
            </p>
          </PrivacySection>

          {/* Section 2 */}
          <PrivacySection id="data-sources" title="2. Data Sources & Public Records">
            <p className="text-slate-700 mb-4">
              All building permit information displayed on this portal is sourced from Marin County's public records and is classified as public record under the California Public Records Act (Government Code Section 6250 et seq.).
            </p>
            <p className="text-slate-700 mb-4">
              This means:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>The information is legally accessible to the public</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>We display data as provided by Marin County without modification</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>We do not control or manage the underlying data</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Data accuracy and completeness is Marin County's responsibility</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm bg-slate-50 p-4 rounded">
              <strong>Questions about specific records?</strong> Contact Marin County Department of Public Works: 
              <a href="tel:4154733331" className="text-blue-600 hover:underline ml-1">(415) 473-3331</a>
            </p>
          </PrivacySection>

          {/* Section 3 */}
          <PrivacySection id="what-we-collect" title="3. What Information We Display">
            <p className="text-slate-700 mb-4">
              The following information from building permits is publicly displayed on our portal:
            </p>
            <div className="bg-slate-50 rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Information Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-900">Public Display</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Permit Number', 'Yes'],
                    ['Property Address', 'Yes'],
                    ['Project Type & Description', 'Yes'],
                    ['Application Date', 'Yes'],
                    ['Permit Status', 'Yes'],
                    ['Decision Date', 'Yes'],
                    ['Applicant Name', 'Yes'],
                    ['Applicant Contact (Phone/Email)', 'Yes - sourced from Marin County'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-slate-900">{row[0]}</td>
                      <td className="px-4 py-3 text-slate-700">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-slate-700 text-sm">
              All displayed information is sourced directly from Marin County public records. We do not modify, redact, or reinterpret this information.
            </p>
          </PrivacySection>

          {/* Section 4 */}
          <PrivacySection id="how-we-use" title="4. How We Use Information">
            <p className="text-slate-700 mb-4">
              We use the permit data we display for the following purposes:
            </p>
            <ul className="space-y-3 text-slate-700 mb-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-600">Providing the service</span>
                <span>Displaying searchable, organized access to public permit records</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-600">Technical operation</span>
                <span>Maintaining service availability, diagnosing technical issues</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 font-semibold text-slate-600">Security</span>
                <span>Preventing fraud, abuse, and unauthorized access</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm bg-amber-50 p-4 rounded border border-amber-100">
              <strong>What we do NOT do:</strong> We do not use contact information from permits for marketing, solicitation, or any purpose other than operating this service. We do not sell, license, or share permit data with third parties.
            </p>
          </PrivacySection>

          {/* Section 5 */}
          <PrivacySection id="retention" title="5. Data Retention">
            <p className="text-slate-700 mb-4">
              We retain permit records in accordance with Marin County's public records retention schedules. Building permit records are typically maintained indefinitely as permanent public records.
            </p>
            <p className="text-slate-700 mb-4">
              Data is not deleted from our service except when:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Marin County directs us to remove records</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Required by law to delete (e.g., valid CCPA deletion request)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>We cease operations and wind down the service</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm">
              Note: Because this is public record data, deletion requests may be limited by retention requirements and CCPA exemptions for legally required records.
            </p>
          </PrivacySection>

          {/* Section 6 */}
          <PrivacySection id="security" title="6. Security Practices">
            <p className="text-slate-700 mb-4">
              We implement industry-standard security practices to protect the integrity and availability of permit data:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Encryption in transit:</strong> All data is transmitted using HTTPS with TLS 1.2+</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Encryption at rest:</strong> Database encryption using AES-256 or equivalent</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Access controls:</strong> Role-based access limiting staff access to necessary information only</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Audit logging:</strong> We maintain logs of access to monitor for unauthorized activity</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Regular backups:</strong> Encrypted, tested backups for disaster recovery</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Security assessments:</strong> Annual third-party security evaluations</span>
              </li>
            </ul>
            <p className="text-slate-700 mb-4">
              We maintain an incident response plan and will notify affected parties of any data breaches within applicable legal timeframes.
            </p>
            <p className="text-slate-700 text-sm">
              No system is perfectly secure. If you believe our service has a security vulnerability, please contact us at <a href="mailto:buildleads.app@gmail.com" className="text-blue-600 hover:underline">buildleads.app@gmail.com</a> rather than disclosing publicly.
            </p>
          </PrivacySection>

          {/* Section 7 */}
          <PrivacySection id="cookies" title="7. Cookies & Tracking">
            <p className="text-slate-700 mb-4">
              <strong>What we use cookies for:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Session management:</strong> Keeping you logged in during your visit</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Preferences:</strong> Remembering search filters and display preferences</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Analytics:</strong> Understanding how people use the site (anonymized)</span>
              </li>
            </ul>
            <p className="text-slate-700 mb-4">
              <strong>What we don't do:</strong> We do not use cookies for targeted advertising, cross-site tracking, or selling data to marketers.
            </p>
            <p className="text-slate-700 text-sm">
              You can control cookies through your browser settings. Disabling cookies may affect some features of the site. We do not require cookies to view public permit records.
            </p>
          </PrivacySection>

          {/* Section 8 */}
          <PrivacySection id="ccpa" title="8. California Consumer Privacy Act">
            <p className="text-slate-700 mb-4">
              The California Consumer Privacy Act (CCPA) gives California residents specific rights regarding personal information. Here's how we comply:
            </p>

            <div className="space-y-4 mb-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Right to Know</h4>
                <p className="text-slate-700 text-sm">
                  You can request to know what personal information we maintain about you. We will respond within 45 days with a summary of data we've collected or displayed.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Right to Delete</h4>
                <p className="text-slate-700 text-sm">
                  You can request deletion of your personal information, except where we are required to retain records by law (such as public record requirements). Building permit records are permanent public records and may not be deletable.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Right to Opt-Out</h4>
                <p className="text-slate-700 text-sm">
                  We do not sell personal information, so there is no "sale" to opt out of. We do not use your information for targeted advertising.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-slate-900 mb-2">Right to Non-Discrimination</h4>
                <p className="text-slate-700 text-sm">
                  We will not discriminate against you for exercising your privacy rights.
                </p>
              </div>
            </div>

            <p className="text-slate-700 text-sm bg-slate-50 p-4 rounded">
              <strong>To submit a CCPA request:</strong> Email <a href="mailto:buildleads.app@gmail.com" className="text-blue-600 hover:underline">buildleads.app@gmail.com</a> with your request. We will verify your identity and respond within the required timeframe.
            </p>
          </PrivacySection>

          {/* Section 9 */}
          <PrivacySection id="contact" title="9. Contact & Requests">
            <p className="text-slate-700 mb-4">
              For different types of requests, contact the appropriate party:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Privacy & Data Requests</h4>
                <p className="text-slate-700 text-sm mb-2">
                  For CCPA requests, privacy questions, or concerns:
                </p>
                <p className="text-slate-700 text-sm">
                  <strong>Email:</strong> <a href="mailto:buildleads.app@gmail.com" className="text-blue-600 hover:underline">buildleads.app@gmail.com</a><br/>
                  <strong>Response time:</strong> 45 days
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Public Records Requests</h4>
                <p className="text-slate-700 text-sm mb-2">
                  For formal Public Records Act requests, contact Marin County directly:
                </p>
                <p className="text-slate-700 text-sm">
                  <strong>Email:</strong> <a href="mailto:records@marincounty.org" className="text-blue-600 hover:underline">records@marincounty.org</a><br/>
                  <strong>Phone:</strong> <a href="tel:4154733331" className="text-blue-600 hover:underline">(415) 473-3331</a>
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Security Issues</h4>
                <p className="text-slate-700 text-sm mb-2">
                  To report a security vulnerability:
                </p>
                <p className="text-slate-700 text-sm">
                  <strong>Email:</strong> <a href="mailto:buildleads.app@gmail.com" className="text-blue-600 hover:underline">buildleads.app@gmail.com</a><br/>
                  <strong>Note:</strong> Please do not publicly disclose vulnerabilities
                </p>
              </div>
            </div>
          </PrivacySection>
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <p className="text-slate-600 text-sm mb-4">
            <strong>Policy Version:</strong> 1.0<br/>
            <strong>Last Updated:</strong> {lastUpdated}<br/>
            <strong>Effective Date:</strong> {lastUpdated}
          </p>
          <p className="text-slate-500 text-xs">
            We may update this privacy policy from time to time. Changes will be posted to this page with an updated "Last Updated" date. Your continued use of the service constitutes acceptance of the updated policy.
          </p>
        </div>
      </main>

      <style>{`
        details > summary {
          cursor: pointer;
          user-select: none;
        }
        details > summary::-webkit-details-marker {
          display: none;
        }
        details > summary::after {
          content: '';
          display: inline-block;
          width: 20px;
          height: 20px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>');
          background-size: contain;
          background-repeat: no-repeat;
          transition: transform 0.3s;
          margin-left: 8px;
          flex-shrink: 0;
        }
        details[open] > summary::after {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}

// Server Component: Collapsible Section using HTML <details>
function PrivacySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details id={id} className="border border-slate-200 rounded-lg group">
      <summary className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </summary>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
        {children}
      </div>
    </details>
  );
}