import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: "占位接口：后续由服务端中转写入飞书多维表格。",
  });
}
