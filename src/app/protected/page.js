import Image from "next/image";
// import { lock } from "@/assets/images";
// import { lock } from "@/assets/images/";
import lock from "@/assets/images/lock.jpeg";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="px-5 py-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="bg-gray-100 h-72 w-72 p-10 flex items-center justify-center rounded-full">
            <Image
              src={lock}
              alt="lock "
              className="mx-auto rounded-full mb-8 inline-block mt-8 h-56 w-56 flex-none object-cover"
            />
          </div>
          <h1 className="mb-4 text-4xl mt-10 text-primary font-bold md:text-6xl">
            Route is Protected .
          </h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-[#636262] sm:text-base md:mb-6 lg:mb-8">
            Commodo, consequat turpis placerat ultrices sapien, tortor
            tincidunt. Sit quisque est metus auctor sed turpis lectus quis.
          </p>
          <Link
            href={"/"}
            className="inline-block bg-primary rounded-md px-8 py-4 text-center font-semibold mb-4"
          >
            Back to Platform
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
