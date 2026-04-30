import { useState } from "react";

const SimpleAccordion = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card divide-y divide-border">
      {items.map((item, i) => (
        <div key={i} className="px-5">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left py-4 text-sm font-semibold text-foreground flex justify-between items-center"
          >
            {item.q}
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>

          {openIndex === i && (
            <div className="pb-4 text-sm text-muted-foreground">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SimpleAccordion;