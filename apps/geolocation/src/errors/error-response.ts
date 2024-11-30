export function ErrorResponse(status: number, error: any, message: string) {
  return new Response(
    JSON.stringify({
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
