import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      about
      <Link
        href={"/admin/dashboard"}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        dashboard
      </Link>
    </div>
  );
};

export default page;
