import { cookies } from 'next/headers'
import jwt from "jsonwebtoken";
import  { NextRequest, NextResponse } from "next/server";
import { JWTPayload } from "../../../../types/JWTPayload";

type SuccessResponse = {
  ok: true;
  cmuBasicInfo:[{
    cmuitaccount_name: string,
    cmuitaccount: string,
    student_id?: string,
    prename_id?: string,
    prename_TH?: string,
    prename_EN?: string,
    firstname_TH?: string,
    firstname_EN?: string,
    lastname_TH?: string,
    lastname_EN?: string,
    organization_code?: string,
    organization_name_TH?: string,
    organization_name_EN?: string,
    itaccounttype_id?: string,
    itaccounttype_TH?: string,
    itaccounttype_EN?: string
  }]
};

type ErrorResponse = {
  ok: false;
  message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;

export async function GET(
  req: NextRequest,
): Promise<NextResponse<WhoAmIResponse>> {

  //This token means apptoke
  const cookieStore = await cookies();
  const token = cookieStore.get('cmu-entraid-example-token')?.value;

  //validate token
  if (typeof token !== "string")
    return NextResponse.json({ ok: false, message: "Invalid token" }, { status: 401 }); 
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    return NextResponse.json({
      ok: true,
      cmuBasicInfo:[{
      cmuitaccount_name: decoded.cmuitaccount_name,
      cmuitaccount: decoded.cmuitaccount,
      student_id: decoded.student_id,
      prename_id: decoded.prename_id,
      prename_TH: decoded.prename_TH,
      prename_EN: decoded.prename_EN,
      firstname_TH: decoded.firstname_TH,
      firstname_EN: decoded.firstname_EN,
      lastname_TH: decoded.lastname_TH,
      lastname_EN: decoded.lastname_EN,
      organization_code: decoded.organization_code,
      organization_name_TH: decoded.organization_name_TH,
      organization_name_EN: decoded.organization_name_EN,
      itaccounttype_id: decoded.itaccounttype_id,
      itaccounttype_TH: decoded.itaccounttype_TH,
      itaccounttype_EN: decoded.itaccounttype_EN
      }]
    });
  } catch (error) {
    return NextResponse.json({ ok: false, message: "Invalid token" }, { status: 401 });   
  }

}
