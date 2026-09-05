import Reveal from "./reveal";

export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.35em] text-ice">
        {kicker}
      </p>
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-mist">{description}</p>}
    </Reveal>
  );
}
