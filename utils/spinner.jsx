import Image from "next/image";

export const Loading = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex h-full w-screen items-center justify-center bg-gmco-grey  ${
        isLoading ? "block" : "hidden"
      }`}
    >
      {/* <img src="/violin-loading.gif"></img> */}
      <Image
        className="w-36"
        src="/seatmap/musicnotes.gif"
        alt="not balok loading"
        width={700}
        height={574}
      ></Image>
    </div>
  );
};
// export default Loading;