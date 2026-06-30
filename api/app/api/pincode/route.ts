import { NextRequest } from "next/server";
import { pinToAddress } from "india-pincode-finder";

export async function GET(request: NextRequest) {
  const pincode = request.nextUrl.searchParams.get("pincode");

  if (!pincode) {
    return Response.json({ error: "pincode query parameter is required" }, { status: 400 });
  }

  const num = Number(pincode);
  if (!/^\d{6}$/.test(pincode)) {
    return Response.json({ error: "pincode must be a 6-digit number" }, { status: 400 });
  }

  const data = pinToAddress(num);
  if (!data) {
    return Response.json({ error: `No data found for pincode ${pincode}` }, { status: 404 });
  }

  return Response.json({ pincode: num, ...data });
}
