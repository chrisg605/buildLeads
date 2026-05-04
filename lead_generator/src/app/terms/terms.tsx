import Link from 'next/link';

export default function TermsPage() {
  const lastUpdated = 'April 2024';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            BuildLeads
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Home
            </Link>
            <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
              Privacy
            </Link>
          </nav>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
          <p className="text-slate-600">
            Last updated: <span className="font-medium text-slate-900">{lastUpdated}</span>
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Effective for all users of the Marin County Building Permits portal
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-12">
          <h2 className="font-semibold text-amber-900 mb-3">Quick Summary</h2>
          <ul className="space-y-2 text-amber-900 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>This is a public records search service - all data is public</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>You agree not to misuse the service or scrape data at scale</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We're not liable for inaccuracies in the underlying data</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>We can change or discontinue the service with notice</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0">•</span>
              <span>Contact us at <a href="mailto:support@buildleads.org" className="text-amber-700 font-semibold hover:underline">support@buildleads.org</a> with questions</span>
            </li>
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-slate-50 rounded-lg p-6 mb-12">
          <h2 className="font-semibold text-slate-900 mb-4">Contents</h2>
          <ul className="space-y-2 text-sm">
            {[
              { id: 'acceptance', label: '1. Acceptance of Terms' },
              { id: 'service-description', label: '2. Service Description' },
              { id: 'use-rights', label: '3. Your Use & Rights' },
              { id: 'restrictions', label: '4. Prohibited Uses' },
              { id: 'intellectual-property', label: '5. Intellectual Property' },
              { id: 'data-accuracy', label: '6. Data Accuracy & Disclaimers' },
              { id: 'limitation-liability', label: '7. Limitation of Liability' },
              { id: 'indemnification', label: '8. Indemnification' },
              { id: 'availability', label: '9. Service Availability' },
              { id: 'modifications', label: '10. Modifications to Terms' },
              { id: 'termination', label: '11. Termination' },
              { id: 'applicable-law', label: '12. Applicable Law' },
              { id: 'contact', label: '13. Contact & Support' },
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
          <TermsSection id="acceptance" title="1. Acceptance of Terms">
            <p className="text-slate-700 mb-4">
              By accessing or using the Marin County Building Permits portal ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.
            </p>
            <p className="text-slate-700">
              We reserve the right to modify these terms at any time. Your continued use of the Service following any changes constitutes acceptance of the new terms. We will notify you of material changes by updating the "Last Updated" date on this page.
            </p>
          </TermsSection>

          {/* Section 2 */}
          <TermsSection id="service-description" title="2. Service Description">
            <p className="text-slate-700 mb-4">
              The Marin County Building Permits portal is a free, publicly accessible service that displays building permit records obtained from Marin County. We are a private service providing searchable access to public records.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>What we provide:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Search functionality for building permits</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Display of publicly available permit information</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Sorting and filtering capabilities</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Public records data sourced from Marin County</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm">
              This Service is provided "as-is" and is intended for informational purposes. We do not provide legal advice or professional consulting services.
            </p>
          </TermsSection>

          {/* Section 3 */}
          <TermsSection id="use-rights" title="3. Your Use & Rights">
            <p className="text-slate-700 mb-4">
              We grant you a limited, non-exclusive, non-transferable right to access and use the Service for lawful purposes.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>You may:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Search and view publicly available permit records</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Download individual records for personal reference</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Share links to specific permits</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Use the Service for research, education, or journalism</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm">
              All data displayed is public record. Your use of this information is subject to the same restrictions as the underlying public records under California law.
            </p>
          </TermsSection>

          {/* Section 4 */}
          <TermsSection id="restrictions" title="4. Prohibited Uses">
            <p className="text-slate-700 mb-4">
              You agree NOT to:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Scrape or bulk download:</strong> Automated extraction of large volumes of data without permission</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Misuse contact information:</strong> Using applicant contact info for spam, harassment, or unauthorized marketing</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Overload the service:</strong> Sending excessive requests that disrupt service for others</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Attempt to gain unauthorized access:</strong> Hacking, exploiting vulnerabilities, or bypassing security</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Reverse engineer:</strong> Attempting to understand system infrastructure or proprietary functionality</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Violate laws:</strong> Using the Service for illegal purposes or to harm others</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Misrepresent yourself:</strong> Pretending to be someone else or claiming false authority</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span><strong>Resell the data:</strong> Packaging and selling permit records as a commercial product</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm bg-red-50 p-4 rounded border border-red-100 mt-4">
              <strong>Consequences:</strong> Violation of these restrictions may result in suspension or termination of your access, and potential legal action.
            </p>
          </TermsSection>

          {/* Section 5 */}
          <TermsSection id="intellectual-property" title="5. Intellectual Property">
            <p className="text-slate-700 mb-4">
              The Service itself—including its design, functionality, search interface, and organization—is owned by us. You may not copy, modify, or distribute these elements.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>However:</strong> The underlying permit data is public record owned by Marin County. You have the same rights to this data as anyone accessing it directly from Marin County. These rights are not granted by us but are granted by California public records law.
            </p>
            <p className="text-slate-700 mb-4">
              We do not claim ownership of, and you retain all rights to, any data you submit to the Service (if applicable).
            </p>
            <p className="text-slate-700 text-sm">
              <strong>Attribution:</strong> If you use significant portions of our Service design or functionality, please provide attribution to our Service.
            </p>
          </TermsSection>

          {/* Section 6 */}
          <TermsSection id="data-accuracy" title="6. Data Accuracy & Disclaimers">
            <p className="text-slate-700 mb-4">
              <strong>Important Disclaimer:</strong> We do not create, verify, or control the accuracy of the building permit data displayed. All data is sourced from Marin County.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>We disclaim:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Accuracy, completeness, or timeliness of permit information</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Responsibility for errors, omissions, or outdated information in source data</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Liability for decisions made based on permit information</span>
              </li>
            </ul>
            <p className="text-slate-700 mb-4">
              For corrections to permit data or official clarifications, contact Marin County Department of Public Works directly: <a href="tel:4154733331" className="text-blue-600 hover:underline">(415) 473-3331</a>
            </p>
            <p className="text-slate-700 text-sm bg-slate-50 p-4 rounded">
              <strong>No warranties:</strong> The Service is provided "AS IS" without any warranties, express or implied. We do not warrant that the Service will be error-free, uninterrupted, or suitable for any particular purpose.
            </p>
          </TermsSection>

          {/* Section 7 */}
          <TermsSection id="limitation-liability" title="7. Limitation of Liability">
            <p className="text-slate-700 mb-4">
              <strong>To the fullest extent permitted by law:</strong> We are not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Service.
            </p>
            <p className="text-slate-700 mb-4">
              This includes damages for:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Loss of data, profits, or business opportunities</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Inaccuracies in permit data</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Service interruptions or downtime</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Decisions made based on information from the Service</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Unauthorized access to your data</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm">
              Our total liability for any claim shall not exceed $100 or the amount you paid to use the Service (whichever is less). Since our Service is free, our liability is effectively $0.
            </p>
          </TermsSection>

          {/* Section 8 */}
          <TermsSection id="indemnification" title="8. Indemnification">
            <p className="text-slate-700 mb-4">
              You agree to defend, indemnify, and hold harmless us from any claims, damages, or costs (including legal fees) arising from:
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Your violation of these Terms</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Your use of the Service in violation of applicable law</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Your misuse of permit data or contact information</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Your infringement of third-party rights through your use of the Service</span>
              </li>
            </ul>
          </TermsSection>

          {/* Section 9 */}
          <TermsSection id="availability" title="9. Service Availability">
            <p className="text-slate-700 mb-4">
              We provide the Service on an "as-available" basis. We do not guarantee continuous, uninterrupted, or error-free service.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>We may:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Perform maintenance and updates without notice</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Experience technical issues or downtime</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Limit bandwidth or access during high-traffic periods</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Sync data with Marin County on a regular schedule (not real-time)</span>
              </li>
            </ul>
            <p className="text-slate-700 text-sm">
              For time-sensitive permit information, contact Marin County directly rather than relying on this Service.
            </p>
          </TermsSection>

          {/* Section 10 */}
          <TermsSection id="modifications" title="10. Modifications to Terms">
            <p className="text-slate-700 mb-4">
              We reserve the right to modify these Terms at any time. We will update the "Last Updated" date whenever significant changes are made.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Major changes</strong> (such as new restrictions or liability changes) will be communicated via email if you've provided one, or posted prominently on the Service.
            </p>
            <p className="text-slate-700">
              Your continued use of the Service after changes means you accept the new terms. If you do not agree with changes, discontinue using the Service.
            </p>
          </TermsSection>

          {/* Section 11 */}
          <TermsSection id="termination" title="11. Termination">
            <p className="text-slate-700 mb-4">
              We may terminate or suspend your access to the Service at any time, for any reason, with or without notice.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Grounds for termination include:</strong>
            </p>
            <ul className="space-y-2 text-slate-700 mb-4 ml-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Violation of these Terms</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Abuse of the Service (scraping, overload, hacking attempts)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Misuse of permit data</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">•</span>
                <span>Direction from Marin County</span>
              </li>
            </ul>
            <p className="text-slate-700">
              Upon termination, your access will be immediately revoked. Sections 5-8 will survive termination.
            </p>
          </TermsSection>

          {/* Section 12 */}
          <TermsSection id="applicable-law" title="12. Applicable Law">
            <p className="text-slate-700 mb-4">
              These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            <p className="text-slate-700 mb-4">
              You agree that any legal action or proceeding relating to these Terms or the Service shall be brought exclusively in the state or federal courts located in Marin County, California.
            </p>
            <p className="text-slate-700">
              <strong>Note:</strong> These terms do not override any rights granted to you under California public records law regarding the underlying permit data.
            </p>
          </TermsSection>

          {/* Section 13 */}
          <TermsSection id="contact" title="13. Contact & Support">
            <p className="text-slate-700 mb-4">
              For questions about these Terms, the Service, or to report violations:
            </p>

            <div className="space-y-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">General Questions & Support</h4>
                <p className="text-slate-700 text-sm">
                  <strong>Email:</strong> <a href="mailto:support" className="text-blue-600 hover:underline">support</a><br/>
                  <strong>Response time:</strong> 2-5 business days
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Report Violations or Abuse</h4>
                <p className="text-slate-700 text-sm">
                  If you believe someone is violating these Terms (scraping, spamming, hacking), please email:
                </p>
                <p className="text-slate-700 text-sm mt-2">
                  <strong>Email:</strong> <a href="mailto:support" className="text-blue-600 hover:underline">support</a><br/>
                  <strong>Subject:</strong> "Abuse Report - [describe violation]"
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-900 mb-2">Permit Data Questions</h4>
                <p className="text-slate-700 text-sm">
                  For questions about specific permits or data accuracy, contact Marin County directly:
                </p>
                <p className="text-slate-700 text-sm mt-2">
                  <strong>Phone:</strong> <a href="tel:4154733331" className="text-blue-600 hover:underline">(415) 473-3331</a><br/>
                  <strong>Email:</strong> <a href="mailto:records@marincounty.org" className="text-blue-600 hover:underline">records@marincounty.org</a>
                </p>
              </div>
            </div>
          </TermsSection>
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <p className="text-slate-600 text-sm mb-4">
            <strong>Terms Version:</strong> 1.0<br/>
            <strong>Last Updated:</strong> {lastUpdated}<br/>
            <strong>Effective Date:</strong> {lastUpdated}
          </p>
          <p className="text-slate-500 text-xs">
            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
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
function TermsSection({
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