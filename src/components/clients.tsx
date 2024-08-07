import Link from "next/link";

const Clients = () => {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <h2 className="text-7xl font-bold">Clients</h2>
      <ul className="mt-16 list-inside list-disc space-y-4">
        <li className="hover:underline">
          <Link target="_blank" href="https://tayvallichbay.com">
            Tayvallich Bay Association
          </Link>
        </li>
        <li className="hover:underline">
          <Link target="_blank" href="https://disbyte.co.uk">
            Disbyte
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Clients;
