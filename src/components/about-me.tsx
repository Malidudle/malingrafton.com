import Image from "next/image";

export default function AboutMe() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-6">
          <div className="grid gap-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About Me
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Welcome to my personal site. This is just a bit about me and my
              backstory + interests.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <Image
                src="/basquiat.jpg"
                alt="Profile Picture"
                width={230}
                height={230}
                className="rounded-full"
                loading="eager"
                style={{ aspectRatio: "300/300", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h2 className="text-2xl font-semibold">Malin Grafton</h2>
                <p className="text-muted-foreground">Robotics & AI Student</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                I'm Malin Grafton, a Robotics & Ai student at the University of
                Glasgow in Scotland. I also work as a self employed full stack
                web developer helping businesses and individuals build web
                applications.
              </p>
              <p className="text-muted-foreground">
                Originally from outer hebrides, Scotland. I have a keen interest
                in watches, the gym, technology and travel. I am currently
                furthering my skills in programming and web development.
              </p>
              <p className="text-muted-foreground">
                My favourite technologies are React, Next.js, TailwindCSS and
                Golang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
