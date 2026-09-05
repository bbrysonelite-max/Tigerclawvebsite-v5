/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { Zap, ArrowLeft, ChevronRight } from "lucide-react";

/* ─── DESIGN: Tiger Claw Legal Page
   Dark background (#0A0A0A), readable white text, orange accents.
   Sidebar nav on desktop, dropdown on mobile.
   All emails: support@tigerclaw.io
   Public mailing address lives in ADDRESS_LINES below.
─── */

const ORANGE = "#E8722A";
const EMAIL = "support@tigerclaw.io";
const DMCA_EMAIL = "support@tigerclaw.io";
const ADDRESS_LINES = [
  "Bot Craft Works",
  "15560 N Frank Lloyd Wright",
  "Suite B4-7254",
  "Scottsdale, AZ 85260",
];
const EFFECTIVE = "April 23, 2026";

export const LEGAL_EFFECTIVE = EFFECTIVE;

export const sections = [
  { id: "privacy", slug: "privacy", label: "Privacy Policy" },
  { id: "terms", slug: "terms", label: "Terms of Service" },
  { id: "aup", slug: "acceptable-use", label: "Acceptable Use" },
  { id: "cookies", slug: "cookies", label: "Cookie Policy" },
  { id: "dmca", slug: "dmca", label: "DMCA" },
  { id: "refund", slug: "cancellation", label: "Cancellation & Refunds" },
  { id: "earnings", slug: "results", label: "Results Disclaimer" },
  { id: "accessibility", slug: "accessibility", label: "Accessibility" },
  { id: "not-affiliated", slug: "not-affiliated", label: "Not Affiliated" },
  { id: "do-not-sell", slug: "do-not-sell", label: "Do Not Sell" },
];

export type LegalSection = (typeof sections)[number];

export function sectionBySlug(slug?: string): LegalSection | undefined {
  return sections.find((s) => s.slug === slug);
}

export function sectionById(id?: string): LegalSection | undefined {
  return sections.find((s) => s.id === id);
}

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="text-2xl sm:text-3xl font-bold text-white mb-2 pt-16 -mt-16 scroll-mt-24" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {title}
    </h2>
  );
}

function EffectiveDate() {
  return <p className="text-white/70 text-sm mb-6">Effective Date: {EFFECTIVE}</p>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-white mt-8 mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-white/90 text-[15px] leading-relaxed mb-4">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-white/90 text-[15px] leading-relaxed mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/60">
      {children}
    </li>
  );
}

function Bold({ children }: { children: React.ReactNode }) {
  return <strong className="text-white font-semibold">{children}</strong>;
}

function EmailLink({ address }: { address?: string }) {
  const email = address || EMAIL;
  return <a href={`mailto:${email}`} className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>{email}</a>;
}

function AddressInline() {
  return <>{ADDRESS_LINES.join(", ")}</>;
}

