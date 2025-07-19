export default function TeamSection() {
  const team = [
    { initials: "VR", name: "Vem Rinji", role: "Designer" },
    { initials: "VM", name: "Vem Makplang", role: "Administrator" },
    { initials: "SJ", name: "Shammah John", role: "Frontend Developer" },
  ];

  return (
    <section>
      {/* Team Members */}
      <div className="bg-[#F6F6F6] pt-12 pb-16 px-6 mt-0 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">The Team</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-y-12 md:gap-x-24">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center space-y-2 md:transform md:first:translate-x-[-4rem] md:last:translate-x-[2rem]"
            >
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border flex items-center justify-center 
                text-xl font-semibold text-black 
                transition-all duration-300 hover:scale-110 hover:shadow-md"
              >
                {member.initials}
              </div>
              <p className="font-semibold text-lg">{member.name}</p>
              <p className="text-gray-700 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-[#555555] py-20 px-6 text-center text-white">
        <p className="text-xl md:text-3xl font-semibold max-w-3xl mx-auto">
          &ldquo;A world where better decisions lead to a stronger, more capable humanity.&rdquo;
        </p>

        <div className="w-12 h-1 bg-white mt-4 mx-auto rounded-full" />
      </div>
    </section>
  );
}
