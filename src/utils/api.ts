import request from "graphql-request";

export const fetcher = async (query: any): Promise<any> =>
  request(
    process.env.NEXT_PUBLIC_PLACE_API ? process.env.NEXT_PUBLIC_PLACE_API : "",
    query
  );