function AddressBlock() {
  return (
    <>
      {ADDRESS_LINES.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
    </>
  );
}

/* ─── CONTENT SECTIONS ─── */

export function PrivacyPolicy() {
  return (
    <div>
      <SectionHeading id="privacy" title="Privacy Policy" />
      <EffectiveDate />

      <H3>Who We Are</H3>
      <P>This Privacy Policy describes how Mariah Marketing LLC, doing business as Bot Craft Works ("Tiger Claw" is our product; "Tiger Claw," "we," "us," or "our"), collects, uses, and discloses information when you use our website at tigerclaw.io and our Tiger Claw AI Follow-Up Assistant service (the "Service").</P>
      <P>Contact: <EmailLink /> | Mailing address: <AddressInline /></P>

      <H3>Information We Collect</H3>
      <P><Bold>From Operators (our paying customers):</Bold></P>
      <ul className="mb-4">
        <Li>Account information: name, email address, and payment information processed by our payment processor; we do not store card numbers</Li>
        <Li>Configuration data: connected messaging credentials, calendar booking links, and API keys you provide to enable the Service (we store these securely; you may revoke them at any time)</Li>
        <Li>Usage data: how you interact with the Service, including conversation notes, follow-up activity, performance metrics, and error logs</Li>
        <Li>Communications: messages you send to our support or that we send to you</Li>
      </ul>

      <P><Bold>From Prospects (people your agent helps you communicate with):</Bold></P>
      <ul className="mb-4">
        <Li>Channel identifiers and handles for the channels you connect — for example Telegram handles and chat IDs, WhatsApp numbers, email addresses, SMS mobile numbers, and LINE user IDs</Li>
        <Li>Messages, notes, and follow-up details you submit or connect to the Service</Li>
        <Li>Publicly available information provided to us by our third-party data provider, including but not limited to usernames, publicly posted statements, and links to public sources</Li>
      </ul>

      <P><Bold>Automatically collected:</Bold></P>
      <ul className="mb-4">
        <Li>IP address, browser type, device type, pages visited, referring URLs</Li>
        <Li>Cookies and similar technologies (see Cookie Policy below)</Li>
      </ul>

      <H3>How We Use Information</H3>
      <ul className="mb-4">
        <Li>To provide, operate, and improve the Service</Li>
        <Li>To process payments and manage subscriptions</Li>
        <Li>To communicate with you about the Service, including service announcements and support</Li>
        <Li>To detect and prevent fraud, abuse, and violations of our Terms of Service</Li>
        <Li>To comply with legal obligations</Li>
        <Li>To develop new features and analyze usage patterns (in aggregate, non-identifying form where possible)</Li>
      </ul>

      <H3>SMS / Text Messaging</H3>
      <P>If you opt in to receive text messages from Tiger Claw, we collect your mobile phone number and the content of those messages to send the communications you have consented to receive.</P>
      <ul className="mb-4">
        <Li><Bold>Consent:</Bold> We send SMS only to people who have given prior express consent — for example, by submitting their mobile number through a form, texting us first, or as part of an existing business relationship.</Li>
        <Li><Bold>Message types:</Bold> Conversational follow-ups, appointment and video-call reminders, scheduling confirmations, replies to your questions, and occasional account or service updates.</Li>
        <Li><Bold>No sharing of mobile data:</Bold> Mobile information and SMS opt-in consent are never shared with or sold to third parties or affiliates for their own marketing or promotional purposes. We share mobile information only with the service providers that help us deliver the messages (such as our SMS or telecommunications provider), solely for that purpose.</Li>
        <Li><Bold>Frequency &amp; rates:</Bold> Message frequency varies based on your activity and conversations. Message and data rates may apply.</Li>
        <Li><Bold>Opt-out:</Bold> Reply STOP at any time to stop receiving text messages, or reply HELP for assistance. You may also contact us at <EmailLink /> to opt out.</Li>
      </ul>

      <H3>Third-Party Services We Use</H3>
      <P>We share information with the following service providers as necessary to operate the Service:</P>
      <ul className="mb-4">
        <Li><Bold>Payment processors</Bold> — payment processing</Li>
        <Li><Bold>Hosting providers</Bold> — hosting infrastructure</Li>
        <Li><Bold>Database providers</Bold> — database services</Li>
        <Li><Bold>Messaging channels</Bold> — message delivery through the channels you connect, each via its own provider: Telegram, WhatsApp, Email, SMS, and LINE</Li>
        <Li><Bold>Calendar providers</Bold> — calendar booking on your behalf</Li>
        <Li><Bold>AI providers</Bold> — AI processing, using your API key when applicable</Li>
        <Li><Bold>Third-party data provider</Bold> — supplies publicly sourced prospect information</Li>
      </ul>
      <P>Each of these providers has their own privacy practices, which we encourage you to review.</P>

      <H3>Prospect Data — Important Disclosure</H3>
      <P>Tiger Claw may receive information about prospects from third-party data providers, connected tools, or information you provide. We use this information to support conversation memory, reply drafting, objection support, follow-up organization, and next-step guidance. We do not sell this information to third parties. Prospects may contact us at <EmailLink /> to request information about data we hold on them, request deletion, or opt out.</P>
      <P>You own the prospect conversation data, notes, and records you provide to the Service. We use that information to operate, support, secure, and improve the Service, not to sell prospect conversation data to third parties.</P>
      <P>Suppression, unsubscribe, and do-not-contact requests must be honored. If a prospect asks not to be contacted, you are responsible for respecting that request in your own communications, and we may retain limited suppression records as needed to prevent future contact.</P>

      <H3>How Long We Keep Information</H3>
      <P>We retain account and configuration data for as long as your account is active, plus a reasonable period thereafter for legal, accounting, and operational purposes. Conversation logs and prospect data are retained for as long as necessary to provide the Service and comply with applicable law. You may request export or deletion at any time by contacting <EmailLink />.</P>

      <H3>Your Rights</H3>
      <P>Depending on where you live, you may have rights to:</P>
      <ul className="mb-4">
        <Li>Access the personal information we hold about you</Li>
        <Li>Request an export of your tenant-owned data</Li>
        <Li>Correct inaccurate information</Li>
        <Li>Request deletion of your information</Li>
        <Li>Opt out of certain uses or sharing</Li>
        <Li>Withdraw consent previously given</Li>
      </ul>
      <P>To exercise any of these rights, contact us at <EmailLink />. We will respond within the time required by applicable law. Cancellation does not remove your ability to request export or deletion of eligible data.</P>
      <P><Bold>California residents:</Bold> Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), you have additional rights including the right to know, delete, and opt out of the sale or sharing of your personal information. We do not sell personal information. To exercise your rights, contact us at <EmailLink /> or use the "Do Not Sell or Share My Personal Information" link in our footer.</P>
      <P><Bold>EU/UK residents:</Bold> If you are in the European Union or United Kingdom, we process your data under GDPR/UK GDPR. Our legal bases include contract performance, legitimate interests, and consent where required. You have rights under GDPR including access, rectification, erasure, restriction, portability, and objection. Contact <EmailLink /> to exercise these rights or lodge a complaint with your local supervisory authority.</P>

      <H3>Security</H3>
      <P>We use commercially reasonable administrative, technical, and physical safeguards to protect your information. No system is perfectly secure, and we cannot promise absolute security. In the event of a data breach affecting your information, we will notify you as required by applicable law.</P>

      <H3>Children</H3>
      <P>The Service is not intended for anyone under 18. We do not knowingly collect information from children. If you believe we have collected information from a child, contact us immediately at <EmailLink />.</P>

      <H3>Changes to This Policy</H3>
      <P>We may update this Privacy Policy from time to time. We will post the updated policy here and update the "Effective Date" above. Material changes will be communicated via email to active operators.</P>

      <H3>Contact</H3>
      <P>Questions about this Privacy Policy: <EmailLink /></P>
    </div>
  );
}

