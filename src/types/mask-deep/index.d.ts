declare module 'mask-deep' {
  interface MaskOptions {
    percentage?: number;
    maskFromRight?: boolean;
    maskTimePropsNormally?: boolean;
    isMaskable?: (value: unknown) => boolean;
  }

  function maskDeep(
    data: Record<string, unknown> | string,
    fields: string[],
    options?: MaskOptions
  ): Record<string, unknown> | string;

  export = maskDeep;
}
