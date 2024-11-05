const { NextResponse } = require("next/server");
import fetch from "node-fetch";

export const POST = async (request: Request) => {
  const body = await request.json();
  body.response = "Here’s some cybersecurity advice...";
  try {
    // const jsonResponse = await fetch(process.env.REACT_APP_SALES_CHAT_API_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    // });
    // const output = await jsonResponse.json();
    // let data = {
    //   session_id: output.session_id,
    //   response: "Here’s some cybersecurity advice...",
    //   history: [
    //     ...output.history,
    //     output.user_input, // Updated conversation history
    //   ],
    // };
    let result = {
      session_id: "1234567890",
      response: "Here’s some cybersecurity advice...",
      history: ["Hello", "Hi", "How are you?"],
    };
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, result: error },
      { status: 500 }
    );
  }
};
