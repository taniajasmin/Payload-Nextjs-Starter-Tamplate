import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, company, phone, paperTitle } = body;

    // Log the download request (replace with Payload / email integration later)
    console.log("── Download Request ──");
    console.log(`  Paper : ${paperTitle}`);
    console.log(`  Name  : ${fullName}`);
    console.log(`  Email : ${email}`);
    console.log(`  Company: ${company || "—"}`);
    console.log(`  Phone : ${phone || "—"}`);
    console.log("───────────────────────");

    // TODO: integrate with Payload CMS or email notification
    // const payload = await getPayload({ config });
    // await payload.create({ collection: 'download-requests', data: body });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
