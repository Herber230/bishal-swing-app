// TODO: Fix false positive
/* eslint-disable no-unused-vars */
export interface ServerActionResult {
  success: boolean;
  errors: Record<string, string[]>;
}

export interface ServerAction {
  (
    initState: ServerActionResult,
    formData: FormData,
  ): Promise<ServerActionResult>;
}
