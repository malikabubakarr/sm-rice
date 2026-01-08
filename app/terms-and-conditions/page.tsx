"use client";

export default function TermsConditions() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] px-6 py-28">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3]">
        <h1 className="text-3xl md:text-4xl font-light text-[#5B3A1E] mb-6">
          Terms & Conditions
        </h1>

        <Section title="Website Use">
          This website provides information about our products and services.
          Users must use it only for lawful purposes.
        </Section>

        <Section title="Product Information">
          Product details are kept accurate; however, packaging, appearance,
          or availability may change without notice.
        </Section>

        <Section title="Orders & Communication">
          Orders may be placed via website, WhatsApp, or phone and are confirmed
          after verification by our team.
        </Section>

        <Section title="Pricing & Availability">
          Prices may change due to market conditions. Availability depends on stock
          and delivery location.
        </Section>

        <Section title="Intellectual Property">
          All content, logos, and images belong to SM Rice Traders and may not
          be reused without permission.
        </Section>

        <Section title="Limitation of Liability">
          We are not responsible for delays, technical issues, or misuse of
          products after delivery.
        </Section>

        <Section title="Changes to Terms">
          These terms may be updated at any time. Continued use means acceptance.
        </Section>

        <Section title="Contact">
          Please contact us for any questions regarding these terms.
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-[#5B3A1E] mb-2">{title}</h2>
      <p className="text-[#6B5135] text-sm md:text-base leading-relaxed">
        {children}
      </p>
    </div>
  );
}
