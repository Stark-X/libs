export interface ConvertSvgToPngOptions {
  width: number;
  height: number;
  background?: string;
  colorspace?: string;
}

export async function convertSvgToPng(svgPath: string, pngPath: string, options: ConvertSvgToPngOptions): Promise<void> {
  const background = options.background ?? "white";
  const colorspace = options.colorspace ?? "Gray";
  const proc = Bun.spawn(
    [
      "convert",
      "-background",
      background,
      "-flatten",
      "-colorspace",
      colorspace,
      "-resize",
      `${options.width}x${options.height}!`,
      svgPath,
      pngPath,
    ],
    { stdout: "inherit", stderr: "pipe" },
  );
  const stderr = await new Response(proc.stderr).text();
  const code = await proc.exited;
  if (code !== 0) {
    throw new Error(`convert failed (${code}): ${stderr}`);
  }
}