export function TermsOfService() {
  return (
    <div>
      <SectionHeading id="terms" title="Terms of Service" />
      <EffectiveDate />

      <H3>1. Agreement to Terms</H3>
      <P>These Terms of Service ("Terms") are a binding contract between you ("Operator," "you") and Mariah Marketing LLC, doing business as Bot Craft Works ("Tiger Claw" is our product; "Tiger Claw," "we," "us," "our"). By accessing or using the Tiger Claw AI Follow-Up Assistant service or website at tigerclaw.io (the "Service"), you agree to these Terms. If you do not agree, do not use the Service.</P>

      <H3>2. Eligibility</H3>
      <P>You must be at least 18 years old and have the legal capacity to enter into a binding contract. By using the Service, you represent that you meet these requirements.</P>

      <H3>3. The Service</H3>
      <P>Tiger Claw is an independent software product built to support prospect conversation management, follow-up organization, reply drafting, objection support, notes, and next-step guidance. Users configure their own workflow, connected tools, and communication practices, and use the Service to support prospect conversations they are responsible for managing.</P>

      <H3>4. Subscription and Billing</H3>
      <P><Bold>Price:</Bold> The Service is offered at $147 per month, billed monthly through our payment processor. Prices are subject to change with 30 days' notice to active operators.</P>
      <P><Bold>Billing cycle:</Bold> Subscriptions renew automatically each month until canceled.</P>
      <P><Bold>Cancellation:</Bold> You may cancel at any time through your account or by contacting <EmailLink />. Cancellation takes effect at the end of your current billing cycle. You will retain access to the Service through the end of the paid period. We do not use long-term contracts, hidden cancellation steps, or cancellation friction to trap users.</P>
      <P><Bold>30-Day Conversation Promise.</Bold> If, during your first thirty (30) days of paid service, the Service does not hold a conversation with a prospect reaching at least five (5) exchanged messages (excluding your own operator chat), and you have imported at least one (1) contact and sent at least ten (10) Tiger Card invitations, you may request a full refund of all amounts paid. Otherwise, monthly subscription fees are non-refundable except where required by law, and we do not issue prorated refunds for partial months. If you believe you have been charged in error, contact <EmailLink /> within 30 days and we will review your request in good faith.</P>
      <P><Bold>Failed payments:</Bold> If payment fails, we may suspend or terminate the Service after reasonable notice.</P>

      <H3>5. Your Account</H3>
      <P>You are responsible for:</P>
      <ul className="mb-4">
        <Li>Maintaining the confidentiality of your account credentials</Li>
        <Li>All activity that occurs under your account</Li>
        <Li>Ensuring the accuracy of information you provide</Li>
        <Li>Providing and maintaining any connected tools, calendar links, account credentials, and API keys you choose to use with the Service</Li>
      </ul>

      <H3>6. Acceptable Use</H3>
      <P>You agree that you will NOT use the Service to:</P>
      <ul className="mb-4">
        <Li>Violate any applicable law, regulation, or third-party right</Li>
        <Li>Engage in or promote any illegal pyramid scheme, Ponzi scheme, or other fraudulent business model</Li>
        <Li>Make false, misleading, or unsubstantiated earnings claims in violation of Federal Trade Commission (FTC) rules or any other applicable consumer protection law</Li>
        <Li>Impersonate any person or entity, or misrepresent your identity or affiliation</Li>
        <Li>Spam, harass, threaten, defraud, or harm prospects or any other person</Li>
        <Li>Contact anyone who has unsubscribed, opted out, asked not to be contacted, or otherwise must be suppressed</Li>
        <Li>Send unsolicited commercial communications in violation of CAN-SPAM, TCPA, or similar laws</Li>
        <Li>Promote adult content, illegal substances, weapons, or other content prohibited by a connected messaging platform's terms of service</Li>
        <Li>Attempt to reverse engineer, decompile, disassemble, or otherwise extract the source code of the Service</Li>
        <Li>Interfere with or disrupt the Service, servers, or networks connected to the Service</Li>
        <Li>Use the Service to build a competing product</Li>
        <Li>Circumvent any access controls, rate limits, or usage restrictions</Li>
        <Li>Promote any business opportunity that has been the subject of an active enforcement action by the FTC, SEC, or comparable regulator, unless and until that action is resolved</Li>
      </ul>
      <P><Bold>You are solely responsible for how you use the Service and for the content of communications you send.</Bold> Tiger Claw provides software support; you direct its use. You are responsible for company, program, legal, advertising, privacy, income-claim, and communication compliance.</P>

      <H3>7. AI Disclosure Responsibility</H3>
      <P>AI may draft notes, replies, summaries, and guidance. AI drafts require human review before use. You review, edit, approve, send, and stay compliant. You agree to comply with all applicable laws regarding AI disclosure, including ensuring that prospects receive any disclosure required by law or regulation.</P>

      <H3>8. Intellectual Property</H3>
      <P>Tiger Claw and its licensors own all rights in the Service, including software, designs, logos, and content. You retain ownership of content you provide, including your configuration, prospect data you upload, notes, prospect conversation data, and conversation records, and you grant us a license to use that content solely to operate, support, secure, and improve the Service.</P>

      <H3>9. Third-Party Services</H3>
      <P>The Service may rely on third-party services including payment processors, hosting providers, AI providers, communication tools, calendar tools, and data providers. We are not responsible for the availability, accuracy, or conduct of these services. Your use of them is governed by their own terms.</P>

      <H3>10. Disclaimer of Warranties</H3>
      <P><Bold>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OPERATION.</Bold></P>
      <P>We do not warrant that the Service will be error-free, secure, or available at all times. We do not warrant that using the Service will result in any specific sales, signups, commissions, rank or rank advancement, income, recruiting results, customer acquisition, lead conversion, or other business outcome.</P>

      <H3>11. Limitation of Liability</H3>
      <P><Bold>TO THE MAXIMUM EXTENT PERMITTED BY LAW, TIGER CLAW'S TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</Bold></P>
      <P><Bold>IN NO EVENT WILL TIGER CLAW BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST REVENUE, LOST DATA, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</Bold></P>
      <P>Some jurisdictions do not allow these limitations; in those jurisdictions, our liability is limited to the maximum extent permitted.</P>

      <H3>12. Indemnification</H3>
      <P>You agree to defend, indemnify, and hold harmless Tiger Claw, Mariah Marketing LLC, and their officers, employees, and agents from any claim, loss, damage, or expense (including reasonable attorneys' fees) arising out of: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party right, including a connected messaging platform's terms of service, any law, or any individual's privacy rights; (d) content sent through your workflow; or (e) any claim that your use of the Service caused harm to a prospect or other person.</P>

      <H3>13. Termination</H3>
      <P>We may suspend or terminate your access to the Service at any time, with or without cause, with reasonable notice where practicable. You may cancel at any time under Section 4.</P>
      <P>Upon termination, your right to use the Service ends immediately. Sections that by their nature should survive termination (including Sections 8, 10, 11, 12, 14, 15, and 16) will survive.</P>

      <H3>14. Governing Law</H3>
      <P>These Terms are governed by the laws of the State of Utah, without regard to its conflict-of-laws principles.</P>

      <H3>15. Dispute Resolution and Arbitration</H3>
      <P><Bold>Please read this section carefully. It affects your legal rights.</Bold></P>
      <P>Any dispute arising out of or relating to these Terms or the Service will be resolved through binding individual arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. Arbitration will take place in the State of Utah, or virtually by agreement of the parties.</P>
      <P><Bold>Class action waiver:</Bold> You and Tiger Claw agree that disputes will be resolved only on an individual basis and not as part of any class or consolidated action.</P>
      <P><Bold>Exceptions:</Bold> Either party may seek injunctive relief in court for intellectual property infringement or unauthorized access to the Service.</P>
      <P><Bold>Opt-out:</Bold> You may opt out of this arbitration provision by emailing <EmailLink /> within 30 days of first accepting these Terms, with the subject line "Arbitration Opt-Out."</P>

      <H3>16. Changes to These Terms</H3>
      <P>We may update these Terms from time to time. Material changes will be communicated via email to active operators at least 15 days before they take effect. Continued use of the Service after changes take effect constitutes acceptance.</P>

      <H3>17. Miscellaneous</H3>
      <P>These Terms are the entire agreement between you and Tiger Claw regarding the Service. If any provision is unenforceable, the remainder remains in effect. Our failure to enforce a provision is not a waiver. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets.</P>

      <H3>18. SMS / Text Messaging Program</H3>
      <P>Tiger Claw and its operators send conversational, one-to-one text messages: personal follow-ups, appointment and video-call reminders, scheduling confirmations, replies to your questions, and occasional account or service updates.</P>
      <ul className="mb-4">
        <Li><Bold>Consent:</Bold> Text messages are sent only to individuals who have given prior express consent — for example, by submitting a mobile number through our opt-in form at tigerclaw.io/sms, by texting us first, or as part of an existing business relationship. Consent to receive text messages is not a condition of any purchase.</Li>
        <Li><Bold>Message frequency:</Bold> Message frequency varies based on your activity and conversations.</Li>
        <Li><Bold>Cost:</Bold> Message and data rates may apply, depending on your mobile plan.</Li>
        <Li><Bold>Opt-out:</Bold> Reply STOP at any time to stop receiving text messages; a single final message will confirm your opt-out. Reply HELP for assistance, or contact us at <EmailLink />.</Li>
        <Li><Bold>Carriers:</Bold> Mobile carriers are not liable for delayed or undelivered messages.</Li>
        <Li><Bold>Privacy:</Bold> Mobile information and SMS opt-in consent are never shared with or sold to third parties or affiliates for their own marketing or promotional purposes. See our Privacy Policy at tigerclaw.io/legal/privacy.</Li>
      </ul>

      <H3>Contact</H3>
      <P>Questions about these Terms: <EmailLink /></P>
    </div>
  );
}

export function AcceptableUse() {
  return (
    <div>
      <SectionHeading id="aup" title="Acceptable Use Policy" />
      <EffectiveDate />
      <P>This Acceptable Use Policy ("AUP") supplements the Tiger Claw Terms of Service. By using the Service, you agree to this AUP.</P>

      <H3>Prohibited Uses</H3>
      <P>You may not use the Service to:</P>

      <P><Bold>Illegal activity:</Bold></P>
      <ul className="mb-4">
        <Li>Violate any law, regulation, court order, or third-party right</Li>
        <Li>Engage in fraud, money laundering, or illegal gambling</Li>
        <Li>Promote or sell regulated products without proper authorization (firearms, pharmaceuticals, controlled substances, etc.)</Li>
      </ul>

      <P><Bold>Pyramid schemes, illegal MLMs, and prohibited opportunity claims:</Bold></P>
      <ul className="mb-4">
        <Li>Promote any business opportunity that operates as an illegal pyramid scheme under FTC guidance or applicable law</Li>
        <Li>Promote any MLM, affiliate, direct selling, social-selling, or opportunity program currently under active FTC, SEC, or equivalent regulatory enforcement action until such action is resolved</Li>
        <Li>Make income or earnings claims that cannot be substantiated or that do not comply with FTC disclosure requirements</Li>
      </ul>

      <P><Bold>Deception and impersonation:</Bold></P>
      <ul className="mb-4">
        <Li>Impersonate any real person, company, or entity</Li>
        <Li>Misrepresent your affiliation with any company, product, or individual</Li>
        <Li>Fail to disclose the AI nature of your agent where disclosure is required by law</Li>
      </ul>

      <P><Bold>Harmful conduct:</Bold></P>
      <ul className="mb-4">
        <Li>Harass, threaten, intimidate, or defraud any prospect or person</Li>
        <Li>Target minors or vulnerable populations</Li>
        <Li>Send messages to any person who has asked not to be contacted</Li>
        <Li>Violate CAN-SPAM, TCPA, GDPR, or similar communication laws</Li>
      </ul>

      <P><Bold>Prohibited content:</Bold></P>
      <ul className="mb-4">
        <Li>Sexual or adult content</Li>
        <Li>Violent, hateful, or discriminatory content</Li>
        <Li>Content that promotes self-harm, eating disorders, or dangerous behavior</Li>
        <Li>Content that violates a connected messaging platform's terms of service</Li>
      </ul>

      <P><Bold>Technical abuse:</Bold></P>
      <ul className="mb-4">
        <Li>Reverse engineer, decompile, or extract source code</Li>
        <Li>Bypass rate limits, access controls, or security features</Li>
        <Li>Use the Service to build a competing product</Li>
        <Li>Introduce malware, viruses, or harmful code</Li>
      </ul>

      <H3>Enforcement</H3>
      <P>We may investigate violations, suspend or terminate your account, and cooperate with law enforcement without notice. We reserve the right to remove content or refuse service at our sole discretion.</P>

      <H3>Reporting</H3>
      <P>To report a violation: <EmailLink /></P>
    </div>
  );
}

export function CookiePolicy() {
  return (
    <div>
      <SectionHeading id="cookies" title="Cookie Policy" />
      <EffectiveDate />

      <H3>What Are Cookies</H3>
      <P>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how visitors use the site.</P>

      <H3>Cookies We Use</H3>
      <P><Bold>Strictly necessary cookies:</Bold> Required for the site and Service to function (authentication, security, load balancing). These cannot be disabled without breaking functionality.</P>
      <P><Bold>Analytics cookies:</Bold> Help us understand how visitors use our site so we can improve it.</P>
      <P><Bold>Functional cookies:</Bold> Remember your preferences and settings.</P>

      <H3>Managing Cookies</H3>
      <P>Most browsers let you refuse or delete cookies through browser settings. Disabling cookies may affect your ability to use the Service.</P>
      <P>For more information: <EmailLink /></P>
    </div>
  );
}

export function DMCAPolicy() {
  return (
    <div>
      <SectionHeading id="dmca" title="DMCA / Copyright Policy" />
      <EffectiveDate />

      <P>Tiger Claw respects intellectual property rights and expects users to do the same. If you believe content on our Service infringes your copyright, please submit a notice that includes:</P>
      <ol className="mb-4 list-decimal list-inside space-y-2">
        <li className="text-white/80 text-[15px] leading-relaxed">A physical or electronic signature of the copyright owner or authorized agent</li>
        <li className="text-white/80 text-[15px] leading-relaxed">Identification of the copyrighted work claimed to be infringed</li>
        <li className="text-white/80 text-[15px] leading-relaxed">Identification of the allegedly infringing material and its location on the Service</li>
        <li className="text-white/80 text-[15px] leading-relaxed">Your contact information</li>
        <li className="text-white/80 text-[15px] leading-relaxed">A statement that you have a good-faith belief the use is not authorized by the copyright owner, its agent, or the law</li>
        <li className="text-white/80 text-[15px] leading-relaxed">A statement, under penalty of perjury, that the information is accurate and you are authorized to act on the owner's behalf</li>
      </ol>

      <H3>Send notices to our Designated Agent:</H3>
      <P>Mariah Marketing LLC (dba Bot Craft Works) — DMCA Agent<br /><AddressBlock />Email: <EmailLink address={DMCA_EMAIL} /></P>

      <P><Bold>Counter-notices</Bold> may be submitted by users whose content was removed, following the requirements of 17 U.S.C. § 512(g).</P>
      <P><Bold>Repeat infringers</Bold> will have their accounts terminated.</P>
    </div>
  );
}

export function RefundPolicy() {
  return (
    <div>
      <SectionHeading id="refund" title="Refund and Cancellation Policy" />
      <EffectiveDate />

      <H3>Cancellation</H3>
      <P>You may cancel your Tiger Claw subscription at any time:</P>
      <ul className="mb-4">
        <Li>Through your account settings, or</Li>
        <Li>By emailing <EmailLink /> with the subject line "Cancel Subscription"</Li>
      </ul>
      <P>Cancellation takes effect at the end of your current monthly billing cycle. You will retain access to the Service until that date.</P>

      <H3>Refunds</H3>
      <P><Bold>30-Day Conversation Promise.</Bold> If, during your first thirty (30) days of paid service, the Service does not hold a conversation with a prospect reaching at least five (5) exchanged messages (excluding your own operator chat), and you have imported at least one (1) contact and sent at least ten (10) Tiger Card invitations, you may request a full refund of all amounts paid. Otherwise, monthly subscription fees are non-refundable except where required by law, and we do not issue prorated refunds for partial months.</P>
      <P><Bold>Billing errors:</Bold> If you believe you have been charged in error, contact <EmailLink /> within 30 days of the charge. We will review in good faith and issue a refund if the error is confirmed.</P>
      <P><Bold>Service failures:</Bold> If the Service is materially unavailable for an extended period due to our fault, contact us and we will consider service credits on a case-by-case basis.</P>

      <H3>Contact</H3>
      <P>Billing questions: <EmailLink /></P>
    </div>
  );
}

export function EarningsDisclaimer() {
  return (
    <div>
      <SectionHeading id="earnings" title="Results Disclaimer" />
      <EffectiveDate />

      <P>Tiger Claw is an independent software product built to support prospect conversation management, follow-up organization, reply drafting, objection support, notes, and next-step guidance. Tiger Claw is not produced, approved, sponsored, endorsed, recommended, or authorized by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company.</P>
      <P>Users are solely responsible for ensuring that their use of Tiger Claw complies with the rules, policies, compensation-plan requirements, advertising standards, income-claim rules, privacy obligations, do-not-contact requests, and communication requirements of any company or program they participate in.</P>
      <P>Tiger Claw does not promise sales, signups, commissions, rank or rank advancement, income, recruiting results, customer acquisition, lead conversion, or any other business outcome. Tiger Claw provides software tools for organization, communication support, follow-up assistance, and workflow guidance. Results depend on the user's own effort, market, relationships, compliance, and business activity.</P>
      <P>AI may draft notes, replies, summaries, and guidance, but AI drafts require human review before use. Users remain responsible for reviewing, editing, approving, sending, and staying compliant with their own company, program, and legal obligations.</P>
      <P>Tiger Claw does not provide legal, financial, tax, compensation-plan, or company-compliance advice. Users should review their own company policies and consult qualified advisors when needed.</P>
    </div>
  );
}

export function AccessibilityStatement() {
  return (
    <div>
      <SectionHeading id="accessibility" title="Accessibility Statement" />
      <EffectiveDate />

      <P>Tiger Claw is committed to making tigerclaw.io accessible to people with disabilities. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</P>
      <P>If you encounter an accessibility barrier on our site, please contact us at <EmailLink /> and we will work to address it promptly.</P>
    </div>
  );
}

export function NotAffiliated() {
  return (
    <div>
      <SectionHeading id="not-affiliated" title="Not Affiliated Disclaimer" />

      <P>Tiger Claw is an independent software tool. It is not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company.</P>
    </div>
  );
}

export function DoNotSell() {
  return (
    <div>
      <SectionHeading id="do-not-sell" title="Do Not Sell or Share My Personal Information" />

      <P>Tiger Claw does not sell your personal information. Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), you have the right to opt out of the sale or sharing of your personal information.</P>
      <P>To submit a request, contact us at <EmailLink />. We will process your request within the time required by applicable law.</P>
    </div>
  );
}

