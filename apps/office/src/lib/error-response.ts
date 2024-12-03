export function ErrorResponse(status: number, error: any, message: string) {
  return new Response(
    JSON.stringify({
      success: false,
      error: error,
      message: message,
    }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
