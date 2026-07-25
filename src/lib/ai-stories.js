// Mock AI responses for the hackathon demo.
// This simulates what a real LLM (like Gemini) would return when asked "Why is this cool?"

export const AI_STORIES = {
  sun: {
    title: "The Sun",
    subtitle: "Our local star",
    science: "The Sun is an absolute monster of nuclear fusion. Right now, it's converting 600 million tons of hydrogen into helium every single second! That light takes exactly 8 minutes and 20 seconds to reach your eyes. You are quite literally looking into the past.",
    lore: "In ancient Greek mythology, the Sun was personified as Helios, who drove a fiery chariot across the sky each day. In Egyptian mythology, the sun god Ra was the most important deity, sailing his sun boat across the heavens."
  },
  mercury: {
    title: "Mercury",
    subtitle: "The speedster planet",
    science: "Mercury is the fastest planet in our solar system, whipping around the Sun at 29 miles per second. Despite being the closest planet to the Sun, it has ice hidden in deep craters at its poles that never see sunlight!",
    lore: "Named after the swift-footed Roman messenger god (Hermes in Greek myth), Mercury was associated with speed, commerce, and communication. It was also considered a guide of souls to the underworld due to its rapid movement."
  },
  venus: {
    title: "Venus",
    subtitle: "Earth's evil twin",
    science: "Venus is the hottest planet in the solar system, with surface temperatures hot enough to melt lead! Its atmosphere is choked with sulfuric acid clouds, and the pressure on the surface is equivalent to being a mile underwater on Earth.",
    lore: "Venus shines the brightest in the sky, earning its name from the Roman goddess of love and beauty. Ancient civilizations often mistook it for two separate stars—the Morning Star (Lucifer or Phosphorus) and the Evening Star (Hesperus)."
  },
  moon: {
    title: "The Moon",
    subtitle: "Our celestial anchor",
    science: "Our Moon is unusually large compared to Earth—so large that some astronomers consider us a 'double planet' system. The dark patches you see are ancient lava plains called 'maria', formed billions of years ago when massive asteroids smashed into its surface.",
    lore: "The Moon has been worshipped universally. To the Greeks, she was Selene, sister to Helios (the Sun). Many indigenous cultures view the Moon as a guardian or a timekeeper, and folklore is rich with tales of lunar deities controlling the tides."
  },
  mars: {
    title: "Mars",
    subtitle: "The Red Planet",
    science: "Mars is the only planet we know of entirely inhabited by robots! That rusty red color comes from literal iron oxide (rust) covering its surface. It's home to Olympus Mons, a volcano three times taller than Mount Everest.",
    lore: "Because of its blood-red color, Mars was universally associated with war. The Romans named it after their God of War, while the Babylonians called it Nergal, the deity of death and pestilence. Its two moons, Phobos and Deimos, mean 'Fear' and 'Panic'."
  },
  jupiter: {
    title: "Jupiter",
    subtitle: "The King of Planets",
    science: "Jupiter is a gas giant so massive it could swallow 1,300 Earths! Its famous Great Red Spot is a raging hurricane that has been spinning for over 300 years. It acts like a cosmic vacuum cleaner, pulling in dangerous asteroids that might otherwise hit Earth.",
    lore: "Befitting its massive size, Jupiter was named after the king of the Roman gods (Zeus in Greek mythology), the god of sky and thunder. Ancient astronomers revered it as the 'royal star', believing it ruled the cosmic order."
  },
  saturn: {
    title: "Saturn",
    subtitle: "The Jewel of the Solar System",
    science: "Saturn's iconic rings aren't solid—they are made of billions of pieces of ice and rock, ranging in size from tiny grains of sand to massive mountains. The planet itself is actually less dense than water; if you had a bathtub big enough, Saturn would float!",
    lore: "Saturn is named after the Roman god of agriculture and time (Cronus to the Greeks), the father of Jupiter. The ancient festival of Saturnalia was held in his honor, a time of feasting, role reversals, and celebration."
  },
  uranus: {
    title: "Uranus",
    subtitle: "The tilted giant",
    science: "Uranus is the weirdest planet in the solar system. It rotates entirely on its side, likely because a massive Earth-sized object smashed into it billions of years ago. As a result, its seasons last for 21 years of continuous sunlight or continuous darkness!",
    lore: "Uranus is the only planet named after a Greek god rather than a Roman one. Uranus was the primordial god of the sky, father of the Titans and grandfather of Zeus. He represented the overarching starry dome of heaven."
  },
  neptune: {
    title: "Neptune",
    subtitle: "The stormy giant",
    science: "Neptune is a dark, cold, and incredibly windy world. It boasts the fastest winds in the solar system, whipping at over 1,200 miles per hour! Its beautiful blue color comes from methane in its atmosphere, and scientists believe it rains actual solid diamonds deep within its core.",
    lore: "Because of its deep blue hue, the planet is aptly named after Neptune, the Roman god of the sea (Poseidon in Greek myth). His weapon was the three-pronged trident, which remains the astronomical symbol for the planet today."
  },
  andromeda: {
    title: "Andromeda Galaxy",
    subtitle: "Our galactic neighbor",
    science: "You are looking at an island universe containing over one trillion stars! At 2.5 million light-years away, it is the most distant object you can see with the naked eye. In about 4 billion years, Andromeda and our Milky Way will collide and merge into a single massive galaxy.",
    lore: "The galaxy takes its name from the constellation Andromeda. In Greek mythology, Andromeda was a beautiful princess chained to a rock as a sacrifice to a sea monster, before being rescued by the hero Perseus on his flying horse Pegasus."
  },
  orion: {
    title: "Orion Nebula",
    subtitle: "A cosmic nursery",
    science: "The Orion Nebula is a stellar nursery—a massive cloud of gas and dust where new stars are literally being born right now! The intense ultraviolet light from these baby stars is carving out massive cavernous shapes in the cloud, making it glow beautifully.",
    lore: "The nebula sits in the 'sword' of the constellation Orion. In mythology, Orion was a mighty hunter. Many indigenous cultures saw this starry region as a birthplace of souls or a cosmic campfire in the sky."
  },
  iss: {
    title: "International Space Station",
    subtitle: "Humanity's outpost",
    science: "The ISS is arguably the greatest engineering feat in human history. It flies at 17,500 miles per hour, orbiting the Earth every 90 minutes. That means the astronauts onboard get to see 16 sunrises and 16 sunsets every single day!",
    lore: "While not part of ancient mythology, the ISS represents humanity's modern quest for the stars. It is the realization of science fiction dreams and a symbol of international cooperation, bringing together astronauts and cosmonauts from around the world."
  },
  // Constellation Mythologies
  constellation_orion: {
    title: "Orion the Hunter",
    subtitle: "Ancient Greek Mythology",
    science: "Orion is one of the most recognizable constellations. The three bright stars forming his belt—Alnitak, Alnilam, and Mintaka—are actually massive, blazing blue supergiant stars thousands of times brighter than our Sun. His 'left shoulder' is Betelgeuse, a red supergiant on the verge of a supernova.",
    lore: "In Greek mythology, Orion was a giant huntsman whom Zeus placed among the stars. He stands facing the charging bull, Taurus, wielding a club and shield. Scorpius was placed on the opposite side of the sky so the two would never meet."
  },
  constellation_ursa_major: {
    title: "Ursa Major",
    subtitle: "The Great Bear",
    science: "Ursa Major contains the famous asterism, the Big Dipper. Unlike many constellations where stars are just randomly aligned from our perspective, most stars in the Big Dipper are actually part of the 'Ursa Major Moving Group'—a cluster of stars moving together through space.",
    lore: "Known globally, the 'Great Bear' has deep cultural significance. In Navajo legend, it is Náhookǫs Bi’ka’, a leader and protector. In Greek myth, it is Callisto, transformed into a bear by a jealous Hera. The Iroquois saw the dipper's bowl as a bear, and the handle as hunters chasing it."
  },
  constellation_cassiopeia: {
    title: "Cassiopeia",
    subtitle: "The Vain Queen",
    science: "Easily recognized by its 'W' shape, Cassiopeia is a prominent northern constellation. Because it sits within the Milky Way band, it is packed with interesting deep-sky objects, open star clusters, and remnants of exploded supernovas.",
    lore: "Cassiopeia represents the vain and boastful queen of Aethiopia in Greek mythology. As punishment for boasting that she was more beautiful than the sea nymphs, Poseidon placed her in the sky, where she is forced to hang upside down for half the year."
  }
};

export const getAIStory = async (id) => {
  // Simulate network delay for AI generation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AI_STORIES[id] || {
        title: "Unknown Object",
        subtitle: "A mystery of the cosmos",
        science: "Our AI systems are currently analyzing the scientific properties of this celestial object. It appears to be an intriguing target for observation.",
        lore: "The ancient mythological stories and cultural lore associated with this object are currently being uncovered from the historical archives. Check back soon!"
      });
    }, 1500);
  });
};
