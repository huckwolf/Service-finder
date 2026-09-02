import { findServices } from "@/services/Services";

export default async function ServicesListingPage() {
  const services = await findServices();

  console.log("Services from MongoDB:", services);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-16 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Services listing
          </h1>
          <p>This page will list all the services available in the database. You can click on each service to view more details about it.</p>
        </div>
      </main>
    </div>
  );

}
