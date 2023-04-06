import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";

export default function Profile() {
  return (
    <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4 mt-16 mx-16">
    <div className="bg-gray-200 rounded-lg p-4">
      <p className="text-black font-bold">Predict ID: </p>
      <p className="text-black font-bold">Predict Result: </p>
    </div>
    <div className="bg-gray-200 rounded-lg p-4">
      <p className="text-black font-bold">Predict ID: </p>
      <p className="text-black font-bold">Predict Result: </p>
    </div>
    <div className="bg-gray-200 rounded-lg p-4">
      <p className="text-black font-bold">Predict ID: </p>
      <p className="text-black font-bold">Predict Result: </p>
    </div>
  </div>



  );
}