/* ─── POLICY REGISTRY ─── */
/* One component per policy, keyed by section id. Used by both the standalone
   /legal route and the footer slide-out drawer so each policy renders alone. */
export const policyComponents: Record<string, React.FC> = {
  privacy: PrivacyPolicy,
  terms: TermsOfService,
  aup: AcceptableUse,
  cookies: CookiePolicy,
  dmca: DMCAPolicy,
  refund: RefundPolicy,
  earnings: EarningsDisclaimer,
  accessibility: AccessibilityStatement,
  "not-affiliated": NotAffiliated,
  "do-not-sell": DoNotSell,
};

/* ─── SHARED SHELL (header + footer) ─── */
function LegalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: ORANGE }}>
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">TIGER CLAW</span>
            </a>
            <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {children}
      </div>

      <footer className="border-t border-white/5 bg-[#050505] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Mariah Marketing LLC, doing business as Bot Craft Works. Tiger Claw is a product of Mariah Marketing LLC.</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── MAIN LEGAL PAGE (route-aware) ───
   /legal           → index list of every policy
   /legal/:slug      → that one policy on its own, with a "back to all" link */
export default function Legal() {
  const [, params] = useRoute("/legal/:slug");
  const slug = params?.slug;
  const section = sectionBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Single-policy view (also the shareable URL for one policy)
  if (section) {
    const Policy = policyComponents[section.id];
    return (
      <LegalShell>
        <Link href="/legal" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All policies
        </Link>
        <div className="max-w-3xl">{Policy ? <Policy /> : null}</div>
      </LegalShell>
    );
  }

  // Index view — a clean menu, each policy its own card/link
  return (
    <LegalShell>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Legal
        </h1>
        <p className="text-white/60 text-base">Mariah Marketing LLC, doing business as Bot Craft Works · Last updated: {EFFECTIVE}</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {sections.map((s) => (
          <Link
            key={s.id}
            href={`/legal/${s.slug}`}
            className="group flex items-center justify-between gap-3 px-4 py-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-colors"
          >
            <span className="text-white/85 text-sm font-medium group-hover:text-white">{s.label}</span>
            <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/70 flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </LegalShell>
  );
}
