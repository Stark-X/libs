export const DEFAULT_ZECTRIX_BASE_URL = "https://cloud.zectrix.com/open/v1/devices";

export interface PublishZectrixImageOptions {
  deviceId: string;
  apiKey: string;
  pageId: string;
  pngBytes: ArrayBuffer;
  filename: string;
  dither?: boolean;
  baseUrl?: string;
}

export interface PublishZectrixImageResult {
  url: string;
  ok: boolean;
  status: number;
  body: unknown;
}

export async function publishZectrixImage(options: PublishZectrixImageOptions): Promise<PublishZectrixImageResult> {
  const baseUrl = options.baseUrl ?? DEFAULT_ZECTRIX_BASE_URL;
  const url = `${baseUrl}/${options.deviceId}/display/image`;
  const form = new FormData();
  form.append("images", new File([options.pngBytes], options.filename, { type: "image/png" }));
  form.append("dither", String(options.dither ?? true));
  form.append("pageId", options.pageId);

  const response = await fetch(url, {
    method: "POST",
    headers: { "X-API-Key": options.apiKey },
    body: form,
  });

  return {
    url,
    ok: response.ok,
    status: response.status,
    body: await response.json(),
  };
}
