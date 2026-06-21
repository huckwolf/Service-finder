import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1  className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">Service finder</h1>
          <h3 className="text-2xl font-semibold leading-10 tracking-tight text-black text-red-500">
            This tool is for learning purpose.
          </h3>
          <p>A service finder is a tool or platform that helps users locate and connect with various services, such as local businesses, professionals, or online resources, based on their specific needs and preferences.</p>
          <h3 className="text-2xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            There is a discussion around Next.js for backend development.
          </h3>
          <p>Next.js can connect to DB and run backend logic safely on the server side. But some developers also warn about tight coupling, complex backend tasks, and exposing too much data if the boundary is not clear. For your learning path, I would do this:</p>
          <ol className="list-decimal list-inside text-left p-2">
            <li className="mb-2 text-black dark:text-zinc-50">Start with Next.js API routes to build simple backend logic and connect to a database. This will give you a feel for how backend development works within the Next.js framework.</li>
            <li className="mb-2 text-black dark:text-zinc-50">As you get more comfortable, explore building a separate backend service using Node.js or another backend framework. This will allow you to understand the benefits of decoupling the frontend and backend, such as improved scalability and maintainability.</li>
            <li className="mb-2 text-black dark:text-zinc-50">Experiment with both approaches and see which one works best for your specific use case. Consider factors like project complexity, team size, and long-term maintenance when making your decision.</li>
          </ol>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex mt-4 h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Listing
          </a>
        </div>
      </main>
    </div>
  );
}
