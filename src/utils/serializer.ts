import { omit } from "lodash";

const notAllowedAttributes: string[] = ["trips", "sessions"];

export default async (data: any) =>
  data.map((e: any) => omit(e._doc, notAllowedAttributes));
