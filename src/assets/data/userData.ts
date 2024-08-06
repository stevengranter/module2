

export type UserType = {
  id: number;
  name: string;
  email: string;
  birthdate: string;
  location: string;
  bio: string;
};

export const userData: UserType[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    birthdate: "1995-04-12",
    location: "New York, NY",
    bio: "A tech enthusiast who loves exploring new technologies and innovations.",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    birthdate: "1989-08-21",
    location: "Los Angeles, CA",
    bio: "An avid traveler and photographer, capturing moments around the world.",
  },
  {
    id: 3,
    name: "Catherine Wang",
    email: "catherine.wang@example.com",
    birthdate: "1998-11-03",
    location: "Seattle, WA",
    bio: "A passionate designer with a love for creating intuitive user experiences.",
  },
  {
    id: 4,
    name: "Daniel Brown",
    email: "daniel.brown@example.com",
    birthdate: "2009-02-15",
    location: "Chicago, IL",
    bio: "An aspiring young coder and video game enthusiast.",
  },
  {
    id: 5,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    birthdate: "2015-06-30",
    location: "Austin, TX",
    bio: "A creative soul with a passion for art and storytelling.",
  },
];
