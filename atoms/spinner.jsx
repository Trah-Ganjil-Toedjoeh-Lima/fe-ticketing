import Image from "next/image";

export const Loading = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex h-full w-screen items-end justify-end bg-gmco-blue-main  ${
        isLoading ? "block" : "hidden"
      }`}
    >
      {/* <img src="/violin-loading.gif"></img> */}
      <Image
        className=""
        src="/mr_crab-loading.gif"
        alt="tuan krap with violin"
        width={500}
        height={374}
      ></Image>
    </div>
  );
};
export default Loading;
