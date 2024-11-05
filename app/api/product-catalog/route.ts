const { NextResponse } = require("next/server");
import fetch from "node-fetch";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");
  const feature = searchParams.get("feature");

  try {
    const jsonResponse = await fetch(
      `http://20.162.22.147:8000/get-history?session_id=${session_id}&feature=${feature}`
    );
    let result: any = await jsonResponse.json();

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, result: error },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  const body = await request.json();
  try {
    const jsonResponse = await fetch(
      "http://20.162.22.147:8000/product-catalog",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await jsonResponse.json();
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, result: error },
      { status: 500 }
    );
  }
};
