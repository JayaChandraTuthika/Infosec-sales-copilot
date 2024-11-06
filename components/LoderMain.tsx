"use client";
import { useLoading } from "@/store/AppContext";
import React, { CSSProperties } from "react";
import { ClipLoader, RingLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const LoderMain = () => {
  const { isLoading } = useLoading();
  //   console.log(laodingContext);
  if (isLoading) {
    return (
      <div className="loader-overlay">
        <RingLoader
          color="red"
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="spinner-main"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default LoderMain;
