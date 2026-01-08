"use client";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F0E6] to-[#E5D3B3] px-6 py-28">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-sm border border-[#E5D3B3]">
        <h1 className="text-3xl md:text-4xl font-light text-[#5B3A1E] mb-6">
          Refund & Money-Back Policy
        </h1>

        <Section title="Eligibility">
          Refund or replacement is applicable if the product is damaged,
          incorrect, or has quality issues reported immediately.
        </Section>

        <Section title="Conditions">
          Product must be unused. Complaints must be reported within 24 hours
          of delivery with proof (images/videos).
        </Section>

        <Section title="Refund Process">
          Our team will review the case. Approved refunds or replacements will
          be processed accordingly.
        </Section>

        <Section title="Non-Refundable Cases">
          Improper storage, customer unavailability, or usage after delivery
          are not eligible.
        </Section>

        <Section title="Contact for Refunds">
          All refund requests should be submitted via WhatsApp or phone number
          mentioned on our website.
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
