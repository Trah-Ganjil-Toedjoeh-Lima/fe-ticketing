import Image from "next/image";

export const Loading = ({ isLoading, verboseMsg }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex h-full w-screen items-center justify-center bg-gmco-grey  ${
        isLoading ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* <img src="/violin-loading.gif"></img> */}
        <Image
          className="w-36"
          src="/seatmap/musicnotes.gif"
          alt="not balok loading"
          width={700}
          height={574}
        ></Image>
        <div className="text-white text-2xl font-bold">{verboseMsg}</div>
      </div>
    </div>
  );
};
// export default Loading;
