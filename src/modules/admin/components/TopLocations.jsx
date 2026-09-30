const locations = [
  { name: "Cairo", value: 48 },
  { name: "Alexandria", value: 40 },
  { name: "Mansoura", value: 31 },
  { name: "Other", value: 18 },
];

export default function TopLocations() {
  const max = 48;

  return (
    <section className="h-[252px] w-[648px] rounded-lg bg-white p-4 shadow-[0px_2px_6px_rgba(13,10,44,0.08)]">
      <h2 className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
        Top Locations
      </h2>

      <div className="mt-5 flex flex-col gap-4">
        {locations.map((location) => (
          <div
            key={location.name}
            className="flex items-center gap-4"
          >
            <span className="w-[70px] shrink-0 text-[14px] font-normal leading-4 text-[#615E83]">
              {location.name}
            </span>

            <div className="relative h-3 flex-1 overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 h-3 rounded-full bg-[#7C3AED]"
                style={{
                  width: `${(location.value / max) * 100}%`,
                }}
              />
            </div>

            <span className="w-8 shrink-0 text-right text-[18px] font-bold leading-6 text-[#27272A]">
              {location.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}