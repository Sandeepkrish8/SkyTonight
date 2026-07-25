// Mock AI responses for the hackathon demo.
// This simulates what a real LLM (like Gemini) would return when asked "Why is this cool?"

export const AI_STORIES = {
  sun: {
    title: "The Sun",
    subtitle: "Our local star",
    story: "The Sun is an absolute monster of nuclear fusion. Right now, it's converting 600 million tons of hydrogen into helium every single second! That light takes exactly 8 minutes and 20 seconds to reach your eyes. You are quite literally looking into the past."
  },
  mercury: {
    title: "Mercury",
    subtitle: "The speedster planet",
    story: "Mercury is the fastest planet in our solar system, whipping around the Sun at 29 miles per second. Despite being the closest planet to the Sun, it has ice hidden in deep craters at its poles that never see sunlight!"
  },
  venus: {
    title: "Venus",
    subtitle: "Earth's evil twin",
    story: "Venus is the hottest planet in the solar system, with surface temperatures hot enough to melt lead! Its atmosphere is choked with sulfuric acid clouds, and the pressure on the surface is equivalent to being a mile underwater on Earth."
  },
  moon: {
    title: "The Moon",
    subtitle: "Our celestial anchor",
    story: "Our Moon is unusually large compared to Earth—so large that some astronomers consider us a 'double planet' system. The dark patches you see are ancient lava plains called 'maria', formed billions of years ago when massive asteroids smashed into its surface."
  },
  mars: {
    title: "Mars",
    subtitle: "The Red Planet",
    story: "Mars is the only planet we know of entirely inhabited by robots! That rusty red color comes from literal iron oxide (rust) covering its surface. It's home to Olympus Mons, a volcano three times taller than Mount Everest, and a canyon system that would stretch from New York to California."
  },
  jupiter: {
    title: "Jupiter",
    subtitle: "The King of Planets",
    story: "Jupiter is a gas giant so massive it could swallow 1,300 Earths! Its famous Great Red Spot is a raging hurricane that has been spinning for over 300 years and is larger than our entire planet. It acts like a cosmic vacuum cleaner, pulling in dangerous asteroids that might otherwise hit Earth."
  },
  saturn: {
    title: "Saturn",
    subtitle: "The Jewel of the Solar System",
    story: "Saturn's iconic rings aren't solid—they are made of billions of pieces of ice and rock, ranging in size from tiny grains of sand to massive mountains. The planet itself is actually less dense than water; if you had a bathtub big enough, Saturn would float!"
  },
  uranus: {
    title: "Uranus",
    subtitle: "The tilted giant",
    story: "Uranus is the weirdest planet in the solar system. It rotates entirely on its side, likely because a massive Earth-sized object smashed into it billions of years ago. As a result, its seasons last for 21 years of continuous sunlight or continuous darkness!"
  },
  neptune: {
    title: "Neptune",
    subtitle: "The stormy giant",
    story: "Neptune is a dark, cold, and incredibly windy world. It boasts the fastest winds in the solar system, whipping at over 1,200 miles per hour! Its beautiful blue color comes from methane in its atmosphere, and scientists believe it rains actual solid diamonds deep within its core."
  },
  andromeda: {
    title: "Andromeda Galaxy",
    subtitle: "Our galactic neighbor",
    story: "You are looking at an island universe containing over one trillion stars! At 2.5 million light-years away, it is the most distant object you can see with the naked eye. In about 4 billion years, Andromeda and our Milky Way will collide and merge into a single massive galaxy."
  },
  orion: {
    title: "Orion Nebula",
    subtitle: "A cosmic nursery",
    story: "The Orion Nebula is a stellar nursery—a massive cloud of gas and dust where new stars are literally being born right now! The intense ultraviolet light from these baby stars is carving out massive cavernous shapes in the cloud, making it glow beautifully across the spectrum."
  },
  iss: {
    title: "International Space Station",
    subtitle: "Humanity's outpost",
    story: "The ISS is arguably the greatest engineering feat in human history. It flies at 17,500 miles per hour, orbiting the Earth every 90 minutes. That means the astronauts onboard get to see 16 sunrises and 16 sunsets every single day!"
  },
  // Constellation Mythologies
  constellation_orion: {
    title: "Orion the Hunter",
    subtitle: "Ancient Greek Mythology",
    story: "In Greek mythology, Orion was a giant huntsman whom Zeus placed among the stars. He stands facing the charging bull, Taurus, wielding a club and shield. The three bright stars forming his belt—Alnitak, Alnilam, and Mintaka—are actually massive, blazing blue supergiant stars thousands of times brighter than our Sun."
  },
  constellation_ursa_major: {
    title: "Ursa Major",
    subtitle: "The Great Bear",
    story: "Known globally, the 'Great Bear' contains the famous Big Dipper. In Navajo legend, it is Náhookǫs Bi’ka’, the Male Revolving One, a leader and protector. In Greek myth, it is Callisto, transformed into a bear by a jealous Hera. The stars in the dipper are actually moving together through space as a single star cluster!"
  },
  constellation_cassiopeia: {
    title: "Cassiopeia",
    subtitle: "The Vain Queen",
    story: "Easily recognized by its 'W' shape, Cassiopeia represents the vain and boastful queen of Aethiopia in Greek mythology. As punishment for her vanity, Poseidon placed her in the sky, where she is forced to hang upside down for half the year. The constellation is located in a rich section of the Milky Way, packed with open star clusters."
  }
};

export const getAIStory = async (id) => {
  // Simulate network delay for AI generation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AI_STORIES[id] || {
        title: "Unknown Object",
        subtitle: "A mystery of the cosmos",
        story: "Our AI systems are currently analyzing this celestial object. Check back later for more details!"
      });
    }, 1500);
  });
};
