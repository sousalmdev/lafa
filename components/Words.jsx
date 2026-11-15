// Renders text as masked words so GSAP can slide each .wi up from below.
// Wrap a word in *asterisks* to set it in the italic serif accent.
export default function Words({ text, className = "", as: Tag = "span" }) {
  const parts = text.split(" ");
  return (
    <Tag className={className}>
      {parts.map((p, i) => {
        const accent = p.startsWith("*") && p.endsWith("*");
        const word = accent ? p.slice(1, -1) : p;
        return (
          <span key={i} className="wm">
            <span className={`wi ${accent ? "accent" : ""}`}>{word}</span>
            {i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </Tag>
  );
}

